import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Eye } from 'lucide-react';
import { ProductImage } from '@/components/products/ProductImage';
import { WishlistButton } from '@/components/wishlist/WishlistButton';
import { AddToCartButton } from '@/components/products/AddToCartButton';
import { getProductImageFallback } from '@/lib/assets/images';

type ProductCardProps = {
  id: string;
  slug: string;
  name: string;
  price: number;
  images?: string[] | null;
  categorySlug?: string | null;
  material?: string | null;
  gemstones?: string | null;
  rating?: number | null;
  reviewCount?: number | null;
  badge?: string | null;
  comparePrice?: number | null;
};

export function ProductCard({
  id,
  slug,
  name,
  price,
  images,
  categorySlug,
  material,
  gemstones,
  rating,
  reviewCount,
  badge,
  comparePrice
}: ProductCardProps) {
  const dbImages = Array.isArray(images) ? images : [];
  const productImages =
    dbImages.length > 0
      ? dbImages
      : getProductImageFallback({
        productSlug: slug,
        categorySlug: categorySlug ?? undefined,
        name,
      });

  // Extract gem color from gemstones string
  const getGemColor = (gemstones: string | null) => {
    if (!gemstones) return '';
    const gemColor = gemstones.toLowerCase();
    if (gemColor.includes('red')) return 'Red';
    if (gemColor.includes('blue')) return 'Blue';
    if (gemColor.includes('green')) return 'Green';
    if (gemColor.includes('purple')) return 'Purple';
    if (gemColor.includes('yellow')) return 'Yellow';
    return '';
  };

  const gemColor = getGemColor(gemstones || null);

  console.log('ProductCard: Rendering product', { id, name, gemColor });

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
      data-testid="product-card"
      id={`product-${id}`}
    >
      {/* Product Image */}
      <div className="relative h-64">
        <ProductImage
          src={productImages[0] || '/images/MyImages/IMG-20250816-WA0000.jpg'}
          alt={`${name} - Handcrafted Jewelry`}
          className="absolute inset-0 h-full w-full object-cover"
          width={600}
          height={600}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          quality={50}
          priority={false}
          productSlug={slug}
          categorySlug={categorySlug || undefined}
          productName={name}
        />

        {/* Badge */}
        {badge && (
          <div className="absolute left-3 top-3 rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white">
            {badge}
          </div>
        )}

        {/* Quick View Button */}
        <Link
          href={`/products/${slug}`}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition-colors hover:bg-white"
        >
          <Eye className="h-4 w-4" />
        </Link>

        {/* Wishlist Button */}
        <div className="absolute right-3 top-16 z-20">
          <WishlistButton
            productId={id}
            name={name}
            price={price}
            image={productImages[0] || '/images/MyImages/IMG-20250816-WA0000.jpg'}
            slug={slug}
            originalPrice={comparePrice || undefined}
            material={material || undefined}
            gemColor={gemColor || undefined}
            category={categorySlug || undefined}
            badge={badge || undefined}
            size="sm"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Color Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {material && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border border-gray-300">
              {material}
            </span>
          )}
          {gemColor && (
            <span className={`px-2 py-1 text-xs rounded border ${gemColor === 'Red' ? 'bg-red-100 text-red-800 border-red-300' :
              gemColor === 'Blue' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                gemColor === 'Green' ? 'bg-green-100 text-green-800 border-green-300' :
                  gemColor === 'Purple' ? 'bg-purple-100 text-purple-800 border-purple-300' :
                    gemColor === 'Yellow' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                      'bg-gray-100 text-gray-700 border-gray-300'
              }`}>
              {gemColor}
            </span>
          )}
        </div>

        <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">
          {name}
        </h3>

        {/* Rating */}
        {rating && (
          <div className="mb-2 flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < Math.floor(rating) ? 'fill-gold-400 text-gold-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            {reviewCount && (
              <span className="text-xs text-gray-500">({reviewCount})</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="mb-3 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">
              £{price.toFixed(2)}
            </span>
            {comparePrice && comparePrice > price && (
              <span className="ml-2 text-sm text-gray-400 line-through">
                £{comparePrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
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
