import type { Metadata } from "next";
import { WholesaleForm } from "@/components/forms/WholesaleForm";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { seo } from "@/lib/content/seo";
import { siteCopy } from "@/lib/content/site-copy";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: seo.wholesale.title,
  description: seo.wholesale.description,
  path: "/wholesale",
});


export default function WholesalePage() {
  const { wholesale } = siteCopy;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-5xl text-ocean">{wholesale.heading}</h1>
          <p className="mt-4 text-lg text-driftwood">{wholesale.body}</p>
          <p className="mt-4 text-sm text-driftwood">{wholesale.note}</p>
          <div className="mt-10 border-t border-ocean/10 pt-8">
            <h2 className="font-display text-2xl text-ocean">
              {wholesale.firstOrderHeading}
            </h2>
            <p className="mt-2 text-sm text-driftwood">{wholesale.firstOrderBody}</p>
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
