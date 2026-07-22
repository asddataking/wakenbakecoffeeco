# Shopify Setup

## 1. Create / confirm the Shopify store

1. Use a Shopify plan that allows Storefront API access (Headless / custom storefront).
2. Note your store domain: `your-store.myshopify.com`.
3. Optionally set a custom checkout domain and put it in `NEXT_PUBLIC_SHOPIFY_CHECKOUT_DOMAIN`.

## 2. Create a Storefront API token

1. Shopify Admin → **Settings → Apps and sales channels → Develop apps**.
2. Create an app (e.g. `WNBC Headless`).
3. Configure Storefront API scopes. Minimum recommended:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory` (optional; inventory counts are not required for listing/checkout)
   - `unauthenticated_read_collection_listings`
   - `unauthenticated_write_checkouts` / cart scopes for Cart API
   - `unauthenticated_read_selling_plans` (subscriptions)
   - `unauthenticated_read_product_tags`
4. Install the app and copy the **Storefront API access token** into `SHOPIFY_STOREFRONT_ACCESS_TOKEN`.
5. Set `SHOPIFY_STOREFRONT_API_VERSION` (pinned in `.env.example`, currently `2025-04`).

## 3. Publish products to the headless sales channel (required)

Seeing products in Shopify Admin is **not** enough for this Next.js storefront.

The Storefront API only returns products published to the **custom app / Headless** sales channel that owns your Storefront token.

### For each coffee product (or bulk-edit both)

1. Shopify Admin → **Products**
2. Open the product (or select both → Bulk edit)
3. Confirm status is **Active** (not Draft)
4. In the **Publishing** / sales channels panel, enable:
   - Your custom app (e.g. `WNBC Headless` / Headless channel)
   - Online Store (optional, only if you also use Shopify’s native storefront)
5. Save
6. Confirm inventory / Dripshipper availability so variants can sell

### Quick verify

After publishing, the Storefront API should return the products. Restart `npm run dev` and reload `/shop`.

If Admin shows products but `/shop` is empty, the sales-channel publish step is almost always the missing piece — especially with Dripshipper imports, which often publish only to Online Store by default.

## 4. Collections & handles

Create collections referenced by the storefront:

| Handle | Purpose |
|---|---|
| `featured-coffee` | Homepage featured grid |
| `all` | Optional all-coffee collection |

Do **not** hardcode product IDs in the frontend. Use handles, tags, types, metafields, and variants.

## 5. Coffee metafields

Create a metafield definition namespace `coffee` with keys:

- `roast_level`
- `origin`
- `tasting_notes`
- `processing_method`
- `altitude`
- `bean_type`
- `brew_methods`
- `body`
- `acidity`
- `bag_size`
- `roast_schedule`
- `shipping_note`

Storefront queries already request these and omit missing values.

Suggested product tags for filters/currents: `smooth`, `bold`, `bright`, `decaf`, `featured`, `blend`, `single-origin`.

## 6. Selling plans (subscriptions)

1. Install a subscriptions app compatible with Shopify selling plans.
2. Attach selling plans to coffee products.
3. The PDP automatically renders plans when Storefront returns `sellingPlanGroups`.
4. If none exist, the homepage shows “Explore recurring coffee” instead of fabricating discounts.

## 7. Checkout & cart

- Cart ID is stored in an httpOnly cookie (`wnbc_cart_id`).
- Checkout always redirects to Shopify `checkoutUrl`.
- Tax/shipping are calculated only at Shopify checkout.

## 8. Customer accounts (optional)

Set `NEXT_PUBLIC_SHOPIFY_ACCOUNT_URL` to your Shopify account/login URL when ready. Until then the header account control stays hidden (Customer Account API can be added later).

## 9. Menus (optional)

If you create Online Store navigation menus, the client can read them via `getMenu(handle)`. Primary nav currently uses `lib/content/brand.ts` so the headless site does not depend on Liquid menus.

## 10. Verify

1. Fill `.env.local` with real domain + token.
2. Restart `npm run dev` — demo banner should disappear.
3. Confirm products are published to the headless app sales channel.
4. Confirm `/shop`, a PDP, add-to-cart, and checkout redirect.
