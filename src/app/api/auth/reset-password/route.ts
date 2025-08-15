import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { consumePasswordResetToken } from "@/lib/auth/auth-utils";

export async function POST(req: Request) {
	try {
		const { token, password } = await req.json();
		if (!token || !password) return NextResponse.json({ message: "Invalid request" }, { status: 400 });
		const email = await consumePasswordResetToken(token);
		if (!email) return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
		const hashed = await bcrypt.hash(password, 10);
		await db.user.update({ where: { email }, data: { password: hashed } });
		return NextResponse.json({ ok: true });
	} catch (e) {
		return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
	}
}


