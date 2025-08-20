import React from 'react';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import './critical.css';
import { Header } from '@/components/layout/Header';
import { ConditionalFooter } from '@/components/layout/ConditionalFooter';
import { AuthSessionProvider } from '@/lib/auth/session-provider';
import { CartProvider } from '@/components/providers/CartProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
// import { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { ServiceWorkerRegistration } from '@/components/ServiceWorkerRegistration';
import { SimpleToastContainer } from '@/components/ui/SimpleToast';
import NewsletterPopup from '@/components/features/NewsletterPopup';
import CookieBanner from '@/components/features/CookieBanner';

// Export Web Vitals reporting function
export { reportWebVitals } from './vitals';

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

// Dynamic imports for non-critical components with defer loading
// const NewsletterPopup = dynamic(() => import('@/components/features/NewsletterPopup'), {
//   ssr: false,
//   loading: () => null,
// });

// const CookieBanner = dynamic(() => import('@/components/features/CookieBanner'), {
//   ssr: false,
//   loading: () => null
// });

// const Toaster = dynamic(() => import('react-hot-toast').then(mod => ({ default: mod.Toaster })), {
//   ssr: false,
//   loading: () => null,
// });

// const LiveChat = dynamic(() => import('@/components/features/LiveChat'), {
//   ssr: false,
//   loading: () => null,
// });

// const ExitIntentPopup = dynamic(() => import('@/components/features/ExitIntentPopup'), {
//   ssr: false,
//   loading: () => null,
// });

// Development helper - only load in development
// const DevReloadHelper = dynamic(
//   () =>
//     import('@/components/dev/DevReloadHelper').then((mod) => ({ default: mod.DevReloadHelper })),
//   {
//     ssr: false,
//     loading: () => null,
//   },
// );

// Defer non-critical components until after page load
// const DeferredComponents = dynamic(() => import('@/components/DeferredComponents'), {
//   ssr: false,
//   loading: () => null,
// });

export const metadata: Metadata = {
  title: {
    default: 'J&M | Handcrafted Rings & Artisan Jewelry',
    template: '%s | J&M Jewelry',
  },
  description:
    'Each ring is personally crafted by a master artisan, ensuring unique beauty and exceptional quality for your most precious moments.',
  keywords: [
    'handcrafted rings',
    'artisan jewelry',
    'engagement rings',
    'wedding rings',
    'custom jewelry',
    'precious metals',
    'gemstones',
    'luxury jewelry',
  ],
  authors: [{ name: 'J&M Jewelry' }],
  creator: 'J&M Jewelry',
  publisher: 'J&M Jewelry',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://jm-jewelry.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jm-jewelry.com',
    title: 'J&M | Handcrafted Rings & Artisan Jewelry',
    description:
      'Each ring is personally crafted by a master artisan, ensuring unique beauty and exceptional quality.',
    siteName: 'J&M Jewelry',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'J&M Jewelry - Handcrafted Rings',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'J&M | Handcrafted Rings & Artisan Jewelry',
    description:
      'Each ring is personally crafted by a master artisan, ensuring unique beauty and exceptional quality.',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preload critical images */}
        <link rel="preload" as="image" href="/images/header/hero-1.jpg" type="image/webp" />
        

        
        {/* Preload service worker */}
        <link rel="preload" href="/sw.js" as="script" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#d4af37" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="J&M Jewelry" />
        <link rel="apple-touch-icon" href="/images/icon-192x192.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Temporarily simplified layout to identify the issue */}
        <div className="min-h-screen">
          <ErrorBoundary>
            <AuthSessionProvider>
              <CartProvider>
                <Header />
                <main>{children}</main>
                <ConditionalFooter />
                <SimpleToastContainer />
                <ServiceWorkerRegistration />
                <NewsletterPopup />
                <CookieBanner />
                {/* <LiveChat /> */}
                {/* <ExitIntentPopup /> */}
                {/* <DevReloadHelper /> */}
                {/* <DeferredComponents /> */}
              </CartProvider>
            </AuthSessionProvider>
          </ErrorBoundary>
        </div>
      </body>
    </html>
  );
}
