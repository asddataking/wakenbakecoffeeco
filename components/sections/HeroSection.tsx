import Link from "next/link";
import { BrandEmblem } from "@/components/ui/BrandMark";
import { brand } from "@/lib/content/brand";
import { siteCopy } from "@/lib/content/site-copy";

export function HeroSection() {
  const { hero } = siteCopy;

  return (
    <section className="relative isolate min-h-[52vh] overflow-hidden text-cream md:min-h-[48vh]">
      <div className="absolute inset-0 -z-10 bg-ocean-deep" aria-hidden>
        <div className="animate-horizon absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(201,123,75,0.45),transparent_50%),linear-gradient(180deg,#1a3a55_0%,#0b1f33_42%,#071525_72%,#0a2430_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent,rgba(7,21,37,0.85))]" />
        <svg
          className="absolute inset-x-0 bottom-0 w-full opacity-40"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            fill="#7f9e8a"
            fillOpacity="0.25"
            d="M0,100 C240,160 480,40 720,100 C960,160 1200,60 1440,110 L1440,180 L0,180 Z"
          />
          <path
            fill="#d4c4a8"
            fillOpacity="0.2"
            d="M0,130 C260,170 520,90 780,130 C1040,170 1240,110 1440,140 L1440,180 L0,180 Z"
          />
        </svg>
      </div>

      <div className="mx-auto flex min-h-[52vh] max-w-6xl flex-col justify-center px-4 py-14 md:min-h-[48vh] md:py-16">
        <div className="animate-rise max-w-2xl">
          <BrandEmblem
            className="mb-5 h-24 w-24 drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)] sm:h-28 sm:w-28 md:h-32 md:w-32"
            sizes="(max-width: 640px) 112px, 128px"
            priority
          />
          <p className="text-xs tracking-[0.28em] text-sunrise-soft uppercase">
            {hero.eyebrow}
          </p>
          <p className="sr-only">{brand.name}</p>
          <h1 className="font-display mt-3 text-5xl leading-[1.05] text-balance sm:text-6xl md:text-7xl">
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-lg text-lg text-cream/85">{hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={hero.primaryHref}
              className="rounded-full bg-sunrise px-6 py-3 text-sm font-semibold tracking-wide text-ocean-deep no-underline shadow-[0_10px_30px_rgba(201,123,75,0.35)] transition hover:bg-sunrise-soft"
            >
              {hero.primaryCta}
            </Link>
            <Link
              href={hero.secondaryHref}
              className="rounded-full border border-cream/40 bg-cream/5 px-6 py-3 text-sm font-semibold tracking-wide text-cream no-underline backdrop-blur-sm transition hover:border-cream/70 hover:bg-cream/10"
            >
              {hero.secondaryCta}
            </Link>
          </div>
          <p className="mt-5 text-sm text-cream/65">{hero.microcopy}</p>
        </div>
      </div>
    </section>
  );
}
