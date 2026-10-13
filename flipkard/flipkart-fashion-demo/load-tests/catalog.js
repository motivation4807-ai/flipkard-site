import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

const apiErrors = new Rate('catalog_api_errors');
const catalogLatency = new Trend('catalog_latency_ms', true);
const baseUrl = __ENV.BASE_URL || 'http://localhost:3000';

export const options = {
  scenarios: {
    active_shoppers: {
      executor: 'ramping-vus',
      startVUs: 25,
      stages: [
        { duration: '2m', target: 500 },
        { duration: '3m', target: 2500 },
        { duration: '5m', target: 10000 },
        { duration: '5m', target: 20000 },
        { duration: '10m', target: 20000 },
        { duration: '3m', target: 0 }
      ],
      gracefulRampDown: '30s'
    }
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500', 'p(99)<1200'],
    catalog_api_errors: ['rate<0.01'],
    catalog_latency_ms: ['p(95)<400']
  }
};

export default function () {
  const response = http.get(`${baseUrl}/api/products?page=1&limit=24&sort=featured`, {
    headers: { Accept: 'application/json' }, tags: { route: 'catalog-list' }
  });
  const ok = check(response, {
    'catalog returns 200': r => r.status === 200,
    'catalog returns product array': r => {
      try { return Array.isArray(JSON.parse(r.body).items); } catch { return false; }
    }
  });
  apiErrors.add(!ok);
  catalogLatency.add(response.timings.duration);
  sleep(Math.random() * 2 + 1);
}
