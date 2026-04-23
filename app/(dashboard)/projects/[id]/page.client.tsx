"use client";

import { useState } from "react";
import { GhostButton, PrimaryButton, ProgressBar, Section, StatusBadge, MediaGallery, FileList } from "@/components/ui";
import { EditProjectModal, DeployModal, FileUploadModal } from "@/components/modals";
import { Project } from "@/lib/types";

export default function ProjectDetailClient({ project }: { project: Project }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);

  const handleDownloadFile = (fileName: string) => {
    // simple in-memory download simulation: create a blob link
    console.log(`Downloading file: ${fileName}`);
    const blob = new Blob([`Simulated contents of ${fileName}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleDeleteFile = (fileName: string) => {
    // In a real app you'd call an API; here we'll just log and filter local list if needed
    console.log(`Deleting file: ${fileName}`);
    // note: project.files is static in data; we cannot mutate module data safely — just show an alert
    // If you want removal in UI, we could lift files to state. For now show confirmation.
    if (confirm(`Delete ${fileName}? This will not persist.`)) {
      alert(`${fileName} deleted (simulated).`);
    }
  };

  return (
    <>
      <div className="grid gap-6">
        <div className="flex flex-wrap gap-6 border-b border-line pb-4 text-sm text-mute">
          <span className="border-b-2 border-brand pb-3 font-semibold text-brand">Overview</span>
          <span>Resources</span>
          <span>Analytics</span>
        </div>

        <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm uppercase tracking-[0.18em] text-mute">{project.code}</span>
              <StatusBadge status={project.status} />
            </div>
            <h1 className="display-title mt-4 text-4xl text-white md:text-6xl">{project.name}</h1>
            <p className="mt-4 max-w-4xl text-base leading-7 text-mute md:text-lg">{project.summary}</p>
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
          <Section title="Project Description" eyebrow={project.category}>
            <div className="grid gap-5 p-6 md:p-7">
              <p className="text-lg leading-8 text-zinc-300">{project.summary}</p>
              <div className="grid gap-3 border border-line bg-black/30 p-5 text-lg text-[#f8b4a5]">
                <div>&gt; Target Release Date: Q3 2024</div>
                <div>&gt; Priority: Critical</div>
                <div>&gt; Technical Lead: Sarah Jenkins</div>
              </div>
            </div>
          </Section>

          <Section title="Metadata" eyebrow="Delivery Snapshot">
            <div className="grid">
              {[
                ["Client", project.client],
                ["Budget", project.budget],
                ["Timeline", "6 Months"],
              ].map(([label, value]) => (
                <div key={label} className="border-b border-line px-6 py-5 last:border-b-0 md:px-7">
                  <p className="text-sm uppercase tracking-[0.18em] text-mute">{label}</p>
                  <h3 className="mt-3 text-3xl font-semibold text-white">{value}</h3>
                </div>
              ))}
              <div className="px-6 py-5 md:px-7 border-b border-line">
                <p className="text-sm uppercase tracking-[0.18em] text-mute">Completion</p>
                <div className="mt-4">
                  <ProgressBar value={project.progress} />
                </div>
              </div>
              <div className="px-6 py-5 md:px-7">
                <p className="text-sm uppercase tracking-[0.18em] text-mute mb-3">Team Members</p>
                <div className="flex -space-x-2">
                  {project.team.map((member) => (
                    <div
                      key={member.id}
                      className="h-8 w-8 rounded-full border-2 border-zinc-900 bg-gradient-to-br from-sky-900 to-sky-500 font-bold text-white text-xs flex items-center justify-center"
                      title={member.name}
                    >
                      {member.initials}
                    </div>
                  ))}
                  {project.team.length > 4 && (
                    <div className="h-8 w-8 rounded-full border-2 border-zinc-900 bg-zinc-700 text-white text-xs flex items-center justify-center font-semibold">
                      +{project.team.length - 3}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Section>
        </div>

        {project.media && project.media.length > 0 && (
          <Section title="Assets &amp; Media" eyebrow="Gallery" action="Upload Media" actionHref="#">
            <div className="p-6 md:p-7">
              <MediaGallery media={project.media} />
            </div>
          </Section>
        )}

        <Section
          title="Project Files"
          eyebrow="Asset Archive"
          action="Upload File"
          actionHref="#"
        >
          <button
            onClick={() => setIsFileUploadOpen(true)}
            className="absolute top-4 right-4 md:top-5 md:right-5 text-brand hover:text-[#ff343a] transition-colors font-semibold uppercase text-sm"
          >
            📤 Upload
          </button>
          <FileList files={project.files} onDownload={handleDownloadFile} onDelete={handleDeleteFile} />
        </Section>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_340px]">
          <Section title="Project Milestones" eyebrow="Execution Timeline">
            <div className="grid">
              {project.milestones.map((milestone) => (
                <div key={milestone.title} className="grid gap-4 border-b border-line px-6 py-6 last:border-b-0 md:grid-cols-[84px_minmax(0,1fr)_auto] md:px-7">
                  <div
                    className={`grid h-14 w-14 place-items-center border-2 text-sm uppercase tracking-[0.18em] ${
                      milestone.state === "Complete" || milestone.state === "Active"
                        ? "border-brand text-brand"
                        : "border-zinc-700 text-zinc-500"
                    }`}
                  >
                    {milestone.state === "Complete" ? "OK" : milestone.state === "Active" ? "GO" : "..."}
                  </div>
                  <div>
                    <h3 className={`text-2xl font-semibold uppercase ${milestone.state === "Active" ? "text-brand" : "text-white"}`}>
                      {milestone.title}
                    </h3>
                    <p className="mt-3 text-lg leading-8 text-mute">{milestone.description}</p>
                    {milestone.progress ? (
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
            <Section title="Engineering Team" eyebrow="Squad">
              <div className="grid">
                {project.team.map((member) => (
                  <div key={member.id} className="grid grid-cols-[52px_minmax(0,1fr)_20px] items-center gap-4 border-b border-line px-6 py-5 last:border-b-0 md:px-7">
                    <div className="grid h-[52px] w-[52px] place-items-center border border-sky-900 bg-gradient-to-br from-sky-900 to-sky-500 font-bold text-white">
                      {member.initials}
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-white">{member.name}</div>
                      <small className="text-mute">{member.role}</small>
                    </div>
                    <span className="h-4 w-4 rounded-sm border border-zinc-500" />
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Client Deliverables" eyebrow="Handover">
              <div className="grid">
                {project.deliverables.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-4 border-b border-line px-6 py-5 last:border-b-0 md:px-7">
                    <div className="text-lg text-white">{item.label}</div>
                    <button className="text-sm font-semibold uppercase tracking-[0.18em] text-brand hover:text-[#ff343a] transition-colors">
                      {item.type}
                    </button>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>

        <Section title="Project Activity Log" eyebrow="Delivery Events">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  {["Action", "User", "Commit / Status", "Timestamp"].map((heading) => (
                    <th key={heading} className="border-b border-line px-6 py-4 text-left text-xs uppercase tracking-[0.22em] text-mute">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {project.activity.map((item) => (
                  <tr key={`${item.action}-${item.timestamp}`} className="transition hover:bg-white/[0.03]">
                    <td className="border-b border-line px-6 py-5 text-white">{item.action}</td>
                    <td className="border-b border-line px-6 py-5 text-zinc-300">{item.user}</td>
                    <td className="border-b border-line px-6 py-5 font-semibold text-brand">{item.status}</td>
                    <td className="border-b border-line px-6 py-5 text-mute">{item.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
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
      />
    </>
  );
}
