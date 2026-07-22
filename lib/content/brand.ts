export const brand = {
  name: "Wake N’ Bake Coffee Co.",
  shortName: "Wake N’ Bake",
  supportingBrand: "Powered by DankNDevour",
  tagline: "Rise. Grind. Unwind.",
  headline: "Brew the good life.",
  supportingPhrase: "Premium small-batch coffee",
  lockup: {
    line1: "WAKE N’ BAKE",
    line2: "COFFEE CO.",
    line3: "RISE. GRIND. UNWIND.",
  },
  logoIsTemporary: false,
  logo: {
    src: "/brand/logo.webp",
    width: 1024,
    height: 1024,
    alt: "Wake N’ Bake Coffee Co. — Rise. Grind. Unwind.",
  },
  shareImage: {
    src: "/brand/social-share.jpg",
    width: 1024,
    height: 1024,
    alt: "Wake N’ Bake Coffee Co. — Rise. Grind. Unwind. Veteran-owned premium small-batch coffee rooted in the Bluewater area.",
  },
  description:
    "Veteran-owned premium small-batch coffee rooted in Michigan’s Bluewater area. Fresh coffee for slow mornings, road trips, campgrounds, and wherever the day takes you — powered by DankNDevour.",
  regionLabel: "Bluewater area — Port Huron, St. Clair, Lake Huron",
  email: "hello@wakenbakecoffeeco.com", // [CONFIRM SUPPORT EMAIL]
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
    href: "/shop",
    messages: [
      "Fresh coffee. Smooth sailing.",
      "Join the crew and catch our latest drops.",
      "Coffee for mornings that start whenever you do.",
      "Fresh roast headed your way. No compass required.",
    ],
  },
  currents: [
    {
      id: "smooth-easy",
      title: "Smooth & Easy",
      description:
        "For laid-back cups, easy sipping, and mornings that do not need any extra drama.",
      cta: "Keep It Mellow",
      tag: "smooth",
      href: "/shop?roast=light",
      image: "/placeholders/morning-smooth.svg",
      imageAlt: "Soft sunrise over calm water with a steaming coffee mug",
    },
    {
      id: "bold-dark",
      title: "Bold & Dark",
      description:
        "Deep, rich coffee for early starts, late nights, and serious mug situations.",
      cta: "Go Bold",
      tag: "bold",
      href: "/shop?roast=dark",
      image: "/placeholders/morning-bold.svg",
      imageAlt: "Deep harbor night with a bold dark roast coffee mug",
    },
    {
      id: "bright-adventurous",
      title: "Bright & Adventurous",
      description:
        "Lively flavor for curious people and mornings with somewhere to go.",
      cta: "Catch the Wave",
      tag: "bright",
      href: "/shop?roast=medium",
      image: "/placeholders/morning-bright.svg",
      imageAlt: "Bright coastal light and rolling waves with a coffee mug",
    },
    {
      id: "decaf-laid-back",
      title: "Decaf & Laid Back",
      description: "All the ritual. Less of the zooming through space part.",
      cta: "Stay Mellow",
      tag: "decaf",
      href: "/shop?q=decaf",
      image: "/placeholders/morning-decaf.svg",
      imageAlt: "Moonlit bay and a calm evening coffee mug",
    },
  ],
  dankNDevour: {
    eyebrow: "From the DankNDevour crew",
    title: "A new kind of daily ritual.",
    description:
      "You may already know Dan from honest reviews, questionable jokes, good food, road trips, and long conversations that occasionally wander into outer space. Wake N’ Bake Coffee Co. is the next part of that story: genuinely good coffee for the community that has been riding along from the beginning.",
    ctaLabel: "Read Our Story",
    ctaHref: "/about",
  },
  luna: {
    emptyCart: "Luna inspected the vibes. The cart still needs coffee.",
    notFound: "Luna is pretending she knows the way back.",
    about:
      "Luna is part of the visual identity and brand personality — a gentle supporting mascot who shows up in empty states, story moments, and the occasional illustration. Approved by Luna. Technically, she approves most snacks.",
  },
  navigation: {
    primary: [
      { label: "Shop", href: "/shop" },
      { label: "Best Sellers", href: "/shop?sort=featured" },
      { label: "Subscriptions", href: "/shop?subscription=true" },
      { label: "Brew Guides", href: "/brew-guides" },
      { label: "Our Story", href: "/about" },
    ],
    secondary: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Wholesale", href: "/wholesale" },
      { label: "Journal", href: "/journal" },
    ],
    footer: [
      {
        title: "Shop",
        links: [
          { label: "All Coffee", href: "/shop" },
          { label: "Best Sellers", href: "/shop?sort=featured" },
          { label: "Subscriptions", href: "/shop?subscription=true" },
          { label: "Brew Guides", href: "/brew-guides" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Our Story", href: "/about" },
          { label: "Journal", href: "/journal" },
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
