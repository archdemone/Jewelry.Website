export default function NewsletterSection() {
	return (
		<section className="container py-12">
			<div className="rounded-2xl bg-accent p-8 text-center">
				<h2 className="font-[var(--font-serif)] text-2xl font-semibold text-secondary">Get 10% Off Your First Order</h2>
				<p className="mt-2 text-sm text-gray-700">Subscribe to receive exclusive offers and new collection updates.</p>
				<form className="mx-auto mt-5 flex max-w-md gap-2">
					<input type="email" required placeholder="you@example.com" className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
					<button className="rounded-md bg-secondary px-4 py-2 text-sm text-white hover:opacity-90">Subscribe</button>
				</form>
				<p className="mt-2 text-xs text-gray-500">By subscribing, you agree to our privacy policy.</p>
			</div>
		</section>
	)
}


