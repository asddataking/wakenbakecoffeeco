import type { MetadataRoute } from "next";
import { brewGuides } from "@/lib/content/brew-guides";
import { articles } from "@/lib/content/articles";
import { absoluteUrl } from "@/lib/utils/cn";
import { getCollections, getProducts } from "@/lib/shopify/client";

type SitemapEntry = MetadataRoute.Sitemap[number];

function staticEntry(
  path: string,
  priority: number,
  changeFrequency: SitemapEntry["changeFrequency"],
): SitemapEntry {
  return {
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    staticEntry("/", 1, "weekly"),
    staticEntry("/shop", 0.95, "daily"),
    staticEntry("/about", 0.8, "monthly"),
    staticEntry("/brew-guides", 0.8, "weekly"),
    staticEntry("/journal", 0.75, "weekly"),
    staticEntry("/wholesale", 0.7, "monthly"),
    staticEntry("/faq", 0.65, "monthly"),
    staticEntry("/contact", 0.65, "monthly"),
    staticEntry("/shipping-returns", 0.4, "yearly"),
    staticEntry("/privacy", 0.3, "yearly"),
    staticEntry("/terms", 0.3, "yearly"),
  ];

  const guideRoutes = brewGuides.map((guide) => ({
    url: absoluteUrl(`/brew-guides/${guide.slug}`),
    lastModified: new Date(guide.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const journalRoutes = articles.map((article) => ({
    url: absoluteUrl(`/journal/${article.slug}`),
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.65,
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
      priority: 0.85,
    }));
    collectionRoutes = collections.map((collection) => ({
      url: absoluteUrl(`/collections/${collection.handle}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));
  } catch {
    // Catalog unavailable — still publish static + content routes.
  }

  return [
    ...staticRoutes,
    ...collectionRoutes,
    ...productRoutes,
    ...guideRoutes,
    ...journalRoutes,
  ];
}
