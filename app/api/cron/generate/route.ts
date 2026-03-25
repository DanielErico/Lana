import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createAdminClient } from '@/utils/supabase/admin';

// Vercel Cron automatically calls this with this header to secure the endpoint
const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: NextRequest) {
  // Security: verify request is coming from Vercel Cron scheduler
  const authHeader = request.headers.get('authorization');
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createAdminClient();
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  try {
    // Step 1: Pull all user profiles + their brand settings
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*');

    if (profilesError) throw profilesError;

    const results = [];

    for (const profile of profiles || []) {
      // Step 2: Load the user's brand settings
      const { data: brand } = await supabase
        .from('brands')
        .select('*')
        .eq('user_id', profile.id)
        .single();

      const brandContext = brand
        ? `Primary color: ${brand.colors?.primary || '#000'}, Brand name: ${brand.logo?.text || 'Unknown'}`
        : 'No brand defined yet';

      // Step 3: Build a rich context prompt for Gemini
      const prompt = `
You are an expert social media content strategist for Instagram carousels.

Generate a 5-slide carousel post plan for this user:
- Name: ${profile.name || 'User'}
- Company: ${profile.company || 'Brand'}
- Role: ${profile.role || 'Business Owner'}
- Brand: ${brandContext}

Return ONLY a valid JSON object with the following structure:
{
  "title": "string — headline topic of this carousel",
  "scheduled_for": "ISO 8601 date string for 7 days from now",
  "slides": [
    {
      "id": "1",
      "slideNum": 1,
      "layout": "intro_card",
      "theme": "primary",
      "headline": "string",
      "body": "string",
      "cta": "string",
      "hasImage": false
    }
  ]
}

Rules:
- Generate exactly 5 slides
- Layout for slide 1: "intro_card", slide 2: "text_left", slide 3: "list_center", slide 4: "text_center", slide 5: "cta_save"
- Theme options: "primary", "light", "dark"
- Keep headlines under 60 characters
- Keep body text conversational and engaging
- CTA should be a call to action appropriate for the slide
- Do NOT include any markdown, only raw JSON
      `.trim();

      // Step 4: Get AI response
      const result = await model.generateContent(prompt);
      const rawText = result.response.text().trim();

      // Step 5: Parse and validate
      let parsed;
      try {
        // Strip markdown code blocks if Gemini includes them
        const jsonText = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        parsed = JSON.parse(jsonText);
      } catch {
        console.error(`Failed to parse Gemini response for user ${profile.id}:`, rawText);
        continue;
      }

      // Step 6: Insert into Supabase posts table
      const { error: insertError } = await supabase.from('posts').insert({
        user_id: profile.id,
        title: parsed.title,
        content: prompt,
        slides: parsed.slides,
        status: 'draft',
        scheduled_for: parsed.scheduled_for,
      });

      if (insertError) {
        console.error(`Failed to insert post for user ${profile.id}:`, insertError);
      } else {
        results.push({ userId: profile.id, title: parsed.title });
      }
    }

    return NextResponse.json({
      success: true,
      generated: results.length,
      posts: results,
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json({ error: 'Failed to run generation' }, { status: 500 });
  }
}
