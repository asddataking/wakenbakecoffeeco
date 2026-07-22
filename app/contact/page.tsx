import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { brand } from "@/lib/content/brand";
import { absoluteUrl } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Wake N Bake Coffee Co.",
  alternates: { canonical: absoluteUrl("/contact") },
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-2">
      <div>
        <h1 className="font-display text-5xl text-ocean">Contact</h1>
        <p className="mt-4 text-driftwood">
          Questions about an order, wholesale, or the brand? Send a note — we read every
          message.
        </p>
        <dl className="mt-8 space-y-3 text-sm">
          <div>
            <dt className="text-driftwood">Email</dt>
            <dd>
              <a href={`mailto:${brand.email}`} className="text-ocean underline">
                {brand.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-driftwood">Mailing</dt>
            <dd className="text-ocean">
              {brand.address.line1}
              <br />
              {brand.address.city}, {brand.address.region} {brand.address.postal}
            </dd>
          </div>
        </dl>
      </div>
      <ContactForm />
    </div>
  );
}
