"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "@/lib/types";

function NavIcon({ type, active }: { type: NavItem["icon"]; active: boolean }) {
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
    case "wallet":
      return <svg {...shared}><rect x="3" y="6" width="18" height="12" rx="2" stroke={stroke} strokeWidth="1.8" /><circle cx="16.5" cy="12" r="1.5" fill={stroke} /></svg>;
    case "review":
      return <svg {...shared}><path d="M4 5h16v10H8l-4 4V5Z" stroke={stroke} strokeWidth="1.8" /><path d="m12 8 .9 2.1 2.3.2-1.7 1.5.5 2.2L12 13l-2 1 .5-2.2-1.7-1.5 2.3-.2L12 8Z" fill={stroke} /></svg>;
    case "task":
      return <svg {...shared}><rect x="5" y="4" width="14" height="16" rx="2" stroke={stroke} strokeWidth="1.8" /><path d="M8 9h8M8 13h8M8 17h5" stroke={stroke} strokeWidth="1.8" /></svg>;
    case "file":
      return <svg {...shared}><path d="M7 3h7l5 5v13H7z" stroke={stroke} strokeWidth="1.8" /><path d="M14 3v5h5" stroke={stroke} strokeWidth="1.8" /></svg>;
    case "clock":
      return <svg {...shared}><circle cx="12" cy="12" r="8" stroke={stroke} strokeWidth="1.8" /><path d="M12 7v5l3 2" stroke={stroke} strokeWidth="1.8" /></svg>;
    case "settings":
      return <svg {...shared}><path d="M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 1 0 12 8.5Z" stroke={stroke} strokeWidth="1.8" /><path d="M12 2v3M12 19v3M4.9 4.9l2.2 2.2M16.9 16.9l2.2 2.2M2 12h3M19 12h3M4.9 19.1l2.2-2.2M16.9 7.1l2.2-2.2" stroke={stroke} strokeWidth="1.8" /></svg>;
    case "users":
      return <svg {...shared}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={stroke} strokeWidth="1.8" /><circle cx="9" cy="7" r="4" stroke={stroke} strokeWidth="1.8" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke={stroke} strokeWidth="1.8" /></svg>;
    case "box":
      return <svg {...shared}><path d="M21 8v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8M21 8l-9-5-9 5M21 8l-9 5-9-5M12 13v8" stroke={stroke} strokeWidth="1.8" /></svg>;
    case "list":
      return <svg {...shared}><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" /></svg>;
  }
}

export function Sidebar({
  title,
  subtitle,
  items,
  ctaLabel,
}: {
  title: string;
  subtitle: string;
  items: NavItem[];
  ctaLabel: string;
}) {
  const pathname = usePathname();

  return (
    <aside className="border-b border-line bg-[#121214]/95 md:min-h-screen md:border-b-0 md:border-r">
      <div className="flex h-full flex-col gap-5 px-3 py-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ff2026] text-white shadow-[0_0_10px_rgba(255,32,38,0.3)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 3v3m12-3v3M10 3v18M14 3v18M6 21h12M6 8h12"/></svg>
          </div>
          <div>
            <div className="text-lg font-black tracking-tighter text-white">ZOON</div>
            <div className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#9897a1]">Admin Portal</div>
          </div>
        </div>

      <nav className="grid gap-1 mt-4">
        <Link 
          href="/internee"
          className="mb-4 flex items-center gap-4 px-4 py-3 bg-brand text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-sm shadow-[0_0_15px_rgba(255,32,38,0.2)] hover:bg-[#ff343a] transition-all"
        >
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
           {ctaLabel}
        </Link>
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className={`group flex items-center gap-4 px-4 py-3.5 text-xs font-semibold tracking-wide transition relative ${
                active
                  ? "bg-white/[0.05] text-white"
                  : "text-[#9897a1] hover:bg-white/[0.03] hover:text-white"
              }`}
            >
              {active && <div className="absolute left-0 top-0 h-full w-1 bg-[#ff2026]" />}
              <NavIcon type={item.icon} active={active} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto grid gap-1 border-t border-white/5 pt-4">
        <Link 
          href="#support" 
          className="group flex items-center gap-4 px-4 py-3.5 text-xs font-semibold text-[#9897a1] transition hover:bg-white/[0.03] hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          Support
        </Link>
        <Link 
          href="/auth/login" 
          className="group flex items-center gap-4 px-4 py-3.5 text-xs font-semibold text-[#9897a1] transition hover:bg-white/[0.03] hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Logout
        </Link>
      </div>
      </div>
    </aside>
  );
}
