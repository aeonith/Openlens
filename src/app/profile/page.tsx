'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { User, LogOut } from 'lucide-react'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/auth/login')
        return
      }

      setUser(user)

      const { data: profileData } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      setProfile(profileData)
      setLoading(false)
    }

    loadUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 animate-pulse">
          <div className="h-6 bg-gray-800 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-800 rounded w-3/4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
            {profile?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profile?.username || 'User'}</h1>
            <p className="text-gray-400">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Reputation</h3>
            <p className="text-xl font-bold">{profile?.reputation_points || 0} points</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Role</h3>
            <p className="text-lg capitalize">{profile?.role || 'user'}</p>
          </div>
          {profile?.bio && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Bio</h3>
              <p className="text-gray-300">{profile.bio}</p>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition flex items-center justify-center space-x-2"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  )
}
