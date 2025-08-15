"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getDateRange, PresetRange } from "@/lib/admin/admin-utils";
import { format } from "date-fns";

function generateSeries(range: { start: Date; end: Date }) {
	const days: { date: string; revenue: number; orders: number }[] = [];
	const d = new Date(range.start);
	while (d <= range.end) {
		days.push({
			date: format(d, "MMM d"),
			revenue: Math.round(200 + Math.random() * 1000),
			orders: Math.round(2 + Math.random() * 25),
		});
		d.setDate(d.getDate() + 1);
	}
	return days;
}

export function SalesChart() {
	const [preset, setPreset] = useState<PresetRange>("30d");
	const [mode, setMode] = useState<"line" | "bar">("line");
	const [compare, setCompare] = useState(false);

	const primaryRange = useMemo(() => getDateRange(preset), [preset]);
	const primary = useMemo(() => generateSeries(primaryRange), [primaryRange]);
	const comparison = useMemo(() => {
		if (!compare) return [] as typeof primary;
		const { start, end } = primaryRange;
		const diff = end.getTime() - start.getTime();
		const prevStart = new Date(start.getTime() - diff - 24 * 60 * 60 * 1000);
		const prevEnd = new Date(start.getTime() - 24 * 60 * 60 * 1000);
		return generateSeries({ start: prevStart, end: prevEnd });
	}, [compare, primaryRange]);

	const ChartImpl = mode === "line" ? LineChart : BarChart;

	return (
		<Card className="p-4">
			<div className="flex items-center justify-between mb-3">
				<div className="font-semibold">Sales (Revenue & Orders)</div>
				<div className="flex items-center gap-2 text-sm">
					<div className="rounded border p-1">
						{(["7d", "30d", "90d", "1y"] as PresetRange[]).map((p) => (
							<button
								key={p}
								onClick={() => setPreset(p)}
								className={`px-2 py-1 ${preset === p ? "bg-amber-100 text-amber-900 rounded" : "text-gray-600"}`}
							>
								{p}
							</button>
						))}
					</div>
					<div className="rounded border p-1">
						<button onClick={() => setMode("line")} className={`px-2 py-1 ${mode === "line" ? "bg-amber-100 text-amber-900 rounded" : "text-gray-600"}`}>Line</button>
						<button onClick={() => setMode("bar")} className={`px-2 py-1 ${mode === "bar" ? "bg-amber-100 text-amber-900 rounded" : "text-gray-600"}`}>Bar</button>
					</div>
					<label className="flex items-center gap-2">
						<input type="checkbox" checked={compare} onChange={(e) => setCompare(e.target.checked)} />
						<span>Compare previous period</span>
					</label>
					<Button variant="secondary" onClick={() => exportChart(primary)}>
						Export
					</Button>
				</div>
			</div>
			<div className="h-72">
				<ResponsiveContainer width="100%" height="100%">
					<ChartImpl data={primary} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="date" />
						<YAxis yAxisId="left" orientation="left" />
						<YAxis yAxisId="right" orientation="right" hide />
						<Tooltip />
						<Legend />
						{mode === "line" ? (
							<>
								<Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2} dot={false} name="Revenue" />
								<Line yAxisId="right" type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} dot={false} name="Orders" />
								{compare && (
									<Line yAxisId="left" type="monotone" dataKey="revenue" data={comparison} stroke="#f59e0b" strokeDasharray="4 4" dot={false} name="Revenue (prev)" />
								)}
							</>
						) : (
							<>
								<Bar yAxisId="left" dataKey="revenue" fill="#f59e0b" name="Revenue" />
								<Bar yAxisId="right" dataKey="orders" fill="#3b82f6" name="Orders" />
							</>
						)}
					</ChartImpl>
				</ResponsiveContainer>
			</div>
		</Card>
	);
}

function exportChart(rows: { date: string; revenue: number; orders: number }[]) {
	const csv = ["date,revenue,orders", ...rows.map((r) => `${r.date},${r.revenue},${r.orders}`)].join("\n");
	const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "sales.csv";
	a.click();
	URL.revokeObjectURL(url);
}

export default SalesChart;