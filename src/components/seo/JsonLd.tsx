import type { ComponentPropsWithoutRef } from 'react';

export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Your Jewelry Store',
    url: 'https://j&m-jewelry.co.uk',
    logo: 'https://j&m-jewelry.co.uk/icon-512.png',
    sameAs: [
      'https://www.facebook.com/yourjewelrystore',
      'https://www.instagram.com/yourjewelrystore',
      'https://www.pinterest.com/yourjewelrystore',
    ],
  };
  return <JsonLd data={schema} />;
}

export function ProductJsonLd({ product }: { product: any }) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.sku,
    mpn: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'Your Jewelry Store',
    },
    offers: {
      '@type': 'Offer',
              url: `https://j&m-jewelry.co.uk/products/${product.slug}`,
      priceCurrency: 'USD',
      price: product.price,
      availability:
        product.quantity > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Your Jewelry Store',
      },
    },
  };
  if (product.reviews && product.reviews.length > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.averageRating || 5,
      reviewCount: product.reviews.length,
    };
  }
  return <JsonLd data={schema} />;
}

export function BreadcrumbsJsonLd({ items }: { items: { name: string; item: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((i, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: i.name,
      item: i.item,
    })),
  };
  return <JsonLd data={schema} />;
}

export function FAQPageJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
  return <JsonLd data={schema} />;
}

export function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    name: 'Your Jewelry Store',
          image: 'https://j&m-jewelry.co.uk/icon-512.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Fifth Ave',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10001',
      addressCountry: 'US',
    },
    telephone: '+1-212-555-1234',
            url: 'https://j&m-jewelry.co.uk/contact',
  };
  return <JsonLd data={schema} />;
}

export function ArticleJsonLd({
  article,
}: {
  article: { title: string; slug: string; date: string; image?: string; author?: string };
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    image: article.image ? [article.image] : undefined,
    author: article.author || 'Aurora Team',
    datePublished: article.date,
    dateModified: article.date,
          mainEntityOfPage: `https://j&m-jewelry.co.uk/blog/${article.slug}`,
  };
  return <JsonLd data={schema} />;
}

export function ReviewJsonLd({
  review,
}: {
  review: { rating: number; title?: string; comment: string; author?: string; date?: string };
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      '@type': 'Person',
      name: review.author || 'Anonymous',
    },
    reviewBody: review.comment,
    reviewHeadline: review.title,
    datePublished: review.date,
  };
  return <JsonLd data={schema} />;
}
