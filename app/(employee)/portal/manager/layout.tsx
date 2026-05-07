"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/portal/manager", icon: "grid" },
  { label: "My Projects", href: "/portal/manager/projects", icon: "folder" },
  { label: "Reviews", href: "/portal/manager/revisions", icon: "star" },
  { label: "Teams", href: "/portal/manager/team", icon: "users" },
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
    case "star":
      return <svg {...shared}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case "file":
      return <svg {...shared}><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke={stroke} strokeWidth="1.8" /><polyline points="13 2 13 9 20 9" stroke={stroke} strokeWidth="1.8" /></svg>;
    default:
      return null;
  }
}

export default function CommandPortalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const sectionLabel = pathname.includes("/projects")
    ? "Mission Logs"
    : pathname.includes("/tasks")
      ? "Assignment Control"
      : pathname.includes("/team")
        ? "Operative Registry"
        : "Manager Dashboard";

  return (
    <div className="grid min-h-screen bg-[#09090b] text-white md:grid-cols-[232px_minmax(0,1fr)]">
      {/* Sidebar */}
      <aside className="border-r border-white/5 bg-[#0b0b0d]">
        <div className="flex h-full flex-col gap-5 px-4 py-4">
          <div className="flex h-12 items-center border-b border-white/5 px-2">
            <div className="text-xl font-black italic text-[#ff2026] tracking-widest">ZOON</div>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#111214] px-4 py-4">
            <h2 className="text-[#ff2026] font-black text-sm tracking-widest uppercase mb-1">Manager Portal</h2>
            <p className="text-[9px] font-bold text-zinc-500 tracking-[0.2em] uppercase">Operations Management Hub</p>
          </div>

          <nav className="grid gap-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 rounded-lg px-4 py-3 text-xs font-bold tracking-widest uppercase transition-all ${active
                      ? "bg-[#ff2026]/10 text-[#ff2026] border border-[#ff2026]/30"
                      : "text-zinc-500 hover:text-white hover:bg-white/[0.03] border border-transparent"
                    }`}
                >
                  <NavIcon type={item.icon} active={active} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3 border-t border-white/5 pt-4">
            <button className="w-full bg-[#ff2026] hover:bg-[#ff343a] text-white font-black text-xs tracking-[0.2em] uppercase py-3 rounded-lg transition-colors">
              New Project
            </button>
            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#121214] px-3 py-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Operator</span>
              <div className="h-7 w-7 rounded-md bg-blue-600 grid place-items-center text-[10px] font-bold text-white border border-white/10 shadow-[0_0_10px_rgba(37,99,235,0.3)]">
                MG
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 border-b border-white/5 bg-[#0b0b0d]/90 px-4 py-3 backdrop-blur-md md:px-6">
          <div className="mx-auto flex w-full max-w-[1680px] items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
                Manager / <span className="text-white">{sectionLabel}</span>
              </div>
              <div className="hidden items-center gap-6 md:flex">
                <Link href="/portal/manager" className={`text-[10px] font-black uppercase tracking-[0.2em] ${pathname === '/portal/manager' ? 'text-[#ff2026]' : 'text-zinc-500 hover:text-white transition-colors'}`}>Workspaces</Link>
                <Link href="/portal/manager/projects" className={`text-[10px] font-black uppercase tracking-[0.2em] ${pathname.includes('/projects') ? 'text-[#ff2026]' : 'text-zinc-500 hover:text-white transition-colors'}`}>Mission Logs</Link>
                <Link href="/portal/manager/team" className={`text-[10px] font-black uppercase tracking-[0.2em] ${pathname.includes('/team') ? 'text-[#ff2026]' : 'text-zinc-500 hover:text-white transition-colors'}`}>Teams</Link>
                <Link href="/portal/manager/tasks" className={`text-[10px] font-black uppercase tracking-[0.2em] ${pathname.includes('/tasks') ? 'text-[#ff2026]' : 'text-zinc-500 hover:text-white transition-colors'}`}>Tasks</Link>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-5">
              <div className="relative hidden md:block">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input type="text" placeholder="Quick Search..." className="w-[220px] rounded-lg border border-white/10 bg-[#121214] py-2 pl-10 pr-4 text-xs font-mono text-white placeholder:text-zinc-600 focus:border-[#ff2026]/50 focus:outline-none transition-colors" />
              </div>
              <button className="grid h-9 w-9 place-items-center rounded-lg text-zinc-500 transition hover:bg-white/5 hover:text-white"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg></button>
              <button className="grid h-9 w-9 place-items-center rounded-lg text-zinc-500 transition hover:bg-white/5 hover:text-white"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v3M12 19v3M4.9 4.9l2.2 2.2M16.9 16.9l2.2 2.2M2 12h3M19 12h3M4.9 19.1l2.2-2.2M16.9 7.1l2.2-2.2" /><circle cx="12" cy="12" r="3" /></svg></button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="h-[calc(100vh-61px)] overflow-y-auto overflow-x-hidden bg-[radial-gradient(80%_60%_at_0%_0%,rgba(255,32,38,0.08),transparent_60%),#09090b]">
          <div className="mx-auto w-full max-w-[1680px] px-4 py-4 md:px-5 md:py-5">{children}</div>
        </div>
      </main>
    </div>
  );
}
