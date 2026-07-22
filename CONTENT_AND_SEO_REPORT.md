# Content & SEO Report — Wake N’ Bake Coffee Co.

**Date:** July 22, 2026  
**Scope:** Brand voice, UI copy, SEO metadata, editorial content, microcopy, and reasonable coastal UI polish. Commerce architecture (Shopify Storefront, cart, checkout) unchanged.

---

## Brand voice summary

Wake N’ Bake Coffee Co. now speaks like a friendly, slightly toasted surfer who genuinely cares about coffee:

- **Primary mode (~80–85%):** Clear, useful, trustworthy conversion copy
- **Seasoning (~15–20%):** Lightly dreamy, amused, coastal humor
- **Cannabis stance:** Name and DankNDevour roots acknowledged; FAQ clearly states products are coffee without cannabis/THC unless a future product says otherwise
- **Tone anchors:** Rise. Grind. Unwind. · Brew the good life. · Premium small-batch coffee · Powered by DankNDevour

Centralized content lives in:

| File | Purpose |
|---|---|
| `lib/content/brand.ts` | Identity, nav, announcement rotation, taste finder, DankNDevour, Luna |
| `lib/content/site-copy.ts` | Homepage sections + shared UI microcopy |
| `lib/content/seo.ts` | Metadata templates + keyword themes |
| `lib/content/faq.ts` | Site + PDP FAQ |
| `lib/content/about.ts` | Our Story page |
| `lib/content/brew-guides.ts` | Practical brew guides |
| `lib/content/articles.ts` | Coffee Journal editorial library |

---

## Pages rewritten

- Homepage (`/`) — hero, featured, taste finder, subscriptions, DankNDevour, brew guides, reviews empty state, newsletter
- Shop (`/shop`) — heading, empty/search states, subscription view copy
- Product PDP (`/products/[handle]`) — purchase labels, sold-out, FAQ, related, internal links
- Cart (`/cart`) + cart drawer
- Our Story (`/about`) — full multi-section narrative
- FAQ (`/faq`) — expanded with THC/cannabis clarity + trust placeholders
- Contact (`/contact`)
- Wholesale (`/wholesale`)
- Brew Guides index + detail pages
- **New** Coffee Journal (`/journal` + 12 articles)
- 404 + error states
- Footer / navigation / consent banner

---

## UI states rewritten

- Announcement bar (accessible rotating messages)
- Cart empty / loading / checkout CTA / tax microcopy
- Newsletter success/error/loading/consent
- Contact success/error/loading
- Add to cart success (“Added to Your Stash”)
- Sold-out / unavailable messaging
- Subscription labels: Keep It Coming / Just This Bag
- Search placeholder + no-results language
- Cookie consent
- Product card CTA: View the Roast
- Luna supporting lines on empty cart + 404

---

## SEO templates created

| Page | Title pattern |
|---|---|
| Home | Wake N’ Bake Coffee Co. \| Brew the Good Life |
| Shop | Shop Coffee \| Wake N’ Bake Coffee Co. |
| Subscriptions (shop filter) | Uses subscription description copy |
| Brew Guides | Coffee Brew Guides \| … |
| About | Our Story \| … |
| FAQ / Contact / Wholesale / Journal | Dedicated templates in `lib/content/seo.ts` |
| Products | Shopify SEO first; fallback template from live product data |
| Collections | Dynamic from Shopify |

Keyword themes documented in `seo.keywords` (commercial, lifestyle, educational). Copy prioritizes people first; keywords are not forced.

Sitemap updated to include `/journal` and all article routes.

---

## Articles created

### Brew guides (expanded)

1. Sunrise Pour-Over  
2. Camp French Press  
3. Tidewatch Batch Drip  

Each includes tips, FAQ, related links, and Article JSON-LD.

### Coffee Journal (12)

1. How to Make Better Drip Coffee at Home  
2. French Press Coffee Without the Grit  
3. The Best Coffee-to-Water Ratio for Everyday Brewing  
4. Whole Bean vs. Ground Coffee  
5. How to Store Coffee and Keep It Fresh  
6. Light Roast vs. Dark Roast  
7. How to Make Good Coffee While Camping  
8. A Simple Road Trip Coffee Kit  
9. How to Choose a Coffee Roast  
10. Why Your Coffee Tastes Bitter  
11. How Much Coffee Should You Use Per Cup?  
12. The Wake N’ Bake Morning Ritual  

