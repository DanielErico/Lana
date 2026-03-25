"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useBrand } from "@/components/providers/BrandProvider";
import { createClientBrowser } from "@/utils/supabase/client";

const steps = ["Brand Info","Colors & Fonts","Voice & Tone","AI Training","Review"];

const fonts = [
  { name: "Inter", preview: "Modern & Clean", style: "font-sans" },
  { name: "Playfair Display", preview: "Elegant & Classic", style: "font-serif" },
  { name: "Space Grotesk", preview: "Tech & Bold", style: "font-sans" },
  { name: "DM Sans", preview: "Friendly & Clear", style: "font-sans" },
];

const tones = [
  { left: "Professional", right: "Casual" },
  { left: "Serious", right: "Playful" },
  { left: "Formal", right: "Conversational" },
  { left: "Conservative", right: "Bold" },
];

export default function BrandPage() {
  const router = useRouter();
  const { setBrand: setGlobalBrand } = useBrand();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState({ name: "", industry: "", tagline: "", website: "", logoUrl: "", primaryColor: "#1E40AF", secondaryColor: "#7C3AED", accentColor: "#F59E0B", font: "Inter", audience: "", services: "", mission: "" });
  const [toneValues, setToneValues] = useState([50, 40, 45, 60]);
  const [sampleText, setSampleText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const analyzeVoice = async () => {
    setAnalyzing(true);
    await new Promise(r => setTimeout(r, 2000));
    setAnalyzing(false);
    setAnalyzed(true);
  };

  return (
    <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12 animate-fade-in relative z-10">
      <div className="mb-8">
        <h1 className="font-heading font-black text-2xl text-slate-900">Brand Setup Wizard</h1>
        <p className="text-slate-500 text-sm mt-0.5">Set up your brand identity in 5 steps</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-0 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <button onClick={() => setStep(i)} className="flex flex-col items-center gap-1 cursor-pointer group">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < step ? "bg-emerald-500 text-white" :
                i === step ? "bg-blue-700 text-white ring-4 ring-blue-100" :
                "bg-slate-200 text-slate-500 group-hover:bg-slate-300"
              }`}>
                {i < step ? (
                  <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : i + 1}
              </div>
              <span className={`text-xs hidden sm:block text-center leading-tight ${i === step ? "text-blue-700 font-semibold" : "text-slate-400"}`}>{s}</span>
            </button>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 rounded-full ${i < step ? "bg-emerald-400" : "bg-slate-200"}`}/>
            )}
          </div>
        ))}
      </div>

      <Card padding="lg">
        {/* Step 0: Brand Info */}
        {step === 0 && (
          <div className="space-y-5">
            <h2 className="font-heading font-bold text-xl text-slate-900">Tell us about your brand</h2>
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1.5">Brand Name *</label>
              <input value={brand.name} onChange={e => setBrand(b => ({...b, name: e.target.value}))} placeholder="e.g. TechFlow" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-slate-300 transition-colors"/>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1.5">Industry *</label>
              <select onChange={e => setBrand(b => ({...b, industry: e.target.value}))} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer bg-white">
                <option value="">Select industry…</option>
                {["SaaS / Tech","E-commerce","Health & Wellness","Finance","Education","Agency","Beauty & Fashion","Food & Restaurants","Real Estate","Other"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1.5">Tagline / Slogan</label>
              <input value={brand.tagline} onChange={e => setBrand(b => ({...b, tagline: e.target.value}))} placeholder="e.g. Automate your growth" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-slate-300 transition-colors"/>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1.5">
                Website URL <span className="text-slate-400 font-normal">(optional — AI will learn from it)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm select-none">🌐</span>
                <input
                  value={brand.website}
                  onChange={e => setBrand(b => ({...b, website: e.target.value}))}
                  placeholder="https://yourwebsite.com"
                  type="url"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-slate-300 transition-colors"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1.5">If provided, Gemini will read your site to build richer, more specific brand content.</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1.5">Logo</label>
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setBrand(b => ({ ...b, logoUrl: url }));
                }
              }} />
              <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all group shrink-0">
                {brand.logoUrl ? (
                  <img src={brand.logoUrl} alt="Brand Logo" className="mx-auto max-h-24 object-contain rounded-lg" />
                ) : (
                  <>
                    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="mx-auto mb-2 text-slate-400 group-hover:text-blue-500 transition-colors">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <p className="text-sm text-slate-500 group-hover:text-blue-600 transition-colors">Drop your logo here or <span className="text-blue-600 font-semibold">browse</span></p>
                    <p className="text-xs text-slate-400 mt-1">PNG, SVG, JPG up to 5MB</p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Colors & Fonts */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="font-heading font-bold text-xl text-slate-900">Colors & Typography</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Primary", key: "primaryColor", val: brand.primaryColor },
                { label: "Secondary", key: "secondaryColor", val: brand.secondaryColor },
                { label: "Accent", key: "accentColor", val: brand.accentColor },
              ].map(c => (
                <div key={c.label}>
                  <label className="text-xs font-semibold text-slate-600 block mb-2">{c.label}</label>
                  <div className="relative">
                    <div className="w-full h-20 rounded-2xl border-2 border-slate-200 cursor-pointer overflow-hidden" style={{ background: c.val }}>
                      <input type="color" value={c.val} onChange={e => setBrand(b => ({...b, [c.key]: e.target.value}))} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"/>
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5 font-mono text-center">{c.val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-3">Font Pairing</label>
              <div className="grid grid-cols-2 gap-3">
                {fonts.map(f => (
                  <button
                    key={f.name}
                    onClick={() => setBrand(b => ({...b, font: f.name}))}
                    className={`p-4 rounded-2xl border-2 text-left cursor-pointer transition-all ${brand.font === f.name ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}
                  >
                    <p className={`font-bold text-base text-slate-900 ${brand.font === f.name ? "text-blue-800" : ""}`}>{f.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{f.preview}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Voice & Tone */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="font-heading font-bold text-xl text-slate-900">Voice & Tone</h2>
            <p className="text-slate-500 text-sm">Adjust the sliders to define your brand personality</p>
            {tones.map((t, i) => (
              <div key={t.left}>
                <div className="flex justify-between text-xs font-semibold text-slate-600 mb-2">
                  <span className="text-blue-700">{t.left}</span><span className="text-purple-700">{t.right}</span>
                </div>
                <input type="range" min="0" max="100" value={toneValues[i]}
                  onChange={e => { const v = [...toneValues]; v[i] = +e.target.value; setToneValues(v); }}
                  className="w-full accent-blue-700 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-300 mt-0.5">
                  <span>0</span><span>50</span><span>100</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 3: AI Training */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="font-heading font-bold text-xl text-slate-900">AI Brand Voice Trainer</h2>
            <p className="text-slate-500 text-sm">Paste a sample of your existing content. Lana AI will learn your unique voice and writing style.</p>
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1.5">Sample Content</label>
              <textarea
                value={sampleText}
                onChange={e => setSampleText(e.target.value)}
                placeholder="Paste 2–3 of your best Instagram captions or blog posts here…"
                className="w-full px-3.5 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none h-40 hover:border-slate-300 transition-colors"
              />
              <p className="text-xs text-slate-400 mt-1.5">{sampleText.length} / 2000 characters</p>
            </div>
            <Button
              variant="gradient"
              size="md"
              className="w-full"
              loading={analyzing}
              disabled={sampleText.length < 50}
              onClick={analyzeVoice}
            >
              {analyzing ? "Analyzing your voice…" : "Analyze Brand Voice"}
            </Button>
            {analyzed && (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 animate-fade-in">
                <div className="flex items-center gap-2 mb-3">
                  <svg width="16" height="16" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <p className="text-sm font-bold text-emerald-800">Brand voice analyzed!</p>
                </div>
                <div className="space-y-1.5">
                  {[
                    { label: "Tone detected", value: "Professional yet approachable" },
                    { label: "Style", value: "Data-driven storytelling" },
                    { label: "Avg sentence length", value: "14 words" },
                    { label: "Emoji usage", value: "Low (1–2 per post)" },
                  ].map(r => (
                    <div key={r.label} className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">{r.label}</span>
                      <span className="font-semibold text-emerald-800">{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-5">
            <h2 className="font-heading font-bold text-xl text-slate-900">Review Brand Kit</h2>
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-700 to-purple-700 flex items-center justify-center text-white font-black text-lg">
                  {brand.name ? brand.name[0].toUpperCase() : "L"}
                </div>
                <div>
                  <p className="font-heading font-black text-lg text-slate-900">{brand.name || "Your Brand"}</p>
                  <p className="text-sm text-slate-500">{brand.tagline || "Your tagline here"}</p>
                </div>
              </div>
              <div className="flex gap-3">
                {[brand.primaryColor, brand.secondaryColor, brand.accentColor].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full shadow-sm" style={{ background: c }}/>
                ))}
                <span className="text-xs text-slate-400 flex items-center ml-1">Brand colors</span>
              </div>
              <div className="text-sm text-slate-600">Font: <span className="font-semibold text-slate-900">{brand.font}</span> · Industry: <span className="font-semibold text-slate-900">{brand.industry || "Not set"}</span></div>
            </div>
            <Button variant="gradient" size="lg" className="w-full" loading={saving} onClick={async () => {
              setSaving(true);
              setSaveError(null);
              try {
                const supabase = createClientBrowser();
                const { data: { session } } = await supabase.auth.getSession();
                const userId = session?.user?.id;
                if (!userId) {
                  setSaveError('You must be logged in. Please refresh and log in again.');
                  setSaving(false);
                  return;
                }

                // Build a readable tone string from slider values
                const toneLabels = ['Professional','Serious','Formal','Conservative'];
                const toneString = toneValues.map((v, i) => v < 50 ? toneLabels[i] : ['Casual','Playful','Conversational','Bold'][i]).join(', ');

                const res = await fetch('/api/brand', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    userId,
                    brandName: brand.name,
                    website: brand.website || null,
                    company: brand.name,
                    info: {
                      audience: brand.audience || brand.industry || '',
                      tone: toneString,
                      services: brand.services || sampleText || '',
                      mission: brand.mission || brand.tagline || '',
                    },
                  }),
                });

                const json = await res.json();
                if (!res.ok || json.error) throw new Error(json.error || 'Save failed');

                // Update in-memory context too
                setGlobalBrand({
                  colors: { primary: brand.primaryColor, light: "#FFFFFF", dark: brand.secondaryColor },
                  logo: { text: brand.name, iconUrl: brand.logoUrl || undefined },
                  website: brand.website || undefined,
                });
                router.push("/dashboard");
              } catch (err: any) {
                setSaveError(err.message);
                setSaving(false);
              }
            }}>
              Save Brand Kit & Go to Dashboard
            </Button>
            {saveError && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold">
                ⚠️ {saveError}
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button variant="secondary" size="md" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
          ← Back
        </Button>
        {step < steps.length - 1 && (
          <Button variant="gradient" size="md" onClick={() => setStep(step + 1)}>
            Continue →
          </Button>
        )}
      </div>
    </div>
  );
}
