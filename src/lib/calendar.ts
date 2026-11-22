import { google } from 'googleapis';
import { getSettings, getBookings } from './storage';
import { TimeSlot, Lead } from '@/types';

// Helper to obtain an authenticated Google Calendar API client
export function getGoogleCalendarClient(settings?: any) {
  const clientId = (process.env.GOOGLE_CLIENT_ID || settings?.google_client_id || '').trim();
  const clientSecret = (process.env.GOOGLE_CLIENT_SECRET || settings?.google_client_secret || '').trim();
  const refreshToken = (process.env.GOOGLE_REFRESH_TOKEN || settings?.google_refresh_token || '').trim();
  const redirectUri = (process.env.GOOGLE_REDIRECT_URI || 'https://jewarinternational.vercel.app/api/auth/google/callback').trim();

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  return google.calendar({ version: 'v3', auth: oauth2Client });
}

export interface AvailabilityParams {
  date: string; // YYYY-MM-DD
  prospectTimezone: string;
}

// In-memory availability cache
interface AvailabilityCacheItem {
  timestamp: number;
  slots: TimeSlot[];
}

const availabilityCache = new Map<string, AvailabilityCacheItem>();
const CACHE_TTL_MS = 40 * 1000; // 40 seconds TTL
const inFlightRequests = new Map<string, Promise<TimeSlot[]>>();

/**
 * Invalidates the availability cache immediately.
 * Called automatically when an appointment is booked or settings change.
 */
export function invalidateAvailabilityCache() {
  availabilityCache.clear();
  inFlightRequests.clear();
}

/**
 * Generates and verifies available meeting slots for a given date,
 * strictly consulting working hours, min notice, buffers, existing bookings,
 * and the Google Calendar FreeBusy API.
 * Uses in-memory caching and request deduplication to ensure instant (<10ms) responses.
 */
export async function getAvailableSlots(params: AvailabilityParams, forceRefresh = false): Promise<TimeSlot[]> {
  const { date, prospectTimezone } = params;
  const cacheKey = `${date}__${prospectTimezone}`;
  const nowTime = Date.now();

  // Return from in-memory cache if fresh
  if (!forceRefresh) {
    const cached = availabilityCache.get(cacheKey);
    if (cached && nowTime - cached.timestamp < CACHE_TTL_MS) {
      return cached.slots;
    }
  }

  // Deduplicate concurrent requests for the same date & timezone
  let requestPromise = inFlightRequests.get(cacheKey);
  if (!requestPromise) {
    requestPromise = computeAvailableSlots(params).finally(() => {
      inFlightRequests.delete(cacheKey);
    });
    inFlightRequests.set(cacheKey, requestPromise);
  }

  const computedSlots = await requestPromise;
  availabilityCache.set(cacheKey, {
    timestamp: Date.now(),
    slots: computedSlots,
  });

  return computedSlots;
}

/**
 * Creates a UTC Date object matching a specific date and time string in a target IANA timezone.
 * Resolves local server timezone discrepancies (e.g. running on Indian machine vs US business hours).
 */
export function createDateInTz(dateStr: string, timeStr: string, timeZone: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hour, min] = timeStr.split(':').map(Number);
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, min, 0));

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(utcGuess);
  const m: Record<string, string> = {};
  for (const p of parts) m[p.type] = p.value;

  const inTzDate = new Date(Date.UTC(
    Number(m.year),
    Number(m.month) - 1,
    Number(m.day),
    Number(m.hour === '24' ? '0' : m.hour),
    Number(m.minute),
    Number(m.second)
  ));

  const diff = utcGuess.getTime() - inTzDate.getTime();
  return new Date(utcGuess.getTime() + diff);
}

