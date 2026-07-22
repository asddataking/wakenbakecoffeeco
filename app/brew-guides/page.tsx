import type { Metadata } from "next";
import Link from "next/link";
import { brewGuides } from "@/lib/content/brew-guides";
import { absoluteUrl } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Brew Guides",
  description: "Practical brew guides for pour-over, French press, and batch drip.",
  alternates: { canonical: absoluteUrl("/brew-guides") },
};

export default function BrewGuidesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-display text-5xl text-ocean">Brew guides</h1>
      <p className="mt-4 max-w-2xl text-driftwood">
        Clear methods for real kitchens, camp setups, and rental houses — no gatekeeping.
      </p>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {brewGuides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/brew-guides/${guide.slug}`}
            className="border-t border-ocean/15 pt-5 no-underline"
          >
            <p className="text-xs text-driftwood">
              {guide.readTime} · {guide.publishedAt}
            </p>
            <h2 className="font-display mt-2 text-3xl text-ocean">{guide.title}</h2>
            <p className="mt-3 text-sm text-driftwood">{guide.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
