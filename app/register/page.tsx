"use client";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { createClientBrowser } from "@/utils/supabase/client";

const roles = [
  { id: "business_owner", label: "Business Owner", icon: "🏢" },
  { id: "social_media_manager", label: "Social Media Manager", icon: "📱" },
  { id: "agency_admin", label: "Agency Admin", icon: "🏛️" },
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleOtp = (val: string, idx: number) => {
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) {
      const el = document.getElementById(`rotp-${idx + 1}`) as HTMLInputElement;
      el?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError(null);
    
    const supabase = createClientBrowser();
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (authData.user) {
      // Create their initial profile
      const roleLabel = roles.find(r => r.id === role)?.label || "Business Owner";
      await (supabase.from('profiles') as any).upsert({
        id: authData.user.id,
        name: form.name,
        email: form.email,
        role: roleLabel,
        plan: "Free Plan", // Default
      });
      
      // Also init an empty brand so it exists
      await (supabase.from('brands') as any).upsert({
        user_id: authData.user.id,
        colors: { primary: "#FE4B17", light: "#F4F5F6", dark: "#0A0A0A" },
        logo: { text: form.name }
      });
    }

    setLoading(false);
    // If auto-confirm is enabled, they are logged in. Otherwise, they need to verify email.
    if (authData.session) {
      window.location.href = "/dashboard";
    } else {
      setStep(3); // Show check email verification
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center px-4 py-12 relative z-10">
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10 text-clay-foreground hover:-translate-y-1 transition-transform">
          <Link href="/" className="inline-flex items-center gap-3 cursor-pointer">
            <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-clayButton">
              <svg width="24" height="24" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L15 6V12L9 16L3 12V6L9 2Z" fill="white" opacity="1"/>
                <circle cx="9" cy="9" r="3" fill="white"/>
              </svg>
            </div>
            <span className="font-black text-3xl tracking-tight">Lana</span>
          </Link>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2.5 mb-8">
          {[1,2,3].map((s) => (
            <div key={s} className="flex items-center gap-2.5 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0 transition-all ${
                step > s ? "bg-emerald-400 text-white shadow-sm" :
                step === s ? "bg-clay-accent text-white shadow-clayButton" :
                "bg-white/60 text-clay-muted border border-white"
              }`}>
                {step > s ? (
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : s}
              </div>
              {s < 3 && <div className={`flex-1 h-1 rounded-full ${step > s ? "bg-emerald-400" : "bg-white/60 border border-white"}`}/>}
            </div>
          ))}
        </div>

        <div className="bg-white/80 backdrop-blur-2xl rounded-[40px] border border-white shadow-clayDeep p-6 sm:p-10">
          {/* Step 1: Role */}
          {step === 1 && (
            <>
              <h1 className="font-black text-3xl tracking-tight text-clay-foreground mb-2">Create account</h1>
              <p className="text-clay-muted text-base font-medium mb-8">First, tell us who you are</p>

              <div className="space-y-4 mb-10">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`w-full flex items-center gap-5 p-5 rounded-[24px] border-2 text-left cursor-pointer transition-all ${
                      role === r.id
                        ? "border-clay-accent bg-white shadow-clayCard"
                        : "border-transparent bg-white/50 hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    <span className="text-3xl drop-shadow-sm">{r.icon}</span>
                    <div>
                      <div className={`font-black text-base ${role === r.id ? "text-clay-accent" : "text-clay-foreground"}`}>
                        {r.label}
                      </div>
                    </div>
                    {role === r.id && (
                      <div className="ml-auto w-6 h-6 rounded-full bg-clay-accent flex items-center justify-center shadow-sm">
                        <svg width="12" height="12" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <Button
                variant="primary"
                size="xl"
                className="w-full font-black shadow-clayButton text-lg"
                disabled={!role}
                onClick={() => setStep(2)}
                rightIcon={
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              >
                Continue
              </Button>
            </>
          )}

          {/* Step 2: Account details */}
          {step === 2 && (
            <>
              <h1 className="font-black text-3xl tracking-tight text-clay-foreground mb-2">Your details</h1>
              <p className="text-clay-muted text-base font-medium mb-8">Create your Lana account</p>

              {/* OAuth */}
              <Button
                variant="secondary"
                size="xl"
                className="w-full mb-6 font-bold shadow-clayButton bg-white"
                leftIcon={
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908C16.657 14.232 17.64 11.925 17.64 9.2z" fill="#4285F4"/>
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                    <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A9.009 9.009 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                  </svg>
                }
              >
                Sign up with Google
              </Button>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-white/40"/>
                <span className="text-sm text-clay-muted font-bold tracking-widest uppercase">or</span>
                <div className="flex-1 h-px bg-white/40"/>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Full Name" placeholder="Alex Johnson" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required/>
                <Input label="Work Email" type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required/>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  hint="Use 8+ characters with uppercase, numbers and symbols"
                  required
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Repeat password"
                  value={form.confirm}
                  onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                  error={form.confirm && form.confirm !== form.password ? "Passwords do not match" : undefined}
                  required
                />

                <label className="flex items-start gap-3 cursor-pointer pt-2">
                  <input type="checkbox" className="w-5 h-5 mt-0.5 rounded-[6px] border border-white shadow-clayPressed accent-clay-accent" required/>
                  <span className="text-sm font-bold text-clay-muted leading-relaxed">
                    I agree to the{" "}
                    <Link href="#" className="text-clay-accent hover:text-indigo-500 hover:underline">Terms of Service</Link>{" "}
                    and{" "}
                    <Link href="#" className="text-clay-accent hover:text-indigo-500 hover:underline">Privacy Policy</Link>
                  </span>
                </label>

                {error && <p className="text-red-500 text-sm font-bold mt-2 p-3 bg-red-50 rounded-xl">{error}</p>}

                <Button type="submit" variant="primary" size="xl" className="w-full mt-4 font-black shadow-clayButton text-lg" loading={loading}>
                  Create Account
                </Button>
              </form>
            </>
          )}

          {/* Step 3: Email verify */}
          {step === 3 && (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-6 shadow-clayButton">
                  <svg width="32" height="32" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <h1 className="font-black text-3xl tracking-tight text-clay-foreground mb-2">Check your email</h1>
                <p className="text-clay-muted text-base font-medium">We sent a verification code to <strong className="text-clay-foreground">{form.email || "your email"}</strong></p>
              </div>

              <div className="flex justify-center gap-2 sm:gap-3 mb-10">
                {otp.map((val, i) => (
                  <input
                    key={i}
                    id={`rotp-${i}`}
                    type="text"
                    maxLength={1}
                    value={val}
                    onChange={e => handleOtp(e.target.value, i)}
                    className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-black bg-white/50 border border-white rounded-2xl sm:rounded-[20px] shadow-clayPressed focus:shadow-clayCard focus:bg-white focus:outline-none transition-all text-clay-foreground"
                  />
                ))}
              </div>

              <Button
                variant="primary"
                size="xl"
                className="w-full mb-4 font-black shadow-clayButton text-lg"
                onClick={() => window.location.href = "/dashboard"}
              >
                Verify Email
              </Button>
              <button className="w-full text-sm font-bold text-clay-muted hover:text-clay-foreground cursor-pointer transition-colors">
                Didn&apos;t receive it? <span className="text-clay-accent hover:text-indigo-500">Resend code</span>
              </button>
            </>
          )}
        </div>

        <p className="text-center text-sm font-bold text-clay-muted mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-clay-accent font-black hover:text-indigo-500 hover:underline cursor-pointer">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
