"use client";

import { useEffect, useState } from "react";
import { readStoredConsent, setConsent } from "@/lib/analytics/events";
import { siteCopy } from "@/lib/content/site-copy";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const { consent } = siteCopy;

  useEffect(() => {
    const stored = readStoredConsent();
    if (!stored) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed right-4 bottom-4 left-4 z-50 mx-auto max-w-lg rounded-2xl border border-ocean/15 bg-foam/95 p-4 shadow-soft backdrop-blur"
    >
      <p className="text-sm text-ocean">{consent.body}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-full bg-ocean px-3 py-2 text-sm text-cream"
          onClick={() => {
            setConsent(true, true);
            window.dispatchEvent(new Event("wnbc-consent"));
            setVisible(false);
          }}
        >
          {consent.acceptAll}
        </button>
        <button
          type="button"
          className="rounded-full border border-ocean/20 px-3 py-2 text-sm text-ocean"
          onClick={() => {
            setConsent(true, false);
            window.dispatchEvent(new Event("wnbc-consent"));
            setVisible(false);
          }}
        >
          {consent.analyticsOnly}
        </button>
        <button
          type="button"
          className="rounded-full px-3 py-2 text-sm text-driftwood underline"
          onClick={() => {
            setConsent(false, false);
            setVisible(false);
          }}
        >
          {consent.reject}
        </button>
      </div>
    </div>
  );
}
