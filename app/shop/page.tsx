import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ShopFilters } from "@/components/commerce/ShopFilters";
import { getProducts } from "@/lib/shopify/client";
import type { ShopFilters as Filters } from "@/lib/shopify/types";
import { absoluteUrl } from "@/lib/utils/cn";
import { ViewItemListTracker } from "@/components/commerce/ViewItemListTracker";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shop Coffee",
  description: "Browse Wake N Bake Coffee Co. bags — roasted for mornings by the water.",
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
  const { products, pageInfo } = await getProducts(filters);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8">
        <h1 className="font-display text-5xl text-ocean">Shop coffee</h1>
        <p className="mt-3 max-w-2xl text-driftwood">
          Filter by roast, type, and price. Checkout is always handled securely by Shopify.
        </p>
      </header>

      <Suspense fallback={<div className="h-28 animate-pulse rounded bg-sand/40" />}>
        <ShopFilters />
      </Suspense>

      <ViewItemListTracker products={products} listName="Shop" />

      {products.length === 0 ? (
        <p className="mt-12 text-driftwood">
          No products match these filters.{" "}
          <Link href="/shop" className="underline">
            Clear filters
          </Link>
        </p>
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
            className="rounded border border-ocean/20 px-4 py-2 text-sm text-ocean no-underline"
          >
            Load more
          </Link>
        </div>
      ) : null}
    </div>
  );
}
