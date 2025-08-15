"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogOut, Menu, Package, Settings, ShoppingBag, TrendingUp, Users, LayoutGrid, Box } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import clsx from "clsx";

const navItems = [
	{ href: "/admin", label: "Dashboard", icon: LayoutGrid },
	{ href: "/admin/products", label: "Products", icon: Package },
	{ href: "/admin/orders", label: "Orders", icon: ShoppingBag },
	{ href: "/admin/customers", label: "Customers", icon: Users },
	{ href: "/admin/inventory", label: "Inventory", icon: Box },
	{ href: "/admin/analytics", label: "Analytics", icon: TrendingUp },
	{ href: "/admin/settings", label: "Settings", icon: Settings },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
	const pathname = usePathname();
	return (
		<div className="flex h-full flex-col">
			<div className="h-16 flex items-center px-4 border-b">
				<Link href="/admin" className="flex items-center gap-2">
					<div className="h-8 w-8 rounded bg-amber-500" />
					<span className="text-lg font-bold">Aurora Admin</span>
				</Link>
			</div>
			<nav className="flex-1 p-2">
				{navItems.map((item) => {
					const Icon = item.icon;
					const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
					return (
						<Link
							key={item.href}
							href={item.href}
							className={clsx(
								"flex items-center gap-3 rounded-md px-3 py-2 text-sm",
								active ? "bg-amber-100 text-amber-900" : "hover:bg-gray-100 text-gray-700"
							)}
							onClick={onNavigate}
						>
							<Icon className="h-4 w-4" />
							<span>{item.label}</span>
						</Link>
					);
				})}
			</nav>
			<UserSection />
		</div>
	);
}

function UserSection() {
	const { data } = useSession();
	const name = data?.user?.name || "Admin User";
	const email = data?.user?.email || "admin@example.com";
	return (
		<div className="border-t p-3">
			<div className="flex items-center gap-3">
				<div className="h-8 w-8 rounded-full bg-gray-200" />
				<div className="flex-1">
					<div className="text-sm font-medium">{name}</div>
					<div className="text-xs text-gray-500">{email}</div>
				</div>
				<button
					onClick={() => signOut({ callbackUrl: "/" })}
					className={clsx(buttonVariants({ variant: "ghost", size: "sm" }), "text-gray-600")}
				>
					<LogOut className="h-4 w-4" />
				</button>
			</div>
		</div>
	);
}

export function AdminSidebar() {
	return (
		<aside className="hidden md:flex w-60 shrink-0 border-r bg-gray-50">
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
					<button className={clsx(buttonVariants({ variant: "ghost" }), "h-10 w-10 inline-flex items-center justify-center")}> 
						<Menu className="h-5 w-5" />
					</button>
				</SheetTrigger>
				<SheetContent side="left" className="p-0 w-72">
					<SidebarContent onNavigate={() => setOpen(false)} />
				</SheetContent>
			</Sheet>
		</div>
	);
}

export default AdminSidebar;