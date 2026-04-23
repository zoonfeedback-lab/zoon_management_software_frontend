"use client";

import { useEffect, useState } from "react";
import { GhostButton, Section } from "@/components/ui";
import { CreateTaskModal } from "@/components/modals";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: string;
  dueDate: string;
  project: {
    name: string;
  };
  assignedTo?: {
    fullName: string;
  };
}

export default function TasksClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setTasks(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleUpdateStatus = async (taskId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchTasks();
      }
    } catch (err) {
      console.error("Failed to update task status:", err);
    }
  };

  const columns = [
    { id: "TODO", label: "Registry / Todo" },
    { id: "IN_PROGRESS", label: "Active Execution" },
    { id: "DONE", label: "Verification / Done" },
  ];

  if (loading) {
    return <div className="flex h-[400px] items-center justify-center text-mute uppercase tracking-[0.2em]">Synchronizing Task Grid...</div>;
  }

  return (
    <div className="grid gap-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff2026]">Operations / Tasks</p>
          <h1 className="display-title text-4xl text-white md:text-6xl font-bold">Mission Control</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#9897a1]">
            Orchestrate engineering workflows, track development velocity, and manage technical debt across the organization.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <GhostButton className="rounded-lg">List View</GhostButton>
          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="inline-flex items-center justify-center gap-3 bg-[#ff2026] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#ff343a] rounded-lg shadow-[0_4px_14px_rgba(255,32,38,0.3)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Initialize Task
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-brand/10 border border-brand/20 p-4 rounded text-brand text-xs font-bold uppercase tracking-widest">
          Error: {error}
        </div>
      )}

      {/* Kanban Board */}
      <div className="grid gap-6 lg:grid-cols-3">
        {columns.map((column) => (
          <div key={column.id} className="flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 px-1">
              <div className="flex items-center gap-3">
                 <div className={`h-2 w-2 rounded-full ${column.id === 'TODO' ? 'bg-zinc-600' : column.id === 'IN_PROGRESS' ? 'bg-brand' : 'bg-success'}`} />
                 <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">{column.label}</h2>
              </div>
              <span className="font-mono text-[10px] font-bold text-white/40">{tasks.filter(t => t.status === column.id).length}</span>
            </div>
            
            <div className="flex flex-col gap-4 min-h-[500px]">
              {tasks.filter((t) => t.status === column.id).map((task) => (
                <article 
                  key={task.id} 
                  className="panel-surface group relative flex flex-col gap-4 rounded-xl bg-[#171719] p-5 shadow-lg border border-transparent hover:border-white/10 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-brand">{task.project.name}</span>
                    <div className={`h-1.5 w-1.5 rounded-full ${task.priority === 'CRITICAL' ? 'bg-brand shadow-[0_0_8px_rgba(255,32,38,0.6)]' : task.priority === 'HIGH' ? 'bg-orange-500' : 'bg-zinc-700'}`} />
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-brand transition-colors">{task.title}</h3>
                    <p className="mt-2 text-xs text-[#9897a1] line-clamp-2 leading-relaxed">{task.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                       <div className="h-6 w-6 rounded-full bg-zinc-800 border border-white/5 flex items-center justify-center text-[8px] font-bold text-[#9897a1]">
                          {task.assignedTo?.fullName.split(' ').map(n => n[0]).join('') || '?'}
                       </div>
                       <span className="text-[10px] font-bold text-[#9897a1]/60">{task.assignedTo?.fullName || 'Unassigned'}</span>
                    </div>
                    {task.dueDate && (
                      <span className="text-[10px] font-mono font-bold text-white/30">
                        {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     {column.id !== 'TODO' && (
                       <button onClick={() => handleUpdateStatus(task.id, 'TODO')} className="h-6 w-6 rounded border border-white/10 bg-black/40 flex items-center justify-center text-[10px] text-[#9897a1] hover:text-white">←</button>
                     )}
                     {column.id !== 'DONE' && (
                       <button onClick={() => handleUpdateStatus(task.id, column.id === 'TODO' ? 'IN_PROGRESS' : 'DONE')} className="h-6 w-6 rounded border border-white/10 bg-black/40 flex items-center justify-center text-[10px] text-[#9897a1] hover:text-white">→</button>
                     )}
                  </div>
                </article>
              ))}
              
              {tasks.filter((t) => t.status === column.id).length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 border border-dashed border-white/5 rounded-xl text-[9px] font-bold uppercase tracking-widest text-[#9897a1]/30">
                   Empty Sector
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <CreateTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onCreate={() => fetchTasks()}
      />
    </div>
  );
}
