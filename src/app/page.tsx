'use client';

import HeroCarousel from '@/components/home/HeroCarousel';
import TrustSignals from '@/components/home/TrustSignals';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import SocialProof from '@/components/home/SocialProof';

export default function Home() {
  return (
    <main data-testid="homepage-main">
      <HeroCarousel />
      <TrustSignals />
      <FeaturedProducts />
      <SocialProof />
    </main>
  );
}
