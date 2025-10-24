'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Heart, Share2, Eye, Calendar, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react'
import VerificationBadge from '@/components/VerificationBadge'
import ContentWarning from '@/components/ContentWarning'
import Comments from '@/components/Comments'

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<any>(null)
  const [claims, setClaims] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchArticle()
  }, [params.id])

  async function fetchArticle() {
    try {
      const { data: articleData } = await supabase
        .from('articles')
        .select(`
          *,
          users (username, avatar_url, verified)
        `)
        .eq('id', params.id)
        .single()

      const { data: claimsData } = await supabase
        .from('claims')
        .select('*')
        .eq('article_id', params.id)

      setArticle(articleData)
      setClaims(claimsData || [])

      await supabase
        .from('articles')
        .update({ views: (articleData?.views || 0) + 1 })
        .eq('id', params.id)
    } catch (error) {
      console.error('Error fetching article:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-800 rounded w-3/4"></div>
          <div className="h-40 bg-gray-800 rounded"></div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <button onClick={() => router.push('/')} className="text-blue-500 hover:text-blue-400">
          Go Home
        </button>
      </div>
    )
  }

  const mediaContent = article.media_url && (
    <div className="mb-6">
      {article.media_type === 'video' ? (
        <video src={article.media_url} controls className="w-full rounded-lg" />
      ) : (
        <img src={article.media_url} alt={article.title} className="w-full rounded-lg" />
      )}
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <article className="gradient-border glow-border p-8 bg-gray-900 rounded-lg mb-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
            {article.users.username[0].toUpperCase()}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{article.users.username}</span>
              {article.users.verified && <VerificationBadge verified />}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.created_at).toLocaleDateString()}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{article.views}</span>
              </span>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-6">{article.title}</h1>

        {article.content_warning && article.content_warning !== 'none' ? (
          <ContentWarning type={article.content_warning}>
            {mediaContent}
          </ContentWarning>
        ) : (
          mediaContent
        )}

        <div className="prose prose-invert max-w-none mb-6">
          <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-wrap">{article.content}</p>
        </div>

        {claims.length > 0 && (
          <div className="border-t border-gray-700 pt-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Claims & Evidence</h2>
            <div className="space-y-3">
              {claims.map((claim) => (
                <div key={claim.id} className="bg-black/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {claim.status === 'verified' && <CheckCircle className="w-5 h-5 text-green-400" />}
                      {claim.status === 'theory' && <AlertTriangle className="w-5 h-5 text-yellow-400" />}
                      {claim.status === 'unverified' && <HelpCircle className="w-5 h-5 text-gray-400" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-200 mb-2">{claim.text}</p>
                      {claim.evidence_link && (
                        <a
                          href={claim.evidence_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1"
                        >
                          <span>View Evidence →</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center space-x-6 pt-6 border-t border-gray-700">
          <button className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition">
            <Heart className="w-6 h-6" />
            <span className="font-semibold">{article.likes}</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-400 hover:text-green-500 transition">
            <Share2 className="w-6 h-6" />
            <span>Share</span>
          </button>
        </div>
      </article>

      <Comments articleId={article.id} />
    </div>
  )
}
