# dayline storefront

A responsive, self-contained e-commerce storefront demo with a 100-item sample catalogue, built with semantic HTML, locally compiled Tailwind CSS, and vanilla JavaScript. No runtime framework, CDN, remote font, or external image request is required.

## Run locally

```bash
npm install
npm run build:css
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Included interactions

- Responsive sticky header, category navigation, search suggestions, live product filtering, and sorting
- Three-slide promotional carousel and live flash-sale countdown
- Lazy-loaded WebP product cards, quick add, product detail modal, gallery crop controls, stock/price breakdown, and buy-now flow
- Cart and wishlist drawers with quantity controls and `localStorage` persistence
- Demo newsletter form and checkout/sign-in placeholders ready to connect to real services

Product catalogue, prices, ratings, and stock values are demo data. The locally optimized WebP product photos are sample imagery; replace them with your own catalogue assets before production. Authentication, newsletter sign-up, and checkout are intentionally demo flows—connect the functions in `app.js` to your API, auth provider, email service, and payment processor.
