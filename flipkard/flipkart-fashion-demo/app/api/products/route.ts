import { NextRequest, NextResponse } from 'next/server';
import { getCatalogPage, type CatalogFilters, type Gender, type SortKey } from '@/lib/catalog';

export const revalidate = 30;

function readNumber(value: string | null): number | undefined {
  if (!value) return undefined;
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const filters: CatalogFilters = {
    page: readNumber(params.get('page')),
    limit: readNumber(params.get('limit')),
    q: params.get('q')?.slice(0, 120) || undefined,
    category: params.get('category') || undefined,
    gender: (params.get('gender') || undefined) as Gender | undefined,
    brand: params.get('brand') || undefined,
    minPrice: readNumber(params.get('minPrice')),
    maxPrice: readNumber(params.get('maxPrice')),
    minRating: readNumber(params.get('minRating')),
    minDiscount: readNumber(params.get('minDiscount')),
    sort: (params.get('sort') || 'featured') as SortKey
  };

  const upstream = process.env.CATALOG_API_URL;
  if (upstream) {
    try {
      const target = new URL(upstream);
      params.forEach((value, key) => target.searchParams.set(key, value));
      const response = await fetch(target, { headers: { accept: 'application/json' }, cache: 'no-store', signal: AbortSignal.timeout(2500) });
      if (!response.ok) throw new Error(`Catalog API returned ${response.status}`);
      return NextResponse.json(await response.json(), {
        headers: { 'Cache-Control': 'public, max-age=0, s-maxage=30, stale-while-revalidate=120' }
      });
    } catch {
      // Keep the demo usable if its optional backend is unavailable; alert/monitor this fallback in production.
    }
  }

  return NextResponse.json(getCatalogPage(filters), {
    headers: { 'Cache-Control': 'public, max-age=0, s-maxage=30, stale-while-revalidate=120' }
  });
}
