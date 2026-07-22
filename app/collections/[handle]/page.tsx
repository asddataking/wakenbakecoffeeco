import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ShopFilters } from "@/components/commerce/ShopFilters";
import { getCollectionByHandle, getCollections } from "@/lib/shopify/client";
import type { ShopFilters as Filters } from "@/lib/shopify/types";
import { absoluteUrl } from "@/lib/utils/cn";
import { JsonLd } from "@/components/ui/JsonLd";

export const dynamic = "force-dynamic";

type Params = Promise<{ handle: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { handle } = await params;
  const result = await getCollectionByHandle(handle).catch(() => null);
  if (!result) return { title: "Collection" };
  const { collection } = result;
  return {
    title: collection.seo.title || collection.title,
    description: collection.seo.description || collection.description,
    alternates: { canonical: absoluteUrl(`/collections/${handle}`) },
  };
}

export async function generateStaticParams() {
  try {
    const collections = await getCollections();
    return collections.map((c) => ({ handle: c.handle }));
  } catch {
    return [{ handle: "featured-coffee" }, { handle: "all" }];
  }
}

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
    cursor: one("cursor"),
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { handle } = await params;
  const sp = await searchParams;
  const result = await getCollectionByHandle(handle, parseFilters(sp)).catch(() => null);
  if (!result) notFound();
  const { collection, pageInfo } = result;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Shop", item: absoluteUrl("/shop") },
            {
              "@type": "ListItem",
              position: 3,
              name: collection.title,
              item: absoluteUrl(`/collections/${handle}`),
            },
          ],
        }}
      />
      <header className="mb-8">
        <p className="text-sm text-driftwood">
          <Link href="/shop" className="underline">
            Shop
          </Link>{" "}
          / {collection.title}
        </p>
        <h1 className="font-display mt-2 text-5xl text-ocean">{collection.title}</h1>
        {collection.description ? (
          <p className="mt-3 max-w-2xl text-driftwood">{collection.description}</p>
        ) : null}
      </header>

      <Suspense fallback={null}>
        <ShopFilters />
      </Suspense>

      {collection.products.length === 0 ? (
        <p className="mt-12 text-driftwood">No products in this collection yet.</p>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {collection.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {pageInfo.hasNextPage && pageInfo.endCursor ? (
        <div className="mt-12 text-center">
          <Link
            href={`/collections/${handle}?cursor=${pageInfo.endCursor}`}
            className="rounded border border-ocean/20 px-4 py-2 text-sm no-underline"
          >
            Load more
          </Link>
        </div>
      ) : null}
    </div>
  );
}
