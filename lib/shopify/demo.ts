import type { Cart, Collection, Money, Product } from "./types";
import { filterCatalogProducts } from "./product-filters";

const usd = (amount: string): Money => ({ amount, currencyCode: "USD" });

const placeholder = (seed: string) =>
  `/placeholders/coffee-${seed}.svg`;

function makeVariant(
  productId: string,
  title: string,
  price: string,
  options: Array<{ name: string; value: string }>,
  available = true,
) {
  return {
    id: `gid://shopify/ProductVariant/demo-${productId}-${title.toLowerCase().replace(/\s+/g, "-")}`,
    title,
    availableForSale: available,
    currentlyNotInStock: !available,
    quantityAvailable: available ? 25 : 0,
    selectedOptions: options,
    price: usd(price),
    compareAtPrice: null,
    image: null,
    sku: `DEMO-${productId}`,
    sellingPlanAllocations: [] as Product["variants"][number]["sellingPlanAllocations"],
  };
}

export const DEMO_PRODUCTS: Product[] = [
  {
    id: "gid://shopify/Product/demo-sunrise-blend",
    handle: "sunrise-blend",
    title: "Sunrise Blend",
    description:
      "A smooth, approachable everyday coffee for porch mornings and tide-watch pour-overs. Demo product — connect Shopify to load real catalog data.",
    descriptionHtml:
      "<p>A smooth, approachable everyday coffee for porch mornings and tide-watch pour-overs.</p><p><em>Demo product for local development.</em></p>",
    availableForSale: true,
    vendor: "Wake N Bake Coffee Co.",
    productType: "Coffee",
    tags: ["smooth", "blend", "featured"],
    featuredImage: {
      url: placeholder("sunrise"),
      altText: "Sunrise Blend coffee bag placeholder",
      width: 800,
      height: 1000,
    },
    images: [
      {
        url: placeholder("sunrise"),
        altText: "Sunrise Blend coffee bag placeholder",
        width: 800,
        height: 1000,
      },
    ],
    priceRange: {
      minVariantPrice: usd("16.00"),
      maxVariantPrice: usd("42.00"),
    },
    compareAtPriceRange: {
      minVariantPrice: usd("0.0"),
      maxVariantPrice: usd("0.0"),
    },
    options: [
      { id: "opt-size", name: "Size", values: ["12 oz", "2 lb"] },
      { id: "opt-grind", name: "Grind", values: ["Whole Bean", "Ground"] },
    ],
    variants: [
      makeVariant("sunrise", "12 oz / Whole Bean", "16.00", [
        { name: "Size", value: "12 oz" },
        { name: "Grind", value: "Whole Bean" },
      ]),
      makeVariant("sunrise", "12 oz / Ground", "16.00", [
        { name: "Size", value: "12 oz" },
        { name: "Grind", value: "Ground" },
      ]),
      makeVariant("sunrise", "2 lb / Whole Bean", "42.00", [
        { name: "Size", value: "2 lb" },
        { name: "Grind", value: "Whole Bean" },
      ]),
      makeVariant("sunrise", "2 lb / Ground", "42.00", [
        { name: "Size", value: "2 lb" },
        { name: "Grind", value: "Ground" },
      ]),
    ],
    sellingPlanGroups: [],
    metafields: {
      roastLevel: "Medium",
      origin: "Multi-origin blend",
      tastingNotes: "Brown sugar, toasted almond, soft cocoa",
      processingMethod: "Washed",
      beanType: "Arabica",
      brewMethods: "Pour-over, drip, French press",
      body: "Medium",
      acidity: "Low-medium",
      bagSize: "12 oz / 2 lb",
    },
    seo: {
      title: "Sunrise Blend",
      description: "Smooth everyday coffee for easy mornings.",
    },
    updatedAt: "2026-07-01T12:00:00.000Z",
  },
  {
    id: "gid://shopify/Product/demo-harbor-dark",
    handle: "harbor-dark",
    title: "Harbor Dark",
    description:
      "Bold, low-acid dark roast for camp mugs and late-night watches. Demo product for development only.",
    descriptionHtml:
      "<p>Bold, low-acid dark roast for camp mugs and late-night watches.</p>",
    availableForSale: true,
    vendor: "Wake N Bake Coffee Co.",
    productType: "Coffee",
    tags: ["bold", "dark", "featured"],
    featuredImage: {
      url: placeholder("harbor"),
      altText: "Harbor Dark coffee bag placeholder",
      width: 800,
      height: 1000,
    },
    images: [
      {
        url: placeholder("harbor"),
        altText: "Harbor Dark coffee bag placeholder",
        width: 800,
        height: 1000,
      },
    ],
    priceRange: {
      minVariantPrice: usd("17.00"),
      maxVariantPrice: usd("17.00"),
    },
    compareAtPriceRange: {
      minVariantPrice: usd("0.0"),
      maxVariantPrice: usd("0.0"),
    },
    options: [
      { id: "opt-grind-hd", name: "Grind", values: ["Whole Bean", "Ground"] },
    ],
    variants: [
      makeVariant("harbor", "Whole Bean", "17.00", [
        { name: "Grind", value: "Whole Bean" },
      ]),
      makeVariant("harbor", "Ground", "17.00", [{ name: "Grind", value: "Ground" }]),
    ],
    sellingPlanGroups: [],
    metafields: {
      roastLevel: "Dark",
      origin: "[CONFIRM origin in Shopify]",
      tastingNotes: "Dark chocolate, molasses, cedar",
      body: "Full",
      acidity: "Low",
      brewMethods: "French press, drip, espresso",
    },
    seo: { title: "Harbor Dark", description: "Bold dark roast coffee." },
    updatedAt: "2026-07-01T12:00:00.000Z",
  },
  {
    id: "gid://shopify/Product/demo-tide-line",
    handle: "tide-line",
    title: "Tide Line",
    description:
      "Bright, adventurous cup with citrus lift — for explorers and open-road mornings. Demo product.",
    descriptionHtml: "<p>Bright, adventurous cup with citrus lift.</p>",
    availableForSale: true,
    vendor: "Wake N Bake Coffee Co.",
    productType: "Coffee",
    tags: ["bright", "single-origin", "featured"],
    featuredImage: {
      url: placeholder("tideline"),
      altText: "Tide Line coffee bag placeholder",
      width: 800,
      height: 1000,
    },
    images: [
      {
        url: placeholder("tideline"),
        altText: "Tide Line coffee bag placeholder",
        width: 800,
        height: 1000,
      },
    ],
    priceRange: {
      minVariantPrice: usd("19.00"),
      maxVariantPrice: usd("19.00"),
    },
    compareAtPriceRange: {
      minVariantPrice: usd("0.0"),
      maxVariantPrice: usd("0.0"),
    },
    options: [
      { id: "opt-grind-tl", name: "Grind", values: ["Whole Bean", "Ground"] },
    ],
    variants: [
      makeVariant("tideline", "Whole Bean", "19.00", [
        { name: "Grind", value: "Whole Bean" },
      ]),
      makeVariant("tideline", "Ground", "19.00", [
        { name: "Grind", value: "Ground" },
      ]),
    ],
    sellingPlanGroups: [],
    metafields: {
      roastLevel: "Light-Medium",
      tastingNotes: "Citrus zest, honey, stone fruit",
      acidity: "Bright",
      body: "Light-medium",
      brewMethods: "Pour-over, AeroPress, drip",
    },
    seo: { title: "Tide Line", description: "Bright adventurous coffee." },
    updatedAt: "2026-07-01T12:00:00.000Z",
  },
  {
    id: "gid://shopify/Product/demo-moon-bay-decaf",
    handle: "moon-bay-decaf",
    title: "Moon Bay Decaf",
    description:
      "Laid-back decaf with full flavor for evening decks and early nights. Demo product.",
    descriptionHtml: "<p>Laid-back decaf with full flavor.</p>",
    availableForSale: true,
    vendor: "Wake N Bake Coffee Co.",
    productType: "Coffee",
    tags: ["decaf", "laid-back"],
    featuredImage: {
      url: placeholder("moonbay"),
      altText: "Moon Bay Decaf coffee bag placeholder",
      width: 800,
      height: 1000,
    },
    images: [
      {
        url: placeholder("moonbay"),
        altText: "Moon Bay Decaf coffee bag placeholder",
        width: 800,
        height: 1000,
      },
    ],
    priceRange: {
      minVariantPrice: usd("18.00"),
      maxVariantPrice: usd("18.00"),
    },
    compareAtPriceRange: {
      minVariantPrice: usd("0.0"),
      maxVariantPrice: usd("0.0"),
    },
    options: [
      { id: "opt-grind-mb", name: "Grind", values: ["Whole Bean", "Ground"] },
    ],
    variants: [
      makeVariant("moonbay", "Whole Bean", "18.00", [
        { name: "Grind", value: "Whole Bean" },
      ]),
      makeVariant("moonbay", "Ground", "18.00", [
        { name: "Grind", value: "Ground" },
      ]),
    ],
    sellingPlanGroups: [],
    metafields: {
      roastLevel: "Medium",
      beanType: "Decaf Arabica",
      tastingNotes: "Caramel, hazelnut, soft spice",
      brewMethods: "Drip, French press, pour-over",
    },
    seo: { title: "Moon Bay Decaf", description: "Full-flavor decaf coffee." },
    updatedAt: "2026-07-01T12:00:00.000Z",
  },
];

