import Link from "next/link";
import { brand } from "@/lib/content/brand";

export function DankNDevourBridge() {
  return (
    <section className="bg-gradient-to-br from-denim/20 via-cream to-seaglass/20 py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="text-xs tracking-[0.22em] text-driftwood uppercase">
          {brand.dankNDevour.eyebrow}
        </p>
        <h2 className="font-display mt-2 text-4xl text-ocean md:text-5xl">
          {brand.dankNDevour.title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-driftwood">
          {brand.dankNDevour.description}
        </p>
        <Link
          href={brand.dankNDevour.ctaHref}
          className="mt-8 inline-block rounded-full border border-ocean/30 bg-foam/60 px-6 py-3 text-sm font-semibold text-ocean no-underline backdrop-blur-sm transition hover:border-ocean/50"
        >
          {brand.dankNDevour.ctaLabel}
        </Link>
      </div>
    </section>
  );
}
