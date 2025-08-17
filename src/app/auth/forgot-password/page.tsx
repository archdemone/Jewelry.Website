"use client";
import React, { useState } from "react";

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [sent, setSent] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		const res = await fetch("/api/auth/forgot-password", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email }),
		});
		if (!res.ok) {
			const data = await res.json().catch(() => ({}));
			setError(data?.message || "Failed to send reset link");
			return;
		}
		setSent(true);
	}

	return (
		<div className="mx-auto max-w-md px-4 py-16">
			<h1 className="mb-6 text-2xl font-semibold">Forgot password</h1>
			{sent ? (
				<p className="text-sm text-gray-700">If an account exists, a reset link has been sent.</p>
			) : (
				<form onSubmit={onSubmit} className="space-y-4">
					<div>
						<label className="mb-1 block text-sm font-medium">Email</label>
						<input
							type="email"
							className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					{error && <p className="text-sm text-red-600">{error}</p>}
					<button type="submit" className="w-full rounded-md bg-black px-4 py-2 font-medium text-white hover:bg-gray-800">
						Send reset link
					</button>
				</form>
			)}
		</div>
	);
}


