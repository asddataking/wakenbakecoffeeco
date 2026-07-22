# Build Report — Wake N Bake Coffee Co. Storefront

**Date:** 2026-07-22  
**Status:** Production-ready codebase; external credentials/services remain owner setup.

## What was built

Complete headless Next.js App Router storefront with:

- Coastal brand system (tokens, Fraunces + Source Sans 3, temporary wordmark/emblem)
- Shopify Storefront GraphQL client (products, collections, cart, discounts, selling plans, coffee metafields)
- Demo mode with typed mock catalog + visible banner (never silent in `VERCEL_ENV=production`)
- Cart drawer + cart page, cookie cart ID, checkout redirect to Shopify
- Homepage marketing sections (hero, featured, currents, subscriptions, DankNDevour, brew guides, reviews empty-state, newsletter)
- Shop/collection filters with URL state; full PDP with gallery, variants, sticky mobile ATC, JSON-LD
- Content pages: about, contact, FAQ, brew guides (3 articles), wholesale, legal
- GHL-ready forms (newsletter, first-order, contact, wholesale) with honeypot + rate limit
- Consent-aware GA4/Meta analytics abstraction
- SEO: metadata, sitemap, robots, OG/Twitter, 404, error boundary, security headers/CSP
- Docs under `docs/` + README architecture diagram

## Verification results

| Check | Result |
|---|---|
| `npm run typecheck` | Pass |
| `npm run lint` | Pass |
| `npm test` (14 tests) | Pass |
| `npm run build` | Pass (29 routes generated) |

## Demo mode behavior

- **On** when Shopify domain/token missing and not true Vercel production
- Shows persistent development banner
- Serves mock products/collections; checkout blocked with clear message
- **Off / fail-closed** when `VERCEL_ENV=production` without credentials

## Remaining owner setup

1. Create Shopify Storefront app + token; set env vars (see `docs/shopify-setup.md`)
2. Create `featured-coffee` collection, tags, coffee metafields, optional selling plans
3. Connect Dripshipper to Shopify only (`docs/dripshipper-setup.md`)
4. Configure GHL API or webhook + tags/fields + automations
5. Deploy to Vercel with production env (`docs/vercel-deployment.md`)
6. Replace temporary logo; confirm legal `[CONFIRM]` placeholders
7. Optionally set GA4 / Meta / GHL chat widget IDs and Shopify account URL
8. Place a real test order end-to-end before launch (`docs/launch-checklist.md`)

## Explicit non-claims

- No live Shopify or GHL connection was established during this build
- No credentials were fabricated or committed
- Abandoned-checkout SMS from the Next.js cart alone is **not** implemented (documented honestly)
- Purchase attribution belongs in Shopify/GHL, not solely the frontend pixel
