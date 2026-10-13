'use client';

import { useId, useState } from 'react';
import { Check, ChevronDown, Filter, RotateCcw, SlidersHorizontal, Star } from 'lucide-react';
import type { Product, SortKey } from '@/lib/catalog';
import { ProductCard } from '@/components/ProductCard';
import { AdSlot } from '@/components/AdSlot';

export type FilterState = {
  category: string;
  gender: '' | 'male' | 'female';
  brand: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  minDiscount: number;
  sort: SortKey;
  q: string;
};

type FilterProps = {
  filters: FilterState;
  brands: string[];
  onChange: (key: keyof FilterState, value: string | number) => void;
  onClear: () => void;
  onClose?: () => void;
};

function FilterControls({ filters, brands, onChange, onClear, onClose }: FilterProps) {
  const controlId = useId();
  return (
    <div className="filter-content">
      <div className="filter-sidebar-top"><h3>Filters</h3><button type="button" onClick={onClear}>CLEAR ALL</button>{onClose && <button className="filter-close" type="button" onClick={onClose} aria-label="Close filters">×</button>}</div>
      <div className="filter-group"><h4>Price</h4><div className="price-range-labels"><span>₹{filters.minPrice.toLocaleString('en-IN')}</span><span>₹{filters.maxPrice.toLocaleString('en-IN')}{filters.maxPrice >= 10000 ? '+' : ''}</span></div><input aria-label="Maximum price slider" type="range" min={Math.max(500, filters.minPrice)} max="10000" step="250" value={filters.maxPrice} onChange={event => onChange('maxPrice', Math.max(Number(event.target.value), filters.minPrice))} /><div className="price-bounds"><label>Min price<input aria-label="Minimum price" type="number" min="0" max={filters.maxPrice} step="250" value={filters.minPrice} onChange={event => onChange('minPrice', Math.min(Math.max(0, Number(event.target.value) || 0), filters.maxPrice))} /></label><label>Max price<input aria-label="Maximum price" type="number" min={Math.max(500, filters.minPrice)} max="10000" step="250" value={filters.maxPrice} onChange={event => onChange('maxPrice', Math.max(Math.max(500, filters.minPrice), Math.min(10000, Number(event.target.value) || 500)))} /></label></div></div>
      <div className="filter-group"><h4>Gender</h4><label className="filter-option"><input type="radio" name={`${controlId}-gender`} checked={filters.gender === ''} onChange={() => onChange('gender', '')} /><span className="filter-check" />All</label><label className="filter-option"><input type="radio" name={`${controlId}-gender`} checked={filters.gender === 'male'} onChange={() => onChange('gender', 'male')} /><span className="filter-check" />Men</label><label className="filter-option"><input type="radio" name={`${controlId}-gender`} checked={filters.gender === 'female'} onChange={() => onChange('gender', 'female')} /><span className="filter-check" />Women</label></div>
      <details className="filter-group brand-filter" open><summary><h4>Brand</h4><ChevronDown size={16} /></summary><div className="filter-brands">{brands.map(brand => <label className="filter-option" key={brand}><input type="checkbox" name={`${controlId}-brand`} checked={filters.brand === brand} onChange={() => onChange('brand', filters.brand === brand ? '' : brand)} /><span className="filter-check" />{brand}</label>)}</div></details>
      <div className="filter-group"><h4>Customer Ratings</h4><label className="filter-option"><input type="radio" name={`${controlId}-rating`} checked={filters.minRating === 0} onChange={() => onChange('minRating', 0)} /><span className="filter-check" />All ratings</label><label className="filter-option"><input type="radio" name={`${controlId}-rating`} checked={filters.minRating === 4} onChange={() => onChange('minRating', 4)} /><span className="filter-check" />4★ & above</label><label className="filter-option"><input type="radio" name={`${controlId}-rating`} checked={filters.minRating === 4.5} onChange={() => onChange('minRating', 4.5)} /><span className="filter-check" />4.5★ & above</label></div>
      <div className="filter-group"><h4>Discount</h4><label className="filter-option"><input type="radio" name={`${controlId}-discount`} checked={filters.minDiscount === 0} onChange={() => onChange('minDiscount', 0)} /><span className="filter-check" />All deals</label><label className="filter-option"><input type="radio" name={`${controlId}-discount`} checked={filters.minDiscount === 40} onChange={() => onChange('minDiscount', 40)} /><span className="filter-check" />40% or more</label><label className="filter-option"><input type="radio" name={`${controlId}-discount`} checked={filters.minDiscount === 60} onChange={() => onChange('minDiscount', 60)} /><span className="filter-check" />60% or more</label></div>
    </div>
  );
}

