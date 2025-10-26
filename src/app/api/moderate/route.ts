import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

const ILLEGAL_KEYWORDS = [
  'will kill', 'going to kill', 'plan to kill',
  'sell drugs', 'buy drugs', 'selling cocaine', 'buying heroin',
  'child porn', 'csam', 'cp',
  'bomb instructions', 'how to make explosives'
]

export async function POST(request: Request) {
  try {
    const { content } = await request.json()
    
    if (!content || typeof content !== 'string') {
      return NextResponse.json({ error: 'Content required' }, { status: 400 })
    }

    const contentLower = content.toLowerCase()
    
    const hasIllegalContent = ILLEGAL_KEYWORDS.some(keyword => 
      contentLower.includes(keyword)
    )

    if (hasIllegalContent) {
      return NextResponse.json({ 
        blocked: true,
        reason: 'Content contains potentially illegal material',
        action: 'reject'
      })
    }

    const hasGraphicContent = /\b(blood|gore|violent|graphic|nsfw)\b/i.test(content)
    const hasSensitiveContent = /\b(death|suicide|self[ -]harm)\b/i.test(content)

    let suggestedWarning = 'none'
    if (hasGraphicContent) suggestedWarning = 'graphic'
    else if (hasSensitiveContent) suggestedWarning = 'sensitive'

    return NextResponse.json({ 
      blocked: false,
      suggestedWarning,
      action: 'allow'
    })

  } catch (error) {
    return NextResponse.json({ error: 'Moderation check failed' }, { status: 500 })
  }
}
