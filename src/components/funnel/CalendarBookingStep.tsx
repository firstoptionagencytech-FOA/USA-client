'use client';

import React, { useState } from 'react';
import { Calendar as CalendarIcon, ExternalLink, ArrowLeft, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Booking } from '@/types';
import { trackMetaEvent } from '@/lib/meta-pixel';

interface CalendarBookingStepProps {
  leadId: string;
  onSuccess: (booking: Booking) => void;
  onBack: () => void;
}

export const CalendarBookingStep: React.FC<CalendarBookingStepProps> = ({ leadId, onSuccess, onBack }) => {
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const googleScheduleUrl = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3twFfOxhNQx8ICypZewI3dwlf6MFY5rd2_ipwJ2gtwJaqBWI5QRuyy7p9Yqw4saKWKjq6TeHMU?gv=true';
  const directLinkUrl = 'https://calendar.app.google/wnp1kHMUuZ4UPv3y5';

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

      // Track Meta Pixel Schedule event
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
    <div className="p-4 sm:p-6 flex flex-col">
      {/* Header */}
      <div className="text-center mb-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          ✓ Qualified · Step 3 of 3: Reserve Demo
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2 font-display">
          Select Your Personalized Demo Time
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Pick an available slot below on our official Google Calendar appointment schedule.
        </p>
      </div>

      {error && (
        <div className="mb-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Top Helper Bar with Direct Link */}
      <div className="mb-3 flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs">
        <div className="flex items-center gap-2 text-slate-700 font-medium">
          <CalendarIcon className="w-4 h-4 text-[#274c3b]" />
          <span className="hidden sm:inline">Synced live with US Engineering Schedule</span>
          <span className="sm:hidden">Live Google Schedule</span>
        </div>
        <a
          href={directLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-bold text-[#274c3b] hover:text-[#182c26] bg-white border border-slate-200 hover:border-slate-300 px-2.5 py-1 rounded-lg text-[11px] transition-colors shadow-2xs"
        >
          <span>Open Fullscreen</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Google Calendar Appointment Iframe */}
      <div className="w-full h-[540px] sm:h-[580px] rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-inner relative">
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

      {/* Bottom Controls */}
      <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-3">
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
          className="cta-glow-btn px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
        >
          {bookingLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Booking...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 text-[#d2f56d]" />
              <span>I&apos;ve Confirmed My Meeting</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
