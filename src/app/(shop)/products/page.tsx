export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getAllCategories, getPaginatedProducts } from '@/lib/queries'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getProductImageFallback } from '@/lib/assets/images'

export default async function ProductsPage({ searchParams }: { searchParams: { page?: string; q?: string; category?: string; min?: string; max?: string; sort?: string } }) {
	const page = Number(searchParams?.page ?? '1') || 1
	const q = searchParams?.q || ''
	const category = searchParams?.category || ''
	const min = searchParams?.min ? Number(searchParams.min) : undefined
	const max = searchParams?.max ? Number(searchParams.max) : undefined
	const sort = (searchParams?.sort as any) || 'new'
	const { items, totalPages } = await getPaginatedProducts({ page, pageSize: 12, q, categorySlug: category || undefined, minPrice: min, maxPrice: max, sort })
	const categories = await getAllCategories()

	return (
		<>
			<Header />
			<main className="container py-10">
				<div className="text-center mb-8">
					<h1 className="font-[var(--font-serif)] text-4xl font-semibold text-secondary mb-4">Handcrafted Rings</h1>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Each ring is personally crafted from start to finish using locally-sourced materials. 
						No mass production, no teams – just one artisan's dedication to your perfect ring.
					</p>
				</div>
				<form className="mt-6 grid grid-cols-1 items-end gap-3 rounded-lg border p-4 md:grid-cols-5">
					<div className="md:col-span-2">
						<Label htmlFor="q">Search Rings</Label>
						<Input id="q" name="q" defaultValue={q} placeholder="Search rings..." />
					</div>
					<div>
						<Label htmlFor="category">Ring Type</Label>
						<select id="category" name="category" defaultValue={category} className="mt-1 w-full rounded-md border px-3 py-2 text-sm">
							<option value="">All Rings</option>
							{categories.map((c: { id: string; slug: string; name: string }) => (
								<option key={c.id} value={c.slug}>{c.name}</option>
							))}
						</select>
					</div>
					<div>
						<Label htmlFor="min">Min Price</Label>
						<Input id="min" name="min" type="number" step="0.01" defaultValue={min ?? ''} />
					</div>
					<div>
						<Label htmlFor="max">Max Price</Label>
						<Input id="max" name="max" type="number" step="0.01" defaultValue={max ?? ''} />
					</div>
					<div>
						<Label htmlFor="sort">Sort</Label>
						<select id="sort" name="sort" defaultValue={sort} className="mt-1 w-full rounded-md border px-3 py-2 text-sm">
							<option value="new">Newest</option>
							<option value="price-asc">Price: Low to High</option>
							<option value="price-desc">Price: High to Low</option>
						</select>
					</div>
					<div className="md:col-span-5">
						<button className="rounded-md bg-secondary px-4 py-2 text-sm text-white">Apply Filters</button>
					</div>
				</form>
				<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
<<<<<<< HEAD
					{items && items.length > 0 ? items.map((p: any) => {
						const dbImages = Array.isArray(p.images) ? p.images : []
						const productImages = dbImages.length > 0 ? dbImages : getProductImageFallback({ productSlug: p.slug, categorySlug: p.category?.slug, name: p.name })
=======
									{items.map((p) => {
						// Prefer product's own images from DB; always append curated fallback
						const dbImages = Array.isArray((p as any).images) ? ((p as any).images as string[]) : []
						const fallback = getProductImageFallback({ productSlug: p.slug, categorySlug: p.category?.slug, name: p.name })
						const productImages = [...dbImages, ...fallback]

>>>>>>> main
						return (
							<Link key={p.id} href={`/products/${p.slug}`} className="rounded-lg border p-4 transition-shadow hover:shadow-sm" data-testid="product-card">
								<div className="relative aspect-square w-full overflow-hidden rounded-md bg-accent">
									<img src={productImages[0] || '/images/products/placeholder.jpg'} alt={p.name} className="h-full w-full object-cover" width={300} height={300} />
								</div>
								<div className="mt-3 text-sm font-medium">{p.name}</div>
								<div className="text-sm text-gray-600">{p.material} • {p.gemstones || 'No stones'}</div>
								<div className="text-sm text-gray-600">${p.price.toFixed(2)}</div>
							</Link>
						)
					}) : (
						<div className="col-span-full text-center py-12">
							<div className="text-gray-500 mb-4">
								<svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
								</svg>
							</div>
							<h3 className="text-lg font-medium text-gray-900 mb-2">No rings found</h3>
							<p className="text-gray-500">Try adjusting your search criteria or browse all our handcrafted rings.</p>
						</div>
					)}
				</div>
				{totalPages > 1 && (
					<nav className="mt-8 flex justify-center gap-2">
						{Array.from({ length: totalPages }).map((_, i) => {
							const pageNum = i + 1
							const isActive = pageNum === page
							return (
								<Link
									key={pageNum}
									href={`/products?page=${pageNum}&q=${encodeURIComponent(q)}&category=${encodeURIComponent(category)}&min=${min ?? ''}&max=${max ?? ''}&sort=${sort}`}
									scroll={false}
									className={`rounded-md border px-3 py-1 text-sm ${isActive ? 'bg-secondary text-white' : 'bg-white text-secondary hover:bg-accent'}`}
								>
									{pageNum}
								</Link>
							)
						})}
					</nav>
				)}
			</main>
			<Footer />
		</>
	)
}


