import { AuthGuard } from '@/components/auth/AuthGuard';

export default function OrdersPage() {
  return (
    <AuthGuard>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-6 text-2xl font-semibold">Orders</h1>
        <p className="text-sm text-gray-600">Coming soon.</p>
      </div>
    </AuthGuard>
  );
}
