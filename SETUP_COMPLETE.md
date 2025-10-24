# 🚀 Complete Setup Guide - Get OpenLens Fully Working

## Current Status
✅ Web app built and designed  
❌ Database not connected (features won't work yet)  
❌ AI not configured  
❌ Authentication not set up  

## What You Need to Do (Step-by-Step)

---

## Step 1: Set Up Supabase (10 minutes) - REQUIRED

### A. Create Supabase Account
1. Go to https://supabase.com
2. Click "Start your project" (sign up with GitHub or email)
3. Click "New Project"
4. Fill in:
   - **Name:** openlens
   - **Database Password:** (generate a strong one - SAVE THIS!)
   - **Region:** Choose closest to you (e.g., US West, US East, Europe)
   - **Plan:** Free (perfect for starting)
5. Click "Create new project"
6. **Wait 2-3 minutes** for project to be ready

### B. Set Up Database Tables
1. In Supabase dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New Query"**
3. Open `SUPABASE_SETUP.md` file in your project
4. **Copy ALL the SQL code** from that file
5. **Paste it into the SQL Editor**
6. Click **"Run"** (or press Cmd/Ctrl + Enter)
7. You should see "Success. No rows returned" ✅

### C. Get Your API Keys
1. In Supabase dashboard, click **"Project Settings"** (gear icon, bottom left)
2. Click **"API"** in the left menu
3. You'll see:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)
4. **Copy both of these!**

### D. Add Keys to Your Project
1. Open your project folder in your code editor
2. Find the file `.env.local` (or create it in the root folder)
3. Add your keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. **Save the file**
5. **Restart your dev server:**
   ```bash
   # Stop current server (Ctrl+C in terminal)
   npm run dev
   ```

### E. Set Up Storage for Videos
1. In Supabase dashboard, click **"Storage"** (left sidebar)
2. Click **"Create a new bucket"**
3. Name it: `media`
4. Make it **Public**
5. Click "Create bucket"

---

## Step 2: Set Up OpenAI for AI Features (5 minutes) - OPTIONAL

### A. Get OpenAI API Key
1. Go to https://platform.openai.com/signup
2. Sign up or log in
3. Click your profile → "View API Keys"
4. Click "Create new secret key"
5. **Copy the key** (starts with `sk-...`)
6. **SAVE IT** - you can't see it again!

### B. Add to Your Project
1. Open `.env.local` file
2. Add this line:

```env
OPENAI_API_KEY=sk-your-key-here
```

3. Save and restart dev server

### C. What AI Does
- **AI Search:** Semantic search with natural language
- **AI Summaries:** Summarizes search results
- **Future:** AI claim verification, content moderation

**Cost:** ~$0.002 per search (very cheap)  
**Free tier:** $5 credit when you sign up

---

## Step 3: Test Everything Works

### A. Restart Dev Server
```bash
npm run dev
```

### B. Test Authentication
1. Go to http://localhost:3000/auth/signup
2. Create a test account (use real email)
3. Check your email for confirmation link
4. Click confirmation link
5. You should be logged in! ✅

### C. Test Article Submission
1. Click **"Submit"** in navigation
2. Create a test article:
   - Title: "Test Article"
   - Content: "This is a test"
   - Add a claim (optional)
3. Click "Publish Article"
4. Go back to home page
5. **Your article should appear!** ✅

### D. Test Video Upload
1. Go to Submit page
2. Click "Upload Video" tab
3. Upload a small video file
4. Submit article
5. Video should appear in feed ✅

### E. Test Search
1. Type in search bar: "test article"
2. Press Enter
3. Should see search results page ✅
4. (AI summary works if OpenAI key is set)

### F. Test Comments
1. Click on any article
2. Scroll to comments section
3. Type a comment and post
4. Comment should appear instantly! ✅

---

## Step 4: Enable Google OAuth Login (Optional)

### A. Set Up Google OAuth
1. Go to https://console.cloud.google.com
2. Create new project: "OpenLens"
3. Enable "Google+ API"
4. Create OAuth credentials
5. Add authorized redirect:
   - `http://localhost:3000/auth/callback`
   - `https://your-project.supabase.co/auth/v1/callback`

### B. Add to Supabase
1. Supabase dashboard → Authentication → Providers
2. Enable "Google"
3. Add your Google Client ID and Secret
4. Save

### C. Test
1. Go to login page
2. Click "Continue with Google"
3. Should redirect and log you in! ✅

---

## Step 5: Deploy to Production (Optional but Recommended)

### A. Deploy to Vercel (Free Hosting)
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import your `OpenLens` repo
5. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY` (if using AI)
6. Click "Deploy"
7. Wait 2-3 minutes
8. **Your site is live!** You get a URL like `openlens.vercel.app`

### B. Update Supabase Settings
1. Supabase dashboard → Authentication → URL Configuration
2. Add your Vercel URL to "Site URL"
3. Add to "Redirect URLs":
   - `https://your-site.vercel.app/auth/callback`

---

## Troubleshooting

### "Can't connect to database"
- ✅ Check `.env.local` has correct Supabase URL and key
- ✅ Restart dev server after adding keys
- ✅ Make sure you ran the SQL setup in Supabase

### "Authentication not working"
- ✅ Check Supabase → Authentication → Providers → Email is enabled
- ✅ Check spam folder for confirmation email
- ✅ Make sure Site URL is set in Supabase settings

### "Video upload fails"
- ✅ Check storage bucket "media" exists in Supabase
- ✅ Make sure bucket is set to "Public"
- ✅ Video file must be under 100MB

### "AI search not working"
- ✅ Check OpenAI API key is in `.env.local`
- ✅ Check you have credits in OpenAI account
- ✅ Restart dev server after adding key

### "Nothing shows in feed"
- ✅ Make sure you created at least one article
- ✅ Check browser console for errors (F12)
- ✅ Try hard refresh (Cmd+Shift+R)

---

## What Works WITHOUT Setup

✅ UI and design (gradient borders, rock background)  
✅ Navigation  
✅ Viewing mock articles  
✅ Page layouts  

## What Needs Setup

❌ User authentication (login/signup)  
❌ Creating real articles  
❌ Comments  
❌ Video uploads  
❌ AI search  
❌ Database storage  

---

## Quick Start Checklist

- [ ] Create Supabase account
- [ ] Create new project in Supabase
- [ ] Run SQL setup from SUPABASE_SETUP.md
- [ ] Copy Supabase URL and API key
- [ ] Add keys to .env.local
- [ ] Create "media" storage bucket
- [ ] Restart dev server
- [ ] Test signup/login
- [ ] Create first article
- [ ] (Optional) Add OpenAI key for AI
- [ ] (Optional) Deploy to Vercel

---

## Total Time: ~15 minutes
## Total Cost: FREE (Supabase + Vercel free tiers)

Once you complete these steps, **EVERYTHING will work** - authentication, articles, comments, video uploads, search, and AI features!

**Need help?** Check the troubleshooting section above or the official docs:
- Supabase: https://supabase.com/docs
- Next.js: https://nextjs.org/docs
- Vercel: https://vercel.com/docs
