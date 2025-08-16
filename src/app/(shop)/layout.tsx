export const dynamic = 'force-dynamic'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{/* Shared header for shop pages */}
			{require('react').createElement(require('@/components/layout/Header').Header)}
			<main className="min-h-screen bg-white">{children}</main>
			{require('react').createElement(require('@/components/layout/Footer').Footer)}
		</>
	)
}


