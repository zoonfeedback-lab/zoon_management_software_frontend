"use client";

import { useState } from "react";
import Link from "next/link";
import { ProgressBar } from "@/components/ui";

const DUMMY_PROJECTS = [
  { id: "ATLAS-01", name: "ATLAS DATABASE", subtitle: "Cloud Infrastructure", status: "STABLE", health: "optimal", progress: 92, resources: "8 Nodes / 12 Devs" },
  { id: "ZENITH-02", name: "ZENITH UI KIT", subtitle: "Frontend Component Library", status: "WARN", health: "degraded", progress: 45, resources: "4 Design / 6 Front" },
  { id: "QUANTUM-03", name: "QUANTUM SHIELD", subtitle: "Security Middleware", status: "BLOCKED", health: "critical", progress: 12, resources: "SecOps Team A" },
];

const RECENT_LOGS = [
  { time: "14:22:01", type: "USER", msg: "alpha_lead MERGED feature/api-auth-v2 INTO develop", status: "success" },
  { time: "14:19:44", type: "SYSTEM", msg: "latency_spike DETECTED in us-east-1 (240ms)", status: "warn" },
  { time: "14:15:20", type: "DEPLOY", msg: "nova_core_v4 BUILD_SUCCESS (stage: staging)", status: "success" },
  { time: "13:58:12", type: "ADMIN", msg: "access_token REFRESHED for external_integrations", status: "info" },
];

