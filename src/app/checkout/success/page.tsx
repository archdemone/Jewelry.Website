export default function CheckoutSuccessPage() {
	return (
		<div className="mx-auto max-w-2xl text-center space-y-4 py-10">
			<div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
				<span className="text-green-600 text-3xl">✓</span>
			</div>
			<h1 className="text-2xl font-semibold">Thank you for your order!</h1>
			<p className="text-muted-foreground">We sent a confirmation email with your receipt and order details.</p>
			<div className="pt-4">
				<a href="/" className="rounded-md bg-yellow-500 px-4 py-2 text-white">Continue shopping</a>
			</div>
		</div>
	)
}