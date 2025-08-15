import { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { requireAdminAccess } from "@/lib/admin/admin-auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
	const { allowed } = await requireAdminAccess();
	if (!allowed) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="text-center">
					<div className="text-2xl font-bold mb-2">403 - Forbidden</div>
					<div className="text-gray-600">You do not have access to this area.</div>
				</div>
			</div>
		);
	}
	return (
		<div className="flex h-screen bg-gray-100">
			<AdminSidebar />
			<div className="flex-1 flex flex-col">
				<AdminHeader />
				<main className="flex-1 overflow-y-auto p-6">{children}</main>
			</div>
		</div>
	);
}