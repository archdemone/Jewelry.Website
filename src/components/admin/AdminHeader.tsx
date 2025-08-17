'use client';

import { Bell, Plus } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import clsx from 'clsx';
import Link from 'next/link';
import { AdminMobileSidebarButton } from '@/components/admin/AdminSidebar';

export function AdminHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4">
      <div className="flex items-center gap-2">
        <AdminMobileSidebarButton />
        <div className="font-semibold">Admin Dashboard</div>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/admin/products/new" className={clsx(buttonVariants({ variant: 'default' }))}>
          <Plus className="mr-1 h-4 w-4" /> Add Product
        </Link>
        <button className={clsx(buttonVariants({ variant: 'ghost' }))}>
          <Bell className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
