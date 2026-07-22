import type { Metadata } from "next";
import Link from "next/link";
import { articles, articleCategories } from "@/lib/content/articles";
import { siteCopy } from "@/lib/content/site-copy";
import { seo } from "@/lib/content/seo";
import { absoluteUrl } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: seo.journal.title,
  description: seo.journal.description,
  alternates: { canonical: absoluteUrl("/journal") },
};

export default function JournalPage() {
  const { journal } = siteCopy;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-display text-5xl text-ocean">{journal.heading}</h1>
      <p className="mt-4 max-w-2xl text-driftwood">{journal.body}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        {articleCategories.map((category) => (
          <a
            key={category}
            href={`#${category.toLowerCase().replace(/\s+/g, "-")}`}
            className="rounded-full border border-ocean/15 bg-foam/70 px-3 py-1 text-xs text-ocean no-underline"
          >
            {category}
          </a>
        ))}
      </div>

      <div className="mt-12 space-y-16">
        {articleCategories.map((category) => {
          const items = articles.filter((article) => article.category === category);
          if (items.length === 0) return null;
          return (
            <section key={category} id={category.toLowerCase().replace(/\s+/g, "-")}>
              <h2 className="font-display text-3xl text-ocean">{category}</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {items.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/journal/${article.slug}`}
                    className="rounded-2xl border border-ocean/10 bg-foam/50 p-5 no-underline transition hover:border-ocean/25 hover:shadow-soft"
                  >
                    <p className="text-xs text-driftwood">
                      {article.readTime} · {article.publishedAt}
                    </p>
                    <h3 className="font-display mt-2 text-2xl text-ocean">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm text-driftwood">{article.excerpt}</p>
                    <span className="mt-4 inline-flex text-sm font-medium text-denim">
                      {journal.readMore} →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
