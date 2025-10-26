import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900/95 backdrop-blur-lg mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">OpenLens</h3>
            <p className="text-gray-400 text-sm">Evidence-first knowledge platform</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/explore" className="hover:text-cyan-400">Explore</Link></li>
              <li><Link href="/verify" className="hover:text-cyan-400">Get Verified</Link></li>
              <li><Link href="/admin" className="hover:text-cyan-400">Moderators</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/legal/terms" className="hover:text-cyan-400">Terms of Service</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-cyan-400">Privacy Policy</Link></li>
              <li><Link href="/legal/community-guidelines" className="hover:text-cyan-400">Community Guidelines</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="mailto:support@openlens.app" className="hover:text-cyan-400">Contact Us</a></li>
              <li><a href="mailto:legal@openlens.app" className="hover:text-cyan-400">Legal Inquiries</a></li>
              <li><a href="https://github.com/aeonith/Openlens" className="hover:text-cyan-400" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2025 OpenLens. All rights reserved.</p>
          <p>Evidence-first knowledge network</p>
        </div>
      </div>
    </footer>
  )
}
