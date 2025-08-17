import { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryShowcase from '@/components/home/CategoryShowcase';

// Static generation for better performance
export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: 'Handcrafted Rings | Artisan Jewelry',
  description: 'Each ring is personally crafted by a master artisan, ensuring unique beauty and exceptional quality for your most precious moments.',
  openGraph: {
    title: 'Handcrafted Rings | Artisan Jewelry',
    description: 'Each ring is personally crafted by a master artisan, ensuring unique beauty and exceptional quality.',
    images: ['/images/og-image.jpg'],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <CategoryShowcase />
    </>
  );
}
