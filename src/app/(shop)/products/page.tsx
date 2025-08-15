import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getAllCategories, getPaginatedProducts } from '@/lib/queries'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SmartImage from '@/components/common/SmartImage'
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
				<h1 className="font-[var(--font-serif)] text-3xl font-semibold text-secondary">Shop All</h1>
				<form className="mt-6 grid grid-cols-1 items-end gap-3 rounded-lg border p-4 md:grid-cols-5">
					<div className="md:col-span-2">
						<Label htmlFor="q">Search</Label>
						<Input id="q" name="q" defaultValue={q} placeholder="Search products..." />
					</div>
					<div>
						<Label htmlFor="category">Category</Label>
						<select id="category" name="category" defaultValue={category} className="mt-1 w-full rounded-md border px-3 py-2 text-sm">
							<option value="">All</option>
							{categories.map(c => (
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
						<button className="rounded-md bg-secondary px-4 py-2 text-sm text-white">Apply</button>
					</div>
				</form>
				<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
										{items.map((p) => {
						const productImages = getProductImageFallback({ 
							productSlug: p.slug, 
							categorySlug: p.category?.slug, 
							name: p.name 
						})

						return (
							<Link key={p.id} href={`/products/${p.slug}`} className="rounded-lg border p-4 transition-shadow hover:shadow-sm">
								<div className="relative aspect-square w-full overflow-hidden rounded-md bg-accent">
									<SmartImage
										srcs={productImages}
										alt={p.name}
										className="h-full w-full"
										width={300}
										height={300}
									/>
								</div>
								<div className="mt-3 text-sm font-medium">{p.name}</div>
								<div className="text-sm text-gray-600">${p.price.toFixed(2)}</div>
							</Link>
						)
					})}
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


