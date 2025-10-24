'use client'

import { useState } from 'react'
import { CheckCircle, CreditCard, Shield } from 'lucide-react'

export default function VerifyPage() {
  const [loading, setLoading] = useState(false)

  const handleVerify = async () => {
    setLoading(true)
    alert('Payment integration coming soon! This will use Stripe for $25 verification.')
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="gradient-border glow-border p-8 bg-gray-900 rounded-lg">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="w-20 h-20 text-blue-500 fill-blue-500" />
          </div>
          
          <h1 className="text-4xl font-bold">Get Verified on OpenLens</h1>
          <p className="text-xl text-gray-300">
            Join verified creators, journalists, and experts
          </p>

          <div className="bg-black/50 rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold">Benefits of Verification</h2>
            <ul className="text-left space-y-3 text-gray-300">
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>Blue verification badge on your profile and posts</span>
              </li>
              <li className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <span>Increased credibility and trust from the community</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>Priority in search results and trending</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>Higher reputation point multiplier</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>Access to verification-only features</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <div className="text-5xl font-bold mb-4">$25</div>
            <p className="text-gray-400 mb-6">One-time payment • Lifetime verification</p>
            
            <button
              onClick={handleVerify}
              disabled={loading}
              className="w-full max-w-md mx-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 text-white font-bold py-4 px-8 rounded-lg transition flex items-center justify-center space-x-2 text-lg"
            >
              <CreditCard className="w-6 h-6" />
              <span>{loading ? 'Processing...' : 'Get Verified Now'}</span>
            </button>
          </div>

          <p className="text-sm text-gray-500">
            Secure payment powered by Stripe • Identity verification required
          </p>
        </div>
      </div>
    </div>
  )
}
