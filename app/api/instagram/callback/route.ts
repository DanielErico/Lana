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
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'https://lana-five.vercel.app';
  const redirectUri = `${appUrl}/api/instagram/callback`;

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
  const pages = pagesData.data || [];

  let instagramUserId: string | null = null;
  let linkedPageName: string | null = null;

  // Iterate through ALL pages to find one with an Instagram Business Account
  for (const page of pages) {
    const igRes = await fetch(
      `https://graph.facebook.com/v19.0/${page.id}?fields=instagram_business_account&access_token=${page.access_token || longLivedToken}`
    );
    const igData = await igRes.json();
    if (igData.instagram_business_account?.id) {
      instagramUserId = igData.instagram_business_account.id;
      linkedPageName = page.name || null;
      break;
    }
  }

  // Step 4: Save token + IG user ID to Supabase brands table
  const expiresAt = new Date(Date.now() + (longLivedData.expires_in || 5184000) * 1000).toISOString();
  
  const supabaseAdmin = createAdminClient();
  
  // Step 4a: First securely store the tokens
  await supabaseAdmin
    .from('brands')
    .update({
      instagram_access_token: longLivedToken,
      instagram_token_expires_at: expiresAt
    })
    .eq('user_id', userId);

  // Step 4b: Only update IG user ID if we found one
  if (instagramUserId) {
    await supabaseAdmin
      .from('brands')
      .update({
        instagram_user_id: instagramUserId
      })
      .eq('user_id', userId);
  }

  // Provide debug info in the redirect so user can see what happened
  if (instagramUserId) {
    return NextResponse.redirect(new URL(`/settings?instagram=connected&ig_id=${instagramUserId}`, req.url));
  } else {
    // Debug: Check which FB user authenticated
    const meRes = await fetch(`https://graph.facebook.com/v19.0/me?fields=id,name&access_token=${longLivedToken}`);
    const meData = await meRes.json();
    
    // Debug: Try with the SHORT-lived token too
    const pagesShortRes = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${tokenData.access_token}`);
    const pagesShortData = await pagesShortRes.json();
    const shortPages = pagesShortData.data || [];

    // Check permissions
    const permRes = await fetch(`https://graph.facebook.com/v19.0/me/permissions?access_token=${longLivedToken}`);
    const permData = await permRes.json();
    const perms = (permData.data || []).map((p: any) => `${p.permission}:${p.status}`).join(',');
    
    const debugInfo = [
      `pages_long=${pages.length}`,
      `pages_short=${shortPages.length}`,
      `fb_user=${encodeURIComponent(meData.name || 'unknown')}`,
      `fb_id=${meData.id || 'unknown'}`,
      `perms=${encodeURIComponent(perms)}`,
    ].join('&');
    
    console.error(`[Instagram Callback] Partial Success: Token saved, but no IG ID found. Debug Info:`, {
      pagesCount: pages.length,
      facebookUser: meData.name,
      facebookId: meData.id,
      permissions: perms,
    });
    
    return NextResponse.redirect(new URL(`/settings?instagram=partial&${debugInfo}`, req.url));
  }
}
