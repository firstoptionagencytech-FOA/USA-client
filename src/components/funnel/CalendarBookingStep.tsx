'use client';

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Video,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  UserCheck
} from 'lucide-react';
import { Booking } from '@/types';
import { trackMetaEvent } from '@/lib/meta-pixel';

interface CalendarBookingStepProps {
  leadId: string;
  leadData?: { full_name: string; email: string; phone: string; company_name: string } | null;
  onSuccess: (booking: Booking) => void;
  onBack: () => void;
}

export const CalendarBookingStep: React.FC<CalendarBookingStepProps> = ({
  leadId,
  leadData,
  onSuccess,
  onBack,
}) => {
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);
  const [hasOpenedGoogle, setHasOpenedGoogle] = useState<boolean>(false);
  const [showEmbeddedIframe, setShowEmbeddedIframe] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const googleScheduleUrl =
    'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3twFfOxhNQx8ICypZewI3dwlf6MFY5rd2_ipwJ2gtwJaqBWI5QRuyy7p9Yqw4saKWKjq6TeHMU?gv=true';
  const directLinkUrl = 'https://calendar.app.google/wnp1kHMUuZ4UPv3y5';

  // Open Google Calendar in New Tab & track schedule intent
  const handleOpenGoogleCalendar = async () => {
    // Open in new tab immediately so popup blockers don't block it
    window.open(directLinkUrl, '_blank', 'noopener,noreferrer');
    setHasOpenedGoogle(true);

    try {
      await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: leadId,
          mode: 'google_schedule_confirm',
        }),
      });

      trackMetaEvent('Schedule', {
        content_name: 'JIT Helpdesk Google Calendar Opened',
        lead_id: leadId,
      });
    } catch (e) {
      // Background sync, non-blocking
    }
  };

  // Complete and go to confirmation screen
  const handleConfirmDone = async () => {
    setBookingLoading(true);
    setError('');

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: leadId,
          mode: 'google_schedule_confirm',
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to record booking.');
      }

      trackMetaEvent('Schedule', {
        content_name: 'JIT Helpdesk Google Calendar Confirmed Demo',
        lead_id: leadId,
        booking_id: data.booking?.id,
      }, data.booking?.id);

      onSuccess(data.booking);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="p-5 sm:p-7 flex flex-col">
      {/* Header */}
      <div className="text-center mb-5">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Qualified VIP Lead · Step 3 of 3</span>
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-display">
          Lock In Your 1-on-1 VIP Demo
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
          Your profile is approved. Reserve a direct 30-minute walkthrough with our US engineering lead.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* VIP Booking Ticket / Confirmation Card */}
      <div className="rounded-2xl bg-gradient-to-br from-[#182c26] to-[#0f1d19] text-white p-5 sm:p-6 mb-5 border border-[#274c3b] shadow-xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-[#d2f56d]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-[#274c3b]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#d2f56d]/20 flex items-center justify-center text-[#d2f56d]">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#d2f56d]">
                Verified Prospect
              </div>
              <div className="text-sm font-bold text-white">
                {leadData?.full_name || 'Valued IT Leader'}
              </div>
            </div>
          </div>
          {leadData?.company_name && (
            <span className="text-xs font-semibold text-emerald-200/90 bg-[#274c3b]/60 px-2.5 py-1 rounded-lg border border-[#376b53]">
              {leadData.company_name}
            </span>
          )}
        </div>

        {/* Meeting Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Clock className="w-4 h-4 text-[#d2f56d] shrink-0" />
            <span>30-Min Live Interactive Walkthrough</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Video className="w-4 h-4 text-[#d2f56d] shrink-0" />
            <span>HD Google Meet (Auto-dispatched)</span>
          </div>
        </div>

        {/* Primary 1-Click Action Button */}
        <div className="mt-5 pt-4 border-t border-[#274c3b]/80 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleOpenGoogleCalendar}
            className="w-full group cta-glow-btn py-3.5 px-6 rounded-xl text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg cursor-pointer transition-all hover:scale-[1.01]"
          >
            <CalendarIcon className="w-5 h-5 text-[#d2f56d] group-hover:rotate-6 transition-transform" />
            <span>Choose Your Time on Google Calendar</span>
            <ExternalLink className="w-4 h-4 text-[#d2f56d]" />
          </button>
          <span className="text-[11px] text-center text-slate-400">
            Opens Google Calendar Appointment schedule. Works with 1-click on phone or laptop.
          </span>
        </div>
      </div>

      {/* Status banner when opened */}
      {hasOpenedGoogle && (
        <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold">Google Calendar opened in a new tab!</div>
            <div className="text-[11px] text-emerald-700 mt-0.5">
              Pick your preferred date &amp; time there. Once done, click below to view your confirmation details.
            </div>
          </div>
        </div>
      )}

      {/* Accordion Toggle to View Inline Iframe */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() => setShowEmbeddedIframe(!showEmbeddedIframe)}
          className="w-full flex items-center justify-between text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <CalendarIcon className="w-3.5 h-3.5 text-slate-500" />
            <span>Prefer to schedule right here inside this window?</span>
          </span>
          {showEmbeddedIframe ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {showEmbeddedIframe && (
          <div className="mt-3 w-full h-[520px] rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-inner animate-in fade-in duration-200">
            <iframe
              src={googleScheduleUrl}
              style={{ border: 0 }}
              width="100%"
              height="100%"
              frameBorder="0"
              title="Google Calendar Appointment Scheduling"
              className="w-full h-full"
            />
          </div>
        )}
      </div>

      {/* Bottom Footer Controls */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={handleConfirmDone}
          disabled={bookingLoading}
          className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#182c26] hover:bg-[#274c3b] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md transition-all disabled:opacity-50"
        >
          {bookingLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Confirming...</span>
            </>
          ) : (
            <>
              <span>I&apos;ve Picked My Time</span>
              <ArrowRight className="w-4 h-4 text-[#d2f56d]" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
