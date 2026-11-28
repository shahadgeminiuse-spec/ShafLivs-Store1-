# ShafLivs Store

One file runs everything: `index.html`.

- `/` customer storefront (scroll camera-move, combos, products, bag, WhatsApp checkout)
- `/#admin` admin dashboard (staff log in here too; their role decides what they see)
- `/#/insights` owner business intelligence

Data lives in Supabase (publishable key only; access is enforced by RLS).
Storefront colours follow Admin, Store Settings, Customer website theme (auto, manual or daily).
