import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { createClientBrowser } from '@/utils/supabase/client';

// GET all posts for current user
export async function GET() {
  const supabase = createClientBrowser();
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id || '00000000-0000-0000-0000-000000000000';

  const admin = createAdminClient();
  const { data, error } = await admin
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .order('scheduled_for', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ posts: data });
}

// DELETE all posts for current user
export async function DELETE() {
  const supabase = createClientBrowser();
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id || '00000000-0000-0000-0000-000000000000';

  const admin = createAdminClient();
  const { error } = await admin.from('posts').delete().eq('user_id', userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