export default function ClientProjectsClient() {
  return (
    <div className="min-h-screen bg-[#050608] p-4 md:p-8 text-white font-sans selection:bg-brand/30">
      {/* Header HUD */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12 border-b border-white/5 pb-10">
        <div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-white leading-none">
            Project Portfolio
          </h1>
          <p className="mt-4 text-[#9897a1] text-sm md:text-base font-medium tracking-wide max-w-xl">
            Active deployment oversight and real-time performance tracking for all synchronized mission nodes.
          </p>
        </div>
        
        <div className="flex gap-4 w-full lg:w-auto">
          <div className="flex-1 lg:w-40 bg-[#111214] border border-white/5 p-4 rounded-sm">
             <p className="text-[9px] font-black uppercase tracking-widest text-[#5e5f66] mb-1">Portfolio Health</p>
             <p className="text-3xl font-black text-brand italic">94.2%</p>
          </div>
          <div className="flex-1 lg:w-40 bg-[#111214] border border-white/5 p-4 rounded-sm">
             <p className="text-[9px] font-black uppercase tracking-widest text-[#5e5f66] mb-1">Active Sprints</p>
             <p className="text-3xl font-black text-white italic">12</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 mb-8">
        {/* Featured Project Card */}
        <div className="lg:col-span-8 bg-[#111214] border border-white/5 p-8 rounded-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4">
              <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                    <div key={i} className="size-8 rounded-full border-2 border-[#111214] bg-zinc-800 flex items-center justify-center text-[8px] font-bold">U{i}</div>
                 ))}
                 <div className="size-8 rounded-full border-2 border-[#111214] bg-brand/20 text-brand flex items-center justify-center text-[8px] font-bold">+4</div>
              </div>
           </div>

           <div className="flex items-center gap-3 mb-6">
              <span className="bg-brand/10 text-brand text-[8px] font-black px-2 py-0.5 border border-brand/20 uppercase tracking-widest">Critical</span>
              <h2 className="text-2xl font-black uppercase tracking-tight italic">Project: Nova Core V4</h2>
           </div>
           
           <p className="text-[#5e5f66] text-sm max-w-md mb-10 leading-relaxed font-medium">
              Infrastructure migration for the primary data processing engine. 
              Approaching Phase 3 deployment deadline.
           </p>

           <div className="grid grid-cols-3 gap-10 mb-10">
              <div>
                 <p className="text-[9px] font-black uppercase tracking-widest text-[#5e5f66] mb-2">Progress</p>
                 <div className="h-1 bg-white/5 w-full rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-brand w-[78%]" />
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/80">Deployment <span className="text-brand ml-2">78%</span></p>
              </div>
              <div>
                 <p className="text-[9px] font-black uppercase tracking-widest text-[#5e5f66] mb-2">Stability</p>
                 <div className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/80">Optimal (99.9%)</p>
                 </div>
              </div>
              <div>
                 <p className="text-[9px] font-black uppercase tracking-widest text-[#5e5f66] mb-2">Deadline</p>
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/80">OCT 24, 2024</p>
              </div>
           </div>

           <div className="flex gap-4">
              <button className="bg-brand text-white text-[10px] font-black uppercase tracking-[0.2em] px-8 py-4 hover:bg-[#ff343a] transition-all shadow-[0_0_25px_rgba(255,32,38,0.2)]">Launch Console</button>
              <button className="border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] px-8 py-4 hover:bg-white/5 transition-all">Project Logs</button>
           </div>
           
           {/* Decorative Icon */}
           <svg className="absolute -right-6 -bottom-6 size-48 text-white/[0.02] -rotate-12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
        </div>

        {/* Deadlines Widget */}
        <div className="lg:col-span-4 bg-[#111214] border border-white/5 p-8 rounded-sm">
           <h3 className="text-sm font-black uppercase tracking-widest mb-8 text-white/90">Upcoming Deadlines</h3>
           <div className="space-y-6 mb-8">
              {[
                { day: "12", month: "OCT", title: "API Security Audit", project: "Quantum Shield" },
                { day: "15", month: "OCT", title: "Stakeholder Sync", project: "Atlas DB" },
                { day: "19", month: "OCT", title: "Legacy Decommission", project: "Legacy Sync" },
              ].map((d, i) => (
                <div key={i} className="flex gap-4 items-center group cursor-pointer">
                   <div className="size-12 bg-white/[0.03] border border-white/5 flex flex-col items-center justify-center rounded-sm group-hover:border-brand/30 transition-colors">
                      <p className="text-lg font-black leading-none text-white/80">{d.day}</p>
                      <p className="text-[8px] font-black text-[#5e5f66]">{d.month}</p>
                   </div>
                   <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-white/90 mb-1">{d.title}</h4>
                      <p className="text-[8px] font-bold uppercase tracking-widest text-[#5e5f66]">Project: {d.project}</p>
                   </div>
                </div>
              ))}
           </div>
           <button className="w-full py-4 border border-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-[#5e5f66] hover:text-white hover:bg-white/5 transition-all rounded-sm">View Full Calendar</button>
        </div>
      </div>

      {/* Project Fleet Matrix */}
      <div className="bg-[#111214] border border-white/5 rounded-sm overflow-hidden mb-8">
         <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <h3 className="text-xl font-black uppercase tracking-tight italic">Project Fleet</h3>
            <div className="flex gap-2">
               <button className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 text-white">Filter: All</button>
               <button className="text-[9px] font-black uppercase tracking-widest px-3 py-1 border border-white/5 text-[#5e5f66]">Sort: Health</button>
            </div>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="text-[8px] font-black uppercase tracking-[0.2em] text-[#4a4b51] border-b border-white/5">
                     <th className="px-8 py-5">Project Identity</th>
                     <th className="px-8 py-5">Health Status</th>
                     <th className="px-8 py-5">Progress Vector</th>
                     <th className="px-8 py-5">Resources</th>
                     <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/[0.02]">
                  {DUMMY_PROJECTS.map(p => (
                    <tr key={p.id} className="group hover:bg-white/[0.01] transition-colors">
                       <td className="px-8 py-6">
                          <h4 className="text-xs font-black text-white mb-1 uppercase tracking-wider">{p.name}</h4>
                          <p className="text-[9px] text-[#5e5f66] uppercase tracking-widest">{p.subtitle}</p>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                             <div className={`size-1.5 rounded-full ${
                               p.health === 'optimal' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 
                               p.health === 'degraded' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]' : 
                               'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]'
                             }`} />
                             <span className="text-[9px] font-black uppercase tracking-widest text-white/70">{p.status}</span>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="h-1 bg-white/5 w-40 rounded-full overflow-hidden">
                                <div className={`h-full ${p.progress > 80 ? 'bg-brand' : p.progress > 40 ? 'bg-yellow-500' : 'bg-red-500'} w-[${p.progress}%]`} style={{ width: `${p.progress}%` }} />
                             </div>
                             <span className="text-[10px] font-black text-white/50">{p.progress}%</span>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-[10px] font-bold text-[#5e5f66] uppercase tracking-widest">{p.resources}</td>
                       <td className="px-8 py-6 text-right">
                          <button className="text-zinc-600 hover:text-brand transition-colors">
                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
         {/* Resource Allocation */}
         <div className="bg-[#111214] border border-white/5 p-8 rounded-sm relative h-[400px] flex flex-col">
            <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5e5f66] mb-8">Resource Allocation</h3>
            <div className="flex-1 flex items-center justify-center relative">
               <div className="size-64 rounded-full border-[16px] border-white/5 flex flex-col items-center justify-center">
                  <p className="text-5xl font-black italic tracking-tighter text-white">75%</p>
                  <p className="text-[9px] font-black text-[#5e5f66] uppercase tracking-[0.2em]">Engaged</p>
               </div>
               {/* Simplified Donut Segments with SVG */}
               <svg className="absolute size-64 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="transparent" stroke="#ff2026" strokeWidth="16" strokeDasharray="197 264" />
               </svg>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/5">
               <div>
                  <p className="text-[8px] font-black text-[#5e5f66] uppercase mb-1">Development</p>
                  <p className="text-xs font-black text-white">88%</p>
               </div>
               <div>
                  <p className="text-[8px] font-black text-[#5e5f66] uppercase mb-1">Design</p>
                  <p className="text-xs font-black text-white">42%</p>
               </div>
               <div>
                  <p className="text-[8px] font-black text-[#5e5f66] uppercase mb-1">QA / Testing</p>
                  <p className="text-xs font-black text-white">95%</p>
               </div>
            </div>
         </div>

         {/* Deployment Logs */}
         <div className="bg-[#111214] border border-white/5 p-8 rounded-sm flex flex-col h-[400px]">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5e5f66]">Deployment Logs</h3>
               <div className="flex items-center gap-2">
                  <div className="size-1 bg-brand rounded-full animate-ping" />
                  <span className="text-[9px] font-black text-brand uppercase tracking-widest">Live Stream</span>
               </div>
            </div>
            
            <div className="flex-1 space-y-4 font-mono text-[10px] overflow-hidden">
               {RECENT_LOGS.map((log, i) => (
                 <div key={i} className="flex gap-4 items-start opacity-70 hover:opacity-100 transition-opacity">
                    <span className="text-zinc-600 shrink-0">{log.time}</span>
                    <div className={`size-1.5 rounded-full mt-1 shrink-0 ${
                      log.status === 'success' ? 'bg-green-500' : log.status === 'warn' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <p className="leading-relaxed">
                       <span className="text-white/40 uppercase mr-2">{log.type}:</span>
                       <span className="text-white/80">{log.msg}</span>
                    </p>
                 </div>
               ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
               <div className="flex gap-3">
                  <div className="size-8 bg-brand border border-brand shadow-[0_0_15px_rgba(255,32,38,0.3)] grid place-items-center cursor-pointer">
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
