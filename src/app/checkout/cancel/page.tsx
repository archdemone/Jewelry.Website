export default function CheckoutCancelPage() {
	return (
		<div className="mx-auto max-w-2xl text-center space-y-4 py-10">
			<div className="mx-auto h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
				<span className="text-red-600 text-3xl">!</span>
			</div>
			<h1 className="text-2xl font-semibold">Payment was cancelled</h1>
			<p className="text-muted-foreground">No charges were made. You can try again or contact our support if the issue persists.</p>
			<div className="flex items-center justify-center gap-3 pt-4">
				<a href="/cart" className="rounded-md border px-4 py-2">Return to cart</a>
				<a href="/contact" className="rounded-md bg-yellow-500 px-4 py-2 text-white">Contact support</a>
			</div>
		</div>
	)
}