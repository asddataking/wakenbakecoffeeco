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
import { productFaq } from "@/lib/content/faq";
import { siteCopy } from "@/lib/content/site-copy";
import { seo } from "@/lib/content/seo";
import { brand } from "@/lib/content/brand";
import { brandedDocumentTitle, createPageMetadata } from "@/lib/seo/metadata";

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
  const image = product.featuredImage;
  const description =
    product.seo.description ||
    seo.productDescriptionFallback(product.title, product.description.slice(0, 160));
  const title = product.seo.title || brandedDocumentTitle(product.title);
  return createPageMetadata({
    title,
    description,
    path: `/products/${handle}`,
    absoluteTitle: true,
    image: image
      ? {
          url: image.url,
          width: image.width ?? undefined,
          height: image.height ?? undefined,
          alt: image.altText || product.title,
        }
      : undefined,
  });
}

export async function generateStaticParams() {
  try {
    const { products } = await getProducts();
    return products.map((p) => ({ handle: p.handle }));
  } catch {
    return [];
  }
}

export default async function ProductPage({ params }: { params: Params }) {
  const { handle } = await params;
  const product = await getProductByHandle(handle).catch(() => null);
  if (!product) notFound();

  const related = await getProductRecommendations(product.id);
  const { product: productCopy } = siteCopy;

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
            brand: { "@type": "Brand", name: product.vendor || brand.name },
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
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: productFaq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
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
            {productCopy.fromPrice} {formatMoney(product.priceRange.minVariantPrice)}
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
          {productFaq.map((item) => (
            <details
              key={item.question}
              className="rounded-xl border border-ocean/10 bg-foam/40 px-4 py-3"
            >
              <summary className="cursor-pointer font-medium text-ocean">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-driftwood">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-ocean/10 bg-foam/50 p-5">
        <p className="text-sm text-driftwood">
          Want brewing help?{" "}
          <Link href="/brew-guides" className="text-ocean underline">
            Explore brew guides
          </Link>{" "}
          or{" "}
          <Link href="/journal" className="text-ocean underline">
            read the coffee journal
          </Link>
          .
        </p>
      </section>

      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-display text-3xl text-ocean">{productCopy.relatedHeading}</h2>
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
