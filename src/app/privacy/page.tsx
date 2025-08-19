import { Shield, Eye, Lock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold-100">
            <Shield className="h-10 w-10 text-gold-600" />
          </div>
          <h1 className="mb-4 font-serif text-4xl font-bold text-gray-900 md:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Your privacy is important to us. Learn how we protect and handle your information.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="mb-4 font-serif text-2xl font-semibold text-gray-900">
                Our Commitment to Privacy
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                At J&M Jewelry, we value your privacy and are committed to protecting your personal information. 
                This policy explains what data we collect, how we use it, and how we keep it secure.
              </p>
              <p className="leading-relaxed text-gray-700">
                By using our website and services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Eye className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="font-serif text-2xl font-semibold text-gray-900">
                  Data Collection
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Information You Provide</h3>
                  <ul className="ml-6 space-y-2 text-gray-700">
                    <li>• Name and contact information (email, phone, address)</li>
                    <li>• Payment information (processed securely through Stripe)</li>
                    <li>• Order history and preferences</li>
                    <li>• Communication preferences and feedback</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Automatically Collected Information</h3>
                  <ul className="ml-6 space-y-2 text-gray-700">
                    <li>• Device information and IP address</li>
                    <li>• Browser type and version</li>
                    <li>• Pages visited and time spent on site</li>
                    <li>• Referral sources and search terms</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Your Data */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                  <Users className="h-5 w-5 text-emerald-600" />
                </div>
                <CardTitle className="font-serif text-2xl font-semibold text-gray-900">
                  How We Use Your Information
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Primary Uses</h3>
                  <ul className="ml-6 space-y-2 text-gray-700">
                    <li>• Process and fulfill your orders</li>
                    <li>• Communicate about your orders and account</li>
                    <li>• Provide customer support and respond to inquiries</li>
                    <li>• Send order confirmations and shipping updates</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Improvement & Marketing</h3>
                  <ul className="ml-6 space-y-2 text-gray-700">
                    <li>• Improve our website and services</li>
                    <li>• Send promotional emails (with your consent)</li>
                    <li>• Analyze usage patterns and preferences</li>
                    <li>• Prevent fraud and ensure security</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
                  <Lock className="h-5 w-5 text-rose-600" />
                </div>
                <CardTitle className="font-serif text-2xl font-semibold text-gray-900">
                  Data Security
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <p className="mb-4 leading-relaxed text-gray-700">
                We implement appropriate security measures to protect your personal information:
              </p>
              <ul className="ml-6 space-y-2 text-gray-700">
                <li>• SSL encryption for all data transmission</li>
                <li>• Secure payment processing through Stripe</li>
                <li>• Regular security audits and updates</li>
                <li>• Limited access to personal data by authorized personnel only</li>
                <li>• Secure data storage with industry-standard protection</li>
              </ul>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="mb-4 font-serif text-2xl font-semibold text-gray-900">
                Cookies and Tracking
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                We use cookies and similar technologies to improve your browsing experience and provide personalized content.
              </p>
              <div className="space-y-3">
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Essential Cookies</h3>
                  <p className="text-gray-700">Required for basic website functionality and security.</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Analytics Cookies</h3>
                  <p className="text-gray-700">Help us understand how visitors use our website to improve our services.</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Marketing Cookies</h3>
                  <p className="text-gray-700">Used to deliver relevant advertisements and track marketing campaign performance.</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                You can control cookie settings through your browser preferences. Disabling certain cookies may affect website functionality.
              </p>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="mb-4 font-serif text-2xl font-semibold text-gray-900">
                Your Privacy Rights
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                You have the right to:
              </p>
              <ul className="ml-6 space-y-2 text-gray-700">
                <li>• Access your personal information</li>
                <li>• Request correction of inaccurate data</li>
                <li>• Request deletion of your data (subject to legal requirements)</li>
                <li>• Opt out of marketing communications</li>
                <li>• Request data portability</li>
                <li>• Lodge a complaint with supervisory authorities</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                To exercise these rights, please contact us at privacy@jandmjewelry.com
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <h2 className="mb-4 font-serif text-2xl font-semibold text-gray-900">
                Contact Us
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p>Email: privacy@jandmjewelry.com</p>
                <p>Last updated: January 2024</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
