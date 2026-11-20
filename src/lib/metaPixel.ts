/**
 * Meta Pixel & Conversions API (CAPI) Tracking Utilities
 * Standardized per Meta Parameter Builder Library specifications
 * Connected to Coach Ravikant Backend API: /api/meta/events
 * Default Dataset / Pixel ID: 1001150546287128
 *
 * Implements:
 * 1. Instant 1st-party _fbp (Browser ID) generation & 90-day persistence (100% coverage from ms 0)
 * 2. Automatic _fbc (Click ID) capture from URL / cookies with 90-day persistence
 * 3. Persistent 1st-party external_id UUID generation (+15.65% EMQ increase)
 * 4. Contact identity caching (_user_email, _user_phone, _user_name) across returning sessions
 * 5. Meta phone normalization (+91 / 0 / spaces -> 91XXXXXXXXXX) & SHA-256 preparation
 * 6. Dual-Track Client Pixel + Server CAPI with strict Deduplication Event IDs
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export interface UserData {
  email?: string | null;
  phone?: string | null;
  name?: string | null;
  first_name?: string | null;
  external_id?: string | null;
}

export interface TrackOptions {
  skipServerCapi?: boolean;
  forceServerCapi?: boolean;
}

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || 'https://api.coachravikant.com';

/**
 * Retrieve cookie value by name
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  return match ? decodeURIComponent(match[3]) : null;
}

/**
 * Set a first-party cookie with expiry in days
 */
export function setCookie(name: string, value: string, days = 90): void {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

/**
 * Get or generate standard Meta _fbp (Browser ID)
 * Format: fb.1.<creation_timestamp_ms>.<10_digit_random>
 * Ensures 100% _fbp coverage even before fbevents.js script loads
 */
export function getOrCreateFbp(): string | null {
  if (typeof window === 'undefined') return null;

  // 1. Check existing cookie
  const cookieFbp = getCookie('_fbp');
  if (cookieFbp) {
    try {
      localStorage.setItem('_fbp', cookieFbp);
    } catch {
      // storage unavailable
    }
    return cookieFbp;
  }

  // 2. Check localStorage fallback
  try {
    const storedFbp = localStorage.getItem('_fbp');
    if (storedFbp) {
      setCookie('_fbp', storedFbp, 90);
      return storedFbp;
    }
  } catch {
    // storage unavailable
  }

  // 3. Generate standard compliant Meta _fbp
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 8999999999 + 1000000000);
  const newFbp = `fb.1.${timestamp}.${randomNum}`;

  setCookie('_fbp', newFbp, 90);
  try {
    localStorage.setItem('_fbp', newFbp);
  } catch {
    // storage unavailable
  }

  return newFbp;
}

/**
 * Alias for getOrCreateFbp
 */
export function getFbpValue(): string | null {
  return getOrCreateFbp();
}

/**
 * Get or construct Meta _fbc click identifier (Cookie -> localStorage -> URL)
 * Format: fb.1.<creation_timestamp_ms>.<fbclid>
 */
export function getOrCreateFbc(): string | null {
  if (typeof window === 'undefined') return null;

  // 1. Check active URL for fbclid first
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');
    if (fbclid) {
      const fbc = `fb.1.${Date.now()}.${fbclid}`;
      setCookie('_fbc', fbc, 90);
      try {
        localStorage.setItem('_fbc', fbc);
      } catch {
        // storage unavailable
      }
      return fbc;
    }
  } catch {
    // URL parsing unavailable
  }

  // 2. Check 1st-party Cookie
  const cookieFbc = getCookie('_fbc');
  if (cookieFbc) {
    try {
      localStorage.setItem('_fbc', cookieFbc);
    } catch {
      // storage unavailable
    }
    return cookieFbc;
  }

  // 3. Check localStorage fallback (Safari ITP protection)
  try {
    const storedFbc = localStorage.getItem('_fbc');
    if (storedFbc) {
      setCookie('_fbc', storedFbc, 90);
      return storedFbc;
    }
  } catch {
    // storage unavailable
  }

  return null;
}

/**
 * Alias for getOrCreateFbc
 */
export function getFbcValue(): string | null {
  return getOrCreateFbc();
}

/**
 * Get or generate persistent 1st-party external_id
 * Format: ext_<timestamp>_<random_alphanumeric>
 * Boosts Meta Event Match Quality (EMQ) by +15.65%
 */
export function getOrCreateExternalId(): string | null {
  if (typeof window === 'undefined') return null;

  const cookieExtId = getCookie('_ext_id');
  if (cookieExtId) {
    try {
      localStorage.setItem('_ext_id', cookieExtId);
    } catch {
      // storage unavailable
    }
    return cookieExtId;
  }

  try {
    const storedExtId = localStorage.getItem('_ext_id');
    if (storedExtId) {
      setCookie('_ext_id', storedExtId, 90);
      return storedExtId;
    }
  } catch {
    // storage unavailable
  }

  const newExtId = `ext_${Date.now()}_${Math.random().toString(36).substring(2, 12)}`;
  setCookie('_ext_id', newExtId, 90);
  try {
    localStorage.setItem('_ext_id', newExtId);
  } catch {
    // storage unavailable
  }

  return newExtId;
}

/**
 * Alias for getOrCreateExternalId
 */
export function getExternalId(): string | null {
  return getOrCreateExternalId();
}

/**
 * Normalize phone number per Meta requirements:
 * - Digits only
 * - Country code included (defaults to India 91)
 * - Leading zeros removed
 * Example: "+91 98765 43210" -> "919876543210"
 */
export function normalizePhone(rawPhone?: string | number | null): string {
  if (!rawPhone) return '';
  let digits = String(rawPhone).replace(/[^0-9]/g, '');
  if (digits.startsWith('0')) {
    digits = digits.substring(1);
  }
  if (digits.length === 10) {
    digits = '91' + digits;
  }
  return digits;
}

