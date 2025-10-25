import Link from 'next/link'
import { Eye } from 'lucide-react'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-3 group">
      <div className="relative">
        <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-all duration-500 animate-pulse"></div>
        <div className="relative bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 p-2.5 rounded-full shadow-2xl group-hover:scale-110 transition-transform duration-300">
          <Eye className="w-7 h-7 text-white drop-shadow-lg" />
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
