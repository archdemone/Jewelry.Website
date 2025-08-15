import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import clsx from "clsx";

export function QuickActions() {
	return (
		<Card className="p-4">
			<div className="font-semibold mb-3">Quick Actions</div>
			<div className="flex flex-wrap gap-2">
				<Link href="/admin/products/new" className={clsx(buttonVariants({ variant: "secondary" }))}>Add Product</Link>
				<Link href="/admin/orders/new" className={clsx(buttonVariants({ variant: "secondary" }))}>Create Order</Link>
				<Link href="/admin/customers/new" className={clsx(buttonVariants({ variant: "secondary" }))}>Add Customer</Link>
				<Link href="/admin/analytics" className={clsx(buttonVariants({ variant: "secondary" }))}>Generate Report</Link>
				<Link href="/admin/settings" className={clsx(buttonVariants({ variant: "secondary" }))}>Export Data</Link>
			</div>
		</Card>
	);
}

export default QuickActions;