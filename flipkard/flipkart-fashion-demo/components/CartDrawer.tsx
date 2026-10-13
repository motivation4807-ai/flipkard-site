'use client';

import Image from 'next/image';
import { ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, Trash2, X } from 'lucide-react';
import type { Product } from '@/lib/catalog';

export type CartLine = { product: Product; size: string; quantity: number };

export function CartDrawer({ mode, cart, wishlist, onClose, onQuantity, onRemove, onRemoveWish, onAddWish, onCheckout }: {
  mode: 'cart' | 'wishlist' | null;
  cart: CartLine[];
  wishlist: Product[];
  onClose: () => void;
  onQuantity: (id: string, size: string, delta: number) => void;
  onRemove: (id: string, size: string) => void;
  onRemoveWish: (id: string) => void;
  onAddWish: (product: Product) => void;
  onCheckout: () => void;
}) {
  if (!mode) return null;
  const isCart = mode === 'cart';
  const count = isCart ? cart.reduce((sum, item) => sum + item.quantity, 0) : wishlist.length;
  const subtotal = cart.reduce((sum, item) => sum + item.product.discounted_price * item.quantity, 0);
  const format = (value: number) => `₹${value.toLocaleString('en-IN')}`;
  return (
    <div className="drawer-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label={isCart ? 'Shopping cart' : 'Wishlist'}>
        <div className="drawer-header"><div><small>{isCart ? 'YOUR STYLE FINDS' : 'SAVED FOR LATER'}</small><h2>{isCart ? 'My Cart' : 'My Wishlist'} <span>({count})</span></h2></div><button type="button" onClick={onClose} aria-label="Close drawer"><X size={21} /></button></div>
        {isCart ? (
          cart.length === 0 ? <div className="drawer-empty"><ShoppingBag size={42} /><h3>Your cart is empty</h3><p>Find something you love and it will appear here.</p><button className="primary-button" type="button" onClick={onClose}>Shop fashion <ArrowRight size={16} /></button></div> :
          <>
            <div className="drawer-items">{cart.map(item => <article className="drawer-product" key={`${item.product.id}-${item.size}`}>
              <div className="drawer-product-image"><Image src={item.product.images[0]} alt={item.product.title} fill sizes="84px" /></div>
              <div className="drawer-product-info"><small>{item.product.brand} · Size {item.size}</small><strong>{item.product.title}</strong><b>{format(item.product.discounted_price)}</b><div className="cart-qty"><button type="button" onClick={() => onQuantity(item.product.id, item.size, -1)} aria-label="Reduce quantity"><Minus size={12} /></button><span>{item.quantity}</span><button type="button" onClick={() => onQuantity(item.product.id, item.size, 1)} aria-label="Add one"><Plus size={12} /></button></div></div>
              <button className="remove-cart-item" type="button" aria-label="Remove item" onClick={() => onRemove(item.product.id, item.size)}><Trash2 size={16} /></button>
            </article>)}</div>
            <div className="drawer-summary"><div className="summary-row"><span>Price ({count} item{count === 1 ? '' : 's'})</span><strong>{format(subtotal)}</strong></div><div className="summary-row"><span>Delivery charges</span><strong className="free-text">FREE</strong></div><div className="summary-total"><span>Total Amount</span><strong>{format(subtotal)}</strong></div><p className="savings-note">You save {format(cart.reduce((sum, item) => sum + (item.product.original_price - item.product.discounted_price) * item.quantity, 0))} on this order.</p><button className="checkout-button" type="button" onClick={onCheckout}>Place Order <ArrowRight size={17} /></button><div className="secure-note"><ShieldCheck size={15} /> Safe and secure payments</div></div>
          </>
        ) : (
          wishlist.length === 0 ? <div className="drawer-empty"><ShoppingBag size={42} /><h3>Your wishlist is waiting</h3><p>Tap the heart on any product to save it for later.</p><button className="primary-button" type="button" onClick={onClose}>Discover styles <ArrowRight size={16} /></button></div> :
          <div className="drawer-items">{wishlist.map(product => <article className="drawer-product" key={product.id}>
            <div className="drawer-product-image"><Image src={product.images[0]} alt={product.title} fill sizes="84px" /></div>
            <div className="drawer-product-info"><small>{product.brand}</small><strong>{product.title}</strong><b>{format(product.discounted_price)}</b><button className="wish-add-cart" type="button" onClick={() => onAddWish(product)}>Move to cart <ArrowRight size={13} /></button></div>
            <button className="remove-cart-item" type="button" aria-label="Remove from wishlist" onClick={() => onRemoveWish(product.id)}><X size={16} /></button>
          </article>)}</div>
        )}
      </aside>
    </div>
  );
}
