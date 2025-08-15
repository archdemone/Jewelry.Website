import { Badge } from "@/components/ui/badge";

export function OrderStatusBadge({ status }: { status: string }) {
	const variant =
		status === "Paid" || status === "Completed"
			? "default"
			: status === "Pending"
			? "secondary"
			: status === "Unpaid" || status === "Failed"
			? "destructive"
			: "outline";
	return <Badge variant={variant as any}>{status}</Badge>;
}

export default OrderStatusBadge;