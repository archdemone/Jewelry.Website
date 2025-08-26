import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/checkout/success', '/checkout/cancel', '/account/'],
      },
    ],
    sitemap: 'https://j&m-jewelry.co.uk/sitemap.xml',
  };
}
