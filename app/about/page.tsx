import type { Metadata } from "next";
import { brand } from "@/lib/content/brand";
import { absoluteUrl } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "About",
  description: `The story behind ${brand.name} — coastal coffee from the DankNDevour community.`,
  alternates: { canonical: absoluteUrl("/about") },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-5xl text-ocean">About Wake N Bake</h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-ocean/90">
        <p>
          Wake N Bake Coffee Co. is a beach-inspired coffee brand built for people who
          wake up near water — or wish they did — and want a cup that matches the pace of
          a good day.
        </p>
        <p>
          We launched through the DankNDevour media audience: creators, campers, travelers,
          and neighbors who value excellent coffee without the pretension. The feeling is
          simple — brew something honest, step outside, and enjoy the life you already have.
        </p>
        <p>
          Our coffee is sold through Shopify and fulfilled with Dripshipper partners. That
          keeps roasting and shipping specialized while we focus on community, education,
          and a storefront that feels like the brand.
        </p>
        <p>
          No medical claims. No intoxication marketing. Just coffee, coastline energy, and
          the invitation to brew the good life.
        </p>
      </div>
    </div>
  );
}
