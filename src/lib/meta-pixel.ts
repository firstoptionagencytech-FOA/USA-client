declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

/**
 * Dynamically initializes Meta Pixel using ID from Admin Panel (Firebase Settings)
 */
export function initMetaPixel(pixelId: string) {
  if (typeof window === 'undefined' || !pixelId) return;

  try {
    if (!window.fbq) {
      (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    }

    window.fbq('init', pixelId.trim());
    window.fbq('track', 'PageView');
  } catch (e) {
    console.warn('Could not initialize Meta Pixel:', e);
  }
}

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
 * Extracts UTM parameters and creative IDs from the current URL query string,
 * with automatic sessionStorage persistence across page actions & refreshes.
 */
export function extractUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
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

  const currentFromUrl: Record<string, string> = {};
  let hasUrlParams = false;

  keys.forEach(k => {
    const val = params.get(k);
    if (val) {
      currentFromUrl[k] = val;
      hasUrlParams = true;
    }
  });

  // If new UTM params are in the current URL, save them to storage
  if (hasUrlParams) {
    try {
      sessionStorage.setItem('jit_active_utm_params', JSON.stringify(currentFromUrl));
      localStorage.setItem('jit_active_utm_params', JSON.stringify(currentFromUrl));
    } catch (e) {}
    currentFromUrl.landing_page_url = window.location.href;
    return currentFromUrl;
  }

  // Otherwise, retrieve previously captured UTMs from session/local storage
  try {
    const stored = sessionStorage.getItem('jit_active_utm_params') || localStorage.getItem('jit_active_utm_params');
    if (stored) {
      const parsed = JSON.parse(stored);
      parsed.landing_page_url = window.location.href;
      return parsed;
    }
  } catch (e) {}

  return { landing_page_url: window.location.href };
}
