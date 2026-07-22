import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: absoluteUrl("/privacy") },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 prose-legal">
      <h1 className="font-display text-5xl text-ocean">Privacy Policy</h1>
      <p className="mt-4 text-sm text-driftwood">
        Last updated: July 22, 2026 · [CONFIRM legal review before launch]
      </p>
      <div className="mt-8 space-y-4 text-ocean/90">
        <p>
          Wake N Bake Coffee Co. (&quot;we&quot;) operates this headless storefront. We
          collect information you submit through forms (name, email, optional phone,
          message content, and consent choices) and technical data needed to run the site.
        </p>
        <p>
          Orders and payment details are processed by Shopify. Marketing contacts may be
          stored in GoHighLevel when you opt in. We do not sell personal information.
        </p>
        <p>
          Analytics and advertising pixels load only after consent when configured.
          [CONFIRM: state-specific privacy disclosures, cookie list, and DPA links.]
        </p>
        <p>
          Contact [CONFIRM privacy email] to request access or deletion of marketing
          records we control. Shopify order data requests should also be directed through
          Shopify customer tools where applicable.
        </p>
      </div>
    </div>
  );
}
