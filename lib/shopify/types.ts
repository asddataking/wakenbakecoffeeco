export type Money = {
  amount: string;
  currencyCode: string;
};

export type Image = {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
};

export type SEO = {
  title: string | null;
  description: string | null;
};

export type CoffeeMetafields = {
  roastLevel?: string;
  origin?: string;
  tastingNotes?: string;
  processingMethod?: string;
  altitude?: string;
  beanType?: string;
  brewMethods?: string;
  body?: string;
  acidity?: string;
  bagSize?: string;
  roastSchedule?: string;
  shippingNote?: string;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type SelectedOption = {
  name: string;
  value: string;
};

export type SellingPlanAllocation = {
  sellingPlan: SellingPlan;
  priceAdjustments: Array<{
    price: Money;
    compareAtPrice?: Money | null;
  }>;
};

export type SellingPlan = {
  id: string;
  name: string;
  description: string | null;
  options: Array<{ name: string; value: string }>;
  priceAdjustments: Array<{
    adjustmentValue:
      | { __typename: "SellingPlanPercentagePriceAdjustment"; adjustmentPercentage: number }
      | { __typename: "SellingPlanFixedAmountPriceAdjustment"; adjustmentAmount: Money }
      | { __typename: "SellingPlanFixedPriceAdjustment"; price: Money };
  }>;
};

export type SellingPlanGroup = {
  name: string;
  appName: string | null;
  sellingPlans: SellingPlan[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  currentlyNotInStock: boolean;
  quantityAvailable?: number | null;
  selectedOptions: SelectedOption[];
  price: Money;
  compareAtPrice: Money | null;
  image: Image | null;
  sku: string | null;
  sellingPlanAllocations: SellingPlanAllocation[];
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  vendor: string;
  productType: string;
  tags: string[];
  featuredImage: Image | null;
  images: Image[];
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  compareAtPriceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  options: ProductOption[];
  variants: ProductVariant[];
  sellingPlanGroups: SellingPlanGroup[];
  metafields: CoffeeMetafields;
  seo: SEO;
  updatedAt: string;
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  image: Image | null;
  seo: SEO;
  products: Product[];
  productsCount?: number;
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: ProductVariant & {
    product: Pick<Product, "id" | "handle" | "title" | "featuredImage">;
  };
  sellingPlanAllocation?: SellingPlanAllocation | null;
  cost: {
    totalAmount: Money;
    amountPerQuantity: Money;
    compareAtAmountPerQuantity?: Money | null;
  };
  attributes: Array<{ key: string; value: string }>;
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  note: string | null;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money | null;
  };
  lines: CartLine[];
  discountCodes: Array<{ code: string; applicable: boolean }>;
  buyerIdentity: {
    email: string | null;
    phone: string | null;
    countryCode: string | null;
  };
};

export type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
};

export type ProductConnection = {
  products: Product[];
  pageInfo: PageInfo;
};

export type ShopifyErrorCode =
  | "INVALID_CREDENTIALS"
  | "NOT_FOUND"
  | "UNAVAILABLE"
  | "SOLD_OUT"
  | "CART_EXPIRED"
  | "CHECKOUT_FAILED"
  | "RATE_LIMITED"
  | "NETWORK"
  | "API_ERROR"
  | "DEMO_MODE";

export class ShopifyError extends Error {
  code: ShopifyErrorCode;
  status?: number;

  constructor(code: ShopifyErrorCode, message: string, status?: number) {
    super(message);
    this.name = "ShopifyError";
    this.code = code;
    this.status = status;
  }
}

export type ProductSortKey =
  | "TITLE"
  | "PRICE"
  | "BEST_SELLING"
  | "CREATED"
  | "RELEVANCE";

export type ShopFilters = {
  q?: string;
  sort?: "featured" | "price-asc" | "price-desc" | "title-asc" | "title-desc" | "newest";
  availability?: "in-stock" | "all";
  roast?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  subscription?: boolean;
  collection?: string;
  cursor?: string;
  page?: number;
};
