"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { StatCard, AvatarGroup, StatusBadge, ProgressBar, GhostButton, PrimaryButton, Loader } from "@/components/ui";

export default function MyProjectsClient() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [project, setProject] = useState<any>(null);
  const [myTasks, setMyTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [projectsRes, tasksRes] = await Promise.all([
          api.get('/project-manager/projects'),
          api.get('/project-manager/my-tasks')
        ]);
        
        const projectsData = await projectsRes.json();
        const tasksData = await tasksRes.json();
        
        if (projectsRes.ok) setProjects(projectsData.data || []);
        if (tasksRes.ok) setMyTasks(tasksData.data || []);
        
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      if (!selectedProjectId) {
        setProject(null);
        return;
      }
      setLoading(true);
      try {
        const detailRes = await api.get(`/project-manager/projects/${selectedProjectId}`);
        const detailData = await detailRes.json();
        if (detailRes.ok) setProject(detailData.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDetail();
  }, [selectedProjectId]);

  if (loading && projects.length === 0) return <div className="h-screen flex items-center justify-center bg-[#09090b]"><Loader /></div>;
  if (error) return <div className="h-screen flex items-center justify-center bg-[#09090b] text-brand font-black uppercase tracking-widest">{error}</div>;

  const stats = {
    projects: projects.length,
    tasks: projects.reduce((acc, p) => acc + (p.tasks?.length || 0), 0),
    overdue: projects.reduce((acc, p) => acc + (p.tasks?.filter((t: any) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'DONE').length || 0), 0),
    members: new Set(projects.flatMap(p => p.members?.map((m: any) => m.user.id) || [])).size
  };

  return (
    <div className="p-6 md:p-10 max-w-[1600px] mx-auto min-h-screen bg-[#09090b]">
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">
            <span className="hover:text-brand cursor-pointer transition-colors" onClick={() => setSelectedProjectId(null)}>Workspace</span>
            <span>/</span>
            <span className="text-zinc-300">Projects</span>
            {project && (
              <>
                <span>/</span>
                <span className="text-brand">{project.name}</span>
              </>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-widest uppercase">
            {project ? project.name : "Mission Control"}
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          {selectedProjectId && (
            <GhostButton onClick={() => setSelectedProjectId(null)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back to Overview
            </GhostButton>
          )}
          <PrimaryButton>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
            Create Project
          </PrimaryButton>
        </div>
      </div>

      {!selectedProjectId ? (
        // DASHBOARD OVERVIEW
        <div className="grid gap-8">
          {/* KPI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Projects" value={stats.projects} color="white" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>} />
            <StatCard label="Active Tasks" value={stats.tasks} color="blue" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>} />
            <StatCard label="Overdue Alert" value={stats.overdue} color="red" trend={stats.overdue > 0 ? "12" : undefined} icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>} />
            <StatCard label="Team Members" value={stats.members} color="green" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
            {/* Project Grid */}
            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em]">Active Project Nodes</h2>
                <div className="flex bg-zinc-900 p-1 rounded-md">
                   <button className="px-3 py-1.5 bg-brand text-white text-[10px] font-bold uppercase rounded-sm">Grid</button>
                   <button className="px-3 py-1.5 text-zinc-500 text-[10px] font-bold uppercase">List</button>
                </div>
              </div>

              {projects.length === 0 ? (
                <div className="bg-[#171719] border-2 border-dashed border-white/5 p-20 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-brand/10 text-brand rounded-full flex items-center justify-center mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">🚀 No Projects Registered</h3>
                  <p className="text-zinc-500 text-sm font-medium mb-8 max-w-sm">Start managing your workflow by initializing your first project node.</p>
                  <div className="flex gap-4">
                    <PrimaryButton>Initialize Project</PrimaryButton>
                    <GhostButton>Import Matrix</GhostButton>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projects.map(p => {
                    const completed = p.tasks?.filter((t: any) => t.status === 'DONE').length || 0;
                    const total = p.tasks?.length || 0;
                    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
                    
                    return (
                      <div 
                        key={p.id} 
                        onClick={() => setSelectedProjectId(p.id)}
                        className="group bg-[#171719] border border-white/5 p-6 hover:border-brand/40 transition-all cursor-pointer relative overflow-hidden"
                      >
                        <div className="flex justify-between items-start mb-6">
                           <div>
                              <h3 className="text-lg font-black text-white tracking-widest uppercase mb-1 group-hover:text-brand transition-colors">{p.name}</h3>
                              <div className="flex items-center gap-2">
                                <StatusBadge status={p.status} />
                                <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Due {p.deadline ? new Date(p.deadline).toLocaleDateString() : 'N/A'}</span>
                              </div>
                           </div>
                           <AvatarGroup members={p.members || []} />
                        </div>
                        
                        <div className="space-y-2">
                           <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                              <span className="text-zinc-500">Progress</span>
                              <span className="text-white">{progress}%</span>
                           </div>
                           <ProgressBar value={progress} tone={progress === 100 ? "green" : "red"} />
                        </div>

                        {/* Hover Overlay Icon */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-brand"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Side Widgets */}
            <div className="space-y-6">
               <div className="bg-[#171719] border border-white/5 overflow-hidden">
                  <div className="p-5 border-b border-white/5 flex items-center justify-between">
                     <h2 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Personal Tasks</h2>
                     <span className="text-[10px] font-bold text-brand bg-brand/10 px-2 py-0.5">{myTasks.length}</span>
                  </div>
                  <div className="divide-y divide-white/[0.03]">
                     {myTasks.length === 0 ? (
                       <div className="p-8 text-center text-[10px] font-bold text-zinc-600 uppercase tracking-widest">No assigned tasks</div>
                     ) : (
                       myTasks.slice(0, 5).map(task => (
                         <div key={task.id} className="p-4 hover:bg-white/[0.02] transition-colors group cursor-pointer">
                            <div className="flex items-start gap-3">
                               <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${task.status === 'DONE' ? 'bg-success' : 'bg-brand'}`} />
                               <div className="flex-1 min-w-0">
                                  <div className="text-[11px] font-bold text-white truncate mb-1">{task.title}</div>
                                  <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">{task.project?.name}</div>
                               </div>
                               <svg className="w-3 h-3 text-zinc-700 group-hover:text-brand transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6"/></svg>
                            </div>
                         </div>
                       ))
                     )}
                  </div>
                  {myTasks.length > 5 && (
                    <button className="w-full py-3 text-[9px] font-black text-zinc-500 uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all">View All Assignments</button>
                  )}
               </div>

               <div className="bg-[#171719] border border-white/5 p-6 relative overflow-hidden">
                  <div className="relative z-10">
                     <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4">System Alerts</h3>
                     <div className="space-y-4">
                        <div className="flex gap-3">
                           <div className="w-1 h-8 bg-brand" />
                           <div>
                              <div className="text-[10px] font-bold text-white uppercase mb-0.5">Critical Deadline</div>
                              <div className="text-[9px] text-zinc-500 uppercase tracking-wider">Project Alpha X7 due in 24h</div>
                           </div>
                        </div>
                        <div className="flex gap-3">
                           <div className="w-1 h-8 bg-blue-500" />
                           <div>
                              <div className="text-[10px] font-bold text-white uppercase mb-0.5">New Revision</div>
                              <div className="text-[9px] text-zinc-500 uppercase tracking-wider">Review submitted for Task #204</div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <svg className="absolute -right-4 -bottom-4 w-24 h-24 text-white/[0.02]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm1-15h-2v6h2V7zm0 8h-2v2h2v-2z"/></svg>
               </div>
            </div>
          </div>
        </div>
      ) : (
        // PROJECT DETAIL VIEW
        <div className="grid gap-6">
          {/* Main Hero Card */}
          <div className="bg-[#171719] border border-white/5 p-10 relative overflow-hidden">
             <svg className="absolute -right-10 -top-10 w-64 h-64 text-white/[0.03]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM12 22l-9-5V7l9-5 9 5v10l-9 5z"/>
             </svg>

             <div className="relative z-10">
                <div className="flex gap-3 mb-6">
                   <span className="bg-brand/10 text-brand border border-brand/30 px-3 py-1 text-[9px] font-black tracking-widest uppercase">CRITICAL PATH</span>
                   <span className="bg-transparent border border-white/20 text-white/60 px-3 py-1 text-[9px] font-black tracking-widest uppercase">NODE_STATUS: ACTIVE</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">{project.name}</h2>
                <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed max-w-3xl mb-12">
                   {project.description || "Project parameters initialized. Deep-grid architecture enabled for resource monitoring."}
                </p>

                <div className="flex flex-wrap items-center gap-12 pt-8 border-t border-white/5">
                   <div>
                      <div className="text-[9px] font-black text-zinc-500 tracking-[0.2em] uppercase mb-2">PROJECT_MANAGER</div>
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-brand grid place-items-center text-[10px] font-black text-white shadow-[0_0_15px_rgba(255,32,38,0.4)]">
                            {project.projectManager?.fullName?.substring(0,2).toUpperCase() || "PM"}
                         </div>
                         <span className="text-white text-sm font-bold tracking-widest uppercase">{project.projectManager?.fullName || "Unassigned"}</span>
                      </div>
                   </div>
                   <div className="flex-1 max-w-sm">
                      <div className="flex items-center justify-between mb-2">
                         <span className="text-[9px] font-black text-zinc-500 tracking-[0.2em] uppercase">MISSION_PROGRESS</span>
                         <span className="text-white font-black">{project.status === 'COMPLETED' ? '100%' : '74%'}</span>
                      </div>
                      <ProgressBar value={project.status === 'COMPLETED' ? 100 : 74} tone={project.status === 'COMPLETED' ? 'green' : 'red'} />
                   </div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
            {/* Team Command */}
            <div className="bg-[#171719] border border-white/5 flex flex-col">
               <div className="p-6 flex items-center justify-between border-b border-white/5">
                  <h2 className="text-xs font-black text-white tracking-[0.2em] uppercase">TEAM_UNITS</h2>
                  <div className="w-6 h-6 bg-brand text-white flex items-center justify-center text-xs font-bold shadow-[0_0_10px_rgba(255,32,38,0.3)]">
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
                  </div>
               </div>
               
               <div className="flex-1 p-6 flex flex-col gap-3">
                  {project.members?.map((member: any) => (
                     <div key={member.id} className="bg-[#0b0b0d] border border-white/5 p-4 flex items-center justify-between group hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 flex-shrink-0 bg-zinc-800 grid place-items-center text-xs font-black text-white">
                              {member.user.fullName.substring(0,2).toUpperCase()}
                           </div>
                           <div>
                              <div className="text-xs font-black text-white tracking-widest uppercase mb-0.5">{member.user.fullName}</div>
                              <div className="text-[9px] font-bold text-zinc-500 tracking-[0.1em] uppercase">{member.user.jobTitle || "ENGINEER"}</div>
                           </div>
                        </div>
                        <button className="text-zinc-600 hover:text-brand transition-colors opacity-0 group-hover:opacity-100">
                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
                        </button>
                     </div>
                  ))}
                  <GhostButton className="mt-2 w-full py-4 border-dashed">
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
                     Add Operative
                  </GhostButton>
               </div>
            </div>

            {/* Task Orchestration */}
            <div className="bg-[#171719] border border-white/5 flex flex-col overflow-hidden">
               <div className="p-6 flex items-center justify-between border-b border-white/5">
                  <h2 className="text-xs font-black text-white tracking-[0.2em] uppercase">TASK_LOGS</h2>
                  <div className="flex gap-4">
                     <GhostButton className="h-8 !px-3 !py-0 border-none">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                     </GhostButton>
                  </div>
               </div>
               
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="border-b border-white/5 text-[9px] font-black text-zinc-500 tracking-[0.2em] uppercase bg-white/[0.01]">
                           <th className="p-6 font-medium">INDEX</th>
                           <th className="p-6 font-medium">OBJECTIVE</th>
                           <th className="p-6 font-medium">OPERATIVE</th>
                           <th className="p-6 font-medium">STATUS</th>
                           <th className="p-6 font-medium">PRIORITY</th>
                        </tr>
                     </thead>
                     <tbody className="text-xs">
                        {project.tasks?.map((task: any) => (
                           <tr key={task.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                              <td className="p-6 font-mono text-zinc-600 text-[10px]">{task.id.substring(0, 8)}</td>
                              <td className="p-6">
                                 <div className="font-bold text-white uppercase tracking-wider mb-1">{task.title}</div>
                                 <div className="text-[9px] text-zinc-500 uppercase tracking-[0.1em]">Updated {new Date(task.updatedAt).toLocaleDateString()}</div>
                              </td>
                              <td className="p-6 font-bold text-zinc-400 uppercase tracking-widest text-[10px]">{task.assignedTo?.fullName || "PENDING"}</td>
                              <td className="p-6">
                                 <StatusBadge status={task.status} />
                              </td>
                              <td className="p-6">
                                 <span className={`px-2 py-0.5 border text-[9px] font-black tracking-widest uppercase ${task.priority === 'HIGH' ? 'border-brand text-brand' : 'border-zinc-700 text-zinc-500'}`}>
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
      )}
    </div>
  );
}
