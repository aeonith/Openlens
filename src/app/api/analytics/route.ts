import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createClient()

    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })

    const { count: totalArticles } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true })

    const { count: totalComments } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true })

    const { count: pendingReports } = await supabase
      .from('reports')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')

    const { data: topArticles } = await supabase
      .from('articles')
      .select('id, title, views, likes')
      .order('views', { ascending: false })
      .limit(5)

    return NextResponse.json({
      stats: {
        totalUsers: totalUsers || 0,
        totalArticles: totalArticles || 0,
        totalComments: totalComments || 0,
        pendingReports: pendingReports || 0
      },
      topArticles: topArticles || []
    })

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
