export type BrewGuide = {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  heroMotif: "pour-over" | "french-press" | "camp";
  publishedAt: string;
  sections: Array<{ heading: string; body: string[] }>;
  tips: string[];
};

export const brewGuides: BrewGuide[] = [
  {
    slug: "sunrise-pour-over",
    title: "Sunrise Pour-Over",
    excerpt:
      "A calm, clear cup for mornings when the horizon is still pink and the day is wide open.",
    readTime: "6 min",
    heroMotif: "pour-over",
    publishedAt: "2026-06-01",
    sections: [
      {
        heading: "What you need",
        body: [
          "Freshly roasted whole-bean coffee, a conical dripper, paper filter, gooseneck kettle, scale, and a mug you like holding.",
          "Start with a medium grind — like coarse sand — and adjust after the first brew.",
        ],
      },
      {
        heading: "Ratio & water",
        body: [
          "Use 1 gram of coffee to 16 grams of water (about 20g coffee to 320g water for a single mug).",
          "Heat water to roughly 200°F / 93°C. If you do not have a thermometer, bring to a boil and wait 30–45 seconds.",
        ],
      },
      {
        heading: "Brew steps",
        body: [
          "Rinse the paper filter with hot water and discard the rinse water.",
          "Add coffee, tare your scale, and bloom with twice the coffee weight in water (40g for 20g coffee). Wait 30–45 seconds.",
          "Pour in slow spirals to reach your final weight by about 2:30–3:00. Total brew time should land near 3:00–3:30.",
          "Swirl gently, let it drain, and taste before you reach for sugar. Note what you want more of next time — sweetness, clarity, or body.",
        ],
      },
    ],
    tips: [
      "Grind finer if the cup tastes thin; coarser if it tastes harsh or bitter.",
      "Weigh both coffee and water — consistency beats guessing on the road or at camp.",
    ],
  },
  {
    slug: "camp-french-press",
    title: "Camp French Press",
    excerpt:
      "A rugged, full-bodied brew that travels well — picnic tables, trailheads, and rental kitchens included.",
    readTime: "5 min",
    heroMotif: "french-press",
    publishedAt: "2026-06-08",
    sections: [
      {
        heading: "Gear that survives the trip",
        body: [
          "A durable French press, a kettle or pot you can boil water in, a hand grinder if you can pack one, and a timer on your phone.",
          "If you only have pre-ground coffee, choose a coarse grind labeled for French press and use it within a week of opening.",
        ],
      },
      {
        heading: "Ratio",
        body: [
          "Aim for 1:15 — 30g coffee to 450g water for two camp mugs, or scale to your press size.",
          "Coarse grind, like sea salt, keeps sediment down and extraction even.",
        ],
      },
      {
        heading: "Method",
        body: [
          "Preheat the press with hot water, then discard.",
          "Add coffee, start the timer, and pour all the water at once. Stir once to wet the grounds.",
          "Place the lid on without pressing. Steep 4 minutes.",
          "Press slowly and steadily. Pour immediately so the coffee does not keep extracting on the grounds.",
        ],
      },
    ],
    tips: [
      "Decant into a thermos if you are not drinking right away.",
      "A bold or dark roast stands up well to camp milk and cooler air.",
    ],
  },
  {
    slug: "tidewatch-drip",
    title: "Tidewatch Batch Drip",
    excerpt:
      "Set-and-forget drip for house guests, beach weekends, and slow Sunday spreads.",
    readTime: "4 min",
    heroMotif: "camp",
    publishedAt: "2026-06-15",
    sections: [
      {
        heading: "Why batch drip still matters",
        body: [
          "When you are hosting or packing a cooler, a clean automatic drip pot keeps everyone caffeinated without tending a kettle.",
          "Fresh beans and a clean machine matter more than boutique accessories.",
        ],
      },
      {
        heading: "Setup",
        body: [
          "Use a medium grind. Start around 1:16 — 60g coffee to 960g water for a full pot, then adjust to taste.",
          "Filtered water makes a bigger difference than most gadgets.",
        ],
      },
      {
        heading: "Brew & serve",
        body: [
          "Rinse the filter, add coffee, fill the reservoir, and start the brew.",
          "When the cycle finishes, remove the basket so leftover drips do not bitter the pot.",
          "Serve within 30–45 minutes, or move coffee to a thermal carafe.",
        ],
      },
    ],
    tips: [
      "Label grind and ratio on a piece of tape inside your travel bin so anyone can brew.",
      "Smooth blends shine here; save your brightest single origins for pour-over.",
    ],
  },
];

export function getBrewGuide(slug: string): BrewGuide | undefined {
  return brewGuides.find((guide) => guide.slug === slug);
}
