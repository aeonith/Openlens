'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Upload, Link as LinkIcon, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react'

export default function SubmitPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mediaUrl, setMediaUrl] = useState('')
  const [claims, setClaims] = useState<Array<{ text: string; evidence: string; status: 'verified' | 'theory' | 'unverified' }>>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const addClaim = () => {
    setClaims([...claims, { text: '', evidence: '', status: 'unverified' }])
  }

  const updateClaim = (index: number, field: string, value: any) => {
    const updated = [...claims]
    updated[index] = { ...updated[index], [field]: value }
    setClaims(updated)
  }

  const removeClaim = (index: number) => {
    setClaims(claims.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        alert('Please log in to submit articles')
        return
      }

      const { data: article, error: articleError } = await supabase
        .from('articles')
        .insert({
          author_id: user.id,
          title,
          content,
          media_url: mediaUrl || null,
          media_type: mediaUrl.includes('youtube') || mediaUrl.includes('.mp4') ? 'video' : mediaUrl ? 'image' : null
        })
        .select()
        .single()

      if (articleError) throw articleError

      if (claims.length > 0 && article) {
        const claimsData = claims
          .filter(c => c.text)
          .map(claim => ({
            article_id: article.id,
            text: claim.text,
            evidence_link: claim.evidence || null,
            status: claim.status
          }))

        const { error: claimsError } = await supabase
          .from('claims')
          .insert(claimsData)

        if (claimsError) throw claimsError
      }

      router.push('/')
    } catch (error) {
      console.error('Error submitting article:', error)
      alert('Error submitting article')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Submit Article</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            placeholder="Breaking: New Discovery..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={8}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            placeholder="Write your article content here..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Media URL (Optional)</label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="url"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-blue-500 focus:outline-none"
              placeholder="https://example.com/image.jpg or YouTube link"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium">Claims (Optional)</label>
            <button
              type="button"
              onClick={addClaim}
              className="text-blue-500 hover:text-blue-400 text-sm font-medium"
            >
              + Add Claim
            </button>
          </div>
          
          <div className="space-y-4">
            {claims.map((claim, index) => (
              <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                <div className="space-y-3">
                  <input
                    type="text"
                    value={claim.text}
                    onChange={(e) => updateClaim(index, 'text', e.target.value)}
                    placeholder="Claim statement..."
                    className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                  <input
                    type="url"
                    value={claim.evidence}
                    onChange={(e) => updateClaim(index, 'evidence', e.target.value)}
                    placeholder="Evidence link (optional)"
                    className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => updateClaim(index, 'status', 'verified')}
                        className={`flex items-center space-x-1 px-3 py-1 rounded text-sm ${claim.status === 'verified' ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-400'}`}
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Verified</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => updateClaim(index, 'status', 'theory')}
                        className={`flex items-center space-x-1 px-3 py-1 rounded text-sm ${claim.status === 'theory' ? 'bg-yellow-500 text-white' : 'bg-gray-800 text-gray-400'}`}
                      >
                        <AlertTriangle className="w-4 h-4" />
                        <span>Theory</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => updateClaim(index, 'status', 'unverified')}
                        className={`flex items-center space-x-1 px-3 py-1 rounded text-sm ${claim.status === 'unverified' ? 'bg-gray-600 text-white' : 'bg-gray-800 text-gray-400'}`}
                      >
                        <HelpCircle className="w-4 h-4" />
                        <span>Unverified</span>
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeClaim(index)}
                      className="text-red-500 hover:text-red-400 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white font-medium py-3 rounded-lg transition"
        >
          {loading ? 'Submitting...' : 'Publish Article'}
        </button>
      </form>
    </div>
  )
}
