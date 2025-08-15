import { format } from "date-fns";
import * as XLSX from "xlsx";

export function formatCurrency(amount: number, currency: string = "USD") {
	return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

export function formatDate(date: Date | string, fmt: string = "PP") {
	const d = typeof date === "string" ? new Date(date) : date;
	return format(d, fmt);
}

export function exportToCSV<T extends object>(rows: T[], filename: string) {
	const worksheet = XLSX.utils.json_to_sheet(rows);
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
	XLSX.writeFile(workbook, filename.endsWith(".csv") ? filename : `${filename}.csv`);
}

export async function parseCSV(file: File): Promise<Record<string, any>[]> {
	const buffer = await file.arrayBuffer();
	const workbook = XLSX.read(buffer, { type: "array" });
	const firstSheetName = workbook.SheetNames[0];
	const worksheet = workbook.Sheets[firstSheetName];
	return XLSX.utils.sheet_to_json(worksheet);
}

export type PresetRange = "7d" | "30d" | "90d" | "1y";

export function getDateRange(preset: PresetRange): { start: Date; end: Date } {
	const end = new Date();
	const start = new Date(end);
	switch (preset) {
		case "7d":
			start.setDate(end.getDate() - 6);
			break;
		case "30d":
			start.setDate(end.getDate() - 29);
			break;
		case "90d":
			start.setDate(end.getDate() - 89);
			break;
		case "1y":
			start.setFullYear(end.getFullYear() - 1);
			break;
	}
	return { start, end };
}