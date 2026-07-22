# Wake N Bake Coffee Co. — Implementation Plan

## Phase 1 — Repo inspection (complete)

- Workspace is an empty git repo (`master`, no commits, no source files).
- Nothing to preserve; greenfield headless Next.js storefront.

## Phase 2 — Architecture decisions

| Concern | Decision |
|---|---|
| Framework | Next.js App Router (stable), TypeScript strict |
| Styling | Tailwind CSS v4 + CSS variables (coastal palette) |
| Commerce | Shopify Storefront GraphQL API; checkout via Shopify `checkoutUrl` |
| Fulfillment | Dripshipper via Shopify only (no direct frontend integration) |
| CRM | GoHighLevel server-side API/webhook with dev fallback |
| Cart persistence | Secure httpOnly cookie for cart ID |
| Demo mode | Typed mocks when Shopify env missing in non-production; hard-fail in production |
| Data store | Shopify as source of truth — no custom DB |
| Hosting | Vercel |

## Phase 3 — Foundation

- Next.js + TS + Tailwind + ESLint + Prettier + Vitest
- Brand tokens, fonts, layout shell (nav, footer, announcement)
- Env Zod schema, brand config, security headers
- Temporary text logo + SVG emblem

## Phase 4 — Commerce

- `lib/shopify/*` client, fragments, queries, mutations, types
- Cart cookie + server actions / route helpers
- Pages: shop, collections, products, cart
- Demo mode mock catalog + banner
- Coffee metafields, selling plans, discount codes

## Phase 5 — Marketing

- Homepage sections (hero, featured, currents, subscriptions, DND bridge, guides, reviews empty-state, newsletter)
- Forms: newsletter, contact, wholesale, first-order offer
- GHL client + tags + rate limit + honeypot
- Analytics abstraction (GA4 / Meta, consent-aware)
- UTM capture utilities

## Phase 6 — Content / SEO

- Brew guides (3 articles), about, FAQ, legal pages
- Metadata, JSON-LD, sitemap, robots, OG, 404, error boundaries

## Phase 7 — QA

- Unit tests (money, normalize, variants, cart lines, forms, UTMs, demo, GHL)
- `npm install` → typecheck → lint → test → production build; fix until green

## Phase 8 — Docs & audit

- README + all required docs
- `BUILD_REPORT.md` with remaining owner setup

## Out of scope / owner-owned

- Real Shopify credentials, GHL tokens, GA/Meta IDs
- Dripshipper merchant onboarding
- Customer Account API (entry point only)
- Real product photography / final logo assets
