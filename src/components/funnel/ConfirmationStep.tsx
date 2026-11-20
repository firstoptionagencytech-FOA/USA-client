'use client';

import React from 'react';
import { CheckCircle2, Calendar, Clock, Video, Globe, Download, Check } from 'lucide-react';
import { Booking } from '@/types';

interface ConfirmationStepProps {
  booking: Booking;
  onClose: () => void;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ booking, onClose }) => {
  const startDate = new Date(booking.meeting_start);
  const formattedDate = startDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = startDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: booking.prospect_timezone,
  });

  // Generate Google Calendar Add URL
  const gcalTitle = encodeURIComponent(booking.meeting_title || 'JIT Helpdesk Demo');
  const gcalDetails = encodeURIComponent(`Personalized Walkthrough of JIT Helpdesk Branded Mobile App & Web Portal.\nMeeting Link: ${booking.meeting_link || 'https://meet.google.com'}`);
  const gcalDates = `${startDate.toISOString().replace(/-|:|\.\d\d\d/g, '')}/${new Date(booking.meeting_end).toISOString().replace(/-|:|\.\d\d\d/g, '')}`;
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gcalTitle}&dates=${gcalDates}&details=${gcalDetails}&location=${encodeURIComponent(booking.meeting_link || 'Google Meet')}`;

  return (
    <div className="p-6 sm:p-8 text-center">
      
      {/* Success Badge */}
      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm animate-bounce-subtle">
        <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
      </div>

      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
        Demo Appointment Confirmed
      </span>

      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-display mb-1">
        We Look Forward to Meeting You!
      </h3>
      
      <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-md mx-auto">
        A calendar invitation with your secure Google Meet link has been dispatched to your email.
      </p>

      {/* Appointment Summary Card */}
      <div className="bg-[#f6f6ef] rounded-2xl p-5 border border-slate-200 text-left max-w-md mx-auto mb-6 space-y-3">
        <div className="flex items-start gap-3">
          <Calendar className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">Date</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900">{formattedDate}</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">Time & Duration</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900">
              {formattedTime} (30 Minutes)
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Globe className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">Timezone</div>
            <div className="text-xs font-semibold text-slate-700">{booking.prospect_timezone}</div>
          </div>
        </div>

        {booking.meeting_link && (
          <div className="flex items-start gap-3 pt-2 border-t border-slate-200">
            <Video className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-400">Video Conference</div>
              <a
                href={booking.meeting_link}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-brand-700 hover:underline break-all"
              >
                {booking.meeting_link}
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-6">
        <a
          href={gcalUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-colors"
        >
          <Calendar className="w-3.5 h-3.5 text-brand-700" />
          <span>Add to Google Calendar</span>
        </a>

        <button
          onClick={onClose}
          className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold transition-colors cursor-pointer"
        >
          Done
        </button>
      </div>

      <div className="text-[11px] text-slate-400">
        Need to reschedule? Check your confirmation email for a 1-click self-reschedule link.
      </div>

    </div>
  );
};
