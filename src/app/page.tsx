import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load components to reduce initial bundle size
const HeroSection = dynamic(() => import('@/components/home/HeroSection'), {
  loading: () => (
    <div className="aspect-[16/9] max-h-[600px] min-h-[400px] w-full animate-pulse overflow-hidden bg-gray-100 md:aspect-[21/9] md:max-h-[700px] lg:aspect-[24/9]" />
  ),
  ssr: false,
});

const FeaturedProducts = dynamic(() => import('@/components/home/FeaturedProducts'), {
  loading: () => (
    <div className="bg-white py-20">
      <div className="container">
        <div className="h-64 animate-pulse rounded-lg bg-gray-100" />
      </div>
    </div>
  ),
  ssr: false,
});

const CategoryShowcase = dynamic(() => import('@/components/home/CategoryShowcase'), {
  loading: () => (
    <div className="bg-gray-50 py-20">
      <div className="container">
        <div className="h-64 animate-pulse rounded-lg bg-gray-100" />
      </div>
    </div>
  ),
  ssr: false,
});

const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection'), {
  loading: () => (
    <div className="bg-white py-20">
      <div className="container">
        <div className="h-64 animate-pulse rounded-lg bg-gray-100" />
      </div>
    </div>
  ),
  ssr: false,
});

const NewsletterSection = dynamic(() => import('@/components/home/NewsletterSection'), {
  loading: () => (
    <div className="bg-gray-50 py-20">
      <div className="container">
        <div className="h-32 animate-pulse rounded-lg bg-gray-100" />
      </div>
    </div>
  ),
  ssr: false,
});

const WhyChooseUs = dynamic(() => import('@/components/home/WhyChooseUs'), {
  loading: () => (
    <div className="bg-white py-20">
      <div className="container">
        <div className="h-64 animate-pulse rounded-lg bg-gray-100" />
      </div>
    </div>
  ),
  ssr: false,
});

const WorkshopSection = dynamic(() => import('@/components/home/WorkshopSection'), {
  loading: () => (
    <div className="bg-stone-50 py-20">
      <div className="container">
        <div className="h-64 animate-pulse rounded-lg bg-gray-100" />
      </div>
    </div>
  ),
  ssr: false,
});

// Keep Header and Footer as regular imports since they're needed immediately
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="space-y-0">
        <HeroSection />
        <Suspense
          fallback={
            <div className="bg-stone-50 py-20">
              <div className="container">
                <div className="h-64 animate-pulse rounded-lg bg-gray-100" />
              </div>
            </div>
          }
        >
          <WorkshopSection />
        </Suspense>
        <Suspense
          fallback={
            <div className="bg-white py-20">
              <div className="container">
                <div className="h-64 animate-pulse rounded-lg bg-gray-100" />
              </div>
            </div>
          }
        >
          <FeaturedProducts />
        </Suspense>
        <Suspense
          fallback={
            <div className="bg-gray-50 py-20">
              <div className="container">
                <div className="h-64 animate-pulse rounded-lg bg-gray-100" />
              </div>
            </div>
          }
        >
          <CategoryShowcase />
        </Suspense>
        <Suspense
          fallback={
            <div className="bg-white py-20">
              <div className="container">
                <div className="h-64 animate-pulse rounded-lg bg-gray-100" />
              </div>
            </div>
          }
        >
          <WhyChooseUs />
        </Suspense>
        <Suspense
          fallback={
            <div className="bg-white py-20">
              <div className="container">
                <div className="h-64 animate-pulse rounded-lg bg-gray-100" />
              </div>
            </div>
          }
        >
          <TestimonialsSection />
        </Suspense>
        <Suspense
          fallback={
            <div className="bg-gray-50 py-20">
              <div className="container">
                <div className="h-32 animate-pulse rounded-lg bg-gray-100" />
              </div>
            </div>
          }
        >
          <NewsletterSection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
