'use client';

import dynamic from 'next/dynamic';
import WhenVisible from '@/components/WhenVisible';
import HeroSection from '@/components/home/HeroSection';

// Dynamic imports for heavy components
const HeroCarousel = dynamic(() => import('@/components/home/HeroCarousel'), { ssr: false });
const FeaturedProducts = dynamic(() => import('@/components/home/FeaturedProducts'), { ssr: false });
const TrustSignals = dynamic(() => import('@/components/home/TrustSignals'), { ssr: false });
const SocialProof = dynamic(() => import('@/components/home/SocialProof'), { ssr: false });

export default function Home() {
  return (
    <main data-testid="homepage-main">
      {/* Hero Carousel - Primary hero section */}
      <HeroCarousel />
      
      {/* Below the fold, render only when near + after LCP */}
      <WhenVisible afterLcp>
        <TrustSignals />
      </WhenVisible>
      
      <WhenVisible afterLcp>
        <TrustSignals />
      </WhenVisible>
      
      <WhenVisible afterLcp>
        <FeaturedProducts />
      </WhenVisible>
      
      <WhenVisible afterLcp>
        <SocialProof />
      </WhenVisible>
    </main>
  );
}
