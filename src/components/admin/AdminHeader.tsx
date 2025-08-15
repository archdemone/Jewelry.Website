"use client";

import { Bell, Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import Link from "next/link";
import { AdminMobileSidebarButton } from "@/components/admin/AdminSidebar";

export function AdminHeader() {
	return (
		<header className="h-16 border-b bg-white flex items-center justify-between px-4">
			<div className="flex items-center gap-2">
				<AdminMobileSidebarButton />
				<div className="font-semibold">Admin Dashboard</div>
			</div>
			<div className="flex items-center gap-2">
				<Link href="/admin/products/new" className={clsx(buttonVariants({ variant: "default" }))}>
					<Plus className="h-4 w-4 mr-1" /> Add Product
				</Link>
				<button className={clsx(buttonVariants({ variant: "ghost" }))}>
					<Bell className="h-5 w-5" />
				</button>
			</div>
		</header>
	);
}

export default AdminHeader;