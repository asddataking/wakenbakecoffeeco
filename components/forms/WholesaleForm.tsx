"use client";

import { useState } from "react";
import { readCapturedUtm } from "@/components/layout/UtmCapture";
import { trackEvent } from "@/lib/analytics/events";

export function WholesaleForm() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    const fd = new FormData(e.currentTarget);
    const utmBag = readCapturedUtm();
    try {
      const res = await fetch("/api/ghl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "wholesale",
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          phone: String(fd.get("phone") || ""),
          company: String(fd.get("company") || ""),
          message: String(fd.get("message") || ""),
          productInterest: String(fd.get("productInterest") || ""),
          emailConsent: fd.get("emailConsent") === "on",
          smsConsent: fd.get("smsConsent") === "on",
          website: String(fd.get("website") || ""),
          landingPage: utmBag.landingPage || window.location.href,
          referringUrl: utmBag.referringUrl || document.referrer,
          utm: utmBag,
        }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) throw new Error(data.error || "Failed");
      setMessage(data.message || "Received.");
      trackEvent("wholesale_submit", { form_name: "wholesale" });
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label className="block text-sm">
        Contact name
        <input name="name" required className="mt-1 w-full rounded border border-ocean/20 bg-foam px-3 py-2" />
      </label>
      <label className="block text-sm">
        Business name
        <input name="company" required className="mt-1 w-full rounded border border-ocean/20 bg-foam px-3 py-2" />
      </label>
      <label className="block text-sm">
        Email
        <input name="email" type="email" required className="mt-1 w-full rounded border border-ocean/20 bg-foam px-3 py-2" />
      </label>
      <label className="block text-sm">
        Phone (optional)
        <input name="phone" type="tel" className="mt-1 w-full rounded border border-ocean/20 bg-foam px-3 py-2" />
      </label>
      <label className="block text-sm">
        Product interest
        <input name="productInterest" className="mt-1 w-full rounded border border-ocean/20 bg-foam px-3 py-2" />
      </label>
      <label className="block text-sm">
        Tell us about your shop or program
        <textarea name="message" required rows={5} className="mt-1 w-full rounded border border-ocean/20 bg-foam px-3 py-2" />
      </label>
      <div className="hidden" aria-hidden>
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="flex gap-2 text-sm">
        <input name="emailConsent" type="checkbox" />
        Email follow-ups about wholesale
      </label>
      <label className="flex gap-2 text-sm">
        <input name="smsConsent" type="checkbox" />
        SMS updates (optional)
      </label>
      <button type="submit" disabled={loading} className="rounded bg-ocean px-4 py-3 text-cream">
        Request wholesale info
      </button>
      {message ? <p className="text-sm text-seaglass">{message}</p> : null}
      {error ? <p className="text-sm text-red-800">{error}</p> : null}
    </form>
  );
}
