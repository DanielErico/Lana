import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function POST(req: NextRequest) {
  try {
    const { postId, scheduledAt, templateId = 'rimberio', caption, userId } = await req.json();

    if (!userId) return NextResponse.json({ error: 'Unauthorized: userId required' }, { status: 401 });
    if (!postId || !scheduledAt) {
      return NextResponse.json({ error: 'postId and scheduledAt are required' }, { status: 400 });
    }

    const supabaseAdmin = createAdminClient();

    if (!process.env.QSTASH_URL || !process.env.QSTASH_TOKEN) {
      return NextResponse.json({ error: 'Scheduling not available: Missing QStash API keys on the server.' }, { status: 400 });
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
      .eq('user_id', userId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // 2. Calculate delay for QStash (milliseconds until the scheduled time)
    const scheduledDate = new Date(scheduledAt);
    const now = new Date();
    const delayMs = Math.max(0, scheduledDate.getTime() - now.getTime());

    const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'https://lana-five.vercel.app';
    const publishUrl = `${appUrl}/api/posts/publish`;

    const qstashBase = process.env.QSTASH_URL.replace(/\/$/, '');
    // Ensure the /v2/publish/ path is present (Upstash dashboard gives the base URL without it)
    const qstashUrl = qstashBase.includes('/v2/publish') ? qstashBase : `${qstashBase}/v2/publish`;
    
    // 3. Enqueue the job with QStash
    const qstashResponse = await fetch(`${qstashUrl}/${publishUrl}`, {
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
      return NextResponse.json({ error: `QStash returned ${qstashResponse.status}: ${qstashError}` }, { status: 500 });
    }

    const qstashData = await qstashResponse.json();

    return NextResponse.json({
      success: true,
      scheduledAt,
      qstashMessageId: qstashData.messageId,
    });
  } catch (err: any) {
    console.error("Schedule fatal error:", err);
    return NextResponse.json({ error: 'Internal Server Error during scheduling', detail: err.message }, { status: 500 });
  }
}
