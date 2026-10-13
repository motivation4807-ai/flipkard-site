'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BadgePercent, Check, ChevronRight, PackageCheck, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import type { Product } from '@/lib/catalog';
import { Header } from '@/components/Header';
import { BannerCarousel } from '@/components/BannerCarousel';
import { ProductCarousel } from '@/components/ProductCarousel';
import { ProductGrid, type FilterState } from '@/components/ProductGrid';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { CartDrawer, type CartLine } from '@/components/CartDrawer';
import { MobileBottomBar } from '@/components/MobileBottomBar';
import { AdSlot } from '@/components/AdSlot';
import { MonetizationScripts } from '@/components/MonetizationScripts';
import { InPageAd } from '@/components/InPageAd';

const PAGE_SIZE = 24;
const CART_KEY = 'flipkart-fashion-demo-cart-v1';
const WISH_KEY = 'flipkart-fashion-demo-wishlist-v1';
const createFilters = (): FilterState => ({ category: '', gender: '', brand: '', minPrice: 0, maxPrice: 10000, minRating: 0, minDiscount: 0, sort: 'featured', q: '' });

type StorefrontProps = {
  initialProducts: Product[];
  initialTotal: number;
  dealProducts: Product[];
  trendingProducts: Product[];
  footwearProducts: Product[];
  brands: string[];
};

function readStorage<T>(key: string, fallback: T): T {
  try { const data = localStorage.getItem(key); return data ? JSON.parse(data) as T : fallback; }
  catch { return fallback; }
}

