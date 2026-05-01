"use client";

import { useEffect, useState } from "react";
import { Section, PrimaryButton, GhostButton } from "@/components/ui";

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate: string;
  assignedTo?: { fullName: string };
  project?: { name: string };
   description?: string;
}

export default function ManagerPortalClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
   const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Mocking the fetch for now as per UI, or fetching from /tasks
    const mockTasks = [
      { id: "ZL-902", title: "API Infrastructure Audit", status: "TODO", priority: "MEDIUM", dueDate: "Oct 24", assignedTo: { fullName: "Jane D." } },
      { id: "ZL-104", title: "Core Shader Refactor", status: "TODO", priority: "HIGH", dueDate: "Oct 25", assignedTo: { fullName: "Mike R." } },
      { id: "ZL-771", title: "Database Migration: Region 04", status: "IN_PROGRESS", priority: "CRITICAL", dueDate: "Oct 26", assignedTo: { fullName: "Sarah M." } },
      { id: "ZL-844", title: "User Authentication Flow Redesign", status: "REVISION", priority: "HIGH", dueDate: "Oct 28", assignedTo: { fullName: "David K." }, description: "Implementation of the OAuth2 protocol for third-party integrations." }
    ];
      setTasks(mockTasks as Task[]);
    setLoading(false);
  }, []);

  const backlog = tasks.filter(t => t.status === "TODO");
  const inProgress = tasks.filter(t => t.status === "IN_PROGRESS");
  const revision = tasks.filter(t => t.status === "REVISION");

   const columns = [
      { key: "backlog", title: "Backlog", dot: "bg-zinc-500", items: backlog },
      { key: "in-progress", title: "In Progress", dot: "bg-white", items: inProgress },
      { key: "revision", title: "Revision", dot: "bg-[#ff2026]", items: revision },
   ];

   if (loading) {
      return <div className="grid h-[calc(100vh-170px)] place-items-center text-zinc-500 font-black uppercase tracking-[0.2em]">Synchronizing Workspace...</div>;
   }

   return (
      <div className="grid gap-6">
         <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#151518] via-[#111214] to-[#111214] p-6 md:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
               <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#ff2026]">Manager Workspace</p>
                  <h1 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">Sprint Execution Board</h1>
                  <p className="mt-3 max-w-2xl text-sm text-zinc-400 md:text-base">
                     Coordinate active delivery lanes, prioritize critical blockers, and accelerate release readiness.
                  </p>
               </div>
               <div className="grid grid-cols-3 gap-3 md:gap-4">
                  <div className="rounded-lg border border-white/10 bg-black/30 px-4 py-3">
                     <div className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Backlog</div>
                     <div className="mt-1 text-xl font-black text-white">{String(backlog.length).padStart(2, "0")}</div>
                  </div>
                  <div className="rounded-lg border border-[#ff2026]/30 bg-[#ff2026]/10 px-4 py-3">
                     <div className="text-[9px] font-black uppercase tracking-widest text-[#ff2026]">In Progress</div>
                     <div className="mt-1 text-xl font-black text-white">{String(inProgress.length).padStart(2, "0")}</div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-black/30 px-4 py-3">
                     <div className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Revision</div>
                     <div className="mt-1 text-xl font-black text-white">{String(revision.length).padStart(2, "0")}</div>
                  </div>
               </div>
            </div>
         </section>

         <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
               {columns.map((column) => (
                  <div key={column.key} className="rounded-xl border border-white/10 bg-[#111214] p-4">
                     <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
                        <div className="flex items-center gap-2">
                           <span className={`h-2 w-2 rounded-full ${column.dot}`} />
                           <span className="text-[10px] font-black uppercase tracking-widest text-white">{column.title}</span>
                        </div>
                        <span className="rounded bg-black/40 px-2 py-0.5 text-[10px] font-mono text-zinc-500">
                           {String(column.items.length).padStart(2, "0")}
                        </span>
                     </div>

                     <div className="grid gap-3">
                        {column.items.map((task) => (
                           <article
                              key={task.id}
                              className={`rounded-lg border p-4 transition-colors hover:border-white/20 ${
                                 task.status === "REVISION" ? "border-[#ff2026]/40 bg-[#1a1214]" : "border-white/10 bg-[#191a1d]"
                              } ${task.status === "IN_PROGRESS" ? "relative overflow-hidden" : ""}`}
                           >
                              {task.status === "IN_PROGRESS" && <div className="absolute inset-y-0 left-0 w-1 bg-[#ff2026]" />}
                              <div className="mb-3 flex items-center justify-between">
                                 <span className="text-[9px] font-mono uppercase text-zinc-500">#{task.id}</span>
                                 {task.priority === "CRITICAL" ? (
                                    <span className="text-[9px] font-black uppercase tracking-widest text-[#ff2026]">Critical</span>
                                 ) : (
                                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">{task.priority}</span>
                                 )}
                              </div>

                              <h3 className="text-sm font-bold text-white tracking-wide">{task.title}</h3>
                              {task.description && <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">{task.description}</p>}

                              <div className="mt-4 flex items-center justify-between">
                                 <div className="flex items-center gap-2">
                                    <div className="grid h-6 w-6 place-items-center rounded-full border border-white/20 bg-zinc-800 text-[9px] font-bold text-white">
                                       {task.assignedTo?.fullName?.charAt(0) ?? "?"}
                                    </div>
                                    <span className="text-[9px] font-mono uppercase text-zinc-500">{task.assignedTo?.fullName ?? "Unassigned"}</span>
                                 </div>
                                 <span className="text-[9px] font-mono text-zinc-500">{task.dueDate}</span>
                              </div>
                           </article>
                        ))}
                     </div>
                  </div>
               ))}
            </div>

            <aside className="rounded-xl border border-white/10 bg-[#111214]">
               <div className="border-b border-white/5 px-5 py-4">
                  <h2 className="text-xl font-bold text-white">Revision Stream</h2>
                  <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-zinc-500">Task #ZL-844</p>
               </div>

               <div className="space-y-5 p-5">
                  <div className="rounded-lg border border-[#ff2026]/30 bg-[#181114] p-4">
                     <div className="mb-2 text-[9px] font-black uppercase tracking-widest text-[#ff2026]">Latest Directive</div>
                     <p className="text-sm font-medium text-white">Update the OAuth2 callback handler to resolve external provider edge-case handling.</p>
                     <div className="mt-4">
                        <PrimaryButton className="w-full">Act</PrimaryButton>
                     </div>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-[#171719] p-4 opacity-70">
                     <div className="mb-2 text-[9px] font-black uppercase tracking-widest text-zinc-500">Rejected</div>
                     <p className="text-sm font-medium text-zinc-300">Initial implementation of the login flow lacked fallback token handling.</p>
                  </div>

                  <div>
                     <div className="mb-2 text-[9px] font-black uppercase tracking-widest text-zinc-500">Add Feedback</div>
                     <textarea
                        placeholder="Enter rejection notes or guidance..."
                        className="h-24 w-full resize-none rounded-lg border border-white/10 bg-[#171719] p-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#ff2026]/50 focus:outline-none"
                     />
                     <div className="mt-3">
                        <PrimaryButton className="w-full">Send</PrimaryButton>
                     </div>
                  </div>
               </div>
            </aside>
         </section>
      </div>
   );
}
