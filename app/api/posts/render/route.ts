import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { postId, templateId = 'rimberio' } = await req.json();
  if (!postId) return NextResponse.json({ error: 'postId required' }, { status: 400 });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;
  const screenshotKey = process.env.SCREENSHOTONE_ACCESS_KEY!;

  // Fetch the post to know how many slides we have
  const { data: post } = await supabaseAdmin
    .from('posts')
    .select('slides')
    .eq('id', postId)
    .single();

  if (!post?.slides?.length) {
    return NextResponse.json({ error: 'No slides found for this post' }, { status: 404 });
  }

  const slideCount: number = post.slides.length;
  const imageUrls: string[] = [];

  // Capture each slide via ScreenshotOne
  for (let i = 0; i < slideCount; i++) {
    const slideUrl = encodeURIComponent(`${appUrl}/template-preview?postId=${postId}&slideIndex=${i}&templateId=${templateId}`);
    const screenshotUrl = `https://api.screenshotone.com/take?access_key=${screenshotKey}&url=${slideUrl}&viewport_width=1080&viewport_height=1080&format=jpg&image_quality=90&block_ads=true&block_cookie_banners=true&delay=2`;

    imageUrls.push(screenshotUrl);
  }

  return NextResponse.json({ imageUrls });
}
