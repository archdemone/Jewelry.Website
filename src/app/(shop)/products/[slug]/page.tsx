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

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();

  // Prefer DB images; always append curated fallback to ensure a local image exists
  const dbImages = Array.isArray((product as any).images)
    ? ((product as any).images as string[])
    : [];
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
            </div>
            <WishlistButton productId={product.id}
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
