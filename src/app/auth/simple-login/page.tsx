'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocalStore } from '@/lib/localStore'
import Link from 'next/link'

export default function SimpleLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [username, setUsername] = useState('')
  const { login, signup } = useLocalStore()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSignup) {
      signup(username || email.split('@')[0], email, password)
      alert('Account created! You can now submit articles.')
    } else {
      login(email, password)
      alert('Logged in!')
    }
    
    router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full gradient-border glow-border p-8 bg-gray-900/90 backdrop-blur-sm rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          {isSignup ? 'Create Account' : 'Sign In'} to OpenLens
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                placeholder="johndoe"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition"
          >
            {isSignup ? 'Create Account' : 'Sign In'}
          </button>
        </form>
        
        <p className="mt-4 text-center text-gray-400">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-cyan-400 hover:text-cyan-300 font-medium"
          >
            {isSignup ? 'Sign In' : 'Create One'}
          </button>
        </p>
        
        <p className="mt-6 text-center text-sm text-gray-500">
          🚀 Quick start - no email confirmation needed!<br/>
          Your data is stored locally and works immediately.
        </p>
      </div>
    </div>
  )
}
