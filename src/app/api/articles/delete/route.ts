import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { z } from 'zod'

const deleteSchema = z.object({
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
    const { article_id } = deleteSchema.parse(body)

    const { data: article } = await supabase
      .from('articles')
      .select('author_id')
      .eq('id', article_id)
      .single()

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    if ((article as any).author_id !== user.id) {
      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      if ((profile as any)?.role !== 'admin' && (profile as any)?.role !== 'moderator') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    }

    const { error: deleteError } = await supabase
      .from('articles')
      .delete()
      .eq('id', article_id)

    if (deleteError) {
      return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed' }, { status: 400 })
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
