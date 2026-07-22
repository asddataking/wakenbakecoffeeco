# GHL Automation Plan

Honest, launch-ready workflow outline for Wake N Bake Coffee Co. Configure these inside GoHighLevel after tags/fields from `ghl-setup.md` exist.

## Shared compliance rules

- Entry requires documented consent (`email_consent=yes` for email; `sms_consent=yes` for SMS).
- Exit on unsubscribe, tag removal, bounce, or manual suppression.
- Quiet hours for SMS; no medical/drug claims in copy.
- Prefer value (brew tips, roast education) over hard sell in early messages.

---

## 1. Welcome

**Entry:** Tag `WNBC - Newsletter` or `First Order Offer` added + email consent.

**Exit:** Unsubscribed; OR completed welcome sequence.

**Delay / steps:**

1. Immediate: Welcome email — brand story, brew the good life, link to `/shop` and `/brew-guides`.
2. +2 days: Sunrise pour-over guide link.
3. +5 days: Soft product education (no fabricated discounts). If first-order campaign exists in Shopify, mention it only when a real code is configured.

**Fields used:** `firstName`, `form_source`, UTMs, `landing_page`.

---

## 2. New Customer

**Entry:** Shopify → GHL purchase webhook / integration tags contact with `Coffee Customer` after paid order. (Requires Shopify-GHL order sync — configure in GHL native Shopify integration or middleware. This storefront does not invent purchase events.)

**Exit:** Entered Reorder or VIP flows; unsubscribed.

**Steps:**

1. Immediate: Thank-you + brew tip matched to product interest if available.
2. +3 days: “How’s the cup?” — request authentic review (no incentives that violate platform policies).
3. +10 days: Education on grind/storage; link to brew guides.

---

## 3. Reorder

**Entry:** `Coffee Customer` + last order date older than typical bag lifespan (e.g. 21–30 days). Requires order date field from Shopify sync.

**Exit:** New order placed; unsubscribed; tagged suppressed.

**Steps:**

1. Reminder email with shop link.
2. +4 days: Optional SMS only if `sms_consent=yes`.
3. Stop after 2 touches unless engaged.

---

## 4. Abandoned Checkout (limitations)

**Honest limitation:** Headless Storefront carts that never reach Shopify checkout cannot be recovered from Shopify abandoned-checkout emails. Recovery depends on:

- Buyer reaching Shopify checkout (Shopify native abandoned checkout), **or**
- Custom cart capture (email before redirect) — not implemented by default to avoid surprising users.

**Recommended approach:**

1. Enable Shopify abandoned checkout emails for checkouts that start on Shopify.
2. Optional future enhancement: ask email before redirect and upsert GHL with tag `Subscription Interest` / custom `abandoned_cart` — requires product decision + privacy copy.

**Do not claim** this Next.js cart drawer alone powers abandoned-cart SMS today.

---

## 5. VIP

**Entry:** Tag `VIP Candidate` (wholesale leads, high AOV if synced, or manual).

**Exit:** Becomes active wholesale account; declines; unsubscribed.

**Steps:**

1. Personal note from brand owner within 1 business day.
2. +3 days: Wholesale FAQ / lead magnet if available.
3. Manual pipeline stage in GHL opportunities.

---

## 6. Win-Back

**Entry:** `Coffee Customer` with no order in [CONFIRM 60–90] days.

**Exit:** Order placed; unsubscribed; hard bounce.

**Steps:**

1. “We saved you a mug” style email — no fake scarcity.
2. +7 days: Brew guide + shop link.
3. Optional final SMS if consented; then suppress for 60 days.

---

## Attribution

Store UTMs on the contact. Report in GHL dashboards by `utm_campaign` / `form_source`. Frontend analytics fire `newsletter_signup`, `contact_submit`, `wholesale_submit` without PII; purchase attribution belongs in Shopify + GHL integrations.
