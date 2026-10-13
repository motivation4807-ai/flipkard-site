'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '@/lib/catalog';
import { ProductCard } from '@/components/ProductCard';

export function ProductCarousel({ id, eyebrow, title, products, savedIds, onWishlist, onAdd, onOpen }: {
  id: string;
  eyebrow: string;
  title: string;
  products: Product[];
  savedIds: Set<string>;
  onWishlist: (product: Product) => void;
  onAdd: (product: Product) => void;
  onOpen: (product: Product) => void;
}) {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) => track.current?.scrollBy({ left: direction * 560, behavior: 'smooth' });
  return (
    <section className="market-section product-carousel-section" id={id}>
      <div className="section-topline">
        <div><span className="section-eyebrow">{eyebrow}</span><h2>{title}</h2></div>
        <div className="section-actions"><button type="button" onClick={() => move(-1)} aria-label={`Scroll ${title} left`}><ChevronLeft size={20} /></button><button type="button" onClick={() => move(1)} aria-label={`Scroll ${title} right`}><ChevronRight size={20} /></button><a href="#catalog">View all <ChevronRight size={16} /></a></div>
      </div>
      <div className="carousel-track" ref={track}>
        {products.map(product => <div className="carousel-card" key={product.id}><ProductCard product={product} saved={savedIds.has(product.id)} onWishlist={onWishlist} onAdd={onAdd} onOpen={onOpen} /></div>)}
      </div>
    </section>
  );
}
