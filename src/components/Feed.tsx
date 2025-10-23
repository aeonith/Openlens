'use client'

import { useEffect, useState } from 'react'
import ArticleCard from './ArticleCard'
import { createClient } from '@/lib/supabase'

interface Article {
  id: string
  title: string
  content: string
  author_id: string
  media_url: string | null
  media_type: 'image' | 'video' | null
  likes: number
  views: number
  created_at: string
  users: {
    username: string
    avatar_url: string | null
  }
}

export default function Feed() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchArticles() {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          users (username, avatar_url)
        `)
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) {
        console.error('Error fetching articles:', error)
      } else {
        setArticles(data as any)
      }
      setLoading(false)
    }

    fetchArticles()

    const channel = supabase
      .channel('articles-channel')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'articles' },
        (payload) => {
          setArticles((prev) => [payload.new as any, ...prev])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-4 animate-pulse">
            <div className="h-6 bg-gray-800 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-800 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
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
  )
}
