"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function BellIcon() {
  return (
    <svg className="h-5 w-5 text-zinc-200" viewBox="0 0 24 24" fill="none">
      <path d="M12 4a4 4 0 0 0-4 4v2.7c0 .9-.3 1.8-.8 2.5L6 15h12l-1.2-1.8c-.5-.7-.8-1.6-.8-2.5V8a4 4 0 0 0-4-4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 18a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function Topbar({ sectionTitle }: { sectionTitle?: string }) {
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

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 border-r border-white/5 pr-6">
            <button aria-label="Notifications" className="grid h-9 w-9 place-items-center rounded-lg transition hover:bg-white/5">
              <BellIcon />
            </button>
            <button 
              onClick={handleLogout}
              title="Terminate Session"
              className="grid h-9 w-9 place-items-center rounded-lg transition hover:bg-brand/10 text-brand"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-white">{user?.fullName || "Synchronizing..."}</div>
              <div className="text-[10px] font-medium uppercase tracking-wider text-[#9897a1]">{user?.role?.name || "Accessing..."}</div>
            </div>
            <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-zinc-900 border border-white/10 p-0.5 shadow-xl">
               <div className="h-full w-full rounded-md bg-zinc-800 flex items-center justify-center text-xs font-bold text-white">
                  {user?.fullName?.split(' ').map((n:any) => n[0]).join('') || '?'}
               </div>
               <div className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0b0b0d] bg-success animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
