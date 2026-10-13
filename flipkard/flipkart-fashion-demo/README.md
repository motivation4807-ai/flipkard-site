# Flipkart-inspired fashion marketplace demo

A responsive, Flipkart-blue fashion storefront built with **Next.js 15, React 19, TypeScript, Tailwind CSS, and an Express/PostgreSQL/Redis catalogue API scaffold**. The app includes a deterministic **200-product clothing and footwear JSON catalogue** across the six requested categories.

This is a demo scaffold, not Flipkart's official site or a production capacity certification. Product brands/titles/prices/reviews are mock data; local WebP photography is sample imagery (source notes in [`docs/assets.md`](docs/assets.md)). The checkout and login remain demo flows.

## Run the storefront

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. The frontend works from the checked-in JSON catalogue with no backend required. Search/filter calls use the Next.js `/api/products` route, which can proxy to Express when `CATALOG_API_URL` is set.

## Validate / production build

```bash
npm run typecheck
npm run build
npm start
# In another terminal, with the server running:
npm run smoke
```

Regenerate the sample JSON after changing the definitions:

```bash
npm run catalog:generate
```

## Optional local full stack

Docker Compose starts Next.js, Express, PostgreSQL, Redis and a one-shot catalogue seed job. Set a non-default `POSTGRES_PASSWORD` before using it outside a throwaway local environment.

```bash
cp .env.example .env
POSTGRES_PASSWORD='local-only-change-me' docker compose -f infra/docker-compose.yml up --build
```

The compose file is for development/integration, not a 20k-user deployment. The API alone can be typechecked with `cd backend && npm ci && npm run typecheck`.

## Included UI

- Sticky blue header with search/autosuggest, login, wishlist and cart count; responsive category icon rail
- Auto-advancing promo slider and the three requested horizontal product sections
- Filterable, paginated 200-item grid: price range, gender, brand, rating, discount, search and sorting
- Product detail modal with image gallery, sizes, offer/price breakdown, stock, quantity, Add to Cart and Buy Now
- Optimistic local cart/wishlist interactions, mobile bottom navigation and lazy-loaded optimized images
- Responsive third-party ad placements: 728×90 desktop leaderboard, 320×50 mobile banner, 300×250 rectangle, 160×600 sidebar, 468×60 banner, 160×300 unit and a provider-filled in-page slot; two additional network scripts load lazily after page load, and a direct sponsor offer is a user-clicked link. The existing 728×90, 320×50, 300×250 and 160×600 slots are kept once rather than duplicated. Visible placements are labelled; browsers or ad blockers may prevent third-party rendering.
- Sample REST endpoint at `/api/products`; optional Express API with PostgreSQL connection pooling, parameterized query filters, Redis cache-aside, rate limiting, health probes and graceful shutdown

## Project structure

```text
app/
  api/products/route.ts     Next.js catalogue fallback/proxy
  globals.css               Tailwind layers + responsive storefront styles
  layout.tsx
  page.tsx                  ISR/server-rendered landing page
components/
  Header.tsx                Search/autosuggest, login, wishlist, cart
  CategoryRail.tsx
  BannerCarousel.tsx
  ProductCard.tsx
  ProductCarousel.tsx
  ProductGrid.tsx           Filters, pagination, loading/empty states
  ProductDetailModal.tsx    Gallery, sizes, offers and purchase actions
  CartDrawer.tsx
  MobileBottomBar.tsx
  AdSlot.tsx                Lazy third-party iframe/ad-format slots
  InPageAd.tsx              Provider-filled in-page placement
  MonetizationScripts.tsx   Deferred network scripts
  Storefront.tsx            Client state / API wiring
backend/
  src/                      Express routes, Redis cache, PostgreSQL pool
  sql/001_schema.sql        Indexed product schema
  Dockerfile
  package.json
  tsconfig.json
data/products.json          200 deterministic mock listings
public/products/*.webp      Local demo image assets
scripts/generate_catalog.py Catalogue generator
scripts/smoke_test.py      Runtime/API and asset smoke checks
infra/
  docker-compose.yml
  nginx.conf
  k8s/                      Example Deployments, Services, HPAs, PDBs, Ingress
load-tests/catalog.js       k6 ramp/soak template
docs/architecture.md        Capacity assumptions and deployment guidance
docs/assets.md              Image source notes and replacement guidance
```

## 20k traffic guidance

See [`docs/architecture.md`](docs/architecture.md). It covers CDN/CloudFront or Cloudflare, ISR, load balancing, Redis, PostgreSQL/PgBouncer pooling, Kubernetes HPA, observability and a k6 test ramp to 20,000 virtual users. **20,000 concurrent sessions do not equal 20,000 RPS**; there is no honest way to promise “zero crashes” or 99.9% uptime before production-like load testing and operational setup.
