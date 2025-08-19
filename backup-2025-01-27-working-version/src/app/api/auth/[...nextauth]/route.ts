import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';

// App Router pattern: export the handler directly as GET and POST.
// Avoid wrapping with custom Request handlers to ensure correct request shape.
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
