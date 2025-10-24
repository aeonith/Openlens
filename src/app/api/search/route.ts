import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Query required' }, { status: 400 })
  }

  try {
    const supabase = createClient()
    
    const { data: articles, error } = await supabase
      .from('articles')
      .select(`
        *,
        users (username, avatar_url, verified),
        claims (text, status)
      `)
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) throw error

    const enrichedResults = articles?.map((article: any) => {
      const relevanceScore = calculateRelevance(article, query)
      const snippet = generateSnippet(article.content, query)
      return {
        ...article,
        relevanceScore,
        snippet
      }
    })

    enrichedResults?.sort((a, b) => b.relevanceScore - a.relevanceScore)

    return NextResponse.json({
      query,
      results: enrichedResults,
      count: enrichedResults?.length || 0
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}

function calculateRelevance(article: any, query: string): number {
  const queryLower = query.toLowerCase()
  let score = 0

  if (article.title.toLowerCase().includes(queryLower)) score += 10
  if (article.content.toLowerCase().includes(queryLower)) score += 5
  if (article.claims?.some((c: any) => c.text.toLowerCase().includes(queryLower))) score += 3
  
  score += article.views * 0.001
  score += article.likes * 0.01

  return score
}

function generateSnippet(content: string, query: string, length: number = 200): string {
  const queryLower = query.toLowerCase()
  const contentLower = content.toLowerCase()
  const index = contentLower.indexOf(queryLower)
  
  if (index === -1) return content.substring(0, length) + '...'
  
  const start = Math.max(0, index - 50)
  const end = Math.min(content.length, index + query.length + 150)
  
  return (start > 0 ? '...' : '') + content.substring(start, end) + (end < content.length ? '...' : '')
}
