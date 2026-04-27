"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GhostButton, ProgressBar, Section, StatusBadge } from "@/components/ui";
import { CreateProjectModal } from "@/components/modals";

import { api } from "@/lib/api";

interface OverviewData {
  projects: any[];
  metrics: {
    totalProjects: number;
    totalEmployees: number;
    totalClients: number;
    activeTasks: number;
  };
}

export default function OverviewClient() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [pRes, uRes, cRes, tRes] = await Promise.all([
        api.get("/projects"),
        api.get("/employees"),
        api.get("/clients"),
        api.get("/tasks"),
      ]);

      if (pRes.ok && uRes.ok && cRes.ok && tRes.ok) {
        const projects = (await pRes.json()).data;
        const employees = (await uRes.json()).data;
        const clients = (await cRes.json()).data;
        const tasks = (await tRes.json()).data;

        setData({
          projects,
          metrics: {
            totalProjects: projects.length,
            totalEmployees: employees.length,
            totalClients: clients.length,
            activeTasks: tasks.filter((t: any) => t.status !== "DONE").length,
          }
        });
      }
    } catch (err) {
      console.error("Failed to sync overview data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex h-[400px] items-center justify-center text-mute uppercase tracking-[0.2em]">Synchronizing Command Center...</div>;
  }

  const metrics = [
    { label: "Total Projects", value: data?.metrics.totalProjects || 0, note: "Authorized Programs", accent: "red" },
    { label: "Active Nodes", value: data?.metrics.totalClients || 0, note: "Partner Connections", accent: "red" },
    { label: "Mission Queue", value: data?.metrics.activeTasks || 0, note: "Pending Execution", accent: "white" },
    { label: "Team Members", value: data?.metrics.totalEmployees || 0, note: "Verified Personnel", accent: "red" },
  ];

  return (
    <>
      <div className="grid gap-8">
        <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff2026]">ZOON / Command Center</p>
            <h1 className="display-title text-3xl text-white md:text-5xl font-bold">Engineering Hub</h1>
            <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[#9897a1]">
              Monitor active programs, deployment nodes, and technical velocity from a unified precision-built operating view.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <GhostButton className="rounded-lg">Live Server Status</GhostButton>
            <button
              onClick={() => setIsProjectModalOpen(true)}
              className="inline-flex items-center justify-center gap-3 bg-[#ff2026] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#ff343a] rounded-lg shadow-[0_4px_14px_rgba(255,32,38,0.3)]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              New Project
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
          {metrics.map((metric, index) => (
            <article key={metric.label} className="panel-surface relative flex flex-col gap-3 overflow-hidden rounded-xl bg-[#171719] p-6 shadow-xl border border-transparent hover:border-white/5 transition-colors">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9897a1]">{metric.label}</span>
              <div className="display-title text-3xl font-bold text-white md:text-4xl">{metric.value}</div>
              <div className={`text-xs font-bold ${metric.accent === "green" ? "text-success" : metric.accent === "red" ? "text-brand" : "text-[#9897a1]/60"}`}>
                {metric.note}
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-full bg-white/5">
                 <div className={`h-full ${metric.accent === 'green' ? 'bg-success' : metric.accent === 'red' ? 'bg-brand' : 'bg-white/20'}`} style={{ width: index === 0 ? '60%' : index === 1 ? '40%' : '80%' }} />
              </div>
            </article>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <Section title="Active Pipeline" eyebrow="Operations Control">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white/[0.01]">
                  {["Project Details", "Client", "Status", "Progress", "Deadline"].map((heading) => (
                    <th key={heading} className="px-8 py-5 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-[#9897a1]">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(data?.projects || []).slice(0, 5).map((project) => (
                  <tr key={project.id} className="transition hover:bg-white/[0.02]">
                    <td className="px-8 py-6">
                      <Link href={`/projects/${project.id}`} className="font-bold text-white hover:text-[#ff2026] transition-colors">
                        {project.name}
                      </Link>
                    </td>
                    <td className="px-8 py-6 text-sm text-[#9897a1]">{project.client?.companyName || "Internal"}</td>
                    <td className="px-8 py-6"><StatusBadge status={project.status} /></td>
                    <td className="px-8 py-6">
                       <div className="w-24">
                          <ProgressBar value={project.status === 'COMPLETED' ? 100 : 45} tone={project.status === 'COMPLETED' ? "white" : "red"} />
                       </div>
                    </td>
                    <td className="px-8 py-6 font-mono text-xs font-bold text-white">{new Date(project.deadline).toLocaleDateString([], { month: 'short', day: '2-digit' })}</td>
                  </tr>
                ))}
                {(data?.projects.length === 0) && (
                   <tr>
                     <td colSpan={5} className="px-8 py-10 text-center text-xs font-black uppercase tracking-widest text-[#9897a1]/40">No active programs in pipeline.</td>
                   </tr>
                )}
              </tbody>
              </table>
            </div>
          </Section>

          <Section title="Recent Activity" eyebrow="Signals Grid">
            <div className="grid divide-y divide-white/5">
              {[
                { title: "System Online", detail: "ZOON Engineering Hub connected to NestJS backend nodes.", timestamp: "Just Now", tone: "red" },
                { title: "Encryption Active", detail: "TLS 1.3 tunnel established for all partner communication.", timestamp: "2 mins ago", tone: "white" },
                { title: "Grid Sync Success", detail: "Global personnel directory synchronized with main terminal.", timestamp: "5 mins ago", tone: "red" },
              ].map((item) => (
                <div key={item.title} className="grid grid-cols-[3px_minmax(0,1fr)] gap-5 p-6 transition hover:bg-white/[0.02]">
                  <div className={`h-full ${item.tone === "red" ? "bg-brand shadow-[0_0_8px_rgba(255,32,38,0.5)]" : "bg-zinc-700"}`} />
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#9897a1]/70">{item.detail}</p>
                    <p className="mt-3 text-[9px] font-black uppercase tracking-widest text-brand">{item.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>

      <CreateProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onCreate={() => fetchData()}
      />
    </>
  );
}
