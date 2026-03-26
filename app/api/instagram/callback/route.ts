import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const error = req.nextUrl.searchParams.get('error');
  const state = req.nextUrl.searchParams.get('state'); // Contains userId

  if (error || !code || !state) {
    return NextResponse.redirect(new URL(`/settings?instagram=error&reason=${encodeURIComponent(error || 'missing_params')}`, req.url));
  }

  const userId = state;
  const appId = process.env.INSTAGRAM_APP_ID!;
  const appSecret = process.env.INSTAGRAM_APP_SECRET!;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/instagram/callback`;

  // Step 1: Exchange code for short-lived token
  const tokenRes = await fetch(
    `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&client_secret=${appSecret}&code=${code}`
  );
  const tokenData = await tokenRes.json();

  if (!tokenData.access_token) {
    const errorMsg = tokenData.error?.message || tokenData.error?.type || 'token_exchange_failed';
    return NextResponse.redirect(new URL(`/settings?instagram=error&reason=${encodeURIComponent(errorMsg)}`, req.url));
  }

  // Step 2: Exchange for long-lived token (60 days)
  const longLivedRes = await fetch(
    `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${tokenData.access_token}`
  );
  const longLivedData = await longLivedRes.json();
  const longLivedToken = longLivedData.access_token || tokenData.access_token;

  // Step 3: Get the Instagram Business Account ID linked to the user's pages
  const pagesRes = await fetch(
    `https://graph.facebook.com/v19.0/me/accounts?access_token=${longLivedToken}`
  );
  const pagesData = await pagesRes.json();
  const page = pagesData.data?.[0];

  let instagramUserId: string | null = null;
  if (page) {
    const igRes = await fetch(
      `https://graph.facebook.com/v19.0/${page.id}?fields=instagram_business_account&access_token=${page.access_token}`
    );
    const igData = await igRes.json();
    instagramUserId = igData.instagram_business_account?.id || null;
  }

  // Step 4: Save token + IG user ID to Supabase brands table
  const expiresAt = new Date(Date.now() + (longLivedData.expires_in || 5184000) * 1000).toISOString();
  
  const supabaseAdmin = createAdminClient();
  await supabaseAdmin
    .from('brands')
    .update({
      instagram_access_token: longLivedToken,
      instagram_user_id: instagramUserId,
      instagram_token_expires_at: expiresAt
    })
    .eq('user_id', userId);

  return NextResponse.redirect(new URL('/settings?instagram=connected', req.url));
}
