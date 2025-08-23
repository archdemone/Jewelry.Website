import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Artisan Rings - Handcrafted Ring Specialist',
    short_name: 'Artisan Rings',
    description:
      "Each ring is personally handcrafted from start to finish using locally-sourced materials. No mass production, no teams – just one artisan's dedication to your perfect ring.",
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#D4AF37',
    orientation: 'portrait',
    scope: '/',
    lang: 'en',
    dir: 'ltr',
    categories: ['shopping', 'jewelry', 'rings'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon',
      },
      {
        src: '/images/MyImages/IMG-20250816-WA0000.jpg',
        type: 'image/jpeg',
        sizes: '600x600',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: '/images/MyImages/category-engagement-rings.jpg',
        sizes: '800x600',
        type: 'image/jpeg',
      },
    ],

    shortcuts: [
      {
        name: 'Engagement Rings',
        short_name: 'Engagement',
        description: 'Browse our handcrafted engagement rings',
        url: '/products?category=engagement-rings',
        icons: [{ src: '/images/MyImages/category-engagement-rings.jpg', sizes: '800x600' }],
      },
      {
        name: 'Wedding Bands',
        short_name: 'Wedding',
        description: 'Browse our handcrafted wedding bands',
        url: '/products?category=wedding-bands',
        icons: [{ src: '/images/MyImages/category-wedding-bands.jpg', sizes: '800x600' }],
      },
    ],
  };
}
