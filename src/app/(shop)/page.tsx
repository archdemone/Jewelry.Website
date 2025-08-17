import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import NewsletterSection from '@/components/home/NewsletterSection';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection'), {
  loading: () => <Skeleton className="container my-8 h-40" />,
  ssr: false,
});

export default function ShopHomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <CategoryShowcase />
      <WhyChooseUs />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
