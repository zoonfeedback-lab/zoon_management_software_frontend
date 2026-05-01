"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function MyProjectsClient() {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        // Get all managed projects
        const projectsRes = await api.get('/project-manager/projects');
        const projectsData = await projectsRes.json();
        
        if (!projectsRes.ok) throw new Error(projectsData.message || 'Failed to load projects');
        
        if (projectsData.data && projectsData.data.length > 0) {
          // Fetch detailed info for the first project
          const firstProjectId = projectsData.data[0].id;
          const detailRes = await api.get(`/project-manager/projects/${firstProjectId}`);
          const detailData = await detailRes.json();
          
          if (!detailRes.ok) throw new Error(detailData.message || 'Failed to load project details');
          
          setProject(detailData.data);
        } else {
          setProject(null); // No projects found
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, []);

  if (loading) {
    return <div className="flex h-screen items-center justify-center text-zinc-500 font-black uppercase tracking-[0.2em]">Loading Project Matrix...</div>;
  }

  if (error) {
    return <div className="flex h-screen items-center justify-center text-[#ff2026] font-black uppercase tracking-[0.2em]">{error}</div>;
  }

  if (!project) {
    return <div className="flex h-screen items-center justify-center text-zinc-500 font-black uppercase tracking-[0.2em]">No Active Projects Found</div>;
  }

  const team = project.members?.map((m: any, i: number) => ({
    id: m.id,
    name: m.user.fullName,
    role: m.user.jobTitle || "ENGINEER",
    initials: m.user.fullName.substring(0, 2).toUpperCase(),
    bg: ["bg-emerald-900", "bg-blue-900", "bg-orange-900", "bg-zinc-800"][i % 4]
  })) || [];

  const tasks = project.tasks?.map((t: any) => {
    const isBlocked = t.status === 'BLOCKED'; // Add actual logic if status enum differs
    const isDone = t.status === 'DONE';
    return {
      id: t.id.substring(0, 8), // shorten UUID
      desc: t.title,
      owner: t.assignedTo?.fullName || "UNASSIGNED",
      status: t.status,
      statusColor: isBlocked ? "bg-[#ff2026]" : (isDone ? "bg-emerald-500" : "bg-white"),
      priority: t.priority || "MEDIUM",
      priorityStyle: t.priority === 'CRITICAL' || t.priority === 'URGENT' ? "border-[#ff2026] text-[#ff2026]" : (t.priority === 'HIGH' ? "border-white/40 text-white/80" : "border-zinc-600 text-zinc-500")
    };
  }) || [];

  return (
    <div className="p-8 md:p-10 max-w-[1600px] mx-auto grid gap-6 h-full overflow-y-auto bg-[#09090b]">
      
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        
        {/* Project Main Card */}
        <div className="bg-[#171719] border border-white/5 p-8 relative overflow-hidden flex flex-col justify-between">
           {/* Background Icon Watermark */}
           <svg className="absolute -right-10 -top-10 w-64 h-64 text-white/[0.03]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM12 22l-9-5V7l9-5 9 5v10l-9 5z"/>
           </svg>

           <div>
              <div className="flex gap-3 mb-6 relative z-10">
                 <span className="bg-[#ff2026]/10 text-[#ff2026] border border-[#ff2026]/30 px-3 py-1 text-[9px] font-black tracking-widest uppercase">CRITICAL PATH</span>
                 <span className="bg-transparent border border-white/20 text-white/60 px-3 py-1 text-[9px] font-black tracking-widest uppercase">SPRINT 24</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 relative z-10">{project.name || "PROJECT_ALPHA_X7"}</h1>
              <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl relative z-10">
                 {project.description || "Deep learning architecture for automated resource allocation and performance monitoring in hybrid cloud environments."}
              </p>
           </div>

           <div className="flex flex-wrap items-center gap-12 mt-12 pt-6 border-t border-white/5 relative z-10">
              <div>
                 <div className="text-[9px] font-black text-zinc-500 tracking-widest uppercase mb-2">HEALTH_STATUS</div>
                 <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-[#ff2026] shadow-[0_0_10px_rgba(255,32,38,0.5)]" />
                    <span className="text-white font-bold tracking-widest uppercase">{project.status === 'COMPLETED' ? 'COMPLETED' : 'OPTIMIZED'}</span>
                 </div>
              </div>
              <div className="flex-1 max-w-xs">
                 <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-black text-zinc-500 tracking-widest uppercase">COMPLETION</span>
                    <span className="text-white font-bold">{project.status === 'COMPLETED' ? '100%' : '74%'}</span>
                 </div>
                 <div className="h-1.5 w-full bg-zinc-800 flex">
                    <div className="h-full bg-[#ff2026] shadow-[0_0_10px_rgba(255,32,38,0.5)]" style={{ width: project.status === 'COMPLETED' ? '100%' : '74%' }} />
                 </div>
              </div>
           </div>
        </div>

        {/* Top Right Mini Cards */}
        <div className="grid grid-cols-2 gap-4 content-start">
           <div className="bg-[#171719] border border-white/5 border-b-2 border-b-[#ff2026] p-6 flex flex-col justify-between h-[140px]">
              <svg className="w-5 h-5 text-[#ff2026]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>
              <div>
                 <div className="text-[9px] font-black text-zinc-500 tracking-widest uppercase mb-1">VELOCITY</div>
                 <div className="text-3xl font-black text-white">42.8</div>
              </div>
           </div>
           
           <div className="bg-[#171719] border border-white/5 p-6 flex flex-col justify-between h-[140px]">
              <svg className="w-5 h-5 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              <div>
                 <div className="text-[9px] font-black text-zinc-500 tracking-widest uppercase mb-1">OPEN_BUGS</div>
                 <div className="text-3xl font-black text-white">12</div>
              </div>
           </div>

           <div className="bg-[#171719] border border-white/5 p-6 col-span-2 flex items-center justify-between">
              <div className="flex -space-x-3">
                 {team.slice(0, 3).map((m: any, i: number) => (
                    <div key={m.id} className={`w-10 h-10 rounded-full ${m.bg} border-2 border-[#171719] grid place-items-center text-xs font-bold text-white relative shadow-md`} style={{ zIndex: 30 - i }}>{m.initials}</div>
                 ))}
                 {team.length > 3 && (
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-[#171719] grid place-items-center text-[10px] font-black text-zinc-400 relative z-0">+{team.length - 3}</div>
                 )}
                 {team.length === 0 && (
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-[#171719] grid place-items-center text-[10px] font-black text-zinc-400 relative z-0">0</div>
                 )}
              </div>
              <div className="text-right">
                 <div className="text-[9px] font-black text-zinc-500 tracking-widest uppercase mb-1">ACTIVE_ENGINEERS</div>
                 <div className="text-lg font-bold text-white uppercase">{team.length}_UNITS</div>
              </div>
           </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
        
        {/* TEAM_COMMAND */}
        <div className="bg-[#171719] border border-white/5 flex flex-col">
           <div className="p-6 flex items-center justify-between border-b border-white/5">
              <h2 className="text-sm font-black text-white tracking-[0.2em] uppercase">TEAM_COMMAND</h2>
              <div className="w-6 h-6 bg-[#ff2026] text-white flex items-center justify-center text-xs font-bold">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
              </div>
           </div>
           
           <div className="flex-1 p-6 flex flex-col gap-3">
              {team.map(member => (
                 <div key={member.id} className="bg-[#0b0b0d] border border-white/5 p-4 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 flex-shrink-0 grid place-items-center text-xs font-bold text-white ${member.bg}`}>
                          {member.icon ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> : member.initials}
                       </div>
                       <div>
                          <div className="text-xs font-black text-white tracking-widest uppercase mb-0.5">{member.name}</div>
                          <div className="text-[9px] font-bold text-zinc-500 tracking-[0.1em] uppercase">{member.role}</div>
                       </div>
                    </div>
                    <button className="text-zinc-600 hover:text-[#ff2026] transition-colors opacity-0 group-hover:opacity-100">
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
                    </button>
                 </div>
              ))}
              
              <button className="mt-2 w-full border border-white/20 text-white font-black text-[10px] tracking-widest uppercase py-4 hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                 ADD_NEW_OPERATIVE
              </button>
           </div>
        </div>

        {/* TASK_ORCHESTRATION */}
        <div className="bg-[#171719] border border-white/5 flex flex-col">
           <div className="p-6 flex items-center justify-between border-b border-white/5">
              <h2 className="text-sm font-black text-white tracking-[0.2em] uppercase">TASK_ORCHESTRATION</h2>
              <div className="flex gap-4 text-zinc-500">
                 <button className="hover:text-white transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></button>
                 <button className="hover:text-white transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg></button>
              </div>
           </div>
           
           <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-white/5 text-[9px] font-black text-zinc-500 tracking-widest uppercase">
                       <th className="p-6 font-medium">ID</th>
                       <th className="p-6 font-medium">TASK_DESCRIPTION</th>
                       <th className="p-6 font-medium">OWNER</th>
                       <th className="p-6 font-medium">STATUS</th>
                       <th className="p-6 font-medium">PRIORITY</th>
                    </tr>
                 </thead>
                 <tbody className="text-xs">
                    {tasks.map((task, i) => (
                       <tr key={task.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="p-6 font-mono text-zinc-400">{task.id}</td>
                          <td className="p-6 font-medium text-white">{task.desc}</td>
                          <td className="p-6 font-mono text-zinc-400 uppercase">{task.owner}</td>
                          <td className="p-6">
                             <div className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${task.statusColor}`} />
                                <span className={`font-black tracking-widest uppercase text-[9px] ${task.status === 'BLOCKED' ? 'text-[#ff2026]' : 'text-white'}`}>{task.status}</span>
                             </div>
                          </td>
                          <td className="p-6">
                             <span className={`inline-flex items-center px-2 py-0.5 border text-[9px] font-black tracking-widest uppercase ${task.priorityStyle}`}>
                                {task.priority}
                             </span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

      </div>
    </div>
  );
}
