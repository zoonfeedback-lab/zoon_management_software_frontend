"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Loader, Section, StatusBadge, ProgressBar } from "@/components/ui";

export default function ClientProjectDetails() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/client/projects/${params.id}`);
        if (res.ok) {
          const json = await res.json();
          setProject(json.data);
        }
      } catch (err) {
        console.error("Failed to sync project node:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [params.id]);

  if (loading) return <div className="h-screen bg-[#050608] flex items-center justify-center"><Loader /></div>;
  if (!project) return <div className="h-screen bg-[#050608] flex items-center justify-center text-brand font-black uppercase tracking-widest">Node Offline: Project Not Found</div>;

  return (
    <div className="min-h-screen bg-[#050608] text-white p-8">
      <header className="mb-10 flex items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand">Active Project /</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">{project.name}</span>
           </div>
           <h1 className="text-4xl font-black italic text-white tracking-tight">{project.name}</h1>
        </div>
        <button 
          onClick={() => router.back()}
          className="bg-brand px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#ff343a] transition-all shadow-[0_0_20px_rgba(255,32,38,0.2)]"
        >
          Request Update
        </button>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Project Timeline */}
        <div className="lg:col-span-2 bg-[#0b0d12] border border-white/5 p-8 rounded-2xl relative overflow-hidden">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5e5f66] flex items-center gap-2">
                 <span className="size-4 rounded-full border-2 border-brand grid place-items-center text-[8px]">!</span>
                 Project Timeline
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#5e5f66]">Est. Completion: Dec 15, 2023</span>
           </div>

           <div className="space-y-10 relative">
              <div className="absolute left-[11px] top-0 bottom-0 w-px bg-white/5" />
              
              <div className="flex gap-6 relative">
                 <div className="size-6 rounded-full bg-brand grid place-items-center z-10 border-4 border-[#0b0d12]">
                    <div className="size-1 bg-white rounded-full" />
                 </div>
                 <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="text-sm font-bold text-white uppercase tracking-wider">Phase 1: Architecture Blueprint</h4>
                       <span className="text-[8px] font-black bg-brand/10 text-brand border border-brand/20 px-2 py-0.5 rounded-sm">COMPLETED</span>
                    </div>
                    <p className="text-xs text-[#5e5f66]">Infrastructure schema and distributed system mapping.</p>
                 </div>
              </div>

              <div className="flex gap-6 relative">
                 <div className="size-6 rounded-full bg-brand/20 grid place-items-center z-10 border-4 border-[#0b0d12] animate-pulse">
                    <div className="size-1 bg-brand rounded-full" />
                 </div>
                 <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="text-sm font-bold text-white uppercase tracking-wider">Phase 2: Core Engine Development</h4>
                       <span className="text-[8px] font-black bg-white/5 text-white border border-white/10 px-2 py-0.5 rounded-sm">IN PROGRESS</span>
                    </div>
                    <p className="text-xs text-[#5e5f66]">Building the primary event loop and memory buffer management.</p>
                 </div>
              </div>

              <div className="flex gap-6 relative opacity-30">
                 <div className="size-6 rounded-full bg-white/5 grid place-items-center z-10 border-4 border-[#0b0d12]">
                    <div className="size-1 bg-[#5e5f66] rounded-full" />
                 </div>
                 <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="text-sm font-bold text-[#5e5f66] uppercase tracking-wider">Phase 3: Integration & Stress Testing</h4>
                       <span className="text-[8px] font-black text-[#5e5f66]">PLANNED</span>
                    </div>
                    <p className="text-xs text-[#5e5f66]">Simulating 1M+ transactions per second in test environment.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Assigned Team */}
        <div className="bg-[#0b0d12] border border-white/5 p-8 rounded-2xl">
           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5e5f66] mb-8 flex items-center gap-2">
              👥 Assigned Team
           </h3>
           <div className="space-y-6">
              {project.members.map((m: any) => (
                <div key={m.id} className="flex items-center justify-between group cursor-default">
                   <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-[#1a1c23] border border-white/5 grid place-items-center text-[10px] font-black text-white group-hover:border-brand transition-colors">
                         {m.user.fullName.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                         <p className="text-xs font-bold text-white">{m.user.fullName}</p>
                         <p className="text-[9px] font-medium text-[#5e5f66] uppercase tracking-widest">{m.user.jobTitle || "Engineer"}</p>
                      </div>
                   </div>
                   <div className="size-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                </div>
              ))}
           </div>
           <button className="w-full mt-10 py-4 border border-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-[#5e5f66] hover:text-white hover:bg-white/5 transition-all">
              View Full Directory
           </button>
        </div>
      </div>

      {/* Assets Grid */}
      <Section title="Project Assets & Documentation" eyebrow="Resource Hub" className="mb-8 bg-[#0b0d12] border-white/5">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="text-[8px] font-black uppercase tracking-[0.2em] text-[#4a4b51] border-b border-white/5">
                     <th className="px-8 py-4">File Name</th>
                     <th className="px-8 py-4">Version</th>
                     <th className="px-8 py-4">Size</th>
                     <th className="px-8 py-4">Added By</th>
                     <th className="px-8 py-4 text-right">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/[0.02]">
                  <tr className="group hover:bg-white/[0.01] transition-colors">
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                           <span className="text-xl">📄</span>
                           <span className="text-xs font-bold text-white group-hover:text-brand transition-colors">Architecture_Spec_v2.pdf</span>
                        </div>
                     </td>
                     <td className="px-8 py-6 text-[10px] font-mono text-[#5e5f66]">2.1.0</td>
                     <td className="px-8 py-6 text-[10px] font-mono text-[#5e5f66]">12.4 MB</td>
                     <td className="px-8 py-6 text-[10px] font-bold text-white/60">Alex Rivera</td>
                     <td className="px-8 py-6 text-right">
                        <button className="text-[10px] font-black uppercase tracking-widest text-brand hover:text-white transition-colors">Download</button>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </Section>

      <div className="grid lg:grid-cols-2 gap-8">
         <div className="bg-brand p-10 rounded-2xl relative overflow-hidden group">
            <div className="relative z-10">
               <h3 className="text-3xl font-black text-white mb-4 italic">Performance Milestone</h3>
               <p className="text-sm text-white/80 max-w-md leading-relaxed mb-10">The core engine successfully processed 850k operations per second during internal alpha testing.</p>
               <div className="flex items-end justify-between">
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-2">Optimization Target</p>
                     <div className="h-1 w-64 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white w-[85%]" />
                     </div>
                  </div>
                  <span className="text-5xl font-black text-white italic">85%</span>
               </div>
            </div>
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 size-64 bg-white/10 rounded-full blur-3xl" />
         </div>

         <div className="bg-[#0b0d12] border border-white/5 p-10 rounded-2xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5e5f66] mb-8">Upcoming Sprint</h3>
            <div className="bg-[#10131b] border border-white/5 p-6 rounded-xl flex gap-6">
               <div className="size-12 bg-brand/10 border border-brand/20 grid place-items-center text-brand text-xl">🚀</div>
               <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Scaling & Load Balancing</h4>
                  <p className="text-xs text-[#5e5f66] leading-relaxed mb-4">Implementing automated horizontal scaling across k8s clusters with zero-downtime rebalancing.</p>
                  <div className="flex gap-2">
                     <span className="bg-white/5 px-2 py-1 text-[8px] font-black text-[#5e5f66] rounded-sm">INFRA</span>
                     <span className="bg-white/5 px-2 py-1 text-[8px] font-black text-[#5e5f66] rounded-sm">PRIORITY: P0</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
