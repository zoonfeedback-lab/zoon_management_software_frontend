"use client";

import { useState } from "react";

export default function MyTasksClient() {
  const [tasks] = useState([
    {
      id: 1,
      title: "Finalize API Security Architecture",
      desc: "Review OAuth2 implementation with the backend team.",
      project: "NEON-ALPHA",
      priority: "CRITICAL",
      priorityColor: "border-[#ff2026] text-[#ff2026]",
      dotColor: "bg-[#ff2026]",
      status: "IN PROGRESS",
      deadline: "DUE TODAY",
      deadlineColor: "text-[#ff2026]",
      icon: "progress"
    },
    {
      id: 2,
      title: "Sprint Planning - Phase 4",
      desc: "Assign resources and define milestones for Q4 rollout.",
      project: "OPERATIONS",
      priority: "HIGH",
      priorityColor: "border-white/80 text-white",
      dotColor: "bg-white",
      status: "TODO",
      deadline: "OCT 24",
      deadlineColor: "text-zinc-500",
      icon: "todo"
    },
    {
      id: 3,
      title: "Update Risk Assessment Log",
      desc: "Include recent compliance updates from legal department.",
      project: "COMPLIANCE",
      priority: "MEDIUM",
      priorityColor: "border-zinc-600 text-zinc-500",
      dotColor: "bg-zinc-600",
      status: "TODO",
      deadline: "OCT 28",
      deadlineColor: "text-zinc-500",
      icon: "todo"
    },
    {
      id: 4,
      title: "Draft Stakeholder Report",
      desc: "Internal memo regarding performance metrics.",
      project: "REPORTING",
      priority: "LOW",
      priorityColor: "border-zinc-700 text-zinc-600",
      dotColor: "bg-zinc-700",
      status: "COMPLETED",
      deadline: "YESTERDAY",
      deadlineColor: "text-zinc-600",
      icon: "done",
      completed: true
    }
  ]);

  return (
    <div className="p-8 md:p-10 max-w-[1600px] mx-auto flex flex-col gap-8 h-full overflow-y-auto bg-[#09090b]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <h1 className="text-xl font-bold text-white tracking-wide uppercase mb-2">PERSONAL BACKLOG</h1>
           <p className="text-zinc-400 font-medium tracking-wide">7 Tasks remaining for Sprint 24A • Q3 Execution</p>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-3 px-6 py-2.5 bg-[#171719] border border-white/5 hover:bg-white/5 transition-colors text-white text-xs font-black tracking-widest uppercase rounded">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              FILTER
           </button>
           <button className="flex items-center gap-3 px-6 py-2.5 bg-[#ff2026] hover:bg-[#ff343a] transition-colors text-white text-xs font-black tracking-widest uppercase rounded">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              ADD TASK
           </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <div className="bg-[#171719] border border-white/5 p-6 flex flex-col justify-between h-[100px] rounded">
            <div className="text-[10px] font-black text-zinc-500 tracking-widest uppercase">TODO</div>
            <div className="text-3xl font-medium text-white">04</div>
         </div>
         <div className="bg-[#171719] border border-[#ff2026] p-6 flex flex-col justify-between h-[100px] rounded relative">
            <div className="absolute top-4 right-4 text-[#ff2026] font-black text-xs">!</div>
            <div className="text-[10px] font-black text-[#ff2026] tracking-widest uppercase">IN PROGRESS</div>
            <div className="text-3xl font-medium text-white">02</div>
         </div>
         <div className="bg-[#171719] border border-white/5 p-6 flex flex-col justify-between h-[100px] rounded">
            <div className="text-[10px] font-black text-zinc-500 tracking-widest uppercase">REVIEW</div>
            <div className="text-3xl font-medium text-white">01</div>
         </div>
         <div className="bg-[#171719] border border-white/5 p-6 flex flex-col justify-between h-[100px] rounded">
            <div className="text-[10px] font-black text-zinc-500 tracking-widest uppercase">DONE</div>
            <div className="text-3xl font-medium text-white">128</div>
         </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-[#0b0b0d] border border-white/5 rounded overflow-hidden">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="border-b border-white/5 text-[9px] font-black text-zinc-500 tracking-widest uppercase bg-[#121214]">
                  <th className="px-6 py-4 font-medium w-[50%]">TASK IDENTITY</th>
                  <th className="px-6 py-4 font-medium">PROJECT</th>
                  <th className="px-6 py-4 font-medium">PRIORITY</th>
                  <th className="px-6 py-4 font-medium text-right">STATUS / DEADLINE</th>
               </tr>
            </thead>
            <tbody>
               {tasks.map((task) => (
                  <tr key={task.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                     <td className="px-6 py-5 flex items-start gap-4">
                        <div className="mt-1 flex-shrink-0">
                           {task.icon === "progress" && (
                              <div className="w-5 h-5 rounded-full border-2 border-[#ff2026] flex items-center justify-center">
                                 <div className="w-2.5 h-2.5 rounded-full bg-[#ff2026]" />
                              </div>
                           )}
                           {task.icon === "todo" && (
                              <div className="w-5 h-5 rounded-full border-2 border-zinc-600" />
                           )}
                           {task.icon === "done" && (
                              <div className="w-5 h-5 rounded-full border-2 border-emerald-500 bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                              </div>
                           )}
                        </div>
                        <div>
                           <div className={`text-sm font-bold tracking-wide mb-1 ${task.completed ? 'text-zinc-500 line-through' : 'text-white'}`}>
                              {task.title}
                           </div>
                           <div className="text-[10px] text-zinc-500">{task.desc}</div>
                        </div>
                     </td>
                     <td className="px-6 py-5">
                        <span className="inline-flex px-2 py-1 bg-white/5 rounded text-[8px] font-black text-zinc-400 tracking-widest uppercase">
                           {task.project}
                        </span>
                     </td>
                     <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 border text-[8px] font-black tracking-widest uppercase rounded-full ${task.priorityColor}`}>
                           <span className={`w-1.5 h-1.5 rounded-full ${task.dotColor}`} />
                           {task.priority}
                        </span>
                     </td>
                     <td className="px-6 py-5 text-right">
                        <div className={`text-sm font-bold uppercase tracking-wide mb-1 ${task.completed ? 'text-emerald-600 italic' : 'text-white'}`}>
                           {task.status}
                        </div>
                        <div className={`text-[9px] font-black uppercase tracking-widest ${task.deadlineColor}`}>
                           {task.deadline}
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
         {/* WEEKLY PERFORMANCE */}
         <div className="bg-[#171719] border border-white/5 border-l-4 border-l-[#ff2026] p-6 rounded flex flex-col justify-between">
            <h2 className="text-xs font-bold tracking-widest uppercase text-zinc-400 mb-8">WEEKLY PERFORMANCE</h2>
            <div>
               <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-white tracking-widest uppercase">VELOCITY INDEX</span>
                  <span className="text-[10px] font-black text-[#ff2026] tracking-widest uppercase">92%</span>
               </div>
               <div className="w-full h-1 bg-zinc-800 rounded-full mb-4">
                  <div className="h-full bg-[#ff2026] w-[92%] rounded-full shadow-[0_0_8px_rgba(255,32,38,0.5)]" />
               </div>
               <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
                  EXCEEDING BASELINE THROUGHPUT BY +14% COMPARED TO PREVIOUS SPRINT PERIOD.
               </p>
            </div>
         </div>

         {/* BLOCKED BY ME */}
         <div className="bg-[#171719] border border-white/5 p-6 rounded flex flex-col">
            <h2 className="text-xs font-bold tracking-widest uppercase text-zinc-400 mb-6">BLOCKED BY ME</h2>
            <div className="flex flex-col gap-5 flex-1 justify-center">
               <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 shrink-0 grid place-items-center overflow-hidden">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Delta" alt="Avatar" className="w-full h-full opacity-80" />
                  </div>
                  <div>
                     <div className="text-xs font-bold text-white tracking-wide mb-1">Dev Team Delta</div>
                     <div className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">WAITING FOR ARCHITECTURAL SIGN-OFF</div>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 shrink-0 grid place-items-center overflow-hidden">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Owner" alt="Avatar" className="w-full h-full opacity-80" />
                  </div>
                  <div>
                     <div className="text-xs font-bold text-white tracking-wide mb-1">Product Owner</div>
                     <div className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">REVIEWING BUDGET FOR Q4 EXPANSION</div>
                  </div>
               </div>
            </div>
         </div>

         {/* SYSTEM HEALTH */}
         <div className="bg-[#171719] border border-white/5 p-6 rounded flex flex-col justify-between">
            <h2 className="text-xs font-bold tracking-widest uppercase text-zinc-400 mb-6">SYSTEM HEALTH</h2>
            <div className="flex-1 flex flex-col justify-center gap-6">
               <div className="flex items-center gap-4">
                  <svg className="w-8 h-8 text-[#ff2026]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  <div>
                     <div className="text-lg font-medium text-white mb-1">OPTIMAL</div>
                     <div className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">LATENCY: 24MS • UPTIME: 99.9%</div>
                  </div>
               </div>
               <button className="w-full bg-[#121214] border border-white/5 hover:bg-white/5 transition-colors text-white font-bold text-[9px] uppercase tracking-widest py-3 rounded">
                  VIEW FULL SYSTEM LOGS
               </button>
            </div>
         </div>
      </div>

    </div>
  );
}
