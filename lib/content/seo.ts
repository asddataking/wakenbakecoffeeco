import { brand } from "./brand";

export const seo = {
  home: {
    title: "Wake N’ Bake Coffee Co. | Rise. Grind. Unwind.",
    description:
      "Veteran-owned premium small-batch coffee rooted in Michigan’s Bluewater area. Shop fresh roasts for slow mornings, road trips, and wherever the day takes you — powered by DankNDevour.",
  },
  shop: {
    title: "Shop Coffee",
    description:
      "Browse premium small-batch coffee from Wake N’ Bake Coffee Co. Smooth, bold, bright, and decaf options for every kind of morning — shipped to your door.",
  },
  subscriptions: {
    title: "Coffee Subscriptions",
    description:
      "Keep your cup full with recurring coffee delivery from Wake N’ Bake Coffee Co. Available plans and savings vary by roast.",
  },
  brewGuides: {
    title: "Coffee Brew Guides",
    description:
      "Straightforward brew guides for drip, pour-over, French press, grind size, ratios, camping coffee, and more from Wake N’ Bake Coffee Co.",
  },
  about: {
    title: "Our Story",
    description:
      "Wake N’ Bake Coffee Co. is a veteran-owned, Bluewater-rooted coffee brand powered by DankNDevour — built around good coffee, community, and taking the scenic route.",
  },
  faq: {
    title: "FAQ",
    description:
      "Answers about our coffee, checkout, shipping, subscriptions, and lifestyle — including whether Wake N’ Bake coffee contains cannabis or THC.",
  },
  contact: {
    title: "Contact",
    description:
      "Questions, wholesale inquiries, or something wonderfully random? Reach Wake N’ Bake Coffee Co. — veteran-owned coffee from Michigan’s Bluewater area.",
  },
  wholesale: {
    title: "Wholesale Coffee",
    description:
      "Wholesale inquiries for cafes, shops, markets, and hospitality partners. Premium small-batch coffee from Wake N’ Bake Coffee Co.",
  },
  journal: {
    title: "Coffee Journal",
    description:
      "Brew tips, coffee basics, camp coffee, road-trip kits, and behind-the-brand stories from Wake N’ Bake Coffee Co.",
  },
  cart: {
    title: "Your Cart",
    description:
      "Review your Wake N’ Bake Coffee Co. cart before heading to secure Shopify checkout.",
  },
  shippingReturns: {
    title: "Shipping & Returns",
    description:
      "Shipping, delivery expectations, and return information for Wake N’ Bake Coffee Co. orders.",
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "How Wake N’ Bake Coffee Co. collects, uses, and protects personal information on our coffee storefront.",
  },
  terms: {
    title: "Terms of Service",
    description:
      "Terms of use for the Wake N’ Bake Coffee Co. website and online coffee shop.",
  },
  productTitleTemplate: (productTitle: string) =>
    `${productTitle} | ${brand.name}`,
  productDescriptionFallback: (productTitle: string, excerpt: string) =>
    excerpt ||
    `Shop ${productTitle} from Wake N’ Bake Coffee Co. Veteran-owned premium small-batch coffee, shipped to your door.`,
  collectionTitleTemplate: (collectionTitle: string) =>
    `${collectionTitle} | ${brand.name}`,
  keywords: [
    "Wake N’ Bake Coffee Co",
    "veteran owned coffee",
    "small batch coffee",
    "Bluewater coffee",
    "Michigan coffee",
    "coffee subscription",
    "fresh coffee online",
    "whole bean coffee",
    "ground coffee",
    "dark roast coffee",
    "medium roast coffee",
    "light roast coffee",
    "camping coffee",
    "DankNDevour",
  ],
} as const;
