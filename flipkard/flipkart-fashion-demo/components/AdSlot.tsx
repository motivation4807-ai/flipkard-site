'use client';

import { useEffect, useRef } from 'react';

type AdFormat = {
  key: string;
  width: number;
  height: number;
};

declare global {
  interface Window {
    atOptions?: {
      key: string;
      format: 'iframe';
      height: number;
      width: number;
      params: Record<string, never>;
    };
    __highRevenueAdQueue?: Promise<void>;
  }
}

const requestedKeys = new Set<string>();

export function AdSlot({ ad, className = '', eager = false }: { ad: AdFormat; className?: string; eager?: boolean }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    let started = false;
    const enqueue = () => {
      if (started || requestedKeys.has(ad.key)) return;
      started = true;
      requestedKeys.add(ad.key);

      window.__highRevenueAdQueue = (window.__highRevenueAdQueue ?? Promise.resolve()).then(() => new Promise<void>(resolve => {
        if (!content.isConnected) {
          requestedKeys.delete(ad.key);
          resolve();
          return;
        }

        window.atOptions = {
          key: ad.key,
          format: 'iframe',
          height: ad.height,
          width: ad.width,
          params: {}
        };

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = `https://www.highrevenueformat.com/${ad.key}/invoke.js`;
        script.dataset.highRevenueAd = ad.key;
        script.onload = () => {
          wrapper.dataset.adStatus = 'loaded';
          resolve();
        };
        script.onerror = () => {
          requestedKeys.delete(ad.key);
          wrapper.dataset.adStatus = 'blocked';
          console.warn(`[ads] highrevenueformat request failed for ${ad.key}`);
          resolve();
        };
        content.appendChild(script);
      }));
    };

    if (eager) {
      const frame = window.requestAnimationFrame(() => {
        if (window.getComputedStyle(wrapper).display !== 'none') enqueue();
      });
      return () => window.cancelAnimationFrame(frame);
    }

    if (!('IntersectionObserver' in window)) {
      enqueue();
      return;
    }

    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        enqueue();
      }
    }, { rootMargin: '240px 0px' });
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [ad.key, ad.height, ad.width, eager]);

  return (
    <div
      ref={wrapperRef}
      className={`ad-slot ${className}`.trim()}
      style={{ '--ad-width': `${ad.width}px`, '--ad-height': `${ad.height}px` } as React.CSSProperties}
      role="complementary"
      aria-label={`${ad.width} by ${ad.height} advertisement`}
      data-ad-status="loading"
    >
      <span className="ad-slot-label">Advertisement</span>
      <div ref={contentRef} className="ad-slot-content" />
    </div>
  );
}
