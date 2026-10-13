'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Heart, RotateCcw, ShieldCheck, ShoppingCart, X } from 'lucide-react';
import type { Product } from '@/lib/catalog';

const APPAREL_SIZE_GUIDE = [
  { size: 'S', chest: '86–91 cm', waist: '71–76 cm' },
  { size: 'M', chest: '91–97 cm', waist: '76–81 cm' },
  { size: 'L', chest: '97–102 cm', waist: '81–86 cm' },
  { size: 'XL', chest: '102–107 cm', waist: '86–91 cm' },
  { size: 'XXL', chest: '107–112 cm', waist: '91–96 cm' }
];
const FOOTWEAR_SIZE_GUIDE = [
  { size: '3', foot: '22.0 cm' }, { size: '4', foot: '22.9 cm' }, { size: '5', foot: '23.7 cm' },
  { size: '6', foot: '24.6 cm' }, { size: '7', foot: '25.4 cm' }, { size: '8', foot: '26.2 cm' },
  { size: '9', foot: '27.1 cm' }, { size: '10', foot: '27.9 cm' }, { size: '11', foot: '28.8 cm' }
];

export function ProductDetailModal({ product, saved, onClose, onWishlist, onAdd }: {
  product: Product | null;
  saved: boolean;
  onClose: () => void;
  onWishlist: (product: Product) => void;
  onAdd: (product: Product, size: string, quantity: number, buyNow: boolean) => void;
}) {
  const [size, setSize] = useState('');
  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  useEffect(() => {
    if (product) { setSize(product.sizes[0] || 'One size'); setImageIndex(0); setQuantity(1); setSizeGuideOpen(false); }
  }, [product?.id]);
  useEffect(() => {
    if (!product) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (sizeGuideOpen) setSizeGuideOpen(false);
        else onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [product, onClose, sizeGuideOpen]);
  if (!product) return null;
  const discount = product.discount_percentage;
  const images = product.images.length ? product.images : ['/products/mens-tee.webp'];
  const selectedImage = images[imageIndex % images.length];
  const isFootwear = product.category.includes('Footwear');
  const format = (value: number) => `₹${value.toLocaleString('en-IN')}`;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close product details"><X size={20} /></button>
        <div className="detail-layout">
          <div className="detail-gallery">
            <div className="detail-thumbnails" aria-label="Product images">
              {images.map((image, index) => <button className={imageIndex === index ? 'active' : ''} key={`${image}-${index}`} type="button" onClick={() => setImageIndex(index)} aria-label={`View image ${index + 1}`} aria-pressed={imageIndex === index}><Image src={image} alt="" fill sizes="62px" /></button>)}
            </div>
            <div className="detail-main-image"><Image src={selectedImage} alt={product.title} fill sizes="(max-width: 700px) 90vw, 45vw" priority /></div>
            <button type="button" className="gallery-next gallery-prev" onClick={() => setImageIndex(value => (value - 1 + images.length) % images.length)} aria-label="Previous image"><ChevronLeft size={20} /></button>
            <button type="button" className="gallery-next" onClick={() => setImageIndex(value => (value + 1) % images.length)} aria-label="Next image"><ChevronRight size={20} /></button>
          </div>
          <div className="detail-copy">
            <div className="detail-breadcrumb">Fashion <span>›</span> {product.category} <span>›</span> {product.brand}</div>
            <div className="detail-brand">{product.brand}</div>
            <h2 id="detail-title">{product.title}</h2>
            <div className="detail-rating"><b>{product.rating.toFixed(1)} ★</b><span>{product.rating_count.toLocaleString('en-IN')} ratings & reviews</span></div>
            <div className="detail-price-line"><strong>{format(product.discounted_price)}</strong><del>{format(product.original_price)}</del><span>{discount}% off</span></div>
            <div className="detail-taxes">Inclusive of all taxes <b>Special price</b></div>
            <div className="offer-box"><strong>Available offers</strong><p><Check size={15} /> Bank Offer: 10% off on select cards, up to ₹1,500</p><p><Check size={15} /> Special Price: Extra {discount}% off with this deal</p><p><Check size={15} /> Free delivery on your first order</p></div>
            <div className="size-picker"><div><strong>Select size</strong><button type="button" className="size-guide" onClick={() => setSizeGuideOpen(true)}>Size chart</button></div><div className="size-options">{product.sizes.map(item => <button type="button" className={item === size ? 'selected' : ''} key={item} onClick={() => setSize(item)} aria-pressed={item === size}>{item}</button>)}</div><small>Size selected: {size}</small></div>
            <div className="delivery-check"><span className="delivery-dot" /><div><strong>{product.in_stock ? 'In stock · ready to ship' : 'Currently out of stock'}</strong><small>Estimated delivery in 3–5 days · enter pincode at checkout</small></div></div>
            <div className="detail-assurances"><span><RotateCcw size={15} /> 7 day returns</span><span><ShieldCheck size={15} /> Genuine product</span></div>
            <div className="detail-actions"><div className="quantity-stepper"><button type="button" onClick={() => setQuantity(value => Math.max(1, value - 1))} aria-label="Decrease quantity">−</button><span>{quantity}</span><button type="button" onClick={() => setQuantity(value => Math.min(10, value + 1))} aria-label="Increase quantity">+</button></div><button type="button" className="detail-add-button" disabled={!product.in_stock} onClick={() => onAdd(product, size, quantity, false)}><ShoppingCart size={18} /> Add to Cart</button><button type="button" className="detail-buy-button" disabled={!product.in_stock} onClick={() => onAdd(product, size, quantity, true)}>Buy Now</button></div>
            <button type="button" className="detail-wishlist" onClick={() => onWishlist(product)}><Heart size={16} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Saved to wishlist' : 'Add to wishlist'}</button>
          </div>
        </div>
      </section>
      {sizeGuideOpen && (
        <div className="size-guide-overlay" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setSizeGuideOpen(false); }}>
          <section className="size-guide-modal" role="dialog" aria-modal="true" aria-labelledby="size-guide-title">
            <button type="button" className="size-guide-close" onClick={() => setSizeGuideOpen(false)} aria-label="Close size guide"><X size={18} /></button>
            <h3 id="size-guide-title">{isFootwear ? 'Footwear size guide' : 'Clothing size guide'}</h3>
            <p>Approximate measurements only. Compare with your usual fit; brand sizing can vary.</p>
            {isFootwear ? (
              <table><thead><tr><th>UK / India size</th><th>Approx. foot length</th></tr></thead><tbody>{FOOTWEAR_SIZE_GUIDE.filter(row => product.sizes.includes(row.size)).map(row => <tr key={row.size}><td>{row.size}</td><td>{row.foot}</td></tr>)}</tbody></table>
            ) : (
              <table><thead><tr><th>Size</th><th>Chest</th><th>Waist</th></tr></thead><tbody>{APPAREL_SIZE_GUIDE.filter(row => product.sizes.includes(row.size)).map(row => <tr key={row.size}><td>{row.size}</td><td>{row.chest}</td><td>{row.waist}</td></tr>)}</tbody></table>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
