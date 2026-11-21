'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Calendar as CalendarIcon, Clock, Globe, ArrowLeft, ArrowRight, Loader2, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { TimeSlot, Booking } from '@/types';
import { trackMetaEvent } from '@/lib/meta-pixel';
import { getCachedSlots, setCachedSlots, clearSlotsCache } from '@/lib/slotsClientCache';

interface CalendarBookingStepProps {
  leadId: string;
  onSuccess: (booking: Booking) => void;
  onBack: () => void;
}

// Compute upcoming weekdays (Mon-Fri) synchronously to avoid blank initial render
function computeUpcomingWeekdays(count = 10): { dateStr: string; display: string; dayName: string; fullDate: string }[] {
  const dates: { dateStr: string; display: string; dayName: string; fullDate: string }[] = [];
  const curr = new Date();
  curr.setDate(curr.getDate() + 1); // Start tomorrow

  while (dates.length < count) {
    const day = curr.getDay();
    if (day !== 0 && day !== 6) {
      const yyyy = curr.getFullYear();
      const mm = String(curr.getMonth() + 1).padStart(2, '0');
      const dd = String(curr.getDate()).padStart(2, '0');
      const dateStr = `${yyyy}-${mm}-${dd}`;
      const dayName = curr.toLocaleDateString('en-US', { weekday: 'short' });
      const display = curr.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const fullDate = curr.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      dates.push({ dateStr, display, dayName, fullDate });
    }
    curr.setDate(curr.getDate() + 1);
  }
  return dates;
}

