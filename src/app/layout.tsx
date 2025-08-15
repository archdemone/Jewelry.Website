import type { Metadata } from 'next';
import './globals.css';
import '../styles/fonts.css';
import { AuthSessionProvider } from '@/lib/auth/session-provider';
import { Toaster } from 'react-hot-toast';
import NewsletterPopup from '@/components/features/NewsletterPopup';
import CookieBanner from '@/components/features/CookieBanner';
import LiveChat from '@/components/features/LiveChat';
import { AnalyticsProviders } from '@/lib/performance/analytics'
import Script from 'next/script'
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
	preload: true,
})

const playfair = Playfair_Display({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-playfair',
	preload: true,
	weight: ['400', '700'],
})

export const metadata: Metadata = {
	title: 'Jewelry Website',
	description: 'Modern jewelry storefront',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
			<body className="min-h-screen bg-white text-text antialiased font-[var(--font-sans)]">
				<AuthSessionProvider>
					{children}
					{/* Site-wide widgets */}
					<Toaster position="top-right" toastOptions={{ duration: 3500 }} />
					<CookieBanner />
					<NewsletterPopup />
					<LiveChat />
					<AnalyticsProviders />
					{/* Optional: Google Analytics 4 - requires GA_MEASUREMENT_ID env */}
					{process.env.NEXT_PUBLIC_GA_ID && (
						<>
							<Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
							<Script id="google-analytics" strategy="afterInteractive">
								{`
									window.dataLayer = window.dataLayer || [];
									function gtag(){dataLayer.push(arguments);}
									gtag('js', new Date());
									gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
								`}
							</Script>
						</>
					)}
				</AuthSessionProvider>
			</body>
		</html>
	);
}


