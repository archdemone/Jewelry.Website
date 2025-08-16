export type AdminRole = "ADMIN" | "STAFF";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { redirect } from "next/navigation";

export async function getSession() {
	return getServerSession(authOptions);
}

export function isAdminOrStaff(role?: string | null): boolean {
	return role === "ADMIN" || role === "STAFF";
}

export async function requireAuthenticatedSession(redirectTo?: string) {
	const session = await getSession();
	if (!session) {
		const target = redirectTo || "/admin";
		redirect(`/auth/login?callbackUrl=${encodeURIComponent(target)}`);
	}
	return session;
}

export async function requireAdminAccess() {
	const session = await getSession();
	if (!session) {
		return { session: null as any, allowed: false as const };
	}
	const role = (session.user as any)?.role as string | undefined;
	if (!isAdminOrStaff(role)) {
		return { session, allowed: false as const };
	}
	return { session, allowed: true as const };
}