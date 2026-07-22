import { z } from "zod";
import { serverEnv } from "@/lib/validation/env";

export const GHL_TAGS = {
  newsletter: "WNBC - Newsletter",
  firstOrder: "First Order Offer",
  contact: "Contact Form",
  wholesale: "Wholesale Lead",
  dankNDevour: "DankNDevour Audience",
  coffeeCustomer: "Coffee Customer",
  subscriptionInterest: "Subscription Interest",
  vipCandidate: "VIP Candidate",
} as const;

export const leadPayloadSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(254),
  phone: z.string().max(40).optional().or(z.literal("")),
  emailConsent: z.boolean(),
  smsConsent: z.boolean().default(false),
  source: z.enum([
    "newsletter",
    "first-order",
    "contact",
    "wholesale",
  ]),
  message: z.string().max(5000).optional(),
  company: z.string().max(200).optional(),
  productInterest: z.string().max(200).optional(),
  landingPage: z.string().max(500).optional(),
  referringUrl: z.string().max(500).optional(),
  utm: z
    .object({
      utm_source: z.string().optional(),
      utm_medium: z.string().optional(),
      utm_campaign: z.string().optional(),
      utm_term: z.string().optional(),
      utm_content: z.string().optional(),
    })
    .optional(),
  // Honeypot — must remain empty
  website: z.string().max(0).optional().or(z.literal("")),
  timestamp: z.string().datetime().optional(),
});

export type LeadPayload = z.infer<typeof leadPayloadSchema>;

export type GhlResult = {
  mode: "api" | "webhook" | "dev-log";
  ok: boolean;
  message: string;
};

function tagsForSource(source: LeadPayload["source"]): string[] {
  const env = serverEnv();
  switch (source) {
    case "newsletter":
      return [env.GHL_NEWSLETTER_TAG || GHL_TAGS.newsletter, GHL_TAGS.dankNDevour];
    case "first-order":
      return [GHL_TAGS.firstOrder, env.GHL_NEWSLETTER_TAG || GHL_TAGS.newsletter];
    case "contact":
      return [GHL_TAGS.contact];
    case "wholesale":
      return [GHL_TAGS.wholesale, GHL_TAGS.vipCandidate];
    default:
      return [];
  }
}

export function buildGhlContactPayload(lead: LeadPayload) {
  const [firstName, ...rest] = lead.name.trim().split(/\s+/);
  const lastName = rest.join(" ") || undefined;
  return {
    firstName,
    lastName,
    email: lead.email,
    phone: lead.phone || undefined,
    tags: tagsForSource(lead.source),
    source: `WNBC Storefront — ${lead.source}`,
    customFields: [
      { key: "email_consent", field_value: lead.emailConsent ? "yes" : "no" },
      { key: "sms_consent", field_value: lead.smsConsent ? "yes" : "no" },
      { key: "form_source", field_value: lead.source },
      { key: "landing_page", field_value: lead.landingPage ?? "" },
      { key: "referring_url", field_value: lead.referringUrl ?? "" },
      { key: "product_interest", field_value: lead.productInterest ?? "" },
      { key: "message", field_value: lead.message ?? "" },
      { key: "company", field_value: lead.company ?? "" },
      { key: "utm_source", field_value: lead.utm?.utm_source ?? "" },
      { key: "utm_medium", field_value: lead.utm?.utm_medium ?? "" },
      { key: "utm_campaign", field_value: lead.utm?.utm_campaign ?? "" },
      { key: "utm_term", field_value: lead.utm?.utm_term ?? "" },
      { key: "utm_content", field_value: lead.utm?.utm_content ?? "" },
      {
        key: "submitted_at",
        field_value: lead.timestamp ?? new Date().toISOString(),
      },
    ],
  };
}

async function submitViaApi(lead: LeadPayload): Promise<GhlResult> {
  const env = serverEnv();
  const locationId = env.GHL_LOCATION_ID;
  const token = env.GHL_API_TOKEN;
  if (!locationId || !token) {
    return { mode: "api", ok: false, message: "GHL API credentials missing" };
  }

  const payload = buildGhlContactPayload(lead);
  const response = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      locationId,
      ...payload,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("GHL API error:", response.status, text);
    return {
      mode: "api",
      ok: false,
      message: `GHL API failed (${response.status})`,
    };
  }

  return { mode: "api", ok: true, message: "Contact upserted via GHL API" };
}

async function submitViaWebhook(lead: LeadPayload): Promise<GhlResult> {
  const url = serverEnv().GHL_WEBHOOK_URL;
  if (!url) {
    return { mode: "webhook", ok: false, message: "GHL webhook URL missing" };
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...buildGhlContactPayload(lead),
      raw: lead,
    }),
  });

  if (!response.ok) {
    return {
      mode: "webhook",
      ok: false,
      message: `Webhook failed (${response.status})`,
    };
  }

  return { mode: "webhook", ok: true, message: "Lead sent to GHL webhook" };
}

export async function submitLead(lead: LeadPayload): Promise<GhlResult> {
  if (lead.website) {
    // Honeypot tripped — pretend success
    return { mode: "dev-log", ok: true, message: "Ignored honeypot submission" };
  }

  const env = serverEnv();
  if (env.GHL_LOCATION_ID && env.GHL_API_TOKEN) {
    return submitViaApi(lead);
  }
  if (env.GHL_WEBHOOK_URL) {
    return submitViaWebhook(lead);
  }

  console.info("[GHL DEV LOG] Lead submission:", JSON.stringify(lead, null, 2));
  return {
    mode: "dev-log",
    ok: true,
    message: "Logged lead locally (no GHL credentials configured)",
  };
}
