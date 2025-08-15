import Link from 'next/link'
import { getFeaturedProducts } from '@/lib/queries'
import SmartImage from '@/components/common/SmartImage'
import { getProductImageFallback } from '@/lib/assets/images'

export default async function FeaturedProducts() {
	const products = await getFeaturedProducts(6)
	return (
		<section className="container py-12">
			<h2 className="font-[var(--font-serif)] text-2xl font-semibold text-secondary">Featured Collection</h2>
			<div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
				{products.map((p) => (
					<Link key={p.id} href={`/products/${p.slug}`} className="group rounded-lg border p-4 transition-shadow hover:shadow-sm">
						<div className="relative aspect-square w-full overflow-hidden rounded-md">
							<SmartImage 
								srcs={getProductImageFallback({ 
									productSlug: p.slug, 
									categorySlug: p.category?.slug, 
									name: p.name 
								})} 
								alt={p.name} 
								className="h-full w-full" 
							/>
						</div>
						<div className="mt-3 text-sm font-medium">{p.name}</div>
						<div className="text-sm text-gray-600">${p.price.toFixed(2)}</div>
					</Link>
				))}
			</div>
			<div className="mt-6 text-center">
				<Link href="/products" className="text-sm font-medium text-secondary underline">View all products</Link>
			</div>
		</section>
	)
}


