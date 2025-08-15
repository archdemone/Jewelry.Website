import type { Metadata } from 'next';
import './globals.css';
import '../styles/fonts.css';
import { AuthSessionProvider } from '@/lib/auth/session-provider';

export const metadata: Metadata = {
	title: 'Jewelry Website',
	description: 'Modern jewelry storefront',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="scroll-smooth">
			<body className="min-h-screen bg-white text-text antialiased font-[var(--font-sans)]">
				<AuthSessionProvider>{children}</AuthSessionProvider>
			</body>
		</html>
	);
}