export const CalendarBookingStep: React.FC<CalendarBookingStepProps> = ({ leadId, onSuccess, onBack }) => {
  // Common US Business Timezones (Strictly US Only on Landing Page)
  const usTimezones = [
    { label: 'Eastern Time (ET)', short: 'Eastern', code: 'ET', value: 'America/New_York' },
    { label: 'Central Time (CT)', short: 'Central', code: 'CT', value: 'America/Chicago' },
    { label: 'Mountain Time (MT)', short: 'Mountain', code: 'MT', value: 'America/Denver' },
    { label: 'Pacific Time (PT)', short: 'Pacific', code: 'PT', value: 'America/Los_Angeles' },
  ];

  // Initialize available dates synchronously
  const availableDates = useMemo(() => computeUpcomingWeekdays(10), []);

  // Timezone state - Default to Eastern Time (US Standard)
  const [selectedTimezone, setSelectedTimezone] = useState<string>('America/New_York');

  const [selectedDate, setSelectedDate] = useState<string>(() => availableDates[0]?.dateStr || '');
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);
  const [bookingFailed, setBookingFailed] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const currentUsZone = usTimezones.find(t => t.value === selectedTimezone) || usTimezones[0];
  const activeDateInfo = availableDates.find(d => d.dateStr === selectedDate) || availableDates[0];

  // Fast Slot Loader with Client-Side Instant Cache Check (Option 2)
  const loadSlotsForDate = async (dateStr: string, tz: string, forceFresh = false) => {
    if (!dateStr) return;

    if (!forceFresh) {
      const cached = getCachedSlots(dateStr, tz);
      if (cached && cached.length > 0) {
        setSlots(cached);
        setLoadingSlots(false);
        return;
      }
    }

    setLoadingSlots(true);
    setError('');

    try {
      const url = `/api/availability?date=${dateStr}&timezone=${encodeURIComponent(tz)}${forceFresh ? '&fresh=true' : ''}`;
      const res = await fetch(url);
      const data = await res.json();

      if (res.ok && data.success) {
        const fetchedSlots: TimeSlot[] = data.slots || [];
        setCachedSlots(dateStr, tz, fetchedSlots);
        setSlots(fetchedSlots);
      } else {
        setError(data.error || 'Failed to fetch available slots.');
        setSlots([]);
      }
    } catch (err: any) {
      setError('Could not connect to availability engine. Please try again.');
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    setSelectedSlot(null);
    setBookingFailed(false);
    loadSlotsForDate(selectedDate, selectedTimezone);
  }, [selectedDate, selectedTimezone]);

  const handleConfirmBooking = async () => {
    if (!selectedSlot) {
      setError('Please select an appointment time.');
      return;
    }

    setBookingLoading(true);
    setBookingFailed(false);
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

      if (res.status === 409 || !res.ok || !data.success) {
        setBookingFailed(true);
        clearSlotsCache();
        await loadSlotsForDate(selectedDate, selectedTimezone, true);
        setSelectedSlot(null);
        throw new Error(data.error || 'This slot was just reserved. Please pick another available time.');
      }

      trackMetaEvent('Schedule', {
        content_name: 'JIT Helpdesk Confirmed Demo',
        lead_id: leadId,
        booking_id: data.booking.id,
      }, data.booking.id);

      onSuccess(data.booking);
    } catch (err: any) {
      setBookingFailed(true);
      setError(err.message || 'Appointment could not be confirmed. Please select another available time.');
    } finally {
      setBookingLoading(false);
    }
  };

  const selectedSlotDisplayTime = selectedSlot ? new Date(selectedSlot.start).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: selectedTimezone,
  }) : '';

  return (
    <div className="p-3.5 sm:p-7">
      
      {/* Compact Header (Zero scroll on mobile) */}
      <div className="text-center mb-2.5 sm:mb-4">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
          ✓ Step 3 of 3: Reserve Demo
        </span>
        <h3 className="text-base sm:text-2xl font-extrabold text-slate-900 mt-1 font-display leading-tight">
          Select Your Personalized Demo Time
        </h3>
        <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
          Live availability synced with our US engineering schedule via Google Calendar.
        </p>
      </div>

      {/* Booking Conflict Alert */}
      {bookingFailed && (
        <div className="mb-2.5 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs animate-in fade-in">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 font-bold">
              <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span>Slot taken. Please choose another.</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setBookingFailed(false);
                setError('');
                loadSlotsForDate(selectedDate, selectedTimezone, true);
              }}
              className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold text-[10px] cursor-pointer"
            >
              Refresh
            </button>
          </div>
        </div>
      )}

      {/* Date & US Timezone Inline Row (Saves 50px vertical height!) */}
      <div className="flex items-center justify-between mb-1.5 sm:mb-2 text-xs">
        <span className="font-bold text-slate-700 flex items-center gap-1">
          <CalendarIcon className="w-3.5 h-3.5 text-brand-700" />
          <span>Select Date:</span>
        </span>

        {/* Compact US Timezone Selector */}
        <div className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-200 shadow-2xs">
          <Globe className="w-3 h-3 text-brand-700 shrink-0" />
          <select
            value={selectedTimezone}
            onChange={e => setSelectedTimezone(e.target.value)}
            className="text-[11px] font-bold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
          >
            {usTimezones.map(tz => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Date Horizontal Picker (Compact Pills) */}
      <div className="mb-2.5 sm:mb-4">
        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 scrollbar-none snap-x -mx-1 px-1 sm:mx-0 sm:px-0">
          {availableDates.map(item => {
            const isSelected = selectedDate === item.dateStr;
            return (
              <button
                key={item.dateStr}
                type="button"
                onClick={() => setSelectedDate(item.dateStr)}
                className={`snap-start flex flex-col items-center justify-center min-w-[54px] sm:min-w-[68px] py-1.5 px-1 sm:py-2.5 sm:px-2 rounded-lg sm:rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-brand-700 text-white border-brand-700 shadow-sm'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-[#d2f56d]' : 'text-slate-400'}`}>
                  {item.dayName}
                </span>
                <span className="text-xs sm:text-sm font-extrabold mt-0.2">
                  {item.display}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Available Slots Header */}
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-[11px] sm:text-xs font-bold text-slate-700 flex items-center gap-1">
          <Clock className="w-3 h-3 text-brand-700" />
          <span>Available Slots ({currentUsZone.code}):</span>
        </label>
        {loadingSlots && (
          <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
            <Loader2 className="w-2.5 h-2.5 animate-spin text-brand-700" /> Syncing...
          </span>
        )}
      </div>

      {/* Available Slots Grid (3 Columns on Mobile & Desktop) */}
      <div className="mb-2 sm:mb-3">
        {loadingSlots && slots.length === 0 ? (
          <div className="py-8 flex flex-col items-center justify-center text-slate-400 text-xs">
            <Loader2 className="w-5 h-5 animate-spin text-brand-700 mb-1.5" />
            <span className="text-[11px]">Checking availability...</span>
          </div>
        ) : slots.length === 0 ? (
          <div className="py-6 px-3 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
            No slots remaining on this date. Please pick another date above.
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 max-h-[145px] sm:max-h-[190px] overflow-y-auto pr-1 overscroll-contain">
            {slots.map((slot, idx) => {
              const isSelected = selectedSlot?.start === slot.start;
              const slotDate = new Date(slot.start);
              const usTime = slotDate.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZone: selectedTimezone,
              });

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedSlot(slot);
                    setBookingFailed(false);
                    setError('');
                  }}
                  className={`min-h-[38px] sm:min-h-[44px] py-1 px-1.5 sm:py-2 sm:px-2 rounded-lg sm:rounded-xl border transition-all text-center cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 ${
                    isSelected
                      ? 'bg-brand-700 text-white border-brand-700 shadow-sm ring-2 ring-[#d2f56d]'
                      : 'bg-white hover:border-brand-400 border-slate-200 text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-extrabold text-[11px] sm:text-xs">
                    {usTime}
                  </span>
                  <span className={`text-[9px] font-bold px-1 rounded ${
                    isSelected ? 'bg-white/20 text-[#d2f56d]' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {currentUsZone.code}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Selected Slot Highlight Banner (Ultra Compact) */}
      {selectedSlot && (
        <div className="mb-2.5 sm:mb-3 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] sm:text-xs font-bold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-1.5 truncate">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{activeDateInfo.fullDate} · {selectedSlotDisplayTime} ({currentUsZone.code})</span>
          </div>
          <span className="text-[9px] uppercase tracking-wider text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-black shrink-0">
            Selected
          </span>
        </div>
      )}

      {/* Controls (Side-by-side on Mobile) */}
      <div className="pt-2 sm:pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onBack}
          className="min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 flex items-center justify-center gap-1 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Back</span>
        </button>

        <button
          type="button"
          disabled={!selectedSlot || bookingLoading}
          onClick={handleConfirmBooking}
          className="cta-glow-btn flex-1 sm:flex-initial min-h-[42px] sm:min-h-[44px] px-5 py-2 rounded-full text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:pointer-events-none shadow-md"
        >
          {bookingLoading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Reserving...</span>
            </>
          ) : (
            <>
              <span>Confirm Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

    </div>
  );
};
