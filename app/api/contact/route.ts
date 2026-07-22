import { NextResponse } from "next/server";
import { submitLead } from "@/lib/ghl/client";
import { contactSchema } from "@/lib/validation/forms";
import { clientIp, rateLimit } from "@/lib/utils/rate-limit";
import { extractUtm } from "@/lib/utils/utm";
import { z } from "zod";

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!limited.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  try {
    const json = await request.json();
    const parsed = contactSchema.parse(json);

    if (parsed.website) {
      return NextResponse.json({ ok: true });
    }

    const result = await submitLead({
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone || "",
      emailConsent: parsed.emailConsent,
      smsConsent: parsed.smsConsent ?? false,
      source: "contact",
      message: parsed.message,
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
      message: "Message received.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? "Invalid form data" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "That one did not make it." },
      { status: 500 },
    );
  }
}
