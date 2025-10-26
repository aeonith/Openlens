import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { z } from 'zod'

const articleSchema = z.object({
  title: z.string().min(3).max(200),
  content: z.string().min(10).max(50000),
  media_url: z.string().url().optional().nullable(),
  media_type: z.enum(['image', 'video']).optional().nullable(),
  content_warning: z.enum(['none', 'graphic', 'violence', 'sensitive']).default('none'),
  claims: z.array(z.object({
    text: z.string().min(1).max(1000),
    evidence_link: z.string().url().optional().nullable(),
    status: z.enum(['verified', 'theory', 'unverified'])
  })).optional()
})

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('users')
      .select('can_publish')
      .eq('id', user.id)
      .single()

    if (!profile?.can_publish) {
      return NextResponse.json({ 
        error: 'Subscription required',
        message: 'Upgrade to Pro to publish articles' 
      }, { status: 403 })
    }

    const body = await request.json()
    const validated = articleSchema.parse(body)

    const sanitizedTitle = validated.title.replace(/<[^>]*>/g, '')
    const sanitizedContent = validated.content.replace(/<script[^>]*>.*?<\/script>/gi, '')

    const { data: article, error: insertError } = await supabase
      .from('articles')
      .insert({
        author_id: user.id,
        title: sanitizedTitle,
        content: sanitizedContent,
        media_url: validated.media_url,
        media_type: validated.media_type,
        content_warning: validated.content_warning
      })
      .select()
      .single()

    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
    }

    if (validated.claims && validated.claims.length > 0) {
      const claimsData = validated.claims.map(claim => ({
        article_id: article.id,
        text: claim.text,
        evidence_link: claim.evidence_link,
        status: claim.status
      }))

      await supabase.from('claims').insert(claimsData)
    }

    return NextResponse.json({ success: true, article }, { status: 201 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    
    console.error('Article creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
