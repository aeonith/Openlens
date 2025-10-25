import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
  id: string
  username: string
  email: string
  verified: boolean
  reputation_points: number
  avatar_url?: string
  bio?: string
  can_publish: boolean
}

interface Article {
  id: string
  author_id: string
  title: string
  content: string
  media_url: string | null
  media_type: 'image' | 'video' | null
  content_warning: 'none' | 'graphic' | 'violence' | 'sensitive' | null
  likes: number
  views: number
  created_at: string
}

interface Comment {
  id: string
  article_id: string
  author_id: string
  text: string
  likes: number
  created_at: string
}

interface LocalStore {
  user: User | null
  articles: Article[]
  comments: Comment[]
  login: (email: string, password: string) => boolean
  signup: (username: string, email: string, password: string) => boolean
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
  upgradeToPro: () => void
  addArticle: (article: Omit<Article, 'id' | 'created_at' | 'likes' | 'views'>) => void
  addComment: (comment: Omit<Comment, 'id' | 'created_at' | 'likes'>) => void
  getArticleById: (id: string) => Article | undefined
  getUserArticles: (userId: string) => Article[]
}

export const useLocalStore = create<LocalStore>()(
  persist(
    (set, get) => ({
      user: null,
      articles: [],
      comments: [],

      login: (email: string, password: string) => {
        const user = {
          id: '1',
          username: email.split('@')[0],
          email,
          verified: true,
          reputation_points: 100,
          can_publish: true,
          bio: 'OpenLens user',
          avatar_url: undefined
        }
        set({ user })
        return true
      },

      signup: (username: string, email: string, password: string) => {
        const user = {
          id: Date.now().toString(),
          username,
          email,
          verified: false,
          reputation_points: 0,
          can_publish: false,
          bio: '',
          avatar_url: undefined
        }
        set({ user })
        return true
      },

      logout: () => set({ user: null }),

      updateProfile: (updates: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null
        }))
      },

      upgradeToPro: () => {
        set((state) => ({
          user: state.user ? { ...state.user, can_publish: true, verified: true } : null
        }))
      },

      addArticle: (article) => {
        const newArticle: Article = {
          ...article,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
          likes: 0,
          views: 0
        }
        set((state) => ({ articles: [newArticle, ...state.articles] }))
      },

      addComment: (comment) => {
        const newComment: Comment = {
          ...comment,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
          likes: 0
        }
        set((state) => ({ comments: [newComment, ...state.comments] }))
      },

      getArticleById: (id: string) => {
        return get().articles.find(a => a.id === id)
      },

      getUserArticles: (userId: string) => {
        return get().articles.filter(a => a.author_id === userId)
      }
    }),
    {
      name: 'openlens-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
