"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		setLoading(true);
		const res = await signIn("credentials", { redirect: false, email, password });
		setLoading(false);
		if (res?.error) {
			setError("Invalid email or password.");
			return;
		}
		router.push("/account");
	}

	return (
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
			<div>
				<label className="mb-1 block text-sm font-medium">Password</label>
				<input
					type="password"
					className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</div>
			{error && <p className="text-sm text-red-600">{error}</p>}
			<button
				type="submit"
				className="w-full rounded-md bg-black px-4 py-2 font-medium text-white hover:bg-gray-800 disabled:opacity-60"
				disabled={loading}
			>
				{loading ? "Signing in..." : "Sign in"}
			</button>
			<button
				type="button"
				onClick={() => signIn("google")}
				className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-900 hover:bg-gray-50"
			>
				Continue with Google
			</button>
		</form>
	);
}


