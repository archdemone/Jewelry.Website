import { AuthGuard } from '@/components/auth/AuthGuard';



export default function AddressesPage() {
  return (
    <AuthGuard>
      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="mb-6 text-2xl font-semibold">Addresses</h1>
        <p className="text-sm text-gray-600">Coming soon.</p>
      </div>
    </AuthGuard>
  );
}
