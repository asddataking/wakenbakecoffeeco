import { brand } from "./brand";

export const aboutContent = {
  eyebrow: "How we got here",
  headline: "Coffee, community, and taking the scenic route.",
  opening: [
    "Wake N’ Bake Coffee Co. grew out of DankNDevour, Dan’s Smoke Review, a love of good coffee, and the belief that daily routines should feel a little less routine.",
    "The brand is built for people who wake up early, stay up late, travel, create, camp, stream, laugh, overthink things, and occasionally forget where they set their mug.",
    "The goal is simple: offer coffee that tastes good, feels approachable, and gives the community something worth gathering around.",
  ],
  sections: [
    {
      id: "dankndevour",
      heading: "The DankNDevour connection",
      body: [
        "If you already know DankNDevour, you know the vibe: honest reviews, questionable jokes, good food, road trips, and conversations that occasionally wander into outer space.",
        "Wake N’ Bake Coffee Co. is the coffee chapter of that story. Same community energy. Same sense of humor. A daily ritual you can actually brew.",
      ],
    },
    {
      id: "why-coffee",
      heading: "Why coffee",
      body: [
        "Coffee shows up for the quiet mornings, the content sessions, the campground sunrises, and the nights that stretch a little longer than planned.",
        "We wanted a brand that respected the cup itself — fresh coffee, clear product language, and no pressure to perform for the algorithm before your first sip.",
        "Some mornings need motivation. Others just need twelve quiet minutes and a really good cup.",
      ],
    },
    {
      id: "coastal",
      heading: "Coastal energy, modern storefront",
      body: [
        "The look and feel lean beach-town coffee shack rebuilt as a modern online brand: open, nautical, a little sun-faded, and never in a hurry.",
        "Think drinking coffee near the water, watching a sunrise from a campsite, cruising with the windows down, and hanging out with friends who get it.",
      ],
    },
    {
      id: "community",
      heading: "Built around the crew",
      body: [
        "This brand exists because of the people who have been riding along from the beginning — DankNDevour viewers, Dan’s Smoke Review followers, campers, creators, gamers, beach and lake lovers, and anyone tired of corporate coffee marketing.",
        "Join the crew for drops, brew tips, and the occasional thought that probably started over coffee.",
      ],
    },
    {
      id: "honest-language",
      heading: "Honest product language",
      body: [
        "We sell coffee. Product names, roast levels, tasting notes, weights, and fulfillment details come from Shopify — not invented marketing fiction.",
        "The name Wake N’ Bake nods to a laid-back lifestyle and DankNDevour roots. The coffee itself does not contain cannabis or THC unless a future product explicitly states otherwise.",
      ],
    },
    {
      id: "fulfillment",
      heading: "How the coffee gets to you",
      body: [
        "Orders are sold through Shopify and fulfilled with Dripshipper partners. That keeps roasting and shipping specialized while we focus on community, education, and a storefront that feels like the brand.",
        "[CONFIRM ROASTING AND FULFILLMENT LANGUAGE WITH DRIPSHIPPER]",
        "[CONFIRM SHIPPING WINDOW]",
      ],
    },
    {
      id: "luna",
      heading: "And then there’s Luna",
      body: [
        brand.luna.about,
        "She is not a coffee critic. She is just part of the crew.",
      ],
    },
    {
      id: "powered-by",
      heading: "What “Powered by DankNDevour” means",
      body: [
        "Powered by DankNDevour means this coffee brand comes from the same media community, humor, and relationship with the audience that started it all.",
        "It does not mean the coffee is cannabis. It means the brand stays connected to the crew that made room for something new.",
      ],
    },
  ],
  closing: "Wherever you’re headed, bring good coffee.",
  ctaLabel: "Find Your Roast",
  ctaHref: "/shop",
} as const;
