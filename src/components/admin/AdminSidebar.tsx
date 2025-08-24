'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingBag,
  TrendingUp,
  Users,
  LayoutGrid,
  Box,
  Shield,
  Star,
  Home,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { buttonVariants } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import clsx from 'clsx';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutGrid },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/featured-products', label: 'Featured Products', icon: Star },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/inventory', label: 'Inventory', icon: Box },
  { href: '/admin/analytics', label: 'Analytics', icon: TrendingUp },
  { href: '/admin/media', label: 'Media', icon: Package },
  { href: '/admin/audit', label: 'Audit', icon: TrendingUp },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col w-full">
      <div className="flex h-12 items-center border-b px-3 min-w-0 flex-shrink-0">
        <Link href="/admin" className="flex items-center gap-2 min-w-0">
          <div className="h-5 w-5 rounded bg-amber-500 flex-shrink-0" />
          <span className="text-sm font-bold truncate">Aurora Admin</span>
        </Link>
      </div>
      <nav className="flex-1 p-1 overflow-y-auto min-h-0">
        <div className="space-y-0.5 pt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              !!pathname && (
                pathname === item.href ||
                (item.href === '/admin' && pathname === '/admin') ||
                (item.href !== '/admin' && pathname.startsWith(`${item.href}/`))
              );
            return (
              <Link key={item.href} href={item.href} className={clsx(
                'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm w-full max-w-full',
                active ? 'bg-amber-100 text-amber-900' : 'text-gray-700 hover:bg-gray-100',
              )} onClick={onNavigate}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="truncate min-w-0">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      <div className="flex-shrink-0">
        <UserSection />
      </div>
    </div>
  );
}

function UserSection() {
  const { data } = useSession();
  const name = data?.user?.name || 'Admin User';
  const email = data?.user?.email || 'admin@example.com';
  const role = (data?.user as any)?.role || 'UNKNOWN';
  const mfa = (data?.user as any)?.mfaEnabled ? 'MFA On' : 'MFA Off';
  async function revokeOthers() {
    await fetch('/api/admin/revoke-sessions', { method: 'POST' });
    // optional: toast
  }
  return (
    <div className="border-t p-2">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-gray-200" />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{name}</div>
          <div className="text-xs text-gray-500 truncate">{email}</div>
          <div className="flex items-center gap-1 text-[10px] text-gray-500">
            <Shield className="h-3 w-3" /> {role} • {mfa}
          </div>
        </div>
        <button onClick={() => signOut({ callbackUrl: '/' })}
          className={clsx(buttonVariants({ variant: 'ghost', size: 'sm' }), 'text-gray-600 flex-shrink-0')}
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-2 space-y-1">
        <Link href="/" className={clsx(buttonVariants({ variant: 'outline', size: 'sm' }), 'w-full flex items-center gap-2 text-xs')}>
          <Home className="h-3 w-3" />
          Back to Site
        </Link>
        <button onClick={revokeOthers}
          className={clsx(buttonVariants({ variant: 'outline', size: 'sm' }), 'w-full text-xs')}
        >
          Revoke other sessions
        </button>
      </div>
    </div>
  );
}

export function AdminSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r bg-gray-50 md:flex overflow-hidden z-10" style={{ maxWidth: '16rem' }}>
      <SidebarContent />
    </aside>
  );
}

export function AdminMobileSidebarButton() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className={clsx(
            buttonVariants({ variant: 'ghost' }),
            'inline-flex h-10 w-10 items-center justify-center',
          )}
          >
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <SidebarContent onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default AdminSidebar;
