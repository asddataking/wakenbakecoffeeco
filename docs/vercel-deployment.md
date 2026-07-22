# Vercel Deployment

## 1. Import the repo

1. Push this project to GitHub/GitLab/Bitbucket.
2. In Vercel → **Add New Project** → import the repo.
3. Framework preset: Next.js (auto-detected).
4. Root directory: repository root.

## 2. Environment variables

Add all keys from `.env.example` in Vercel Project Settings → Environment Variables.

Critical for Production:

- `NEXT_PUBLIC_SITE_URL` = `https://your-domain.com`
- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- `SHOPIFY_STOREFRONT_API_VERSION`
- `NEXT_PUBLIC_SHOPIFY_CHECKOUT_DOMAIN`

Optional: GHL + analytics IDs.

**Production note:** If Shopify credentials are missing and `VERCEL_ENV=production`, demo mode is disabled and commerce requests fail closed. Preview deployments without credentials may still use demo mocks.

## 3. Domains

1. Attach the production domain in Vercel.
2. Update Shopify allowed domains / checkout settings as needed for headless storefronts.
3. Ensure CSP in `next.config.ts` still matches analytics/GHL domains you enable.

## 4. Deploy checks

After deploy:

1. Homepage loads with brand hero (no demo banner in production).
2. `/shop` lists live products.
3. PDP add-to-cart → cart drawer → Shopify checkout.
4. Newsletter form returns success (API or webhook mode).
5. `/sitemap.xml` and `/robots.txt` resolve.

## 5. Security headers

`next.config.ts` sets CSP, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, and `X-Content-Type-Options`. Adjust CSP if you add new third-party scripts.
