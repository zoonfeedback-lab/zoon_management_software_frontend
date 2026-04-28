"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate: string;
  assignedTo?: { fullName: string };
  project?: { name: string };
}

export default function ManagerPortalClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mocking the fetch for now as per UI, or fetching from /tasks
    const mockTasks = [
      { id: "ZL-902", title: "API Infrastructure Audit", status: "TODO", priority: "MEDIUM", dueDate: "Oct 24", assignedTo: { fullName: "Jane D." } },
      { id: "ZL-104", title: "Core Shader Refactor", status: "TODO", priority: "HIGH", dueDate: "Oct 25", assignedTo: { fullName: "Mike R." } },
      { id: "ZL-771", title: "Database Migration: Region 04", status: "IN_PROGRESS", priority: "CRITICAL", dueDate: "Oct 26", assignedTo: { fullName: "Sarah M." } },
      { id: "ZL-844", title: "User Authentication Flow Redesign", status: "REVISION", priority: "HIGH", dueDate: "Oct 28", assignedTo: { fullName: "David K." }, description: "Implementation of the OAuth2 protocol for third-party integrations." }
    ];
    setTasks(mockTasks as any);
    setLoading(false);
  }, []);

  const backlog = tasks.filter(t => t.status === "TODO");
  const inProgress = tasks.filter(t => t.status === "IN_PROGRESS");
  const revision = tasks.filter(t => t.status === "REVISION");

  return (
    <div className="flex h-full bg-[#09090b]">
      {/* Main Board Area */}
      <div className="flex-1 overflow-x-auto p-6 flex gap-6">
        
        {/* BACKLOG Column */}
        <div className="w-[320px] shrink-0 flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">BACKLOG</span>
             </div>
             <div className="text-[10px] font-mono text-zinc-500 bg-[#171719] px-2 py-0.5 rounded">0{backlog.length}</div>
          </div>
          
          <div className="flex flex-col gap-3">
             {backlog.map(task => (
               <div key={task.id} className="bg-[#1c1c1f] border border-white/5 p-4 rounded cursor-pointer hover:border-white/20 transition-colors">
                  <div className="flex justify-between items-center mb-3">
                     <span className="text-[9px] font-mono text-zinc-500 uppercase">#{task.id}</span>
                     <button className="text-zinc-600 hover:text-white transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                     </button>
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-wide mb-4">{task.title}</h3>
                  <div className="flex items-center justify-between mt-auto">
                     <div className="flex items-center gap-2">
                        {task.title.includes("Shader") && <span className="text-[9px] font-mono border border-white/10 px-2 py-0.5 rounded text-zinc-400">Graphics</span>}
                        <div className="w-5 h-5 rounded-full bg-blue-900 border border-white/20 shadow-[0_0_8px_rgba(30,58,138,0.5)] grid place-items-center text-[8px] font-bold">
                           {task.assignedTo?.fullName.charAt(0)}
                        </div>
                     </div>
                     {task.dueDate && <span className="text-[9px] font-mono text-zinc-500 flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> {task.dueDate}</span>}
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* IN PROGRESS Column */}
        <div className="w-[320px] shrink-0 flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">IN PROGRESS</span>
             </div>
             <div className="text-[10px] font-mono text-zinc-500 bg-[#171719] px-2 py-0.5 rounded">0{inProgress.length}</div>
          </div>
          
          <div className="flex flex-col gap-3">
             {inProgress.map(task => (
               <div key={task.id} className="bg-[#1c1c1f] border border-white/5 p-4 rounded cursor-pointer hover:border-white/20 transition-colors relative overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#ff2026]" />
                  <div className="flex justify-between items-center mb-3">
                     <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase">#{task.id}</span>
                        {task.priority === 'CRITICAL' && <span className="text-[9px] font-black tracking-widest text-[#ff2026] uppercase">• CRITICAL</span>}
                     </div>
                     <span className="text-[#ff2026] font-bold text-xs">!</span>
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-wide mb-4">{task.title}</h3>
                  <div className="h-0.5 w-full bg-zinc-800 rounded-full mb-4 overflow-hidden">
                     <div className="h-full bg-[#ff2026] w-[60%]" />
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-5 h-5 rounded-full bg-emerald-900 border border-white/20 grid place-items-center text-[8px] font-bold">
                        {task.assignedTo?.fullName.charAt(0)}
                     </div>
                     <span className="text-[9px] font-mono text-zinc-500">Assigned to {task.assignedTo?.fullName}</span>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* REVISION Column */}
        <div className="w-[320px] shrink-0 flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff2026]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">REVISION</span>
             </div>
          </div>
          
          <div className="flex flex-col gap-3">
             {revision.map((task: any) => (
               <div key={task.id} className="bg-[#1c1c1f] border border-[#ff2026]/50 p-4 rounded cursor-pointer hover:border-[#ff2026] transition-colors">
                  <div className="flex justify-between items-center mb-3">
                     <span className="text-[9px] font-mono text-zinc-500 uppercase">#{task.id}</span>
                     <span className="text-[9px] font-black tracking-widest text-white bg-[#ff2026] px-1.5 py-0.5 rounded uppercase">ACT</span>
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-wide mb-2">{task.title}</h3>
                  <p className="text-[10px] text-zinc-500 leading-relaxed mb-4">{task.description}</p>
                  <div className="flex items-center gap-2">
                     <div className="w-5 h-5 rounded-full bg-orange-900 border border-white/20 grid place-items-center text-[8px] font-bold">
                        {task.assignedTo?.fullName.charAt(0)}
                     </div>
                     <span className="text-[9px] font-mono text-zinc-500">{task.assignedTo?.fullName}</span>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar Overlay for Task Revision (Mock) */}
      <div className="w-[380px] bg-[#121214] border-l border-white/5 flex flex-col shrink-0">
        <div className="p-6 border-b border-white/5">
           <h2 className="text-xl font-bold text-white mb-1">Revision...</h2>
           <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">TASK #ZL-844</div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
           <div className="relative pl-6 border-l border-white/10 space-y-8">
              <div className="relative">
                 <div className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-[#ff2026] ring-4 ring-[#121214]" />
                 <div className="text-[9px] font-black uppercase tracking-widest text-[#ff2026] mb-3">LATEST</div>
                 <div className="bg-[#1c1c1f] border border-[#ff2026]/30 p-4 rounded">
                    <p className="text-sm text-white font-medium">Update the OAuth2 callback handler to address the edge case where...</p>
                    <div className="mt-4 flex gap-2">
                       <div className="w-6 h-6 rounded bg-zinc-800 grid place-items-center"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-500"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
                       <button className="bg-[#ff2026] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded flex-1 text-center hover:bg-[#ff343a] transition-colors">ACT</button>
                    </div>
                 </div>
              </div>
              <div className="relative opacity-50">
                 <div className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-zinc-600 ring-4 ring-[#121214]" />
                 <div className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-3">REJECTED</div>
                 <div className="bg-[#1c1c1f] border border-white/5 p-4 rounded">
                    <p className="text-sm text-white font-medium">Initial implementation of the login flow...</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="p-6 border-t border-white/5 bg-[#0b0b0d]">
           <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3">ADD FEEDBACK</div>
           <textarea 
             placeholder="Enter rejection notes or feedback..." 
             className="w-full h-24 bg-[#171719] border border-white/10 rounded p-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ff2026]/50 resize-none mb-3 transition-colors"
           />
           <div className="flex justify-between items-center">
              <button className="text-zinc-500 hover:text-white"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg></button>
              <button className="bg-white text-black px-6 py-2 text-[10px] font-black tracking-widest uppercase hover:bg-zinc-200 transition-colors rounded">Send</button>
           </div>
        </div>
      </div>
    </div>
  );
}