export const DEMO_COLLECTIONS: Collection[] = [
  {
    id: "gid://shopify/Collection/demo-featured",
    handle: "featured-coffee",
    title: "Featured Coffee",
    description: "Our current lineup for mornings by the water.",
    descriptionHtml: "<p>Our current lineup for mornings by the water.</p>",
    image: null,
    seo: { title: "Featured Coffee", description: "Featured Wake N Bake coffees." },
    products: DEMO_PRODUCTS.filter((p) => p.tags.includes("featured")),
  },
  {
    id: "gid://shopify/Collection/demo-all",
    handle: "all",
    title: "All Coffee",
    description: "Every bag currently available.",
    descriptionHtml: "<p>Every bag currently available.</p>",
    image: null,
    seo: { title: "All Coffee", description: "Shop all Wake N Bake coffee." },
    products: DEMO_PRODUCTS,
  },
];

export function createDemoCart(existing?: Cart | null): Cart {
  return (
    existing ?? {
      id: "gid://shopify/Cart/demo-cart",
      checkoutUrl: "/cart?demoCheckout=1",
      totalQuantity: 0,
      note: null,
      cost: {
        subtotalAmount: usd("0.0"),
        totalAmount: usd("0.0"),
        totalTaxAmount: null,
      },
      lines: [],
      discountCodes: [],
      buyerIdentity: { email: null, phone: null, countryCode: "US" },
    }
  );
}

export function filterDemoProducts(
  products: Product[],
  opts: {
    q?: string;
    roast?: string;
    type?: string;
    availability?: string;
    minPrice?: number;
    maxPrice?: number;
    subscription?: boolean;
  },
): Product[] {
  return filterCatalogProducts(products, {
    ...opts,
    availability:
      opts.availability === "in-stock" || opts.availability === "all"
        ? opts.availability
        : undefined,
  });
}
