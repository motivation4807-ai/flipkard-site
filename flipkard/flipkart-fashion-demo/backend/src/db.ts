import pg from 'pg';
import { logger } from './logger.js';

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is required by the catalog API');

export const pool = new Pool({
  connectionString,
  max: Number(process.env.PG_POOL_MAX || 20),
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 1_200,
  query_timeout: 4_000,
  statement_timeout: 3_500,
  keepAlive: true,
  application_name: 'fashion-catalog-api',
  ssl: process.env.PG_SSL === 'true' ? { rejectUnauthorized: true } : undefined
});

pool.on('error', error => logger.error({ err: error.message }, 'Unexpected idle PostgreSQL client error'));
