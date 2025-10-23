# OpenLens - Agent Instructions

## Commands

### Development
\`\`\`bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
\`\`\`

## Project Structure

- `src/app/` - Next.js App Router pages
- `src/components/` - React components
- `src/lib/` - Utilities and configurations
- `src/types/` - TypeScript type definitions

## Code Style

- Use TypeScript for all new files
- Follow functional component patterns with hooks
- Use Tailwind CSS for styling (dark theme: bg-black, text-white, border-gray-800)
- Icons from lucide-react
- No semicolons required (Next.js default)

## Supabase Setup

1. Create project at https://supabase.com
2. Run SQL from `SUPABASE_SETUP.md`
3. Add credentials to `.env.local`
4. Tables: users, articles, claims, videos, reviews, comments

## Key Features

- Real-time updates using Supabase Realtime
- Dark theme (X/Instagram style)
- Evidence-based claims (verified, theory, unverified)
- Media support (images/videos)
- Community-driven moderation

## Testing

Currently no tests configured. To add:
\`\`\`bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
\`\`\`
