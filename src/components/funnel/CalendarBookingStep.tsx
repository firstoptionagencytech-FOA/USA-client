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

// Compute upcoming weekdays (Mon-Fri) synchronously to prevent blank initial render
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
      const fullDate = curr.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
      dates.push({ dateStr, display, dayName, fullDate });
    }
    curr.setDate(curr.getDate() + 1);
  }
  return dates;
}

export const CalendarBookingStep: React.FC<CalendarBookingStepProps> = ({ leadId, onSuccess, onBack }) => {
  // Common US Business Timezones (Exclusively USA)
  const usTimezones = [
    { label: 'Eastern Time (ET / US & Canada)', short: 'Eastern Time', code: 'ET', value: 'America/New_York' },
    { label: 'Central Time (CT / US & Canada)', short: 'Central Time', code: 'CT', value: 'America/Chicago' },
    { label: 'Mountain Time (MT / US & Canada)', short: 'Mountain Time', code: 'MT', value: 'America/Denver' },
    { label: 'Pacific Time (PT / US & Canada)', short: 'Pacific Time', code: 'PT', value: 'America/Los_Angeles' },
  ];

  // Initialize available dates synchronously
  const availableDates = useMemo(() => computeUpcomingWeekdays(10), []);

  // Timezone state - Default to Eastern Time (US Standard), with option to toggle US zone
  const [selectedTimezone, setSelectedTimezone] = useState<string>('America/New_York');

  const [selectedDate, setSelectedDate] = useState<string>(() => availableDates[0]?.dateStr || '');
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);
  const [bookingFailed, setBookingFailed] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Active US Timezone info
  const currentUsZone = usTimezones.find(t => t.value === selectedTimezone) || usTimezones[0];
  const activeDateInfo = availableDates.find(d => d.dateStr === selectedDate) || availableDates[0];

  // Slot Loader with Option 2 Client-Side Instant Cache Check
  const loadSlotsForDate = async (dateStr: string, tz: string, forceFresh = false) => {
    if (!dateStr) return;

    // 1. Instant check from Option 2 background-prefetched client cache (0ms!)
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

  // Fetch or retrieve from cache on date or timezone change
  useEffect(() => {
    setSelectedSlot(null);
    setBookingFailed(false);
    loadSlotsForDate(selectedDate, selectedTimezone);
  }, [selectedDate, selectedTimezone]);

  // Handle final booking confirmation
  const handleConfirmBooking = async () => {
    if (!selectedSlot) {
      setError('Please select an available appointment time.');
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

      // Handle race condition or booking failure
      if (res.status === 409 || !res.ok || !data.success) {
        setBookingFailed(true);
        // Clear cached slots and re-fetch fresh availability
        clearSlotsCache();
        await loadSlotsForDate(selectedDate, selectedTimezone, true);
        setSelectedSlot(null);
        throw new Error(data.error || 'This slot was just reserved or is no longer available. Please select another time.');
      }

      // Track Meta Pixel Schedule event
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

  // Human readable time for selected slot in US Timezone
  const selectedSlotDisplayTime = selectedSlot ? new Date(selectedSlot.start).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: selectedTimezone,
  }) : '';

  return (
    <div className="p-4 sm:p-7">
      
      {/* Header */}
      <div className="text-center mb-5">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          ✓ Qualified · Step 3 of 3: Reserve Demo
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2 font-display">
          Select Your Personalized Demo Time
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Live availability synced with our US engineering schedule via Google Calendar.
        </p>
      </div>

      {/* Booking Conflict / Try Again Card */}
      {bookingFailed && (
        <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs animate-in fade-in">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-extrabold block text-rose-900">Slot Unavailable or Not Confirmed</span>
              <p className="text-[11px] text-rose-700 mt-0.5 mb-2 leading-relaxed">
                {error || 'That slot was just reserved by another attendee. We have refreshed the calendar with live available slots.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setBookingFailed(false);
                  setError('');
                  loadSlotsForDate(selectedDate, selectedTimezone, true);
                }}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Try Another Slot</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Normal Error Alert (if not bookingFailed) */}
      {!bookingFailed && error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={() => loadSlotsForDate(selectedDate, selectedTimezone, true)}
            className="text-[11px] underline font-bold shrink-0 hover:text-rose-900 cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Clean USA Timezone Selector (Strictly US Only) */}
      <div className="mb-5 p-3 sm:p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
          <Globe className="w-4 h-4 text-brand-700 shrink-0" />
          <span>US Timezone:</span>
        </div>

        <select
          value={selectedTimezone}
          onChange={e => setSelectedTimezone(e.target.value)}
          className="text-xs font-bold bg-white text-slate-900 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-700 max-w-[230px] truncate shadow-2xs cursor-pointer"
        >
          {usTimezones.map(tz => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </select>
      </div>

      {/* Date Horizontal Picker */}
      <div className="mb-5">
        <label className="block text-xs font-bold text-slate-700 mb-2">
          Select Date:
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x -mx-1 px-1 sm:mx-0 sm:px-0">
          {availableDates.map(item => {
            const isSelected = selectedDate === item.dateStr;
            return (
              <button
                key={item.dateStr}
                type="button"
                onClick={() => setSelectedDate(item.dateStr)}
                className={`snap-start flex flex-col items-center justify-center min-w-[68px] sm:min-w-[72px] py-2 px-1.5 sm:py-2.5 sm:px-2 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-brand-700 text-white border-brand-700 shadow-sm'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-[#d2f56d]' : 'text-slate-400'}`}>
                  {item.dayName}
                </span>
                <span className="text-xs sm:text-sm font-extrabold mt-0.5">
                  {item.display}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Available Slots Grid (Clean USA Times Only) */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-700" />
            <span>Available 30-Minute Slots ({currentUsZone.code}):</span>
          </label>
          {loadingSlots && (
            <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
              <Loader2 className="w-3 h-3 animate-spin text-brand-700" /> Syncing...
            </span>
          )}
        </div>

        {loadingSlots && slots.length === 0 ? (
          <div className="py-10 flex flex-col items-center justify-center text-slate-400 text-xs">
            <Loader2 className="w-6 h-6 animate-spin text-brand-700 mb-2" />
            <span>Consulting Google Calendar schedule...</span>
          </div>
        ) : slots.length === 0 ? (
          <div className="py-8 px-4 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
            No remaining slots available on this date. Please select another date above.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 max-h-[190px] sm:max-h-[220px] overflow-y-auto pr-1 overscroll-contain">
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
                  className={`min-h-[46px] py-2 px-3 rounded-xl border transition-all text-center cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-brand-700 text-white border-brand-700 shadow-sm ring-2 ring-[#d2f56d]'
                      : 'bg-white hover:border-brand-400 border-slate-200 text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-extrabold text-xs sm:text-sm">
                    {usTime}
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
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

      {/* Selected Slot Highlight Banner */}
      {selectedSlot && (
        <div className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Selected: {activeDateInfo.fullDate} · {selectedSlotDisplayTime} ({currentUsZone.code})</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-black shrink-0">
            Ready
          </span>
        </div>
      )}

      {/* Controls */}
      <div className="pt-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Survey</span>
        </button>

        <button
          type="button"
          disabled={!selectedSlot || bookingLoading}
          onClick={handleConfirmBooking}
          className="cta-glow-btn w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-full text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
        >
          {bookingLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Reserving on Google Meet...</span>
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
