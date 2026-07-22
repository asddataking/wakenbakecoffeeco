import {
  assertShopifyConfiguredInProduction,
  clientEnv,
  isDemoMode,
  serverEnv,
} from "@/lib/validation/env";
import {
  createDemoCart,
  DEMO_COLLECTIONS,
  DEMO_PRODUCTS,
  filterDemoProducts,
} from "./demo";
import {
  CART_BUYER_IDENTITY_UPDATE,
  CART_CREATE,
  CART_DISCOUNT_CODES_UPDATE,
  CART_LINES_ADD,
  CART_LINES_REMOVE,
  CART_LINES_UPDATE,
} from "./mutations";
import {
  normalizeCart,
  normalizeCollection,
  normalizeProduct,
} from "./normalize";
import {
  GET_CART,
  GET_COLLECTION_BY_HANDLE,
  GET_COLLECTIONS,
  GET_MENU,
  GET_PRODUCT_BY_HANDLE,
  GET_PRODUCT_RECOMMENDATIONS,
  GET_PRODUCTS,
  GET_SHOP,
} from "./queries";
import type {
  Cart,
  Collection,
  Product,
  ProductConnection,
  ProductSortKey,
  ShopFilters,
} from "./types";
import { ShopifyError } from "./types";

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string; extensions?: { code?: string } }>;
};

const PAGE_SIZE = 24;

function domainHost(): string {
  const domain = clientEnv().NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "";
  return domain.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function endpoint(): string {
  const version = serverEnv().SHOPIFY_STOREFRONT_API_VERSION || "2025-04";
  return `https://${domainHost()}/api/${version}/graphql.json`;
}

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  cache: RequestCache = "force-cache",
): Promise<T> {
  assertShopifyConfiguredInProduction();

  if (isDemoMode()) {
    throw new ShopifyError("DEMO_MODE", "Shopify request attempted in demo mode");
  }

  const token = serverEnv().SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!token || !domainHost()) {
    throw new ShopifyError(
      "INVALID_CREDENTIALS",
      "Shopify Storefront credentials are missing",
    );
  }

  let response: Response;
  try {
    response = await fetch(endpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query, variables }),
      cache,
      next: cache === "no-store" ? undefined : { revalidate: 60 },
    });
  } catch {
    throw new ShopifyError("NETWORK", "Unable to reach Shopify Storefront API");
  }

  if (response.status === 401 || response.status === 403) {
    throw new ShopifyError(
      "INVALID_CREDENTIALS",
      "Shopify Storefront credentials were rejected",
      response.status,
    );
  }
  if (response.status === 429) {
    throw new ShopifyError("RATE_LIMITED", "Shopify rate limit exceeded", 429);
  }
  if (!response.ok) {
    throw new ShopifyError(
      "API_ERROR",
      `Shopify API error (${response.status})`,
      response.status,
    );
  }

  const json = (await response.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    const message = json.errors.map((e) => e.message).join("; ");
    if (/throttl|rate/i.test(message)) {
      throw new ShopifyError("RATE_LIMITED", message, 429);
    }
    throw new ShopifyError("API_ERROR", message);
  }

  if (!json.data) {
    throw new ShopifyError("API_ERROR", "Empty Shopify response");
  }

  return json.data;
}

function sortKeyFromFilters(sort?: ShopFilters["sort"]): {
  sortKey: ProductSortKey;
  reverse: boolean;
} {
  switch (sort) {
    case "price-asc":
      return { sortKey: "PRICE", reverse: false };
    case "price-desc":
      return { sortKey: "PRICE", reverse: true };
    case "title-asc":
      return { sortKey: "TITLE", reverse: false };
    case "title-desc":
      return { sortKey: "TITLE", reverse: true };
    case "newest":
      return { sortKey: "CREATED", reverse: true };
    default:
      return { sortKey: "BEST_SELLING", reverse: false };
  }
}

