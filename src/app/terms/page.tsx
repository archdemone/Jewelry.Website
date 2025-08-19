import { FileText, ShoppingCart, RotateCcw, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold-100">
            <FileText className="h-10 w-10 text-gold-600" />
          </div>
          <h1 className="mb-4 font-serif text-4xl font-bold text-gray-900 md:text-5xl">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600">
            Please read these terms carefully before using our services.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="mb-4 font-serif text-2xl font-semibold text-gray-900">
                Agreement to Terms
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                These Terms of Service govern your use of J&M Jewelry's website and services. 
                By accessing or using our website, you agree to be bound by these terms and all applicable laws and regulations.
              </p>
              <p className="leading-relaxed text-gray-700">
                If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </CardContent>
          </Card>

          {/* Orders and Purchases */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="font-serif text-2xl font-semibold text-gray-900">
                  Orders and Purchases
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Order Acceptance</h3>
                  <p className="text-gray-700">
                    All orders are subject to acceptance and availability. We reserve the right to refuse service to anyone for any reason at any time.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Pricing and Payment</h3>
                  <ul className="ml-6 space-y-2 text-gray-700">
                    <li>• All prices are listed in USD and include applicable taxes</li>
                    <li>• Payment is processed securely through Stripe</li>
                    <li>• Orders are not confirmed until payment is received</li>
                    <li>• We reserve the right to modify prices at any time</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Product Availability</h3>
                  <p className="text-gray-700">
                    While we strive to maintain accurate inventory, items may become unavailable. 
                    We will notify you promptly if an item is out of stock and offer alternatives or a refund.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Returns and Refunds */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                  <RotateCcw className="h-5 w-5 text-emerald-600" />
                </div>
                <CardTitle className="font-serif text-2xl font-semibold text-gray-900">
                  Returns and Refunds
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Return Policy</h3>
                  <ul className="ml-6 space-y-2 text-gray-700">
                    <li>• Eligible items can be returned within 30 days of delivery</li>
                    <li>• Items must be in original condition with all packaging</li>
                    <li>• Custom or personalized items are final sale</li>
                    <li>• Sale items may have different return terms</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Refund Process</h3>
                  <ul className="ml-6 space-y-2 text-gray-700">
                    <li>• Refunds are processed within 5-7 business days</li>
                    <li>• Original shipping costs are non-refundable</li>
                    <li>• Return shipping is the responsibility of the customer</li>
                    <li>• Damaged or defective items will be replaced or refunded</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">How to Return</h3>
                  <p className="text-gray-700">
                    Contact us at returns@jandmjewelry.com to initiate a return. 
                    Include your order number and reason for return. We'll provide return instructions and a prepaid shipping label if applicable.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping and Delivery */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="mb-4 font-serif text-2xl font-semibold text-gray-900">
                Shipping and Delivery
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Processing Time</h3>
                  <p className="text-gray-700">
                    Orders are typically processed within 1-3 business days. Custom pieces may require additional time.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Shipping Options</h3>
                  <ul className="ml-6 space-y-2 text-gray-700">
                    <li>• Standard shipping: 5-7 business days</li>
                    <li>• Express shipping: 2-3 business days</li>
                    <li>• International shipping available to select countries</li>
                    <li>• Tracking information provided for all shipments</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Delivery</h3>
                  <p className="text-gray-700">
                    Delivery requires a signature for orders over $500. 
                    We are not responsible for delays due to weather, customs, or other circumstances beyond our control.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Information */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="mb-4 font-serif text-2xl font-semibold text-gray-900">
                Product Information
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Product Descriptions</h3>
                  <p className="text-gray-700">
                    We strive to provide accurate product descriptions and images. 
                    However, actual colors and sizes may vary slightly due to monitor settings and manufacturing variations.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Care Instructions</h3>
                  <p className="text-gray-700">
                    Each piece comes with care instructions. Proper care will help maintain the beauty and longevity of your jewelry.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Warranty</h3>
                  <p className="text-gray-700">
                    Our jewelry comes with a limited warranty against manufacturing defects. 
                    Normal wear and tear, damage from accidents, or improper care are not covered.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy and Security */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
                  <Shield className="h-5 w-5 text-rose-600" />
                </div>
                <CardTitle className="font-serif text-2xl font-semibold text-gray-900">
                  Privacy and Security
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <p className="mb-4 leading-relaxed text-gray-700">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
              </p>
              <ul className="ml-6 space-y-2 text-gray-700">
                <li>• We use secure payment processing through Stripe</li>
                <li>• Personal information is encrypted and protected</li>
                <li>• We do not sell or share your personal information</li>
                <li>• You can opt out of marketing communications at any time</li>
              </ul>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="mb-4 font-serif text-2xl font-semibold text-gray-900">
                Limitation of Liability
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                J&M Jewelry shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
              <p className="leading-relaxed text-gray-700">
                Our total liability to you for any claims arising from the use of our services shall not exceed the amount you paid for the specific item giving rise to the claim.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="mb-4 font-serif text-2xl font-semibold text-gray-900">
                Changes to Terms
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website.
              </p>
              <p className="leading-relaxed text-gray-700">
                Your continued use of our services after changes are posted constitutes acceptance of the new terms.
              </p>
            </CardContent>
          </Card>


        </div>
      </div>
    </div>
  );
}
