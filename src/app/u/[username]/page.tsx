'use client'

import { useParams, useRouter } from 'next/navigation'
import { useLocalStore } from '@/lib/localStore'
import { Calendar, MapPin, Link as LinkIcon, Edit } from 'lucide-react'
import ArticleCard from '@/components/ArticleCard'
import VerificationBadge from '@/components/VerificationBadge'
import Link from 'next/link'

export default function UserProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { user, articles } = useLocalStore()
  const username = params.username as string

  const isOwnProfile = user?.username === username
  const userArticles = articles.filter(a => a.author_id === user?.id)

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="gradient-border glow-border p-8 bg-gray-900/90 backdrop-blur-sm rounded-lg mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-4xl font-bold ring-4 ring-cyan-500/30">
              {username[0].toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold">{username}</h1>
                {user?.verified && <VerificationBadge verified size="lg" />}
              </div>
              <div className="flex items-center space-x-4 text-gray-400 text-sm">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined Oct 2025</span>
                </span>
              </div>
            </div>
          </div>
          
          {isOwnProfile && (
            <Link
              href="/profile/edit"
              className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </Link>
          )}
        </div>

        {user?.bio && (
          <p className="text-gray-300 mb-6">{user.bio}</p>
        )}

        <div className="grid grid-cols-3 gap-6 py-4 border-t border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{userArticles.length}</div>
            <div className="text-sm text-gray-400">Articles</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">{user?.reputation_points || 0}</div>
            <div className="text-sm text-gray-400">Reputation</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">0</div>
            <div className="text-sm text-gray-400">Followers</div>
          </div>
        </div>

        {!user?.can_publish && (
          <div className="mt-6 gradient-border p-4 bg-blue-900/20 rounded-lg">
            <p className="text-center text-blue-300 font-medium">
              🔒 Subscribe to start publishing articles
              <Link href="/verify" className="ml-2 underline hover:text-blue-200">
                Upgrade Now
              </Link>
            </p>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Articles by {username}</h2>
        {userArticles.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-xl mb-2">No articles yet</p>
            {isOwnProfile && (
              <Link href="/submit" className="text-cyan-400 hover:text-cyan-300">
                Create your first article →
              </Link>
            )}
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
                  username: user?.username || 'User',
                  verified: user?.verified
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
