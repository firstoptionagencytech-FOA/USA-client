import { NextRequest, NextResponse } from 'next/server';
import { verifySlotStillAvailable, createGoogleCalendarEvent } from '@/lib/calendar';
import { getLeadById, saveBooking, getSettings, updateLeadStatus } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lead_id, start_time, end_time, prospect_timezone, mode } = body;

    if (!lead_id) {
      return NextResponse.json(
        { success: false, error: 'Lead ID is required.' },
        { status: 400 }
      );
    }

    const lead = await getLeadById(lead_id);
    if (!lead) {
      return NextResponse.json({ success: false, error: 'Lead not found.' }, { status: 404 });
    }

    const settings = await getSettings();
    const timezone = prospect_timezone || settings.business_timezone || 'America/New_York';

    // Handle Google Appointment Scheduling direct confirmation
    if (mode === 'google_schedule_confirm' || (!start_time && !end_time)) {
      const now = new Date();
      const defaultStart = start_time || now.toISOString();
      const defaultEnd = end_time || new Date(now.getTime() + 30 * 60000).toISOString();
      const meetingLink = settings.google_meet_link || 'https://calendar.app.google/wnp1kHMUuZ4UPv3y5';

      const booking = await saveBooking({
        lead_id,
        meeting_title: `Google Calendar Demo: ${lead.company_name || lead.full_name}`,
        meeting_start: defaultStart,
        meeting_end: defaultEnd,
        admin_timezone: settings.business_timezone,
        prospect_timezone: timezone,
        google_calendar_event_id: 'gcal_appointment_schedule',
        meeting_link: meetingLink,
        status: 'confirmed',
      });

      await updateLeadStatus(lead_id, 'meeting_booked');

      return NextResponse.json({
        success: true,
        booking,
        message: 'Google Calendar Appointment successfully recorded!',
      });
    }

    // Concurrency Guard: Check if slot was just taken by another user
    const isAvailable = await verifySlotStillAvailable(start_time, end_time);
    if (!isAvailable) {
      return NextResponse.json(
        {
          success: false,
          error: 'This appointment slot was just reserved or is no longer available. Please select another time.',
        },
        { status: 409 }
      );
    }

    // Create the event in Google Calendar
    const calendarResult = await createGoogleCalendarEvent({
      lead,
      meetingStart: start_time,
      meetingEnd: end_time,
      timezone,
    });

    // Save booking to internal database
    const booking = await saveBooking({
      lead_id,
      meeting_title: `JIT Helpdesk Demo: ${lead.company_name || lead.full_name}`,
      meeting_start: start_time,
      meeting_end: end_time,
      admin_timezone: settings.business_timezone,
      prospect_timezone: timezone,
      google_calendar_event_id: calendarResult.eventId,
      meeting_link: calendarResult.meetingLink,
      status: 'confirmed',
    });

    // Update lead status to meeting_booked
    await updateLeadStatus(lead_id, 'meeting_booked');

    return NextResponse.json({
      success: true,
      booking,
      message: 'Appointment successfully confirmed and scheduled!',
    });
  } catch (err: any) {
    console.error('Booking API Error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
