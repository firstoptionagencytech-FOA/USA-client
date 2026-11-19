declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

/**
 * Trigger browser-side Meta Pixel event with optional eventID for deduplication
 */
export function trackMetaEvent(
  eventName: 'PageView' | 'SurveyStart' | 'Lead' | 'QualifiedLead' | 'Schedule' | string,
  customData: Record<string, any> = {},
  eventId?: string
) {
  if (typeof window === 'undefined' || !window.fbq) {
    // Log in development console for verification
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Meta Pixel Event]: ${eventName}`, { customData, eventId });
    }
    return;
  }

  const options = eventId ? { eventID: eventId } : undefined;

  // Standard Meta events
  const standardEvents = ['PageView', 'Lead', 'Schedule', 'Contact', 'CompleteRegistration'];

  if (standardEvents.includes(eventName)) {
    window.fbq('track', eventName, customData, options);
  } else {
    // Custom events such as SurveyStart, QualifiedLead
    window.fbq('trackCustom', eventName, customData, options);
  }
}

/**
 * Extracts UTM parameters and creative IDs from the current URL query string
 */
export function extractUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};

  const keys = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'ad_id',
    'campaign_id',
    'adset_id',
    'creative',
  ];

  keys.forEach(k => {
    const val = params.get(k);
    if (val) result[k] = val;
  });

  result.landing_page_url = window.location.href;
  return result;
}
