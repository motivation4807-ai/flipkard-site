import productsData from '@/data/products.json';

export type Gender = 'male' | 'female' | 'unisex';
export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount';

export interface Product {
  id: string;
  title: string;
  category: string;
  gender: Gender;
  original_price: number;
  discounted_price: number;
  discount_percentage: number;
  rating: number;
  rating_count: number;
  images: string[];
  sizes: string[];
  in_stock: boolean;
  brand: string;
  color: string;
  description: string;
  badge: string;
}

export interface CatalogFilters {
  page?: number;
  limit?: number;
  q?: string;
  category?: string;
  gender?: Gender | '';
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  minDiscount?: number;
  sort?: SortKey;
}

export interface CatalogPage {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  pages: number;
  facets: {
    categories: string[];
    brands: string[];
  };
}

export const allProducts = productsData as Product[];
export const categories = [...new Set(allProducts.map(product => product.category))];
export const brands = [...new Set(allProducts.map(product => product.brand))].sort((a, b) => a.localeCompare(b));

export function getCatalogPage(filters: CatalogFilters = {}): CatalogPage {
  const page = Math.max(1, Math.floor(Number(filters.page) || 1));
  const limit = Math.min(48, Math.max(1, Math.floor(Number(filters.limit) || 24)));
  const query = filters.q?.trim().toLowerCase() || '';
  let result = allProducts.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.gender && product.gender !== filters.gender) return false;
    if (filters.brand && product.brand !== filters.brand) return false;
    if (Number.isFinite(filters.minPrice) && product.discounted_price < Number(filters.minPrice)) return false;
    if (Number.isFinite(filters.maxPrice) && product.discounted_price > Number(filters.maxPrice)) return false;
    if (Number.isFinite(filters.minRating) && product.rating < Number(filters.minRating)) return false;
    if (Number.isFinite(filters.minDiscount) && product.discount_percentage < Number(filters.minDiscount)) return false;
    if (query) {
      const searchable = `${product.title} ${product.brand} ${product.category} ${product.color}`.toLowerCase();
      if (!searchable.includes(query)) return false;
    }
    return true;
  });

  switch (filters.sort ?? 'featured') {
    case 'featured': {
      const ranked = categories.map(category => result.filter(product => product.category === category).sort((a, b) => Number(b.in_stock) - Number(a.in_stock) || b.rating - a.rating || b.rating_count - a.rating_count || a.id.localeCompare(b.id)));
      const mixed: Product[] = [];
      for (let rank = 0; ; rank += 1) {
        const before = mixed.length;
        ranked.forEach(categoryProducts => { if (categoryProducts[rank]) mixed.push(categoryProducts[rank]); });
        if (mixed.length === before) break;
      }
      result = mixed;
      break;
    }
    case 'price-asc': result = result.slice().sort((a, b) => a.discounted_price - b.discounted_price); break;
    case 'price-desc': result = result.slice().sort((a, b) => b.discounted_price - a.discounted_price); break;
    case 'rating': result = result.slice().sort((a, b) => b.rating - a.rating || b.rating_count - a.rating_count); break;
    case 'discount': result = result.slice().sort((a, b) => b.discount_percentage - a.discount_percentage); break;
  }

  const total = result.length;
  const offset = (page - 1) * limit;
  return {
    items: result.slice(offset, offset + limit),
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
    facets: { categories, brands }
  };
}
