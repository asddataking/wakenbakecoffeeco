import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ShopFilters } from "@/components/commerce/ShopFilters";
import { getProducts } from "@/lib/shopify/client";
import type { ShopFilters as Filters } from "@/lib/shopify/types";
import { absoluteUrl } from "@/lib/utils/cn";
import { ViewItemListTracker } from "@/components/commerce/ViewItemListTracker";
import Link from "next/link";
import { siteCopy } from "@/lib/content/site-copy";
import { seo } from "@/lib/content/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: seo.shop.title,
  description: seo.shop.description,
  alternates: { canonical: absoluteUrl("/shop") },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function parseFilters(sp: Record<string, string | string[] | undefined>): Filters {
  const one = (key: string) => {
    const v = sp[key];
    return Array.isArray(v) ? v[0] : v;
  };
  return {
    q: one("q"),
    sort: (one("sort") as Filters["sort"]) || "featured",
    availability: (one("availability") as Filters["availability"]) || "all",
    roast: one("roast"),
    type: one("type"),
    minPrice: one("minPrice") ? Number(one("minPrice")) : undefined,
    maxPrice: one("maxPrice") ? Number(one("maxPrice")) : undefined,
    subscription: one("subscription") === "true",
    cursor: one("cursor"),
  };
}

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const filters = parseFilters(sp);
  const { shop } = siteCopy;
  const { products, pageInfo } = await getProducts(filters).catch(() => ({
    products: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: null,
      endCursor: null,
    },
  }));

  const heading = filters.subscription ? "Subscriptions" : shop.heading;
  const body = filters.subscription ? seo.subscriptions.description : shop.body;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8">
        <h1 className="font-display text-5xl text-ocean">{heading}</h1>
        <p className="mt-3 max-w-2xl text-driftwood">{body}</p>
      </header>

      <Suspense fallback={<div className="h-28 animate-pulse rounded-2xl bg-sand/40" />}>
        <ShopFilters />
      </Suspense>

      <ViewItemListTracker products={products} listName="Shop" />

      {products.length === 0 ? (
        <div className="mt-12 space-y-3">
          <h2 className="font-display text-2xl text-ocean">{shop.emptyHeading}</h2>
          <p className="text-driftwood">{shop.emptyBody}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="rounded-full bg-ocean px-4 py-2 text-sm font-semibold text-cream no-underline"
            >
              {shop.emptyCta}
            </Link>
            <Link href="/shop" className="rounded-full border border-ocean/20 px-4 py-2 text-sm text-ocean no-underline">
              {shop.clearFilters}
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {pageInfo.hasNextPage && pageInfo.endCursor ? (
        <div className="mt-12 text-center">
          <Link
            href={`/shop?${new URLSearchParams({
              ...Object.fromEntries(
                Object.entries(filters)
                  .filter(([, v]) => v != null && v !== "")
                  .map(([k, v]) => [k, String(v)]),
              ),
              cursor: pageInfo.endCursor,
            }).toString()}`}
            className="rounded-full border border-ocean/20 px-4 py-2 text-sm text-ocean no-underline"
          >
            {shop.loadMore}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
