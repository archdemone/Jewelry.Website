import { AuthGuard } from "@/components/auth/AuthGuard";
import Link from "next/link";

export default function AccountPage() {
	return (
		<AuthGuard>
			<div className="mx-auto max-w-3xl px-4 py-12">
				<h1 className="mb-6 text-2xl font-semibold">My Account</h1>
				<div className="grid gap-4 sm:grid-cols-2">
					<Link href="/account/profile" className="rounded-lg border p-4 hover:bg-gray-50">Profile</Link>
					<Link href="/account/orders" className="rounded-lg border p-4 hover:bg-gray-50">Orders</Link>
					<Link href="/account/addresses" className="rounded-lg border p-4 hover:bg-gray-50">Addresses</Link>
					<Link href="/account/wishlist" className="rounded-lg border p-4 hover:bg-gray-50">Wishlist</Link>
				</div>
			</div>
		</AuthGuard>
	);
}


