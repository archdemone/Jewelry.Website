<<<<<<< HEAD
'use client';

import React, { useEffect, useState, type FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tsToken, setTsToken] = useState<string | undefined>(undefined);
  const [requireCaptcha, setRequireCaptcha] = useState<boolean>(false);

  useEffect(() => {
    // If Turnstile key is configured, we can render widget when backend indicates needed
    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
      // Always render; backend will enforce after too many failures
      setRequireCaptcha(true);
    }

    // Development auto-login: Auto-fill admin credentials
    if (process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_SANDBOX === '1') {
      console.log('🛠️  Development mode detected - auto-filling admin credentials');
      setEmail('admin@jewelry.com');
      setPassword('boberpoper34');
    }
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
        turnstileToken: tsToken,
      });

      if (res?.error) {
        setError('Invalid email or password.');
        setLoading(false);
        return;
      }

      if (res?.ok) {
        // Successful login - check for callback URL
        const callbackUrl = searchParams?.get('callbackUrl');
        if (callbackUrl) {
          router.push(callbackUrl);
        } else {
          router.push('/account');
        }
      } else {
        setError('Login failed. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // Clear any previous errors when user starts typing
    if (error) setError(null);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear any previous errors when user starts typing
    if (error) setError(null);
  };

  return (
=======
'use client';

import React, { useEffect, useState, type FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tsToken, setTsToken] = useState<string | undefined>(undefined);
  const [requireCaptcha, setRequireCaptcha] = useState<boolean>(false);

  useEffect(() => {
    // If Turnstile key is configured, we can render widget when backend indicates needed
    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
      // Always render; backend will enforce after too many failures
      setRequireCaptcha(true);
    }
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
        turnstileToken: tsToken,
      });

      if (res?.error) {
        setError('Invalid email or password.');
        setLoading(false);
        return;
      }

      if (res?.ok) {
        // Successful login
        router.push('/account');
      } else {
        setError('Login failed. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // Clear any previous errors when user starts typing
    if (error) setError(null);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear any previous errors when user starts typing
    if (error) setError(null);
  };

  return (
>>>>>>> 5fc3b20079238d8670d61bf90a7940c7b1f46d8f
    <Card className="p-6 shadow-lg">
              <form onSubmit={onSubmit} className="space-y-4">
              <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
            Email Address
          </label>
              <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10 text-gray-900"              value={email}              onChange={handleEmailChange}
              required              disabled={loading}
              autoComplete="email"
            />
              </div>
              </div>
              <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
            Password
          </label>
              <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input id="password"              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="pl-10 pr-10 text-gray-900"              value={password}              onChange={handlePasswordChange}
              required              disabled={loading}
              autoComplete="current-password"
            />
              <button type="button"              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"              disabled={loading}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
              </div>
              </div>

        {requireCaptcha && (
          <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
              Security Verification
            </label>
              <Input type="text"
              placeholder="Turnstile token (if required)"              value={tsToken || ''}              onChange={(e) => setTsToken(e.target.value)}              disabled={loading}
            />
              </div>
        )}

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3">
              <p className="text-sm text-red-600">{error}</p>
              </div>
        )}

        <Button type="submit"
          className="w-full bg-gold-500 font-medium text-black hover:bg-gold-600" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </Button>
              <div className="relative">
              <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
              </div>
              <Button type="button"
          variant="outline"
          className="w-full"
          onClick={() => signIn('google')}
          disabled={loading}
        >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
              <path fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
              <path fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
              <path fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
              </svg>
          Continue with Google
        </Button>

        {/* Development Auto-Login Button */}
        {process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_SANDBOX === '1' && (
          <Button type="button"
            variant="outline"
            className="w-full bg-green-50 border-green-300 text-green-700 hover:bg-green-100"
            onClick={async () => {
              setEmail('admin@jewelry.com');
              setPassword('boberpoper34');
              setError(null);
              setLoading(true);

              try {
                const res = await signIn('credentials', {
                  redirect: false,
                  email: 'admin@jewelry.com',
                  password: 'boberpoper34',
                  turnstileToken: tsToken,
                });

                if (res?.error) {
                  setError('Auto-login failed. Please try manual login.');
                  setLoading(false);
                  return;
                }

                if (res?.ok) {
                  const callbackUrl = searchParams?.get('callbackUrl') || '/admin';
                  router.push(callbackUrl);
                } else {
                  setError('Auto-login failed. Please try manual login.');
                  setLoading(false);
                }
              } catch (err) {
                console.error('Auto-login error:', err);
                setError('Auto-login failed. Please try manual login.');
                setLoading(false);
              }
            }}
            disabled={loading}
          >
            🚀 Quick Admin Login (Dev Only)
          </Button>
        )}

        {/* Development Info */}
        {process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_SANDBOX === '1' && (
          <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
              <p className="text-xs text-blue-600">
              <strong>Development Mode:</strong> Admin credentials are auto-filled.
              <br />
              Email: admin@jewelry.com
              <br />
              Password: boberpoper34
              <br />
              Use "Quick Admin Login" button for instant access.
            </p>
              </div>
        )}
      </form>
              </Card>
  );
}
