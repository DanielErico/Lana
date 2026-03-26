import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function POST(req: NextRequest) {
  const { postId, scheduledAt, templateId = 'rimberio', caption, userId } = await req.json();

  if (!userId) return NextResponse.json({ error: 'Unauthorized: userId required' }, { status: 401 });
  if (!postId || !scheduledAt) {
    return NextResponse.json({ error: 'postId and scheduledAt are required' }, { status: 400 });
  }

  const supabaseAdmin = createAdminClient();

  // 1. Save the scheduled time and status to Supabase
  const { error: updateError } = await supabaseAdmin
    .from('posts')
    .update({
      scheduled_at: scheduledAt,
      status: 'scheduled',
      caption: caption || null,
    })
    .eq('id', postId)
    .eq('user_id', userId);

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
