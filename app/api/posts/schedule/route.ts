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

  const { postId, scheduledAt, templateId = 'rimberio', caption } = await req.json();
  if (!postId || !scheduledAt) {
    return NextResponse.json({ error: 'postId and scheduledAt are required' }, { status: 400 });
  }

  // 1. Save the scheduled time and status to Supabase
  const { error: updateError } = await supabaseAdmin
    .from('posts')
    .update({
      scheduled_at: scheduledAt,
      status: 'scheduled',
      caption: caption || null,
    })
    .eq('id', postId)
    .eq('user_id', session.user.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // 2. Calculate delay for QStash (milliseconds until the scheduled time)
  const scheduledDate = new Date(scheduledAt);
  const now = new Date();
  const delayMs = Math.max(0, scheduledDate.getTime() - now.getTime());

  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;
  const publishUrl = `${appUrl}/api/posts/publish`;

  // 3. Enqueue the job with QStash
  const qstashResponse = await fetch(`${process.env.QSTASH_URL}${publishUrl}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.QSTASH_TOKEN}`,
      'Content-Type': 'application/json',
      ...(delayMs > 0 ? { 'Upstash-Delay': `${Math.floor(delayMs / 1000)}s` } : {}),
    },
    body: JSON.stringify({ postId, templateId }),
  });

  if (!qstashResponse.ok) {
    const qstashError = await qstashResponse.text();
    console.error('QStash error:', qstashError);
    // Revert status to draft if scheduling fails
    await supabaseAdmin.from('posts').update({ status: 'draft' }).eq('id', postId);
    return NextResponse.json({ error: 'Failed to schedule post with QStash' }, { status: 500 });
  }

  const qstashData = await qstashResponse.json();

  return NextResponse.json({
    success: true,
    scheduledAt,
    qstashMessageId: qstashData.messageId,
  });
}
