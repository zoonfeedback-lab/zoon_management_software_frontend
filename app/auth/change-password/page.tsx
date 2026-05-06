"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verify that the user came from the login flow with a temporary token
    const token = sessionStorage.getItem("temp_auth_token");
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const token = sessionStorage.getItem("temp_auth_token");
      
      const response = await api.patch(
        "/auth/employee/change-password",
        { currentPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to change password.");
      }

      // Password changed successfully!
      // Promote the temporary token to the primary access token
      localStorage.setItem("access_token", token!);
      sessionStorage.removeItem("temp_auth_token");
      
      // Navigate to the Engineering Hub / Employee Portal
      router.push("/portal/manager/projects");
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
            
            <div className="mb-6 flex items-center gap-5">
              <div className="relative h-[64px] w-[64px] overflow-hidden rounded-lg bg-[#ff2026] shadow-[0_0_20px_rgba(255,32,38,0.3)]">
                <div className="absolute inset-0 flex items-center justify-center font-mono text-2xl font-bold text-white">
                   <div className="border-2 border-white/90 px-1 py-0.5 rounded flex items-center gap-1">
                      <span className="text-sm">🔒</span>
                   </div>
                </div>
              </div>
              <div>
                <div className="display-title text-3xl leading-tight text-[#ff2026] md:text-4xl">SECURITY NODE</div>
                <div className="mt-1 text-sm uppercase tracking-[0.25em] text-[#eac0b5]/80">Mandatory Update</div>
              </div>
            </div>

            <div className="panel-surface relative w-full max-w-[540px] overflow-hidden rounded-xl border border-brand/30 bg-[#171719] p-7 shadow-2xl sm:p-8 md:p-9">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-brand to-transparent" />
              
              <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Update Credentials</h1>
              <p className="mt-3 text-sm text-[#eac0b5]/70 md:text-base leading-relaxed">
                You are accessing the Engineering Hub using an administrative placeholder password. 
                For operational security, you must establish a private password before proceeding.
              </p>

              <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
                <div className="grid gap-3">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff2026]/80">Current Password</div>
                  <input
                    id="currentPassword"
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Admin@123"
                    className="w-full border border-white/10 bg-[#0b0b0d] px-6 py-4 text-lg text-white transition-all placeholder:text-zinc-700 focus:border-[#ff2026]/50 focus:ring-1 focus:ring-[#ff2026]/30"
                  />
                </div>

                <div className="grid gap-3">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff2026]/80">New Password</div>
                  <input
                    id="newPassword"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-white/10 bg-[#0b0b0d] px-6 py-4 text-lg text-white transition-all placeholder:text-zinc-700 focus:border-[#ff2026]/50 focus:ring-1 focus:ring-[#ff2026]/30"
                  />
                </div>

                <div className="grid gap-3">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff2026]/80">Confirm Password</div>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-white/10 bg-[#0b0b0d] px-6 py-4 text-lg text-white transition-all placeholder:text-zinc-700 focus:border-[#ff2026]/50 focus:ring-1 focus:ring-[#ff2026]/30"
                  />
                </div>

                {error && (
                  <div className="border border-brand/30 bg-brand/10 px-4 py-3 text-sm font-bold text-brand">
                    {error}
                  </div>
                )}

                <button 
                  className="group relative mt-2 flex items-center justify-center gap-3 overflow-hidden bg-[#ff2026] px-8 py-4 text-xl font-bold text-white transition-all hover:bg-[#ff343a] active:scale-[0.98] disabled:opacity-50"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Encrypting..." : (
                    <>
                      Update & Authorize
                      <span className="text-2xl transition-transform group-hover:translate-x-1">→</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </main>
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
