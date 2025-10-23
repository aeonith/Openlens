# OpenLens

A modern, evidence-first knowledge and media platform where anyone can submit articles or videos, link claims to evidence, and contribute to a transparent network of information.

## 💡 Vision

OpenLens is a next-generation, community-driven knowledge network — a fusion of Wikipedia, X, and Instagram with AI-powered insights. Create the world's first *open-source, community-owned media network* that rewards truth, creativity, and transparency — with minimal censorship (only illegal content and explicit nudity removed).

## Features

- 📝 Article submission with rich content
- 🎥 Video upload and transcript support
- ✅ Evidence-based claims system (Verified, Theory, Unverified)
- 👥 Community reviewer and reputation system
- 🔍 Advanced filtering (verified content, theories, trending)
- 🔄 Real-time feed updates
- 📱 Responsive X/Instagram-style UI
- 🤖 AI-driven content curation and suggestions

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL + Auth + Realtime + Storage)
- **Icons:** Lucide React
- **AI:** OpenAI API integration
- **Deployment:** Vercel (recommended)

## Getting Started

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Set Up Supabase

1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Run the SQL commands from `SUPABASE_SETUP.md` in the Supabase SQL Editor
4. Copy your project URL and anon key

### 3. Configure Environment Variables

Create a `.env.local` file:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key (optional)
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
src/
├── app/              # Next.js app router pages
│   ├── page.tsx      # Home feed
│   ├── explore/      # Explore with filters
│   ├── submit/       # Article submission
│   └── layout.tsx    # Root layout
├── components/       # React components
│   ├── Navigation.tsx
│   ├── ArticleCard.tsx
│   └── Feed.tsx
├── lib/             # Utilities
│   └── supabase.ts  # Supabase client
└── types/           # TypeScript types
    └── database.types.ts
\`\`\`

## Features Roadmap

### MVP (Current)
- ✅ User authentication
- ✅ Article submission
- ✅ Claims system
- ✅ Real-time feed
- ✅ Basic filtering

### Phase 2
- 🔄 Video transcript generation
- 🔄 Reviewer system with reputation
- 🔄 AI-powered claim suggestions
- 🔄 Advanced search
- 🔄 User profiles
- 🔄 Subscription tiers

### Phase 3
- 🔄 Mobile app (React Native)
- 🔄 Immutable logging (blockchain/IPFS)
- 🔄 Moderation system
- 🔄 API for researchers

## Database Schema

See `SUPABASE_SETUP.md` for the complete database schema including:
- Users
- Articles
- Claims
- Videos
- Reviews
- Comments

## Contributing

This is an open project. Content moderation policy: No illegal content or explicit nudity. Everything else is allowed.

## License

MIT License - See LICENSE file
