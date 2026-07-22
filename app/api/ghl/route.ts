import { NextResponse } from "next/server";
import { submitLead, GHL_TAGS } from "@/lib/ghl/client";
import { wholesaleSchema } from "@/lib/validation/forms";
import { clientIp, rateLimit } from "@/lib/utils/rate-limit";
import { extractUtm } from "@/lib/utils/utm";
import { z } from "zod";

/**
 * Generic GHL intake endpoint used by wholesale and automation hooks.
 * Accepts validated lead payloads; never exposes GHL credentials.
 */
export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`ghl:${ip}`, 5, 60_000);
  if (!limited.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const json = await request.json();
    const kind = json.kind === "wholesale" ? "wholesale" : "wholesale";
    const parsed = wholesaleSchema.parse(json);

    if (parsed.website) {
      return NextResponse.json({ ok: true });
    }

    const result = await submitLead({
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone || "",
      emailConsent: parsed.emailConsent,
      smsConsent: parsed.smsConsent ?? false,
      source: kind,
      company: parsed.company,
      message: parsed.message,
      productInterest: parsed.productInterest,
      landingPage: typeof json.landingPage === "string" ? json.landingPage : undefined,
      referringUrl: typeof json.referringUrl === "string" ? json.referringUrl : undefined,
      utm: json.utm ? extractUtm(json.utm as Record<string, string>) : undefined,
      website: "",
      timestamp: new Date().toISOString(),
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.message }, { status: 502 });
    }

    return NextResponse.json({
      ok: true,
      mode: result.mode,
      tags: [GHL_TAGS.wholesale, GHL_TAGS.vipCandidate],
      message: "Wholesale inquiry received. Our team will follow up.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? "Invalid form data" },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: "Unable to submit" }, { status: 500 });
  }
}
