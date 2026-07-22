import { describe, expect, it } from "vitest";
import { formatMoney, buildCartLineInput, selectVariant, defaultSelectedOptions, normalizeProduct, normalizeMetafields } from "@/lib/shopify/normalize";
import { DEMO_PRODUCTS, filterDemoProducts } from "@/lib/shopify/demo";
import { extractUtm } from "@/lib/utils/utm";
import { newsletterSchema, contactSchema } from "@/lib/validation/forms";
import { buildGhlContactPayload, GHL_TAGS } from "@/lib/ghl/client";
import { isDemoMode, resetEnvCache, hasShopifyCredentials } from "@/lib/validation/env";
import { sanitizeAnalyticsPayload } from "@/lib/analytics/events";

describe("formatMoney", () => {
  it("formats USD amounts", () => {
    expect(formatMoney({ amount: "16.00", currencyCode: "USD" })).toBe("$16.00");
  });

  it("handles invalid amounts safely", () => {
    expect(formatMoney({ amount: "nope", currencyCode: "USD" })).toBe("nope");
  });
});

describe("Shopify normalization", () => {
  it("normalizes metafields and omits empties", () => {
    const metafields = normalizeMetafields({
      id: "1",
      handle: "x",
      title: "x",
      roastLevel: { value: "Medium" },
      origin: { value: "  " },
      tastingNotes: { value: "Cocoa" },
    });
    expect(metafields).toEqual({ roastLevel: "Medium", tastingNotes: "Cocoa" });
  });

  it("normalizes product variants list", () => {
    const product = normalizeProduct({
      id: "gid://shopify/Product/1",
      handle: "test",
      title: "Test",
      availableForSale: true,
      variants: {
        nodes: [
          {
            id: "v1",
            title: "Default",
            availableForSale: true,
            selectedOptions: [{ name: "Title", value: "Default" }],
            price: { amount: "10.00", currencyCode: "USD" },
          },
        ],
      },
    });
    expect(product.variants).toHaveLength(1);
    expect(product.handle).toBe("test");
  });
});

describe("variant selection", () => {
  it("selects matching variant and defaults to available", () => {
    const product = DEMO_PRODUCTS[0];
    const selected = defaultSelectedOptions(product);
    const variant = selectVariant(product, selected);
    expect(variant?.availableForSale).toBe(true);
    expect(selectVariant(product, { Size: "12 oz", Grind: "Ground" })?.title).toContain(
      "Ground",
    );
  });
});

describe("cart line construction", () => {
  it("builds line input with optional selling plan", () => {
    expect(
      buildCartLineInput({
        merchandiseId: "gid://shopify/ProductVariant/1",
        quantity: 2,
        sellingPlanId: "gid://shopify/SellingPlan/1",
      }),
    ).toEqual({
      merchandiseId: "gid://shopify/ProductVariant/1",
      quantity: 2,
      sellingPlanId: "gid://shopify/SellingPlan/1",
    });
  });

  it("rejects invalid quantity", () => {
    expect(() =>
      buildCartLineInput({ merchandiseId: "x", quantity: 0 }),
    ).toThrow(/Quantity/);
  });
});

describe("form validation", () => {
  it("requires newsletter email consent", () => {
    const result = newsletterSchema.safeParse({
      name: "Alex",
      email: "alex@example.com",
      emailConsent: false,
      smsConsent: false,
    });
    expect(result.success).toBe(false);
  });

  it("accepts valid contact payloads", () => {
    const result = contactSchema.safeParse({
      name: "Alex",
      email: "alex@example.com",
      message: "I have a question about roast levels.",
      emailConsent: true,
      smsConsent: false,
    });
    expect(result.success).toBe(true);
  });
});

describe("UTM extraction", () => {
  it("reads utm params from URLSearchParams", () => {
    const params = new URLSearchParams(
      "utm_source=dnd&utm_medium=yt&utm_campaign=launch&foo=1",
    );
    expect(extractUtm(params)).toEqual({
      utm_source: "dnd",
      utm_medium: "yt",
      utm_campaign: "launch",
    });
  });
});

describe("demo mode", () => {
  it("filters demo catalog", () => {
    const decaf = filterDemoProducts(DEMO_PRODUCTS, { type: "decaf" });
    expect(decaf.every((p) => p.handle.includes("decaf") || p.tags.includes("decaf"))).toBe(
      true,
    );
  });

  it("enables demo when credentials are missing outside production runtime", () => {
    resetEnvCache();
    delete process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
    delete process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    delete process.env.VERCEL_ENV;
    resetEnvCache();
    expect(hasShopifyCredentials()).toBe(false);
    expect(isDemoMode()).toBe(true);
  });
});

describe("GHL payload", () => {
  it("builds contact payload with tags and consent fields", () => {
    const payload = buildGhlContactPayload({
      name: "Alex Rivera",
      email: "alex@example.com",
      phone: "",
      emailConsent: true,
      smsConsent: false,
      source: "newsletter",
      landingPage: "http://localhost:3000",
      timestamp: "2026-07-22T12:00:00.000Z",
    });
    expect(payload.firstName).toBe("Alex");
    expect(payload.lastName).toBe("Rivera");
    expect(payload.tags).toContain(GHL_TAGS.dankNDevour);
    expect(payload.customFields.find((f) => f.key === "email_consent")?.field_value).toBe(
      "yes",
    );
    expect(payload.customFields.find((f) => f.key === "sms_consent")?.field_value).toBe(
      "no",
    );
  });
});

describe("analytics sanitize", () => {
  it("keeps commerce fields", () => {
    expect(
      sanitizeAnalyticsPayload({
        currency: "USD",
        value: 16,
        items: [{ item_id: "1", item_name: "Sunrise" }],
      }),
    ).toMatchObject({ currency: "USD", value: 16 });
  });
});
