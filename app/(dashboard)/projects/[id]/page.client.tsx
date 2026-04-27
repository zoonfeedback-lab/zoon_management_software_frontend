"use client";

import { useEffect, useState } from "react";
import { GhostButton, ProgressBar, Section, StatusBadge, MediaGallery, FileList } from "@/components/ui";
import { EditProjectModal, DeployModal, FileUploadModal } from "@/components/modals";
import { api } from "@/lib/api";
import Link from "next/link";

interface ProjectData {
  id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  deadline: string;
  client: {
    companyName: string;
  };
  members: {
    user: {
      id: string;
      fullName: string;
    };
  }[];
}

interface TaskData {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  assignedTo?: {
    fullName: string;
  };
}

interface DeliverableData {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  description: string;
}

export default function ProjectDetailClient({ projectId }: { projectId: string }) {
  const [project, setProject] = useState<ProjectData | null>(null);
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [deliverables, setDeliverables] = useState<DeliverableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);

  const fetchDeliverables = async () => {
    try {
      const res = await api.get(`/projects/${projectId}/deliverables`);
      if (res.ok) {
        const json = await res.json();
        setDeliverables(json.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch deliverables:", err);
    }
  };

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const [projectRes, tasksRes] = await Promise.all([
          api.get(`/projects/${projectId}`),
          api.get(`/projects/${projectId}/tasks`),
        ]);

        if (!projectRes.ok) throw new Error("Failed to fetch project details");
        
        const projectJson = await projectRes.json();
        setProject(projectJson.data);

        if (tasksRes.ok) {
          const tasksJson = await tasksRes.json();
          setTasks(tasksJson.data || []);
        }

        await fetchDeliverables();
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectId]);

  if (loading) {
    return <div className="flex h-[400px] items-center justify-center text-mute uppercase tracking-[0.2em]">Synchronizing Project Nodes...</div>;
  }

  if (error || !project) {
    return (
      <div className="p-8 text-center">
        <p className="text-brand font-bold uppercase tracking-widest">Error: {error || "Project Not Found"}</p>
        <Link href="/projects" className="mt-4 inline-block text-white underline">Return to Registry</Link>
      </div>
    );
  }

  const completedTasks = tasks.filter(t => t.status === "DONE").length;
  const progressPercent = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  // Mock data for UI elements not yet in backend
  const mockMilestones = [
    { title: "Discovery", description: "Architecture mapping and stakeholder alignment complete.", state: "Complete", date: "Phase 1" },
    { title: "Execution", description: "Active delivery of core engineering modules.", state: "Active", date: "Active Phase", progress: progressPercent },
    { title: "Final Delivery", description: "UAT, deployment, and final client hand-off.", state: "Pending", date: "Est. Q4" },
  ];

  const handleDownloadFile = (url: string) => {
    window.open(url, "_blank");
  };

  const handleDeleteFile = async (id: string) => {
    if (confirm(`Are you sure you want to delete this deliverable?`)) {
      try {
        const res = await api.delete(`/deliverables/${id}`);
        if (res.ok) {
          fetchDeliverables();
        }
      } catch (err) {
        console.error("Failed to delete deliverable:", err);
      }
    }
  };

  return (
    <>
      <div className="grid gap-6">
        <div className="flex flex-wrap gap-6 border-b border-line pb-4 text-sm text-mute">
          <span className="border-b-2 border-brand pb-3 font-semibold text-brand">Overview</span>
          <span className="cursor-not-allowed opacity-40">Resources</span>
          <span className="cursor-not-allowed opacity-40">Analytics</span>
        </div>

        <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm uppercase tracking-[0.18em] text-mute">{project.id.substring(0, 8).toUpperCase()}</span>
              <StatusBadge status={project.status} />
            </div>
            <h1 className="display-title mt-4 text-4xl text-white md:text-6xl">{project.name}</h1>
            <p className="mt-4 max-w-4xl text-base leading-7 text-mute md:text-lg">{project.description || "No project description provided."}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="border-2 border-white text-white font-label-md text-label-md uppercase px-6 py-2.5 hover:bg-[#1A1A1A] transition-colors flex items-center gap-2 rounded-sm"
            >
              ✏️ Edit Project
            </button>
            <button
              onClick={() => setIsDeployModalOpen(true)}
              className="bg-brand text-white font-label-md text-label-md uppercase px-6 py-2.5 hover:bg-[#ff343a] transition-colors flex items-center gap-2 rounded-sm"
            >
              🚀 Deploy
            </button>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_340px]">
          <Section title="Project Scope" eyebrow="Technical Parameters">
            <div className="grid gap-5 p-6 md:p-7">
              <p className="text-lg leading-8 text-zinc-300">{project.description || "Comprehensive engineering deployment and resource management."}</p>
              <div className="grid gap-3 border border-line bg-black/30 p-5 text-sm text-[#f8b4a5] font-mono">
                <div>&gt; TARGET_DEADLINE: {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'N/A'}</div>
                <div>&gt; SYSTEM_STATUS: {project.status}</div>
                <div>&gt; MISSION_LEAD: {project.members[0]?.user.fullName || "Unassigned"}</div>
              </div>
            </div>
          </Section>

          <Section title="Deployment Metadata" eyebrow="Live Snapshot">
            <div className="grid">
              {[
                ["Client Node", project.client.companyName],
                ["Start Date", project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'],
                ["Task Load", `${tasks.length} Assigned Missions`],
              ].map(([label, value]) => (
                <div key={label} className="border-b border-line px-6 py-5 last:border-b-0 md:px-7">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-mute font-bold">{label}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{value}</h3>
                </div>
              ))}
              <div className="px-6 py-5 md:px-7 border-b border-line">
                <p className="text-[10px] uppercase tracking-[0.18em] text-mute font-bold">Velocity / Progress</p>
                <div className="mt-3">
                  <ProgressBar value={progressPercent} />
                  <div className="mt-2 flex justify-between text-[10px] font-bold text-mute uppercase tracking-widest">
                    <span>{progressPercent}% Complete</span>
                    <span>{completedTasks}/{tasks.length} Tasks</span>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* Tasks Section - NEW */}
        <Section title="Mission Pipeline" eyebrow="Active Tasks" action="View All Tasks" actionHref="/tasks">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white/[0.02]">
                  {["Task Title", "Assignee", "Priority", "Status", "Due"].map((h) => (
                    <th key={h} className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-mute">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {tasks.slice(0, 5).map((task) => (
                  <tr key={task.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-white">{task.title}</td>
                    <td className="px-6 py-4 text-xs text-mute">{task.assignedTo?.fullName || "Unassigned"}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${task.priority === 'HIGH' || task.priority === 'CRITICAL' ? 'text-brand' : 'text-zinc-500'}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`h-1.5 w-1.5 rounded-full ${task.status === 'DONE' ? 'bg-success' : task.status === 'IN_PROGRESS' ? 'bg-brand' : 'bg-zinc-600'}`} />
                    </td>
                    <td className="px-6 py-4 text-[10px] font-mono text-mute">
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString([], { month: 'short', day: '2-digit' }) : 'N/A'}
                    </td>
                  </tr>
                ))}
                {tasks.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-xs font-bold uppercase tracking-widest text-mute/40">No tasks initialized for this sector.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Section>

        <Section 
          title="Deliverables Archive" 
          eyebrow="Asset Management"
          action="Register Asset"
          onAction={() => setIsFileUploadOpen(true)}
        >
          <button 
            onClick={() => setIsFileUploadOpen(true)}
            className="absolute top-4 right-4 md:top-5 md:right-5 text-brand hover:text-[#ff343a] transition-colors font-semibold uppercase text-xs tracking-widest"
          >
            + REGISTER
          </button>
          <FileList 
            files={deliverables.map(d => ({
              id: d.id,
              name: d.fileName,
              meta: d.description || "Project asset",
              size: `${(d.fileSize / 1024 / 1024).toFixed(2)} MB`,
              kind: d.fileType.includes("pdf") ? "PDF" : d.fileType.includes("zip") ? "ZIP" : "DOC",
            }))} 
            onDownload={(id) => {
              const d = deliverables.find(f => f.id === id);
              if (d) handleDownloadFile(d.fileUrl);
            }} 
            onDelete={(id) => handleDeleteFile(id)} 
          />
        </Section>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_340px]">
          <Section title="Project Milestones" eyebrow="Execution Timeline">
            <div className="grid">
              {mockMilestones.map((milestone) => (
                <div key={milestone.title} className="grid gap-4 border-b border-line px-6 py-6 last:border-b-0 md:grid-cols-[84px_minmax(0,1fr)_auto] md:px-7">
                  <div className={`grid h-14 w-14 place-items-center border-2 text-sm uppercase tracking-[0.18em] ${milestone.state === "Complete" || milestone.state === "Active" ? "border-brand text-brand" : "border-zinc-700 text-zinc-500"}`}>
                    {milestone.state === "Complete" ? "OK" : milestone.state === "Active" ? "GO" : "..."}
                  </div>
                  <div>
                    <h3 className={`text-2xl font-semibold uppercase ${milestone.state === "Active" ? "text-brand" : "text-white"}`}>{milestone.title}</h3>
                    <p className="mt-3 text-lg leading-8 text-mute">{milestone.description}</p>
                    {milestone.progress !== undefined ? (
                      <div className="mt-5">
                        <ProgressBar value={milestone.progress} />
                      </div>
                    ) : null}
                  </div>
                  <div className="text-sm uppercase tracking-[0.18em] text-mute">{milestone.date}</div>
                </div>
              ))}
            </div>
          </Section>

          <div className="grid gap-4">
            <Section title="Engineering Team" eyebrow="Active Squad">
              <div className="grid">
                {project.members.map((member) => (
                  <div key={member.user.id} className="grid grid-cols-[52px_minmax(0,1fr)_20px] items-center gap-4 border-b border-line px-6 py-5 last:border-b-0 md:px-7">
                    <div className="grid h-[52px] w-[52px] place-items-center border border-brand/20 bg-zinc-900 font-bold text-white uppercase text-xs">
                      {member.user.fullName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-white">{member.user.fullName}</div>
                      <small className="text-mute uppercase text-[10px] tracking-widest font-bold">Engineering Node</small>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>

      <EditProjectModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        projectName={project.name}
      />
      <DeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        projectName={project.name}
      />
      <FileUploadModal
        isOpen={isFileUploadOpen}
        onClose={() => setIsFileUploadOpen(false)}
        projectId={projectId}
        onSuccess={fetchDeliverables}
      />
    </>
  );
}
