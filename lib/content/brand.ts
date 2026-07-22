export const brand = {
  name: "Wake N Bake Coffee Co.",
  shortName: "Wake N Bake",
  tagline: "Brew the good life.",
  lockup: {
    line1: "WAKE N BAKE",
    line2: "COFFEE CO.",
    line3: "BREW THE GOOD LIFE",
  },
  /** Temporary wordmark until final brand assets are delivered. */
  logoIsTemporary: true,
  description:
    "Beach-inspired specialty coffee for mornings by the water, campfire evenings, and everything in between. Roasted for people who wake up ready to brew the good life.",
  email: "hello@wakenbakecoffeeco.com", // [CONFIRM email]
  phone: "", // [CONFIRM phone]
  address: {
    line1: "[CONFIRM street address]",
    city: "[CONFIRM city]",
    region: "[CONFIRM state]",
    postal: "[CONFIRM ZIP]",
    country: "US",
  },
  social: {
    instagram: "https://instagram.com/[CONFIRM]",
    youtube: "https://youtube.com/[CONFIRM]",
    tiktok: "https://tiktok.com/[CONFIRM]",
  },
  announcement: {
    enabled: true,
    message: "Fresh coffee for slow mornings and open roads — subscribe & save when plans go live.",
    href: "/shop",
  },
  currents: [
    {
      id: "smooth-easy",
      title: "Smooth & Easy",
      description: "Mellow cups for sunrise pour-overs and easy mornings.",
      tag: "smooth",
      href: "/shop?roast=light&q=smooth",
    },
    {
      id: "bold-dark",
      title: "Bold & Dark",
      description: "Deep, robust roasts for campfire mugs and late watches.",
      tag: "bold",
      href: "/shop?roast=dark&q=bold",
    },
    {
      id: "bright-adventurous",
      title: "Bright & Adventurous",
      description: "Lively acidity and origin character for curious palates.",
      tag: "bright",
      href: "/shop?roast=medium&q=bright",
    },
    {
      id: "decaf-laid-back",
      title: "Decaf & Laid Back",
      description: "Full flavor without the buzz — evenings by the tide.",
      tag: "decaf",
      href: "/shop?type=decaf",
    },
  ],
  dankNDevour: {
    title: "Born from DankNDevour",
    description:
      "Wake N Bake Coffee Co. grew out of the DankNDevour community — people who value good coffee, open air, and living well. Same crew energy. Now in a bag.",
    ctaLabel: "Shop the collection",
    ctaHref: "/shop",
  },
  navigation: {
    primary: [
      { label: "Shop", href: "/shop" },
      { label: "Brew Guides", href: "/brew-guides" },
      { label: "About", href: "/about" },
      { label: "Wholesale", href: "/wholesale" },
      { label: "Contact", href: "/contact" },
    ],
    footer: [
      {
        title: "Shop",
        links: [
          { label: "All Coffee", href: "/shop" },
          { label: "Subscriptions", href: "/shop?subscription=true" },
          { label: "Brew Guides", href: "/brew-guides" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Wholesale", href: "/wholesale" },
          { label: "FAQ", href: "/faq" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Policies",
        links: [
          { label: "Shipping & Returns", href: "/shipping-returns" },
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
        ],
      },
    ],
  },
} as const;

export type BrandConfig = typeof brand;
