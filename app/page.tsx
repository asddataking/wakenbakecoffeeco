import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedCoffee } from "@/components/sections/FeaturedCoffee";
import { ChooseYourCurrent } from "@/components/sections/ChooseYourCurrent";
import { SubscriptionSection } from "@/components/sections/SubscriptionSection";
import { DankNDevourBridge } from "@/components/sections/DankNDevourBridge";
import { BrewGuidesPreview } from "@/components/sections/BrewGuidesPreview";
import { JournalPreview } from "@/components/sections/JournalPreview";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { TrustLogos } from "@/components/layout/TrustLogos";
import { getCollectionByHandle, getProducts } from "@/lib/shopify/client";
import { brand } from "@/lib/content/brand";
import { seo } from "@/lib/content/seo";
import { absoluteUrl } from "@/lib/utils/cn";
import { createPageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/ui/JsonLd";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: seo.home.title,
  description: seo.home.description,
  path: "/",
  absoluteTitle: true,
});

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
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: brand.name,
            alternateName: brand.shortName,
            url: absoluteUrl("/"),
            logo: absoluteUrl(brand.logo.src),
            image: absoluteUrl(brand.shareImage.src),
            description: seo.home.description,
            email: brand.email,
            slogan: brand.tagline,
            areaServed: {
              "@type": "Place",
              name: brand.regionLabel,
            },
            brand: {
              "@type": "Brand",
              name: brand.name,
              slogan: brand.tagline,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: brand.name,
            url: absoluteUrl("/"),
            description: seo.home.description,
            publisher: {
              "@type": "Organization",
              name: brand.name,
            },
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${absoluteUrl("/shop")}?q={search_term_string}`,
              },
              "query-input": "required name=search_term_string",
            },
          },
        ]}
      />
      <HeroSection />
      <FeaturedCoffee products={products} />
      <ChooseYourCurrent />
      <SubscriptionSection hasSellingPlans={hasSellingPlans} />
      <DankNDevourBridge />
      <BrewGuidesPreview />
      <JournalPreview />
      <TrustLogos />
      <ReviewsSection />
      <NewsletterSection />
    </>
  );
}
