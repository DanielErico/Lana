"use client";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { createClientBrowser } from "@/utils/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClientBrowser();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Success, redirect to dashboard
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center px-4 relative z-10">
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

        <div className="bg-white/80 backdrop-blur-2xl rounded-[40px] border border-white shadow-clayDeep p-6 sm:p-10">
            <>
              <h1 className="font-black text-3xl text-clay-foreground mb-2 tracking-tight">Welcome back</h1>
              <p className="text-clay-muted text-base font-medium mb-8">Sign in to your Lana account</p>

              {/* OAuth */}
              <Button
                variant="secondary"
                size="xl"
                className="w-full mb-6 font-bold shadow-clayButton bg-white"
                leftIcon={
                  <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                    <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A9.009 9.009 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                  </svg>
                }
              >
                Continue with Google
              </Button>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-white/40"/>
                <span className="text-sm text-clay-muted font-bold tracking-widest uppercase">or</span>
                <div className="flex-1 h-px bg-white/40"/>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email address"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  leftIcon={
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  }
                />
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? (
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  }
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded-[6px] border-none shadow-clayPressed accent-clay-accent"/>
                    <span className="text-sm font-bold text-clay-muted">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-clay-accent hover:text-indigo-500 hover:underline cursor-pointer font-bold">
                    Forgot password?
                  </Link>
                </div>

                {error && <p className="text-red-500 text-sm font-bold mt-2 p-3 bg-red-50 rounded-xl">{error}</p>}

                <Button type="submit" variant="primary" size="xl" className="w-full mt-4 font-black shadow-clayButton text-lg" loading={loading}>
                  Sign In
                </Button>
              </form>

              <p className="text-center text-sm font-bold text-clay-muted mt-8">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-clay-accent font-black hover:text-indigo-500 hover:underline cursor-pointer">
                  Sign up free
                </Link>
              </p>
              <p className="text-center text-sm font-bold text-clay-muted mt-8">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-clay-accent font-black hover:text-indigo-500 hover:underline cursor-pointer">
                  Sign up free
                </Link>
              </p>
            </>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-2.5 mt-6 text-xs font-bold text-clay-muted/80 tracking-wide uppercase">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Secured with AES-256 encryption · JWT authentication
        </div>
      </div>
    </div>
  );
}
