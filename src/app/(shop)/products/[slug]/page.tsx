import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { getProductBySlug, getRelatedProducts } from '@/lib/queries'
import { AddToCartSection } from '@/components/product-detail/AddToCartSection'
import ProductImageGallery from '@/components/product-detail/ProductImageGallery'
import { ProductTabs } from '@/components/product-detail/ProductTabs'
import RelatedProducts from '@/components/product-detail/RelatedProducts'
import { AddToCartButton } from '@/components/products/AddToCartButton'
import { getProductImageFallback } from '@/lib/assets/images'
import { db } from '@/lib/db'
import { ProductJsonLd, BreadcrumbsJsonLd } from '@/components/seo/JsonLd'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
	const product = await getProductBySlug(params.slug)
	if (!product) return notFound()

	// Prefer DB images; always append curated fallback to ensure a local image exists
	const dbImages = Array.isArray((product as any).images) ? ((product as any).images as string[]) : []
	const fallbackImages = getProductImageFallback({
		productSlug: product.slug,
		categorySlug: product.category?.slug,
		name: product.name,
	})
	const productImages = [...dbImages, ...fallbackImages]
	const mainImage = productImages[0]
	const relatedRaw = await getRelatedProducts(product.id, product.categoryId)
	const related = relatedRaw.map((r: any) => ({
		id: r.id,
		name: r.name,
		slug: r.slug,
		price: r.price,
		images: Array.isArray(r.images) ? (r.images as string[]) : null,
		category: r.category ? { slug: r.category.slug } : null,
	}))

	return (
		<>
			<Header />
			<main className="container py-10">
				<ProductJsonLd product={{
					name: product.name,
					description: product.description,
					sku: product.sku,
					price: product.price,
					quantity: product.quantity,
					slug: product.slug,
					images: productImages,
					reviews: product.reviews,
				}} />
				<BreadcrumbsJsonLd items={[
					{ name: 'Home', item: 'https://yourjewelrystore.com' },
					{ name: 'Products', item: 'https://yourjewelrystore.com/products' },
					{ name: product.name, item: `https://yourjewelrystore.com/products/${product.slug}` },
				]} />
				<div className="grid gap-8 md:grid-cols-2">
					<ProductImageGallery images={productImages} productName={product.name} />
					<div>
						<h1 className="text-2xl font-semibold">{product.name}</h1>
						<p className="mt-2 text-gray-600">{product.description}</p>
						<div className="mt-4 text-xl font-semibold">${product.price.toFixed(2)}</div>
						<div className="mt-6">
							<AddToCartButton productId={product.id} name={product.name} price={product.price} image={mainImage} />
						</div>
					</div>
				</div>
				<RelatedProducts products={related} />
			</main>
			<Footer />
		</>
	)
}


