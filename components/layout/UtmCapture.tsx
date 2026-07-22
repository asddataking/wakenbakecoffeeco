"use client";

import { useEffect } from "react";
import { extractUtm } from "@/lib/utils/utm";

const UTM_KEY = "wnbc_utm";

export function UtmCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm = extractUtm(params);
    if (Object.keys(utm).length === 0) return;
    try {
      sessionStorage.setItem(
        UTM_KEY,
        JSON.stringify({
          ...utm,
          landingPage: window.location.href,
          referringUrl: document.referrer || undefined,
        }),
      );
    } catch {
      // ignore
    }
  }, []);

  return null;
}

export function readCapturedUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(UTM_KEY);
    if (!raw) {
      return {
        landingPage: window.location.href,
        referringUrl: document.referrer || "",
      };
    }
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return {};
  }
}
