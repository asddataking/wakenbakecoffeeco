export type AnalyticsEventName =
  | "view_item"
  | "view_item_list"
  | "search"
  | "add_to_cart"
  | "remove_from_cart"
  | "view_cart"
  | "begin_checkout"
  | "newsletter_signup"
  | "contact_submit"
  | "wholesale_submit";

export type AnalyticsItem = {
  item_id: string;
  item_name: string;
  item_variant?: string;
  price?: number;
  quantity?: number;
};

export type AnalyticsPayload = {
  currency?: string;
  value?: number;
  search_term?: string;
  item_list_name?: string;
  items?: AnalyticsItem[];
  form_name?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    __wnbcConsent?: { analytics: boolean; marketing: boolean };
  }
}

function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(window.__wnbcConsent?.analytics);
}

function hasMarketingConsent(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(window.__wnbcConsent?.marketing);
}

/** Strip accidental PII keys before forwarding. */
export function sanitizeAnalyticsPayload(
  payload: AnalyticsPayload,
): AnalyticsPayload {
  const clone: AnalyticsPayload = { ...payload };
  const forbidden = ["email", "phone", "name", "address", "user_data"];
  for (const key of Object.keys(clone) as Array<keyof AnalyticsPayload>) {
    if (forbidden.includes(String(key))) {
      delete clone[key];
    }
  }
  return clone;
}

export function trackEvent(
  event: AnalyticsEventName,
  payload: AnalyticsPayload = {},
): void {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent() && !hasMarketingConsent()) return;

  const clean = sanitizeAnalyticsPayload(payload);

  if (hasAnalyticsConsent() && typeof window.gtag === "function") {
    window.gtag("event", event, clean);
  }

  if (hasMarketingConsent() && typeof window.fbq === "function") {
    const map: Partial<Record<AnalyticsEventName, string>> = {
      view_item: "ViewContent",
      add_to_cart: "AddToCart",
      begin_checkout: "InitiateCheckout",
      search: "Search",
      newsletter_signup: "Lead",
      contact_submit: "Contact",
      wholesale_submit: "Lead",
    };
    const mapped = map[event];
    if (mapped) {
      window.fbq("track", mapped, clean);
    }
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...clean });
}

export function setConsent(analytics: boolean, marketing: boolean): void {
  if (typeof window === "undefined") return;
  window.__wnbcConsent = { analytics, marketing };
  try {
    localStorage.setItem(
      "wnbc_consent",
      JSON.stringify({ analytics, marketing }),
    );
  } catch {
    // ignore storage failures
  }
}

export function readStoredConsent(): {
  analytics: boolean;
  marketing: boolean;
} | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("wnbc_consent");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { analytics?: boolean; marketing?: boolean };
    return {
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    return null;
  }
}
