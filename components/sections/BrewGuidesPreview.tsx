import Link from "next/link";
import { brewGuides } from "@/lib/content/brew-guides";

export function BrewGuidesPreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.22em] text-driftwood uppercase">Learn</p>
          <h2 className="font-display mt-2 text-4xl text-ocean">Brew guides</h2>
          <p className="mt-2 text-driftwood">
            Practical methods for sunrise pour-overs, camp presses, and house pots.
          </p>
        </div>
        <Link href="/brew-guides" className="hidden text-sm underline sm:inline">
          All guides
        </Link>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {brewGuides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/brew-guides/${guide.slug}`}
            className="border-t border-ocean/15 pt-5 no-underline"
          >
            <p className="text-xs text-driftwood">{guide.readTime} read</p>
            <h3 className="font-display mt-2 text-2xl text-ocean">{guide.title}</h3>
            <p className="mt-2 text-sm text-driftwood">{guide.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
