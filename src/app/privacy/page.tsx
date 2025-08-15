import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function PrivacyPage() {
	return (
		<>
			<Header />
			<main className="container py-10">
				<section className="prose prose-sm max-w-none">
					<h1>Privacy Policy</h1>
					<p>We value your privacy. This policy explains what data we collect and how we use it.</p>
					<h2>Data Collection</h2>
					<p>We collect information you provide, such as name and email, to provide our services.</p>
					<h2>Cookies</h2>
					<p>We use cookies to improve your experience. You can disable cookies in your browser settings.</p>
				</section>
			</main>
			<Footer />
		</>
	)
}


