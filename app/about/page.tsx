import type { Metadata } from "next";
import Link from "next/link";
import { aboutContent } from "@/lib/content/about";
import { seo } from "@/lib/content/seo";
import { absoluteUrl } from "@/lib/utils/cn";
import { createPageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/ui/JsonLd";
import { brand } from "@/lib/content/brand";

export const metadata: Metadata = createPageMetadata({
  title: seo.about.title,
  description: seo.about.description,
  path: "/about",
});


export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: seo.about.title,
          description: seo.about.description,
          url: absoluteUrl("/about"),
          isPartOf: {
            "@type": "WebSite",
            name: brand.name,
            url: absoluteUrl("/"),
          },
        }}
      />
      <p className="text-xs tracking-[0.22em] text-driftwood uppercase">
        {aboutContent.eyebrow}
      </p>
      <h1 className="font-display mt-3 text-5xl text-ocean text-balance">
        {aboutContent.headline}
      </h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-ocean/90">
        {aboutContent.opening.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-14 space-y-12">
        {aboutContent.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="font-display text-3xl text-ocean">{section.heading}</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ocean/90">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 rounded-3xl border border-ocean/10 bg-foam/70 p-8 text-center">
        <p className="font-display text-2xl text-ocean">{aboutContent.closing}</p>
        <Link
          href={aboutContent.ctaHref}
          className="mt-6 inline-block rounded-full bg-ocean px-6 py-3 text-sm font-semibold text-cream no-underline"
        >
          {aboutContent.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
