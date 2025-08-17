import React from 'react';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuthSessionProvider } from '@/lib/auth/session-provider';
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} style={{ height: '100%', width: '100%', overflowX: 'hidden' }}>
      <head>
        {/* Minimal critical CSS for above-the-fold content only */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* CRITICAL: Absolute minimum for hero section */
            .hero-section {
              min-height: 100vh;
              position: relative;
              overflow: hidden;
              background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
            }
            
            .hero-image {
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center 30%;
            }
            
            /* CRITICAL: Basic layout stability */
            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              overflow-x: hidden;
            }
            
            /* CRITICAL: Font display optimization */
            .font-inter { font-family: var(--font-inter), system-ui, -apple-system, sans-serif; }
            .font-playfair { font-family: var(--font-playfair), Georgia, serif; }
            
            /* CRITICAL: Prevent layout shifts */
            .content-area {
              min-height: 100vh;
              width: 100vw;
              position: relative;
              overflow: hidden;
              contain: layout style paint;
              transform: translateZ(0);
            }
          `
        }} />
        
        {/* Preload critical hero image */}
        <link rel="preload" href="/images/header/hero-optimized.webp" as="image" type="image/webp" fetchPriority="high" />
        
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Resource hints for better performance */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* Preload critical fonts */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" as="style" />
      </head>
      <body className={`${inter.className} antialiased font-inter`} style={{ height: '100%', width: '100%', margin: 0, padding: 0, overflowX: 'hidden' }}>
        <AuthSessionProvider>
          <div className="viewport-layout">
            <Header />
            <main className="content-area">{children}</main>
            <Footer />
          </div>
          
          {/* Site-wide widgets */}
          <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
          <NewsletterPopup />
          <CookieBanner />
          <LiveChat />
          
          {/* Development helper */}
          {process.env.NODE_ENV === 'development' && <DevReloadHelper />}
          
          {/* Performance optimizations */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Defer non-critical JavaScript
                (function() {
                  function deferNonCritical() {
                    const defer = window.requestIdleCallback || function(fn) { setTimeout(fn, 1); };
                    
                    defer(function() {
                      // Load analytics when idle
                      if (typeof window !== 'undefined' && window.performance) {
                        window.addEventListener('load', function() {
                          setTimeout(function() {
                            const perfData = performance.getEntriesByType('navigation')[0];
                            if (perfData) {
                              console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart);
                            }
                          }, 0);
                        });
                      }
                    });
                  }
                  
                  // Performance monitoring
                  function monitorWebVitals() {
                    if ('PerformanceObserver' in window) {
                      const observer = new PerformanceObserver((list) => {
                        for (const entry of list.getEntries()) {
                          if (entry.entryType === 'largest-contentful-paint') {
                            console.log('LCP:', entry.startTime);
                          }
                          if (entry.entryType === 'first-input') {
                            console.log('FID:', entry.processingStart - entry.startTime);
                          }
                        }
                      });
                      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
                    }
                  }
                  
                  // Initialize after DOM is ready
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', function() {
                      deferNonCritical();
                      monitorWebVitals();
                    });
                  } else {
                    deferNonCritical();
                    monitorWebVitals();
                  }
                })();
              `,
            }}
          />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
