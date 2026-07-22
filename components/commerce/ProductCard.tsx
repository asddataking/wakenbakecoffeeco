import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/shopify/types";
import { formatMoney } from "@/lib/shopify/normalize";
import { siteCopy } from "@/lib/content/site-copy";

export function ProductCard({ product }: { product: Product }) {
  const image = product.featuredImage;
  const price = formatMoney(product.priceRange.minVariantPrice);
  const roast = product.metafields.roastLevel;
  const { featured, product: productCopy } = siteCopy;

  return (
    <article className="group">
      <Link href={`/products/${product.handle}`} className="block no-underline">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand/30 texture-topo shadow-[0_10px_30px_rgba(11,31,51,0.06)]">
          {image ? (
            <Image
              src={image.url}
              alt={image.altText || product.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-driftwood">
              {productCopy.photoSoon}
            </div>
          )}
        </div>
        <div className="mt-3">
          <h3 className="font-display text-xl text-ocean">{product.title}</h3>
          <p className="mt-1 text-sm text-driftwood">
            {roast ? `${roast} · ` : null}
            {price}
            {!product.availableForSale ? ` · ${productCopy.soldOut}` : null}
          </p>
          <span className="mt-2 inline-flex text-sm font-medium text-denim opacity-0 transition group-hover:opacity-100">
            {featured.cardCta} →
          </span>
        </div>
      </Link>
    </article>
  );
}