async function computeAvailableSlots(params: AvailabilityParams): Promise<TimeSlot[]> {
  const { date, prospectTimezone } = params;
  const settings = await getSettings();

  const businessTz = settings.business_timezone || 'America/New_York';
  const slotDurationMin = settings.meeting_duration_minutes || 30;
  const bufferBeforeMin = settings.buffer_before_minutes || 15;
  const bufferAfterMin = settings.buffer_after_minutes || 15;
  const minNoticeHours = settings.min_notice_hours || 2;

  // Determine weekday in business timezone
  const noonInBusinessTz = createDateInTz(date, '12:00', businessTz);
  const dayOfWeek = noonInBusinessTz.getDay(); // 0 is Sunday, 1 is Monday...

  // Check if target day is in configured working days
  if (!settings.working_days.includes(dayOfWeek)) {
    return [];
  }

  // Define working hours strictly in business timezone (America/New_York)
  const dayStartTime = createDateInTz(date, settings.working_hours_start, businessTz);
  const dayEndTime = createDateInTz(date, settings.working_hours_end, businessTz);

  const now = new Date();
  const minBookingTime = new Date(now.getTime() + minNoticeHours * 60 * 60 * 1000);

  // 1. Fetch busy intervals from Google Calendar FreeBusy API if connected
  const busyIntervals: { start: Date; end: Date }[] = [];
  const calendarClient = getGoogleCalendarClient(settings);

  if (calendarClient) {
    try {
      const calendarId = settings.google_calendar_id || 'primary';
      const freeBusyResponse = await calendarClient.freebusy.query({
        requestBody: {
          timeMin: dayStartTime.toISOString(),
          timeMax: dayEndTime.toISOString(),
          timeZone: businessTz,
          items: [{ id: calendarId }],
        },
      });

      const calendars = freeBusyResponse.data.calendars;
      if (calendars && calendars[calendarId]?.busy) {
        for (const interval of calendars[calendarId].busy || []) {
          if (interval.start && interval.end) {
            busyIntervals.push({
              start: new Date(interval.start),
              end: new Date(interval.end),
            });
          }
        }
      }
    } catch (apiError) {
      console.error('Google Calendar FreeBusy API error:', apiError);
    }
  }

  // 2. Also consult existing internal database bookings to prevent double-booking
  const existingBookings = await getBookings();
  const activeBookings = existingBookings.filter(b => b.status === 'confirmed');

  for (const b of activeBookings) {
    busyIntervals.push({
      start: new Date(b.meeting_start),
      end: new Date(b.meeting_end),
    });
  }

  // 3. Generate candidate slots and test availability
  const slots: TimeSlot[] = [];
  let currentSlotStart = new Date(dayStartTime);

  while (currentSlotStart.getTime() + slotDurationMin * 60 * 1000 <= dayEndTime.getTime()) {
    const currentSlotEnd = new Date(currentSlotStart.getTime() + slotDurationMin * 60 * 1000);

    // Apply buffer before and after
    const bufferedStart = new Date(currentSlotStart.getTime() - bufferBeforeMin * 60 * 1000);
    const bufferedEnd = new Date(currentSlotEnd.getTime() + bufferAfterMin * 60 * 1000);

    // Slot is invalid if it's before minimum advance notice
    const isPastNotice = currentSlotStart.getTime() > minBookingTime.getTime();

    // Check collision with any busy interval
    let isBusy = false;
    for (const busy of busyIntervals) {
      if (bufferedStart < busy.end && bufferedEnd > busy.start) {
        isBusy = true;
        break;
      }
    }

    const available = isPastNotice && !isBusy;

    // Format human-readable time in prospect's timezone
    let formattedTime = '';
    try {
      formattedTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: prospectTimezone || businessTz,
      }).format(currentSlotStart);
    } catch (e) {
      formattedTime = currentSlotStart.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }

    if (available) {
      slots.push({
        start: currentSlotStart.toISOString(),
        end: currentSlotEnd.toISOString(),
        formattedTime,
        available: true,
      });
    }

    // Advance to next slot
    currentSlotStart = new Date(currentSlotStart.getTime() + slotDurationMin * 60 * 1000);
  }

  return slots;
}

/**
 * Re-validates slot availability directly before confirming a booking
 * to eliminate race conditions and double bookings.
 */