export function ProductGrid({ products, total, loading, hasMore, filters, brands, savedIds, onChange, onClear, onLoadMore, onWishlist, onAdd, onOpen }: {
  products: Product[];
  total: number;
  loading: boolean;
  hasMore: boolean;
  filters: FilterState;
  brands: string[];
  savedIds: Set<string>;
  onChange: (key: keyof FilterState, value: string | number) => void;
  onClear: () => void;
  onLoadMore: () => void;
  onWishlist: (product: Product) => void;
  onAdd: (product: Product) => void;
  onOpen: (product: Product) => void;
}) {
  const [mobileFilters, setMobileFilters] = useState(false);
  const title = filters.q ? `Search results for “${filters.q}”` : filters.category || 'All fashion';
  const filterControls = <FilterControls filters={filters} brands={brands} onChange={onChange} onClear={onClear} />;

  return (
    <section className="catalog-section" id="catalog" aria-labelledby="catalog-title">
      <div className="catalog-heading"><div><div className="catalog-breadcrumb">Home <span>›</span> Fashion <span>›</span> {title}</div><h2 id="catalog-title">{title} <small>({total.toLocaleString('en-IN')} items)</small></h2><p>Deals on great style, picked for your everyday.</p></div><label className="sort-select"><span>Sort by</span><select value={filters.sort} onChange={event => onChange('sort', event.target.value)} aria-label="Sort products"><option value="featured">Recommended</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="rating">Customer Rating</option><option value="discount">Discount</option></select><ChevronDown size={16} /></label></div>
      <div className="catalog-mobile-toolbar"><button type="button" onClick={() => setMobileFilters(true)}><SlidersHorizontal size={16} /> Filters</button><span>{total.toLocaleString('en-IN')} products</span><label className="sort-select compact"><select value={filters.sort} onChange={event => onChange('sort', event.target.value)} aria-label="Sort products"><option value="featured">Recommended</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="rating">Top Rated</option><option value="discount">Discount</option></select><ChevronDown size={14} /></label></div>
      <div className="catalog-layout"><aside className="filter-sidebar">{filterControls}<AdSlot ad={{ key: 'e76f5006c25d4677dd7e6ea2ec062770', width: 160, height: 600 }} className="ad-skyscraper" /></aside><div className="catalog-results">
        {filters.q && <div className="search-query-tag">Showing matches for <b>“{filters.q}”</b><button type="button" onClick={() => onChange('q', '')} aria-label="Clear search">×</button></div>}
        {loading && products.length > 0 && <div className="updating-bar"><span /> Updating your picks…</div>}
        {products.length === 0 && !loading ? <div className="no-products"><span><Filter size={23} /></span><h3>No products found</h3><p>Try adjusting your filters or search for a different style.</p><button type="button" onClick={onClear}><RotateCcw size={15} /> Clear filters</button></div> : <div className="product-grid">
          {loading && products.length === 0 ? Array.from({ length: 8 }, (_, index) => <div className="product-skeleton" key={index}><div /><span /><span /><span /></div>) : products.map(product => <ProductCard key={product.id} product={product} saved={savedIds.has(product.id)} onWishlist={onWishlist} onAdd={onAdd} onOpen={onOpen} />)}
        </div>}
        {hasMore && <div className="load-more-wrap"><button className="load-more" type="button" onClick={onLoadMore} disabled={loading}>{loading ? 'Loading more styles…' : 'Load more products'} <ChevronDown size={16} /></button><span>Showing {products.length} of {total.toLocaleString('en-IN')}</span></div>}
        {!hasMore && total > 0 && <p className="end-of-results"><Check size={14} /> You’ve seen all {total.toLocaleString('en-IN')} products</p>}
      </div></div>
      {mobileFilters && <div className="mobile-filter-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setMobileFilters(false); }}><aside className="mobile-filter-panel"><FilterControls filters={filters} brands={brands} onChange={onChange} onClear={onClear} onClose={() => setMobileFilters(false)} /><button className="apply-filter-button" type="button" onClick={() => setMobileFilters(false)}>Show {total.toLocaleString('en-IN')} results</button></aside></div>}
    </section>
  );
}
