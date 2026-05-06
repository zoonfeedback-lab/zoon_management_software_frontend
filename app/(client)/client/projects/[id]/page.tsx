"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Loader, ProgressBar } from "@/components/ui";

export default function ClientProjectDetails() {
  const params = useParams();
  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [deliverables, setDeliverables] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [revisionText, setRevisionText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [projectRes, tasksRes, deliverablesRes] = await Promise.all([
          api.get(`/client/projects/${params.id}`),
          api.get(`/client/projects/${params.id}/tasks`),
          api.get(`/client/projects/${params.id}/deliverables`)
        ]);

        const projectData = await projectRes.json();
        const tasksData = await tasksRes.json();
        const deliverablesData = await deliverablesRes.json();

        if (projectRes.ok) setProject(projectData.data);
        if (tasksRes.ok) setTasks(tasksData.data || []);
        if (deliverablesRes.ok) setDeliverables(deliverablesData.data || []);
      } catch (err) {
        console.error("Failed to sync project node:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [params.id]);

  const handleRequestRevision = async () => {
    if (!revisionText.trim()) return;
    setSubmitting(true);
    try {
      const res = await api.post(`/client/projects/${params.id}/revisions`, {
        description: revisionText
      });
      if (res.ok) {
        setShowRevisionModal(false);
        setRevisionText("");
        alert("Revision request submitted to the engineering squad.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="h-screen bg-[#050608] flex items-center justify-center"><Loader /></div>;
  if (!project) return <div className="h-screen bg-[#050608] flex items-center justify-center text-brand font-black uppercase tracking-widest">Node Offline: Project Not Found</div>;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'DONE').length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const phases = [
    { name: "Initial Deployment", status: tasks.some(t => t.status === 'DONE') ? 'COMPLETED' : 'PENDING', desc: "Project initialization and core architecture setup." },
    { name: "Active Development", status: tasks.some(t => t.status === 'IN_PROGRESS') ? 'IN PROGRESS' : (progress > 50 ? 'COMPLETED' : 'PENDING'), desc: "Feature implementation and engine building." },
    { name: "Final Integration", status: progress === 100 ? 'COMPLETED' : 'PLANNED', desc: "Final stress testing and production handover." }
  ];

  return (
    <div className="min-h-screen bg-[#050608] text-white p-8 max-w-[1600px] mx-auto">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand">Mission ID /</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">#{project.id.substring(0,8)}</span>
           </div>
           <h1 className="text-4xl md:text-5xl font-black italic text-white tracking-tighter uppercase">{project.name}</h1>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={() => setShowRevisionModal(true)}
             className="bg-brand px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-[#ff343a] transition-all shadow-[0_0_30px_rgba(255,32,38,0.2)]"
           >
             Request Intel / Revision
           </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 bg-[#0b0d12] border border-white/5 p-8 rounded-2xl relative overflow-hidden">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                 <span className="size-4 rounded-full border-2 border-brand grid place-items-center text-[8px] text-brand">!</span>
                 Mission Timeline
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Target Delivery: {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'TBD'}</span>
           </div>

           <div className="space-y-12 relative">
              <div className="absolute left-[11px] top-0 bottom-0 w-px bg-white/5" />
              {phases.map((phase, idx) => (
                <div key={idx} className={`flex gap-6 relative ${phase.status === 'PLANNED' ? 'opacity-30' : ''}`}>
                   <div className={`size-6 rounded-full ${phase.status === 'COMPLETED' ? 'bg-brand' : phase.status === 'IN PROGRESS' ? 'bg-brand/20 animate-pulse' : 'bg-white/5'} grid place-items-center z-10 border-4 border-[#0b0d12]`}>
                      <div className={`size-1 rounded-full ${phase.status === 'COMPLETED' ? 'bg-white' : 'bg-brand'}`} />
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                         <h4 className={`text-sm font-bold uppercase tracking-wider ${phase.status === 'PLANNED' ? 'text-zinc-600' : 'text-white'}`}>{phase.name}</h4>
                         <span className={`text-[8px] font-black border px-2 py-0.5 rounded-sm ${
                           phase.status === 'COMPLETED' ? 'bg-brand/10 text-brand border-brand/20' : 
                           phase.status === 'IN PROGRESS' ? 'bg-white/5 text-white border-white/10' : 
                           'text-zinc-700 border-zinc-800'
                         }`}>{phase.status}</span>
                      </div>
                      <p className="text-xs text-zinc-500">{phase.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-[#0b0d12] border border-white/5 p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden">
           <div className="relative z-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-8">Mission Completion</h3>
              <div className="flex items-end justify-between mb-4">
                 <span className="text-7xl font-black italic text-white tracking-tighter">{progress}%</span>
                 <div className="text-right pb-2">
                    <p className="text-[9px] font-black text-brand uppercase tracking-widest">{completedTasks} / {totalTasks}</p>
                    <p className="text-[8px] font-bold text-zinc-600 uppercase">Tasks Executed</p>
                 </div>
              </div>
              <ProgressBar value={progress} tone={progress === 100 ? "green" : "red"} />
           </div>
           <div className="mt-10 pt-8 border-t border-white/5 relative z-10">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Assigned Specialist Squad</p>
              <div className="flex -space-x-3">
                 {project.members?.map((m: any) => (
                    <div
                      key={m.id}
                      className="size-10 rounded-full border-2 border-[#0b0d12] bg-zinc-800 flex items-center justify-center text-[10px] font-black text-white hover:z-10 hover:scale-110 transition-transform cursor-help"
                      title={m.user.fullName}
                    >
                      {m.user.fullName.substring(0, 2).toUpperCase()}
                    </div>
                 ))}
              </div>
           </div>
           <svg className="absolute -right-4 -bottom-4 size-32 text-white/[0.02]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
           </svg>
        </div>
      </div>

      <div className="bg-[#0b0d12] border border-white/5 rounded-2xl overflow-hidden mb-8">
         <div className="p-8 border-b border-white/5 bg-white/[0.01]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-1">Resource Hub</p>
            <h3 className="text-xl font-black italic text-white uppercase tracking-tighter">Project Assets & Documentation</h3>
         </div>
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
                  {deliverables.length === 0 ? (
                    <tr>
                       <td colSpan={5} className="px-8 py-12 text-center text-[10px] font-bold text-zinc-700 uppercase tracking-[0.3em]">No assets synchronized in this node</td>
                    </tr>
                  ) : (
                    deliverables.map(file => (
                      <tr key={file.id} className="group hover:bg-white/[0.01] transition-colors">
                         <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                               <div className="size-8 bg-zinc-900 border border-white/10 grid place-items-center text-xs group-hover:border-brand transition-colors">
                                  {file.fileType?.includes('image') ? '🖼️' : '📄'}
                               </div>
                               <div>
                                  <div className="font-bold text-white group-hover:text-brand transition-colors uppercase tracking-wider">{file.fileName}</div>
                                  <div className="text-[8px] text-zinc-600 uppercase tracking-widest">ID: {file.id.substring(0,6)}</div>
                               </div>
                            </div>
                         </td>
                         <td className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">{file.fileType || "DOCUMENT"}</td>
                         <td className="px-8 py-6 font-mono text-[10px] text-zinc-500">{(file.fileSize / 1024 / 1024).toFixed(2)} MB</td>
                         <td className="px-8 py-6 text-[10px] font-bold text-white/60">{file.uploadedBy?.fullName || "System"}</td>
                         <td className="px-8 py-6 text-right">
                            <a href={file.fileUrl} target="_blank" className="text-[10px] font-black uppercase tracking-widest text-brand hover:text-white transition-colors">Download</a>
                         </td>
                      </tr>
                    ))
                  )}
               </tbody>
            </table>
         </div>
      </div>

      {showRevisionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#050608]/90 backdrop-blur-md">
           <div className="bg-[#0b0d12] border border-white/10 p-8 w-full max-w-lg shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-2">Request Mission Intel / Revision</h3>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Secure communication channel to project operatives</p>
              <textarea 
                value={revisionText}
                onChange={(e) => setRevisionText(e.target.value)}
                placeholder="Describe your requested changes or feedback in detail..."
                className="w-full h-40 bg-[#10131b] border border-white/5 p-4 text-sm text-white placeholder:text-zinc-700 outline-none focus:border-brand/50 transition-colors resize-none mb-6 font-medium"
              />
              <div className="flex gap-4">
                 <button onClick={handleRequestRevision} disabled={submitting} className="flex-1 bg-brand text-white font-black text-[10px] uppercase tracking-widest py-4 hover:bg-[#ff343a] transition-all disabled:opacity-50">
                   {submitting ? "Transmitting..." : "Send Request"}
                 </button>
                 <button onClick={() => setShowRevisionModal(false)} className="px-8 border border-white/10 text-zinc-500 font-black text-[10px] uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all">
                   Cancel
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
