import { brand } from "./brand";

export const seo = {
  home: {
    title: "Wake N’ Bake Coffee Co. | Brew the Good Life",
    description:
      "Shop coffee for slow mornings, big ideas, road trips, campgrounds, and wherever the day takes you. Wake N’ Bake Coffee Co. is powered by DankNDevour.",
  },
  shop: {
    title: "Shop Coffee",
    description:
      "Explore coffee for every kind of morning, from smooth and mellow to bold and adventurous. Find your roast at Wake N’ Bake Coffee Co.",
  },
  subscriptions: {
    title: "Coffee Subscriptions",
    description:
      "Keep your cup full with recurring coffee delivery from Wake N’ Bake Coffee Co. Available plans and savings vary by roast.",
  },
  brewGuides: {
    title: "Coffee Brew Guides",
    description:
      "Learn how to brew better coffee with straightforward guides for drip coffee, French press, grind size, coffee ratios, camping, and more.",
  },
  about: {
    title: "Our Story",
    description:
      "Meet the laid-back coffee brand powered by DankNDevour and built around good coffee, community, adventure, and taking the scenic route.",
  },
  faq: {
    title: "FAQ",
    description:
      "Answers about coffee, checkout, shipping, subscriptions, and the Wake N’ Bake Coffee Co. lifestyle — including whether the coffee contains cannabis or THC.",
  },
  contact: {
    title: "Contact",
    description:
      "Questions, ideas, wholesale inquiries, or something wonderfully random? Send a message to Wake N’ Bake Coffee Co.",
  },
  wholesale: {
    title: "Wholesale",
    description:
      "Wholesale coffee inquiries for cafes, shops, markets, and hospitality partners. Wake N’ Bake Coffee Co. — powered by DankNDevour.",
  },
  journal: {
    title: "Coffee Journal",
    description:
      "Brew tips, coffee basics, camp coffee, road-trip kits, and behind-the-brand stories from Wake N’ Bake Coffee Co.",
  },
  cart: {
    title: "Your Cart",
    description: "Review your Wake N’ Bake Coffee Co. cart before heading to secure Shopify checkout.",
  },
  productTitleTemplate: (productTitle: string) =>
    `${productTitle} | ${brand.shortName}`,
  productDescriptionFallback: (productTitle: string, excerpt: string) =>
    excerpt ||
    `Shop ${productTitle} from Wake N’ Bake Coffee Co. Fresh coffee for mornings, road trips, and wherever the day takes you.`,
  collectionTitleTemplate: (collectionTitle: string) =>
    `${collectionTitle} | ${brand.shortName}`,
  keywords: {
    commercial: [
      "coffee delivered to your home",
      "fresh coffee online",
      "coffee subscription",
      "small-batch coffee",
      "coffee for camping",
      "coffee for road trips",
      "coffee gifts",
      "dark roast coffee",
      "medium roast coffee",
      "light roast coffee",
      "flavored coffee",
      "whole bean coffee",
      "ground coffee",
    ],
    lifestyle: [
      "beach-inspired coffee brand",
      "nautical coffee brand",
      "coastal lifestyle coffee",
      "coffee for creators",
      "coffee for gamers",
      "coffee for outdoor adventures",
      "morning coffee ritual",
    ],
    educational: [
      "how to brew drip coffee",
      "French press coffee guide",
      "coffee-to-water ratio",
      "best coffee grind size",
      "how to store coffee",
      "whole bean versus ground coffee",
      "light roast versus dark roast",
      "how much coffee per cup",
      "coffee for camping",
      "how to make coffee while traveling",
    ],
  },
} as const;
