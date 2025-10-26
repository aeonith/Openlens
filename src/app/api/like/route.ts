import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { z } from 'zod'

const likeSchema = z.object({
  article_id: z.string().uuid()
})

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { article_id } = likeSchema.parse(body)

    const { data: article } = await supabase
      .from('articles')
      .select('likes')
      .eq('id', article_id)
      .single()

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    const { error: updateError } = await supabase
      .from('articles')
      .update({ likes: (article.likes || 0) + 1 } as any)
      .eq('id', article_id)

    if (updateError) {
      return NextResponse.json({ error: 'Failed to like article' }, { status: 500 })
    }

    return NextResponse.json({ success: true, likes: (article.likes || 0) + 1 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed' }, { status: 400 })
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
