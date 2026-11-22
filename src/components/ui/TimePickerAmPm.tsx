'use client';

import React from 'react';
import { Clock } from 'lucide-react';

interface TimePickerAmPmProps {
  value: string; // "HH:mm" in 24h format (e.g., "09:00", "18:00")
  onChange: (val: string) => void;
  label?: string;
}

export const TimePickerAmPm: React.FC<TimePickerAmPmProps> = ({ value = '09:00', onChange, label }) => {
  // Parse 24h value
  const [h24Str, mStr] = (value || '09:00').split(':');
  const h24 = parseInt(h24Str, 10) || 9;
  const m = parseInt(mStr, 10) || 0;

  // Compute 12h representation
  const period: 'AM' | 'PM' = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;

  // Format numbers to 2 digits
  const format2 = (n: number) => String(n).padStart(2, '0');

  // Convert 12h + AM/PM back to 24h string
  const updateTime = (newH12: number, newM: number, newPeriod: 'AM' | 'PM') => {
    let finalH24 = newH12 % 12;
    if (newPeriod === 'PM') {
      finalH24 += 12;
    }
    const val24 = `${format2(finalH24)}:${format2(newM)}`;
    onChange(val24);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextH12 = parseInt(e.target.value, 10);
    updateTime(nextH12, m, period);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextM = parseInt(e.target.value, 10);
    updateTime(h12, nextM, period);
  };

  const togglePeriod = (newP: 'AM' | 'PM') => {
    if (newP !== period) {
      updateTime(h12, m, newP);
    }
  };

  // Standard business presets for quick 1-click selection
  const presets = [
    { label: '08:00 AM', val: '08:00' },
    { label: '08:30 AM', val: '08:30' },
    { label: '09:00 AM', val: '09:00' },
    { label: '09:30 AM', val: '09:30' },
    { label: '10:00 AM', val: '10:00' },
    { label: '05:00 PM', val: '17:00' },
    { label: '05:30 PM', val: '17:30' },
    { label: '06:00 PM', val: '18:00' },
    { label: '06:30 PM', val: '18:30' },
    { label: '07:00 PM', val: '19:00' },
    { label: '08:00 PM', val: '20:00' },
  ];

  return (
    <div className="space-y-1.5">
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-700">
            {label}
          </label>
          <span className="text-[11px] font-black text-brand-700 bg-[#edf3e3] px-2 py-0.5 rounded-md border border-[#dce3d4]">
            {format2(h12)}:{format2(m)} {period}
          </span>
        </div>
      )}

      {/* Modern 12-Hour Selector Bar with AM/PM Pills */}
      <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-2xs hover:border-slate-300 transition-colors">
        <div className="pl-2 text-slate-400">
          <Clock className="w-4 h-4 text-slate-400" />
        </div>

        {/* Hour Select (01 - 12) */}
        <select
          value={h12}
          onChange={handleHourChange}
          className="bg-slate-50 hover:bg-slate-100 text-xs font-black text-slate-800 rounded-lg px-2 py-1.5 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-700 cursor-pointer"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
            <option key={h} value={h}>
              {format2(h)}
            </option>
          ))}
        </select>

        <span className="font-black text-slate-400 text-xs">:</span>

        {/* Minute Select (00, 15, 30, 45) */}
        <select
          value={m}
          onChange={handleMinuteChange}
          className="bg-slate-50 hover:bg-slate-100 text-xs font-black text-slate-800 rounded-lg px-2 py-1.5 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-700 cursor-pointer"
        >
          {[0, 15, 30, 45].map(min => (
            <option key={min} value={min}>
              {format2(min)}
            </option>
          ))}
        </select>

        {/* AM / PM Segmented Switch */}
        <div className="flex items-center rounded-lg bg-slate-100 p-0.5 ml-auto border border-slate-200">
          <button
            type="button"
            onClick={() => togglePeriod('AM')}
            className={`px-2.5 py-1 text-[11px] font-extrabold rounded-md transition-all cursor-pointer ${
              period === 'AM'
                ? 'bg-amber-400 text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            AM
          </button>
          <button
            type="button"
            onClick={() => togglePeriod('PM')}
            className={`px-2.5 py-1 text-[11px] font-extrabold rounded-md transition-all cursor-pointer ${
              period === 'PM'
                ? 'bg-[#182c26] text-[#d2f56d] shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            PM
          </button>
        </div>
      </div>

      {/* Quick Business Presets */}
      <div className="flex items-center gap-1 overflow-x-auto py-0.5 scrollbar-none text-[10px]">
        <span className="text-slate-400 shrink-0 font-medium">Quick:</span>
        {presets.slice(0, 4).map(p => (
          <button
            key={p.val}
            type="button"
            onClick={() => onChange(p.val)}
            className={`px-1.5 py-0.5 rounded border transition-colors shrink-0 ${
              value === p.val
                ? 'bg-brand-700 text-white border-brand-700 font-bold'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
};
