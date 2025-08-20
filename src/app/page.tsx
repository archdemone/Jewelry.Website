import HeroCarousel from '@/components/home/HeroCarousel';
import TrustSignals from '@/components/home/TrustSignals';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import SocialProof from '@/components/home/SocialProof';

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
  // Structured data for better SEO
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'J&M Jewelry',
      url: 'https://jm-jewelry.com',
      logo: 'https://jm-jewelry.com/images/logo.png',
      description: 'Handcrafted rings with passion, designed for your forever moments',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
      },
      sameAs: [
        'https://facebook.com/jmjewelry',
        'https://instagram.com/jmjewelry',
      ],
    }),
  },
};

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
