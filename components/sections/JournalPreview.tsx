import Link from "next/link";
import { articles } from "@/lib/content/articles";
import { siteCopy } from "@/lib/content/site-copy";

export function JournalPreview() {
  const { journal } = siteCopy;
  const featured = articles.slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.22em] text-driftwood uppercase">Blog</p>
          <h2 className="font-display mt-2 text-4xl text-ocean md:text-5xl">
            {journal.heading}
          </h2>
          <p className="mt-3 max-w-xl text-driftwood">{journal.body}</p>
        </div>
        <Link
          href="/journal"
          className="hidden text-sm font-medium text-ocean underline sm:inline"
        >
          View all posts
        </Link>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {featured.map((article) => (
          <Link
            key={article.slug}
            href={`/journal/${article.slug}`}
            className="rounded-2xl border border-ocean/10 bg-foam/50 p-5 no-underline transition hover:border-ocean/25 hover:shadow-soft"
          >
            <p className="text-xs tracking-[0.16em] text-driftwood uppercase">
              {article.category}
            </p>
            <h3 className="font-display mt-2 text-2xl text-ocean">{article.title}</h3>
            <p className="mt-2 text-sm text-driftwood">{article.excerpt}</p>
            <span className="mt-4 inline-flex text-sm font-semibold text-ocean">
              {journal.readMore} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
