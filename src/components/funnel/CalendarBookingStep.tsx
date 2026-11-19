'use client';

import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Globe, ArrowLeft, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { TimeSlot, Booking } from '@/types';
import { trackMetaEvent } from '@/lib/meta-pixel';

interface CalendarBookingStepProps {
  leadId: string;
  onSuccess: (booking: Booking) => void;
  onBack: () => void;
}

export const CalendarBookingStep: React.FC<CalendarBookingStepProps> = ({ leadId, onSuccess, onBack }) => {
  // Common US Business Timezones
  const usTimezones = [
    { label: 'Eastern Time (ET / US & Canada)', value: 'America/New_York' },
    { label: 'Central Time (CT / US & Canada)', value: 'America/Chicago' },
    { label: 'Mountain Time (MT / US & Canada)', value: 'America/Denver' },
    { label: 'Pacific Time (PT / US & Canada)', value: 'America/Los_Angeles' },
  ];

  // Default to detected browser timezone or Eastern Time
  const [selectedTimezone, setSelectedTimezone] = useState<string>('America/New_York');

  useEffect(() => {
    try {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (detected) {
        // If detected is one of US or valid, use it
        setSelectedTimezone(detected);
      }
    } catch (e) {
      // fallback
    }
  }, []);

  // Compute available dates (next 14 weekdays excluding weekends)
  const [availableDates, setAvailableDates] = useState<{ dateStr: string; display: string; dayName: string }[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    const dates: { dateStr: string; display: string; dayName: string }[] = [];
    const curr = new Date();
    // Start tomorrow or next valid business day
    curr.setDate(curr.getDate() + 1);

    while (dates.length < 10) {
      const day = curr.getDay();
      if (day !== 0 && day !== 6) {
        // Mon-Fri
        const yyyy = curr.getFullYear();
        const mm = String(curr.getMonth() + 1).padStart(2, '0');
        const dd = String(curr.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}-${mm}-${dd}`;

        const dayName = curr.toLocaleDateString('en-US', { weekday: 'short' });
        const display = curr.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        dates.push({ dateStr, display, dayName });
      }
      curr.setDate(curr.getDate() + 1);
    }

    setAvailableDates(dates);
    if (dates.length > 0) {
      setSelectedDate(dates[0].dateStr);
    }
  }, []);

  // Slots state
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Fetch slots whenever selectedDate or selectedTimezone changes
  useEffect(() => {
    if (!selectedDate) return;

    let isMounted = true;
    const fetchSlots = async () => {
      setLoadingSlots(true);
      setError('');
      setSelectedSlot(null);

      try {
        const res = await fetch(`/api/availability?date=${selectedDate}&timezone=${encodeURIComponent(selectedTimezone)}`);
        const data = await res.json();

        if (isMounted) {
          if (res.ok && data.success) {
            setSlots(data.slots || []);
          } else {
            setError(data.error || 'Failed to fetch available slots.');
            setSlots([]);
          }
        }
      } catch (err: any) {
        if (isMounted) {
          setError('Could not connect to availability engine. Please try again.');
          setSlots([]);
        }
      } finally {
        if (isMounted) {
          setLoadingSlots(false);
        }
      }
    };

    fetchSlots();

    return () => {
      isMounted = false;
    };
  }, [selectedDate, selectedTimezone]);

  // Handle final booking confirmation
  const handleConfirmBooking = async () => {
    if (!selectedSlot) {
      setError('Please select an available appointment time.');
      return;
    }

    setBookingLoading(true);
    setError('');

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: leadId,
          start_time: selectedSlot.start,
          end_time: selectedSlot.end,
          prospect_timezone: selectedTimezone,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to book slot.');
      }

      // Track Meta Pixel Schedule event
      trackMetaEvent('Schedule', {
        content_name: 'JIT Helpdesk Confirmed Demo',
        lead_id: leadId,
        booking_id: data.booking.id,
      }, data.booking.id);

      onSuccess(data.booking);
    } catch (err: any) {
      setError(err.message || 'The selected slot was recently booked. Please pick another time.');
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8">
      
      {/* Header */}
      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          ✓ Qualified · Step 3 of 3: Reserve Demo
        </span>
        <h3 className="text-2xl font-extrabold text-slate-900 mt-2 font-display">
          Select Your Personalized Demo Time
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Live availability synced with our US engineering schedule via Google Calendar.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Timezone Selector */}
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <Globe className="w-4 h-4 text-brand-700" />
          <span>Displaying availability in:</span>
        </div>
        <select
          value={selectedTimezone}
          onChange={e => setSelectedTimezone(e.target.value)}
          className="text-xs font-bold bg-white text-slate-900 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-700"
        >
          {usTimezones.map(tz => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
          {/* Also include detected timezone if not in default US list */}
          {!usTimezones.some(tz => tz.value === selectedTimezone) && (
            <option value={selectedTimezone}>{selectedTimezone}</option>
          )}
        </select>
      </div>

      {/* Date Horizontal Picker */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-700 mb-2">
          Select Date:
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {availableDates.map(item => {
            const isSelected = selectedDate === item.dateStr;
            return (
              <button
                key={item.dateStr}
                type="button"
                onClick={() => setSelectedDate(item.dateStr)}
                className={`flex flex-col items-center justify-center min-w-[70px] p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-brand-700 text-white border-brand-700 shadow-sm'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <span className={`text-[10px] font-bold uppercase ${isSelected ? 'text-pink-200' : 'text-slate-400'}`}>
                  {item.dayName}
                </span>
                <span className="text-xs font-extrabold mt-0.5">
                  {item.display}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Available Slots Grid */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-700" />
            <span>Available 30-Minute Slots:</span>
          </label>
          {loadingSlots && (
            <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
              <Loader2 className="w-3 h-3 animate-spin text-brand-700" /> Checking FreeBusy...
            </span>
          )}
        </div>

        {loadingSlots ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400 text-xs">
            <Loader2 className="w-6 h-6 animate-spin text-brand-700 mb-2" />
            <span>Consulting Google Calendar availability...</span>
          </div>
        ) : slots.length === 0 ? (
          <div className="py-8 px-4 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
            No remaining slots available on this date. Please select a different date above.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
            {slots.map((slot, idx) => {
              const isSelected = selectedSlot?.start === slot.start;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                    isSelected
                      ? 'bg-brand-700 text-white border-brand-700 shadow-sm'
                      : 'bg-white hover:border-brand-300 border-slate-200 text-slate-800'
                  }`}
                >
                  {slot.formattedTime}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <button
          type="button"
          disabled={!selectedSlot || bookingLoading}
          onClick={handleConfirmBooking}
          className="cta-glow-btn px-6 py-3.5 rounded-full text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
        >
          {bookingLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Confirming on Google Calendar...</span>
            </>
          ) : (
            <>
              <span>Confirm Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

    </div>
  );
};
