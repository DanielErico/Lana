import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createAdminClient } from '@/utils/supabase/admin';
import { createClientBrowser } from '@/utils/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const { dateMode, selectedDates, focusTypes, frequency } = await request.json();

    const supabaseAdmin = createAdminClient();
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Get current user session from cookie header
    const supabaseClient = createClientBrowser();
    const { data: { session } } = await supabaseClient.auth.getSession();
    const userId = session?.user?.id || '00000000-0000-0000-0000-000000000000';

    // Load user profile + brand
    const [{ data: profile }, { data: brand }] = await Promise.all([
      supabaseAdmin.from('profiles').select('*').eq('id', userId).single(),
      supabaseAdmin.from('brands').select('*').eq('user_id', userId).single()
    ]);

    const brandContext = brand
      ? `Brand name: ${brand.logo?.text || 'My Brand'}, Primary color: ${brand.colors?.primary}`
      : 'No brand defined yet';

    const now = new Date();
    const numPosts = frequency === 'Daily' ? 7 : frequency === '5x/week' ? 5 : 3;
    const focus = focusTypes?.length > 0 ? focusTypes.join(', ') : 'Educational, Motivational';

    const dateModeInstruction = dateMode === 'manual' && selectedDates?.length
      ? `Schedule each post on these exact dates in order: ${selectedDates.map((d: string) => new Date(d).toDateString()).join(', ')}`
      : `Select the best dates for maximum engagement (avoid weekends, prefer Tue-Thu, best times: 9AM, 12PM, 6PM) — generate ${numPosts} posts over the next 30 days`;

    const prompt = `
You are an expert social media content strategist for Instagram carousels.

Generate ${numPosts} carousel post plans for this user:
- Name: ${profile?.name || 'User'}
- Company: ${profile?.company || 'Brand'}
- Role: ${profile?.role || 'Business Owner'}
- Brand: ${brandContext}
- Content focus: ${focus}
- Today's date: ${now.toISOString()}

${dateModeInstruction}

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

    const { error } = await supabaseAdmin.from('posts').insert(inserts);
    if (error) throw error;

    return NextResponse.json({ success: true, count: posts.length });
  } catch (err: any) {
    console.error('Generate error:', err);
    return NextResponse.json({ error: err.message || 'Failed to generate' }, { status: 500 });
  }
}
