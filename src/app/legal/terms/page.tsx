export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="gradient-border glow-border p-8 bg-gray-900/90 backdrop-blur-sm rounded-lg prose prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-gray-400 mb-6">Last updated: October 25, 2025</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-300 mb-4">
          By accessing OpenLens, you agree to these Terms of Service. If you disagree, please do not use our service.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. User Accounts</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
          <li>You must be 13 or older to create an account</li>
          <li>You are responsible for maintaining account security</li>
          <li>One account per person</li>
          <li>Accounts engaging in abuse may be terminated</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Content Policy</h2>
        <p className="text-gray-300 mb-4">
          <strong>Prohibited Content:</strong>
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
          <li>Illegal content (CSAM, credible threats, drug sales)</li>
          <li>Content that violates others' rights</li>
          <li>Spam or malicious code</li>
          <li>Impersonation or fraud</li>
        </ul>
        <p className="text-gray-300 mb-4">
          <strong>Allowed Content:</strong> We support free expression. Controversial opinions, theories, and unverified claims are allowed with appropriate labeling.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Subscriptions</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
          <li>Pro subscription ($25 one-time) unlocks publishing rights</li>
          <li>Subscriptions are non-refundable except as required by law</li>
          <li>We reserve the right to modify pricing with notice</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">5. Content Moderation</h2>
        <p className="text-gray-300 mb-4">
          We remove content that violates our policies. Users may appeal removals through our support channel.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">6. Intellectual Property</h2>
        <p className="text-gray-300 mb-4">
          You retain rights to your content. By posting, you grant OpenLens a license to display and distribute your content.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">7. Disclaimers</h2>
        <p className="text-gray-300 mb-4">
          OpenLens is provided "as is." We do not verify all content. Users are responsible for evaluating information accuracy.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">8. Termination</h2>
        <p className="text-gray-300 mb-4">
          We may suspend or terminate accounts that violate these terms.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">9. Contact</h2>
        <p className="text-gray-300">
          Questions? Email: <a href="mailto:legal@openlens.app" className="text-cyan-400 hover:text-cyan-300">legal@openlens.app</a>
        </p>
      </div>
    </div>
  )
}
