import fs from 'fs';
import path from 'path';
import { Lead, Booking, AdminSettings } from '@/types';
import { rtdbAdminFetch } from './firebase';

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
  google_calendar_connected: true,
  google_calendar_id: 'primary',
  business_timezone: 'Asia/Kolkata', // Default to India (Asia/Kolkata · IST)
  working_hours_start: '09:00',
  working_hours_end: '18:00',
  working_days: [1, 2, 3, 4, 5],
  meeting_duration_minutes: 30,
  buffer_before_minutes: 15,
  buffer_after_minutes: 15,
  min_notice_hours: 2,
  booking_window_days: 14,
  survey_mode: '5_questions',
  pricing_package_visible: true,
  google_meet_link: '',
  meta_pixel_id: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
  updated_at: new Date().toISOString(),
};

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
  try {
    const val = await rtdbAdminFetch<Record<string, Lead>>('leads');
    if (val && typeof val === 'object') {
      const list: Lead[] = Array.isArray(val)
        ? val.filter(Boolean)
        : Object.values(val);
      return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  } catch (e) {
    console.warn('Firebase RTDB getLeads warning, falling back to local file:', e);
  }
  return readJsonFile<Lead[]>(LEADS_FILE, []);
}

export async function getLeadById(id: string): Promise<Lead | null> {
  try {
    const lead = await rtdbAdminFetch<Lead>(`leads/${id}`);
    if (lead) return lead;
  } catch (e) {
    console.warn('Firebase RTDB getLeadById warning:', e);
  }
  const leads = readJsonFile<Lead[]>(LEADS_FILE, []);
  return leads.find(l => l.id === id) || null;
}

export async function saveLead(leadData: Omit<Lead, 'id' | 'created_at' | 'updated_at' | 'survey_answers' | 'is_qualified'> & {
  id?: string;
  survey_answers?: any;
  is_qualified?: boolean;
}): Promise<Lead> {
  const now = new Date().toISOString();
  const id = leadData.id || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  const newLead: Lead = {
    survey_answers: {},
    is_qualified: true,
    ...leadData,
    id,
    created_at: now,
    updated_at: now,
  };

  // 1. Save to Firebase Realtime Database with master admin bypass
  try {
    await rtdbAdminFetch(`leads/${id}`, { method: 'PUT', body: newLead });
  } catch (e) {
    console.error('Firebase RTDB saveLead error:', e);
  }

  // 2. Also keep local JSON in sync
  try {
    const leads = readJsonFile<Lead[]>(LEADS_FILE, []);
    leads.unshift(newLead);
    writeJsonFile(LEADS_FILE, leads);
  } catch (err) {
    console.error('Local JSON saveLead error:', err);
  }

  return newLead;
}

export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
  const now = new Date().toISOString();
  const leadUpdates = { ...updates, updated_at: now };

  // 1. Update in Firebase Realtime Database
  try {
    await rtdbAdminFetch(`leads/${id}`, { method: 'PATCH', body: leadUpdates });
  } catch (e) {
    console.error('Firebase RTDB updateLead error:', e);
  }

  // 2. Update local JSON
  const leads = readJsonFile<Lead[]>(LEADS_FILE, []);
  const index = leads.findIndex(l => l.id === id);
  if (index !== -1) {
    leads[index] = { ...leads[index], ...leadUpdates };
    writeJsonFile(LEADS_FILE, leads);
    return leads[index];
  }

  return (await getLeadById(id)) || null;
}

export async function updateLeadStatus(id: string, status: Lead['status'], internal_notes?: string): Promise<Lead | null> {
  const updates: Partial<Lead> = { status };
  if (internal_notes !== undefined) {
    updates.internal_notes = internal_notes;
  }
  return updateLead(id, updates);
}

