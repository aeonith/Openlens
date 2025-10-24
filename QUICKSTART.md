# 🚀 OpenLens Quick Start Guide

## What You Need to Do

### 1. Create Supabase Account (5 minutes)

1. Go to https://supabase.com
2. Click "Start your project" → Sign up
3. Click "New Project"
4. Choose:
   - Name: `openlens`
   - Database Password: (generate strong password)
   - Region: (closest to you)
   - Plan: Free tier

### 2. Run Database Setup (2 minutes)

1. In Supabase dashboard → "SQL Editor"
2. Click "New Query"
3. Copy ALL SQL from `SUPABASE_SETUP.md`
4. Paste and click "Run"

### 3. Get Your API Keys (1 minute)

1. Supabase dashboard → "Project Settings" → "API"
2. Copy: `Project URL` and `anon public` key

### 4. Add Keys to Project (1 minute)

Create `.env.local`:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

### 5. Run the App!

\`\`\`bash
npm run dev
\`\`\`

Open http://localhost:3000 🎉
