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
| Brand copy, nav, announcement, currents | `lib/content/brand.ts` |
| Brew guides (3 articles) | `lib/content/brew-guides.ts` |
| About / FAQ / legal pages | `app/*/page.tsx` |
| Temporary logo | `components/ui/BrandMark.tsx` + `public/brand/` |
| Approved testimonials | Pass into `ReviewsSection` only when real — never fabricate |

## Legal placeholders

Pages include `[CONFIRM ...]` markers for owner/legal review (`privacy`, `terms`, `shipping-returns`, address/email in brand config).

## Reviews policy

Empty state by default. Only approved testimonials should be added. No fake stars, quotes, or award badges.

## Images

Prefer Shopify CDN images. Local placeholders in `public/placeholders/` are for demo mode only.
