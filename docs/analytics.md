# Analytics Notes

## Frontend events (consent-aware)

Fired via `lib/analytics/events.ts` only after consent and only when script IDs exist:

- `view_item`, `view_item_list`, `search`
- `add_to_cart`, `remove_from_cart`, `view_cart`, `begin_checkout`
- `newsletter_signup`, `contact_submit`, `wholesale_submit`

No email/phone/name in event payloads.

## Purchase events

**Do not rely on the Next.js app for purchase attribution.** After redirect, payment completes on Shopify.

Configure:

1. Shopify → GA4 / Meta channels or pixel apps for `purchase`
2. GHL Shopify integration for customer/order tags and revenue workflows

Frontend `begin_checkout` is directional only.
