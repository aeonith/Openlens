import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition"></div>
        <div className="relative bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 p-2 rounded-lg">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
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
