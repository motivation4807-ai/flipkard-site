import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Flipkart Fashion Demo | Style for every day',
  description: 'A responsive marketplace demo with 200 fashion and footwear listings, instant filters and a local sample cart.',
  applicationName: 'Flipkart Fashion Demo',
  robots: { index: false, follow: false }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2874f0'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
