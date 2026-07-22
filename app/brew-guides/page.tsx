import type { Metadata } from "next";
import Link from "next/link";
import { brewGuides } from "@/lib/content/brew-guides";
import { articles } from "@/lib/content/articles";
import { siteCopy } from "@/lib/content/site-copy";
import { seo } from "@/lib/content/seo";
import { absoluteUrl } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: seo.brewGuides.title,
  description: seo.brewGuides.description,
  alternates: { canonical: absoluteUrl("/brew-guides") },
};

export default function BrewGuidesPage() {
  const { brewGuidesIndex } = siteCopy;
  const relatedArticles = articles.filter((article) =>
    ["Brew Better", "Camp Coffee", "Coffee Basics"].includes(article.category),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-display text-5xl text-ocean">{brewGuidesIndex.heading}</h1>
      <p className="mt-4 max-w-2xl text-driftwood">{brewGuidesIndex.body}</p>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {brewGuides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/brew-guides/${guide.slug}`}
            className="rounded-2xl border border-ocean/10 bg-foam/50 p-5 no-underline transition hover:border-ocean/25 hover:shadow-soft"
          >
            <p className="text-xs text-driftwood">
              {guide.readTime} · {guide.publishedAt}
            </p>
            <h2 className="font-display mt-2 text-3xl text-ocean">{guide.title}</h2>
            <p className="mt-3 text-sm text-driftwood">{guide.excerpt}</p>
          </Link>
        ))}
      </div>

      <section className="mt-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.22em] text-driftwood uppercase">
              Keep learning
            </p>
            <h2 className="font-display mt-2 text-3xl text-ocean">From the journal</h2>
          </div>
          <Link href="/journal" className="hidden text-sm underline sm:inline">
            All articles
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {relatedArticles.slice(0, 3).map((article) => (
            <Link
              key={article.slug}
              href={`/journal/${article.slug}`}
              className="border-t border-ocean/15 pt-4 no-underline"
            >
              <p className="text-xs text-driftwood">{article.category}</p>
              <h3 className="font-display mt-1 text-xl text-ocean">{article.title}</h3>
              <p className="mt-2 text-sm text-driftwood">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
