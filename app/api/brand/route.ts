import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

// GET /api/brand?userId=xxx — load brand from DB
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

  const admin = createAdminClient();
  const [{ data: profile, error: pe }, { data: brand, error: be }] = await Promise.all([
    admin.from('profiles').select('name,email,role,company').eq('id', userId).maybeSingle(),
    admin.from('brands').select('logo,colors,website,info,instagram_user_id').eq('user_id', userId).maybeSingle(),
  ]);

  if (pe || be) return NextResponse.json({ error: pe?.message || be?.message }, { status: 500 });
  return NextResponse.json({ profile, brand });
}

// POST /api/brand — save brand + profile using admin client (bypasses RLS)
export async function POST(request: NextRequest) {
  try {
    const { userId, brandName, website, role, name, email, company, info } = await request.json();
    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

    const admin = createAdminClient();

    // Load existing brand to preserve colors
    const { data: existingBrand } = await (admin.from('brands') as any)
      .select('*').eq('user_id', userId).maybeSingle();

    const [brandResult, profileResult] = await Promise.all([
      (admin.from('brands') as any).upsert({
        user_id: userId,
        logo: { text: brandName || existingBrand?.logo?.text || '', iconUrl: existingBrand?.logo?.iconUrl },
        colors: existingBrand?.colors || { primary: '#1E40AF', light: '#FFFFFF', dark: '#0A0A0A' },
        website: website || null,
        info: info || existingBrand?.info || null,
      }, { onConflict: 'user_id' }),
      (admin.from('profiles') as any).upsert({
        id: userId,
        name: name || '',
        email: email || '',
        role: role || '',
        company: company || '',
      }, { onConflict: 'id' }),
    ]);

    if (brandResult.error) throw brandResult.error;
    if (profileResult.error) throw profileResult.error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Brand save error:', err);
    return NextResponse.json({ error: err.message || 'Failed to save brand' }, { status: 500 });
  }
}