function buildProductQuery(filters: ShopFilters): string {
  const parts: string[] = ["available_for_sale:true"];
  if (filters.q) parts.push(filters.q);
  if (filters.roast) parts.push(`tag:${filters.roast}`);
  if (filters.type) parts.push(`tag:${filters.type}`);
  if (filters.minPrice != null) parts.push(`variants.price:>=${filters.minPrice}`);
  if (filters.maxPrice != null) parts.push(`variants.price:<=${filters.maxPrice}`);
  if (filters.subscription) parts.push("selling_plan_group:*");
  return parts.join(" ");
}

function sortDemoProducts(products: Product[], sort?: ShopFilters["sort"]): Product[] {
  const copy = [...products];
  switch (sort) {
    case "price-asc":
      return copy.sort(
        (a, b) =>
          Number(a.priceRange.minVariantPrice.amount) -
          Number(b.priceRange.minVariantPrice.amount),
      );
    case "price-desc":
      return copy.sort(
        (a, b) =>
          Number(b.priceRange.minVariantPrice.amount) -
          Number(a.priceRange.minVariantPrice.amount),
      );
    case "title-asc":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return copy.sort((a, b) => b.title.localeCompare(a.title));
    case "newest":
      return copy.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    default:
      return copy;
  }
}

export async function getShopInfo() {
  if (isDemoMode()) {
    return {
      name: "Wake N Bake Coffee Co. (Demo)",
      description: "Local demo catalog — connect Shopify for live products.",
      primaryDomain: { url: clientEnv().NEXT_PUBLIC_SITE_URL },
    };
  }
  const data = await shopifyFetch<{ shop: Record<string, unknown> }>(GET_SHOP);
  return data.shop;
}

export async function getMenu(handle: string) {
  if (isDemoMode()) return null;
  try {
    const data = await shopifyFetch<{
      menu: {
        items: Array<{ id: string; title: string; url: string; items?: unknown[] }>;
      } | null;
    }>(GET_MENU, { handle });
    return data.menu;
  } catch {
    return null;
  }
}

export async function getProducts(filters: ShopFilters = {}): Promise<ProductConnection> {
  if (isDemoMode()) {
    const filtered = sortDemoProducts(
      filterDemoProducts(DEMO_PRODUCTS, filters),
      filters.sort,
    );
    return {
      products: filtered,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null,
      },
    };
  }

  const { sortKey, reverse } = sortKeyFromFilters(filters.sort);
  const data = await shopifyFetch<{
    products: {
      nodes: unknown[];
      pageInfo: ProductConnection["pageInfo"];
    };
  }>(
    GET_PRODUCTS,
    {
      first: PAGE_SIZE,
      after: filters.cursor ?? null,
      query: buildProductQuery(filters),
      sortKey,
      reverse,
    },
    "no-store",
  );

  let products = data.products.nodes.map((node) =>
    normalizeProduct(node as Parameters<typeof normalizeProduct>[0]),
  );

  if (filters.availability === "in-stock") {
    products = products.filter((p) => p.availableForSale);
  }

  return { products, pageInfo: data.products.pageInfo };
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  if (isDemoMode()) {
    return DEMO_PRODUCTS.find((p) => p.handle === handle) ?? null;
  }

  const data = await shopifyFetch<{ product: unknown | null }>(
    GET_PRODUCT_BY_HANDLE,
    { handle },
    "no-store",
  );
  if (!data.product) return null;
  return normalizeProduct(data.product as Parameters<typeof normalizeProduct>[0]);
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  if (isDemoMode()) {
    return DEMO_PRODUCTS.filter((p) => p.id !== productId).slice(0, 4);
  }
  try {
    const data = await shopifyFetch<{ productRecommendations: unknown[] | null }>(
      GET_PRODUCT_RECOMMENDATIONS,
      { productId },
    );
    return (data.productRecommendations ?? []).map((node) =>
      normalizeProduct(node as Parameters<typeof normalizeProduct>[0]),
    );
  } catch {
    return [];
  }
}

export async function getCollections(): Promise<Collection[]> {
  if (isDemoMode()) return DEMO_COLLECTIONS;
  const data = await shopifyFetch<{
    collections: { nodes: Array<Parameters<typeof normalizeCollection>[0]> };
  }>(GET_COLLECTIONS, { first: 50 });
  return data.collections.nodes.map((node) => normalizeCollection(node, []));
}