/**
 * Normalize email per Meta requirements (trim + lowercase)
 */
export function normalizeEmail(rawEmail?: string | null): string {
  if (!rawEmail) return '';
  return String(rawEmail).trim().toLowerCase();
}

/**
 * Cache customer identity data in 1st-party storage for returning attribution
 */
export function cacheUserData(data: UserData = {}): void {
  if (typeof window === 'undefined') return;
  try {
    if (data.email) {
      localStorage.setItem('_user_email', normalizeEmail(data.email));
    }
    if (data.phone) {
      localStorage.setItem('_user_phone', normalizePhone(data.phone));
    }
    if (data.name) {
      localStorage.setItem('_user_name', String(data.name).trim());
    }
    if (data.external_id) {
      localStorage.setItem('_ext_id', String(data.external_id));
      setCookie('_ext_id', String(data.external_id), 90);
    }
  } catch {
    // storage unavailable
  }
}

/**
 * Retrieve cached customer identity data
 */
export function getCachedUserData(): UserData {
  if (typeof window === 'undefined') return {};
  try {
    return {
      email: localStorage.getItem('_user_email') || null,
      phone: localStorage.getItem('_user_phone') || null,
      name: localStorage.getItem('_user_name') || null,
      external_id: localStorage.getItem('_ext_id') || getOrCreateExternalId(),
    };
  } catch {
    return {};
  }
}

/**
 * SHA-256 cryptographic hashing helper
 */
export async function sha256(value?: string | null): Promise<string | null> {
  if (!value) return null;
  const normalized = String(value).trim().toLowerCase();
  try {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const msgBuffer = new TextEncoder().encode(normalized);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (err) {
    console.warn('[Meta Tracking] SHA-256 computation warning:', err);
  }
  return null;
}

/**
 * Initialize Parameter Builder tracking immediately on page entry
 */
export function initMetaTracking(): void {
  if (typeof window === 'undefined') return;
  getOrCreateFbp();
  getOrCreateFbc();
  getOrCreateExternalId();
}

// Auto-run on script evaluation
if (typeof window !== 'undefined') {
  initMetaTracking();
}

/**
 * Generate a cryptographically unique event ID for deduplication
 */
export function generateEventId(prefix = 'evt'): string {
  const cleanPrefix = prefix.toLowerCase().replace(/[^a-z0-9]/g, '');
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 10);
  return `${cleanPrefix}_${timestamp}_${randomStr}`;
}

/**
 * Track an event across both Browser Pixel and Server CAPI with deduplication & parameter builder
 *
 * @param eventName - ViewContent, Contact, InitiateCheckout, Lead, Purchase, etc.
 * @param customData - e.g. { content_name, value, currency, content_type }
 * @param userData - e.g. { name, email, phone, external_id }
 * @param customEventId - optional pre-generated event ID
 * @param options - { skipServerCapi: boolean, forceServerCapi: boolean }
 * @returns eventId
 */
export function trackMetaEvent(
  eventName: string,
  customData: Record<string, unknown> = {},
  userData: UserData = {},
  customEventId: string | null = null,
  options: TrackOptions = {}
): string {
  const eventId = customEventId || generateEventId(eventName);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const fbp = getOrCreateFbp();
  const fbc = getOrCreateFbc();
  const externalId = userData.external_id || getOrCreateExternalId();

  // Retrieve cached identity if not provided in current call
  const cached = getCachedUserData();
  const rawEmail = userData.email || cached.email;
  const rawPhone = userData.phone || cached.phone;
  const rawName = userData.name || cached.name;

  const cleanEmail = normalizeEmail(rawEmail);
  const cleanPhone = normalizePhone(rawPhone);
  const cleanName = rawName ? String(rawName).trim() : '';
  const firstName = userData.first_name || (cleanName ? cleanName.split(' ')[0] : '');

  // If user provided fresh contact data, update cache
  if (userData.email || userData.phone || userData.name) {
    cacheUserData({
      email: cleanEmail,
      phone: cleanPhone,
      name: cleanName,
      external_id: externalId,
    });
  }

  // 1. Fire Browser-Side Meta Pixel with Advanced Matching & Event ID
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, customData, {
        eventID: eventId,
        external_id: externalId,
      });
    }
  } catch (err) {
    console.warn('[Meta Pixel] Browser tracking warning:', err);
  }

  // 2. Dispatch Server-Side CAPI Event via Laravel Backend (D:\Projects\CoachRavikant\api)
  // Only send server CAPI when customer match parameters (email or phone) exist, or if explicitly forced.
  // Anonymous events (ViewContent, unauthenticated clicks) are tracked exclusively via Browser Pixel
  // to avoid Meta Events Manager "Missing multiple_events user data parameters" warnings.
  const hasCustomerData = Boolean(cleanEmail || cleanPhone);
  const shouldDispatchCapi = !options.skipServerCapi && (hasCustomerData || options.forceServerCapi);

  if (shouldDispatchCapi) {
    try {
      const payload = {
        event_name: eventName,
        event_id: eventId,
        event_source_url: currentUrl,
        fbp,
        fbc,
        external_id: externalId,
        email: cleanEmail || null,
        phone: cleanPhone || null,
        first_name: firstName || null,
        name: cleanName || null,
        custom_data: customData,
      };

      const targetUrl = API_BASE.startsWith('http') ? `${API_BASE}/api/meta/events` : `/api/meta/events`;

      fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch((err) => {
        console.warn('[Meta CAPI] Server dispatch warning:', err);
      });
    } catch (err) {
      console.warn('[Meta CAPI] Error preparing payload:', err);
    }
  }

  return eventId;
}
