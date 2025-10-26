'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye } from 'lucide-react'

export default function AdminDashboard() {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    checkAdmin()
  }, [])

  async function checkAdmin() {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/auth/simple-login')
      return
    }

    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin' && profile?.role !== 'moderator') {
      alert('Access denied - Admin only')
      router.push('/')
      return
    }

    setIsAdmin(true)
    fetchReports()
  }

  async function fetchReports() {
    const { data } = await supabase
      .from('reports')
      .select(`
        *,
        users!reporter_id (username)
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })

    setReports(data || [])
    setLoading(false)
  }

  async function handleReport(reportId: string, action: 'approve' | 'reject') {
    await supabase
      .from('reports')
      .update({ 
        status: action === 'approve' ? 'actioned' : 'dismissed',
        resolved_at: new Date().toISOString()
      })
      .eq('id', reportId)

    fetchReports()
  }

  if (!isAdmin) return null

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center space-x-3 mb-8">
        <Shield className="w-10 h-10 text-cyan-400" />
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="gradient-border glow-border p-6 bg-gray-900/90 backdrop-blur-sm rounded-lg">
          <div className="text-3xl font-bold text-yellow-500">{reports.length}</div>
          <div className="text-gray-400">Pending Reports</div>
        </div>
        <div className="gradient-border glow-border p-6 bg-gray-900/90 backdrop-blur-sm rounded-lg">
          <div className="text-3xl font-bold text-green-500">0</div>
          <div className="text-gray-400">Resolved Today</div>
        </div>
        <div className="gradient-border glow-border p-6 bg-gray-900/90 backdrop-blur-sm rounded-lg">
          <div className="text-3xl font-bold text-red-500">0</div>
          <div className="text-gray-400">Blocked Users</div>
        </div>
      </div>

      <div className="gradient-border glow-border p-6 bg-gray-900/90 backdrop-blur-sm rounded-lg">
        <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
          <AlertTriangle className="w-6 h-6 text-yellow-500" />
          <span>Pending Reports</span>
        </h2>

        {loading ? (
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="bg-gray-800 p-4 rounded-lg animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <p className="text-xl">No pending reports</p>
            <p className="text-sm">All caught up!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium">
                        {report.reason}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {report.content_type}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Reported by: <span className="text-white">{report.users?.username || 'Anonymous'}</span>
                    </p>
                    <p className="text-gray-500 text-xs">
                      {new Date(report.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleReport(report.id, 'approve')}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition flex items-center space-x-1"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Remove Content</span>
                    </button>
                    <button
                      onClick={() => handleReport(report.id, 'reject')}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition flex items-center space-x-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Dismiss</span>
                    </button>
                  </div>
                </div>
                
                {report.details && (
                  <div className="bg-gray-900 p-4 rounded mt-4">
                    <p className="text-sm text-gray-300">{report.details}</p>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <button className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>View Content</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
