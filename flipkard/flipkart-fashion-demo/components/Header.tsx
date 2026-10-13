'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Heart, Search, ShoppingCart, UserRound, X } from 'lucide-react';
import type { Product } from '@/lib/catalog';
import { CategoryRail } from '@/components/CategoryRail';

type HeaderProps = {
  cartCount: number;
  wishlistCount: number;
  selectedCategory: string;
  onCategory: (category: string) => void;
  onCart: () => void;
  onWishlist: () => void;
  onLogin: () => void;
  onSearch: (query: string) => void;
};

export function Header({ cartCount, wishlistCount, selectedCategory, onCategory, onCart, onWishlist, onLogin, onSearch }: HeaderProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const term = query.trim();
    if (!term) { setSuggestions([]); return; }
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/products?q=${encodeURIComponent(term)}&limit=5`, { signal: controller.signal });
        if (!response.ok) throw new Error('Suggestion request failed');
        const data = await response.json();
        if (!controller.signal.aborted) setSuggestions(data.items || []);
      } catch {
        if (!controller.signal.aborted) setSuggestions([]);
      }
    }, 140);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [query]);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(query.trim());
    setShowSuggestions(false);
  }

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="main-header">
        <div className="main-header-inner">
          <a className="fk-wordmark" href="#top" aria-label="Flipkart demo home">
            <span className="fk-bag-mark" aria-hidden="true"><ShoppingCart size={21} strokeWidth={2.4} /></span>
            <span className="fk-wordmark-copy"><strong>Flipkart</strong><small>Explore <b>Plus</b></small></span>
          </a>

          <form
            className="header-search"
            onSubmit={submit}
            onBlur={event => {
              const nextTarget = event.relatedTarget as Node | null;
              if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
                window.setTimeout(() => setShowSuggestions(false), 0);
              }
            }}
            role="search"
          >
            <Search size={19} className="search-icon" aria-hidden="true" />
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={event => { if (event.key === 'Escape') setShowSuggestions(false); }}
              placeholder="Search for products, brands and more"
              aria-label="Search fashion and footwear"
              aria-expanded={showSuggestions && suggestions.length > 0}
            />
            {query && <button type="button" className="search-clear" aria-label="Clear search" onClick={() => { setQuery(''); onSearch(''); }}><X size={16} /></button>}
            <button className="search-submit" type="submit" aria-label="Search"><Search size={18} /></button>
            {showSuggestions && suggestions.length > 0 && (
              <div className="search-suggestions" role="listbox">
                <div className="suggestion-title">Popular matches</div>
                {suggestions.slice(0, 5).map(product => (
                  <button key={product.id} type="button" role="option" className="suggestion-option" onClick={() => { setQuery(product.title); setShowSuggestions(false); onSearch(product.title); }}>
                    <span className="suggestion-thumb"><Image src={product.images[0]} alt="" fill sizes="42px" /></span>
                    <span className="suggestion-copy"><strong>{product.title}</strong><small>{product.brand} · {product.category}</small></span>
                    <span className="suggestion-price">₹{product.discounted_price.toLocaleString('en-IN')}</span>
                  </button>
                ))}
              </div>
            )}
          </form>

          <div className="header-actions">
            <button type="button" className="login-button" onClick={onLogin}><UserRound size={17} /> <span>Login</span></button>
            <button type="button" className="header-link wishlist-link" onClick={onWishlist} aria-label={`Wishlist, ${wishlistCount} items`}><Heart size={20} /><span className="header-link-text">Wishlist</span>{wishlistCount > 0 && <b className="header-count">{wishlistCount}</b>}</button>
            <button type="button" className="header-link" onClick={onCart} aria-label={`Cart, ${cartCount} items`}><ShoppingCart size={21} /><span className="header-link-text">Cart</span>{cartCount > 0 && <b className="header-count">{cartCount}</b>}</button>
          </div>
        </div>
      </div>
      <CategoryRail selected={selectedCategory} onSelect={onCategory} />
    </header>
  );
}
