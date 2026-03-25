import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

  const admin = createAdminClient();
  const [{ data: profile }, { data: brand }] = await Promise.all([
    admin.from('profiles').select('*').eq('id', userId).maybeSingle(),
    admin.from('brands').select('*').eq('user_id', userId).maybeSingle(),
  ]);

  return NextResponse.json({ profile, brand });
}
