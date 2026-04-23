"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GhostButton, ProgressBar, Section, StatusBadge } from "@/components/ui";

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  deadline: string;
  client: {
    companyName: string;
  };
}

export default function ProjectsClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch("/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const stats = [
    { label: "Active Nodes", value: projects.filter(p => p.status === 'ACTIVE').length.toString(), change: "+4", color: "text-brand" },
    { label: "Completion Rate", value: "88%", change: "+2%", color: "text-success" },
    { label: "Average Velocity", value: "42pts", change: "Stable", color: "text-white" },
    { label: "Total Projects", value: projects.length.toString(), change: "Live", color: "text-brand" },
  ];

  if (loading) {
    return <div className="flex h-[400px] items-center justify-center text-mute uppercase tracking-widest">Initialising Grid...</div>;
  }

  return (
    <div className="grid gap-8">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff2026]">Operations / Execution</p>
          <h1 className="display-title text-4xl text-white md:text-6xl">Project Delivery</h1>
          <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[#9897a1]">
            Monitor deployment status, resource allocation, and technical velocity across the engineering organization.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <GhostButton className="rounded-lg">Export Board</GhostButton>
          <Link
            href="/projects/create"
            className="inline-flex items-center justify-center gap-3 bg-[#ff2026] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#ff343a] rounded-lg shadow-[0_4px_14px_rgba(255,32,38,0.3)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Create Project
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-brand/10 border border-brand/20 p-4 rounded text-brand text-xs font-bold uppercase tracking-widest">
          Error: {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="panel-surface relative flex flex-col gap-2 rounded-xl bg-[#171719] p-6 shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9897a1]">{stat.label}</span>
            <div className="flex items-baseline justify-between">
              <span className="display-title text-3xl text-white">{stat.value}</span>
              <span className={`text-xs font-bold ${stat.color}`}>{stat.change}</span>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-white/5">
               <div className={`h-full ${stat.color.replace('text-', 'bg-')}`} style={{ width: '40%' }} />
            </div>
          </article>
        ))}
      </div>

      {/* Main Board */}
      <Section title="Project Board" eyebrow="Deployment Pipeline">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/[0.02]">
                {["ID", "Project Details", "Client", "Status", "Deadline", "Health / Velocity"].map((heading) => (
                  <th key={heading} className="px-8 py-5 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-[#9897a1]">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((project) => (
                <tr key={project.id} className="transition hover:bg-white/[0.02]">
                  <td className="px-8 py-6">
                    <span className="font-mono text-[10px] font-bold text-[#ff2026]/80">{project.id.substring(0, 8).toUpperCase()}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div>
                      <Link href={`/projects/${project.id}`} className="text-base font-bold text-white hover:text-[#ff2026] transition-colors">
                        {project.name}
                      </Link>
                      <div className="mt-1 flex items-center gap-3">
                         <div className="text-[10px] uppercase tracking-widest text-[#9897a1]/60">Technical Deployment</div>
                         <div className="flex -space-x-1.5">
                            {[1,2,3].map(i => (
                              <div key={i} className="h-4 w-4 rounded-full bg-zinc-700 border border-[#171719]" />
                            ))}
                         </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-medium text-white/80">{project.client.companyName}</div>
                  </td>
                  <td className="px-8 py-6">
                    <StatusBadge status={project.status} />
                  </td>
                  <td className="px-8 py-6 font-mono text-xs font-bold text-white">
                    {project.deadline ? new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) : 'N/A'}
                  </td>
                  <td className="px-8 py-6">
                    <div className="w-32">
                       <ProgressBar value={project.status === 'COMPLETED' ? 100 : 45} tone={project.status === 'COMPLETED' ? "white" : "red"} />
                       <div className="mt-2 flex justify-between text-[9px] font-bold uppercase tracking-widest text-[#9897a1]">
                          <span>{project.status === 'COMPLETED' ? '100%' : '45%'}</span>
                          <span>Signal Stable</span>
                       </div>
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-[#9897a1] uppercase text-xs tracking-widest font-bold">
                    No projects found in local grid.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.01] px-8 py-4">
           <div className="text-[10px] font-bold uppercase tracking-widest text-[#9897a1]/40">
              {projects.length} Nodes Synchronized • Active Deployment Grid
           </div>
           <div className="flex gap-2">
              <button className="h-8 w-8 rounded border border-white/5 bg-white/5 transition hover:bg-white/10 flex items-center justify-center">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9897a1" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button className="h-8 w-8 rounded border border-white/5 bg-white/5 transition hover:bg-white/10 flex items-center justify-center">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9897a1" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
              </button>
           </div>
        </div>
      </Section>
    </div>
  );
}
