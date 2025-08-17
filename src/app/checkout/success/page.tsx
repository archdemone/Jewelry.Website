export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 py-10 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <span className="text-3xl text-green-600">✓</span>
      </div>
      <h1 className="text-2xl font-semibold">Thank you for your order!</h1>
      <p className="text-muted-foreground">
        We sent a confirmation email with your receipt and order details.
      </p>
      <div className="pt-4">
        <a href="/" className="rounded-md bg-yellow-500 px-4 py-2 text-white">
          Continue shopping
        </a>
      </div>
    </div>
  );
}
