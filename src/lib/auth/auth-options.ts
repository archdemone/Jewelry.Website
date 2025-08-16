import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

const providers: NextAuthOptions["providers"] = [
	CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;
				const user = await db.user.findUnique({ where: { email: credentials.email } });
				if (!user?.password) return null;
				const valid = await bcrypt.compare(credentials.password, user.password);
				if (!valid) return null;
				return { id: user.id, email: user.email, name: user.name, image: user.image, role: user.role } as any;
			},
		}),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
	providers.unshift(
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			allowDangerousEmailAccountLinking: true,
		})
	);
}

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(db as any),
	providers,
	secret: process.env.NEXTAUTH_SECRET || 'dev-secret',
	pages: {
		signIn: "/auth/login",
	},
	callbacks: {
		async session({ session, token, user }) {
			if (session.user) {
				(session.user as any).id = user?.id || token?.sub;
				(session.user as any).role = (user as any)?.role || (token as any)?.role || "CUSTOMER";
			}
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				(token as any).role = (user as any).role;
			}
			return token;
		},
	},
	session: { strategy: "jwt" },
};


