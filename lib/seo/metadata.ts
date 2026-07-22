import type { Metadata } from "next";
import { brand } from "@/lib/content/brand";
import { absoluteUrl } from "@/lib/utils/cn";

export type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** When true, skips the root layout title template (use for already-branded titles). */
  absoluteTitle?: boolean;
  image?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  robots?: Metadata["robots"];
  type?: "website" | "article";
};

function shareImage() {
  return {
    url: brand.shareImage.src,
    width: brand.shareImage.width,
    height: brand.shareImage.height,
    alt: brand.shareImage.alt,
  };
}

/** Consistent title, description, canonical, Open Graph, and Twitter for a page. */
export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  image,
  robots,
  type = "website",
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image
    ? {
        url: image.url,
        width: image.width,
        height: image.height,
        alt: image.alt ?? title,
      }
    : shareImage();

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots,
    openGraph: {
      title,
      description,
      url,
      siteName: brand.name,
      locale: "en_US",
      type,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}

export function brandedDocumentTitle(pageTitle: string): string {
  return `${pageTitle} | ${brand.name}`;
}
