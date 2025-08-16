"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ResetPasswordInner() {
	const params = useSearchParams();
	const router = useRouter();
	const token = (params?.get("token") as string | null) || "";
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [done, setDone] = useState(false);

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		if (password !== confirm) {
			setError("Passwords do not match");
			return;
		}
		const res = await fetch("/api/auth/reset-password", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token, password }),
		});
		if (!res.ok) {
			const data = await res.json().catch(() => ({}));
			setError(data?.message || "Failed to reset password");
			return;
		}
		setDone(true);
		setTimeout(() => router.push("/auth/login"), 1000);
	}

	return (
		<div className="mx-auto max-w-md px-4 py-16">
			<h1 className="mb-6 text-2xl font-semibold">Reset password</h1>
			{done ? (
				<p className="text-sm text-gray-700">Password updated. Redirecting…</p>
			) : (
				<form onSubmit={onSubmit} className="space-y-4">
					<div>
						<label className="mb-1 block text-sm font-medium">New password</label>
						<input
							type="password"
							className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							minLength={8}
						/>
					</div>
					<div>
						<label className="mb-1 block text-sm font-medium">Confirm password</label>
						<input
							type="password"
							className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
							value={confirm}
							onChange={(e) => setConfirm(e.target.value)}
							required
						/>
					</div>
					{error && <p className="text-sm text-red-600">{error}</p>}
					<button type="submit" className="w-full rounded-md bg-black px-4 py-2 font-medium text-white hover:bg-gray-800">
						Update password
					</button>
				</form>
			)}
		</div>
	);
}

export default function ResetPasswordPage() {
	return (
		<Suspense fallback={<div className="mx-auto max-w-md px-4 py-16 text-sm text-gray-600">Loading…</div>}>
			<ResetPasswordInner />
		</Suspense>
	)
}


