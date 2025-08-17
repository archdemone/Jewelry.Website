'use client';

import Link from 'next/link';
import SmartImage from '@/components/common/SmartImage';
import { AddToCartButton } from '@/components/products/AddToCartButton';
import { getProductImageFallback } from '@/lib/assets/images';

type ProductCardProps = {
  id: string;
  slug: string;
  name: string;
  price: number;
  images?: string[] | null;
  categorySlug?: string | null;
};

export function ProductCard({ id, slug, name, price, images, categorySlug }: ProductCardProps) {
  const dbImages = Array.isArray(images) ? images : [];
  const productImages =
    dbImages.length > 0
      ? dbImages
      : getProductImageFallback({
          productSlug: slug,
          categorySlug: categorySlug ?? undefined,
          name,
        });

  return (
    <div
      className="rounded-lg border p-4 transition-shadow hover:shadow-sm"
      data-testid="product-card"
    >
      <Link href={`/products/${slug}`} className="block" data-testid="product-link">
        <div className="relative aspect-square w-full overflow-hidden rounded-md bg-accent">
          <SmartImage
            srcs={[productImages[0] || '/images/products/placeholder.jpg']}
            alt={name}
            className="h-full w-full"
            width={600}
            height={600}
            sizes="(max-width:768px) 50vw, 25vw"
            quality={92}
          />
        </div>
        <div className="mt-3 text-sm font-medium">{name}</div>
        <div className="text-sm text-gray-600">${price.toFixed(2)}</div>
      </Link>
      <div className="mt-3">
        <AddToCartButton
          productId={id}
          name={name}
          price={price}
          image={productImages[0] || '/images/products/placeholder.jpg'}
        />
      </div>
    </div>
  );
}
