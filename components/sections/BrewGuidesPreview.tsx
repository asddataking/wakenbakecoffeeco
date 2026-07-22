import Link from "next/link";
import { brewGuides } from "@/lib/content/brew-guides";
import { siteCopy } from "@/lib/content/site-copy";

export function BrewGuidesPreview() {
  const { brewGuidesPreview } = siteCopy;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.22em] text-driftwood uppercase">
            {brewGuidesPreview.eyebrow}
          </p>
          <h2 className="font-display mt-2 text-4xl text-ocean md:text-5xl">
            {brewGuidesPreview.heading}
          </h2>
          <p className="mt-3 max-w-xl text-driftwood">{brewGuidesPreview.body}</p>
        </div>
        <Link
          href="/brew-guides"
          className="hidden text-sm font-medium text-ocean underline sm:inline"
        >
          {brewGuidesPreview.allGuides}
        </Link>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {brewGuides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/brew-guides/${guide.slug}`}
            className="rounded-2xl border border-ocean/10 bg-foam/50 p-5 no-underline transition hover:border-ocean/25 hover:shadow-soft"
          >
            <p className="text-xs text-driftwood">{guide.readTime} read</p>
            <h3 className="font-display mt-2 text-2xl text-ocean">{guide.title}</h3>
            <p className="mt-2 text-sm text-driftwood">{guide.excerpt}</p>
          </Link>
        ))}
      </div>
      <Link
        href="/brew-guides"
        className="mt-8 inline-block rounded-full bg-ocean px-5 py-3 text-sm font-semibold text-cream no-underline sm:hidden"
      >
        {brewGuidesPreview.cta}
      </Link>
    </section>
  );
}
