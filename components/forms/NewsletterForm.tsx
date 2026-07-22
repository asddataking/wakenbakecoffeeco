"use client";

import { useState } from "react";
import { readCapturedUtm } from "@/components/layout/UtmCapture";
import { trackEvent } from "@/lib/analytics/events";
import { siteCopy } from "@/lib/content/site-copy";

type FormState = "idle" | "loading" | "success" | "error";

export function NewsletterForm({
  variant = "newsletter",
}: {
  variant?: "newsletter" | "first-order";
}) {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [support, setSupport] = useState("");
  const { newsletter } = siteCopy;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setSupport("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const utmBag = readCapturedUtm();
    const payload = {
      form: variant,
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      emailConsent: fd.get("emailConsent") === "on",
      smsConsent: fd.get("smsConsent") === "on",
      website: String(fd.get("website") || ""),
      productInterest: String(fd.get("productInterest") || ""),
      landingPage: utmBag.landingPage || window.location.href,
      referringUrl: utmBag.referringUrl || document.referrer,
      utm: {
        utm_source: utmBag.utm_source,
        utm_medium: utmBag.utm_medium,
        utm_campaign: utmBag.utm_campaign,
        utm_term: utmBag.utm_term,
        utm_content: utmBag.utm_content,
      },
    };

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) throw new Error(data.error || newsletter.error);
      setState("success");
      setMessage(newsletter.success);
      setSupport(newsletter.successSupport);
      trackEvent("newsletter_signup", { form_name: variant });
      form.reset();
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : newsletter.error);
      setSupport(newsletter.errorSupport);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block">{newsletter.nameLabel}</span>
          <input
            name="name"
            required
            autoComplete="name"
            className="w-full rounded-xl border border-ocean/20 bg-foam px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block">{newsletter.emailLabel}</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={newsletter.emailPlaceholder}
            className="w-full rounded-xl border border-ocean/20 bg-foam px-3 py-2"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1 block">{newsletter.phoneLabel}</span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          className="w-full rounded-xl border border-ocean/20 bg-foam px-3 py-2"
        />
      </label>
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="flex items-start gap-2 text-sm">
        <input name="emailConsent" type="checkbox" required className="mt-1" />
        <span>{newsletter.consent}</span>
      </label>
      <label className="flex items-start gap-2 text-sm">
        <input name="smsConsent" type="checkbox" className="mt-1" />
        <span>{newsletter.smsConsent}</span>
      </label>
      <button
        type="submit"
        disabled={state === "loading"}
        className="rounded-full bg-ocean px-5 py-3 text-cream disabled:opacity-60"
      >
        {state === "loading"
          ? newsletter.loading
          : variant === "first-order"
            ? newsletter.firstOrderButton
            : newsletter.button}
      </button>
      {message ? (
        <div
          className={state === "error" ? "text-sm text-red-800" : "text-sm text-seaglass"}
          role="status"
        >
          <p className="font-medium">{message}</p>
          {support ? <p className="mt-1 text-driftwood">{support}</p> : null}
        </div>
      ) : null}
    </form>
  );
}
