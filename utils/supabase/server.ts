import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

/**
 * Server-side Supabase client that reads auth from cookies.
 * Use in API routes / server components to get the current session.
 */
export const createClientServer = async () => {
  const cookieStore = await cookies()
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          cookie: cookieStore.getAll()
            .map(c => `${c.name}=${c.value}`)
            .join('; ')
        }
      }
    }
  )

  return supabase
}
