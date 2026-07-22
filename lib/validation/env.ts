import { z } from "zod";

const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  VERCEL_ENV: z.enum(["development", "preview", "production"]).optional(),
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string().optional(),
  SHOPIFY_STOREFRONT_API_VERSION: z.string().default("2025-04"),
  GHL_LOCATION_ID: z.string().optional(),
  GHL_API_TOKEN: z.string().optional(),
  GHL_NEWSLETTER_TAG: z.string().default("WNBC - Newsletter"),
  GHL_CUSTOMER_TAG: z.string().default("Coffee Customer"),
  GHL_WEBHOOK_URL: z.string().optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().default("http://localhost:3000"),
  NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: z.string().optional(),
  NEXT_PUBLIC_SHOPIFY_CHECKOUT_DOMAIN: z.string().optional(),
  NEXT_PUBLIC_SHOPIFY_ACCOUNT_URL: z.string().optional(),
  NEXT_PUBLIC_GHL_CHAT_WIDGET_ID: z.string().optional(),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_META_PIXEL_ID: z.string().optional(),
});

export type ServerEnv = z.infer<typeof serverSchema>;
export type ClientEnv = z.infer<typeof clientSchema>;

function getServerEnv(): ServerEnv {
  const parsed = serverSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    SHOPIFY_STOREFRONT_API_VERSION: process.env.SHOPIFY_STOREFRONT_API_VERSION,
    GHL_LOCATION_ID: process.env.GHL_LOCATION_ID,
    GHL_API_TOKEN: process.env.GHL_API_TOKEN,
    GHL_NEWSLETTER_TAG: process.env.GHL_NEWSLETTER_TAG,
    GHL_CUSTOMER_TAG: process.env.GHL_CUSTOMER_TAG,
    GHL_WEBHOOK_URL: process.env.GHL_WEBHOOK_URL || undefined,
  });

  if (!parsed.success) {
    console.error("Invalid server environment:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid server environment variables");
  }

  return parsed.data;
}

function getClientEnv(): ClientEnv {
  const parsed = clientSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    NEXT_PUBLIC_SHOPIFY_CHECKOUT_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_CHECKOUT_DOMAIN,
    NEXT_PUBLIC_SHOPIFY_ACCOUNT_URL: process.env.NEXT_PUBLIC_SHOPIFY_ACCOUNT_URL,
    NEXT_PUBLIC_GHL_CHAT_WIDGET_ID: process.env.NEXT_PUBLIC_GHL_CHAT_WIDGET_ID,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  });

  if (!parsed.success) {
    console.error("Invalid client environment:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid public environment variables");
  }

  return parsed.data;
}

let cachedServer: ServerEnv | null = null;
let cachedClient: ClientEnv | null = null;

export function serverEnv(): ServerEnv {
  if (!cachedServer) cachedServer = getServerEnv();
  return cachedServer;
}

export function clientEnv(): ClientEnv {
  if (!cachedClient) cachedClient = getClientEnv();
  return cachedClient;
}

export function hasShopifyCredentials(): boolean {
  const env = serverEnv();
  const client = clientEnv();
  return (
    Boolean(client.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN) &&
    client.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN !== "your-store.myshopify.com" &&
    Boolean(env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) &&
    env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!.length > 0
  );
}

function isProductionRuntime(): boolean {
  const env = serverEnv();
  return env.NODE_ENV === "production" && env.VERCEL_ENV === "production";
}

/**
 * Demo mode when Shopify credentials are missing outside true production runtime.
 * Preview/local production builds may use mocks; live production never silently demos.
 */
export function isDemoMode(): boolean {
  if (hasShopifyCredentials()) return false;
  if (isProductionRuntime()) return false;
  return true;
}

export function assertShopifyConfiguredInProduction(): void {
  if (!isProductionRuntime()) return;
  if (!hasShopifyCredentials()) {
    throw new Error(
      "Shopify Storefront credentials are required in production. Demo mode is disabled.",
    );
  }
}

/** Test helper to clear cached env between cases. */
export function resetEnvCache(): void {
  cachedServer = null;
  cachedClient = null;
}
