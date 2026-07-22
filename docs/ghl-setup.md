# GoHighLevel Setup

Forms submit server-side through `lib/ghl/client.ts` with three modes:

1. **Direct API** when `GHL_LOCATION_ID` + `GHL_API_TOKEN` are set
2. **Webhook** when `GHL_WEBHOOK_URL` is set (and API creds are absent)
3. **Dev logging** when neither is configured (local only)

## Environment

```
GHL_LOCATION_ID=
GHL_API_TOKEN=
GHL_NEWSLETTER_TAG=WNBC - Newsletter
GHL_CUSTOMER_TAG=Coffee Customer
GHL_WEBHOOK_URL=
NEXT_PUBLIC_GHL_CHAT_WIDGET_ID=
```

Never expose `GHL_API_TOKEN` to the browser.

## Recommended tags

- `WNBC - Newsletter`
- `First Order Offer`
- `Contact Form`
- `Wholesale Lead`
- `DankNDevour Audience`
- `Coffee Customer`
- `Subscription Interest`
- `VIP Candidate`

Create matching tags in GHL before enabling automations.

## Custom fields to create

| Key | Purpose |
|---|---|
| `email_consent` | yes/no |
| `sms_consent` | yes/no |
| `form_source` | newsletter / first-order / contact / wholesale |
| `landing_page` | URL |
| `referring_url` | URL |
| `product_interest` | free text |
| `message` | free text |
| `company` | wholesale |
| `utm_source` / `utm_medium` / `utm_campaign` / `utm_term` / `utm_content` | attribution |
| `submitted_at` | ISO timestamp |

## Forms on the site

| Form | Endpoint | Source tag |
|---|---|---|
| Newsletter | `/api/newsletter` | Newsletter |
| First-order offer | `/api/newsletter` (`form=first-order`) | First Order Offer |
| Contact | `/api/contact` | Contact Form |
| Wholesale | `/api/ghl` | Wholesale Lead |

All forms include honeypot + basic IP rate limiting. Marketing consent checkboxes are never pre-checked. SMS consent is separate and optional.

## Chat widget (optional)

If you set `NEXT_PUBLIC_GHL_CHAT_WIDGET_ID`, add the official GHL embed snippet in a future pass (CSP already allows `*.gohighlevel.com` / `*.leadconnectorhq.com`). Widget HTML is intentionally not injected until an ID is confirmed.

## Compliance notes

- Capture email consent separately from SMS consent.
- Honor unsubscribe / STOP flows inside GHL.
- See `ghl-automation-plan.md` for workflow design.
