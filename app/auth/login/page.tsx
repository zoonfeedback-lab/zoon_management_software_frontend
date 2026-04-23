"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Invalid credentials.");
      }

      const data = await response.json();
      // Store the token (in a real app, use a secure cookie or better storage)
      localStorage.setItem("access_token", data.accessToken);
      
      router.push("/overview");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09090b]">
      {/* Brand accent line */}
      <div className="absolute inset-y-0 left-0 w-[2px] bg-[#ff2026] shadow-[0_0_15px_rgba(255,32,38,0.5)]" />
      
      {/* Background Grid */}
      <div className="grid-bg absolute inset-0 opacity-20" />
      
      {/* Right side glass effect */}
      <div className="absolute inset-y-0 right-0 hidden w-[25%] border-l border-white/5 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] lg:block" />

      <div className="relative flex min-h-screen flex-col justify-between">
        <div className="mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-12">
          <div className="w-full max-w-xl">
            {/* Logo Section */}
            <div className="mb-14 flex items-center gap-5">
              <div className="relative h-[64px] w-[64px] overflow-hidden rounded-lg bg-[#ff2026] shadow-[0_0_20px_rgba(255,32,38,0.3)]">
                <div className="absolute inset-0 flex items-center justify-center font-mono text-2xl font-bold text-white">
                   <div className="border-2 border-white/90 px-1 py-0.5 rounded flex items-center gap-1">
                      <span className="text-sm">{">"}</span>
                      <span className="w-2.5 h-4 bg-white animate-pulse" />
                   </div>
                </div>
              </div>
              <div>
                <div className="display-title text-4xl leading-tight text-[#ff2026] md:text-5xl">ZOON</div>
                <div className="mt-1 text-sm uppercase tracking-[0.25em] text-[#eac0b5]/80 md:text-base">Engineering Hub</div>
              </div>
            </div>

            {/* Login Card */}
            <div className="panel-surface relative w-full max-w-[540px] overflow-hidden rounded-xl border border-white/10 bg-[#171719] p-10 shadow-2xl md:p-12">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#ff2026]/40 to-transparent" />
              
              <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">Sign in</h1>
              <p className="mt-5 text-lg text-[#eac0b5]/70 md:text-xl">Access your engineering environment.</p>

              <form className="mt-12 grid gap-7" onSubmit={handleSubmit}>
                <div className="grid gap-3">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff2026]/80">Email Address</div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="engineer@zoonlabs.io"
                    className="w-full border border-white/10 bg-[#0b0b0d] px-6 py-4 text-lg text-white transition-all placeholder:text-zinc-700 focus:border-[#ff2026]/50 focus:ring-1 focus:ring-[#ff2026]/30 md:text-xl"
                  />
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.2em] text-[#ff2026]/80">
                    <label htmlFor="password">Password</label>
                    <a href="#forgot" className="normal-case tracking-normal text-[#ff2026] hover:underline">Forgot password?</a>
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-white/10 bg-[#0b0b0d] px-6 py-4 text-lg text-white transition-all placeholder:text-zinc-700 focus:border-[#ff2026]/50 focus:ring-1 focus:ring-[#ff2026]/30 md:text-xl"
                  />
                </div>

                {error && (
                  <div className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                    {error}
                  </div>
                )}

                <button 
                  className="group relative mt-2 flex items-center justify-center gap-3 overflow-hidden bg-[#ff2026] px-8 py-5 text-xl font-bold text-white transition-all hover:bg-[#ff343a] active:scale-[0.98] disabled:opacity-50"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Authenticating..." : (
                    <>
                      Authenticate
                      <span className="text-2xl transition-transform group-hover:translate-x-1">→</span>
                    </>
                  )}
                </button>
              </form>

              <div className="my-10 flex items-center gap-5 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">
                <div className="h-px flex-1 bg-white/5" />
                <span>Or Continue With</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <button className="flex items-center justify-center gap-3 border border-white/5 bg-white/[0.03] px-6 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-white/[0.08] hover:border-white/10">
                  <span className="opacity-70">GitHub</span>
                </button>
                <button className="flex items-center justify-center gap-3 border border-white/5 bg-white/[0.03] px-6 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-white/[0.08] hover:border-white/10">
                  <span className="opacity-70">Google</span>
                </button>
              </div>
            </div>

            <div className="mt-10 flex max-w-[540px] items-center justify-between gap-4 text-base text-[#e7c4bc]/60 md:text-lg">
              <span>New to Zoonlabs?</span>
              <a href="#request-access" className="font-bold uppercase tracking-[0.15em] text-[#ff2026] hover:underline">
                Request Access →
              </a>
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="flex flex-col gap-6 border-t border-white/5 bg-black/40 px-8 py-6 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e7c4bc]/40 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-8">
            <span className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff2026] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff2026]"></span>
              </span> 
              Auth_Server: <span className="text-[#ff2026]">Online</span>
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Encryption: AES-256
            </span>
          </div>
          <div className="flex items-center gap-4">
             <span>Region: EU-West-1</span>
             <span className="opacity-30">|</span>
             <span>Node: 0x82F1</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .grid-bg {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .display-title {
          font-family: var(--font-display);
        }
      `}</style>
    </div>
  );
}

