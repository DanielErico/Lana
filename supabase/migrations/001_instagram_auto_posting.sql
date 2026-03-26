-- Instagram Auto-Posting Migration
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- ============================================
-- 1. Add Instagram columns to `brands` table
-- ============================================
ALTER TABLE brands
  ADD COLUMN IF NOT EXISTS instagram_user_id TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS instagram_access_token TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS instagram_token_expires_at TIMESTAMPTZ DEFAULT NULL;

-- ============================================
-- 2. Add scheduling columns to `posts` table
-- ============================================
ALTER TABLE posts
  ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMPTZ DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS caption TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS instagram_post_id TEXT DEFAULT NULL;

-- ============================================
-- 3. Create index for faster scheduled post lookups
-- ============================================
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts (status);
CREATE INDEX IF NOT EXISTS idx_posts_scheduled_at ON posts (scheduled_at);
