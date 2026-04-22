"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "@/lib/types";
import { PrimaryButton } from "@/components/ui";

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
      <div className="flex h-full flex-col gap-7 px-5 py-6">
        <div className="flex items-center gap-4 px-2">
          <div className="grid h-10 w-10 place-items-center bg-brand text-lg font-black uppercase text-white">Z</div>
          <div>
            <div className="display-title text-2xl text-white">{title}</div>
            <div className="mt-1 text-xs uppercase tracking-[0.18em] text-mute">{subtitle}</div>
          </div>
        </div>

      <nav className="grid gap-2">
        {items.map((item) => {
          const active = item.href === "/projects" ? pathname.startsWith("/projects") : pathname === item.href;

          return (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className={`group flex items-center gap-4 border-l-4 px-4 py-4 text-sm font-medium uppercase tracking-[0.14em] transition ${
                active
                  ? "border-brand bg-black text-white"
                  : "border-transparent bg-white/[0.02] text-mute hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <NavIcon type={item.icon} active={active} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <PrimaryButton className="mt-auto w-full justify-center">{ctaLabel}</PrimaryButton>

      <div className="grid gap-4 border-t border-line px-2 pt-6 text-sm text-mute">
        <a href="#support" className="hover:text-white">Support</a>
        <a href="#logout" className="hover:text-white">Logout</a>
      </div>
      </div>
    </aside>
  );
}
