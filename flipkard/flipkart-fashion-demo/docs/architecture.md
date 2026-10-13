# Production architecture notes

This repository is a **demo and deployment scaffold**, not a measured 20,000-user production deployment. The JSON catalogue, local cart/wishlist, sample deals, and offer copy are mock data. The site is branded as a Flipkart-inspired demo; it is not affiliated with Flipkart.

## Request path

```text
Browser
  ├── Cloudflare / CloudFront + WAF (TLS, bot controls, static cache)
  ├── CDN object storage: versioned product WebP/AVIF assets in S3/GCS
  └── regional load balancer / Kubernetes Ingress
        ├── Next.js web pods (stateless, SSR/ISR, 3+ replicas)
        │     └── /api/products proxy (catalog response cache headers)
        └── Express catalog API pods (stateless, 3+ replicas, HPA)
              ├── Redis cluster / ElastiCache (cache-aside, short TTL)
              └── PgBouncer transaction pool → PostgreSQL primary + read replicas
```

For a catalogue-heavy shop, pre-render category/landing pages with Next.js ISR, serve immutable `/_next/static/*` and product media from a CDN, and keep only personalized/cart/checkout work dynamic. Use a separate object-storage bucket and CDN hostname for production images; the checked-in local WebP files are demo assets.

## Catalogue and cache

- `app/page.tsx` renders a 24-item server-rendered first page and revalidates it every 60 seconds. `app/api/products/route.ts` provides a JSON fallback and can proxy to `CATALOG_API_URL`.
- `backend/src/products.route.ts` validates query values, parameterizes SQL, caps page size at 48, returns cache headers, and uses a Redis cache-aside key containing normalized filters. Redis failure degrades to PostgreSQL rather than failing the browse request.
- Current demo Redis TTL is 45 seconds; tune it to inventory freshness requirements. Invalidate or version cache keys on product/price/stock changes. Never cache user-specific account/order responses in a public CDN cache.
- SQL indexes cover category, gender, brand, price, rating, stock and full-text search. A single-node schema is intentionally used here; begin with read replicas and partition large order/event tables before considering product sharding.

## Capacity and the 20k target

`20,000 active concurrent shoppers` is **not** the same as 20,000 requests/second. Capacity planning requires a measured think-time/request mix. For example, one catalogue request every five seconds averages roughly 4,000 RPS before cache effects; a 3× campaign burst would be roughly 12,000 RPS. Treat those as load-test scenarios, not capacity claims.

The included k6 test ramps to 20,000 virtual users with a 1–3 second think time. Run it only against a dedicated staging environment with production-like CDN, Redis, database, networking and seeded data. Measure both cached and cache-bypass paths, p50/p95/p99 latency, error rate, queue depth, DB pool wait time, cache hit ratio and saturation. Adjust the request mix from real analytics. Do not run a 20k-VU test against a laptop or an unapproved public endpoint.

Starting Kubernetes values in `infra/k8s/` are placeholders, not a validated sizing plan:

- Web: 3 minimum / 40 maximum replicas; API: 3 minimum / 30 maximum replicas, spread across zones, rolling updates and PodDisruptionBudgets.
- API Postgres pool defaults to 12 per pod in manifests. The aggregate pool across all pods must stay below the database connection budget. Put PgBouncer/RDS Proxy in front, cap application pools (often 4–12 per pod to start), and reserve capacity for migrations, monitoring and failover.
- Use managed, multi-AZ PostgreSQL with point-in-time recovery, automated backups and read replicas. Use managed Redis/ElastiCache with replicas and eviction policy sized for the working set.
- Configure CDN cache rules for immutable assets (`max-age=31536000, immutable`) and short-lived public catalogue results (`s-maxage`, `stale-while-revalidate`). Add WAF/bot protection, request timeouts, circuit breakers, rate limits and graceful shutdown.

## Service levels and validation

- A 2-second load goal should be defined as a Core Web Vitals budget (for example, mobile p75 LCP ≤ 2.5 seconds as an initial measurable target), not assumed from code. Test on representative Indian mobile networks and devices.
- 99.9% monthly availability requires multi-zone redundancy, health probes, rollbacks, database recovery, observability and an incident process. It is not guaranteed by this demo.
- “Zero crashes” cannot be promised; use fault-injection and soak tests, alerts, autoscaling, queue/backpressure limits, and graceful degradation. Track an explicit error-budget/SLO.
- Export RED metrics (rate, errors, duration), Node.js event-loop lag, Pg pool acquisition wait, Redis hit/miss, CDN hit ratio, Core Web Vitals and structured request logs. Add OpenTelemetry tracing before launch.

## Scaling readiness / data ownership

- Keep web/API instances stateless. Store session/cart/order truth in durable services, not process memory. This UI currently uses `localStorage` and must be replaced by authenticated server-side carts for production.
- Use idempotency keys for checkout, an order/payment service, and an asynchronous queue for email, inventory fan-out and analytics. Keep payments out of this catalogue API.
- The schema and route use stable product IDs and indexed filters. If write volume or data size justifies it, partition large event/order tables by time or tenant; introduce product sharding only after measuring a single primary + replicas + PgBouncer.

## Local validation

```bash
npm ci
npm run typecheck
npm run build

# Optional full stack (requires Docker Compose)
cp .env.example .env
docker compose -f infra/docker-compose.yml up --build

# Load test against an approved staging URL
k6 run -e BASE_URL=https://staging.example.com load-tests/catalog.js
```
