"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"admin" | "employee" | "client">("employee");
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    if (emailParam) setEmail(emailParam);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Employees use a specific gated endpoint, Admin/Client use the general one
      const endpoint = role === "employee" ? "/auth/employee/login" : "/auth/login";
      const response = await api.post(endpoint, { email, password });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials.");
      }

      // Handle first-time password change for employees
      if (data.data.mustChangePassword) {
        sessionStorage.setItem("temp_auth_token", data.data.accessToken);
        router.push("/auth/change-password");
        return;
      }

      localStorage.setItem("access_token", data.data.accessToken);
      
      const userRole = data.data.user.role;

      // Smart redirection based on returned user role
      if (userRole === "CLIENT") {
        router.push("/client/dashboard");
      } else if (userRole === "CORE_TEAM" || userRole === "INTERNEE") {
        router.push("/portal/manager/projects");
      } else if (userRole === "ADMIN") {
        router.push("/");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#09090b]">
      <div className="grid-bg absolute inset-0 opacity-20" />
      
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-5 pb-[80px] pt-[60px]">
        <main className="flex w-full items-center justify-center">
          <div className="flex w-full max-w-[560px] flex-col items-center">
            {/* Logo Section */}
            <div className="mb-6 flex items-center gap-5">
              <div className="relative h-[64px] w-[64px] overflow-hidden rounded-lg bg-[#ff2026] shadow-[0_0_20px_rgba(255,32,38,0.3)]">
                <div className="absolute inset-0 flex items-center justify-center font-mono text-2xl font-bold text-white">
                   <div className="border-2 border-white/90 px-1 py-0.5 rounded flex items-center gap-1">
                      <span className="text-sm">{">"}</span>
                      <span className="w-2.5 h-4 bg-white animate-pulse" />
                   </div>
                </div>
              </div>
              <div>
                <div className="display-title text-4xl leading-tight text-[#ff2026] md:text-5xl font-black italic">ZOON</div>
                <div className="mt-1 text-sm uppercase tracking-[0.25em] text-[#eac0b5]/80 md:text-base">Engineering Hub</div>
              </div>
            </div>

            {/* Login Card */}
            <div className="panel-surface relative w-full max-w-[540px] overflow-hidden rounded-xl border border-white/10 bg-[#171719] p-7 shadow-2xl sm:p-8 md:p-9">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#ff2026]/40 to-transparent" />
              
              <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl uppercase italic font-black">Sign in</h1>
              <p className="mt-4 text-lg text-[#eac0b5]/70 md:text-xl">
                {role === "employee" ? "Access your engineering environment." : 
                 role === "client" ? "Synchronize with your project portfolio." : 
                 "System Administration Console."}
              </p>

              <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
                <div className="mb-2 flex overflow-hidden rounded-lg border border-white/10 bg-[#0b0b0d] p-1">
                   <button
                     type="button"
                     onClick={() => setRole("employee")}
                     className={`flex-1 rounded-md py-2.5 text-[9px] font-black uppercase tracking-[0.2em] transition-all ${role === "employee" ? "bg-[#ff2026]/20 text-[#ff2026] shadow-[0_0_15px_rgba(255,32,38,0.2)]" : "text-zinc-500 hover:text-white"}`}
                   >
                      Engineering
                   </button>
                   <button
                     type="button"
                     onClick={() => setRole("client")}
                     className={`flex-1 rounded-md py-2.5 text-[9px] font-black uppercase tracking-[0.2em] transition-all ${role === "client" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-white"}`}
                   >
                      Client Portal
                   </button>
                   <button
                     type="button"
                     onClick={() => setRole("admin")}
                     className={`flex-1 rounded-md py-2.5 text-[9px] font-black uppercase tracking-[0.2em] transition-all ${role === "admin" ? "bg-white/5 text-zinc-300" : "text-zinc-500 hover:text-white"}`}
                   >
                      Admin
                   </button>
                </div>

                <div className="grid gap-3">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff2026]/80">Identity_Email</div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@zoon.io"
                    className="w-full border border-white/10 bg-[#0b0b0d] px-6 py-4 text-lg text-white transition-all placeholder:text-zinc-700 focus:border-[#ff2026]/50 focus:ring-1 focus:ring-[#ff2026]/30 md:text-xl font-mono"
                  />
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-between gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#ff2026]/80">
                    <label>Access_Key</label>
                    <a href="#forgot" className="normal-case tracking-normal text-[#ff2026] hover:underline font-bold text-xs">Reset Request</a>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-white/10 bg-[#0b0b0d] px-6 py-4 text-lg text-white transition-all placeholder:text-zinc-700 focus:border-[#ff2026]/50 focus:ring-1 focus:ring-[#ff2026]/30 md:text-xl font-mono"
                  />
                </div>

                {error && (
                  <div className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-red-500">
                    {error}
                  </div>
                )}

                <button 
                  className="group relative mt-2 flex items-center justify-center gap-3 overflow-hidden bg-[#ff2026] px-8 py-5 text-xl font-black italic uppercase tracking-tighter text-white transition-all hover:bg-[#ff343a] active:scale-[0.98] disabled:opacity-50"
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

              <div className="my-6 flex items-center gap-5 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
                <div className="h-px flex-1 bg-white/5" />
                <span>Security Gate</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <button className="flex items-center justify-center gap-3 border border-white/5 bg-white/[0.03] px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-white/[0.08] hover:border-white/10">
                   GitHub_ID
                </button>
                <button className="flex items-center justify-center gap-3 border border-white/5 bg-white/[0.03] px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-white/[0.08] hover:border-white/10">
                   Google_ID
                </button>
              </div>
            </div>

            <div className="mt-6 flex w-full max-w-[540px] items-center justify-between gap-4 text-xs text-[#e7c4bc]/40 md:text-sm">
              <span className="font-bold uppercase tracking-widest">Unauthorized access is monitored.</span>
              <a href="#request-access" className="font-black uppercase tracking-[0.15em] text-[#ff2026] hover:underline">
                Request Access →
              </a>
            </div>
          </div>
        </main>

        {/* Footer info bar */}
        <div className="fixed inset-x-0 bottom-0 z-30 flex flex-col gap-3 border-t border-white/5 bg-black/80 px-4 py-3 text-[9px] font-black uppercase tracking-[0.22em] text-[#e7c4bc]/40 backdrop-blur-sm md:flex-row md:items-center md:justify-between md:px-6 md:py-4">
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
