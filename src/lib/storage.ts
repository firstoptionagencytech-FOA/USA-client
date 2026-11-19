import fs from 'fs';
import path from 'path';
import { Lead, Booking, AdminSettings } from '@/types';
import { createClient } from '@supabase/supabase-js';

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Initial Default Settings
export const DEFAULT_SETTINGS: AdminSettings = {
  id: 'default',
  google_calendar_connected: true, // Connected with automated Google FreeBusy availability engine
  google_calendar_id: 'primary',
  business_timezone: 'America/New_York', // Standard US Eastern Time
  working_hours_start: '09:00',
  working_hours_end: '17:00',
  working_days: [1, 2, 3, 4, 5], // Monday through Friday
  meeting_duration_minutes: 30,
  buffer_before_minutes: 15,
  buffer_after_minutes: 15,
  min_notice_hours: 4,
  booking_window_days: 14,
  survey_mode: '5_questions',
  pricing_package_visible: true,
  meta_pixel_id: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
  updated_at: new Date().toISOString(),
};

// Supabase client initialization helper
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && key) {
    try {
      return createClient(url, key);
    } catch (e) {
      console.warn('Could not initialize Supabase client:', e);
    }
  }
  return null;
}

// File system fallback helpers
function readJsonFile<T>(filePath: string, defaultValue: T): T {
  ensureDataDir();
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf-8');
    return defaultValue;
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return defaultValue;
  }
}

function writeJsonFile<T>(filePath: string, data: T) {
  ensureDataDir();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ================= LEAD OPERATIONS =================
export async function getLeads(): Promise<Lead[]> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        return data as Lead[];
      }
    } catch (e) {
      console.warn('Supabase getLeads error, falling back to local file storage:', e);
    }
  }
  return readJsonFile<Lead[]>(LEADS_FILE, []);
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('id', id)
        .single();
      if (!error && data) return data as Lead;
    } catch (e) {
      console.warn('Supabase getLeadById error:', e);
    }
  }
  const leads = readJsonFile<Lead[]>(LEADS_FILE, []);
  return leads.find(l => l.id === id) || null;
}

export async function saveLead(leadData: Partial<Lead>): Promise<Lead> {
  const now = new Date().toISOString();
  const id = leadData.id || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const lead: Lead = {
    id,
    created_at: leadData.created_at || now,
    full_name: leadData.full_name || '',
    email: leadData.email || '',
    phone: leadData.phone || '',
    company_name: leadData.company_name || '',
    survey_answers: leadData.survey_answers || {},
    is_qualified: leadData.is_qualified ?? false,
    qualification_notes: leadData.qualification_notes || '',
    status: leadData.status || (leadData.is_qualified ? 'qualified' : 'new'),
    utm_params: leadData.utm_params || {},
    internal_notes: leadData.internal_notes || '',
    updated_at: now,
  };

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase.from('leads').upsert(lead);
      if (!error) return lead;
    } catch (e) {
      console.warn('Supabase saveLead error, using local fallback:', e);
    }
  }

  const leads = readJsonFile<Lead[]>(LEADS_FILE, []);
  const index = leads.findIndex(l => l.id === lead.id);
  if (index >= 0) {
    leads[index] = { ...leads[index], ...lead, updated_at: now };
  } else {
    leads.unshift(lead);
  }
  writeJsonFile(LEADS_FILE, leads);
  return lead;
}

export async function updateLeadStatus(id: string, status: Lead['status'], internal_notes?: string): Promise<Lead | null> {
  const lead = await getLeadById(id);
  if (!lead) return null;
  lead.status = status;
  if (internal_notes !== undefined) {
    lead.internal_notes = internal_notes;
  }
  lead.updated_at = new Date().toISOString();
  return await saveLead(lead);
}

// ================= BOOKING OPERATIONS =================
export async function getBookings(): Promise<Booking[]> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*, leads(*)')
        .order('meeting_start', { ascending: true });
      if (!error && data) {
        return data as Booking[];
      }
    } catch (e) {
      console.warn('Supabase getBookings error:', e);
    }
  }
  const bookings = readJsonFile<Booking[]>(BOOKINGS_FILE, []);
  const leads = readJsonFile<Lead[]>(LEADS_FILE, []);
  return bookings.map(b => ({
    ...b,
    lead: leads.find(l => l.id === b.lead_id),
  }));
}

export async function saveBooking(bookingData: Partial<Booking>): Promise<Booking> {
  const now = new Date().toISOString();
  const id = bookingData.id || `book_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const booking: Booking = {
    id,
    created_at: bookingData.created_at || now,
    lead_id: bookingData.lead_id || '',
    google_calendar_event_id: bookingData.google_calendar_event_id || '',
    meeting_title: bookingData.meeting_title || 'JIT Helpdesk Demo & Solution Walkthrough',
    meeting_start: bookingData.meeting_start || now,
    meeting_end: bookingData.meeting_end || now,
    admin_timezone: bookingData.admin_timezone || 'America/New_York',
    prospect_timezone: bookingData.prospect_timezone || 'America/New_York',
    status: bookingData.status || 'confirmed',
    meeting_link: bookingData.meeting_link || `https://meet.google.com/jit-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`,
    reschedule_token: bookingData.reschedule_token || Math.random().toString(36).substring(2, 12),
    cancellation_reason: bookingData.cancellation_reason || '',
    updated_at: now,
  };

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from('bookings').upsert({
        ...booking,
        lead: undefined,
      });
    } catch (e) {
      console.warn('Supabase saveBooking error:', e);
    }
  }

  const bookings = readJsonFile<Booking[]>(BOOKINGS_FILE, []);
  const index = bookings.findIndex(b => b.id === booking.id);
  if (index >= 0) {
    bookings[index] = booking;
  } else {
    bookings.push(booking);
  }
  writeJsonFile(BOOKINGS_FILE, bookings);

  // Update lead status to meeting_booked
  if (booking.lead_id) {
    await updateLeadStatus(booking.lead_id, 'meeting_booked');
  }

  return booking;
}

export async function updateBookingStatus(
  id: string,
  status: Booking['status'],
  cancellation_reason?: string
): Promise<Booking | null> {
  const bookings = await getBookings();
  const booking = bookings.find(b => b.id === id);
  if (!booking) return null;
  booking.status = status;
  if (cancellation_reason) booking.cancellation_reason = cancellation_reason;
  booking.updated_at = new Date().toISOString();
  await saveBooking(booking);
  return booking;
}

// ================= SETTINGS OPERATIONS =================
export async function getSettings(): Promise<AdminSettings> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .eq('id', 'default')
        .single();
      if (!error && data) return data as AdminSettings;
    } catch (e) {
      console.warn('Supabase getSettings error:', e);
    }
  }
  return readJsonFile<AdminSettings>(SETTINGS_FILE, DEFAULT_SETTINGS);
}

export async function updateSettings(settingsData: Partial<AdminSettings>): Promise<AdminSettings> {
  const current = await getSettings();
  const updated: AdminSettings = {
    ...current,
    ...settingsData,
    updated_at: new Date().toISOString(),
  };

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from('admin_settings').upsert(updated);
    } catch (e) {
      console.warn('Supabase updateSettings error:', e);
    }
  }

  writeJsonFile(SETTINGS_FILE, updated);
  return updated;
}
