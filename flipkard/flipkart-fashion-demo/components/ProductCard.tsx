'use client';

import Image from 'next/image';
import { Heart, Plus, Star } from 'lucide-react';
import type { Product } from '@/lib/catalog';

export function ProductCard({ product, saved, onWishlist, onAdd, onOpen }: {
  product: Product;
  saved: boolean;
  onWishlist: (product: Product) => void;
  onAdd: (product: Product) => void;
  onOpen: (product: Product) => void;
}) {
  return (
    <article className="product-card group">
      <div className="product-photo-wrap">
        <button type="button" className="product-photo-button" onClick={() => onOpen(product)} aria-label={`View ${product.title}`}>
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 48vw, (max-width: 1024px) 31vw, 220px"
            className="product-photo"
          />
        </button>
        <span className="discount-pill">{product.discount_percentage}% off</span>
        <button className={`wishlist-heart ${saved ? 'saved' : ''}`} type="button" aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'} aria-pressed={saved} onClick={() => onWishlist(product)}><Heart size={18} fill={saved ? 'currentColor' : 'none'} /></button>
        <span className="photo-badge">{product.badge}</span>
      </div>
      <div className="product-card-body">
        <div className="product-brand">{product.brand}</div>
        <button className="product-title" type="button" onClick={() => onOpen(product)}>{product.title}</button>
        <div className="product-rating-row"><span className="rating-chip">{product.rating.toFixed(1)} <Star size={11} fill="currentColor" /></span><span className="rating-count">({product.rating_count.toLocaleString('en-IN')})</span></div>
        <div className="price-line"><strong>₹{product.discounted_price.toLocaleString('en-IN')}</strong><del>₹{product.original_price.toLocaleString('en-IN')}</del><span className="save-line">{product.discount_percentage}% off</span></div>
        <div className="product-card-footer"><span className={product.in_stock ? 'stock-label' : 'stock-label out-stock'}>{product.in_stock ? 'Free delivery' : 'Currently unavailable'}</span><button type="button" className="add-cart-mini" onClick={() => onAdd(product)} disabled={!product.in_stock} aria-label={`Add ${product.title} to cart`}><Plus size={15} /> Add</button></div>
      </div>
    </article>
  );
}
