import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: { canonical: absoluteUrl("/terms") },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-5xl text-ocean">Terms of Service</h1>
      <p className="mt-4 text-sm text-driftwood">
        Last updated: July 22, 2026 · [CONFIRM legal review before launch]
      </p>
      <div className="mt-8 space-y-4 text-ocean/90">
        <p>
          By using this website you agree to these terms. Products are offered for sale
          through Shopify; prices, availability, and taxes are determined at checkout.
        </p>
        <p>
          Content on this site is for general information. Coffee descriptions come from
          our Shopify catalog and may change. We make no medical or intoxication claims.
        </p>
        <p>
          [CONFIRM: governing law, limitation of liability, dispute resolution, and age
          requirements.]
        </p>
      </div>
    </div>
  );
}
