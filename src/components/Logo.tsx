import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-3 group">
      <div className="relative">
        <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-all duration-500 animate-pulse"></div>
        <div className="relative">
          <svg className="w-11 h-11 drop-shadow-2xl" viewBox="0 0 100 100" fill="none">
            <circle cx="38" cy="38" r="30" fill="url(#dark-globe)" stroke="url(#mysterious-glow)" strokeWidth="1.5" opacity="0.9"/>
            
            <circle cx="38" cy="38" r="30" fill="url(#code-pattern)" opacity="0.3"/>
            
            <text x="30" y="34" fill="#22d3ee" fontSize="9" fontFamily="Courier New, monospace" fontWeight="bold" opacity="0.8">22</text>
            <text x="37" y="44" fill="#06b6d4" fontSize="9" fontFamily="Courier New, monospace" fontWeight="bold" opacity="0.7">8</text>
            <text x="26" y="47" fill="#22d3ee" fontSize="7" fontFamily="Courier New, monospace" opacity="0.5">22</text>
            <text x="45" y="36" fill="#3b82f6" fontSize="7" fontFamily="Courier New, monospace" opacity="0.6">8</text>
            <text x="34" y="28" fill="#06b6d4" fontSize="6" fontFamily="Courier New, monospace" opacity="0.4">22</text>
            <text x="42" y="50" fill="#22d3ee" fontSize="6" fontFamily="Courier New, monospace" opacity="0.4">8</text>
            
            <g transform="translate(55, 55)" className="group-hover:scale-110 transition-transform duration-300" style={{ transformOrigin: '0 0' }}>
              <circle cx="0" cy="0" r="20" fill="rgba(0,0,0,0.6)" stroke="url(#lens-glow)" strokeWidth="2.5" opacity="0.95"/>
              <circle cx="0" cy="0" r="17" fill="none" stroke="url(#lens-inner)" strokeWidth="1" opacity="0.6"/>
              <circle cx="0" cy="0" r="2.5" fill="url(#lens-glow)"/>
              
              <line x1="14" y1="14" x2="32" y2="32" stroke="url(#handle-gradient)" strokeWidth="5" strokeLinecap="round"/>
              <line x1="14" y1="14" x2="32" y2="32" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
              <circle cx="32" cy="32" r="5" fill="url(#handle-gradient)"/>
              <circle cx="32" cy="32" r="3" fill="#0a0a0a"/>
            </g>
            
            <defs>
              <radialGradient id="dark-globe">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="50%" stopColor="#020617" />
                <stop offset="100%" stopColor="#0a0a0a" />
              </radialGradient>
              <radialGradient id="code-pattern">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <linearGradient id="mysterious-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="lens-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="lens-inner" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="handle-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0a0a0a" />
                <stop offset="50%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
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
