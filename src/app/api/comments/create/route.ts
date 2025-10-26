import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { z } from 'zod'

const commentSchema = z.object({
  article_id: z.string().uuid(),
  text: z.string().min(1).max(2000)
})

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validated = commentSchema.parse(body)

    const sanitizedText = validated.text.replace(/<script[^>]*>.*?<\/script>/gi, '')

    const { data: comment, error: insertError } = await supabase
      .from('comments')
      .insert({
        article_id: validated.article_id,
        author_id: user.id,
        text: sanitizedText
      })
      .select(`
        *,
        users (username, avatar_url, verified)
      `)
      .single()

    if (insertError) {
      return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 })
    }

    return NextResponse.json({ success: true, comment }, { status: 201 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
