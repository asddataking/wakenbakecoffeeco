import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProductByHandle,
  getProductRecommendations,
  getProducts,
} from "@/lib/shopify/client";
import {
  ProductGallery,
  ProductPurchasePanel,
} from "@/components/commerce/ProductPurchasePanel";
import { CoffeeMetafieldsList } from "@/components/commerce/CoffeeMetafields";
import { ProductCard } from "@/components/commerce/ProductCard";
import { formatMoney } from "@/lib/shopify/normalize";
import { absoluteUrl } from "@/lib/utils/cn";
import { JsonLd } from "@/components/ui/JsonLd";

export const dynamic = "force-dynamic";

type Params = Promise<{ handle: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: "Product" };
  const image = product.featuredImage?.url;
  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description.slice(0, 160),
    alternates: { canonical: absoluteUrl(`/products/${handle}`) },
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export async function generateStaticParams() {
  try {
    const { products } = await getProducts();
    return products.map((p) => ({ handle: p.handle }));
  } catch {
    return [];
  }
}

const faq = [
  {
    q: "How fresh is the coffee?",
    a: "Roast and ship timing come from our Shopify/Dripshipper catalog. Check each product’s shipping note when available.",
  },
  {
    q: "Whole bean or ground?",
    a: "Choose grind on the product variants when offered. Whole bean stays freshest longest.",
  },
  {
    q: "Can I subscribe?",
    a: "If a selling plan appears above, you can subscribe at checkout through Shopify. Otherwise one-time purchase is available.",
  },
];

export default async function ProductPage({ params }: { params: Params }) {
  const { handle } = await params;
  const product = await getProductByHandle(handle).catch(() => null);
  if (!product) notFound();

  const related = await getProductRecommendations(product.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 pb-28 md:pb-12">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description: product.description,
            image: product.images.map((i) => i.url),
            sku: product.variants[0]?.sku || undefined,
            brand: { "@type": "Brand", name: product.vendor || "Wake N Bake Coffee Co." },
            offers: {
              "@type": "Offer",
              priceCurrency: product.priceRange.minVariantPrice.currencyCode,
              price: product.priceRange.minVariantPrice.amount,
              availability: product.availableForSale
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
              url: absoluteUrl(`/products/${product.handle}`),
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Shop", item: absoluteUrl("/shop") },
              {
                "@type": "ListItem",
                position: 3,
                name: product.title,
                item: absoluteUrl(`/products/${product.handle}`),
              },
            ],
          },
        ]}
      />

      <p className="text-sm text-driftwood">
        <Link href="/shop" className="underline">
          Shop
        </Link>{" "}
        / {product.title}
      </p>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductGallery product={product} />
        <div>
          <h1 className="font-display text-4xl text-ocean md:text-5xl">{product.title}</h1>
          <p className="mt-2 text-driftwood">
            From {formatMoney(product.priceRange.minVariantPrice)}
          </p>
          <div
            className="prose-ocean mt-6 space-y-3 text-ocean/90"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
          <div className="mt-8">
            <ProductPurchasePanel product={product} />
          </div>
          <CoffeeMetafieldsList metafields={product.metafields} />
        </div>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-3xl text-ocean">FAQ</h2>
        <div className="mt-6 space-y-4">
          {faq.map((item) => (
            <details key={item.q} className="border-b border-ocean/10 pb-4">
              <summary className="cursor-pointer font-medium text-ocean">{item.q}</summary>
              <p className="mt-2 text-sm text-driftwood">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-display text-3xl text-ocean">You may also like</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {related.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
