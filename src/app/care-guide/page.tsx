import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import CareInstructions from '@/components/features/CareInstructions'

export default function CareGuidePage() {
	return (
		<>
			<Header />
			<main className="container py-10">
				<section className="mx-auto max-w-3xl">
					<h1 className="font-[var(--font-serif)] text-3xl font-semibold text-secondary">Jewelry Care Guide</h1>
					<p className="mt-2 text-sm text-gray-600">Keep your pieces shining for years with these care recommendations.</p>
					<div className="mt-6">
						<CareInstructions />
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}