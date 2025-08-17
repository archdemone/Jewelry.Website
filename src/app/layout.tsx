// no default React import needed
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import '../styles/fonts.css';
import { AuthSessionProvider } from '@/lib/auth/session-provider';
import { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { Inter, Playfair_Display } from 'next/font/google';
// Lazy load non-critical components to reduce initial bundle size
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
  {
    ssr: false,
    loading: () => null,
  },
);

// Only initialize Sentry in production and after page load
if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
  import('@sentry/nextjs').then((Sentry) => {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 0.1,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  });
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  preload: true,
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Artisan Rings - Handcrafted Ring Specialist',
  description:
    "Each ring is personally handcrafted from start to finish using locally-sourced materials. No mass production, no teams – just one artisan's dedication to your perfect ring.",
  keywords:
    'handcrafted rings, artisan rings, engagement rings, wedding bands, custom rings, locally made',
  authors: [{ name: 'Artisan Rings' }],
  creator: 'Artisan Rings',
  publisher: 'Artisan Rings',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Artisan Rings - Handcrafted Ring Specialist',
    description:
      'Each ring is personally handcrafted from start to finish using locally-sourced materials.',
    url: '/',
    siteName: 'Artisan Rings',
    images: [
      {
        url: '/images/products/category-engagement-rings.jpg',
        width: 800,
        height: 600,
        alt: 'Handcrafted Engagement Rings',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artisan Rings - Handcrafted Ring Specialist',
    description:
      'Each ring is personally handcrafted from start to finish using locally-sourced materials.',
    images: ['/images/products/category-engagement-rings.jpg'],
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        {process.env.NODE_ENV === 'production' && (
          <meta
            httpEquiv="Content-Security-Policy"
            content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://va.vercel-scripts.com https://vitals.vercel-insights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self';"
          />
        )}
      </head>
      <body className={`min-h-screen bg-white text-text antialiased ${inter.className}`}>
        <AuthSessionProvider>
          {children}
          {/* Site-wide widgets */}
          <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
          <CookieBanner />
          <NewsletterPopup />
          <LiveChat />
          <AnalyticsProviders />
          {/* Optional: Google Analytics 4 - requires GA_MEASUREMENT_ID env */}
          {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
            <>
              <script
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
										window.dataLayer = window.dataLayer || [];
										function gtag(){dataLayer.push(arguments);}
										gtag('js', new Date());
										gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
									`,
                }}
              />
            </>
          )}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
