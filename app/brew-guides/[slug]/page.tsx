import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { brewGuides, getBrewGuide } from "@/lib/content/brew-guides";
import { getArticle } from "@/lib/content/articles";
import { brand } from "@/lib/content/brand";
import { absoluteUrl } from "@/lib/utils/cn";
import { createPageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/ui/JsonLd";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return brewGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getBrewGuide(slug);
  if (!guide) return { title: "Brew Guide" };
  return createPageMetadata({
    title: guide.seoTitle,
    description: guide.metaDescription,
    path: `/brew-guides/${slug}`,
    absoluteTitle: true,
    type: "article",
  });
}

export default async function BrewGuidePage({ params }: { params: Params }) {
  const { slug } = await params;
  const guide = getBrewGuide(slug);
  if (!guide) notFound();

  const relatedArticles = guide.relatedArticleSlugs
    .map((related) => getArticle(related))
    .filter(Boolean);
  const relatedGuides = guide.relatedGuideSlugs
    .map((related) => getBrewGuide(related))
    .filter(Boolean);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          datePublished: guide.publishedAt,
          description: guide.metaDescription,
          author: { "@type": "Organization", name: brand.name },
          mainEntityOfPage: absoluteUrl(`/brew-guides/${guide.slug}`),
        }}
      />
      <p className="text-sm text-driftwood">
        <Link href="/brew-guides" className="underline">
          Brew guides
        </Link>{" "}
        / {guide.title}
      </p>
      <h1 className="font-display mt-4 text-5xl text-ocean">{guide.title}</h1>
      <p className="mt-4 text-lg text-driftwood">{guide.excerpt}</p>
      <p className="mt-2 text-sm text-driftwood">
        {guide.readTime} read · Updated {guide.publishedAt}
      </p>

      <div className="mt-12 space-y-10">
        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-3xl text-ocean">{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="mt-3 leading-relaxed text-ocean/90">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      <aside className="mt-12 rounded-2xl border border-seaglass/40 bg-seaglass/10 p-6">
        <h2 className="font-display text-2xl text-ocean">Tips</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ocean/90">
          {guide.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </aside>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ocean">FAQ</h2>
        <div className="mt-4 space-y-3">
          {guide.faq.map((item) => (
            <details
              key={item.question}
              className="rounded-xl border border-ocean/10 bg-foam/40 px-4 py-3"
            >
              <summary className="cursor-pointer font-medium text-ocean">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-driftwood">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-ocean/10 bg-foam/60 p-6">
        <p className="text-ocean">{guide.excerpt}</p>
        <Link
          href="/shop"
          className="mt-4 inline-block rounded-full bg-ocean px-5 py-2.5 text-sm font-semibold text-cream no-underline"
        >
          Find Your Roast
        </Link>
      </section>

      {(relatedGuides.length > 0 || relatedArticles.length > 0) ? (
        <section className="mt-12">
          <h2 className="font-display text-2xl text-ocean">Keep exploring</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {relatedGuides.map((item) =>
              item ? (
                <li key={item.slug}>
                  <Link href={`/brew-guides/${item.slug}`} className="text-ocean underline">
                    {item.title}
                  </Link>
                </li>
              ) : null,
            )}
            {relatedArticles.map((item) =>
              item ? (
                <li key={item.slug}>
                  <Link href={`/journal/${item.slug}`} className="text-ocean underline">
                    {item.title}
                  </Link>
                </li>
              ) : null,
            )}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
