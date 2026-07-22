import type { NextConfig } from "next";
import path from "path";

const shopifyDomain =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, "") ??
  "*.myshopify.com";
const checkoutDomain =
  process.env.NEXT_PUBLIC_SHOPIFY_CHECKOUT_DOMAIN?.replace(/^https?:\/\//, "") ??
  shopifyDomain;

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://connect.facebook.net https://*.gohighlevel.com https://*.leadconnectorhq.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https://cdn.shopify.com https://*.myshopify.com https://www.facebook.com https://www.googletagmanager.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      `connect-src 'self' https://${shopifyDomain} https://${checkoutDomain} https://cdn.shopify.com https://www.google-analytics.com https://www.googletagmanager.com https://connect.facebook.net https://*.gohighlevel.com https://*.leadconnectorhq.com`,
      `frame-src 'self' https://${checkoutDomain} https://*.gohighlevel.com https://*.leadconnectorhq.com`,
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://*.myshopify.com",
      "frame-ancestors 'none'",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;
