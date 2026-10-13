import express, { type ErrorRequestHandler } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { pinoHttp } from 'pino-http';
import { pool } from './db.js';
import { redis } from './cache.js';
import { logger } from './logger.js';
import { productsRouter } from './products.route.js';

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', Number(process.env.TRUST_PROXY_HOPS || 1));
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',').map(value => value.trim()) : false,
  credentials: false,
  maxAge: 600
}));
app.use(express.json({ limit: '32kb' }));
app.use(pinoHttp({ logger, redact: ['req.headers.authorization', 'req.headers.cookie'] }));
app.use('/api', rateLimit({
  windowMs: 60_000,
  limit: Number(process.env.API_RATE_LIMIT_PER_MINUTE || 1200),
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skip: request => request.path.startsWith('/health')
}));

app.get('/health/live', (_req, res) => res.status(200).json({ status: 'live' }));
app.get('/health/ready', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ status: 'ready', dependencies: { postgres: 'ready', redis: redis ? redis.status : 'disabled' } });
  } catch {
    res.status(503).json({ status: 'not-ready', dependencies: { postgres: 'unavailable' } });
  }
});
app.use('/api/products', productsRouter);

app.use((_req, res) => res.status(404).json({ error: 'Not found' }));
const errors: ErrorRequestHandler = (error, _req, res, _next) => {
  logger.error({ err: error instanceof Error ? error.message : String(error) }, 'Unhandled API error');
  if (res.headersSent) return;
  res.status(500).json({ error: 'Internal server error' });
};
app.use(errors);

const port = Number(process.env.PORT || 4000);
const server = app.listen(port, '0.0.0.0', () => logger.info({ port }, 'Catalog API listening'));
server.keepAliveTimeout = 65_000;
server.headersTimeout = 66_000;
server.requestTimeout = 15_000;
server.maxRequestsPerSocket = 1000;

let shuttingDown = false;
async function shutdown(signal: string) {
  if (shuttingDown) return;
  shuttingDown = true;
  logger.info({ signal }, 'Graceful shutdown started');
  const force = setTimeout(() => process.exit(1), 10_000).unref();
  server.close(async error => {
    if (error) logger.error({ err: error.message }, 'HTTP close failed');
    await Promise.allSettled([pool.end(), redis?.quit() || Promise.resolve()]);
    clearTimeout(force);
    process.exit(error ? 1 : 0);
  });
}
process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));
