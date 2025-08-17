import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="mb-6 text-2xl font-semibold">Sign in</h1>
      <LoginForm />
      <p className="mt-6 text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link className="text-blue-600 hover:underline" href="/auth/register">
          Create one
        </Link>
      </p>
    </div>
  );
}
