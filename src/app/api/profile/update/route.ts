import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { z } from 'zod'

const profileSchema = z.object({
  username: z.string().min(3).max(30).optional(),
  bio: z.string().max(160).optional(),
  avatar_url: z.string().url().optional().nullable()
})

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validated = profileSchema.parse(body)

    const updates: any = {}
    if (validated.username) updates.username = validated.username
    if (validated.bio !== undefined) updates.bio = validated.bio
    if (validated.avatar_url !== undefined) updates.avatar_url = validated.avatar_url
    updates.updated_at = new Date().toISOString()

    const { error: updateError } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
