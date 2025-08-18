import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Welcome Back
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Sign in to your account to continue
            </p>
          </div>
        </div>
      </section>

      {/* Login Form Section */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-md mx-auto">
            {/* Back to Home */}
            <div className="mb-6">
              <Link 
                href="/" 
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>

            {/* Login Form */}
            <LoginForm />

            {/* Additional Links */}
            <div className="mt-8 text-center space-y-3">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link 
                  className="text-gold-600 hover:text-gold-700 font-medium hover:underline" 
                  href="/auth/register"
                >
                  Create one
                </Link>
              </p>
              <p className="text-sm text-gray-600">
                <Link 
                  className="text-gold-600 hover:text-gold-700 font-medium hover:underline" 
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
