'use client';

import { Heart, Home, LayoutGrid, ShoppingCart } from 'lucide-react';

export function MobileBottomBar({ cartCount, wishlistCount, onHome, onCategories, onWishlist, onCart }: {
  cartCount: number;
  wishlistCount: number;
  onHome: () => void;
  onCategories: () => void;
  onWishlist: () => void;
  onCart: () => void;
}) {
  return (
    <nav className="mobile-bottom-bar" aria-label="Quick navigation">
      <button type="button" onClick={onHome}><Home size={20} /><span>Home</span></button>
      <button type="button" onClick={onCategories}><LayoutGrid size={20} /><span>Categories</span></button>
      <button type="button" onClick={onWishlist}><span className="mobile-nav-icon"><Heart size={20} />{wishlistCount > 0 && <b>{wishlistCount}</b>}</span><span>Wishlist</span></button>
      <button type="button" onClick={onCart}><span className="mobile-nav-icon"><ShoppingCart size={20} />{cartCount > 0 && <b>{cartCount}</b>}</span><span>Cart</span></button>
    </nav>
  );
}
