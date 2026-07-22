import Link from "next/link";
import { BrandEmblem } from "@/components/ui/BrandMark";
import { brand } from "@/lib/content/brand";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden text-cream">
      <div
        className="absolute inset-0 -z-10 bg-ocean-deep"
        aria-hidden
      >
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

      <div className="mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pt-24 pb-16 md:justify-center md:pb-24">
        <div className="animate-rise max-w-2xl">
          <BrandEmblem
            className="mb-6 h-28 w-28 drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)] sm:h-36 sm:w-36 md:h-44 md:w-44"
            sizes="(max-width: 640px) 144px, 176px"
            priority
          />
          <p className="sr-only">{brand.name}</p>
          <h1 className="font-display text-5xl leading-[1.05] text-balance sm:text-6xl md:text-7xl">
            {brand.tagline}
          </h1>
          <p className="mt-5 max-w-md text-lg text-cream/85">
            Coastal mornings, campfire evenings, and coffee worth slowing down for.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="rounded bg-sunrise px-5 py-3 text-sm font-semibold tracking-wide text-ocean-deep no-underline"
            >
              Shop coffee
            </Link>
            <Link
              href="/brew-guides"
              className="rounded border border-cream/40 px-5 py-3 text-sm font-semibold tracking-wide text-cream no-underline"
            >
              Brew guides
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
