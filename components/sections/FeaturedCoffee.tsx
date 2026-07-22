import Link from "next/link";
import { ProductCard } from "@/components/commerce/ProductCard";
import type { Product } from "@/lib/shopify/types";

export function FeaturedCoffee({ products }: { products: Product[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.22em] text-driftwood uppercase">Featured</p>
          <h2 className="font-display mt-2 text-4xl text-ocean">Coffee for the current</h2>
          <p className="mt-2 max-w-xl text-driftwood">
            Bags chosen for slow mornings, open roads, and evenings that refuse to rush.
          </p>
        </div>
        <Link href="/shop" className="hidden text-sm text-ocean underline sm:inline">
          Shop all
        </Link>
      </div>
      {products.length === 0 ? (
        <p className="mt-10 text-driftwood">
          Products will appear here once the Shopify catalog is connected.
        </p>
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
