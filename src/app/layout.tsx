import type { Metadata } from 'next';
import './globals.css';
import '../styles/fonts.css';

export const metadata: Metadata = {
	title: 'Jewelry Website',
	description: 'Modern jewelry storefront',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="scroll-smooth">
			<body className="min-h-screen bg-accent text-text antialiased font-[var(--font-sans)]">{children}</body>
		</html>
	);
}


