import { NextResponse } from "next/server";
import { submitLead } from "@/lib/ghl/client";
import { newsletterSchema, firstOrderSchema } from "@/lib/validation/forms";
import { clientIp, rateLimit } from "@/lib/utils/rate-limit";
import { extractUtm } from "@/lib/utils/utm";
import { z } from "zod";

const bodySchema = z.object({
  form: z.enum(["newsletter", "first-order"]).default("newsletter"),
  name: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  emailConsent: z.boolean(),
  smsConsent: z.boolean().optional(),
  website: z.string().optional(),
  productInterest: z.string().optional(),
  landingPage: z.string().optional(),
  referringUrl: z.string().optional(),
  utm: z.record(z.string(), z.string()).optional(),
});

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`newsletter:${ip}`, 6, 60_000);
  if (!limited.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  try {
    const json = await request.json();
    const raw = bodySchema.parse(json);
    const schema = raw.form === "first-order" ? firstOrderSchema : newsletterSchema;
    const parsed = schema.parse(raw);

    if (parsed.website) {
      return NextResponse.json({ ok: true });
    }

    const result = await submitLead({
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone || "",
      emailConsent: parsed.emailConsent,
      smsConsent: parsed.smsConsent ?? false,
      source: raw.form === "first-order" ? "first-order" : "newsletter",
      productInterest: parsed.productInterest,
      landingPage: raw.landingPage,
      referringUrl: raw.referringUrl,
      utm: raw.utm ? extractUtm(raw.utm) : undefined,
      website: "",
      timestamp: new Date().toISOString(),
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.message }, { status: 502 });
    }

    return NextResponse.json({
      ok: true,
      mode: result.mode,
      message:
        raw.form === "first-order"
          ? "You are on the list. Watch your inbox for first-order details."
          : "Welcome aboard — check your inbox soon.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? "Invalid form data" },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: "Unable to submit form" }, { status: 500 });
  }
}
