import { NextRequest, NextResponse } from 'next/server';
import { createClientServer } from '@/utils/supabase/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const supabase = await createClientServer();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await supabaseAdmin
    .from('brands')
    .update({
      instagram_access_token: null,
      instagram_user_id: null,
      instagram_token_expires_at: null
    })
    .eq('user_id', session.user.id);

  return NextResponse.json({ success: true });
}
