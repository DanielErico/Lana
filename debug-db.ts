import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function check() {
  console.log('Fetching brands...');
  const { data: brands, error } = await supabaseAdmin.from('brands').select('*');
  if (error) console.error(error);
  else console.log('Brands:', brands);
}
check();
