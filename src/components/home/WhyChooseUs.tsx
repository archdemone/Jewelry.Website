import { Truck, ShieldCheck, Gem, Hammer } from 'lucide-react'

export default function WhyChooseUs() {
	const features = [
		{ icon: Truck, title: 'Free Shipping', desc: 'On orders over $500' },
		{ icon: ShieldCheck, title: 'Lifetime Warranty', desc: 'On all jewelry pieces' },
		{ icon: Gem, title: 'Ethical Sourcing', desc: 'Conflict-free diamonds' },
		{ icon: Hammer, title: 'Expert Craftsmanship', desc: '30+ years experience' },
	]
	return (
		<section className="container py-12">
			<h2 className="font-[var(--font-serif)] text-2xl font-semibold text-secondary">Why Choose Us</h2>
			<div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{features.map((f, i) => (
					<div key={i} className="rounded-lg border p-5">
						<f.icon className="h-6 w-6 text-secondary" />
						<div className="mt-3 text-sm font-semibold text-secondary">{f.title}</div>
						<p className="mt-1 text-sm text-gray-700">{f.desc}</p>
					</div>
				))}
			</div>
		</section>
	)
}


