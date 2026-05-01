"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Loader } from "@/components/ui";

interface Project {
  id: string;
  name: string;
  status: string;
  startDate: string | null;
  deadline: string | null;
  updatedAt: string;
  members: any[];
}

export default function ClientProjectsClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/client/projects");
        if (res.ok) {
          const json = await res.json();
          setProjects(json.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch client projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050608]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050608] p-8 text-white">
      <header className="mb-12">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-brand">Zoon / Client Portal</p>
        <h1 className="text-5xl font-black italic tracking-tight text-white md:text-7xl">Mission Logs</h1>
        <p className="mt-4 max-w-2xl text-lg text-[#9897a1]">
          Access live deployment status, project timelines, and mission-critical documentation for all active operations.
        </p>
      </header>

      <div className="grid gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0b0d12] p-8 transition-all hover:border-brand/30 hover:bg-[#0f1118]"
          >
            {/* Status Indicator */}
            <div className="absolute right-0 top-0 h-full w-1 bg-[#1e2129] group-hover:bg-brand" />

            <div className="grid gap-8 lg:grid-cols-[1fr_300px_200px]">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-widest ${
                    project.status === 'ACTIVE' ? 'bg-brand/10 text-brand' : 'bg-white/5 text-[#9897a1]'
                  }`}>
                    {project.status}
                  </span>
                  <span className="text-[10px] font-bold text-[#4a4b51] font-mono">ID: {project.id.split('-')[0]}</span>
                </div>
                <h2 className="text-3xl font-black text-white group-hover:text-brand transition-colors">{project.name}</h2>
                <div className="mt-6 flex flex-wrap gap-8">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#5e5f66]">Start Date</p>
                    <p className="mt-1 font-mono text-sm text-white">{project.startDate ? new Date(project.startDate).toLocaleDateString() : 'TBD'}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#5e5f66]">Target Delivery</p>
                    <p className="mt-1 font-mono text-sm text-brand">{project.deadline ? new Date(project.deadline).toLocaleDateString() : 'TBD'}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#5e5f66] mb-3">Assigned Engineering Squad</p>
                <div className="flex -space-x-3">
                  {project.members.map((m: any) => (
                    <div
                      key={m.id}
                      title={m.user.fullName}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0b0d12] bg-[#1a1c23] text-[10px] font-bold text-white transition-transform hover:z-10 hover:scale-110"
                    >
                      {m.user.fullName.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                  ))}
                  {project.members.length === 0 && (
                    <span className="text-xs text-[#4a4b51] italic">Squad unassigned</span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Link
                  href={`/client/projects/${project.id}`}
                  className="rounded-xl border border-white/10 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-brand hover:border-brand hover:shadow-[0_0_20px_rgba(255,32,38,0.3)]"
                >
                  Enter Terminal
                </Link>
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/5 py-24 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#4a4b51]">No active missions found in current sector.</p>
          </div>
        )}
      </div>
    </div>
  );
}
