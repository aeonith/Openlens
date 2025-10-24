'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'

interface ContentWarningProps {
  children: React.ReactNode
  type: 'graphic' | 'violence' | 'sensitive'
  reason?: string
}

export default function ContentWarning({ children, type, reason }: ContentWarningProps) {
  const [revealed, setRevealed] = useState(false)

  if (revealed) {
    return <>{children}</>
  }

  const warningText = {
    graphic: 'Graphic Content',
    violence: 'Violence / Blood',
    sensitive: 'Sensitive Content'
  }

  return (
    <div className="relative">
      <div className="blur-xl pointer-events-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="text-center space-y-4 p-8">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto" />
          <h3 className="text-2xl font-bold text-white">{warningText[type]}</h3>
          <p className="text-gray-300">Viewer Discretion Advised</p>
          {reason && <p className="text-gray-400 text-sm">{reason}</p>}
          <button
            onClick={() => setRevealed(true)}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium rounded-lg transition"
          >
            I Understand, Show Content
          </button>
        </div>
      </div>
    </div>
  )
}
