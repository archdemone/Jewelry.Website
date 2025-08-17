// no default React import needed
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

const AnalyticsProviders = dynamic(
  () => import('@/lib/performance/analytics').then((mod) => ({ default: mod.AnalyticsProviders })),
  { ssr: false }
);

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
        {/* Critical CSS for above-the-fold content */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Critical CSS for layout stability */
            * {
              box-sizing: border-box;
            }
            
            /* Immediate layout stability - CRITICAL */
            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              overflow-x: hidden;
            }
            
            /* CRITICAL: Optimized font loading */
            .font-serif {
              font-family: Georgia, serif;
            }
            
            .font-sans {
              font-family: system-ui, arial, sans-serif;
            }
            
            /* CRITICAL: Optimized image loading */
            img {
              max-width: 100%;
              height: auto;
              display: block;
            }
            
            /* CRITICAL: Fast hero rendering */
            .hero-section {
              min-height: 100vh;
              position: relative;
              overflow: hidden;
              background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
              display: flex;
              align-items: center;
              justify-content: center;
            }
            
            /* CRITICAL: Fast hero image rendering */
            .hero-image {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center 30%;
              will-change: transform;
            }
            
            /* CRITICAL: Fast text rendering */
            .hero-title {
              font-size: 3rem;
              line-height: 1.1;
              font-weight: 700;
              color: white;
              text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            }
            
            .hero-subtitle {
              font-size: 1.25rem;
              line-height: 1.6;
              color: #e5e7eb;
              text-shadow: 0 1px 2px rgba(0,0,0,0.3);
            }
            @media (min-width: 768px) {
              .hero-title {
                font-size: 4rem;
              }
            }
            @media (min-width: 1024px) {
              .hero-title {
                font-size: 5rem;
              }
            }
            @media (min-width: 1280px) {
              .hero-title {
                font-size: 6rem;
              }
            }
            
            .hero-subtitle {
              font-size: 1.25rem;
              line-height: 1.6;
              color: #e5e7eb;
              text-shadow: 0 1px 2px rgba(0,0,0,0.3);
            }
            
            /* CRITICAL: Layout stability */
            .content-area {
              min-height: 100vh;
              width: 100vw;
              position: relative;
              overflow: hidden;
              contain: layout style paint;
              display: block;
              transform: translateZ(0);
            }
            
            .viewport-layout {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              overflow: hidden;
              z-index: 1;
            }
            
            /* CRITICAL: Fast responsive text */
            @media (min-width: 768px) {
              .hero-title {
                font-size: 4rem;
              }
              .hero-subtitle {
                font-size: 1.5rem;
              }
            }
            
            /* Product grid stability */
            .product-grid {
              display: grid;
              gap: 2rem;
            }
            
            @media (min-width: 768px) {
              .product-grid {
                grid-template-columns: repeat(2, 1fr);
              }
            }
            
            @media (min-width: 1024px) {
              .product-grid {
                grid-template-columns: repeat(4, 1fr);
              }
            }
            
            /* Aspect ratio containers */
            .aspect-4-3 {
              aspect-ratio: 4 / 3;
            }
            
            /* Fixed height containers to prevent layout shifts */
            .min-h-120 { min-height: 120px; }
            .min-h-140 { min-height: 140px; }
            .min-h-160 { min-height: 160px; }
            .min-h-60 { min-height: 60px; }
            .min-h-70 { min-height: 70px; }
            .min-h-40 { min-height: 40px; }
            .h-120 { height: 120px; }
            .h-60 { height: 60px; }
            
            /* Grid layout stability */
            .grid-stable {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              gap: 2rem;
            }
            
            /* Card stability */
            .card-stable {
              height: 100%;
              display: flex;
              flex-direction: column;
            }
            
            .card-content {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
            
            /* Smooth animations */
            .transition-all {
              transition: all 0.3s ease;
            }
            
            /* Button optimizations */
            .btn-primary {
              border-radius: 9999px;
              background-color: rgb(249 115 22);
              padding: 1rem 2rem;
              font-weight: 500;
              color: white;
              box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
              transition: all 0.3s;
            }
            .btn-primary:hover {
              transform: scale(1.05);
              background-color: rgb(234 88 12);
              box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
            }
            .btn-secondary {
              border-radius: 9999px;
              border: 2px solid white;
              padding: 1rem 2rem;
              font-weight: 500;
              color: white;
              transition: all 0.3s;
            }
            .btn-secondary:hover {
              transform: scale(1.05);
              background-color: white;
              color: rgb(17 24 39);
            }
            
            .hero-buttons {
              display: flex;
              flex-direction: column;
              gap: 1rem;
            }
            @media (min-width: 640px) {
              .hero-buttons {
                flex-direction: row;
              }
            }
            
            /* Prevent layout shifts from animations */
            .motion-safe {
              will-change: transform, opacity;
            }
            
            /* Image container stability */
            .image-container {
              position: relative;
              overflow: hidden;
            }
            
            .image-container img {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            
            /* Text stability */
            .text-stable {
              min-height: 1.2em;
              line-height: 1.2;
            }
            
            /* Prevent cumulative layout shift */
            body {
              overflow-x: hidden;
            }
            
            /* Hero section space reservation */
            .hero-section {
              min-height: 100vh;
              position: relative;
              overflow: hidden;
              background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
              /* Reserve space for content */
              display: flex;
              align-items: center;
              justify-content: center;
            }
            
            /* Button container stability */
            .button-container {
              min-height: 60px;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              gap: 1rem;
            }
            
            /* Prevent any layout shifts from buttons */
            .btn-stable {
              min-height: 56px;
              min-width: 200px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 9999px;
              font-weight: 500;
              transition: all 0.3s ease;
              text-decoration: none;
              border: none;
              cursor: pointer;
            }
            
            /* Container stability */
            .container-stable {
              width: 100%;
              max-width: 1200px;
              margin: 0 auto;
              padding: 0 1rem;
            }
            
            /* Section stability */
            .section-stable {
              padding: 5rem 0;
              min-height: 400px;
            }
          `
        }} />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/images/header/hero-1.jpg" as="image" type="image/jpeg" fetchPriority="high" />
        
        {/* Preload critical fonts */}
        <link rel="preload" href="/_next/static/media/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/_next/static/media/playfair-display-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Critical CSS preload */}
        <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
        
        {/* Critical JavaScript preload */}
        <link rel="modulepreload" href="/_next/static/chunks/webpack.js" />
      </head>
      <body className={`${inter.className} antialiased`} style={{ height: '100%', width: '100%', margin: 0, padding: 0, overflowX: 'hidden' }}>
        <AuthSessionProvider>
          <div className="viewport-layout">
            <Header />
            <main className="content-area" style={{ minHeight: '100vh', width: '100vw', position: 'relative', overflow: 'hidden', contain: 'layout style paint', transform: 'translateZ(0)' }}>{children}</main>
            <Footer />
          </div>
          
          {/* Site-wide widgets */}
          <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
          <NewsletterPopup />
          <CookieBanner />
          <LiveChat />
          <AnalyticsProviders />
          
          {/* Development helper */}
          {process.env.NODE_ENV === 'development' && <DevReloadHelper />}
          
          {/* Error tracking */}
          {process.env.NODE_ENV === 'production' && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  // Error tracking
                  window.addEventListener('error', function(e) {
                    console.error('Global error:', e.error);
                  });
                  
                  // Performance monitoring
                  if ('performance' in window) {
                    window.addEventListener('load', function() {
                      setTimeout(function() {
                        const perfData = performance.getEntriesByType('navigation')[0];
                        if (perfData) {
                          console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart);
                        }
                      }, 0);
                    });
                  }
                `,
              }}
            />
          )}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
