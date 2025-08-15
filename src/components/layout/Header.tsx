import Link from 'next/link';
import { ShoppingBag, User, Search } from 'lucide-react';

export function Header() {
	return (
		<header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur">
			<div className="container flex h-16 items-center justify-between">
				<Link href="/" className="font-[var(--font-serif)] text-xl font-semibold text-secondary">
					Aurora Jewelry
				</Link>
				<nav className="hidden items-center gap-6 md:flex">
					<Link href="/" className="text-sm text-text hover:text-secondary">Home</Link>
					<Link href="/(shop)/products" className="text-sm text-text hover:text-secondary">Collections</Link>
					<Link href="/(shop)/about" className="text-sm text-text hover:text-secondary">About</Link>
					<Link href="/contact" className="text-sm text-text hover:text-secondary">Contact</Link>
				</nav>
				<div className="flex items-center gap-4">
					<button aria-label="Search" className="p-2 text-secondary hover:opacity-80">
						<Search className="h-5 w-5" />
					</button>
					<button aria-label="Account" className="p-2 text-secondary hover:opacity-80">
						<User className="h-5 w-5" />
					</button>
					<button aria-label="Cart" className="relative p-2 text-secondary hover:opacity-80">
						<ShoppingBag className="h-5 w-5" />
						<span className="absolute -right-1 -top-1 inline-flex min-w-[1rem] items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-medium text-white">0</span>
					</button>
				</div>
			</div>
		</header>
	);
}


