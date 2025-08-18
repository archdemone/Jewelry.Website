import HeroCarousel from '@/components/home/HeroCarousel';
import TrustSignals from '@/components/home/TrustSignals';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import SocialProof from '@/components/home/SocialProof';
import CategoryShowcase from '@/components/home/CategoryShowcase';

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
