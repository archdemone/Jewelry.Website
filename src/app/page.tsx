import HeroCarousel from '@/components/home/HeroCarousel';
import TrustSignals from '@/components/home/TrustSignals';
import dynamic from 'next/dynamic';
import SocialProof from '@/components/home/SocialProof';

// Lazy-load non-critical components
const FeaturedProducts = dynamic(() => import('@/components/home/FeaturedProducts'), {
  loading: () => <div className="h-96 flex items-center justify-center">Loading featured products...</div>,
  ssr: false
});

const CategoryShowcase = dynamic(() => import('@/components/home/CategoryShowcase'), {
  loading: () => <div className="h-96 flex items-center justify-center">Loading categories...</div>,
  ssr: false
});

// Static generation for better performance
export const revalidate = 3600; // Revalidate every hour

export const metadata = {
  title: 'J&M Jewelry | Handcrafted Rings & Artisan Jewelry',
  description: 'Each ring is personally crafted by a master artisan, ensuring unique beauty and exceptional quality for your most precious moments.',
  openGraph: {
    title: 'J&M Jewelry | Handcrafted Rings & Artisan Jewelry',
    description: 'Each ring is personally crafted by a master artisan, ensuring unique beauty and exceptional quality.',
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
      <CategoryShowcase />
    </>
  );
}
