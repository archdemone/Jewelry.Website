import { ReactNode } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { requireAdminAccess } from '@/lib/admin/admin-auth';
import { CartProvider } from '@/components/providers/CartProvider';
import { AuthSessionProvider } from '@/lib/auth/session-provider';

export const metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { allowed } = await requireAdminAccess();
  if (!allowed) {
    return null;
  }
  return (
    <AuthSessionProvider>
      <CartProvider>
        <div className="flex h-screen bg-gray-100 overflow-hidden admin-layout">
          <AdminSidebar />
          <div className="flex flex-1 flex-col min-w-0">
            <AdminHeader />
            <main className="flex-1 overflow-y-auto p-6 admin-content text-stable">{children}</main>
          </div>
        </div>
      </CartProvider>
    </AuthSessionProvider>
  );
}