export async function getCollectionByHandle(
  handle: string,
  filters: ShopFilters = {},
): Promise<{ collection: Collection; pageInfo: ProductConnection["pageInfo"] } | null> {
  if (isDemoMode()) {
    const collection =
      DEMO_COLLECTIONS.find((c) => c.handle === handle) ??
      ({
        ...DEMO_COLLECTIONS[1],
        handle,
        title: handle,
        products: DEMO_PRODUCTS,
      } satisfies Collection);
    const products = sortDemoProducts(
      filterDemoProducts(collection.products, filters),
      filters.sort,
    );
    return {
      collection: { ...collection, products },
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null,
      },
    };
  }

  const { sortKey, reverse } = sortKeyFromFilters(filters.sort);
  const collectionSortKey =
    sortKey === "BEST_SELLING"
      ? "BEST_SELLING"
      : sortKey === "PRICE"
        ? "PRICE"
        : sortKey === "TITLE"
          ? "TITLE"
          : sortKey === "CREATED"
            ? "CREATED"
            : "COLLECTION_DEFAULT";

  const data = await shopifyFetch<{
    collection: (Parameters<typeof normalizeCollection>[0] & {
      products: { nodes: unknown[]; pageInfo: ProductConnection["pageInfo"] };
    }) | null;
  }>(
    GET_COLLECTION_BY_HANDLE,
    {
      handle,
      first: PAGE_SIZE,
      after: filters.cursor ?? null,
      sortKey: collectionSortKey,
      reverse,
      filters: [],
    },
    "no-store",
  );

  if (!data.collection) return null;
  const products = data.collection.products.nodes.map((node) =>
    normalizeProduct(node as Parameters<typeof normalizeProduct>[0]),
  );
  return {
    collection: normalizeCollection(data.collection, products),
    pageInfo: data.collection.products.pageInfo,
  };
}

type UserError = { field?: string[] | null; message: string; code?: string };

function assertNoUserErrors(userErrors: UserError[] | undefined, fallback: string) {
  if (userErrors?.length) {
    const message = userErrors.map((e) => e.message).join("; ");
    if (/not found|expired/i.test(message)) {
      throw new ShopifyError("CART_EXPIRED", message);
    }
    if (/sold out|unavailable/i.test(message)) {
      throw new ShopifyError("SOLD_OUT", message);
    }
    throw new ShopifyError("API_ERROR", message || fallback);
  }
}

