"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Section, StatusBadge, GhostButton, ProgressBar } from "@/components/ui";
import { api } from "@/lib/api";

interface ClientProject {
  id: string;
  name: string;
  status: string;
  deadline: string;
  progress: number;
  tasksCount: number;
  deliverablesCount: number;
}

export default function ClientDashboardClient() {
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const response = await api.get("/client/dashboard");
      if (!response.ok) throw new Error("Failed to synchronize with partner portal.");
      const json = await response.json();
      setProjects(json.data || []);
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
    return <div className="flex h-screen items-center justify-center text-mute uppercase tracking-[0.2em] font-black">Decrypting Partner Feed...</div>;
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-8 md:p-12">
      <div className="max-w-7xl mx-auto grid gap-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <div className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_rgba(255,32,38,0.5)]" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand">Authenticated Partner Node</span>
            </div>
            <h1 className="display-title text-4xl md:text-6xl font-black italic">Command Portal</h1>
            <p className="mt-4 text-mute text-lg max-w-2xl font-medium uppercase tracking-widest leading-relaxed">Monitor mission progress, access secure deliverables, and manage deployment revisions.</p>
          </div>
          <div className="flex gap-4">
             <button onClick={() => {
               localStorage.removeItem('access_token');
               window.location.href = '/auth/login';
             }} className="px-6 py-2.5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-mute hover:text-white hover:border-white transition-all">Sign Out</button>
          </div>
        </header>

        <div className="grid gap-8">
           <div className="grid md:grid-cols-3 gap-6">
              <div className="panel-surface bg-[#171719] border border-white/5 p-8 rounded-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                 </div>
                 <div className="text-[10px] font-black uppercase tracking-widest text-mute mb-2">Active Mission Count</div>
                 <div className="text-5xl font-black text-white italic">{projects.length}</div>
              </div>
              <div className="panel-surface bg-[#171719] border border-white/5 p-8 rounded-xl relative overflow-hidden group">
                 <div className="text-[10px] font-black uppercase tracking-widest text-mute mb-2">Global Completion Rate</div>
                 <div className="text-5xl font-black text-white italic">84%</div>
              </div>
              <div className="panel-surface bg-[#171719] border border-white/5 p-8 rounded-xl relative overflow-hidden group">
                 <div className="text-[10px] font-black uppercase tracking-widest text-mute mb-2">Secure Assets Available</div>
                 <div className="text-5xl font-black text-brand italic">24</div>
              </div>
           </div>

           <Section title="Active Pipeline" eyebrow="Operational Status">
              <div className="grid gap-4">
                 {projects.map(project => (
                   <div key={project.id} className="group flex flex-col md:flex-row items-center gap-8 p-8 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all rounded-xl">
                      <div className="flex-1 w-full">
                         <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-xl font-black uppercase tracking-tighter text-white italic">{project.name}</h3>
                            <StatusBadge status={project.status} />
                         </div>
                         <div className="text-[10px] font-bold text-mute uppercase tracking-[0.2em] mb-6">Deadline: {new Date(project.deadline).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                         <div className="w-full max-w-md">
                            <div className="flex justify-between text-[9px] font-black uppercase tracking-widest mb-2 text-mute">
                               <span>Velocity</span>
                               <span className="text-white">65%</span>
                            </div>
                            <ProgressBar value={65} tone="red" />
                         </div>
                      </div>
                      <div className="flex gap-12 text-center">
                         <div className="grid gap-1">
                            <span className="text-2xl font-black text-white italic">12</span>
                            <span className="text-[8px] font-black text-mute uppercase tracking-widest">Sprints</span>
                         </div>
                         <div className="grid gap-1">
                            <span className="text-2xl font-black text-brand italic">4</span>
                            <span className="text-[8px] font-black text-mute uppercase tracking-widest">Assets</span>
                         </div>
                      </div>
                      <Link 
                        href={`/client/projects/${project.id}`}
                        className="w-full md:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest text-white border border-white/10 rounded-lg text-center transition-all"
                      >
                         Access Node
                      </Link>
                   </div>
                 ))}
                 {projects.length === 0 && !loading && (
                   <div className="py-20 text-center border border-dashed border-white/10 rounded-xl">
                      <div className="text-mute text-xs font-black uppercase tracking-[0.3em] opacity-30">No active mission profiles identified.</div>
                   </div>
                 )}
              </div>
           </Section>
        </div>
      </div>
    </div>
  );
}
