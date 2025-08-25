import { notFound } from 'next/navigation';
// import { Header } from '@/components/layout/Header'; // Removed - using shop layout
// import { Footer } from '@/components/layout/Footer'; // Removed - using shop layout
import { Button } from '@/components/ui/button';
import { getProductBySlug, getRelatedProducts } from '@/lib/queries';
import { AddToCartSection } from '@/components/product-detail/AddToCartSection';
import { EnhancedProductGallery } from '@/components/product-detail/EnhancedProductGallery';
import { ProductTabs } from '@/components/product-detail/ProductTabs';
import RelatedProducts from '@/components/product-detail/RelatedProducts';
import { AddToCartButton } from '@/components/products/AddToCartButton';
import { ReviewSystem } from '@/components/reviews/ReviewSystem';
import { WishlistButton } from '@/components/wishlist/WishlistButton';
import { getProductImageFallback } from '@/lib/assets/images';
import { db } from '@/lib/db';
import { ProductJsonLd, BreadcrumbsJsonLd } from '@/components/seo/JsonLd';
import { parseImages } from '@/lib/utils/json-helpers';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();

  // Parse images from database (they are stored as JSON strings)
  const dbImages = parseImages((product as any).images);
  const fallbackImages = getProductImageFallback({
    productSlug: product.slug,
    categorySlug: product.category?.slug,
    name: product.name,
  });
  const productImages = [...dbImages, ...fallbackImages];
  const mainImage = productImages[0];

  const relatedRaw = await getRelatedProducts(product.id, product.categoryId);
  const related = relatedRaw.map((r: any) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    price: r.price,
    images: Array.isArray(r.images) ? (r.images as string[]) : null,
    category: r.category ? { slug: r.category.slug } : null,
  }));

  return (
    <div className="container py-10">
      <ProductJsonLd product={{
        name: product.name,
        description: product.description,
        sku: product.sku,
        price: product.price,
        quantity: product.quantity,
        slug: product.slug,
        images: productImages,
        reviews: product.reviews,
      }}
      />
      <BreadcrumbsJsonLd items={[
        { name: 'Home', item: 'https://yourjewelrystore.com' },
        { name: 'Products', item: 'https://yourjewelrystore.com/products' },
        { name: product.name, item: `https://yourjewelrystore.com/products/${product.slug}` },
      ]}
      />
      <div className="grid gap-8 md:grid-cols-2">
        <EnhancedProductGallery images={productImages} productName={product.name}
          productSlug={product.slug}
          categorySlug={product.category?.slug}
        />
        <div>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold">{product.name}</h1>
              <p className="mt-2 text-gray-600">{product.description}</p>
              <div className="mt-4 text-xl font-semibold">£{product.price.toFixed(2)}</div>

              {/* Product Details */}
              <div className="mt-6 space-y-4">
                {/* Material and Gemstone */}
                <div className="flex flex-wrap gap-4">
                  {product.material && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">Material:</span>
                      <span className="text-sm text-gray-600">{product.material}</span>
                    </div>
                  )}
                  {product.gemstones && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">Gemstone:</span>
                      <span className="text-sm text-gray-600">{product.gemstones}</span>
                    </div>
                  )}
                </div>

                {/* Size and Weight */}
                <div className="flex flex-wrap gap-4">
                  {product.size && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">Size:</span>
                      <span className="text-sm text-gray-600">{product.size}</span>
                    </div>
                  )}
                  {product.weight && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">Weight:</span>
                      <span className="text-sm text-gray-600">{product.weight}g</span>
                    </div>
                  )}
                </div>

                {/* SKU and Stock */}
                <div className="flex flex-wrap gap-4">
                  {product.sku && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">SKU:</span>
                      <span className="text-sm text-gray-600">{product.sku}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">Stock:</span>
                    <span className={`text-sm ${product.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.quantity > 0 ? `${product.quantity} available` : 'Out of stock'}
                    </span>
                  </div>
                </div>

                {/* Rating and Reviews */}
                {product.rating && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">Rating:</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-yellow-500">★</span>
                      <span className="text-sm text-gray-600">{product.rating}</span>
                      {product.reviewCount && (
                        <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Badge */}
                {product.badge && (
                  <div className="inline-block">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {product.badge}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <WishlistButton
              productId={product.id}
              name={product.name}
              price={product.price}
              image={mainImage}
              slug={product.slug}
              category={product.category?.name}
              variant="button"
              size="md"
            />
          </div>
          <div className="mt-6">
            <AddToCartButton productId={product.id} name={product.name} price={product.price} image={mainImage}
            />
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <ReviewSystem productId={product.id} />
      </div>
      <RelatedProducts products={related} />
    </div>
  );
}
