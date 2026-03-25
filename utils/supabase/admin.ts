import { createClient } from '@supabase/supabase-js'

/**
 * Admin client using Service Role Key — bypasses Row Level Security.
 * Only use server-side (API routes, cron jobs). NEVER expose to the browser.
 */
export const createAdminClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}
