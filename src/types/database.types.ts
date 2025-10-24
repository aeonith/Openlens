export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          email: string
          avatar_url: string | null
          bio: string | null
          reputation_points: number
          role: 'user' | 'reviewer' | 'moderator' | 'admin'
          verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          username: string
          email: string
          avatar_url?: string | null
          bio?: string | null
          reputation_points?: number
          role?: 'user' | 'reviewer' | 'moderator' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          email?: string
          avatar_url?: string | null
          bio?: string | null
          reputation_points?: number
          role?: 'user' | 'reviewer' | 'moderator' | 'admin'
          updated_at?: string
        }
      }
      articles: {
        Row: {
          id: string
          author_id: string
          title: string
          content: string
          media_url: string | null
          media_type: 'image' | 'video' | null
          content_warning: 'none' | 'graphic' | 'violence' | 'sensitive' | null
          views: number
          likes: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          author_id: string
          title: string
          content: string
          media_url?: string | null
          media_type?: 'image' | 'video' | null
          views?: number
          likes?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          author_id?: string
          title?: string
          content?: string
          media_url?: string | null
          media_type?: 'image' | 'video' | null
          views?: number
          likes?: number
          updated_at?: string
        }
      }
      claims: {
        Row: {
          id: string
          article_id: string
          text: string
          evidence_link: string | null
          status: 'verified' | 'theory' | 'unverified'
          position_start: number | null
          position_end: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          article_id: string
          text: string
          evidence_link?: string | null
          status?: 'verified' | 'theory' | 'unverified'
          position_start?: number | null
          position_end?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          article_id?: string
          text?: string
          evidence_link?: string | null
          status?: 'verified' | 'theory' | 'unverified'
          position_start?: number | null
          position_end?: number | null
          updated_at?: string
        }
      }
      videos: {
        Row: {
          id: string
          article_id: string
          url: string
          transcript: string | null
          duration: number | null
          created_at: string
        }
        Insert: {
          id?: string
          article_id: string
          url: string
          transcript?: string | null
          duration?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          article_id?: string
          url?: string
          transcript?: string | null
          duration?: number | null
        }
      }
      reviews: {
        Row: {
          id: string
          claim_id: string
          reviewer_id: string
          review_status: 'approve' | 'dispute' | 'pending'
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          claim_id: string
          reviewer_id: string
          review_status?: 'approve' | 'dispute' | 'pending'
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          claim_id?: string
          reviewer_id?: string
          review_status?: 'approve' | 'dispute' | 'pending'
          comment?: string | null
        }
      }
      comments: {
        Row: {
          id: string
          article_id: string
          author_id: string
          text: string
          likes: number
          created_at: string
        }
        Insert: {
          id?: string
          article_id: string
          author_id: string
          text: string
          likes?: number
          created_at?: string
        }
        Update: {
          id?: string
          article_id?: string
          author_id?: string
          text?: string
          likes?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
