import type { MetadataRoute } from "next";
import { brewGuides } from "@/lib/content/brew-guides";
import { absoluteUrl } from "@/lib/utils/cn";
import { getCollections, getProducts, isDemoMode } from "@/lib/shopify/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/shop",
    "/about",
    "/contact",
    "/faq",
    "/brew-guides",
    "/wholesale",
    "/privacy",
    "/terms",
    "/shipping-returns",
  ].map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const guideRoutes = brewGuides.map((guide) => ({
    url: absoluteUrl(`/brew-guides/${guide.slug}`),
    lastModified: new Date(guide.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  let productRoutes: MetadataRoute.Sitemap = [];
  let collectionRoutes: MetadataRoute.Sitemap = [];

  try {
    const [{ products }, collections] = await Promise.all([
      getProducts(),
      getCollections(),
    ]);
    productRoutes = products.map((product) => ({
      url: absoluteUrl(`/products/${product.handle}`),
      lastModified: new Date(product.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
    collectionRoutes = collections.map((collection) => ({
      url: absoluteUrl(`/collections/${collection.handle}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    if (isDemoMode()) {
      // demo products still helpful for local sitemap previews
    }
  }

  return [...staticRoutes, ...guideRoutes, ...collectionRoutes, ...productRoutes];
}
