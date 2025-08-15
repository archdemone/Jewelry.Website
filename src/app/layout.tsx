import type { Metadata } from 'next';
import './globals.css';
import '../styles/fonts.css';
import { AuthSessionProvider } from '@/lib/auth/session-provider';
import { Toaster } from 'react-hot-toast';
import NewsletterPopup from '@/components/features/NewsletterPopup';
import CookieBanner from '@/components/features/CookieBanner';
import LiveChat from '@/components/features/LiveChat';

export const metadata: Metadata = {
	title: 'Jewelry Website',
	description: 'Modern jewelry storefront',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="scroll-smooth">
			<body className="min-h-screen bg-white text-text antialiased font-[var(--font-sans)]">
				<AuthSessionProvider>
					{children}
					{/* Site-wide widgets */}
					<Toaster position="top-right" toastOptions={{ duration: 3500 }} />
					<CookieBanner />
					<NewsletterPopup />
					<LiveChat />
				</AuthSessionProvider>
			</body>
		</html>
	);
}


