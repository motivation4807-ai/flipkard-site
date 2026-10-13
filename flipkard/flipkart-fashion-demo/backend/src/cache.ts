import { Redis } from 'ioredis';
import { logger } from './logger.js';

const redisUrl = process.env.REDIS_URL;
export const redis = redisUrl ? new Redis(redisUrl, {
  lazyConnect: true,
  enableOfflineQueue: false,
  maxRetriesPerRequest: 1,
  connectTimeout: 900,
  retryStrategy: attempt => Math.min(attempt * 200, 1500)
}) : null;

redis?.on('error', error => logger.warn({ err: error.message }, 'Redis cache unavailable; API will use PostgreSQL'));

function withDeadline<T>(promise: Promise<T>, milliseconds = 180): Promise<T> {
  return Promise.race([promise, new Promise<T>((_, reject) => {
    const timer = setTimeout(() => reject(new Error('Redis deadline exceeded')), milliseconds);
    timer.unref();
  })]);
}

export async function getCached<T>(key: string): Promise<T | null> {
  if (!redis) return null;
  try {
    const value = await withDeadline(redis.get(key));
    return value ? JSON.parse(value) as T : null;
  } catch (error) {
    logger.warn({ err: error instanceof Error ? error.message : String(error) }, 'Redis read failed');
    return null;
  }
}

export async function setCached(key: string, value: unknown, ttlSeconds = 45): Promise<void> {
  if (!redis) return;
  try { await withDeadline(redis.set(key, JSON.stringify(value), 'EX', ttlSeconds)); }
  catch (error) { logger.warn({ err: error instanceof Error ? error.message : String(error) }, 'Redis write failed'); }
}
