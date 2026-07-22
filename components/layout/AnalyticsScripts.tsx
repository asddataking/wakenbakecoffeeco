"use client";

import { useEffect } from "react";
import { readStoredConsent, setConsent } from "@/lib/analytics/events";

/**
 * Analytics scripts load only after consent and only when measurement IDs exist.
 * Purchase events should be attributed in Shopify/GHL — see docs.
 */
export function AnalyticsScripts() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) setConsent(stored.analytics, stored.marketing);
  }, []);

  useEffect(() => {
    const sync = () => {
      const consent = readStoredConsent();
      if (!consent?.analytics || !gaId) return;
      if (document.getElementById("ga4-script")) return;

      const script = document.createElement("script");
      script.id = "ga4-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", gaId, { anonymize_ip: true });
    };

    const marketing = () => {
      const consent = readStoredConsent();
      if (!consent?.marketing || !pixelId) return;
      if (document.getElementById("meta-pixel")) return;

      const script = document.createElement("script");
      script.id = "meta-pixel";
      script.innerHTML = `
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
        (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','${pixelId}');
        fbq('track','PageView');
      `;
      document.head.appendChild(script);
    };

    sync();
    marketing();
    window.addEventListener("wnbc-consent", sync);
    window.addEventListener("wnbc-consent", marketing);
    return () => {
      window.removeEventListener("wnbc-consent", sync);
      window.removeEventListener("wnbc-consent", marketing);
    };
  }, [gaId, pixelId]);

  return null;
}
