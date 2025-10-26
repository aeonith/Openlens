export default function CommunityGuidelinesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="gradient-border glow-border p-8 bg-gray-900/90 backdrop-blur-sm rounded-lg prose prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Community Guidelines</h1>

        <h2 className="text-2xl font-bold mt-8 mb-4">Our Philosophy</h2>
        <p className="text-gray-300 mb-6">
          OpenLens is an evidence-first platform that values truth, transparency, and free expression. 
          We believe in minimal censorship - only removing content that is genuinely illegal or harmful.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">✅ What's Allowed</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
          <li><strong>Controversial opinions</strong> - Political, religious, scientific debates</li>
          <li><strong>Theories and speculation</strong> - Label as "Theory" or "Unverified"</li>
          <li><strong>Criticism and satire</strong> - Of public figures, institutions, ideas</li>
          <li><strong>Graphic content</strong> - With content warnings (violence, blood)</li>
          <li><strong>Adult content</strong> - With warnings (no explicit pornography)</li>
          <li><strong>Whistleblowing</strong> - Exposing wrongdoing with evidence</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">❌ What's Not Allowed</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
          <li><strong>Illegal content:</strong> CSAM, credible threats, illegal drug sales</li>
          <li><strong>Direct threats:</strong> "I will harm [specific person]"</li>
          <li><strong>Doxxing:</strong> Publishing private information to enable harassment</li>
          <li><strong>Explicit pornography:</strong> No hardcore sexual content</li>
          <li><strong>Spam:</strong> Repetitive or automated content</li>
          <li><strong>Malware:</strong> Malicious code or phishing</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">⚖️ Moderation Approach</h2>
        <p className="text-gray-300 mb-4">
          We use a light-touch moderation model:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
          <li>Automated filters flag potential violations</li>
          <li>Human moderators review flagged content</li>
          <li>We preserve content whenever legally possible</li>
          <li>Users can appeal moderation decisions</li>
          <li>Transparency: We explain why content is removed</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">🏷️ Content Labels</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
          <li><span className="text-green-400">✅ Verified</span> - Evidence-backed claims</li>
          <li><span className="text-yellow-400">⚠️ Theory</span> - Speculation or unconfirmed</li>
          <li><span className="text-gray-400">❔ Unverified</span> - No evidence provided</li>
          <li><span className="text-red-400">⚠️ Graphic</span> - Violent or disturbing imagery</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">📢 Reporting</h2>
        <p className="text-gray-300 mb-4">
          If you see content that violates our guidelines, use the Report button. 
          Our team reviews all reports within 24-48 hours.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">🛡️ Enforcement</h2>
        <p className="text-gray-300 mb-4">
          Violations may result in:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
          <li>Content removal</li>
          <li>Temporary suspension</li>
          <li>Permanent ban (severe violations)</li>
          <li>Report to law enforcement (illegal content)</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Contact</h2>
        <p className="text-gray-300">
          Questions about these guidelines? Email: <a href="mailto:moderation@openlens.app" className="text-cyan-400 hover:text-cyan-300">moderation@openlens.app</a>
        </p>
      </div>
    </div>
  )
}
