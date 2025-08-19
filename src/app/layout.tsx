import React from 'react';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import './critical.css';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ConditionalFooter } from '@/components/layout/ConditionalFooter';
import { AuthSessionProvider } from '@/lib/auth/session-provider';
import { CartProvider } from '@/components/providers/CartProvider';
import { Header } from '@/components/layout/Header';
import dynamic from 'next/dynamic';

const Toaster = dynamic(() => import('react-hot-toast').then(mod => ({ default: mod.Toaster })), {
  ssr: false,
});

// Optimize font loading
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: false,
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  preload: true,
  fallback: ['Georgia', 'serif'],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: 'J&M | Handcrafted Rings & Artisan Jewelry',
    template: '%s | J&M Jewelry',
  },
  description:
    'Each ring is personally crafted by a master artisan, ensuring unique beauty and exceptional quality for your most precious moments.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Preload critical hero image for LCP optimization */}
        <link
          rel="preload"
          as="image"
          href="/images/home/header1.jpg"
          fetchPriority="high"
          imageSizes="100vw"
        />
        {/* Inline critical CSS for hero section */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .hero-section {
              position: relative;
              height: 60vh;
              overflow: hidden;
            }
            @media (min-width: 768px) {
              .hero-section {
                height: 70vh;
              }
            }
            @media (min-width: 1024px) {
              .hero-section {
                height: 80vh;
              }
            }
            .hero-image {
              height: 100%;
              width: 100%;
              object-fit: cover;
            }
            .hero-overlay {
              position: absolute;
              inset: 0;
              background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
            }
            .hero-content {
              position: relative;
              z-index: 10;
              display: flex;
              height: 100%;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              text-align: center;
              color: white;
            }
          `
        }} />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ErrorBoundary>
          <AuthSessionProvider>
            <CartProvider>
              <Header />
              <main className="min-h-screen">{children}</main>
                             <ConditionalFooter />
               <Toaster
                 position="top-right"
                 toastOptions={{
                   duration: 4000,
                   style: {
                     background: '#363636',
                     color: '#fff',
                   },
                 }}
               />
            </CartProvider>
          </AuthSessionProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
