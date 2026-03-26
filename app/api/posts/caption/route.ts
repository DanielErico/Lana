import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createAdminClient } from '@/utils/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const { slides, userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'You must be logged in to generate captions.' }, { status: 401 });
    }

    if (!slides || slides.length === 0) {
      return NextResponse.json({ error: 'No slides provided to generate caption.' }, { status: 400 });
    }

    const supabaseAdmin = createAdminClient();
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Load user profile + brand
    const [{ data: profile }, { data: brand }] = await Promise.all([
      supabaseAdmin.from('profiles').select('*').eq('id', userId).maybeSingle(),
      supabaseAdmin.from('brands').select('*').eq('user_id', userId).maybeSingle()
    ]);

    // Extract text from slides to give context
    const slideText = slides.map((s: any) => `Slide ${s.slideNum}: Headline: ${s.headline || ''} | Body: ${s.body || ''} | CTA: ${s.cta || ''}`).join('\n');

    const prompt = `
You are an expert social media manager and copywriter.
Generate an engaging Instagram caption for the following carousel post slides.

--- BRAND CONTEXT ---
- BRAND NAME: ${brand?.logo?.text || profile?.company || 'Brand'}
- USER ROLE: ${profile?.role || 'Professional'}
- TARGET AUDIENCE: ${brand?.info?.audience || 'General public'}
- BRAND TONE: ${brand?.info?.tone || 'Professional and engaging'}
- SERVICES: ${brand?.info?.services || 'Not specified'}
- MISSION: ${brand?.info?.mission || 'Not specified'}

--- SLIDE CONTENT ---
${slideText}

CRITICAL INSTRUCTIONS:
1. Write a highly engaging caption that hooks the reader, expands slightly on the carousel's main theme, and ends with a strong Call to Action (CTA) matching the brand context.
2. Use the specified brand tone.
3. Include relevant, high-performing hashtags (5-8 hashtags).
4. Use formatting (like line breaks and emojis) to make it easy to read.
5. Return ONLY the caption text. No markdown blocks, no extra narrative, no introduction. Just the raw caption string ready to be copy-pasted.
    `.trim();

    const result = await model.generateContent(prompt);
    const caption = result.response.text().trim();

    return NextResponse.json({ caption });

  } catch (err: any) {
    console.error('Caption generation error:', err);
    return NextResponse.json({ error: err.message || 'Failed to generate caption' }, { status: 500 });
  }
}
