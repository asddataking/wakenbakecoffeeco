export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export function extractUtm(
  input: URLSearchParams | Record<string, string | string[] | undefined>,
): UtmParams {
  const result: UtmParams = {};

  const read = (key: (typeof UTM_KEYS)[number]): string | undefined => {
    if (input instanceof URLSearchParams) {
      const value = input.get(key);
      return value?.trim() || undefined;
    }
    const raw = input[key];
    const value = Array.isArray(raw) ? raw[0] : raw;
    return value?.trim() || undefined;
  };

  for (const key of UTM_KEYS) {
    const value = read(key);
    if (value) result[key] = value;
  }

  return result;
}

export function utmFromReferrerAndLanding(opts: {
  searchParams?: URLSearchParams | Record<string, string | string[] | undefined>;
  referringUrl?: string | null;
  landingPage?: string | null;
}): UtmParams & { referringUrl?: string; landingPage?: string } {
  const utm = opts.searchParams ? extractUtm(opts.searchParams) : {};
  return {
    ...utm,
    ...(opts.referringUrl ? { referringUrl: opts.referringUrl } : {}),
    ...(opts.landingPage ? { landingPage: opts.landingPage } : {}),
  };
}
