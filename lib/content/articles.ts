export type ArticleCategory =
  | "Brew Better"
  | "Coffee Basics"
  | "Camp Coffee"
  | "Road Trip Coffee"
  | "Behind the Brand"
  | "DankNDevour"
  | "Coffee Culture";

export type Article = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  category: ArticleCategory;
  excerpt: string;
  readTime: string;
  publishedAt: string;
  answerUpFront: string;
  introduction: string[];
  sections: Array<{ heading: string; body: string[] }>;
  faq: Array<{ question: string; answer: string }>;
  productLinkPrompt: string;
  relatedSlugs: string[];
  internalLinks: Array<{ label: string; href: string }>;
};

export const articleCategories: ArticleCategory[] = [
  "Brew Better",
  "Coffee Basics",
  "Camp Coffee",
  "Road Trip Coffee",
  "Behind the Brand",
  "DankNDevour",
  "Coffee Culture",
];

export const articles: Article[] = [
  {
    slug: "better-drip-coffee-at-home",
    title: "How to Make Better Drip Coffee at Home",
    seoTitle: "How to Make Better Drip Coffee at Home | Wake N’ Bake",
    metaDescription:
      "A clear drip coffee guide covering grind, ratio, water, and machine habits so your everyday pot tastes fresher and less bitter.",
    category: "Brew Better",
    excerpt:
      "A cleaner pot starts with fresh coffee, a sensible ratio, and a machine that is not full of old oils.",
    readTime: "8 min",
    publishedAt: "2026-07-01",
    answerUpFront:
      "Use fresh coffee, a medium grind, about 1:16 coffee to water, filtered water near brew temperature, and clean your machine regularly.",
    introduction: [
      "Drip coffee gets underestimated because it feels ordinary. That is also why it matters. Most mornings do not need a chemistry set. They need a pot that tastes like someone cared.",
      "You could overthink your coffee. Or you could dial in a few basics and see where the morning goes.",
    ],
    sections: [
      {
        heading: "Start with coffee that still has a pulse",
        body: [
          "Fresh coffee makes the biggest difference. Whole bean usually stays fresher longer than pre-ground. If you buy ground coffee, open it when you need it and store it sealed away from heat and sunlight.",
          "If your bag has been open for weeks and tastes flat, that is not a personality flaw. That is stale coffee telling on itself.",
        ],
      },
      {
        heading: "Use a ratio you can remember",
        body: [
          "A reliable everyday starting point is 1 gram of coffee to 16 grams of water. For a full pot, that might look like 60g coffee to about 960g water.",
          "If the cup tastes weak, use a little more coffee. If it tastes harsh, grind coarser or use slightly less coffee. Small changes beat dramatic swings.",
        ],
      },
      {
        heading: "Grind and water matter more than gadgets",
        body: [
          "Medium grind works for most automatic drip machines. Too fine can taste bitter and clog filters. Too coarse can taste thin and hollow.",
          "Filtered water helps more than most accessories. Coffee is mostly water, which technically makes this hydration. We’re pretty sure.",
        ],
      },
      {
        heading: "Keep the machine honest",
        body: [
          "Rinse the filter. Add coffee. Brew. When the cycle finishes, remove the basket so leftover drips do not keep extracting into the pot.",
          "Descale and clean on a real schedule. Old oils make new coffee taste like old coffee. Nobody wants that energy.",
        ],
      },
    ],
    faq: [
      {
        question: "How much coffee for a 12-cup pot?",
        answer:
          "It depends on your machine’s cup size, but a solid start is about 60–70 grams of coffee for a full household pot. Adjust to taste.",
      },
      {
        question: "Should I use paper or permanent filters?",
        answer:
          "Paper filters usually taste cleaner. Permanent filters can give more body and more sediment. Use what you like and keep it clean.",
      },
    ],
    productLinkPrompt: "Find a roast that fits your everyday drip ritual.",
    relatedSlugs: [
      "coffee-to-water-ratio",
      "whole-bean-vs-ground",
      "why-coffee-tastes-bitter",
    ],
    internalLinks: [
      { label: "Shop coffee", href: "/shop" },
      { label: "Brew guides", href: "/brew-guides" },
      { label: "Coffee-to-water ratio", href: "/journal/coffee-to-water-ratio" },
    ],
  },
  {
    slug: "french-press-without-grit",
    title: "French Press Coffee Without the Grit",
    seoTitle: "French Press Coffee Without the Grit | Wake N’ Bake",
    metaDescription:
      "Learn how to brew French press coffee with less sludge using grind size, steep time, and a slow press.",
    category: "Brew Better",
    excerpt:
      "Coarse grind, a four-minute steep, and a patient press keep French press rich without the sandy finish.",
    readTime: "7 min",
    publishedAt: "2026-07-02",
    answerUpFront:
      "Use a coarse grind, about 1:15 coffee to water, steep four minutes, press slowly, and pour soon after pressing.",
    introduction: [
      "French press is full-bodied, forgiving, and excellent for camping or lazy weekends. The grit problem usually comes from grinding too fine or pressing too hard.",
      "This guide keeps the ritual simple and the cup cleaner.",
    ],
    sections: [
      {
        heading: "Dial the grind first",
        body: [
          "Aim for a coarse grind that looks like sea salt. Fine grounds slip through the screen and keep extracting after you press.",
          "If you only have pre-ground coffee labeled for French press, use it sooner rather than later.",
        ],
      },
      {
        heading: "Ratio and steep",
        body: [
          "Start around 1:15 — for example, 30g coffee to 450g water for two mugs.",
          "Preheat the press, add coffee, pour all the water, stir once, and steep with the lid on for four minutes without pressing.",
        ],
      },
      {
        heading: "Press like you mean it, slowly",
        body: [
          "Press steadily. If it feels jammed, your grind is probably too fine.",
          "Pour soon after pressing so the coffee does not sit on the grounds and turn muddy.",
        ],
      },
    ],
    faq: [
      {
        question: "Why is my French press muddy?",
        answer:
          "Usually the grind is too fine, the steep ran too long, or the coffee sat in the press after pressing. Coarsen the grind and decant after brewing.",
      },
      {
        question: "Can I make French press at camp?",
        answer:
          "Yes. A durable press, hot water, and a coarse grind travel well. See our camp coffee guide for packing tips.",
      },
    ],
    productLinkPrompt: "Bold and dark roasts stand up especially well in a press.",
    relatedSlugs: [
      "camp-coffee-guide",
      "coffee-to-water-ratio",
      "how-much-coffee-per-cup",
    ],
    internalLinks: [
      { label: "Camp French Press guide", href: "/brew-guides/camp-french-press" },
      { label: "Shop bold coffee", href: "/shop?roast=dark" },
      { label: "Camp coffee article", href: "/journal/camp-coffee-guide" },
    ],
  },
  {
    slug: "coffee-to-water-ratio",
    title: "The Best Coffee-to-Water Ratio for Everyday Brewing",
    seoTitle: "Coffee-to-Water Ratio for Everyday Brewing | Wake N’ Bake",
    metaDescription:
      "Learn a simple coffee-to-water ratio for drip, pour-over, and French press, plus how to adjust strength without guessing.",
    category: "Coffee Basics",
    excerpt:
      "A memorable ratio beats vibes-based scooping. Start near 1:16 and adjust with intention.",
    readTime: "6 min",
    publishedAt: "2026-07-03",
    answerUpFront:
      "For everyday brewing, start with 1 gram of coffee to 16 grams of water. Go stronger toward 1:15 or milder toward 1:17.",
    introduction: [
      "Ratio is the quiet backbone of a good cup. Once you know your starting point, you can stop guessing and start tasting.",
      "The ocean has tides. You have emails. We all deal with stuff. At least your coffee ratio can be calm.",
    ],
    sections: [
      {
        heading: "The everyday starting point",
        body: [
          "1:16 works for drip and pour-over. That means 20g coffee to 320g water for a single mug, or scale up for a pot.",
          "French press often likes a little stronger, around 1:15, because immersion brewing extracts differently.",
        ],
      },
      {
        heading: "How to adjust without chaos",
        body: [
          "If the cup tastes watery, add coffee or grind slightly finer. If it tastes harsh, use less coffee or grind coarser.",
          "Change one variable at a time. Otherwise you will invent a mystery and then have to solve it before breakfast.",
        ],
      },
      {
        heading: "Scoops are approximate",
        body: [
          "A tablespoon is not a universal coffee unit. Bean density and grind change the volume. A cheap scale is the easiest upgrade most kitchens never make.",
        ],
      },
    ],
    faq: [
      {
        question: "Is golden ratio real?",
        answer:
          "Industry guides often land near 1:15 to 1:18. Use that range as a map, then trust your taste.",
      },
      {
        question: "Does roast level change the ratio?",
        answer:
          "Darker roasts can taste stronger at the same ratio because of roast character. Adjust to preference rather than forcing one rule forever.",
      },
    ],
    productLinkPrompt: "Once your ratio is dialed, the roast becomes the fun part.",
    relatedSlugs: [
      "how-much-coffee-per-cup",
      "better-drip-coffee-at-home",
      "why-coffee-tastes-bitter",
    ],
    internalLinks: [
      { label: "How much coffee per cup", href: "/journal/how-much-coffee-per-cup" },
      { label: "Drip coffee guide", href: "/journal/better-drip-coffee-at-home" },
      { label: "Shop coffee", href: "/shop" },
    ],
  },
  {
    slug: "whole-bean-vs-ground",
    title: "Whole Bean vs. Ground Coffee",
    seoTitle: "Whole Bean vs. Ground Coffee | Wake N’ Bake",
    metaDescription:
      "Compare whole bean and ground coffee for freshness, convenience, grind control, and everyday brewing.",
    category: "Coffee Basics",
    excerpt:
      "Whole bean usually tastes fresher longer. Ground coffee wins on convenience. Here’s how to choose without drama.",
    readTime: "6 min",
    publishedAt: "2026-07-04",
    answerUpFront:
      "Buy whole bean when you can grind close to brew time. Choose ground coffee when convenience matters more than peak freshness.",
    introduction: [
      "This is less of a purity contest and more of a lifestyle decision. Some mornings invite a grinder. Some mornings barely invite pants.",
    ],
    sections: [
      {
        heading: "Why whole bean stays fresher",
        body: [
          "Grinding dramatically increases surface area, so aroma and flavor fade faster. Whole beans protect themselves a little longer in a sealed bag.",
          "If you enjoy tasting differences between roasts, whole bean plus a simple grinder is worth it.",
        ],
      },
      {
        heading: "When ground coffee makes sense",
        body: [
          "Travel, camping backups, office pots, and gift setups can all benefit from ground coffee.",
          "Buy amounts you will finish soon, match the grind to your brew method, and seal the bag tightly.",
        ],
      },
      {
        heading: "Match grind to method",
        body: [
          "French press wants coarse. Drip wants medium. Espresso wants fine. Using the wrong grind is one of the fastest ways to make good coffee taste confused.",
        ],
      },
    ],
    faq: [
      {
        question: "How long does ground coffee stay good?",
        answer:
          "It depends on packaging and storage, but flavor usually fades faster than whole bean. Use it within days to a couple of weeks after opening for best results.",
      },
      {
        question: "Do I need an expensive grinder?",
        answer:
          "No. Consistency matters more than flex. A decent burr grinder beats a blade grinder for even extraction.",
      },
    ],
    productLinkPrompt: "Browse whole bean and ground options when variants are available.",
    relatedSlugs: [
      "how-to-store-coffee",
      "better-drip-coffee-at-home",
      "choose-a-coffee-roast",
    ],
    internalLinks: [
      { label: "How to store coffee", href: "/journal/how-to-store-coffee" },
      { label: "Shop coffee", href: "/shop" },
      { label: "Brew guides", href: "/brew-guides" },
    ],
  },
  {
    slug: "how-to-store-coffee",
    title: "How to Store Coffee and Keep It Fresh",
    seoTitle: "How to Store Coffee and Keep It Fresh | Wake N’ Bake",
    metaDescription:
      "Simple coffee storage tips: airtight containers, away from heat and light, and why the fridge is usually a bad idea.",
    category: "Coffee Basics",
    excerpt:
      "Air, heat, moisture, and light are the villains. Keep coffee sealed, cool, and boringly protected.",
    readTime: "5 min",
    publishedAt: "2026-07-05",
    answerUpFront:
      "Store coffee in an airtight container away from heat, light, and moisture. Skip the fridge. Buy amounts you will finish while it still tastes alive.",
    introduction: [
      "Coffee does not need a shrine. It needs a lid and a little respect.",
      "Your mug is empty. We’re not here to judge. We’re here to help the next bag last longer.",
    ],
    sections: [
      {
        heading: "The four things that ruin coffee",
        body: [
          "Oxygen, heat, moisture, and light fade aroma and flatten flavor. Countertops next to ovens and sunny windows are not great long-term homes.",
        ],
      },
      {
        heading: "Airtight is the move",
        body: [
          "Use the bag’s reseal if it is solid, or move coffee into an opaque airtight container. Keep whole beans whole until you brew.",
        ],
      },
      {
        heading: "About the fridge and freezer",
        body: [
          "The fridge often adds moisture and odor. Freezing can work for longer storage if coffee is sealed extremely well and portioned, but everyday bags are usually happier in a cool cupboard.",
        ],
      },
    ],
    faq: [
      {
        question: "Should I freeze coffee?",
        answer:
          "Only if you need longer storage and can keep it fully sealed. For weekly drinking, a cool pantry is simpler and usually better.",
      },
      {
        question: "Can I leave coffee in the original bag?",
        answer:
          "Yes if the bag reseals well. If it does not, transfer it.",
      },
    ],
    productLinkPrompt: "Fresh bags deserve a clean storage spot and a brew plan.",
    relatedSlugs: [
      "whole-bean-vs-ground",
      "why-coffee-tastes-bitter",
      "wake-n-bake-morning-ritual",
    ],
    internalLinks: [
      { label: "Whole bean vs ground", href: "/journal/whole-bean-vs-ground" },
      { label: "Shop coffee", href: "/shop" },
      { label: "Subscriptions", href: "/shop?subscription=true" },
    ],
  },
  {
    slug: "light-roast-vs-dark-roast",
    title: "Light Roast vs. Dark Roast",
    seoTitle: "Light Roast vs. Dark Roast Coffee | Wake N’ Bake",
    metaDescription:
      "Understand light, medium, and dark roast coffee differences in flavor, body, and brewing so you can choose with confidence.",
    category: "Coffee Basics",
    excerpt:
      "Light roasts keep more origin character. Dark roasts lean into deeper, roast-forward flavors. Medium lives in the middle.",
    readTime: "7 min",
    publishedAt: "2026-07-06",
    answerUpFront:
      "Choose light roast for brighter, more origin-driven cups; dark roast for deeper, roast-forward body; and medium when you want balance.",
    introduction: [
      "Roast level is not a moral ranking. It is a flavor direction. Find the one that matches the morning you are actually having.",
    ],
    sections: [
      {
        heading: "Light roast",
        body: [
          "Often brighter, fruitier, or more floral depending on the coffee. Acidity can feel lively. Body can feel lighter.",
          "Great for curious palates and pour-over mornings with somewhere to go.",
        ],
      },
      {
        heading: "Medium roast",
        body: [
          "A versatile middle path: sweetness, balance, and enough character to stay interesting without demanding a tasting notebook.",
        ],
      },
      {
        heading: "Dark roast",
        body: [
          "Deeper, richer, and more roast-forward. Excellent for bold mugs, milk drinks, camp setups, and people who want a sturdy cup.",
        ],
      },
      {
        heading: "How to choose without overthinking",
        body: [
          "If you like chocolatey depth, start darker. If you like citrus or berry notes, start lighter. If you want one bag that covers most moods, medium is a friendly dock.",
        ],
      },
    ],
    faq: [
      {
        question: "Is dark roast stronger in caffeine?",
        answer:
          "Not reliably by volume. Roast changes flavor more than it creates a simple caffeine ranking. Brew ratio and serving size matter a lot.",
      },
      {
        question: "Which roast is best for beginners?",
        answer:
          "Medium is usually the easiest on-ramp. Then wander lighter or darker based on what you enjoy.",
      },
    ],
    productLinkPrompt: "Use the taste finder on the homepage, then browse by roast.",
    relatedSlugs: [
      "choose-a-coffee-roast",
      "why-coffee-tastes-bitter",
      "better-drip-coffee-at-home",
    ],
    internalLinks: [
      { label: "How to choose a roast", href: "/journal/choose-a-coffee-roast" },
      { label: "Shop light roast", href: "/shop?roast=light" },
      { label: "Shop dark roast", href: "/shop?roast=dark" },
    ],
  },
  {
    slug: "camp-coffee-guide",
    title: "How to Make Good Coffee While Camping",
    seoTitle: "How to Make Good Coffee While Camping | Wake N’ Bake",
    metaDescription:
      "Camp coffee tips for French press, pour-over, and drip backups — including packing lists and no-fuss brewing outdoors.",
    category: "Camp Coffee",
    excerpt:
      "Good camp coffee is possible without packing your entire kitchen. Keep the kit small and the method sturdy.",
    readTime: "8 min",
    publishedAt: "2026-07-07",
    answerUpFront:
      "Pack a durable brew method, pre-measured coffee, a way to boil water, and a simple ratio. French press and pour-over both travel well.",
    introduction: [
      "Camping coffee should feel like a reward, not a science fair. Sunrise, cold air, and a warm mug are already doing most of the work.",
    ],
    sections: [
      {
        heading: "Choose a method that survives the trip",
        body: [
          "French press is rugged and full-bodied. A conical pour-over is lighter. Instant is a backup, not the dream.",
          "Bring a hand grinder only if you enjoy the ritual and have pack space.",
        ],
      },
      {
        heading: "Pre-measure before you leave",
        body: [
          "Portion coffee into small sealed bags or containers labeled with the brew method. Future-you at the campsite will be grateful.",
        ],
      },
      {
        heading: "Water and timing outdoors",
        body: [
          "Bring water to a boil, wait briefly, then brew. Keep the same ratios you use at home so the only new variable is the view.",
        ],
      },
    ],
    faq: [
      {
        question: "What grind should I pack?",
        answer:
          "Match the grind to your method before the trip. Coarse for French press, medium for pour-over or drip.",
      },
      {
        question: "How do I keep coffee fresh in a cooler?",
        answer:
          "Keep coffee sealed and separate from ice melt. Airtight packaging matters more than chilling.",
      },
    ],
    productLinkPrompt: "Grab a bold roast that can hang with camp milk and cooler air.",
    relatedSlugs: [
      "french-press-without-grit",
      "road-trip-coffee-kit",
      "how-to-store-coffee",
    ],
    internalLinks: [
      { label: "Camp French Press", href: "/brew-guides/camp-french-press" },
      { label: "Road trip coffee kit", href: "/journal/road-trip-coffee-kit" },
      { label: "Shop coffee", href: "/shop" },
    ],
  },
  {
    slug: "road-trip-coffee-kit",
    title: "A Simple Road Trip Coffee Kit",
    seoTitle: "A Simple Road Trip Coffee Kit | Wake N’ Bake",
    metaDescription:
      "Build a compact road trip coffee kit with brew tools, storage tips, and a packing list that fits in a trunk tote.",
    category: "Road Trip Coffee",
    excerpt:
      "Windows down, playlist on, coffee in reach. A small kit beats gas-station mystery brew most mornings.",
    readTime: "6 min",
    publishedAt: "2026-07-08",
    answerUpFront:
      "Pack a travel kettle or access to hot water, one brew method, sealed coffee, mugs, and a towel. Keep it compact enough that you actually bring it.",
    introduction: [
      "Road-trip coffee is about momentum. You want something better than despair and faster than a full kitchen setup.",
      "Life moves pretty fast. Coffee shipping takes slightly longer. Your travel kit can still be ready today.",
    ],
    sections: [
      {
        heading: "The core kit",
        body: [
          "Coffee, a brew device, filters if needed, a mug each, a spoon, and a way to heat water. Optional: sugar, oat milk packets, and a collapsible pour kettle.",
        ],
      },
      {
        heading: "Where the kit lives",
        body: [
          "A single tote or bin keeps everything from migrating under a seat. Label grind and ratio on tape so anyone in the car can brew.",
        ],
      },
      {
        heading: "Motel and campsite tactics",
        body: [
          "If the room has a basic drip machine, bring your own coffee and filters. If you are camping, lean on French press or pour-over.",
        ],
      },
    ],
    faq: [
      {
        question: "Is a travel espresso machine worth it?",
        answer:
          "Only if you love the ritual and have space. Most trips are happier with a simpler method.",
      },
      {
        question: "What coffee travels best?",
        answer:
          "Sealed whole bean or method-matched ground coffee in amounts you will finish on the trip.",
      },
    ],
    productLinkPrompt: "Stock the tote with a roast that fits long drives and early departures.",
    relatedSlugs: [
      "camp-coffee-guide",
      "whole-bean-vs-ground",
      "wake-n-bake-morning-ritual",
    ],
    internalLinks: [
      { label: "Camp coffee guide", href: "/journal/camp-coffee-guide" },
      { label: "Shop coffee", href: "/shop" },
      { label: "Brew guides", href: "/brew-guides" },
    ],
  },
  {
    slug: "choose-a-coffee-roast",
    title: "How to Choose a Coffee Roast",
    seoTitle: "How to Choose a Coffee Roast | Wake N’ Bake",
    metaDescription:
      "A practical guide to choosing light, medium, or dark roast coffee based on taste preferences, brew methods, and morning mood.",
    category: "Coffee Basics",
    excerpt:
      "Skip the intimidation. Match roast level to flavor preferences and how you actually brew.",
    readTime: "7 min",
    publishedAt: "2026-07-09",
    answerUpFront:
      "Pick roast by flavor direction: bright and lively for light, balanced for medium, deep and roast-forward for dark. Then match grind and method.",
    introduction: [
      "Choosing coffee should feel closer to picking a playlist than defending a thesis.",
      "Fresh coffee for deep thoughts, questionable ideas, and surprisingly productive afternoons starts with a roast that fits you.",
    ],
    sections: [
      {
        heading: "Start with flavor words you already use",
        body: [
          "If you like chocolate, nuts, and cozy depth, explore darker or medium-dark. If you like citrus, berry, or tea-like cups, explore lighter roasts.",
        ],
      },
      {
        heading: "Consider your brew method",
        body: [
          "Immersion methods like French press love body. Pour-over shows clarity. Drip wants a friendly all-rounder. None of these rules are sacred, but they are useful docks.",
        ],
      },
      {
        heading: "Use the taste finder",
        body: [
          "Smooth & Easy, Bold & Dark, Bright & Adventurous, and Decaf & Laid Back are shortcuts for mornings that do not want a lecture.",
        ],
      },
    ],
    faq: [
      {
        question: "What if I like flavored coffee?",
        answer:
          "That is valid. Look for products labeled clearly in the shop. Flavor preference still pairs with roast level and brew method.",
      },
      {
        question: "Can I like more than one roast?",
        answer:
          "Absolutely. Different days get different playlists. Coffee can work the same way.",
      },
    ],
    productLinkPrompt: "Browse the shop by roast or start with best sellers.",
    relatedSlugs: [
      "light-roast-vs-dark-roast",
      "better-drip-coffee-at-home",
      "wake-n-bake-morning-ritual",
    ],
    internalLinks: [
      { label: "Light vs dark roast", href: "/journal/light-roast-vs-dark-roast" },
      { label: "Shop best sellers", href: "/shop?sort=featured" },
      { label: "Taste finder", href: "/#taste-finder" },
    ],
  },
  {
    slug: "why-coffee-tastes-bitter",
    title: "Why Your Coffee Tastes Bitter",
    seoTitle: "Why Your Coffee Tastes Bitter | Wake N’ Bake",
    metaDescription:
      "Fix bitter coffee by adjusting grind, brew time, ratio, water temperature, and freshness without overcomplicating breakfast.",
    category: "Brew Better",
    excerpt:
      "Bitterness usually means over-extraction, stale coffee, or a dirty machine. Fix one variable at a time.",
    readTime: "6 min",
    publishedAt: "2026-07-10",
    answerUpFront:
      "Bitter coffee is often over-extracted. Grind coarser, shorten brew time, use a balanced ratio, clean your gear, and start with fresher coffee.",
    introduction: [
      "Bitter does not always mean dark roast. It often means the brew pulled too hard on the grounds.",
    ],
    sections: [
      {
        heading: "Common causes",
        body: [
          "Grind too fine, water too hot for too long, too much coffee relative to contact time, stale beans, or leftover oils in the machine.",
        ],
      },
      {
        heading: "Quick fixes",
        body: [
          "Grind coarser. Shorten steep or pour time. Check your ratio. Descale and clean. Open a fresher bag.",
        ],
      },
      {
        heading: "Taste before you add everything",
        body: [
          "Sugar and cream can mask problems, which is fine sometimes. If you want the coffee itself to improve, adjust the brew first.",
        ],
      },
    ],
    faq: [
      {
        question: "Is bitterness always bad?",
        answer:
          "A little roast bitterness can be pleasant. Harsh, ashy bitterness usually means the brew needs a tweak.",
      },
      {
        question: "Does dark roast always taste bitter?",
        answer:
          "No. A well-brewed dark roast can taste deep and smooth. Technique still matters.",
      },
    ],
    productLinkPrompt: "A fresh bag and a cleaner brew often fix more than another sugar packet.",
    relatedSlugs: [
      "coffee-to-water-ratio",
      "how-to-store-coffee",
      "better-drip-coffee-at-home",
    ],
    internalLinks: [
      { label: "Coffee-to-water ratio", href: "/journal/coffee-to-water-ratio" },
      { label: "Store coffee properly", href: "/journal/how-to-store-coffee" },
      { label: "Shop coffee", href: "/shop" },
    ],
  },
  {
    slug: "how-much-coffee-per-cup",
    title: "How Much Coffee Should You Use Per Cup?",
    seoTitle: "How Much Coffee Per Cup | Wake N’ Bake",
    metaDescription:
      "Learn how much coffee to use per cup with gram-based ratios, scoop estimates, and adjustments for stronger or milder coffee.",
    category: "Coffee Basics",
    excerpt:
      "For a typical mug, start around 15–20 grams of coffee depending on size and strength preference.",
    readTime: "5 min",
    publishedAt: "2026-07-11",
    answerUpFront:
      "For a 10–12 oz mug, start with about 18–20 grams of coffee and roughly 290–320 grams of water. Adjust to taste.",
    introduction: [
      "Cups are not standardized. That is why grams beat folklore. Once you know your mug, the morning gets easier.",
    ],
    sections: [
      {
        heading: "A practical mug recipe",
        body: [
          "Weigh your favorite mug filled with water. Divide by 16 for a 1:16 brew. That coffee dose becomes your house number.",
        ],
      },
      {
        heading: "If you only have scoops",
        body: [
          "About two level tablespoons often land near 10 grams, but bean size varies. Treat scoops as a temporary map until you can weigh.",
        ],
      },
      {
        heading: "Stronger or milder",
        body: [
          "Want stronger? Add coffee or reduce water slightly. Want milder? Do the opposite. Keep notes for two days and your future mornings get smoother.",
        ],
      },
    ],
    faq: [
      {
        question: "How much coffee for two people?",
        answer:
          "Double your single-mug dose, or brew a small pot with the same ratio. Consistency scales better than guessing twice.",
      },
      {
        question: "Does espresso use the same amount?",
        answer:
          "No. Espresso uses a different dose and brew ratio. These guidelines are for drip, pour-over, and similar filter methods.",
      },
    ],
    productLinkPrompt: "Once your dose is dialed, explore roasts that match your mug ritual.",
    relatedSlugs: [
      "coffee-to-water-ratio",
      "better-drip-coffee-at-home",
      "choose-a-coffee-roast",
    ],
    internalLinks: [
      { label: "Coffee-to-water ratio", href: "/journal/coffee-to-water-ratio" },
      { label: "Drip coffee guide", href: "/journal/better-drip-coffee-at-home" },
      { label: "Shop coffee", href: "/shop" },
    ],
  },
  {
    slug: "wake-n-bake-morning-ritual",
    title: "The Wake N’ Bake Morning Ritual",
    seoTitle: "The Wake N’ Bake Morning Ritual | Wake N’ Bake Coffee Co.",
    metaDescription:
      "A laid-back morning coffee ritual from Wake N’ Bake Coffee Co. — slow, practical, and built for real life powered by DankNDevour.",
    category: "Behind the Brand",
    excerpt:
      "A simple morning framework: water on, grind or scoop, brew without rushing, sip before the scroll spiral.",
    readTime: "6 min",
    publishedAt: "2026-07-12",
    answerUpFront:
      "Keep the ritual small: heat water, brew with a known ratio, take a few unhurried sips, then face the day. Coffee first. Chaos second.",
    introduction: [
      "Wake N’ Bake Coffee Co. is not trying to turn your morning into a productivity seminar. The point is a cup that helps the day feel more like yours.",
      "That first sip hits different when you are not already late to your own life.",
    ],
    sections: [
      {
        heading: "The five-minute version",
        body: [
          "Put water on. Prep the filter or press. Brew with your house ratio. Sit down for at least a few minutes before opening every app on Earth.",
        ],
      },
      {
        heading: "The scenic-route version",
        body: [
          "Open a window. Step outside. Let the cup be the main character for a minute. The ocean has tides. You have emails. Both can wait one song.",
        ],
      },
      {
        heading: "Where DankNDevour fits",
        body: [
          "Powered by DankNDevour means this brand comes from community, humor, and long conversations that occasionally wander into outer space.",
          "The coffee is still coffee. The ritual is still yours. The crew just made room for a better daily cup.",
        ],
      },
    ],
    faq: [
      {
        question: "Do I need special gear?",
        answer:
          "No. A clean drip machine, pour-over, or French press is enough. Curiosity helps more than gear envy.",
      },
      {
        question: "Is this a cannabis ritual?",
        answer:
          "No. Wake N’ Bake sells coffee. The name reflects a laid-back lifestyle and DankNDevour roots, not cannabis in the bag.",
      },
    ],
    productLinkPrompt: "Find your roast and build a morning that can keep up with your actual life.",
    relatedSlugs: [
      "choose-a-coffee-roast",
      "better-drip-coffee-at-home",
      "how-to-store-coffee",
    ],
    internalLinks: [
      { label: "Our story", href: "/about" },
      { label: "Shop the coffee", href: "/shop" },
      { label: "Join the crew", href: "/#join-the-crew" },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(slug: string): Article[] {
  const article = getArticle(slug);
  if (!article) return [];
  return article.relatedSlugs
    .map((related) => getArticle(related))
    .filter((item): item is Article => Boolean(item));
}
