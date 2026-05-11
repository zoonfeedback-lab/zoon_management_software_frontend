"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function BellIcon() {
  return (
    <svg className="h-5 w-5 text-zinc-200" viewBox="0 0 24 24" fill="none">
      <path d="M12 4a4 4 0 0 0-4 4v2.7c0 .9-.3 1.8-.8 2.5L6 15h12l-1.2-1.8c-.5-.7-.8-1.6-.8-2.5V8a4 4 0 0 0-4-4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 18a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function Topbar({
  sectionTitle,
  ctaLabel,
  ctaHref
}: {
  sectionTitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          router.push("/auth/login");
          return;
        }
        const response = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          setUser(await response.json());
        } else {
          router.push("/auth/login");
        }
      } catch (err) {
        console.error("Auth sync failed:", err);
      }
    };
    fetchMe();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-[#0b0b0d]/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1680px] items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-white/90">
            {sectionTitle ?? "System Overview"}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {/* {ctaLabel && ctaHref && (
            <Link 
              href={ctaHref}
              className="mr-2 flex items-center gap-3 bg-[#ff2026] px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white transition hover:bg-[#ff343a] rounded-lg shadow-[0_4px_14px_rgba(255,32,38,0.2)]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              {ctaLabel}
            </Link>
          )} */}
          <button aria-label="Notifications" className="grid h-9 w-9 place-items-center rounded-lg text-zinc-400 transition hover:bg-white/5 hover:text-white">
            <BellIcon />
          </button>
          <button
            onClick={handleLogout}
            title="Terminate Session"
            className="grid h-9 w-9 place-items-center rounded-lg text-[#ff2026]/70 transition hover:bg-[#ff2026]/10 hover:text-[#ff2026]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
          </button>

          <div className="relative ml-2 h-9 w-9 overflow-hidden rounded-lg bg-zinc-900 border border-white/10 p-0.5 shadow-xl group cursor-pointer hover:border-brand/40 transition-colors">
            <div className="h-full w-full rounded-md bg-zinc-800 flex items-center justify-center text-[10px] font-black text-white italic">
              {user?.fullName?.split(' ').map((n: any) => n[0]).join('') || '?'}
            </div>
            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0b0b0d] bg-success" />
          </div>
        </div>
      </div>
    </header>
  );
}
