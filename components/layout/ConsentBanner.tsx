"use client";

import { useEffect, useState } from "react";
import { readStoredConsent, setConsent } from "@/lib/analytics/events";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    if (!stored) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed right-4 bottom-4 left-4 z-50 mx-auto max-w-lg rounded-lg border border-ocean/15 bg-foam p-4 shadow-soft"
    >
      <p className="text-sm text-ocean">
        We use optional analytics and marketing cookies to improve the storefront. No
        scripts load until you choose. Purchase tracking also happens in Shopify and GHL.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded bg-ocean px-3 py-2 text-sm text-cream"
          onClick={() => {
            setConsent(true, true);
            window.dispatchEvent(new Event("wnbc-consent"));
            setVisible(false);
          }}
        >
          Accept analytics & marketing
        </button>
        <button
          type="button"
          className="rounded border border-ocean/20 px-3 py-2 text-sm text-ocean"
          onClick={() => {
            setConsent(true, false);
            window.dispatchEvent(new Event("wnbc-consent"));
            setVisible(false);
          }}
        >
          Analytics only
        </button>
        <button
          type="button"
          className="rounded px-3 py-2 text-sm text-driftwood underline"
          onClick={() => {
            setConsent(false, false);
            setVisible(false);
          }}
        >
          Reject optional
        </button>
      </div>
    </div>
  );
}
