"use client";

import { useState } from "react";
import { BarChart, Section } from "@/components/ui";

export default function ReportsClient() {
  const [dateRange, setDateRange] = useState("Q3 2024");

  const projectPerformance = [
    { label: "Genesis", value: 85, maxValue: 100 },
    { label: "Epsilon", value: 62, maxValue: 100 },
    { label: "Nexus", value: 94, maxValue: 100 },
    { label: "Titan", value: 45, maxValue: 100 },
    { label: "Aether", value: 78, maxValue: 100 },
  ];

  const teamVelocity = [
    { label: "WK 32", value: 120, maxValue: 150 },
    { label: "WK 33", value: 142, maxValue: 150 },
    { label: "WK 34", value: 98, maxValue: 150 },
    { label: "WK 35", value: 135, maxValue: 150 },
    { label: "WK 36", value: 150, maxValue: 150 },
  ];

  return (
    <div className="grid gap-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff2026]">Intelligence / Analytics</p>
          <h1 className="display-title text-4xl text-white md:text-6xl font-bold">Performance Matrix</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#9897a1]">
            Analyze engineering throughput, project health trajectories, and resource efficiency across the grid.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-[#0b0b0d] border border-white/10 text-[#9897a1] px-4 py-3 text-[10px] font-bold uppercase tracking-widest rounded-lg outline-none focus:border-brand/30"
          >
            <option>Q1 2024</option>
            <option>Q2 2024</option>
            <option>Q3 2024</option>
            <option>Q4 2024</option>
          </select>
          <button className="inline-flex items-center justify-center gap-3 bg-[#ff2026] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#ff343a] rounded-lg shadow-[0_4px_14px_rgba(255,32,38,0.3)]">
            Export Intelligence
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Project Delivery Index" eyebrow="Completion %">
           <div className="p-8">
              <BarChart data={projectPerformance} />
           </div>
        </Section>
        
        <Section title="Engineering Velocity" eyebrow="Story Points / Week">
           <div className="p-8">
              <BarChart data={teamVelocity} />
           </div>
        </Section>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {[
          { label: "SLA Compliance", value: "99.4%", status: "OPTIMAL", color: "text-success" },
          { label: "Average Cycle Time", value: "4.2 Days", status: "STABLE", color: "text-white" },
          { label: "QA Failure Rate", value: "2.1%", status: "DECREASING", color: "text-success" },
        ].map((metric) => (
          <article key={metric.label} className="panel-surface relative flex flex-col gap-3 overflow-hidden rounded-xl bg-[#171719] p-7 shadow-xl border border-transparent hover:border-white/5 transition-colors">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9897a1]">{metric.label}</span>
            <div className="display-title text-3xl font-bold text-white md:text-4xl">{metric.value}</div>
            <div className={`text-[10px] font-black uppercase tracking-widest ${metric.color}`}>
              {metric.status}
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-white/5">
               <div className={`h-full ${metric.color.replace('text-', 'bg-')}`} style={{ width: '70%' }} />
            </div>
          </article>
        ))}
      </div>

      <Section title="Operational Insights" eyebrow="Automated Synthesis">
         <div className="p-8 grid gap-6">
            <div className="flex gap-6 items-start">
               <div className="h-2 w-2 mt-2 rounded-full bg-brand shadow-[0_0_8px_rgba(255,32,38,0.5)]" />
               <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Velocity Bottleneck Detected</h4>
                  <p className="mt-2 text-xs text-[#9897a1] leading-relaxed">Project Epsilon code reviews are averaging 18 hours longer than the organizational baseline. Recommendation: Reallocate 2 Senior Engineers from Nexus.</p>
               </div>
            </div>
            <div className="flex gap-6 items-start">
               <div className="h-2 w-2 mt-2 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
               <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Infrastructure Stability High</h4>
                  <p className="mt-2 text-xs text-[#9897a1] leading-relaxed">Uptime across all deployment nodes reached 99.998% during the Q3 scaling event. Resource cost optimized by 12%.</p>
               </div>
            </div>
         </div>
      </Section>
    </div>
  );
}