// ================= BOOKING OPERATIONS =================
export async function getBookings(): Promise<Booking[]> {
  try {
    const val = await rtdbAdminFetch<Record<string, Booking>>('bookings');
    if (val && typeof val === 'object') {
      const list: Booking[] = Array.isArray(val)
        ? val.filter(Boolean)
        : Object.values(val);
      return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  } catch (e) {
    console.warn('Firebase RTDB getBookings warning, falling back to local file:', e);
  }
  return readJsonFile<Booking[]>(BOOKINGS_FILE, []);
}

export async function getBookingById(id: string): Promise<Booking | null> {
  try {
    const booking = await rtdbAdminFetch<Booking>(`bookings/${id}`);
    if (booking) return booking;
  } catch (e) {
    console.warn('Firebase RTDB getBookingById warning:', e);
  }
  const bookings = readJsonFile<Booking[]>(BOOKINGS_FILE, []);
  return bookings.find(b => b.id === id) || null;
}

export async function saveBooking(bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at' | 'reschedule_token'> & { id?: string; reschedule_token?: string }): Promise<Booking> {
  const now = new Date().toISOString();
  const id = bookingData.id || `book_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  const newBooking: Booking = {
    ...bookingData,
    id,
    created_at: now,
    updated_at: now,
    google_calendar_event_id: bookingData.google_calendar_event_id || '',
    meeting_link: bookingData.meeting_link || '',
    reschedule_token: bookingData.reschedule_token || Math.random().toString(36).substring(2, 12),
  };

  // 1. Save to Firebase Realtime Database
  try {
    await rtdbAdminFetch(`bookings/${id}`, { method: 'PUT', body: newBooking });
  } catch (e) {
    console.error('Firebase RTDB saveBooking error:', e);
  }

  // 2. Also keep local JSON in sync
  try {
    const bookings = readJsonFile<Booking[]>(BOOKINGS_FILE, []);
    bookings.unshift(newBooking);
    writeJsonFile(BOOKINGS_FILE, bookings);
  } catch (err) {
    console.error('Local JSON saveBooking error:', err);
  }

  return newBooking;
}

export async function updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | null> {
  const now = new Date().toISOString();
  const bookingUpdates = { ...updates, updated_at: now };

  // 1. Update in Firebase Realtime Database
  try {
    await rtdbAdminFetch(`bookings/${id}`, { method: 'PATCH', body: bookingUpdates });
  } catch (e) {
    console.error('Firebase RTDB updateBooking error:', e);
  }

  // 2. Update local JSON
  const bookings = readJsonFile<Booking[]>(BOOKINGS_FILE, []);
  const index = bookings.findIndex(b => b.id === id);
  if (index !== -1) {
    bookings[index] = { ...bookings[index], ...bookingUpdates };
    writeJsonFile(BOOKINGS_FILE, bookings);
    return bookings[index];
  }

  return (await getBookingById(id)) || null;
}

export async function updateBookingStatus(id: string, status: Booking['status'], cancellation_reason?: string): Promise<Booking | null> {
  const updates: Partial<Booking> = { status };
  if (cancellation_reason !== undefined) {
    updates.cancellation_reason = cancellation_reason;
  }
  return updateBooking(id, updates);
}

// ================= SETTINGS OPERATIONS =================
let cachedSettings: AdminSettings | null = null;
let settingsCacheTime = 0;
const SETTINGS_CACHE_TTL = 60 * 1000; // 60s cache

export async function getSettings(forceRefresh = false): Promise<AdminSettings> {
  const now = Date.now();
  if (!forceRefresh && cachedSettings && now - settingsCacheTime < SETTINGS_CACHE_TTL) {
    return cachedSettings;
  }

  try {
    const val = await rtdbAdminFetch<AdminSettings>('settings');
    if (val && typeof val === 'object' && Object.keys(val).length > 0) {
      cachedSettings = { ...DEFAULT_SETTINGS, ...val };
      settingsCacheTime = now;
      return cachedSettings;
    }
  } catch (e) {
    console.warn('Firebase RTDB getSettings warning:', e);
  }

  cachedSettings = readJsonFile<AdminSettings>(SETTINGS_FILE, DEFAULT_SETTINGS);
  settingsCacheTime = now;
  return cachedSettings;
}

export async function updateSettings(updates: Partial<AdminSettings>): Promise<AdminSettings> {
  const current = await getSettings(true);
  const updated: AdminSettings = {
    ...current,
    ...updates,
    updated_at: new Date().toISOString(),
  };

  // Invalidate in-memory settings cache
  cachedSettings = updated;
  settingsCacheTime = Date.now();

  // 1. Save to Firebase Realtime Database
  try {
    await rtdbAdminFetch('settings', { method: 'PATCH', body: updated });
  } catch (e) {
    console.error('Firebase RTDB updateSettings error:', e);
  }

  // 2. Update local JSON
  writeJsonFile(SETTINGS_FILE, updated);
  return updated;
}
