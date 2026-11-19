-- ==========================================================
-- JIT HELPDESK PRODUCTION SUPABASE POSTGRESQL SCHEMA
-- Migration: 20261120000000_init_jit_helpdesk.sql
-- ==========================================================

-- Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Table: leads
CREATE TABLE IF NOT EXISTS public.leads (
  id TEXT PRIMARY KEY DEFAULT ('lead_' || extract(epoch from now())::bigint || '_' || substr(md5(random()::text), 1, 6)),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT,
  survey_answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_qualified BOOLEAN NOT NULL DEFAULT false,
  qualification_notes TEXT,
  status TEXT NOT NULL DEFAULT 'new', -- 'new', 'qualified', 'unqualified', 'meeting_booked', 'meeting_completed', 'no_show', 'follow_up', 'closed'
  utm_params JSONB NOT NULL DEFAULT '{}'::jsonb,
  internal_notes TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: bookings
CREATE TABLE IF NOT EXISTS public.bookings (
  id TEXT PRIMARY KEY DEFAULT ('book_' || extract(epoch from now())::bigint || '_' || substr(md5(random()::text), 1, 6)),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  lead_id TEXT REFERENCES public.leads(id) ON DELETE CASCADE,
  google_calendar_event_id TEXT,
  meeting_title TEXT NOT NULL DEFAULT 'JIT Helpdesk Demo & Solution Walkthrough',
  meeting_start TIMESTAMPTZ NOT NULL,
  meeting_end TIMESTAMPTZ NOT NULL,
  admin_timezone TEXT NOT NULL DEFAULT 'America/New_York',
  prospect_timezone TEXT NOT NULL DEFAULT 'America/New_York',
  status TEXT NOT NULL DEFAULT 'confirmed', -- 'confirmed', 'rescheduled', 'cancelled', 'completed', 'no_show'
  meeting_link TEXT,
  reschedule_token TEXT UNIQUE NOT NULL DEFAULT substr(md5(random()::text), 1, 16),
  cancellation_reason TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: admin_settings
CREATE TABLE IF NOT EXISTS public.admin_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  google_calendar_connected BOOLEAN NOT NULL DEFAULT true,
  google_calendar_id TEXT NOT NULL DEFAULT 'primary',
  business_timezone TEXT NOT NULL DEFAULT 'America/New_York',
  working_hours_start TEXT NOT NULL DEFAULT '09:00',
  working_hours_end TEXT NOT NULL DEFAULT '17:00',
  working_days JSONB NOT NULL DEFAULT '[1,2,3,4,5]'::jsonb,
  meeting_duration_minutes INTEGER NOT NULL DEFAULT 30,
  buffer_before_minutes INTEGER NOT NULL DEFAULT 15,
  buffer_after_minutes INTEGER NOT NULL DEFAULT 15,
  min_notice_hours INTEGER NOT NULL DEFAULT 4,
  booking_window_days INTEGER NOT NULL DEFAULT 14,
  survey_mode TEXT NOT NULL DEFAULT '5_questions',
  pricing_package_visible BOOLEAN NOT NULL DEFAULT true,
  meta_pixel_id TEXT DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: meta_events_log
CREATE TABLE IF NOT EXISTS public.meta_events_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id TEXT REFERENCES public.leads(id) ON DELETE SET NULL,
  event_name TEXT NOT NULL,
  event_id TEXT UNIQUE,
  event_time TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_data JSONB,
  custom_data JSONB,
  status TEXT NOT NULL DEFAULT 'recorded'
);

-- Indexes for lightning fast queries
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_bookings_meeting_start ON public.bookings(meeting_start ASC);
CREATE INDEX IF NOT EXISTS idx_bookings_lead_id ON public.bookings(lead_id);
CREATE INDEX IF NOT EXISTS idx_meta_events_lead_id ON public.meta_events_log(lead_id);

-- Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meta_events_log ENABLE ROW LEVEL SECURITY;

-- Allow public insertion for lead capture and booking from the funnel
CREATE POLICY "Public insert leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read bookings by token" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Public insert meta_events" ON public.meta_events_log FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read admin_settings" ON public.admin_settings FOR SELECT USING (true);

-- Admin authenticated users full access
CREATE POLICY "Admin full access leads" ON public.leads FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access bookings" ON public.bookings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access admin_settings" ON public.admin_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access meta_events" ON public.meta_events_log FOR ALL USING (auth.role() = 'authenticated');

-- Insert initial default settings row if missing
INSERT INTO public.admin_settings (id, business_timezone, working_hours_start, working_hours_end, survey_mode)
VALUES ('default', 'America/New_York', '09:00', '17:00', '5_questions')
ON CONFLICT (id) DO NOTHING;
