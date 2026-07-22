import Link from "next/link";
import { ProductCard } from "@/components/commerce/ProductCard";
import type { Product } from "@/lib/shopify/types";
import { siteCopy } from "@/lib/content/site-copy";

export function FeaturedCoffee({ products }: { products: Product[] }) {
  const { featured } = siteCopy;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.22em] text-driftwood uppercase">
            {featured.eyebrow}
          </p>
          <h2 className="font-display mt-2 text-4xl text-ocean md:text-5xl">
            {featured.heading}
          </h2>
          <p className="mt-3 max-w-xl text-driftwood">{featured.body}</p>
        </div>
        <Link
          href="/shop"
          className="hidden text-sm font-medium text-ocean underline sm:inline"
        >
          {featured.shopAll}
        </Link>
      </div>
      {products.length === 0 ? (
        <p className="mt-10 text-driftwood">{featured.empty}</p>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
