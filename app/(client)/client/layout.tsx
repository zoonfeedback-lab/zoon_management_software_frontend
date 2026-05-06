"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { api } from "@/lib/api";

type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: string;
};

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/client/dashboard", icon: "⊞" },
  { id: "projects", label: "My Projects", href: "/client/projects", icon: "⌬" },
  { id: "payments", label: "Payments", href: "/client/payments", icon: "⏣" },
  { id: "reviews", label: "Reviews", href: "/client/reviews", icon: "💬" },
  { id: "profile", label: "Profile", href: "/client/profile", icon: "👤" },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [clientData, setClientData] = useState<any>(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await api.get("/client/dashboard");
        if (res.ok) {
          const json = await res.json();
          setClientData(json.data.client);
        }
      } catch (err) {
        console.error("Layout sync failed:", err);
      }
    };
    fetchClient();
  }, []);

  return (
    <div className="flex h-screen bg-[#050608] text-white overflow-hidden">
      {/* Client Sidebar */}
      <aside className="flex w-[260px] flex-col border-r border-white/5 bg-[#07090e] px-6 py-8">
        <div className="mb-12">
          <h1 className="text-[28px] font-black leading-none tracking-tighter text-brand italic">
            ZOON
          </h1>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8f939f]">Client Portal</p>
        </div>

        <nav className="grid gap-2">
          {navItems.map((item) => {
            const active = pathname.includes(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`group flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-bold transition-all ${active ? "bg-white/5 text-brand" : "text-[#8b909c] hover:bg-white/[0.02] hover:text-white"
                  }`}
              >
                <span className={`text-lg ${active ? "text-brand" : "text-[#3b3f49] group-hover:text-white"}`}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-6 pt-10">
          <Link href="/client/support" className="flex items-center gap-4 px-4 text-[11px] font-bold uppercase tracking-widest text-[#8b909c] hover:text-white transition-colors">
            <span className="size-5 rounded-full border border-current grid place-items-center text-[10px]">?</span>
            Support
          </Link>
          <Link href="/auth/login" className="flex items-center gap-4 px-4 text-[11px] font-bold uppercase tracking-widest text-[#8b909c] hover:text-brand transition-colors">
            <span className="text-lg">↪</span>
            Sign Out
          </Link>

          {clientData && (
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                  {clientData.companyName[0]}
                </div>
                <div className="overflow-hidden">
                  <p className="truncate text-xs font-bold text-white">{clientData.companyName}</p>
                  <p className="text-[9px] uppercase tracking-widest text-[#5e626d]">Verified Client</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
