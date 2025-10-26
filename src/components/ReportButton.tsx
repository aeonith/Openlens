'use client'

import { useState } from 'react'
import { Flag, X } from 'lucide-react'

interface ReportButtonProps {
  contentId: string
  contentType: 'article' | 'comment' | 'user'
}

export default function ReportButton({ contentId, contentType }: ReportButtonProps) {
  const [showModal, setShowModal] = useState(false)
  const [reason, setReason] = useState('spam')
  const [details, setDetails] = useState('')
  const [loading, setLoading] = useState(false)

  const handleReport = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/reports/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content_id: contentId,
          content_type: contentType,
          reason,
          details
        })
      })

      const data = await res.json()
      
      if (res.ok) {
        alert('Report submitted. Our team will review it.')
        setShowModal(false)
      } else {
        alert(data.error || 'Failed to submit report')
      }
    } catch (error) {
      alert('Error submitting report')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-gray-400 hover:text-red-500 transition"
        title="Report content"
      >
        <Flag className="w-5 h-5" />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="gradient-border glow-border max-w-md w-full p-6 bg-gray-900 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Report Content</h2>
              <button onClick={() => setShowModal(false)}>
                <X className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Reason</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="illegal">Illegal Content</option>
                  <option value="spam">Spam</option>
                  <option value="harassment">Harassment</option>
                  <option value="misinformation">Misinformation</option>
                  <option value="graphic">Graphic Content</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Details (Optional)</label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  maxLength={500}
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none resize-none"
                  placeholder="Provide additional context..."
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleReport}
                  disabled={loading}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 text-white font-medium py-2 rounded-lg transition"
                >
                  {loading ? 'Submitting...' : 'Submit Report'}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
