export default function TestimonialsSection() {
	const testimonials = [
		{
			name: 'Sarah Johnson',
			comment: 'The quality exceeded my expectations. My engagement ring is absolutely stunning!',
			rating: 5,
		},
		{ name: 'Emily Clark', comment: 'Beautiful craftsmanship and fast shipping. Highly recommend!', rating: 5 },
		{ name: 'Liam Turner', comment: 'Great customer service and the bracelet is perfect.', rating: 4 },
	]
	return (
		<section className="container py-12">
			<h2 className="font-[var(--font-serif)] text-2xl font-semibold text-secondary">What Our Customers Say</h2>
			<div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
				{testimonials.map((t, i) => (
					<div key={i} className="rounded-lg border p-5">
						<div className="text-sm font-semibold text-secondary">{t.name}</div>
						<div className="mt-1 text-xs text-yellow-600">{'★★★★★☆☆☆☆☆'.slice(5 - t.rating, 10 - t.rating)}</div>
						<p className="mt-3 text-sm text-gray-700">{t.comment}</p>
					</div>
				))}
			</div>
		</section>
	)
}


