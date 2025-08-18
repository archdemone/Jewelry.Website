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
      id={`product-${id}`}
    >
      <Link href={`/products/${slug}`} className="block" data-testid="product-link">
        <div className="relative aspect-square w-full overflow-hidden rounded-md bg-accent">
          <SmartImage
            srcs={[productImages[0] || '/images/MyImages/IMG-20250816-WA0000.jpg']}
            alt={`${name} - Handcrafted Jewelry`}
            className="h-full w-full object-cover"
            width={600}
            height={600}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            quality={75}
            priority={false}
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
          image={productImages[0] || '/images/MyImages/IMG-20250816-WA0000.jpg'}
        />
      </div>
    </div>
  );
}
