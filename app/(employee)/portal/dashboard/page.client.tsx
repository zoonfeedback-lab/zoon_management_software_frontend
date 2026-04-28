"use client";

import { useEffect, useState } from "react";
import { Section, StatusBadge, ProgressBar } from "@/components/ui";
import { api } from "@/lib/api";

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate: string;
  project: {
    name: string;
  };
}

export default function EmployeeDashboardClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const response = await api.get("/tasks");
      if (!response.ok) throw new Error("Failed to synchronize mission queue.");
      const json = await response.json();
      setTasks(json.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex h-screen items-center justify-center text-mute uppercase tracking-[0.2em] font-black">Synchronizing Mission Queue...</div>;
  }

  const pendingTasks = tasks.filter(t => t.status !== 'DONE');

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-8 md:p-12">
      <div className="max-w-7xl mx-auto grid gap-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <div className="h-1.5 w-1.5 rounded-full bg-[#ff2026] shadow-[0_0_8px_rgba(255,32,38,0.5)]" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ff2026]">Internal Personnel Hub</span>
            </div>
            <h1 className="display-title text-4xl md:text-6xl font-black italic">Mission Control</h1>
            <p className="mt-4 text-mute text-lg max-w-2xl font-medium uppercase tracking-widest leading-relaxed">Execute mission parameters, track task velocity, and maintain technical operationality.</p>
          </div>
          <div className="flex gap-4">
             <a href="/portal/manager" className="px-6 py-2.5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-mute hover:text-white hover:border-white transition-all">Manager View</a>
             <button onClick={() => {
               localStorage.removeItem('access_token');
               window.location.href = '/auth/login';
             }} className="px-6 py-2.5 border border-[#ff2026]/50 bg-[#ff2026]/10 text-[10px] font-black uppercase tracking-widest text-[#ff2026] hover:bg-[#ff2026]/20 transition-all">Relinquish Node</button>
          </div>
        </header>

        <div className="grid gap-8">
           <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-[#171719] border border-white/5 p-6 rounded-xl">
                 <div className="text-[10px] font-black uppercase tracking-widest text-mute mb-1">Active Tasks</div>
                 <div className="text-4xl font-black text-white italic">{pendingTasks.length}</div>
              </div>
              <div className="bg-[#171719] border border-white/5 p-6 rounded-xl">
                 <div className="text-[10px] font-black uppercase tracking-widest text-mute mb-1">Sprint Progress</div>
                 <div className="text-4xl font-black text-white italic">72%</div>
              </div>
              <div className="bg-[#171719] border border-white/5 p-6 rounded-xl">
                 <div className="text-[10px] font-black uppercase tracking-widest text-mute mb-1">Technical Velocity</div>
                 <div className="text-4xl font-black text-[#ff2026] italic">HIGH</div>
              </div>
              <div className="bg-[#171719] border border-white/5 p-6 rounded-xl">
                 <div className="text-[10px] font-black uppercase tracking-widest text-mute mb-1">Uptime</div>
                 <div className="text-4xl font-black text-white italic">100%</div>
              </div>
           </div>

           <Section title="Active Mission Queue" eyebrow="Execution Grid">
              <div className="grid gap-3">
                 {tasks.map(task => (
                   <div key={task.id} className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all rounded-xl group">
                      <div className="flex-1 flex items-center gap-6">
                         <div className={`h-12 w-1 grid place-items-center ${task.priority === 'HIGH' ? 'bg-[#ff2026]' : 'bg-zinc-800'}`} />
                         <div>
                            <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-[#ff2026] transition-colors">{task.title}</h3>
                            <div className="flex items-center gap-3 mt-1">
                               <span className="text-[10px] font-bold text-mute uppercase tracking-widest">{task.project.name}</span>
                               <span className="text-zinc-800 text-xs">|</span>
                               <span className="text-[10px] font-bold text-brand uppercase tracking-widest italic">{task.priority} PRIORITY</span>
                            </div>
                         </div>
                      </div>
                      
                      <div className="flex items-center gap-8">
                         <div className="text-right">
                            <div className="text-[9px] font-black text-mute uppercase tracking-widest mb-1">Deadline Signal</div>
                            <div className="text-xs font-mono font-bold text-white uppercase">{new Date(task.dueDate).toLocaleDateString()}</div>
                         </div>
                         <div className="w-24">
                            <StatusBadge status={task.status} />
                         </div>
                         <button className="h-10 w-10 border border-white/10 grid place-items-center text-mute hover:text-white hover:border-white transition-all">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                         </button>
                      </div>
                   </div>
                 ))}
                 {tasks.length === 0 && !loading && (
                   <div className="py-20 text-center border border-dashed border-white/10 rounded-xl opacity-30 italic font-black uppercase tracking-widest text-xs">
                      Mission queue empty. Awaiting command parameters.
                   </div>
                 )}
              </div>
           </Section>
        </div>
      </div>
    </div>
  );
}
