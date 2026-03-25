const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function check() {
  console.log('Fetching profiles...');
  const { data: profiles } = await supabaseAdmin.from('profiles').select('*');
  console.log('Profiles:', profiles);

  console.log('Fetching brands...');
  const { data: brands } = await supabaseAdmin.from('brands').select('*');
  console.log('Brands:', brands);
}
check();
