export type BusinessType = 
  | 'IT support / Managed IT services'
  | 'Computer repair / Onsite IT services'
  | 'Independent IT consultant'
  | 'Internal corporate IT department'
  | 'Other';

export type UserRole = 
  | 'Owner / Founder'
  | 'Partner / Director'
  | 'Operations / Support Manager'
  | 'Other';

export type PayingClientsStatus = 
  | 'Yes, regularly'
  | 'Yes, occasionally'
  | 'Not yet';

export type BudgetFit = 
  | 'Yes'
  | 'Possibly, after a demo'
  | 'No';

export type Timeline = 
  | 'Within 30 days'
  | 'Within 1–3 months'
  | 'Later / researching';

export type LeadStatus = 
  | 'new'
  | 'qualified'
  | 'unqualified'
  | 'meeting_booked'
  | 'meeting_completed'
  | 'no_show'
  | 'follow_up'
  | 'closed';

export interface SurveyAnswers {
  business_type?: BusinessType | string;
  role?: UserRole | string;
  serving_paying_clients?: PayingClientsStatus | string;
  budget_fit?: BudgetFit | string;
  timeline?: Timeline | string;
  [key: string]: any;
}

export interface UTMParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  ad_id?: string;
  landing_page_url?: string;
}

export interface Lead {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  survey_answers: SurveyAnswers;
  is_qualified: boolean;
  qualification_notes?: string;
  status: LeadStatus;
  utm_params: UTMParameters;
  internal_notes?: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  created_at: string;
  lead_id: string;
  google_calendar_event_id?: string;
  meeting_title: string;
  meeting_start: string;
  meeting_end: string;
  admin_timezone: string;
  prospect_timezone: string;
  status: 'confirmed' | 'rescheduled' | 'cancelled' | 'completed' | 'no_show';
  meeting_link?: string;
  reschedule_token: string;
  cancellation_reason?: string;
  updated_at: string;
  lead?: Lead;
}

export interface TimeSlot {
  start: string; // ISO string
  end: string;   // ISO string
  formattedTime: string;
  available: boolean;
}

export interface AdminSettings {
  id: string;
  google_calendar_connected: boolean;
  google_calendar_id: string;
  business_timezone: string; // e.g. "America/New_York", "America/Chicago", "America/Los_Angeles"
  working_hours_start: string; // e.g. "09:00"
  working_hours_end: string;   // e.g. "17:00"
  working_days: number[];      // [1,2,3,4,5] (Mon-Fri)
  meeting_duration_minutes: number;
  buffer_before_minutes: number;
  buffer_after_minutes: number;
  min_notice_hours: number;
  booking_window_days: number;
  survey_mode: '5_questions' | '3_questions';
  pricing_package_visible: boolean;
  meta_pixel_id: string;
  updated_at: string;
}
