'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const slides = [
  {
    kicker: 'THE FASHION FEST · JUST DROPPED',
    title: <>Find your<br /><em>everyday look.</em></>,
    copy: 'Fresh fits, feel-good prices. Explore 200 picks across tees, shirts, dresses and shoes.',
    image: '/products/fashion-wear-2.webp', alt: 'Contemporary blue dress styling in the city',
    tag: 'Deals from ₹399', category: ''
  },
  {
    kicker: 'COMFORT THAT GOES PLACES',
    title: <>Step out in<br /><em>your own way.</em></>,
    copy: 'Sporty, casual or occasion-ready: meet the footwear that makes the whole outfit.',
    image: '/products/shoe-detail.webp', alt: 'Close-up of a lightweight running shoe',
    tag: 'Up to 60% off footwear', category: "Men's Footwear (Sneakers, Sports, Casual Shoes)"
  },
  {
    kicker: 'NEW SEASON · NEW STORIES',
    title: <>A little more<br /><em>you, every day.</em></>,
    copy: 'Easy layers, favourite colours and styles that work hard from morning to plans after dark.',
    image: '/products/fashion-wear-3.webp', alt: 'Colourful summer outfit against a bright background',
    tag: 'Trending styles from ₹499', category: "Women's Dresses & Ethnic Wear"
  }
];

export function BannerCarousel({ onCategory }: { onCategory: (category: string) => void }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setIndex(value => (value + 1) % slides.length), 6200);
    return () => window.clearInterval(timer);
  }, []);
  const move = (step: number) => setIndex(value => (value + step + slides.length) % slides.length);

  return (
    <section className="hero-wrap" aria-label="Fashion offers">
      <div className={`hero-banner hero-theme-${index}`}>
        <div className="hero-content">
          <span className="hero-kicker"><Sparkles size={15} /> {slide.kicker}</span>
          <h1 key={`hero-title-${index}`}>{slide.title}</h1>
          <p>{slide.copy}</p>
          <div className="hero-cta-row"><button className="yellow-cta" type="button" onClick={() => onCategory(slide.category)}>Shop now <ArrowRight size={17} /></button><span className="hero-mini-tag">{slide.tag}</span></div>
          <div className="hero-controls"><button onClick={() => move(-1)} type="button" aria-label="Previous promotion"><ChevronLeft size={18} /></button><div className="hero-dots">{slides.map((_, dot) => <button key={dot} className={dot === index ? 'active' : ''} type="button" aria-label={`Show promotion ${dot + 1}`} aria-pressed={dot === index} onClick={() => setIndex(dot)} />)}</div><button onClick={() => move(1)} type="button" aria-label="Next promotion"><ChevronRight size={18} /></button><span className="hero-counter">0{index + 1}<i />0{slides.length}</span></div>
        </div>
        <div className="hero-art"><div className="hero-art-ring" /><div className="hero-image-card"><Image src={slide.image} alt={slide.alt} fill priority={index === 0} sizes="(max-width: 700px) 100vw, 52vw" /></div><div className="hero-floating-label"><span>✦</span><strong>{slide.tag}</strong></div><span className="hero-sticker">STYLE<br />UP!</span></div>
      </div>
    </section>
  );
}
