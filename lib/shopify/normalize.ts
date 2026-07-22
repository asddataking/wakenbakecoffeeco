import type {
  Cart,
  CoffeeMetafields,
  Collection,
  Image,
  Money,
  Product,
  ProductVariant,
  SellingPlan,
  SellingPlanGroup,
} from "./types";

type MetafieldNode = { value?: string | null } | null | undefined;

type RawProduct = {
  id: string;
  handle: string;
  title: string;
  description?: string;
  descriptionHtml?: string;
  availableForSale?: boolean;
  vendor?: string;
  productType?: string;
  tags?: string[];
  updatedAt?: string;
  featuredImage?: Image | null;
  images?: { nodes?: Image[] } | Image[];
  priceRange?: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  compareAtPriceRange?: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  options?: Array<{ id: string; name: string; values: string[] }>;
  variants?: { nodes?: RawVariant[] } | RawVariant[];
  sellingPlanGroups?: { nodes?: RawSellingPlanGroup[] } | RawSellingPlanGroup[];
  seo?: { title: string | null; description: string | null };
  roastLevel?: MetafieldNode;
  origin?: MetafieldNode;
  tastingNotes?: MetafieldNode;
  processingMethod?: MetafieldNode;
  altitude?: MetafieldNode;
  beanType?: MetafieldNode;
  brewMethods?: MetafieldNode;
  body?: MetafieldNode;
  acidity?: MetafieldNode;
  bagSize?: MetafieldNode;
  roastSchedule?: MetafieldNode;
  shippingNote?: MetafieldNode;
};

type RawVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  currentlyNotInStock?: boolean;
  quantityAvailable?: number | null;
  sku?: string | null;
  selectedOptions: Array<{ name: string; value: string }>;
  price: Money;
  compareAtPrice?: Money | null;
  image?: Image | null;
  sellingPlanAllocations?: {
    nodes?: Array<{
      sellingPlan: SellingPlan;
      priceAdjustments: Array<{
        price: Money;
        compareAtPrice?: Money | null;
      }>;
    }>;
  };
  product?: {
    id: string;
    handle: string;
    title: string;
    featuredImage?: Image | null;
  };
};

type RawSellingPlanGroup = {
  name: string;
  appName?: string | null;
  sellingPlans?: { nodes?: SellingPlan[] } | SellingPlan[];
};

function nodes<T>(value: { nodes?: T[] } | T[] | undefined | null): T[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value.nodes ?? [];
}

function metafieldValue(node: MetafieldNode): string | undefined {
  const value = node?.value?.trim();
  return value ? value : undefined;
}

export function normalizeMetafields(raw: RawProduct): CoffeeMetafields {
  const metafields: CoffeeMetafields = {};
  const roastLevel = metafieldValue(raw.roastLevel);
  const origin = metafieldValue(raw.origin);
  const tastingNotes = metafieldValue(raw.tastingNotes);
  const processingMethod = metafieldValue(raw.processingMethod);
  const altitude = metafieldValue(raw.altitude);
  const beanType = metafieldValue(raw.beanType);
  const brewMethods = metafieldValue(raw.brewMethods);
  const body = metafieldValue(raw.body);
  const acidity = metafieldValue(raw.acidity);
  const bagSize = metafieldValue(raw.bagSize);
  const roastSchedule = metafieldValue(raw.roastSchedule);
  const shippingNote = metafieldValue(raw.shippingNote);

  if (roastLevel) metafields.roastLevel = roastLevel;
  if (origin) metafields.origin = origin;
  if (tastingNotes) metafields.tastingNotes = tastingNotes;
  if (processingMethod) metafields.processingMethod = processingMethod;
  if (altitude) metafields.altitude = altitude;
  if (beanType) metafields.beanType = beanType;
  if (brewMethods) metafields.brewMethods = brewMethods;
  if (body) metafields.body = body;
  if (acidity) metafields.acidity = acidity;
  if (bagSize) metafields.bagSize = bagSize;
  if (roastSchedule) metafields.roastSchedule = roastSchedule;
  if (shippingNote) metafields.shippingNote = shippingNote;

  return metafields;
}

export function normalizeVariant(raw: RawVariant): ProductVariant {
  return {
    id: raw.id,
    title: raw.title,
    availableForSale: raw.availableForSale,
    currentlyNotInStock: Boolean(raw.currentlyNotInStock),
    quantityAvailable: raw.quantityAvailable ?? null,
    selectedOptions: raw.selectedOptions,
    price: raw.price,
    compareAtPrice: raw.compareAtPrice ?? null,
    image: raw.image ?? null,
    sku: raw.sku ?? null,
    sellingPlanAllocations: nodes(raw.sellingPlanAllocations).map((allocation) => ({
      sellingPlan: allocation.sellingPlan,
      priceAdjustments: allocation.priceAdjustments,
    })),
  };
}

