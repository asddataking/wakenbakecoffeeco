import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  articles,
  getArticle,
  getRelatedArticles,
} from "@/lib/content/articles";
import { brand } from "@/lib/content/brand";
import { absoluteUrl } from "@/lib/utils/cn";
import { createPageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/ui/JsonLd";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Journal" };
  return createPageMetadata({
    title: article.seoTitle,
    description: article.metaDescription,
    path: `/journal/${slug}`,
    absoluteTitle: true,
    type: "article",
  });
}

export default async function JournalArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.metaDescription,
            datePublished: article.publishedAt,
            author: { "@type": "Organization", name: brand.name },
            mainEntityOfPage: absoluteUrl(`/journal/${article.slug}`),
            articleSection: article.category,
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: article.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
              {
                "@type": "ListItem",
                position: 2,
                name: "Journal",
                item: absoluteUrl("/journal"),
              },
              {
                "@type": "ListItem",
                position: 3,
                name: article.title,
                item: absoluteUrl(`/journal/${article.slug}`),
              },
            ],
          },
        ]}
      />

      <p className="text-sm text-driftwood">
        <Link href="/journal" className="underline">
          Journal
        </Link>{" "}
        / {article.category}
      </p>
      <h1 className="font-display mt-4 text-5xl text-ocean text-balance">
        {article.title}
      </h1>
      <p className="mt-3 text-sm text-driftwood">
        {article.readTime} read · {article.publishedAt}
      </p>

      <div className="mt-8 rounded-2xl border border-seaglass/30 bg-seaglass/10 p-5">
        <p className="text-sm font-medium tracking-wide text-ocean uppercase">
          Quick answer
        </p>
        <p className="mt-2 text-ocean/90">{article.answerUpFront}</p>
      </div>

      <div className="mt-8 space-y-4 text-lg leading-relaxed text-ocean/90">
        {article.introduction.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-12 space-y-10">
        {article.sections.map((section) => (
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

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ocean">FAQ</h2>
        <div className="mt-4 space-y-3">
          {article.faq.map((item) => (
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
        <p className="text-ocean">{article.productLinkPrompt}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/shop"
            className="rounded-full bg-ocean px-5 py-2.5 text-sm font-semibold text-cream no-underline"
          >
            Shop the Coffee
          </Link>
          {article.internalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-ocean/20 px-4 py-2.5 text-sm text-ocean no-underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-display text-2xl text-ocean">Related reading</h2>
          <ul className="mt-4 space-y-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/journal/${item.slug}`}
                  className="font-medium text-ocean underline"
                >
                  {item.title}
                </Link>
                <p className="text-sm text-driftwood">{item.excerpt}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