export function Storefront({ initialProducts, initialTotal, dealProducts, trendingProducts, footwearProducts, brands }: StorefrontProps) {
  const [filters, setFilters] = useState<FilterState>(createFilters);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [drawerMode, setDrawerMode] = useState<'cart' | 'wishlist' | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [notice, setNotice] = useState('');
  const didMount = useRef(false);
  const toastTimer = useRef<number | null>(null);
  const loadMoreController = useRef<AbortController | null>(null);
  const loadingMoreRef = useRef(false);

  const savedIds = useMemo(() => new Set(wishlist.map(product => product.id)), [wishlist]);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const hasMore = products.length < total;

  useEffect(() => {
    setCart(readStorage<CartLine[]>(CART_KEY, []));
    setWishlist(readStorage<Product[]>(WISH_KEY, []));
  }, []);

  const notify = useCallback((message: string) => {
    setNotice(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setNotice(''), 2600);
  }, []);

  function makeUrl(nextPage: number) {
    const params = new URLSearchParams({ page: String(nextPage), limit: String(PAGE_SIZE), sort: filters.sort });
    if (filters.category) params.set('category', filters.category);
    if (filters.gender) params.set('gender', filters.gender);
    if (filters.brand) params.set('brand', filters.brand);
    if (filters.minPrice > 0) params.set('minPrice', String(filters.minPrice));
    if (filters.maxPrice < 10000) params.set('maxPrice', String(filters.maxPrice));
    if (filters.minRating > 0) params.set('minRating', String(filters.minRating));
    if (filters.minDiscount > 0) params.set('minDiscount', String(filters.minDiscount));
    if (filters.q.trim()) params.set('q', filters.q.trim());
    return `/api/products?${params.toString()}`;
  }

  useEffect(() => {
    if (!didMount.current) { didMount.current = true; return; }
    loadMoreController.current?.abort();
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(makeUrl(1), { signal: controller.signal });
        if (!response.ok) throw new Error('Unable to load products');
        const data = await response.json();
        setProducts(data.items || []);
        setTotal(data.total || 0);
        setPage(1);
      } catch (error) {
        if (!controller.signal.aborted) notify('Could not refresh the catalogue. Please try again.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 160);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
      loadMoreController.current?.abort();
    };
    // makeUrl reads the filter snapshot; including its fields avoids stale requests.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const updateFilter = useCallback((key: keyof FilterState, value: string | number) => {
    setFilters(current => ({ ...current, [key]: value }) as FilterState);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(createFilters());
  }, []);

  function chooseCategory(category: string) {
    setFilters({ ...createFilters(), category });
    window.setTimeout(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
  }

  function searchProducts(query: string) {
    setFilters({ ...createFilters(), q: query });
    if (query) window.setTimeout(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
  }

  async function loadMore() {
    if (loading || loadingMoreRef.current || !hasMore) return;
    const nextPage = page + 1;
    const controller = new AbortController();
    loadMoreController.current = controller;
    loadingMoreRef.current = true;
    setLoading(true);
    try {
      const response = await fetch(makeUrl(nextPage), { signal: controller.signal });
      if (!response.ok) throw new Error('Unable to load more products');
      const data = await response.json();
      if (controller.signal.aborted) return;
      setProducts(current => [...current, ...(data.items || [])]);
      setTotal(data.total ?? total);
      setPage(nextPage);
    } catch {
      if (!controller.signal.aborted) notify('Could not load more products. Please try again.');
    } finally {
      if (loadMoreController.current === controller) {
        loadMoreController.current = null;
        loadingMoreRef.current = false;
        setLoading(false);
      }
    }
  }

  function saveCart(next: CartLine[]) {
    setCart(next);
    try { localStorage.setItem(CART_KEY, JSON.stringify(next)); } catch { /* Keep the cart usable for this session. */ }
  }

  function addToCart(product: Product, size = product.sizes[0] || 'One size', quantity = 1, buyNow = false) {
    if (!product.in_stock) { notify('This item is currently out of stock.'); return; }
    const existing = cart.find(item => item.product.id === product.id && item.size === size);
    const next = existing
      ? cart.map(item => item === existing ? { ...item, quantity: Math.min(10, item.quantity + quantity) } : item)
      : [...cart, { product, size, quantity }];
    saveCart(next);
    setSelectedProduct(null);
    notify(`${product.title} added to cart`);
    if (buyNow) setDrawerMode('cart');
  }

  function changeQuantity(id: string, size: string, delta: number) {
    const next = cart.map(item => item.product.id === id && item.size === size ? { ...item, quantity: Math.min(10, item.quantity + delta) } : item).filter(item => item.quantity > 0);
    saveCart(next);
  }

  function removeCartItem(id: string, size: string) {
    saveCart(cart.filter(item => !(item.product.id === id && item.size === size)));
  }

  function toggleWishlist(product: Product) {
    const exists = wishlist.some(item => item.id === product.id);
    const next = exists ? wishlist.filter(item => item.id !== product.id) : [...wishlist, product];
    setWishlist(next);
    try { localStorage.setItem(WISH_KEY, JSON.stringify(next)); } catch { /* Session-only wishlist fallback. */ }
    notify(exists ? 'Removed from your wishlist' : 'Saved to your wishlist');
  }

  function addWishlistToCart(product: Product) {
    addToCart(product, product.sizes[0] || 'One size');
  }

  function onDetailAction(product: Product, size: string, quantity: number, buyNow: boolean) {
    addToCart(product, size, quantity, buyNow);
  }

  function checkout() {
    setDrawerMode(null);
    notify('Demo checkout — connect a payment provider to place orders.');
  }

  return (
    <div id="top" className="storefront-shell">
      <MonetizationScripts />
      <div className="announcement"><span><Sparkles size={14} /> The Big Fashion Sale is on</span><span>Extra 10% off with prepaid orders <b>·</b> Free delivery on orders over ₹499</span><a href="#deals">Shop deals <ChevronRight size={13} /></a></div>
      <Header cartCount={cartCount} wishlistCount={wishlist.length} selectedCategory={filters.category} onCategory={chooseCategory} onCart={() => setDrawerMode('cart')} onWishlist={() => setDrawerMode('wishlist')} onLogin={() => notify('Login is a demo flow — connect your authentication provider.')} onSearch={searchProducts} />

      <main>
        <div className="page-container">
          <BannerCarousel onCategory={chooseCategory} />
          <div className="ad-top-placement" aria-label="Sponsored placement">
            <AdSlot ad={{ key: '5246e95270c8d5305210111dfe1d0345', width: 728, height: 90 }} className="ad-leaderboard" eager />
            <AdSlot ad={{ key: 'f625c250aa840a836f699abc397dc8db', width: 320, height: 50 }} className="ad-mobile-banner" eager />
          </div>
          <div className="assurance-row"><div><span><Truck size={20} /></span><p><b>Fast, free delivery</b><small>On orders over ₹499</small></p></div><i /><div><span><ShieldCheck size={20} /></span><p><b>Quality you can trust</b><small>Curated style picks</small></p></div><i /><div><span><PackageCheck size={20} /></span><p><b>Easy 7-day returns</b><small>Shop without a worry</small></p></div><i /><div><span><BadgePercent size={20} /></span><p><b>Great prices, daily</b><small>Deals worth a look</small></p></div></div>
          <ProductCarousel id="deals" eyebrow="LIMITED-TIME OFFERS" title="Deal of the Day" products={dealProducts} savedIds={savedIds} onWishlist={toggleWishlist} onAdd={product => addToCart(product)} onOpen={setSelectedProduct} />
          <AdSlot ad={{ key: 'b8cfe8e80bb5d3e975c8731b0d2a4f16', width: 468, height: 60 }} className="ad-mid-banner" />
          <ProductCarousel id="trending" eyebrow="TRENDING RIGHT NOW" title="Trending Clothing" products={trendingProducts} savedIds={savedIds} onWishlist={toggleWishlist} onAdd={product => addToCart(product)} onOpen={setSelectedProduct} />
          <ProductCarousel id="footwear" eyebrow="A STEP IN THE RIGHT DIRECTION" title="Footwear Picks" products={footwearProducts} savedIds={savedIds} onWishlist={toggleWishlist} onAdd={product => addToCart(product)} onOpen={setSelectedProduct} />
          <div className="ad-inline-pair">
            <AdSlot ad={{ key: '0892ebfcdc26c97e6953388054566765', width: 300, height: 250 }} className="ad-rectangle-placement" />
            <AdSlot ad={{ key: 'b2302a231a1622a15b105024b4d6f354', width: 160, height: 300 }} className="ad-secondary-rectangle" />
          </div>
          <ProductGrid products={products} total={total} loading={loading} hasMore={hasMore} filters={filters} brands={brands} savedIds={savedIds} onChange={updateFilter} onClear={clearFilters} onLoadMore={loadMore} onWishlist={toggleWishlist} onAdd={product => addToCart(product)} onOpen={setSelectedProduct} />
          <div className="sponsored-link-card">
            <span className="sponsored-link-tag">Sponsored link</span>
            <div><strong>Explore a partner offer</strong><small>Opens an external sponsor page in a new tab.</small></div>
            <a href="https://www.profitableratecpmnetwork.com/r8atcdh7?key=1e44eda275c7601d524bc645e68550e8" target="_blank" rel="sponsored noopener noreferrer">Visit offer ↗</a>
          </div>
          <InPageAd />
          <div className="trust-footer"><div className="trust-brand"><span className="fk-bag-mark">F</span><div><strong>Style finds for every day</strong><small>Fashion and footwear picks, in one easy place.</small></div></div><div className="trust-notes"><span><Check size={14} /> Secure demo checkout</span><span><Check size={14} /> Responsive by design</span><span><Check size={14} /> Local sample catalogue</span></div><a href="#top">Back to top ↑</a></div>
          <footer className="site-footer"><span>Demo storefront · Product names, prices and reviews are sample data.</span><span>Blue #2874f0 <b>·</b> Yellow #ffe500 <b>·</b> Built with Next.js + Tailwind</span></footer>
        </div>
      </main>

      <ProductDetailModal product={selectedProduct} saved={selectedProduct ? savedIds.has(selectedProduct.id) : false} onClose={() => setSelectedProduct(null)} onWishlist={toggleWishlist} onAdd={onDetailAction} />
      <CartDrawer mode={drawerMode} cart={cart} wishlist={wishlist} onClose={() => setDrawerMode(null)} onQuantity={changeQuantity} onRemove={removeCartItem} onRemoveWish={id => { const item = wishlist.find(product => product.id === id); if (item) toggleWishlist(item); }} onAddWish={addWishlistToCart} onCheckout={checkout} />
      <MobileBottomBar cartCount={cartCount} wishlistCount={wishlist.length} onHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })} onCategories={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })} onWishlist={() => setDrawerMode('wishlist')} onCart={() => setDrawerMode('cart')} />
      {notice && <div className="toast" role="status"><Check size={17} /> {notice}</div>}
    </div>
  );
}
