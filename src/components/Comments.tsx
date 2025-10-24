'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { MessageCircle, Heart, Send } from 'lucide-react'
import VerificationBadge from './VerificationBadge'

interface CommentsProps {
  articleId: string
}

export default function Comments({ articleId }: CommentsProps) {
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchComments()

    const channel = supabase
      .channel(`comments-${articleId}`)
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'comments', filter: `article_id=eq.${articleId}` },
        (payload) => {
          setComments((prev) => [payload.new as any, ...prev])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [articleId])

  async function fetchComments() {
    const { data } = await supabase
      .from('comments')
      .select(`
        *,
        users (username, avatar_url, verified)
      `)
      .eq('article_id', articleId)
      .order('created_at', { ascending: false })

    setComments(data || [])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!newComment.trim()) return

    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('Please log in to comment')
        return
      }

      await supabase.from('comments').insert({
        article_id: articleId,
        author_id: user.id,
        text: newComment
      })

      setNewComment('')
      await fetchComments()
    } catch (error) {
      console.error('Error posting comment:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold flex items-center space-x-2">
        <MessageCircle className="w-6 h-6" />
        <span>Comments ({comments.length})</span>
      </h3>

      <form onSubmit={handleSubmit} className="gradient-border glow-border p-4 bg-gray-900/90 backdrop-blur-sm rounded-lg">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          rows={3}
          className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none resize-none"
        />
        <button
          type="submit"
          disabled={loading || !newComment.trim()}
          className="mt-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-700 text-white font-medium py-2 px-6 rounded-lg transition flex items-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>{loading ? 'Posting...' : 'Post Comment'}</span>
        </button>
      </form>

      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="gradient-border p-4 bg-gray-900/90 backdrop-blur-sm rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                {comment.users.username[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold">{comment.users.username}</span>
                  {comment.users.verified && <VerificationBadge verified size="sm" />}
                  <span className="text-gray-500 text-sm">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-300">{comment.text}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button className="flex items-center space-x-1 text-gray-400 hover:text-red-500 transition text-sm">
                    <Heart className="w-4 h-4" />
                    <span>{comment.likes || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
