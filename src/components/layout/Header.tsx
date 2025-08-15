"use client"

import Link from 'next/link';
import { ShoppingBag, User, Search, LogOut } from 'lucide-react';
import { useSession, signOut, signIn } from 'next-auth/react'
import { useCartStore } from '@/store/cart';
import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

export function Header() {
	const count = useCartStore((s) => s.count)
	const [open, setOpen] = React.useState(false)
	const [q, setQ] = React.useState('')
	const [mounted, setMounted] = React.useState(false)
	const router = useRouter()
  const { data: session } = useSession()

	React.useEffect(() => {
		setMounted(true)
	}, [])

	React.useEffect(() => {
		if (!q) return
		const t = setTimeout(() => {
			router.push(`/products?q=${encodeURIComponent(q)}`)
		}, 500)
		return () => clearTimeout(t)
	}, [q, router])

	return (
		<header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur">
			<div className="container flex h-16 items-center justify-between">
				<Link href="/" className="font-[var(--font-serif)] text-xl font-semibold text-secondary">
					Aurora Jewelry
				</Link>
				<nav className="hidden items-center gap-6 md:flex">
					<Link href="/" className="text-sm text-text hover:text-secondary">Home</Link>
					<Link href="/products" className="text-sm text-text hover:text-secondary">Collections</Link>
					<Link href="/about" className="text-sm text-text hover:text-secondary">About</Link>
					<Link href="/contact" className="text-sm text-text hover:text-secondary">Contact</Link>
				</nav>
				<div className="flex items-center gap-4">
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger asChild>
							<button aria-label="Search" className="p-2 text-secondary hover:opacity-80">
								<Search className="h-5 w-5" />
							</button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Search products</DialogTitle>
							</DialogHeader>
							<Input autoFocus placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} />
						</DialogContent>
					</Dialog>
					{session?.user ? (
						<div className="flex items-center gap-2">
							<Link href="/account" className="p-2 text-secondary hover:opacity-80" aria-label="Account">
								<User className="h-5 w-5" />
							</Link>
							<button onClick={() => signOut()} aria-label="Logout" className="p-2 text-secondary hover:opacity-80">
								<LogOut className="h-5 w-5" />
							</button>
						</div>
					) : (
						<button onClick={() => signIn()} aria-label="Account" className="p-2 text-secondary hover:opacity-80">
							<User className="h-5 w-5" />
						</button>
					)}
					<Link href="/cart" aria-label="Cart" className="relative p-2 text-secondary hover:opacity-80">
						<ShoppingBag className="h-5 w-5" />
						{mounted && count > 0 && (
							<span className="absolute -right-1 -top-1 inline-flex min-w-[1rem] items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-medium text-white">{count}</span>
						)}
					</Link>
				</div>
			</div>
		</header>
	);
}


