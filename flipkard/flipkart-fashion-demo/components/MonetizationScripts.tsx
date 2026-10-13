'use client';

import Script from 'next/script';

export function MonetizationScripts() {
  return (
    <>
      <Script
        id="profitablerate-pop-script-4c4dd437"
        src="https://pl28907312.profitableratecpmnetwork.com/4c/4d/d4/4c4dd4374f096db6b5b1801329e20a1e.js"
        strategy="afterInteractive"
        onError={() => console.error('[ads] profitablerate CPM script failed: 4c4dd437')}
      />
      <Script
        id="profitablerate-pop-script-87eb132f"
        src="https://pl28907151.profitableratecpmnetwork.com/87/eb/13/87eb132fd00661c574616939069a29de.js"
        strategy="afterInteractive"
        onError={() => console.error('[ads] profitablerate CPM script failed: 87eb132f')}
      />
    </>
  );
}
