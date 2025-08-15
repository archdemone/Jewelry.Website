import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function AboutPage() {
	return (
		<>
			<Header />
			<main className="container py-10">
				<section className="mx-auto max-w-3xl">
					<h1 className="font-[var(--font-serif)] text-3xl font-semibold text-secondary">About Aurora Jewelry</h1>
					<p className="mt-4 text-sm text-gray-700">
						We craft timeless jewelry pieces designed to celebrate life’s most meaningful moments. Each item is
						thoughtfully made with premium materials and attention to detail.
					</p>
					<div className="mt-8 grid gap-6 sm:grid-cols-2">
						<div className="rounded-lg border p-4">
							<h2 className="text-lg font-semibold text-secondary">Our Materials</h2>
							<p className="mt-2 text-sm text-gray-700">Certified gold, sterling silver, and ethically sourced gemstones.</p>
						</div>
						<div className="rounded-lg border p-4">
							<h2 className="text-lg font-semibold text-secondary">Our Promise</h2>
							<p className="mt-2 text-sm text-gray-700">Honest pricing, responsible sourcing, and enduring quality.</p>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}


