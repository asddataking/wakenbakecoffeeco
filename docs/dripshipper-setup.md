# Dripshipper Setup

Dripshipper connects to **Shopify**, not to this Next.js storefront.

## Role

- Products, inventory, and fulfillment sync through Shopify Admin / Dripshipper apps.
- The headless storefront only reads Storefront API data and sends buyers to Shopify checkout.

## Owner checklist

1. Create / connect the Dripshipper merchant account.
2. Install/connect Dripshipper to the same Shopify store used by this storefront.
3. Import or map coffee SKUs, grind options, and bag sizes as Shopify variants.
4. Confirm shipping profiles and rates appear correctly at Shopify checkout.
5. Populate product copy and coffee metafields in Shopify (this site does not invent origins or tasting notes).
6. Place a real test order in a Shopify development store or low-risk live SKU.
7. Confirm fulfillment emails and tracking behave as expected.

## What not to do

- Do not add Dripshipper API keys to the Next.js app.
- Do not rebuild checkout or payment capture in Next.js.
- Do not hardcode SKUs/product IDs in frontend code.
