import dynamic from 'next/dynamic';

// Lazy-load all non-critical components with better loading states
const HeroCarousel = dynamic(() => import('@/components/home/HeroCarousel'), {
  loading: () => (
    <div className="loading-hero">
      <div className="text-white text-lg">Loading...</div>
    </div>
  ),
  ssr: false, // Disable SSR to prevent context issues
});

const TrustSignals = dynamic(() => import('@/components/home/TrustSignals'), {
  loading: () => (
    <div className="loading-section h-32">
      <div className="text-gray-600">Loading trust signals...</div>
    </div>
  ),
  ssr: false,
});

const FeaturedProducts = dynamic(() => import('@/components/home/FeaturedProducts'), {
  loading: () => (
    <div className="loading-section h-96">
      <div className="text-gray-600">Loading featured products...</div>
    </div>
  ),
  ssr: false,
});

const SocialProof = dynamic(() => import('@/components/home/SocialProof'), {
  loading: () => (
    <div className="loading-section h-64">
      <div className="text-gray-600">Loading testimonials...</div>
    </div>
  ),
  ssr: false,
});

// Static generation for better performance
export const revalidate = 3600; // Revalidate every hour

export const metadata = {
  title: 'J&M | Handcrafted Rings & Artisan Jewelry',
  description:
    'Each ring is personally crafted by a master artisan, ensuring unique beauty and exceptional quality for your most precious moments.',
  openGraph: {
    title: 'J&M | Handcrafted Rings & Artisan Jewelry',
    description:
      'Each ring is personally crafted by a master artisan, ensuring unique beauty and exceptional quality.',
    images: ['/images/og-image.jpg'],
  },
  // Performance optimizations
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <TrustSignals />
      <FeaturedProducts />
      <SocialProof />
    </main>
  );
}
