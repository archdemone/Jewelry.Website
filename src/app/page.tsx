import { Suspense } from 'react';

// Static imports for stability in dev
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import WorkshopSection from '@/components/home/WorkshopSection';

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
