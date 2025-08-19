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
