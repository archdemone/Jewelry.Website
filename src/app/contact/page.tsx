import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
	return (
		<>
			<Header />
			<main className="container py-10">
				<section className="mx-auto max-w-xl">
					<h1 className="font-[var(--font-serif)] text-3xl font-semibold text-secondary">Contact Us</h1>
					<form className="mt-6 grid gap-4">
						<div>
							<label htmlFor="name" className="text-sm font-medium text-secondary">Name</label>
							<Input id="name" placeholder="Your name" required className="mt-1" />
						</div>
						<div>
							<label htmlFor="email" className="text-sm font-medium text-secondary">Email</label>
							<Input id="email" type="email" placeholder="you@example.com" required className="mt-1" />
						</div>
						<div>
							<label htmlFor="message" className="text-sm font-medium text-secondary">Message</label>
							<Textarea id="message" placeholder="How can we help?" rows={5} required className="mt-1" />
						</div>
						<Button type="submit" className="w-full">Send</Button>
					</form>
				</section>
			</main>
			<Footer />
		</>
	)
}


