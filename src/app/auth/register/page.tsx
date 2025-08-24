import Link from 'next/link';
import RegisterForm from '@/components/auth/RegisterForm';
import { ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Create Your Account</h1>
            <p className="mb-8 text-lg text-gray-600">Join us and start your jewelry journey today</p>
          </div>
        </div>
      </section>

      {/* Register Form Section */}
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

            {/* Register Form */}
            <RegisterForm />

            {/* Additional Links */}
            <div className="mt-8 space-y-3 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link 
                  className="font-medium text-gold-600 hover:text-gold-700 hover:underline"
                  href="/auth/login"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
