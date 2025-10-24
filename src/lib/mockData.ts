export const mockArticles = [
  {
    id: '1',
    title: 'Breaking: AI Achieves Breakthrough in Quantum Computing',
    content: 'Researchers at MIT have successfully demonstrated a new quantum algorithm that could revolutionize computing. The breakthrough allows quantum computers to solve previously impossible problems in minutes rather than centuries.',
    author_id: '1',
    media_url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
    media_type: 'image' as const,
    likes: 2847,
    views: 15234,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    users: {
      username: 'QuantumResearcher',
      avatar_url: null,
      verified: true
    }
  },
  {
    id: '2',
    title: 'New Study Links Mediterranean Diet to Longevity',
    content: 'A 20-year study involving 500,000 participants shows strong correlation between Mediterranean diet adherence and increased lifespan. Participants following the diet showed 30% reduction in cardiovascular disease.',
    author_id: '2',
    media_url: null,
    media_type: null,
    likes: 1523,
    views: 8932,
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    users: {
      username: 'HealthScience',
      avatar_url: null
    }
  },
  {
    id: '3',
    title: 'Mars Rover Discovers Potential Biosignatures',
    content: 'NASA Perseverance rover has identified organic molecules in Martian rock samples that could indicate ancient microbial life. Scientists remain cautious but excited about the implications for extraterrestrial life.',
    author_id: '3',
    media_url: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800',
    media_type: 'image' as const,
    likes: 4521,
    views: 23401,
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    users: {
      username: 'SpaceExplorer',
      avatar_url: null
    }
  },
  {
    id: '4',
    title: 'Cryptocurrency Market Analysis: Bitcoin Hits New High',
    content: 'Bitcoin reaches $75,000 amid institutional adoption and regulatory clarity. Analysts predict continued growth as major banks begin offering crypto custody services.',
    author_id: '4',
    media_url: null,
    media_type: null,
    likes: 892,
    views: 5234,
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    users: {
      username: 'CryptoAnalyst',
      avatar_url: null
    }
  },
  {
    id: '5',
    title: 'Climate Scientists Report Accelerated Ice Sheet Melting',
    content: 'New satellite data shows Greenland and Antarctic ice sheets melting faster than predicted. The findings suggest sea level rise projections may need significant revision upward.',
    author_id: '5',
    media_url: 'https://images.unsplash.com/photo-1564053489984-317bbd824340?w=800',
    media_type: 'image' as const,
    likes: 3102,
    views: 18765,
    created_at: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    users: {
      username: 'ClimateWatch',
      avatar_url: null
    }
  }
]
