import React from "react";
import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

export function StatsCard({ title, value, change, icon: Icon }: { title: string; value: string; change: string; icon: React.ComponentType<{ className?: string }> }) {
	return (
		<Card className="p-4 flex items-center gap-4 shadow-sm">
			<div className="h-10 w-10 rounded bg-amber-100 text-amber-700 flex items-center justify-center">
				<Icon className="h-5 w-5" />
			</div>
			<div>
				<div className="text-sm text-gray-500">{title}</div>
				<div className="text-2xl font-bold">{value}</div>
				<div className="text-xs text-gray-500">{change}</div>
			</div>
		</Card>
	);
}

export default StatsCard;