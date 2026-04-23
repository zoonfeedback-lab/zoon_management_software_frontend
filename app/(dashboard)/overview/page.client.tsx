"use client";

import Link from "next/link";
import { useState } from "react";
import { GhostButton, ProgressBar, Section, StatusBadge } from "@/components/ui";
import { CreateProjectModal } from "@/components/modals";
import { overviewMetrics, projects, recentActivity } from "@/lib/data";

export default function OverviewClient() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  return (
    <>
      <div className="grid gap-8">
        <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff2026]">Zoon / Command Center</p>
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
          {overviewMetrics.map((metric, index) => (
            <article key={metric.label} className="panel-surface relative flex flex-col gap-3 overflow-hidden rounded-xl bg-[#171719] p-6 shadow-xl">
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
                  {["Project Details", "Client", "Status", "Velocity", "Deadline"].map((heading) => (
                    <th key={heading} className="px-8 py-5 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-[#9897a1]">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projects.slice(0, 4).map((project) => (
                  <tr key={project.id} className="transition hover:bg-white/[0.02]">
                    <td className="px-8 py-6">
                      <Link href={`/projects/${project.id}`} className="font-bold text-white hover:text-[#ff2026] transition-colors">
                        {project.name}
                      </Link>
                    </td>
                    <td className="px-8 py-6 text-sm text-[#9897a1]">{project.client}</td>
                    <td className="px-8 py-6"><StatusBadge status={project.status} /></td>
                    <td className="px-8 py-6">
                       <div className="w-24">
                          <ProgressBar value={project.progress} tone={project.progress > 70 ? "white" : "red"} />
                       </div>
                    </td>
                    <td className="px-8 py-6 font-mono text-xs font-bold text-white">{project.deadline}</td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
          </Section>

          <Section title="Recent Activity" eyebrow="Signals Grid">
            <div className="grid divide-y divide-white/5">
              {recentActivity.map((item) => (
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
      />
    </>
  );
}
