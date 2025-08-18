import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Welcome Back</h1>
            <p className="mb-8 text-lg text-gray-600">Sign in to your account to continue</p>
          </div>
        </div>
      </section>

      {/* Login Form Section */}
      <section className="py-12">
        <div className="container">
          <div className="mx-auto max-w-md">
            {/* Back to Home */}
            <div className="mb-6">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-gray-600 transition-colors hover:text-gray-900"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </div>

            {/* Login Form */}
            <LoginForm />

            {/* Additional Links */}
            <div className="mt-8 space-y-3 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link
                  className="font-medium text-gold-600 hover:text-gold-700 hover:underline"
                  href="/auth/register"
                >
                  Create one
                </Link>
              </p>
              <p className="text-sm text-gray-600">
                <Link
                  className="font-medium text-gold-600 hover:text-gold-700 hover:underline"
                  href="/auth/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
