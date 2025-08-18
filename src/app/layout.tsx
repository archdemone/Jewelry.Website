import React from 'react';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuthSessionProvider } from '@/lib/auth/session-provider';
import { CartProvider } from '@/components/providers/CartProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';

// Export Web Vitals reporting function
export { reportWebVitals } from './vitals';

// Optimize font loading
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  preload: true,
  fallback: ['Georgia', 'serif'],
});

// Dynamic imports for non-critical components
const NewsletterPopup = dynamic(() => import('@/components/features/NewsletterPopup'), {
  ssr: false,
  loading: () => null,
});

const CookieBanner = dynamic(() => import('@/components/features/CookieBanner'), {
  ssr: false,
  loading: () => null,
});

const LiveChat = dynamic(() => import('@/components/features/LiveChat'), {
  ssr: false,
  loading: () => null,
});

// Development helper - only load in development
const DevReloadHelper = dynamic(() => import('@/components/dev/DevReloadHelper').then(mod => ({ default: mod.DevReloadHelper })), {
  ssr: false,
  loading: () => null,
});

export const metadata: Metadata = {
  title: {
    default: 'Handcrafted Rings | Artisan Jewelry',
    template: '%s | Handcrafted Rings'
  },
  description: 'Each ring is personally crafted by a master artisan, ensuring unique beauty and exceptional quality for your most precious moments.',
  keywords: ['handcrafted rings', 'artisan jewelry', 'engagement rings', 'wedding bands', 'custom rings'],
  authors: [{ name: 'Artisan Ring Crafters' }],
  creator: 'Artisan Ring Crafters',
  publisher: 'Artisan Ring Crafters',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://handcrafted-rings.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://handcrafted-rings.com',
    title: 'Handcrafted Rings | Artisan Jewelry',
    description: 'Each ring is personally crafted by a master artisan, ensuring unique beauty and exceptional quality.',
    siteName: 'Handcrafted Rings',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Handcrafted Rings - Artisan Jewelry',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Handcrafted Rings | Artisan Jewelry',
    description: 'Each ring is personally crafted by a master artisan, ensuring unique beauty and exceptional quality.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/images/header/hero-1-1920.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/playfair-display-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ErrorBoundary>
          <AuthSessionProvider>
            <CartProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
              
              {/* Non-critical components */}
              <NewsletterPopup />
              <CookieBanner />
              <LiveChat />
              {process.env.NODE_ENV === 'development' && <DevReloadHelper />}
              
              <Toaster
                position="bottom-right"
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
