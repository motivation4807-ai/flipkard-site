import { Router } from 'express';
import { z } from 'zod';
import { pool } from './db.js';
import { getCached, setCached } from './cache.js';
import { logger } from './logger.js';

export const productsRouter = Router();

const querySchema = z.object({
  page: z.coerce.number().int().min(1).max(10_000).default(1),
  limit: z.coerce.number().int().min(1).max(48).default(24),
  q: z.string().trim().max(120).optional(),
  category: z.string().trim().max(80).optional(),
  gender: z.enum(['male', 'female', 'unisex']).optional(),
  brand: z.string().trim().max(80).optional(),
  minPrice: z.coerce.number().int().min(0).optional(),
  maxPrice: z.coerce.number().int().min(0).optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  minDiscount: z.coerce.number().int().min(0).max(100).optional(),
  sort: z.enum(['featured', 'price-asc', 'price-desc', 'rating', 'discount']).default('featured')
}).refine(value => value.minPrice === undefined || value.maxPrice === undefined || value.minPrice <= value.maxPrice, {
  message: 'minPrice must be less than or equal to maxPrice'
});

const orderBy = {
  featured: 'featured_rank ASC, category ASC, rating DESC, rating_count DESC, id ASC',
  'price-asc': 'discounted_price ASC, id ASC',
  'price-desc': 'discounted_price DESC, id ASC',
  rating: 'rating DESC, rating_count DESC, id ASC',
  discount: 'discount_percentage DESC, rating DESC, id ASC'
} as const;

productsRouter.get('/', async (req, res, next) => {
  const parsed = querySchema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid catalogue filters', details: parsed.error.flatten().fieldErrors });
    return;
  }
  const filters = parsed.data;
  const cacheKey = `catalog:v1:${JSON.stringify(filters)}`;

  try {
    const cached = await getCached<unknown>(cacheKey);
    if (cached) {
      res.set('X-Cache', 'HIT').set('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=120').json(cached);
      return;
    }

    const where: string[] = [];
    const values: unknown[] = [];
    const add = (sql: string, value: unknown) => { values.push(value); where.push(sql.replace('?', `$${values.length}`)); };
    if (filters.category) add('category = ?', filters.category);
    if (filters.gender) add('gender = ?', filters.gender);
    if (filters.brand) add('brand = ?', filters.brand);
    if (filters.minPrice !== undefined) add('discounted_price >= ?', filters.minPrice);
    if (filters.maxPrice !== undefined) add('discounted_price <= ?', filters.maxPrice);
    if (filters.minRating !== undefined) add('rating >= ?', filters.minRating);
    if (filters.minDiscount !== undefined) add('discount_percentage >= ?', filters.minDiscount);
    if (filters.q) add("search_document @@ websearch_to_tsquery('simple', ?)", filters.q);
    const whereSql = where.length ? where.join(' AND ') : 'true';
    const limitPosition = values.length + 1;
    const offsetPosition = values.length + 2;
    values.push(filters.limit, (filters.page - 1) * filters.limit);

    const result = await pool.query(
      `SELECT id, title, category, gender,
              original_price::float8 AS original_price,
              discounted_price::float8 AS discounted_price,
              discount_percentage,
              rating::float8 AS rating,
              rating_count, images, sizes, in_stock, brand, color, description, badge,
              ROW_NUMBER() OVER (PARTITION BY category ORDER BY in_stock DESC, rating DESC, rating_count DESC, id ASC) AS featured_rank,
              COUNT(*) OVER()::int AS total_count
       FROM products
       WHERE ${whereSql}
       ORDER BY ${orderBy[filters.sort]}
       LIMIT $${limitPosition} OFFSET $${offsetPosition}`,
      values
    );
    const total = Number(result.rows[0]?.total_count || 0);
    const items = result.rows.map(({ total_count: _totalCount, featured_rank: _featuredRank, ...product }) => product);
    const response = { items, total, page: filters.page, limit: filters.limit, pages: Math.ceil(total / filters.limit) };
    await setCached(cacheKey, response, 45);
    res.set('X-Cache', 'MISS').set('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=120').json(response);
  } catch (error) {
    logger.error({ err: error instanceof Error ? error.message : String(error) }, 'Product query failed');
    next(error);
  }
});
