'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Send, 
  Upload, 
  Palette, 
  Gem, 
  Ruler, 
  Package,
  CheckCircle
} from 'lucide-react';

interface DesignFormData {
  name: string;
  email: string;
  phone: string;
  ringType: string;
  material: string;
  gemColor: string;
  gemDensity: string;
  ringSize: string;
  ringWidth: string;
  description: string;
  referenceImages: File[];
}

export default function CustomDesignPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<DesignFormData>({
    name: '',
    email: '',
    phone: '',
    ringType: '',
    material: '',
    gemColor: '',
    gemDensity: '',
    ringSize: '',
    ringWidth: '',
    description: '',
    referenceImages: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const materials = [
    'Silver', 'Gold', 'Damascus', 'Titanium', 'Tungsten', 
    'Carbon Fiber', 'Ceramic (White)', 'Ceramic (Black)', 'Stainless Steel'
  ];
  
  const gemColors = ['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Black', 'White', 'Mixed', 'Custom'];
  const gemDensities = ['Small', 'Medium', 'Large', 'Extra Large'];
  const ringTypes = ['Wedding Band', 'Engagement Ring', 'Fashion Ring', 'Signet Ring', 'Eternity Band'];

  const handleInputChange = (field: keyof DesignFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, referenceImages: [...prev.referenceImages, ...files] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center"
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your custom design request. Our team will review your submission and contact you within 24-48 hours with a quote and timeline.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors"
          >
            Return to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Custom Ring Design</h1>
          <p className="text-gray-600 mt-2">
            Create your dream ring with our custom design service. Share your vision and we'll bring it to life.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex items-center ${i < 3 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= i ? 'bg-gold-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {i}
                </div>
                {i < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > i ? 'bg-gold-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600">Contact Info</span>
            <span className="text-sm text-gray-600">Design Details</span>
            <span className="text-sm text-gray-600">Review</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          {/* Step 1: Contact Information */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.name || !formData.email}
                  className="px-6 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Step
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Design Details */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Design Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Package className="inline h-4 w-4 mr-1" />
                    Ring Type *
                  </label>
                  <select
                    required
                    value={formData.ringType}
                    onChange={(e) => handleInputChange('ringType', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  >
                    <option value="">Select ring type</option>
                    {ringTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Palette className="inline h-4 w-4 mr-1" />
                    Material *
                  </label>
                  <select
                    required
                    value={formData.material}
                    onChange={(e) => handleInputChange('material', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  >
                    <option value="">Select material</option>
                    {materials.map(mat => (
                      <option key={mat} value={mat}>{mat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Gem className="inline h-4 w-4 mr-1" />
                    Gem Color
                  </label>
                  <select
                    value={formData.gemColor}
                    onChange={(e) => handleInputChange('gemColor', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  >
                    <option value="">No gems / Select color</option>
                    {gemColors.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gem Density
                  </label>
                  <select
                    value={formData.gemDensity}
                    onChange={(e) => handleInputChange('gemDensity', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    disabled={!formData.gemColor}
                  >
                    <option value="">Select density</option>
                    {gemDensities.map(density => (
                      <option key={density} value={density}>{density}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Ruler className="inline h-4 w-4 mr-1" />
                    Ring Size (US)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 7, 8.5"
                    value={formData.ringSize}
                    onChange={(e) => handleInputChange('ringSize', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ring Width (mm)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 6, 8"
                    value={formData.ringWidth}
                    onChange={(e) => handleInputChange('ringWidth', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Design Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Please describe your vision for the custom ring design..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Upload className="inline h-4 w-4 mr-1" />
                  Reference Images (Optional)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
                {formData.referenceImages.length > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    {formData.referenceImages.length} file(s) selected
                  </p>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.ringType || !formData.material || !formData.description}
                  className="px-6 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Review Order
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Your Request</h2>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-gray-900">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <p className="font-medium">{formData.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                  {formData.phone && (
                    <div>
                      <span className="text-gray-600">Phone:</span>
                      <p className="font-medium">{formData.phone}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-gray-900">Design Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Ring Type:</span>
                    <p className="font-medium">{formData.ringType}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Material:</span>
                    <p className="font-medium">{formData.material}</p>
                  </div>
                  {formData.gemColor && (
                    <>
                      <div>
                        <span className="text-gray-600">Gem Color:</span>
                        <p className="font-medium">{formData.gemColor}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Gem Density:</span>
                        <p className="font-medium">{formData.gemDensity}</p>
                      </div>
                    </>
                  )}
                  {formData.ringSize && (
                    <div>
                      <span className="text-gray-600">Ring Size:</span>
                      <p className="font-medium">{formData.ringSize}</p>
                    </div>
                  )}
                  {formData.ringWidth && (
                    <div>
                      <span className="text-gray-600">Ring Width:</span>
                      <p className="font-medium">{formData.ringWidth}mm</p>
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-gray-600">Description:</span>
                  <p className="font-medium mt-1">{formData.description}</p>
                </div>
                {formData.referenceImages.length > 0 && (
                  <div>
                    <span className="text-gray-600">Reference Images:</span>
                    <p className="font-medium">{formData.referenceImages.length} file(s) attached</p>
                  </div>
                )}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>What happens next:</strong> Our design team will review your request and provide you with a detailed quote, 
                  3D renderings, and timeline within 24-48 hours. Custom designs typically take 3-4 weeks to complete.
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Edit Details
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Request
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </form>

        {/* Help Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Timeline</h4>
              <p className="text-gray-600">
                Custom designs typically take 3-4 weeks from approval to delivery. Rush orders may be available.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Pricing</h4>
              <p className="text-gray-600">
                Custom design fees start at $150. Final pricing depends on materials, complexity, and gems selected.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Contact Us</h4>
              <p className="text-gray-600">
                Questions? Email us at custom@aurora-jewelry.com or call (555) 123-4567.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
