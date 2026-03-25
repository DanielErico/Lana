import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createAdminClient } from '@/utils/supabase/admin';
import { createClientBrowser } from '@/utils/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const { dateMode, selectedDates, focusTypes, frequency, userId: clientUserId } = await request.json();

    const supabaseAdmin = createAdminClient();
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // userId comes from the client (authenticated session on browser)
    let userId = clientUserId;
    if (!userId) {
      // Fallback for testing: find any valid user in the DB to satisfy the foreign key constraint
      const { data: firstUser } = await supabaseAdmin.from('profiles').select('id').limit(1).maybeSingle();
      if (firstUser?.id) {
        userId = firstUser.id;
      } else {
        return NextResponse.json({ error: 'Not authenticated and no fallback user found in DB.' }, { status: 401 });
      }
    }

    // Load user profile + brand
    const [{ data: profileRaw }, { data: brandRaw }] = await Promise.all([
      supabaseAdmin.from('profiles').select('*').eq('id', userId).maybeSingle(),
      supabaseAdmin.from('brands').select('*').eq('user_id', userId).maybeSingle()
    ]);
    const profile = profileRaw as any;
    const brand = brandRaw as any;

    // --- Website scraping: fetch and extract text if a website URL is saved ---
    let websiteContent = '';
    const websiteUrl = brand?.website;
    let scrapeError = null;
    let finalUrl = websiteUrl;

    if (websiteUrl) {
      try {
        if (!finalUrl.startsWith('http')) {
          finalUrl = 'https://' + finalUrl;
        }
        
        const res = await fetch(finalUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LanaBrandBot/1.0)' },
          signal: AbortSignal.timeout(6000),
        });
        const html = await res.text();
        // Strip tags, condense whitespace, and take first 3000 chars
        const text = html
          .replace(/<script[\s\S]*?<\/script>/gi, '')
          .replace(/<style[\s\S]*?<\/style>/gi, '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 3000);
        if (text.length > 100) websiteContent = text;
      } catch (err: any) {
        // Website unavailable — silently continue without it but log reason internally
        scrapeError = err.message;
        console.error('Scrape error:', finalUrl, err.message);
      }
    }
    // -------------------------------------------------------------------------

    const now = new Date();
    const numPosts = frequency === 'Daily' ? 7 : frequency === '5x/week' ? 5 : 3;
    const focus = focusTypes?.length > 0 ? focusTypes.join(', ') : 'Educational, Motivational';

    const dateModeInstruction = dateMode === 'manual' && selectedDates?.length
      ? `Schedule each post on these exact dates in order: ${selectedDates.map((d: string) => new Date(d).toDateString()).join(', ')}`
      : `Select the best dates for maximum engagement (avoid weekends, prefer Tue-Thu, best times: 9AM, 12PM, 6PM) — generate ${numPosts} posts over the next 30 days`;

    const prompt = `
You are an expert social media content strategist and copywriter for Instagram carousels.

Generate ${numPosts} carousel post plans for this exact user profile and brand:
- BRAND NAME: ${brand?.logo?.text || profile?.company || 'Brand'}
- USER NAME/ROLE: ${profile?.name || 'User'}, ${profile?.role || 'Business Owner'}
- TARGET AUDIENCE: ${brand?.info?.audience || 'General public'}
- BRAND TONE/VOICE: ${brand?.info?.tone || 'Professional and engaging'}
- CORE SERVICES/PRODUCTS: ${brand?.info?.services || 'Not specified - infer from context'}
- COMPANY MISSION: ${brand?.info?.mission || 'Create value for customers'}
- CONTENT FOCUS: ${focus}
- TODAY'S DATE: ${now.toISOString()}${
  websiteContent
    ? `

--- BRAND WEBSITE CONTENT (extracted live from ${websiteUrl}) ---
${websiteContent}
--- USE THE ABOVE to understand the brand's real products, services, voice, and audience. ---`
    : ''
}

${dateModeInstruction}

CRITICAL INSTRUCTIONS FOR SLIDE CONTENT:
1. YOU ARE WRITING FOR THIS EXACT BRAND: "${brand?.logo?.text || profile?.company || 'Brand'}". You MUST explicitly mention this Brand Name in the slides, especially the intro and CTA.
2. The content must sound like it is written by a ${profile?.role || 'professional'} speaking directly to their target audience.
3. WEAVE specific services, features, products, or values into stories and CTAs. Do NOT use generic placeholder text. DO NOT generate random or generic business content.
4. If website content was provided above, derive your specific topics, pain points, and solutions EXCLUSIVELY from it.
5. Each post must have exactly 5 slides following the progression: intro, point 1, point 2, summary, CTA.

Return ONLY a valid JSON array of post objects. No markdown, no explanation, no code blocks:
[
  {
    "title": "string — engaging headline topic",
    "scheduled_for": "ISO 8601 datetime string",
    "slides": [
      { "id": "1", "slideNum": 1, "layout": "intro_card", "theme": "primary", "headline": "string", "body": "string", "cta": "string", "hasImage": false },
      { "id": "2", "slideNum": 2, "layout": "text_left", "theme": "light", "headline": "string", "body": "string", "cta": "string", "hasImage": false },
      { "id": "3", "slideNum": 3, "layout": "list_center", "theme": "primary", "headline": "string", "body": "string", "cta": "string", "hasImage": false },
      { "id": "4", "slideNum": 4, "layout": "text_center", "theme": "dark", "headline": "string", "body": "string", "cta": "string", "hasImage": false },
      { "id": "5", "slideNum": 5, "layout": "cta_save", "theme": "light", "headline": "string", "body": "string", "cta": "string", "hasImage": false }
    ]
  }
]

Rules: headlines under 60 chars, body max 120 chars, keep tone confident and concise.
    `.trim();

    const result = await model.generateContent(prompt);
    const rawText = result.response.text().trim();
    const jsonText = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const posts = JSON.parse(jsonText);

    // Insert all posts
    const inserts = posts.map((p: any) => ({
      user_id: userId,
      title: p.title,
      content: '',
      slides: p.slides,
      status: 'draft',
      scheduled_for: p.scheduled_for,
    }));

    const { error } = await (supabaseAdmin.from('posts') as any).insert(inserts);
    if (error) throw error;

    return NextResponse.json({
      success: true,
      count: posts.length,
      debugContext: {
        userId,
        brandName: brand?.logo?.text,
        brandInfo: brand?.info || 'Not set',
        role: profile?.role,
        websiteURLTried: finalUrl,
        websiteScrapedLength: websiteContent.length,
        scrapeError,
        isFallbackUser: userId !== clientUserId
      }
    });
  } catch (err: any) {
    console.error('Generate error:', err);
    return NextResponse.json({ error: err.message || 'Failed to generate' }, { status: 500 });
  }
}
