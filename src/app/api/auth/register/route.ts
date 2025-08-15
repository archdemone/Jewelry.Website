import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
	try {
		const { name, email, password } = await req.json();
		if (!email || !password) {
			return NextResponse.json({ message: "Email and password required" }, { status: 400 });
		}
		const existing = await db.user.findUnique({ where: { email } });
		if (existing) {
			return NextResponse.json({ message: "Email already registered" }, { status: 409 });
		}
		const hashed = await bcrypt.hash(password, 10);
		await db.user.create({ data: { name, email, password: hashed } });
		return NextResponse.json({ ok: true });
	} catch (e) {
		return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
	}
}