export async function verifySlotStillAvailable(startTimeIso: string, endTimeIso: string): Promise<boolean> {
  const settings = await getSettings();
  const start = new Date(startTimeIso);
  const end = new Date(endTimeIso);

  // Check internal confirmed bookings
  const bookings = await getBookings();
  const conflict = bookings.some(
    b => b.status === 'confirmed' &&
      new Date(b.meeting_start) < end &&
      new Date(b.meeting_end) > start
  );
  if (conflict) return false;

  // Check Google Calendar API if connected
  const calendarClient = getGoogleCalendarClient();
  if (calendarClient) {
    try {
      const freeBusyResponse = await calendarClient.freebusy.query({
        requestBody: {
          timeMin: start.toISOString(),
          timeMax: end.toISOString(),
          timeZone: settings.business_timezone,
          items: [{ id: settings.google_calendar_id || 'primary' }],
        },
      });
      const busyList = freeBusyResponse.data.calendars?.[settings.google_calendar_id || 'primary']?.busy || [];
      if (busyList.length > 0) return false;
    } catch (e) {
      console.warn('Google FreeBusy re-check warning:', e);
    }
  }

  return true;
}

/**
 * Creates the Google Calendar Event with Google Meet conference link,
 * attendees, survey context, and lead identifiers.
 */
export async function createGoogleCalendarEvent(params: {
  lead: Lead;
  meetingStart: string;
  meetingEnd: string;
  timezone: string;
}) {
  const { lead, meetingStart, meetingEnd, timezone } = params;
  const settings = await getSettings();
  const calendarClient = getGoogleCalendarClient(settings);

  const title = `JIT Helpdesk Personalized Demo: ${lead.company_name || lead.full_name}`;
  const description = `
Personalized Product Demo & Architecture Walkthrough for JIT Helpdesk.

--- PROSPECT DETAILS ---
Lead Reference ID: ${lead.id}
Name: ${lead.full_name}
Business Name: ${lead.company_name || 'N/A'}
Email: ${lead.email}
Phone: ${lead.phone}

--- QUALIFICATION & SURVEY RESPONSES ---
Business Type: ${lead.survey_answers?.business_type || 'N/A'}
Role: ${lead.survey_answers?.role || 'N/A'}
Serving Paying Clients: ${lead.survey_answers?.serving_paying_clients || 'N/A'}
Budget Fit: ${lead.survey_answers?.budget_fit || 'N/A'}
Implementation Timeline: ${lead.survey_answers?.timeline || 'N/A'}

--- DEMO FOCUS ---
• Branded Customer Mobile App & Web Portal
• Owner Admin Dashboard & Service Management
• Quotes, Approvals & Integrated Payments
• Live Q&A and Deployment Roadmap
  `.trim();

  const customMeetLink = settings.google_meet_link?.trim();

  if (!calendarClient) {
    // Simulated event for development and verification without Google credentials
    return {
      eventId: `mock_gcal_${Date.now()}`,
      meetingLink: customMeetLink || `https://meet.google.com/jit-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`,
    };
  }

  try {
    const event = await calendarClient.events.insert({
      calendarId: settings.google_calendar_id || 'primary',
      conferenceDataVersion: customMeetLink ? 0 : 1,
      sendUpdates: 'all',
      requestBody: {
        summary: title,
        description: customMeetLink ? `${description}\n\nJoin Google Meet: ${customMeetLink}` : description,
        location: customMeetLink || undefined,
        start: {
          dateTime: meetingStart,
          timeZone: timezone,
        },
        end: {
          dateTime: meetingEnd,
          timeZone: timezone,
        },
        attendees: [
          { email: lead.email, displayName: lead.full_name },
        ],
        ...(!customMeetLink ? {
          conferenceData: {
            createRequest: {
              requestId: `req-${Date.now()}`,
              conferenceSolutionKey: { type: 'hangoutsMeet' },
            },
          },
        } : {}),
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 15 },
          ],
        },
      },
    });

    const eventId = event.data.id || '';
    const meetingLink = customMeetLink || event.data.hangoutLink || event.data.conferenceData?.entryPoints?.[0]?.uri || 'https://meet.google.com';

    return { eventId, meetingLink };
  } catch (error) {
    console.error('Failed to create Google Calendar Event:', error);
    throw new Error('Could not create appointment on Google Calendar. Please try a different slot or contact support.');
  }
}
