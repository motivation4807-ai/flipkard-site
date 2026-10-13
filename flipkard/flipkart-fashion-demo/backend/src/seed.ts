import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pool } from './db.js';
import { logger } from './logger.js';

const filePath = process.env.CATALOG_JSON || (existsSync('/data/products.json') ? '/data/products.json' : resolve(process.cwd(), '../data/products.json'));
const products = JSON.parse(readFileSync(filePath, 'utf8')) as Array<Record<string, unknown>>;
const columns = ['id', 'title', 'category', 'gender', 'original_price', 'discounted_price', 'discount_percentage', 'rating', 'rating_count', 'images', 'sizes', 'in_stock', 'brand', 'color', 'description', 'badge'];

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (let start = 0; start < products.length; start += 40) {
      const batch = products.slice(start, start + 40);
      const values: unknown[] = [];
      const tuples = batch.map(product => {
        const row = columns.map(column => {
          const value = product[column];
          values.push(Array.isArray(value) ? JSON.stringify(value) : value);
          return `$${values.length}${column === 'images' || column === 'sizes' ? '::jsonb' : ''}`;
        });
        return `(${row.join(', ')})`;
      });
      const updates = columns.filter(column => column !== 'id' && column !== 'created_at').map(column => `${column}=EXCLUDED.${column}`).join(', ');
      await client.query(
        `INSERT INTO products (${columns.join(', ')}) VALUES ${tuples.join(', ')} ON CONFLICT (id) DO UPDATE SET ${updates}, updated_at=now()`,
        values
      );
    }
    await client.query('COMMIT');
    logger.info({ count: products.length, filePath }, 'Catalogue seed complete');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(error => { logger.error({ err: error instanceof Error ? error.message : String(error) }, 'Catalogue seed failed'); process.exit(1); });