export async function createCart(lines: unknown[] = []): Promise<Cart> {
  if (isDemoMode()) return createDemoCart();

  const data = await shopifyFetch<{
    cartCreate: { cart: Parameters<typeof normalizeCart>[0] | null; userErrors: UserError[] };
  }>(CART_CREATE, { input: { lines } }, "no-store");
  assertNoUserErrors(data.cartCreate.userErrors, "Unable to create cart");
  if (!data.cartCreate.cart) {
    throw new ShopifyError("API_ERROR", "Cart create returned empty cart");
  }
  return normalizeCart(data.cartCreate.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  if (isDemoMode()) return createDemoCart();
  try {
    const data = await shopifyFetch<{ cart: Parameters<typeof normalizeCart>[0] | null }>(
      GET_CART,
      { cartId },
      "no-store",
    );
    return data.cart ? normalizeCart(data.cart) : null;
  } catch (error) {
    if (error instanceof ShopifyError && error.code === "CART_EXPIRED") return null;
    throw error;
  }
}

export async function addCartLines(
  cartId: string,
  lines: Array<{
    merchandiseId: string;
    quantity: number;
    sellingPlanId?: string;
    attributes?: Array<{ key: string; value: string }>;
  }>,
): Promise<Cart> {
  if (isDemoMode()) {
    const cart = createDemoCart();
    // Demo carts do not persist line items across requests; redirect messaging handles this.
    return { ...cart, totalQuantity: lines.reduce((sum, l) => sum + l.quantity, 0) };
  }

  const data = await shopifyFetch<{
    cartLinesAdd: { cart: Parameters<typeof normalizeCart>[0] | null; userErrors: UserError[] };
  }>(CART_LINES_ADD, { cartId, lines }, "no-store");
  assertNoUserErrors(data.cartLinesAdd.userErrors, "Unable to add to cart");
  if (!data.cartLinesAdd.cart) throw new ShopifyError("API_ERROR", "Empty cart after add");
  return normalizeCart(data.cartLinesAdd.cart);
}

export async function updateCartLines(
  cartId: string,
  lines: Array<{ id: string; quantity: number; sellingPlanId?: string | null }>,
): Promise<Cart> {
  if (isDemoMode()) return createDemoCart();
  const data = await shopifyFetch<{
    cartLinesUpdate: {
      cart: Parameters<typeof normalizeCart>[0] | null;
      userErrors: UserError[];
    };
  }>(CART_LINES_UPDATE, { cartId, lines }, "no-store");
  assertNoUserErrors(data.cartLinesUpdate.userErrors, "Unable to update cart");
  if (!data.cartLinesUpdate.cart) {
    throw new ShopifyError("API_ERROR", "Empty cart after update");
  }
  return normalizeCart(data.cartLinesUpdate.cart);
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<Cart> {
  if (isDemoMode()) return createDemoCart();
  const data = await shopifyFetch<{
    cartLinesRemove: {
      cart: Parameters<typeof normalizeCart>[0] | null;
      userErrors: UserError[];
    };
  }>(CART_LINES_REMOVE, { cartId, lineIds }, "no-store");
  assertNoUserErrors(data.cartLinesRemove.userErrors, "Unable to remove cart lines");
  if (!data.cartLinesRemove.cart) {
    throw new ShopifyError("API_ERROR", "Empty cart after remove");
  }
  return normalizeCart(data.cartLinesRemove.cart);
}

export async function updateCartDiscountCodes(
  cartId: string,
  discountCodes: string[],
): Promise<Cart> {
  if (isDemoMode()) {
    const cart = createDemoCart();
    return {
      ...cart,
      discountCodes: discountCodes.map((code) => ({ code, applicable: false })),
    };
  }
  const data = await shopifyFetch<{
    cartDiscountCodesUpdate: {
      cart: Parameters<typeof normalizeCart>[0] | null;
      userErrors: UserError[];
    };
  }>(CART_DISCOUNT_CODES_UPDATE, { cartId, discountCodes }, "no-store");
  assertNoUserErrors(data.cartDiscountCodesUpdate.userErrors, "Unable to apply discount");
  if (!data.cartDiscountCodesUpdate.cart) {
    throw new ShopifyError("API_ERROR", "Empty cart after discount update");
  }
  return normalizeCart(data.cartDiscountCodesUpdate.cart);
}

export async function updateCartBuyerIdentity(
  cartId: string,
  buyerIdentity: { email?: string; phone?: string; countryCode?: string },
): Promise<Cart> {
  if (isDemoMode()) return createDemoCart();
  const data = await shopifyFetch<{
    cartBuyerIdentityUpdate: {
      cart: Parameters<typeof normalizeCart>[0] | null;
      userErrors: UserError[];
    };
  }>(CART_BUYER_IDENTITY_UPDATE, { cartId, buyerIdentity }, "no-store");
  assertNoUserErrors(
    data.cartBuyerIdentityUpdate.userErrors,
    "Unable to update buyer identity",
  );
  if (!data.cartBuyerIdentityUpdate.cart) {
    throw new ShopifyError("API_ERROR", "Empty cart after buyer identity update");
  }
  return normalizeCart(data.cartBuyerIdentityUpdate.cart);
}

export function getCheckoutUrl(cart: Cart): string {
  if (!cart.checkoutUrl) {
    throw new ShopifyError("CHECKOUT_FAILED", "Checkout URL is missing");
  }
  if (isDemoMode()) {
    return "/cart?demoCheckout=1";
  }
  return cart.checkoutUrl;
}

export { isDemoMode, PAGE_SIZE };
