"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const NAV_ITEMS = [
  { label: "PM Workspace", href: "/portal/manager", icon: "grid" },
  { label: "My Projects", href: "/portal/manager/projects", icon: "folder" },
  { label: "My Tasks", href: "/portal/manager/tasks", icon: "list" },
  { label: "Team", href: "/portal/manager/team", icon: "users" },
];

function NavIcon({ type, active }: { type: string; active: boolean }) {
  const stroke = active ? "#ff2026" : "#8f8d97";
  const shared = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" };

  switch (type) {
    case "grid":
      return (
        <svg {...shared}>
          <rect x="3" y="3" width="7" height="7" fill={stroke} />
          <rect x="14" y="3" width="7" height="7" fill={stroke} />
          <rect x="3" y="14" width="7" height="7" fill={stroke} />
          <rect x="14" y="14" width="7" height="7" fill={stroke} />
        </svg>
      );
    case "folder":
      return <svg {...shared}><path d="M3 7.5h6l1.7 2H21v8.7A1.8 1.8 0 0 1 19.2 20H4.8A1.8 1.8 0 0 1 3 18.2V7.5Z" stroke={stroke} strokeWidth="1.8" /></svg>;
    case "list":
      return <svg {...shared}><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" /></svg>;
    case "users":
      return <svg {...shared}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={stroke} strokeWidth="1.8" /><circle cx="9" cy="7" r="4" stroke={stroke} strokeWidth="1.8" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke={stroke} strokeWidth="1.8" /></svg>;
    default:
      return null;
  }
}

export default function PMPortalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#09090b] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[240px] border-r border-white/5 bg-[#0b0b0d] flex flex-col">
        {/* Top Header Placeholder (to align with main topnav) */}
        <div className="h-[60px] border-b border-white/5 px-6 flex items-center">
          <div className="text-xl font-black italic text-[#ff2026] tracking-tighter">ZOONLABS</div>
        </div>
        
        <div className="px-6 py-8 border-b border-white/5">
          <h2 className="text-[#ff2026] font-black text-sm tracking-widest uppercase mb-1">PM PORTAL</h2>
          <p className="text-[9px] font-bold text-zinc-500 tracking-[0.2em] uppercase">High-Performance Engine</p>
        </div>

        <nav className="flex-1 py-4 grid gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-6 py-3.5 text-xs font-bold tracking-widest uppercase transition-all ${
                  active
                    ? "bg-gradient-to-r from-[#ff2026]/10 to-transparent text-[#ff2026] border-l-4 border-[#ff2026]"
                    : "text-zinc-500 hover:text-white hover:bg-white/[0.02] border-l-4 border-transparent"
                }`}
              >
                <NavIcon type={item.icon} active={active} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6">
          <button className="w-full bg-[#ff2026] hover:bg-[#ff343a] text-white font-black text-xs tracking-[0.2em] uppercase py-4 transition-colors">
            NEW PROJECT
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Navbar */}
        <header className="h-[60px] border-b border-white/5 px-6 flex items-center justify-between shrink-0 bg-[#0b0b0d]">
          <div className="flex items-center gap-8">
             {pathname.includes("/projects") ? (
                <div className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
                   PROJECTS / <span className="text-white">PROJECT_ALPHA_X7</span>
                </div>
             ) : (
               <>
                 <Link href="/portal/manager/dashboard" className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors">DASHBOARD</Link>
                 <Link href="/portal/manager" className="text-xs font-black uppercase tracking-[0.2em] text-[#ff2026]">WORKSPACES</Link>
                 <Link href="#insights" className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors">INSIGHTS</Link>
               </>
             )}
          </div>
          
          <div className="flex items-center gap-5">
            <div className="relative group">
               <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
               <input type="text" placeholder="Quick Search..." className="bg-[#121214] border border-white/5 rounded pl-10 pr-4 py-1.5 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ff2026]/50 w-[240px] transition-colors" />
            </div>
            <button className="text-zinc-500 hover:text-white transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></button>
            <button className="text-zinc-500 hover:text-white transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v3M12 19v3M4.9 4.9l2.2 2.2M16.9 16.9l2.2 2.2M2 12h3M19 12h3M4.9 19.1l2.2-2.2M16.9 7.1l2.2-2.2"/><circle cx="12" cy="12" r="3"/></svg></button>
            <div className="h-7 w-7 rounded-full bg-blue-600 grid place-items-center text-[10px] font-bold text-white border border-white/10 ml-2 shadow-[0_0_10px_rgba(37,99,235,0.3)]">PM</div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-[#09090b]">
          {children}
        </div>
      </main>
    </div>
  );
}
