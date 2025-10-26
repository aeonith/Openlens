import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { z } from 'zod'

const reportSchema = z.object({
  content_id: z.string().uuid(),
  content_type: z.enum(['article', 'comment', 'user']),
  reason: z.enum(['illegal', 'spam', 'harassment', 'misinformation', 'graphic', 'other']),
  details: z.string().max(500).optional()
})

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validated = reportSchema.parse(body)

    const { data: existingReport } = await supabase
      .from('reports')
      .select('id')
      .eq('content_id', validated.content_id)
      .eq('reporter_id', user.id)
      .single()

    if (existingReport) {
      return NextResponse.json({ error: 'Already reported' }, { status: 400 })
    }

    const { data: report, error: insertError } = await supabase
      .from('reports')
      .insert({
        content_id: validated.content_id,
        content_type: validated.content_type,
        reporter_id: user.id,
        reason: validated.reason,
        details: validated.details,
        status: 'pending'
      })
      .select()
      .single()

    if (insertError) {
      return NextResponse.json({ error: 'Failed to create report' }, { status: 500 })
    }

    return NextResponse.json({ success: true, report }, { status: 201 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
