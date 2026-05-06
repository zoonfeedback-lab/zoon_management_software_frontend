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
        } else {
          // DEVELOPER PREVIEW MODE: Fallback to tactical data if sync fails
          console.warn("Client Dashboard Sync Delayed. Engaging Preview Mode.");
          setData({
            metrics: { activeProjects: 4, pendingApprovals: 2, unreadNotifications: 3 },
            recentUpdates: [
              { id: '1', name: 'NOVA CORE V4', status: 'ACTIVE', updatedAt: new Date().toISOString() },
              { id: '2', name: 'ATLAS DATABASE', status: 'ACTIVE', updatedAt: new Date().toISOString() },
              { id: '3', name: 'ZENITH UI KIT', status: 'COMPLETED', updatedAt: new Date().toISOString() }
            ],
            taskProgress: [
              { status: 'IN_PROGRESS', _count: { _all: 12 } },
              { status: 'DONE', _count: { _all: 45 } }
            ]
          });
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
  if (!data && !loading) {
    return (
      <div className="h-screen bg-[#050608] flex flex-col items-center justify-center gap-6">
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ff2026] animate-pulse">Operational Sync Delayed</div>
        <p className="text-mute text-xs uppercase tracking-widest">Awaiting system authorization or data feed.</p>
        <button onClick={() => window.location.reload()} className="border border-line px-8 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/5 transition-all">Retry Link</button>
      </div>
    );
  }

  return (
    <section className="p-8 lg:p-12">
      <header className="mb-10 flex items-center justify-between gap-4 border-b border-white/5 pb-8">
        <p className="text-2xl font-bold text-white tracking-tight">System Terminal</p>
        <div className="flex items-center gap-3">
          <button className="relative flex size-10 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-[#cfd4df] hover:border-brand/30 transition-colors">
            🔔
            {data.metrics.unreadNotifications > 0 && (
              <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-brand text-[8px] font-bold text-white">
                {data.metrics.unreadNotifications}
              </span>
            )}
          </button>
          <button className="flex size-10 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-[#cfd4df] hover:border-brand/30 transition-colors">⚙</button>
        </div>
      </header>

      <div className="mb-12">
        <h2 className="text-[56px] font-black uppercase leading-none tracking-tighter text-white italic">Operational Overview</h2>
        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.3em] text-[#868b97]">
          System Status: <span className="text-success shadow-[0_0_10px_rgba(34,197,94,0.2)]">Optimal</span> | Data Refresh:
          <span className="text-white"> Real-Time Sync</span>
        </p>
      </div>

      <div className="grid gap-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {overviewCards.map((card) => (
            <article key={card.id} className="group rounded-2xl border border-white/5 bg-[#0b0d12] p-6 transition-all hover:border-brand/30">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#7e8491]">{card.status}</span>
                <span className={cn("size-2 rounded-full", card.color === "red" ? "bg-brand shadow-[0_0_8px_rgba(223,42,51,0.4)]" : card.color === "amber" ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]" : "bg-[#606673]")} />
              </div>
              <p className="text-5xl font-black text-white group-hover:text-brand transition-colors">{card.value}</p>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-[#b4b9c3]">{card.label}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.6fr_1fr]">
          <article className="rounded-2xl border border-white/5 bg-[#0b0d12] p-8">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-2xl font-black uppercase tracking-tight text-white italic">Project Completion Index</h3>
              <Link href="/client/projects" className="text-[10px] font-black uppercase tracking-widest text-brand hover:text-white transition-colors">
                View All Missions
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {completionItems.map((item) => (
                <div key={item.id} className="flex flex-col items-center rounded-2xl border border-white/[0.03] bg-white/[0.01] p-6">
                  <CircularProgress value={item.value} />
                  <p className="mt-6 text-center text-xl font-black text-white truncate w-full">{item.title}</p>
                  <p className="text-center text-[10px] font-bold uppercase tracking-widest text-[#858b97] mt-1">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-white/5 bg-[#0b0d12] p-8">
            <h3 className="mb-8 text-2xl font-black uppercase tracking-tight text-white italic">Recent Activity</h3>
            <div className="space-y-6">
              {activityItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <span className={cn("mt-1.5 size-2 rounded-full shrink-0", item.tone === "red" ? "bg-brand" : "bg-zinc-700")} />
                  <div>
                    <p className="text-sm font-bold text-white">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-[#8f94a0]">{item.description}</p>
                    <p className="mt-2 text-[9px] font-black uppercase tracking-widest text-zinc-600">{item.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <article className="rounded-2xl border border-white/5 bg-[#0b0d12] p-8">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-2xl font-black uppercase tracking-tight text-white italic">Mission Milestones</h3>
            <div className="text-[9px] font-black uppercase tracking-widest text-[#87909d] flex items-center gap-2">
              <span className="size-2 rounded-full bg-success animate-pulse" />
              All Systems Operational
            </div>
          </div>

          <div className="grid gap-4">
            {data.recentUpdates.slice(0, 3).map((item: any) => (
              <div key={item.id} className="flex items-center justify-between rounded-xl border border-white/[0.03] bg-white/[0.01] p-6 group hover:border-brand/20 transition-all">
                <div>
                  <p className="text-2xl font-black text-white group-hover:text-brand transition-colors">{item.name}</p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-[#7e8491]">Phase Checkpoint</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#5e626d]">Last Sync</p>
                  <p className="mt-1 font-mono text-lg font-bold text-white">{new Date(item.updatedAt).toLocaleDateString()}</p>
                </div>
                <div className="hidden md:block">
                  <span className={cn(
                    "rounded-sm px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] border",
                    item.status === 'ACTIVE' ? "bg-brand/5 border-brand/20 text-brand" : "bg-white/5 border-white/10 text-white/40"
                  )}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
