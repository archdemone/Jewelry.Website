import Link from 'next/link'
import { Button } from '@/components/ui/button'
import SmartImage from '@/components/common/SmartImage'
import { getProductImageFallback } from '@/lib/assets/images'

type RelatedProductsProps = {
	products: Array<{
		id: string
		name: string
		slug: string
		price: number
		images?: string[] | null
		category?: { slug: string } | null
	}>
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
	if (!products.length) return null

	// Use text-based fallbacks instead of external URLs
	const fallbacks = [
		'Premium Jewelry',
		'Luxury Jewelry', 
		'Exquisite Jewelry',
	]

	return (
		<section className="py-12">
			<div className="mx-auto max-w-6xl px-6">
				<h2 className="mb-8 text-2xl font-bold">You Might Also Like</h2>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{products.map((product) => {
												const productImages = getProductImageFallback({ 
							productSlug: product.slug, 
							categorySlug: product.category?.slug, 
							name: product.name 
						})
						
						return (
							<Link key={product.id} href={`/products/${product.slug}`} className="group">
								<div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
									<SmartImage
										srcs={productImages}
										alt={product.name}
										className="h-full w-full object-cover transition-transform group-hover:scale-105"
										width={300}
										height={300}
									/>
								</div>
								<div className="mt-3">
									<h3 className="font-medium text-gray-900 group-hover:text-primary">
										{product.name}
									</h3>
									<p className="mt-1 text-lg font-semibold text-primary">
										${product.price.toFixed(2)}
									</p>
								</div>
							</Link>
						)
					})}
				</div>
			</div>
		</section>
	)
}


