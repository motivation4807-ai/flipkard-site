'use client';

import { useEffect, useRef } from 'react';

const SCRIPT_ID = 'profitablerate-inpage-695a24d7';
const CONTAINER_ID = 'container-695a24d7e5dad48745d2a6ec9c026508';
const SCRIPT_SRC = 'https://pl28907316.profitableratecpmnetwork.com/695a24d7e5dad48745d2a6ec9c026508/invoke.js';

export function InPageAd() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let started = false;
    const load = () => {
      if (started || document.getElementById(SCRIPT_ID)) return;
      started = true;
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = SCRIPT_SRC;
      script.onload = () => { wrapper.dataset.adStatus = 'loaded'; };
      script.onerror = () => {
        wrapper.dataset.adStatus = 'blocked';
        console.warn('[ads] profitablerate in-page ad request failed');
      };
      wrapper.appendChild(script);
    };

    if (!('IntersectionObserver' in window)) {
      load();
      return;
    }

    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        load();
      }
    }, { rootMargin: '240px 0px' });
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={wrapperRef} className="inpage-ad" role="complementary" aria-label="Advertisement" data-ad-status="loading">
      <span className="ad-slot-label">Advertisement</span>
      <div id={CONTAINER_ID} className="inpage-ad-content" />
    </section>
  );
}
