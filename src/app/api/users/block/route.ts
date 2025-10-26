import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { z } from 'zod'

const blockSchema = z.object({
  user_id: z.string().uuid()
})

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { user_id } = blockSchema.parse(body)

    if (user_id === user.id) {
      return NextResponse.json({ error: 'Cannot block yourself' }, { status: 400 })
    }

    const { error: insertError } = await supabase
      .from('blocked_users')
      .insert({
        user_id: user.id,
        blocked_user_id: user_id
      } as any)

    if (insertError) {
      return NextResponse.json({ error: 'Failed to block user' }, { status: 500 })
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed' }, { status: 400 })
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
