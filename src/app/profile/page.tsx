'use client'

import { useRouter } from 'next/navigation'
import { useLocalStore } from '@/lib/localStore'
import { Settings, Edit, Crown } from 'lucide-react'
import Link from 'next/link'
import VerificationBadge from '@/components/VerificationBadge'
import ArticleCard from '@/components/ArticleCard'

export default function ProfilePage() {
  const router = useRouter()
  const { user, articles, logout } = useLocalStore()

  if (!user) {
    router.push('/auth/simple-login')
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const userArticles = articles.filter(a => a.author_id === user.id)

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="gradient-border glow-border p-8 bg-gray-900/90 backdrop-blur-sm rounded-lg mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-4xl font-bold ring-4 ring-cyan-500/30">
              {user.username[0].toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold">{user.username}</h1>
                {user.verified && <VerificationBadge verified size="lg" />}
                {user.can_publish && (
                  <Crown className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                )}
              </div>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>
          
          <Link
            href="/settings"
            className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition flex items-center space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
        </div>

        {user.bio && (
          <p className="text-gray-300 mb-6">{user.bio}</p>
        )}

        <div className="grid grid-cols-3 gap-6 py-4 border-t border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{userArticles.length}</div>
            <div className="text-sm text-gray-400">Articles</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">{user.reputation_points}</div>
            <div className="text-sm text-gray-400">Reputation</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {user.can_publish ? 'Pro' : 'Free'}
            </div>
            <div className="text-sm text-gray-400">Plan</div>
          </div>
        </div>

        {!user.can_publish && (
          <div className="mt-6 gradient-border p-4 bg-blue-900/20 rounded-lg">
            <p className="text-center">
              <span className="text-blue-300 font-medium">🔒 Subscribe to start publishing articles</span>
              <Link href="/verify" className="ml-2 text-cyan-400 hover:text-cyan-300 underline">
                Upgrade Now
              </Link>
            </p>
          </div>
        )}

        <div className="mt-6 flex space-x-3">
          <Link
            href="/profile/edit"
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 rounded-lg transition flex items-center justify-center space-x-2"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Profile</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">My Articles</h2>
        {userArticles.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-xl mb-2">No articles yet</p>
            <Link href="/submit" className="text-cyan-400 hover:text-cyan-300">
              {user.can_publish ? 'Create your first article →' : 'Upgrade to start publishing →'}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {userArticles.map((article) => (
              <ArticleCard
                key={article.id}
                id={article.id}
                title={article.title}
                content={article.content}
                author={{
                  username: user.username,
                  verified: user.verified
                }}
                mediaUrl={article.media_url || undefined}
                mediaType={article.media_type || undefined}
                likes={article.likes}
                createdAt={article.created_at}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
