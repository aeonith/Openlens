'use client'

import { useState } from 'react'
import { Upload, X } from 'lucide-react'

interface VideoUploadProps {
  onVideoSelect: (file: File | null) => void
}

export default function VideoUpload({ onVideoSelect }: VideoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate video file
    if (!file.type.startsWith('video/')) {
      alert('Please select a video file')
      return
    }

    // Check file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      alert('Video must be less than 100MB')
      return
    }

    setUploading(true)
    
    // Create preview
    const videoUrl = URL.createObjectURL(file)
    setPreview(videoUrl)
    
    onVideoSelect(file)
    setUploading(false)
  }

  const handleRemove = () => {
    setPreview(null)
    onVideoSelect(null)
    if (preview) URL.revokeObjectURL(preview)
  }

  return (
    <div className="space-y-3">
      {!preview ? (
        <div>
          <label className="block text-sm font-medium mb-2">Upload Video (Optional)</label>
          <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-cyan-500 transition bg-gray-900/50">
            <div className="text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-400">Click to upload video</p>
              <p className="text-xs text-gray-500 mt-1">MP4, MOV, AVI (Max 100MB)</p>
            </div>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      ) : (
        <div className="relative">
          <video
            src={preview}
            controls
            className="w-full rounded-lg"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
