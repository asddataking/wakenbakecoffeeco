import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedCoffee } from "@/components/sections/FeaturedCoffee";
import { ChooseYourCurrent } from "@/components/sections/ChooseYourCurrent";
import { SubscriptionSection } from "@/components/sections/SubscriptionSection";
import { DankNDevourBridge } from "@/components/sections/DankNDevourBridge";
import { BrewGuidesPreview } from "@/components/sections/BrewGuidesPreview";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { getCollectionByHandle, getProducts } from "@/lib/shopify/client";
import { brand } from "@/lib/content/brand";
import { absoluteUrl } from "@/lib/utils/cn";
import { JsonLd } from "@/components/ui/JsonLd";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${brand.name} | ${brand.tagline}`,
  description: brand.description,
  alternates: { canonical: absoluteUrl("/") },
};

export default async function HomePage() {
  const featured = await getCollectionByHandle("featured-coffee").catch(() => null);
  const products =
    featured?.collection.products.length
      ? featured.collection.products
      : (
          await getProducts({ sort: "featured" }).catch(() => ({
            products: [],
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
              startCursor: null,
              endCursor: null,
            },
          }))
        ).products;

  const hasSellingPlans = products.some((p) => p.sellingPlanGroups.length > 0);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: brand.name,
          url: absoluteUrl("/"),
          description: brand.description,
          email: brand.email,
        }}
      />
      <HeroSection />
      <FeaturedCoffee products={products} />
      <ChooseYourCurrent />
      <SubscriptionSection hasSellingPlans={hasSellingPlans} />
      <DankNDevourBridge />
      <BrewGuidesPreview />
      <ReviewsSection />
      <NewsletterSection />
    </>
  );
}
