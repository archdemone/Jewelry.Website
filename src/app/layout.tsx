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

const ExitIntentPopup = dynamic(() => import('@/components/features/ExitIntentPopup'), {
  ssr: false,
  loading: () => null,
});

// Development helper - only load in development
const DevReloadHelper = dynamic(
  () =>
    import('@/components/dev/DevReloadHelper').then((mod) => ({ default: mod.DevReloadHelper })),
  {
    ssr: false,
    loading: () => null,
  },
);

// Defer non-critical components until after page load
const DeferredComponents = dynamic(() => import('@/components/DeferredComponents'), {
  ssr: false,
  loading: () => null,
});

export const metadata: Metadata = {
  title: {
            default: 'J&M | Handcrafted Rings & Artisan Jewelry',
        template: '%s | J&M',
  },
  description:
    'Each ring is personally crafted by a master artisan, ensuring unique beauty and exceptional quality for your most precious moments.',
  keywords: [
    'handcrafted rings',
    'artisan jewelry',
    'engagement rings',
    'wedding bands',
    'custom rings',
  ],
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
    title: 'J&M | Handcrafted Rings & Artisan Jewelry',
    description:
      'Each ring is personally crafted by a master artisan, ensuring unique beauty and exceptional quality.',
    siteName: 'J&M',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Critical CSS Inline */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
                           /* Critical above-the-fold styles */
              .hero-section {
                position: relative;
                width: 100%;
                height: 55vh;
                min-height: 480px;
                overflow: hidden;
              }
             .hero-background {
               position: absolute;
               inset: 0;
               width: 100%;
               height: 100%;
               background: linear-gradient(to bottom right, #92400e, #ea580c, #dc2626);
             }
             .hero-content {
               position: absolute;
               inset: 0;
               display: flex;
               flex-direction: column;
               align-items: center;
               justify-content: center;
               color: white;
               z-index: 10;
             }
             .hero-title {
               font-size: 3rem;
               font-weight: 300;
               text-shadow: 0 2px 4px rgba(0,0,0,0.5);
               font-family: 'Playfair Display', serif;
               line-height: 1.2;
               margin: 0;
             }
             .hero-subtitle {
               font-size: 1.25rem;
               text-shadow: 0 1px 2px rgba(0,0,0,0.5);
               max-width: 32rem;
               margin: 0 auto;
               color: #f3f4f6;
               font-weight: 300;
             }
             /* Prevent layout shifts */
             img {
               max-width: 100%;
               height: auto;
             }
             /* Font display optimization */
             @font-face {
               font-family: 'Playfair Display';
               font-display: swap;
             }
             @font-face {
               font-family: 'Inter';
               font-display: swap;
             }
             /* Critical layout styles */
             body {
               margin: 0;
               font-family: 'Inter', system-ui, sans-serif;
               line-height: 1.5;
               color: #333;
             }
             /* Critical header styles */
             header {
               position: sticky;
               top: 0;
               z-index: 50;
               background: white;
               border-bottom: 1px solid #e5e5e5;
             }
             /* Critical navigation styles */
             nav {
               display: flex;
               align-items: center;
               justify-content: space-between;
               padding: 1rem;
               max-width: 1280px;
               margin: 0 auto;
             }
             /* Critical button styles */
             button {
               cursor: pointer;
               border: none;
               background: none;
               font-family: inherit;
             }
             /* Critical link styles */
             a {
               color: inherit;
               text-decoration: none;
             }
             /* Critical container styles */
             .container {
               max-width: 1280px;
               margin: 0 auto;
               padding: 0 1rem;
             }
             /* Critical grid styles */
             .grid {
               display: grid;
               gap: 1rem;
             }
             /* Critical flex styles */
             .flex {
               display: flex;
             }
             .flex-col {
               flex-direction: column;
             }
             .items-center {
               align-items: center;
             }
             .justify-center {
               justify-content: center;
             }
             /* Critical spacing */
             .p-4 { padding: 1rem; }
             .m-0 { margin: 0; }
             .mt-3 { margin-top: 0.75rem; }
             .mb-4 { margin-bottom: 1rem; }
             /* Critical colors */
             .text-white { color: white; }
             .bg-white { background-color: white; }
             .text-gray-600 { color: #4b5563; }
             /* Critical typography */
             .text-sm { font-size: 0.875rem; }
             .font-medium { font-weight: 500; }
             /* Critical responsive */
             @media (max-width: 768px) {
               .hero-title { font-size: 2rem; }
               .hero-subtitle { font-size: 1rem; }
             }
           `,
          }}
        />

        {/* Google Fonts - Load asynchronously */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
          media="print"
        />

        {/* Preload critical images */}
        <link
          rel="preload"
          as="image"
          href="/images/header/hero-1.jpg"
          type="image/webp"
        />

        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          as="style"
        />

        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Skip Links for Accessibility */}
        <a
          href="#main-content"
          className="sr-only z-50 rounded bg-black px-4 py-2 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <a
          href="#footer"
          className="sr-only z-50 rounded bg-black px-4 py-2 text-white focus:not-sr-only focus:absolute focus:left-20 focus:top-4"
        >
          Skip to footer
        </a>
        <ErrorBoundary>
          <AuthSessionProvider>
            <CartProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main id="main-content" className="flex-grow">
                  {children}
                </main>
                <ConditionalFooter />
              </div>

              {/* Non-critical components - loaded after page load */}
              <DeferredComponents />
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
