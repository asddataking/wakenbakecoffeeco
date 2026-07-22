"use client";

import { useState } from "react";
import { readCapturedUtm } from "@/components/layout/UtmCapture";
import { trackEvent } from "@/lib/analytics/events";
import { siteCopy } from "@/lib/content/site-copy";

export function ContactForm() {
  const [message, setMessage] = useState("");
  const [support, setSupport] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { contact } = siteCopy;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    setSupport("");
    const fd = new FormData(e.currentTarget);
    const utmBag = readCapturedUtm();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          phone: String(fd.get("phone") || ""),
          message: String(fd.get("message") || ""),
          emailConsent: fd.get("emailConsent") === "on",
          smsConsent: fd.get("smsConsent") === "on",
          website: String(fd.get("website") || ""),
          landingPage: utmBag.landingPage || window.location.href,
          referringUrl: utmBag.referringUrl || document.referrer,
          utm: utmBag,
        }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) throw new Error(data.error || contact.error);
      setMessage(contact.success);
      setSupport(contact.successSupport);
      trackEvent("contact_submit", { form_name: "contact" });
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : contact.error);
      setSupport(contact.errorSupport);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label className="block text-sm">
        {contact.name}
        <input
          name="name"
          required
          className="mt-1 w-full rounded-xl border border-ocean/20 bg-foam px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        {contact.email}
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-xl border border-ocean/20 bg-foam px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        {contact.phone}
        <input
          name="phone"
          type="tel"
          className="mt-1 w-full rounded-xl border border-ocean/20 bg-foam px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        {contact.message}
        <textarea
          name="message"
          required
          rows={5}
          className="mt-1 w-full rounded-xl border border-ocean/20 bg-foam px-3 py-2"
        />
      </label>
      <div className="hidden" aria-hidden>
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="flex gap-2 text-sm">
        <input name="emailConsent" type="checkbox" />
        Email me a copy / follow-ups
      </label>
      <label className="flex gap-2 text-sm">
        <input name="smsConsent" type="checkbox" />
        SMS updates (optional)
      </label>
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-ocean px-5 py-3 text-cream disabled:opacity-60"
      >
        {loading ? contact.loading : contact.submit}
      </button>
      {message ? (
        <div className="text-sm text-seaglass" role="status">
          <p className="font-medium">{message}</p>
          {support ? <p className="mt-1 text-driftwood">{support}</p> : null}
        </div>
      ) : null}
      {error ? (
        <div className="text-sm text-red-800" role="alert">
          <p className="font-medium">{error}</p>
          {support ? <p className="mt-1">{support}</p> : null}
        </div>
      ) : null}
    </form>
  );
}
