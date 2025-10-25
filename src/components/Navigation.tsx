'use client'

import Link from 'next/link'
import { Home, Compass, PlusCircle, User, Search } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Logo from './Logo'

export default function Navigation() {
  const pathname = usePathname()
  
  const isActive = (path: string) => pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800/50 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        
        <div className="flex-1 max-w-md mx-8">
          <form action="/search" method="GET">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="q"
                placeholder="Ask AI anything... Search articles, claims, knowledge..."
                className="w-full bg-gray-900 text-white pl-10 pr-4 py-2 rounded-full border border-gray-700 focus:border-cyan-400 focus:outline-none transition"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center space-x-6">
          <Link href="/" className={`flex items-center space-x-2 ${isActive('/') ? 'text-blue-500' : 'text-gray-400 hover:text-white'}`}>
            <Home className="w-6 h-6" />
          </Link>
          <Link href="/explore" className={`flex items-center space-x-2 ${isActive('/explore') ? 'text-blue-500' : 'text-gray-400 hover:text-white'}`}>
            <Compass className="w-6 h-6" />
          </Link>
          <Link href="/submit" className={`flex items-center space-x-2 ${isActive('/submit') ? 'text-blue-500' : 'text-gray-400 hover:text-white'}`}>
            <PlusCircle className="w-6 h-6" />
          </Link>
          <Link href="/auth/simple-login" className={`flex items-center space-x-2 ${isActive('/auth/simple-login') ? 'text-blue-500' : 'text-gray-400 hover:text-white'}`}>
            <User className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </nav>
  )
}
