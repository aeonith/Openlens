'use client'

import { Heart, MessageCircle, Share2, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import VerificationBadge from './VerificationBadge'

interface ArticleCardProps {
  id: string
  title: string
  content: string
  author: {
    username: string
    avatar_url?: string
    verified?: boolean
  }
  mediaUrl?: string
  mediaType?: 'image' | 'video'
  claimCount?: number
  verifiedCount?: number
  theoryCount?: number
  unverifiedCount?: number
  likes: number
  commentCount?: number
  createdAt: string
}

export default function ArticleCard({ 
  id, 
  title, 
  content, 
  author, 
  mediaUrl, 
  mediaType,
  claimCount = 0,
  verifiedCount = 0,
  theoryCount = 0,
  unverifiedCount = 0,
  likes, 
  commentCount = 0,
  createdAt 
}: ArticleCardProps) {
  return (
    <div className="gradient-border glow-border overflow-hidden transition-all">
      <div className="p-4 bg-gray-900 rounded-lg">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold">
            {author.username[0].toUpperCase()}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <p className="text-white font-medium">{author.username}</p>
              {author.verified && <VerificationBadge verified size="sm" />}
            </div>
            <p className="text-gray-500 text-sm">{new Date(createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <Link href={`/article/${id}`}>
          <h2 className="text-xl font-bold text-white mb-2 hover:text-blue-400">{title}</h2>
          <p className="text-gray-300 mb-3 line-clamp-3">{content}</p>
        </Link>

        {mediaUrl && (
          <div className="mb-3 rounded-lg overflow-hidden">
            {mediaType === 'image' ? (
              <img src={mediaUrl} alt={title} className="w-full h-64 object-cover" />
            ) : (
              <video src={mediaUrl} controls className="w-full h-64" />
            )}
          </div>
        )}

        {claimCount > 0 && (
          <div className="flex items-center space-x-4 mb-3 text-sm">
            <div className="flex items-center space-x-1 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>{verifiedCount}</span>
            </div>
            <div className="flex items-center space-x-1 text-yellow-400">
              <AlertTriangle className="w-4 h-4" />
              <span>{theoryCount}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400">
              <HelpCircle className="w-4 h-4" />
              <span>{unverifiedCount}</span>
            </div>
            <span className="text-gray-500">{claimCount} claims</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-800">
          <button className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition">
            <Heart className="w-5 h-5" />
            <span>{likes}</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition">
            <MessageCircle className="w-5 h-5" />
            <span>{commentCount}</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-400 hover:text-green-500 transition">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
