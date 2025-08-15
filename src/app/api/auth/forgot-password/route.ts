import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createPasswordResetToken } from "@/lib/auth/auth-utils";

export async function POST(req: Request) {
	try {
		const { email } = await req.json();
		if (!email) return NextResponse.json({ message: "Email required" }, { status: 400 });
		const user = await db.user.findUnique({ where: { email } });
		if (user) {
			const { token } = await createPasswordResetToken(email);
			// TODO: send email with link `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`
		}
		return NextResponse.json({ ok: true });
	} catch (e) {
		return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
	}
}


