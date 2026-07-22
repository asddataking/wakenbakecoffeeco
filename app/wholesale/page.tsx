import type { Metadata } from "next";
import { WholesaleForm } from "@/components/forms/WholesaleForm";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { absoluteUrl } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Wholesale",
  description: "Wholesale coffee inquiries for cafes, shops, and hospitality partners.",
  alternates: { canonical: absoluteUrl("/wholesale") },
};

export default function WholesalePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-5xl text-ocean">Wholesale</h1>
          <p className="mt-4 text-lg text-driftwood">
            Serving a cafe, market, or hospitality program? Tell us about your volume and
            we will follow up with availability through our Shopify/Dripshipper channel.
          </p>
          <p className="mt-4 text-sm text-driftwood">
            Pricing and MOQs are confirmed after review — we do not publish unverified
            wholesale claims on this page.
          </p>
          <div className="mt-10 border-t border-ocean/10 pt-8">
            <h2 className="font-display text-2xl text-ocean">First-order offer list</h2>
            <p className="mt-2 text-sm text-driftwood">
              Join the list for consumer first-order offers when campaigns are active.
            </p>
            <div className="mt-4">
              <NewsletterForm variant="first-order" />
            </div>
          </div>
        </div>
        <WholesaleForm />
      </div>
    </div>
  );
}
