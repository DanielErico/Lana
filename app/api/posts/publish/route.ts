import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Called by QStash at the scheduled time to publish a post to Instagram.
 * Also callable manually for testing.
 */
export async function POST(req: NextRequest) {
  try {
    const { postId, templateId = 'rimberio', caption } = await req.json();
    if (!postId) return NextResponse.json({ error: 'postId required' }, { status: 400 });

    // 1. Load post
    const { data: post, error: postErr } = await supabaseAdmin
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (postErr) console.error("Post fetch error:", postErr);
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

    // 1b. Load brand
    const { data: brand, error: brandErr } = await supabaseAdmin
      .from('brands')
      .select('instagram_user_id, instagram_access_token, instagram_token_expires_at')
      .eq('user_id', post.user_id)
      .single();

    if (brandErr) console.error("Brand fetch error:", brandErr);

    const igToken = brand?.instagram_access_token;
    const igUserId = brand?.instagram_user_id;

    if (!igToken || !igUserId) {
      await supabaseAdmin.from('posts').update({ status: 'failed' }).eq('id', postId);
      return NextResponse.json({ error: 'No Instagram account connected for this user.' }, { status: 400 });
    }

    // 2. Get slide image URLs from our render endpoint
    const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'https://lana-five.vercel.app';
    const renderRes = await fetch(`${appUrl}/api/posts/render`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, templateId })
    });
    
    // Check if render endpoint failed before parsing JSON
    if (!renderRes.ok) {
      const text = await renderRes.text();
      return NextResponse.json({ error: `Render endpoint failed with status ${renderRes.status}`, detail: text }, { status: 500 });
    }
    
    const { imageUrls } = await renderRes.json();

    if (!imageUrls?.length) {
      await supabaseAdmin.from('posts').update({ status: 'failed' }).eq('id', postId);
      return NextResponse.json({ error: 'Failed to render slide images (empty array returned)' }, { status: 500 });
    }

    // 3. Upload each slide to Instagram as a media container
    const containerIds: string[] = [];
    for (const imageUrl of imageUrls) {
      const uploadRes = await fetch(
        `https://graph.facebook.com/v19.0/${igUserId}/media`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image_url: imageUrl,
            is_carousel_item: true,
            access_token: igToken
          })
        }
      );
      const uploadData = await uploadRes.json();
      if (uploadData.id) {
        containerIds.push(uploadData.id);
      } else {
        console.error('Upload failed for slide:', imageUrl, uploadData);
      }
    }

    if (!containerIds.length) {
      await supabaseAdmin.from('posts').update({ status: 'failed' }).eq('id', postId);
      return NextResponse.json({ error: 'All slide uploads failed to Instagram' }, { status: 500 });
    }

    // 4. Create the carousel container
    const finalCaption: string = caption || post.caption || '';
    const carouselRes = await fetch(
      `https://graph.facebook.com/v19.0/${igUserId}/media`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          media_type: 'CAROUSEL',
          children: containerIds,
          caption: finalCaption,
          access_token: igToken
        })
      }
    );
    const carouselData = await carouselRes.json();

    if (!carouselData.id) {
      await supabaseAdmin.from('posts').update({ status: 'failed' }).eq('id', postId);
      return NextResponse.json({ error: 'Failed to create Meta carousel container', detail: carouselData }, { status: 500 });
    }

    // 5. Publish the carousel
    const publishRes = await fetch(
      `https://graph.facebook.com/v19.0/${igUserId}/media_publish`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creation_id: carouselData.id,
          access_token: igToken
        })
      }
    );
    const publishData = await publishRes.json();

    if (publishData.id) {
      await supabaseAdmin.from('posts').update({
        status: 'published',
        instagram_post_id: publishData.id
      }).eq('id', postId);
      return NextResponse.json({ success: true, instagramPostId: publishData.id });
    } else {
      await supabaseAdmin.from('posts').update({ status: 'failed' }).eq('id', postId);
      return NextResponse.json({ error: 'Meta publish mutation failed', detail: publishData }, { status: 500 });
    }
  } catch (err: any) {
    console.error("FATAL publish error:", err);
    return NextResponse.json({ error: 'Internal Server Error during publishing', detail: err.message }, { status: 500 });
  }
}
