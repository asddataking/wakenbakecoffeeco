# Content Management

Shopify is the source of truth for products, prices, inventory, variants, selling plans, and coffee metafields.

## Edit in Shopify

- Product titles, descriptions, images, tags, vendor, product type
- Variants (size/grind), inventory, pricing
- Collections and collection imagery
- Metafields under namespace `coffee`
- Discounts / price rules (applied at checkout or via cart discount codes)

## Edit in this repo

| Content | Location |
|---|---|
| Brand identity, nav, announcement, taste finder, DankNDevour bridge | `lib/content/brand.ts` |
| Homepage + shared UI microcopy | `lib/content/site-copy.ts` |
| SEO metadata templates + keyword themes | `lib/content/seo.ts` |
| Site + product FAQ | `lib/content/faq.ts` |
| Our Story page | `lib/content/about.ts` |
| Brew guides | `lib/content/brew-guides.ts` |
| Coffee Journal articles | `lib/content/articles.ts` |
| Legal pages | `app/privacy`, `app/terms`, `app/shipping-returns` |
| Brand assets | `public/brand/` |
| Approved testimonials | Pass into `ReviewsSection` only when real — never fabricate |

## Brand voice

Relaxed, warm, lightly humorous coastal coffee brand. Clear conversion copy first. Playful “slightly lifted” personality in moderation (~15–20%). Coffee only — no cannabis product claims.

## Legal placeholders

Pages and FAQ include `[CONFIRM ...]` markers for owner/legal review (`privacy`, `terms`, `shipping-returns`, address/email in brand config, shipping window, return policy, subscription terms, Dripshipper language).

## Reviews policy

Empty state by default. Only approved testimonials should be added. No fake stars, quotes, or award badges.

## Images

Prefer Shopify CDN images. Local placeholders in `public/placeholders/` are for demo mode only.
