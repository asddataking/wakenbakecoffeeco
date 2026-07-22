import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { brand } from "@/lib/content/brand";
import { siteCopy } from "@/lib/content/site-copy";
import { seo } from "@/lib/content/seo";
import { absoluteUrl } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: seo.contact.title,
  description: seo.contact.description,
  alternates: { canonical: absoluteUrl("/contact") },
};

export default function ContactPage() {
  const { contact } = siteCopy;

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-2">
      <div>
        <h1 className="font-display text-5xl text-ocean text-balance">{contact.heading}</h1>
        <p className="mt-4 text-driftwood">{contact.body}</p>
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