Each includes SEO title/description, quick answer, sections, FAQ, product CTA, internal links, related articles, and FAQ/Article/Breadcrumb JSON-LD.

Categories: Brew Better, Coffee Basics, Camp Coffee, Road Trip Coffee, Behind the Brand (+ structure ready for DankNDevour / Coffee Culture expansion).

---

## Keywords targeted

**Commercial:** coffee delivered to your home, fresh coffee online, coffee subscription, small-batch coffee, coffee for camping/road trips, coffee gifts, light/medium/dark roast, flavored/whole bean/ground coffee  

**Lifestyle:** beach-inspired / nautical / coastal lifestyle coffee, coffee for creators/gamers/outdoors, morning coffee ritual  

**Educational:** drip/French press guides, coffee-to-water ratio, grind size, storage, whole bean vs ground, roast comparison, camping/travel coffee  

---

## Internal links added

- Homepage → shop, taste finder anchors, newsletter `#join-the-crew`, about, brew guides
- Brew guides ↔ journal articles
- Journal articles ↔ shop/roast filters, brew guides, about, related posts
- PDP → brew guides + journal
- Nav/footer → Best Sellers, Subscriptions, Journal, Our Story, FAQ

---

## Structured data implemented

- Organization (homepage)
- AboutPage (about)
- FAQPage (site FAQ + product FAQ + article FAQs)
- Product + BreadcrumbList (PDP)
- Article (+ breadcrumbs where applicable) for brew guides and journal posts

---

## UI polish (reasonable, non-architecture)

- Deep navy sticky navigation for coastal contrast
- Soft rounded cards / glass-adjacent taste-finder tiles
- Rounded-full primary CTAs
- Product cards with hover CTA reveal
- Softer shadows and section spacing retained within existing cream / ocean / seaglass / sunrise system

Commerce flows, Shopify data sources, and checkout remain intact.

---

## Missing business facts (owner confirm)

Visible `[CONFIRM …]` placeholders remain for:

- `[CONFIRM SUPPORT EMAIL]` (FAQ + brand email note)
- `[CONFIRM street address / city / state / ZIP]`
- `[CONFIRM phone]`
- `[CONFIRM]` social URLs
- `[CONFIRM SHIPPING WINDOW]`
- `[CONFIRM RETURN POLICY]`
- `[CONFIRM SUBSCRIPTION CANCELLATION TERMS]`
- `[CONFIRM ROASTING AND FULFILLMENT LANGUAGE WITH DRIPSHIPPER]`

Legal pages (`privacy`, `terms`, `shipping-returns`) still contain prior confirm markers — not invented.

---

## Remaining owner decisions

1. Finalize support email, mailing address, phone, and social handles  
2. Confirm shipping windows and return policy language with Dripshipper/ops  
3. Confirm subscription cancellation / management wording once selling plans are live  
4. Decide whether Best Sellers should point at a dedicated Shopify collection vs `/shop?sort=featured`  
5. Provide approved customer testimonials before enabling social proof  
6. Optional: split First/Last Name on contact form if CRM requires it (currently clear single Name field for accessibility)  
7. Optional: order-status email templates for “You’re officially brewing / caught a wave / made it ashore” once fulfillment emails are owned  

---

## Build and test results

| Check | Result |
|---|---|
| `npm run typecheck` | Passed |
| `npm test` (14 tests) | Passed |
| `npm run lint` | Passed (eslint ignores updated for `.next/**` and `next-env.d.ts`) |
| `npm run build` | Passed — 37 static routes including 12 journal articles + 3 brew guides |

---

## How to edit going forward

1. Brand/nav/announcement → `lib/content/brand.ts`  
2. Buttons, empty states, homepage section copy → `lib/content/site-copy.ts`  
3. Metadata → `lib/content/seo.ts`  
4. Journal posts → `lib/content/articles.ts`  
5. Product facts/prices/images → Shopify only  
