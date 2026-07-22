# Launch Checklist

## Commerce

- [ ] Shopify Storefront app installed with correct scopes
- [ ] Env vars set in Vercel Production
- [ ] Demo banner absent on production
- [ ] Featured collection `featured-coffee` populated
- [ ] Coffee metafields filled for live products
- [ ] Test add-to-cart → Shopify checkout → test order
- [ ] Dripshipper fulfillment verified on test order
- [ ] Selling plans configured OR homepage subscription CTA reviewed
- [ ] Discount codes tested via cart

## CRM / marketing

- [ ] GHL location + token or webhook configured
- [ ] Tags + custom fields created
- [ ] Welcome / New Customer workflows live (see automation plan)
- [ ] Consent language reviewed by counsel
- [ ] Abandoned checkout expectations documented (Shopify-native)

## Site content

- [ ] Confirm email, address, social URLs in `lib/content/brand.ts`
- [ ] Replace temporary logo
- [ ] Legal pages reviewed (`[CONFIRM]` removed)
- [ ] Shipping/returns policy confirmed with Dripshipper
- [ ] Real photography uploaded in Shopify

## SEO / analytics

- [ ] `NEXT_PUBLIC_SITE_URL` is production HTTPS URL
- [ ] GA4 / Meta IDs set (optional)
- [ ] Consent banner QA’d
- [ ] Sitemap submitted in Search Console

## QA

- [ ] `npm run typecheck && npm run lint && npm test && npm run build` green
- [ ] Mobile nav, cart drawer keyboard/focus, sticky ATC
- [ ] Keyboard-only pass on shop + PDP + forms
- [ ] `prefers-reduced-motion` spot check
- [ ] 404 and error pages render
