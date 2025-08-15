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

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
	const product = await getProductBySlug(params.slug)
	if (!product) return null
	const productImages = getProductImageFallback({ 
		productSlug: product.slug, 
		categorySlug: product.category?.slug, 
		name: product.name 
	})
	const mainImage = productImages[0]
	const related = await getRelatedProducts(product.id, product.categoryId)

	return (
		<div className="container py-10">
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
							<RelatedProducts products={related.map(p => ({ id: p.id, name: p.name, slug: p.slug, price: p.price, images: null, category: null }))} />
		</div>
	)
}