export function normalizeSellingPlanGroups(
  raw: RawProduct["sellingPlanGroups"],
): SellingPlanGroup[] {
  return nodes(raw).map((group) => ({
    name: group.name,
    appName: group.appName ?? null,
    sellingPlans: nodes(group.sellingPlans),
  }));
}

export function normalizeProduct(raw: RawProduct): Product {
  const zero: Money = { amount: "0.0", currencyCode: "USD" };
  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    description: raw.description ?? "",
    descriptionHtml: raw.descriptionHtml ?? "",
    availableForSale: Boolean(raw.availableForSale),
    vendor: raw.vendor ?? "",
    productType: raw.productType ?? "",
    tags: raw.tags ?? [],
    featuredImage: raw.featuredImage ?? null,
    images: nodes(raw.images),
    priceRange: raw.priceRange ?? {
      minVariantPrice: zero,
      maxVariantPrice: zero,
    },
    compareAtPriceRange: raw.compareAtPriceRange ?? {
      minVariantPrice: zero,
      maxVariantPrice: zero,
    },
    options: raw.options ?? [],
    variants: nodes(raw.variants).map(normalizeVariant),
    sellingPlanGroups: normalizeSellingPlanGroups(raw.sellingPlanGroups),
    metafields: normalizeMetafields(raw),
    seo: raw.seo ?? { title: null, description: null },
    updatedAt: raw.updatedAt ?? new Date().toISOString(),
  };
}

export function normalizeCollection(
  raw: {
    id: string;
    handle: string;
    title: string;
    description?: string;
    descriptionHtml?: string;
    image?: Image | null;
    seo?: { title: string | null; description: string | null };
    products?: { nodes?: RawProduct[]; pageInfo?: unknown } | RawProduct[];
  },
  productsOverride?: Product[],
): Collection {
  const products = productsOverride ?? nodes(raw.products).map(normalizeProduct);
  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    description: raw.description ?? "",
    descriptionHtml: raw.descriptionHtml ?? "",
    image: raw.image ?? null,
    seo: raw.seo ?? { title: null, description: null },
    products,
    productsCount: products.length,
  };
}

export function normalizeCart(raw: {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  note?: string | null;
  cost: Cart["cost"];
  discountCodes?: Cart["discountCodes"];
  buyerIdentity?: Cart["buyerIdentity"];
  lines?: {
    nodes?: Array<{
      id: string;
      quantity: number;
      attributes?: Array<{ key: string; value: string }>;
      cost: Cart["lines"][number]["cost"];
      sellingPlanAllocation?: Cart["lines"][number]["sellingPlanAllocation"];
      merchandise: RawVariant & {
        product: {
          id: string;
          handle: string;
          title: string;
          featuredImage?: Image | null;
        };
      };
    }>;
  };
}): Cart {
  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    totalQuantity: raw.totalQuantity,
    note: raw.note ?? null,
    cost: raw.cost,
    discountCodes: raw.discountCodes ?? [],
    buyerIdentity: raw.buyerIdentity ?? {
      email: null,
      phone: null,
      countryCode: null,
    },
    lines: nodes(raw.lines).map((line) => ({
      id: line.id,
      quantity: line.quantity,
      attributes: line.attributes ?? [],
      cost: line.cost,
      sellingPlanAllocation: line.sellingPlanAllocation ?? null,
      merchandise: {
        ...normalizeVariant(line.merchandise),
        product: {
          id: line.merchandise.product.id,
          handle: line.merchandise.product.handle,
          title: line.merchandise.product.title,
          featuredImage: line.merchandise.product.featuredImage ?? null,
        },
      },
    })),
  };
}

export function formatMoney(money: Money, locale = "en-US"): string {
  const amount = Number.parseFloat(money.amount);
  if (Number.isNaN(amount)) return money.amount;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: money.currencyCode || "USD",
  }).format(amount);
}

export function buildCartLineInput(input: {
  merchandiseId: string;
  quantity: number;
  sellingPlanId?: string;
  attributes?: Array<{ key: string; value: string }>;
}) {
  if (input.quantity < 1) {
    throw new Error("Quantity must be at least 1");
  }
  return {
    merchandiseId: input.merchandiseId,
    quantity: input.quantity,
    ...(input.sellingPlanId ? { sellingPlanId: input.sellingPlanId } : {}),
    ...(input.attributes?.length ? { attributes: input.attributes } : {}),
  };
}

export function selectVariant(
  product: Product,
  selected: Record<string, string>,
): ProductVariant | undefined {
  return product.variants.find((variant) =>
    variant.selectedOptions.every((option) => selected[option.name] === option.value),
  );
}

export function defaultSelectedOptions(product: Product): Record<string, string> {
  const available =
    product.variants.find((variant) => variant.availableForSale) ?? product.variants[0];
  if (!available) return {};
  return Object.fromEntries(
    available.selectedOptions.map((option) => [option.name, option.value]),
  );
}
