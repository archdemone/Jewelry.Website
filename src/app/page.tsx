import dynamic from 'next/dynamic';

// Lazy-load all non-critical components
const HeroCarousel = dynamic(() => import('@/components/home/HeroCarousel'), {
  loading: () => (
    <div className="flex h-96 items-center justify-center bg-gradient-to-br from-amber-900 to-orange-800">
      Loading...
    </div>
  ),
  ssr: false, // Disable SSR to prevent context issues
});

const TrustSignals = dynamic(() => import('@/components/home/TrustSignals'), {
  loading: () => (
    <div className="flex h-32 items-center justify-center">Loading trust signals...</div>
  ),
  ssr: false,
});

const FeaturedProducts = dynamic(() => import('@/components/home/FeaturedProducts'), {
  loading: () => (
    <div className="flex h-96 items-center justify-center">Loading featured products...</div>
  ),
  ssr: false,
});

const SocialProof = dynamic(() => import('@/components/home/SocialProof'), {
  loading: () => (
    <div className="flex h-64 items-center justify-center">Loading testimonials...</div>
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
};

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <TrustSignals />
      <FeaturedProducts />
      <SocialProof />
    </>
  );
}
