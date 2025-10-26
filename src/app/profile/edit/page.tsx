'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLocalStore } from '@/lib/localStore'
import { Camera, Save, X } from 'lucide-react'

export default function EditProfilePage() {
  const { user } = useLocalStore()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/auth/simple-login')
      return
    }
    setUsername(user.username)
    setBio('')
    setAvatarUrl('')
  }, [user])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          bio,
          avatar_url: avatarUrl || null
        })
      })

      if (res.ok) {
        alert('Profile updated!')
        router.push('/profile')
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to update profile')
      }
    } catch (error) {
      alert('Error updating profile')
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="gradient-border glow-border p-8 bg-gray-900/90 backdrop-blur-sm rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-4xl font-bold">
                {username[0]?.toUpperCase() || 'U'}
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 rounded-full p-3 shadow-lg transition"
              >
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
              placeholder="Your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              maxLength={160}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none resize-none"
              placeholder="Tell us about yourself..."
            />
            <p className="text-sm text-gray-500 mt-1">{bio.length}/160</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Avatar URL (Optional)</label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{loading ? 'Saving...' : 'Save Changes'}</span>
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-700">
          <h3 className="text-lg font-bold mb-4">Danger Zone</h3>
          <button className="w-full bg-red-600/20 hover:bg-red-600/30 border border-red-600 text-red-400 font-medium py-3 rounded-lg transition">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
