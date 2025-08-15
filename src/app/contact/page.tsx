import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import ContactForm from '@/components/features/ContactForm'
import StoreMap from '@/components/features/StoreMap'

export const metadata: Metadata = {
	title: 'Contact Us — Aurora Jewelry',
	description: 'Get in touch with Aurora Jewelry. Send a message, find our store, or start a custom design.',
}

export default function ContactPage() {
	return (
		<>
			<Header />
			<main className="container py-10">
				<h1 className="font-[var(--font-serif)] text-3xl font-semibold text-secondary">Contact Us</h1>
				<div className="mt-6 grid gap-8 md:grid-cols-3">
					<section className="md:col-span-2">
						<div className="rounded-lg border p-6">
							<h2 className="text-xl font-semibold">Send us a message</h2>
							<p className="mt-1 text-sm text-gray-600">We typically respond within 24 hours.</p>
							<div className="mt-4"><ContactForm /></div>
						</div>
						<div className="mt-6"><StoreMap query="Aurora Jewelry, New York" /></div>
					</section>
					<aside className="md:col-span-1">
						<div className="rounded-lg border p-4 text-sm">
							<div className="font-medium">Contact Information</div>
							<div className="mt-2">
								<div><span className="text-gray-600">Phone:</span> (212) 555-1234</div>
								<div><span className="text-gray-600">Email:</span> support@example.com</div>
								<div><span className="text-gray-600">Hours:</span> Mon–Sat 10–7</div>
								<div><span className="text-gray-600">Address:</span> 123 Fifth Ave, New York, NY</div>
							</div>
							<div className="mt-4">
								<div className="font-medium">Quick Links</div>
								<ul className="mt-2 list-inside list-disc">
									<li><a className="underline" href="/faq">FAQ</a></li>
									<li><a className="underline" href="/policies/shipping">Shipping Policy</a></li>
									<li><a className="underline" href="/policies/returns">Returns Policy</a></li>
								</ul>
							</div>
							<div className="mt-4">
								<a href="#" className="inline-block rounded-md bg-black px-4 py-2 text-white">Live Chat</a>
							</div>
						</div>
					</aside>
				</div>
			</main>
			<Footer />
		</>
	)
}


