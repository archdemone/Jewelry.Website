"use client"

export default function GuestCheckout({ onContinue }: { onContinue?: () => void }) {
	return (
		<div className="rounded-md border p-4">
			<h3 className="mb-2 font-semibold">Checkout as a guest</h3>
			<ul className="mb-3 list-disc pl-5 text-sm text-muted-foreground">
				<li>No account required</li>
				<li>Track your order via email</li>
				<li>Create an account after purchase with one click</li>
			</ul>
			<button type="button" onClick={onContinue} className="rounded-md border px-4 py-2">Continue as guest</button>
		</div>
	)
}