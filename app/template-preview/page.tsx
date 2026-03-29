"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SlidePreview from '@/components/templates/rimberio/SlidePreview';
import MinimalistPreview from '@/components/templates/minimalist/MinimalistPreview';
import SerenePreview from '@/components/templates/serene/SerenePreview';
import { RimberioSlideData, RimberioBrand } from '@/components/templates/rimberio/schema';

const defaultBrand: RimberioBrand = {
  colors: { primary: "#FE4B17", light: "#F4F5F6", dark: "#0A0A0A" },
  logo: { text: "Lana" }
};

import { createClientBrowser } from '@/utils/supabase/client';

function SlideRenderer() {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');
  const slideIndex = searchParams.get('slideIndex');
  const templateId = searchParams.get('templateId') || 'rimberio';

  const [slide, setSlide] = useState<RimberioSlideData | null>(null);
  const [brand, setBrand] = useState<RimberioBrand>(defaultBrand);

  useEffect(() => {
    if (!postId) return;
    fetch(`/api/posts?postId=${postId}`)
      .then(r => r.json())
      .then(async data => {
        if (data.post?.slides) {
          const idx = slideIndex !== null ? parseInt(slideIndex) : 0;
          setSlide(data.post.slides[idx] || data.post.slides[0]);
          
          // Fetch brand for colors and logo
          if (data.post.user_id) {
            const supabase = createClientBrowser();
            const { data: brandData } = await supabase.from('brands').select('*').eq('user_id', data.post.user_id).single();
            if (brandData) {
              setBrand({ 
                colors: brandData.colors || defaultBrand.colors,
                logo: brandData.logo || defaultBrand.logo,
                fontFamily: brandData.fontFamily
              });
            }
          }
        }
      });
  }, [postId, slideIndex]);

  if (!slide) {
    return (
      <div style={{ width: 1080, height: 1080, background: '#F4F5F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 48, color: '#999' }}>Loading…</span>
      </div>
    );
  }

  return (
    <div style={{ width: 1080, height: 1080, overflow: 'hidden' }}>
      {templateId === 'rimberio' && <SlidePreview slide={slide} brand={brand} />}
      {templateId === 'minimalist' && <MinimalistPreview slide={slide} brand={brand} />}
      {templateId === 'serene' && <SerenePreview slide={slide} brand={brand} />}
    </div>
  );
}

export default function TemplatePreviewPage() {
  return (
    <Suspense fallback={
      <div style={{ width: 1080, height: 1080, background: '#F4F5F6' }} />
    }>
      <SlideRenderer />
    </Suspense>
  );
}
