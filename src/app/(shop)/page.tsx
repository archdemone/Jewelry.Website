import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

export default function ShopHomePage() {
	return (
		<>
			<Header />
			<main className="container py-10">
				<section className="rounded-2xl bg-secondary/90 px-6 py-16 text-center text-white">
					<h1 className="font-[var(--font-serif)] text-4xl font-bold">Timeless Elegance</h1>
					<p className="mx-auto mt-3 max-w-2xl text-sm text-white/90">Discover handcrafted jewelry designed to elevate every moment.</p>
					<div className="mt-6 flex justify-center gap-3">
						<Button variant="primary" asChild>
							<a href="/(shop)/products">Shop Now</a>
						</Button>
						<Button variant="outline" asChild>
							<a href="/(shop)/about">Learn More</a>
						</Button>
					</div>
				</section>
				<section className="mt-12">
					<h2 className="font-[var(--font-serif)] text-2xl font-semibold text-secondary">Featured</h2>
					<div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{Array.from({ length: 4 }).map((_, i) => (
							<div key={i} className="rounded-lg border p-4">
								<div className="aspect-square w-full rounded-md bg-accent" />
								<div className="mt-3 text-sm font-medium">Product {i + 1}</div>
								<div className="text-sm text-gray-600">$199.00</div>
							</div>
						))}
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}


