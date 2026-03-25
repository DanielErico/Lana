import { createClient } from '@supabase/supabase-js'

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: any;
        Insert: any;
        Update: any;
      };
      brands: {
        Row: any;
        Insert: any;
        Update: any;
      };
    };
  };
};

// Simple singleton client for client-side components
let supabaseClient: ReturnType<typeof createClient<Database>> | null = null;

export const createClientBrowser = () => {
  if (supabaseClient) return supabaseClient;
  
  supabaseClient = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  return supabaseClient;
}
