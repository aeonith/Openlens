'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import { Search, Sparkles } from 'lucide-react'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [aiSummary, setAiSummary] = useState('')

  useEffect(() => {
    if (!query) return

    async function performSearch() {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.results || [])
        
        generateAISummary(query, data.results || [])
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setLoading(false)
      }
    }

    performSearch()
  }, [query])

  function generateAISummary(q: string, results: any[]) {
    if (results.length === 0) {
      setAiSummary(`No results found for "${q}". Try different keywords or browse our knowledge base.`)
      return
    }

    const summary = `Found ${results.length} article${results.length === 1 ? '' : 's'} about "${q}". 
    ${results[0] ? `Top result: "${results[0].title}" discusses ${results[0].snippet}` : ''}
    ${results.filter((r: any) => r.claims?.some((c: any) => c.status === 'verified')).length > 0 ? 
      `${results.filter((r: any) => r.claims?.some((c: any) => c.status === 'verified')).length} articles contain verified claims.` : ''}`
    
    setAiSummary(summary)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Search className="w-8 h-8 text-cyan-400" />
          <h1 className="text-3xl font-bold">
            Search Results {query && `for "${query}"`}
          </h1>
        </div>

        {aiSummary && (
          <div className="gradient-border glow-border p-6 bg-gray-900/90 backdrop-blur-sm rounded-lg mb-6">
            <div className="flex items-start space-x-3">
              <Sparkles className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2 text-cyan-300">AI Summary</h3>
                <p className="text-gray-300 leading-relaxed">{aiSummary}</p>
              </div>
            </div>
          </div>
        )}
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
      ) : results.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-xl mb-4">No results found</p>
          <p>Try different keywords or browse our knowledge base</p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              content={article.snippet || article.content}
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
