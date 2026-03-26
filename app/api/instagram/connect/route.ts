import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized: userId is required' }, { status: 401 });
  }

  const appId = process.env.INSTAGRAM_APP_ID!;
  const redirectUri = encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL}/api/instagram/callback`);
  const scope = encodeURIComponent('instagram_basic,instagram_content_publish,pages_show_list,pages_read_engagement');
  
  // Pass userId in the state parameter so we get it back in the callback
  const state = encodeURIComponent(userId);

  const metaOAuthUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&response_type=code`;

  return NextResponse.redirect(metaOAuthUrl);
}
