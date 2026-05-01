"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Loader } from "@/components/ui";

type NavItem = {
  id: string;
  label: string;
  href: string;
};

type OverviewCard = {
  id: string;
  label: string;
  value: number;
  status: string;
  color: "red" | "amber" | "gray";
};

type CompletionItem = {
  id: string;
  title: string;
  subtitle: string;
  value: number;
};

type ActivityItem = {
  id: string;
  title: string;
  description: string;
  meta: string;
  tone: "red" | "gray";
};

type MilestoneItem = {
  id: string;
  title: string;
  project: string;
  assignees: string[];
  deadline: string;
  chip: string;
  chipTone: "red" | "gray";
};

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/client/dashboard" },
  { id: "projects", label: "Projects", href: "/client/projects" },
  { id: "profile", label: "Profile", href: "/client/profile" },
  { id: "notifications", label: "Notifications", href: "/client/notifications" },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function CircularProgress({ value }: { value: number }) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex size-[118px] items-center justify-center">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90">
        <circle cx="60" cy="60" r={radius} className="stroke-[#2a2b2f]" strokeWidth="10" fill="none" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          className="stroke-[#df2a33]"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute text-[34px] font-extrabold text-white">{value}%</span>
    </div>
  );
}

export default function ClientDashboardClient() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("dashboard");
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/client/dashboard");
        if (res.ok) {
          const json = await res.json();
          setData(json.data);
        } else if (res.status === 401 || res.status === 403) {
          router.push("/auth/login?error=Session Expired");
        }
      } catch (err) {
        console.error("Dashboard sync failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [router]);

  const overviewCards = useMemo(() => {
    if (!data) return [];
    return [
      { id: "projects", label: "Active Projects", value: data.metrics.activeProjects, status: "LIVE", color: "red" as const },
      { id: "approvals", label: "Approvals", value: data.metrics.pendingApprovals, status: "PENDING", color: "amber" as const },
      { id: "tasks", label: "Open Tasks", value: data.taskProgress.reduce((sum: number, t: any) => t.status !== 'DONE' ? sum + t._count._all : sum, 0), status: "OPEN", color: "gray" as const },
      { id: "alerts", label: "Unread Alerts", value: data.metrics.unreadNotifications, status: "NEW", color: "red" as const },
    ];
  }, [data]);

  const activityItems = useMemo(() => {
    if (!data) return [];
    return data.recentUpdates.map((update: any) => ({
      id: update.id,
      title: `Project ${update.name} updated`,
      description: `Current status is ${update.status}. Check the project board for detailed logs.`,
      meta: new Date(update.updatedAt).toLocaleTimeString(),
      tone: update.status === 'ACTIVE' ? "red" : "gray",
    }));
  }, [data]);

  const completionItems = useMemo(() => {
    if (!data) return [];
    // Calculate simple completion for first 3 projects for the index
    return data.recentUpdates.slice(0, 3).map((p: any) => ({
      id: p.id,
      title: p.name,
      subtitle: "System Node",
      value: p.status === 'COMPLETED' ? 100 : p.status === 'ACTIVE' ? 65 : 10,
    }));
  }, [data]);

  const completionSummary = useMemo(() => {
    if (completionItems.length === 0) return 0;
    const total = completionItems.reduce((sum: number, item: any) => sum + item.value, 0);
    return Math.round(total / completionItems.length);
  }, [completionItems]);

  if (loading) return <div className="h-screen bg-[#050608] flex items-center justify-center"><Loader /></div>;
  if (!data) return <div className="h-screen bg-[#050608] flex items-center justify-center text-white">ACCESS DENIED: Session Expired</div>;

  return (
    <main className="h-screen bg-[#050608] text-white">
      <div className="flex h-full w-full border border-[#181a1f] bg-[#0b0d12] shadow-[0_0_0_1px_rgba(255,255,255,0.015),0_20px_80px_rgba(0,0,0,0.45)]">
        <aside className="flex w-[240px] flex-col border-r border-[#181a1f] bg-[#07090e] px-5 py-8">
          <h1 className="max-w-full break-words text-[28px] font-black leading-[1.05] tracking-tight text-[#dd2f37]">
            Command Center
          </h1>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8f939f]">Elite Client Access</p>

          <nav className="mt-10 grid gap-2">
            {navItems.map((item) => {
              const active = activeNav === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveNav(item.id)}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all",
                    active ? "bg-[#161a24] text-[#f04b54]" : "text-[#8b909c] hover:bg-[#131620] hover:text-white",
                  )}
                >
                  <span className={cn("h-2.5 w-2.5 rounded-sm", active ? "bg-[#f04b54]" : "bg-[#3b3f49] group-hover:bg-[#8b909c]")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-16">
            <div className="rounded-xl border border-[#1d2028] bg-[#0f131c] p-3">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-[#101722] text-xs font-bold text-[#7cc6ff]">👤</div>
                <div className="overflow-hidden">
                  <p className="truncate text-sm font-semibold text-[#e5e9f1]">{data.client.companyName}</p>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[#7c818d]">ID: #{data.client.id.split('-')[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="flex-1 overflow-y-auto p-5 md:p-8">
          <header className="mb-7 flex items-center justify-between gap-4 border-b border-[#181a1f] pb-6">
            <p className="text-[22px] font-bold text-[#e6e9ef]">System Terminal</p>
            <div className="mx-auto hidden w-full max-w-[560px] items-center rounded-lg border border-[#252a34] bg-[#0f1218] px-3 py-2 lg:flex">
              <span className="mr-2 text-[#7d8390]">⌕</span>
              <input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="COMMAND SEARCH..."
                className="w-full bg-transparent text-[12px] font-semibold uppercase tracking-[0.1em] text-[#d6dbe4] outline-none placeholder:text-[#606673]"
                aria-label="Command search"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                aria-label="Notifications"
                className="relative flex size-9 items-center justify-center rounded-md border border-[#2a2f39] bg-[#11151d] text-[#cfd4df] hover:border-[#3a404b]"
              >
                🔔
                {data.metrics.unreadNotifications > 0 && (
                  <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-brand text-[8px] font-bold text-white">
                    {data.metrics.unreadNotifications}
                  </span>
                )}
              </button>
              <button
                aria-label="Settings"
                className="flex size-9 items-center justify-center rounded-md border border-[#2a2f39] bg-[#11151d] text-[#cfd4df] hover:border-[#3a404b]"
              >
                ⚙
              </button>
              <button
                aria-label="Help"
                className="flex size-9 items-center justify-center rounded-md border border-[#2a2f39] bg-[#11151d] text-[#cfd4df] hover:border-[#3a404b]"
              >
                ?
              </button>
            </div>
          </header>

          <div className="mb-6">
            <h2 className="text-[48px] font-extrabold uppercase leading-none tracking-tight text-white">Operational Overview</h2>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#868b97]">
              System Status: <span className="text-[#c8d0dd]">Optimal</span> | Data Refresh:
              <span className="text-[#c8d0dd]"> Real-Time</span>
            </p>
          </div>
          <div className="grid gap-5">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {overviewCards.map((card) => (
                <article key={card.id} className="rounded-xl border border-[#1e2129] bg-[#12151d] p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7e8491]">{card.status}</span>
                    <span
                      className={cn(
                        "size-2 rounded-full",
                        card.color === "red" ? "bg-[#df2a33]" : card.color === "amber" ? "bg-[#d9ad2f]" : "bg-[#606673]",
                      )}
                    />
                  </div>
                  <p className="text-[46px] font-black leading-none text-[#f4f6fb]">{card.value}</p>
                  <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#b4b9c3]">{card.label}</p>
                </article>
              ))}
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.8fr_1fr]">
              <article className="rounded-xl border border-[#1e2129] bg-[#12151d] p-6">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-[29px] font-extrabold uppercase text-white">Project Completion Index</h3>
                  <button className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#d73d45] hover:text-[#ef4a53]">
                    View All Projects
                  </button>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {completionItems.map((item) => (
                    <div key={item.id} className="flex flex-col items-center rounded-xl border border-[#1b1e25] bg-[#10131b] p-4">
                      <CircularProgress value={item.value} />
                      <p className="mt-3 text-center text-[24px] font-black text-white">{item.title}</p>
                      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.13em] text-[#858b97]">{item.subtitle}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-xl border border-[#1e2129] bg-[#12151d] p-5">
                <h3 className="mb-5 text-[24px] font-extrabold uppercase text-white">Recent System Activity</h3>
                <div className="space-y-4">
                  {activityItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-[12px_1fr] gap-3">
                      <span className={cn("mt-1.5 size-2.5 rounded-full", item.tone === "red" ? "bg-[#dd2f37]" : "bg-[#646a76]")} />
                      <div>
                        <p className="text-[15px] font-semibold text-[#e8ebf1]">{item.title}</p>
                        <p className="mt-1 text-[13px] leading-snug text-[#8f94a0]">{item.description}</p>
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.13em] text-[#6d727f]">{item.meta}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <article className="rounded-xl border border-[#1e2129] bg-[#12151d] p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-[30px] font-extrabold uppercase text-white">Upcoming Milestones</h3>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#87909d]">
                  <span className="mr-2 inline-block size-2 rounded-full bg-[#14b86d]" />
                  All services functional
                </p>
              </div>

              <div className="space-y-3">
                {data.recentUpdates.slice(0, 3).map((item: any) => (
                  <div key={item.id} className="grid grid-cols-[1.4fr_0.8fr_0.5fr] items-center gap-3 rounded-lg border border-[#1b1f28] bg-[#0f131b] p-4">
                    <div>
                      <p className="text-[24px] font-black leading-none text-[#f1f4fa]">{item.name}</p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7e8491]">System Node</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#767d89]">Last Sync</p>
                      <p className="mt-1 text-[18px] font-bold uppercase text-[#d7dce6]">{new Date(item.updatedAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex justify-end">
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.13em]",
                          item.status === 'ACTIVE' ? "bg-[#38161a] text-[#f04f57]" : "bg-[#232831] text-[#c2c8d1]",
                        )}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
                {data.recentUpdates.length === 0 && (
                   <div className="py-8 text-center text-[10px] font-bold uppercase tracking-widest text-[#6d727f]">No active project signals.</div>
                )}
              </div>
            </article>
          </div>
          <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#6f7582]">
            Completion signal average: <span className="text-[#d6dbe5]">{completionSummary}%</span>
          </p>
        </section>
      </div>
    </main>
  );
}
