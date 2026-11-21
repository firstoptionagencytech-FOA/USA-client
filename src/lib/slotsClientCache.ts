// Client-side in-memory slots cache
// Shared across FunnelModal prefetcher and CalendarBookingStep

import { TimeSlot } from '@/types';

interface CachedEntry {
  slots: TimeSlot[];
  timestamp: number;
}

const clientCache = new Map<string, CachedEntry>();
const CLIENT_CACHE_TTL = 3 * 60 * 1000; // 3 minutes

export function getCachedSlots(date: string, timezone: string): TimeSlot[] | null {
  const key = `${date}__${timezone}`;
  const entry = clientCache.get(key);
  if (entry && Date.now() - entry.timestamp < CLIENT_CACHE_TTL) {
    return entry.slots;
  }
  return null;
}

export function setCachedSlots(date: string, timezone: string, slots: TimeSlot[]): void {
  const key = `${date}__${timezone}`;
  clientCache.set(key, {
    slots,
    timestamp: Date.now(),
  });
}

export function clearSlotsCache(): void {
  clientCache.clear();
}

/**
 * Non-blocking background prefetcher.
 * Uses requestIdleCallback or setTimeout chunks so it NEVER stutters UI, typing, or survey clicks.
 */
export function prefetchUpcomingWeekdays(dates: string[], timezone: string): void {
  if (typeof window === 'undefined') return;

  const scheduleJob = (window as any).requestIdleCallback || ((cb: () => void) => setTimeout(cb, 500));

  scheduleJob(() => {
    // Process one date at a time with pauses to keep main thread completely free
    dates.forEach((dateStr, index) => {
      setTimeout(() => {
        const existing = getCachedSlots(dateStr, timezone);
        if (existing) return;

        fetch(`/api/availability?date=${dateStr}&timezone=${encodeURIComponent(timezone)}`, {
          priority: 'low',
        } as any)
          .then(res => res.json())
          .then(data => {
            if (data.success && Array.isArray(data.slots)) {
              setCachedSlots(dateStr, timezone, data.slots);
            }
          })
          .catch(() => {
            // silent fail on prefetch
          });
      }, index * 350); // 350ms staggered gap between fetches
    });
  });
}
