import type { Metadata } from "next";
import Link from "next/link";
import { siteFaq } from "@/lib/content/faq";
import { seo } from "@/lib/content/seo";
import { createPageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = createPageMetadata({
  title: seo.faq.title,
  description: seo.faq.description,
  path: "/faq",
});


export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: siteFaq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }}
      />
      <h1 className="font-display text-5xl text-ocean">FAQ</h1>
      <p className="mt-4 text-driftwood">
        Straight answers about coffee, checkout, shipping, and the laid-back lifestyle
        behind the name.
      </p>
      <div className="mt-10 space-y-4">
        {siteFaq.map((item) => (
          <details key={item.question} className="rounded-xl border border-ocean/10 bg-foam/50 px-4 py-3">
            <summary className="cursor-pointer text-lg font-medium text-ocean">
              {item.question}
            </summary>
            <p className="mt-2 text-driftwood">{item.answer}</p>
          </details>
        ))}
      </div>
      <p className="mt-10 text-sm text-driftwood">
        Still stuck?{" "}
        <Link href="/contact" className="underline">
          Send a message in a bottle
        </Link>
        .
      </p>
    </div>
  );
}
