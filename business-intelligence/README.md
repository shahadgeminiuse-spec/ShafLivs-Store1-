# ShafLivs Business Intelligence

Separate business intelligence dashboard for ShafLivs Store.

## Deployment
- Static single-page app in this directory.
- Vercel root directory: `business-intelligence`.
- No build command required.
- Uses the existing Supabase project and existing Supabase Auth accounts.
- Public publishable key only; never add a service-role key to frontend code.

## Access
- Owner: financial analytics, product purchase costs, price updates, location and marketing analytics.
- Staff: own POS activity and permitted stock information only.
- Access is enforced by existing Supabase RLS policies plus the app role gate.

## Analytics privacy
The `bi-track` Edge Function records coarse edge-provided location (country/region/city) and event metadata only after visitors opt in through the storefront consent banner. It does not read or store raw visitor IP addresses. The visitor session ID is a random browser-generated UUID. Visitors can decline analytics.

## Data
Reads existing products, variants, variant costs, stock, orders, order items, purchases, social posts and social insights. Adds only:
- `bi_visitor_events` for coarse visitor analytics.
- `bi_price_change_log` for audit history of owner-approved selling-price changes.

The app never edits historical orders, purchases, or existing customer records.
