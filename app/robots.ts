import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils/cn";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/cart"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
