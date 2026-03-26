import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function POST(req: NextRequest) {
  const { userId } = await req.json();
  if (!userId) return NextResponse.json({ error: 'Unauthorized: userId required' }, { status: 401 });

  const supabaseAdmin = createAdminClient();

  await supabaseAdmin
    .from('brands')
    .update({
      instagram_access_token: null,
      instagram_user_id: null,
      instagram_token_expires_at: null
    })
    .eq('user_id', userId);

  return NextResponse.json({ success: true });
}
