export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="gradient-border glow-border p-8 bg-gray-900/90 backdrop-blur-sm rounded-lg prose prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-gray-400 mb-6">Last updated: October 25, 2025</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
        <p className="text-gray-300 mb-4">
          We collect information you provide directly to us, including:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
          <li>Email address and password (encrypted)</li>
          <li>Username and profile information</li>
          <li>Articles, comments, and content you create</li>
          <li>Usage data and analytics</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
          <li>To provide and improve our services</li>
          <li>To communicate with you about your account</li>
          <li>To detect and prevent fraud and abuse</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Data Storage</h2>
        <p className="text-gray-300 mb-4">
          Your data is stored securely on Supabase infrastructure with encryption at rest and in transit.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Sharing</h2>
        <p className="text-gray-300 mb-4">
          We do not sell your personal information. We may share data:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
          <li>When required by law</li>
          <li>To prevent illegal activity</li>
          <li>With your consent</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">5. Your Rights</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
          <li>Access your data</li>
          <li>Request deletion of your account</li>
          <li>Export your content</li>
          <li>Opt out of communications</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">6. Cookies and Tracking</h2>
        <p className="text-gray-300 mb-4">
          We use cookies for authentication and analytics. You can disable cookies in your browser settings.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">7. Children's Privacy</h2>
        <p className="text-gray-300 mb-4">
          Our service is not intended for users under 13 years of age. We do not knowingly collect information from children.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">8. Contact Us</h2>
        <p className="text-gray-300">
          For privacy concerns, contact us at: <a href="mailto:privacy@openlens.app" className="text-cyan-400 hover:text-cyan-300">privacy@openlens.app</a>
        </p>
      </div>
    </div>
  )
}
