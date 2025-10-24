'use client'

import { useState, useEffect } from 'react'
import ArticleCard from '@/components/ArticleCard'
import { createClient } from '@/lib/supabase'
import { Filter } from 'lucide-react'

export default function ExplorePage() {
  const [filter, setFilter] = useState<'all' | 'verified' | 'theory' | 'trending'>('all')
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true)
      try {
        let query = supabase
          .from('articles')
          .select(`
            *,
            users (username, avatar_url, verified),
            claims (status)
          `)

        if (filter === 'trending') {
          query = query.order('views', { ascending: false })
        } else {
          query = query.order('created_at', { ascending: false })
        }

        const { data, error } = await query.limit(20)

        if (error) {
          console.log('Using mock data - Supabase not configured')
          setArticles([])
        } else {
          let filtered = data

          if (filter === 'verified') {
            filtered = data.filter((article: any) => 
              article.claims?.some((claim: any) => claim.status === 'verified')
            )
          } else if (filter === 'theory') {
            filtered = data.filter((article: any) => 
              article.claims?.some((claim: any) => claim.status === 'theory')
            )
          }

          setArticles(filtered)
        }
      } catch (err) {
        console.log('Using mock data - Supabase not configured')
        setArticles([])
      }
      setLoading(false)
    }

    fetchArticles()
  }, [filter])

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Explore</h1>
        
        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 text-gray-400" />
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('verified')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === 'verified' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Verified
          </button>
          <button
            onClick={() => setFilter('theory')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === 'theory' ? 'bg-yellow-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Theories
          </button>
          <button
            onClick={() => setFilter('trending')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === 'trending' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Trending
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-4 animate-pulse">
              <div className="h-6 bg-gray-800 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              content={article.content}
              author={{
                username: article.users.username,
                avatar_url: article.users.avatar_url || undefined
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
  )
}
