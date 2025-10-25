import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-3 group">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition"></div>
        <div className="relative">
          <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
            <circle cx="40" cy="40" r="28" fill="url(#globe-gradient)" stroke="url(#border-gradient)" strokeWidth="2"/>
            
            <text x="32" y="35" fill="#22d3ee" fontSize="10" fontFamily="monospace" opacity="0.9">22</text>
            <text x="38" y="45" fill="#3b82f6" fontSize="10" fontFamily="monospace" opacity="0.8">8</text>
            <text x="28" y="48" fill="#22d3ee" fontSize="8" fontFamily="monospace" opacity="0.7">22</text>
            <text x="45" y="38" fill="#3b82f6" fontSize="8" fontFamily="monospace" opacity="0.6">8</text>
            
            <g transform="translate(50, 50)">
              <circle cx="0" cy="0" r="18" fill="none" stroke="url(#border-gradient)" strokeWidth="3"/>
              <circle cx="0" cy="0" r="2" fill="url(#border-gradient)"/>
              <line x1="12" y1="12" x2="28" y2="28" stroke="url(#border-gradient)" strokeWidth="4" strokeLinecap="round"/>
              <circle cx="28" cy="28" r="4" fill="url(#border-gradient)"/>
            </g>
            
            <defs>
              <linearGradient id="globe-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="border-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-500 bg-clip-text text-transparent tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
          OpenLens
        </span>
        <span className="text-xs text-gray-400 -mt-1 tracking-widest">EVIDENCE FIRST</span>
      </div>
    </Link>
  )
}
