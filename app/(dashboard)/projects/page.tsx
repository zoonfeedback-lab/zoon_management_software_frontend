import Link from "next/link";
import { GhostButton, PrimaryButton, ProgressBar, Section, StatusBadge } from "@/components/ui";
import { projects } from "@/lib/data";

export default function ProjectsPage() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand">zoon / Projects</p>
          <h1 className="display-title text-4xl text-white md:text-6xl">Project Delivery</h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-mute md:text-lg">
            Track milestones, engineering squads, and client deliverables across the full delivery lifecycle.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <GhostButton>Export Board</GhostButton>
          <Link
            href="/projects/create"
            className="inline-flex items-center justify-center gap-2 bg-brand px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#ff343a] md:px-5 md:py-3 md:text-sm"
          >
            Create Project
          </Link>
        </div>
      </div>

      <Section title="Project Board" eyebrow="Execution Timeline">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
          <thead>
            <tr>
              {["Code", "Project", "Client", "Status", "Budget", "Progress"].map((heading) => (
                <th key={heading} className="border-b border-line px-6 py-4 text-left text-xs uppercase tracking-[0.22em] text-mute">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="transition hover:bg-white/[0.03]">
                <td className="border-b border-line px-6 py-5 text-mute">{project.code}</td>
                <td className="border-b border-line px-6 py-5">
                  <Link href={`/projects/${project.id}`} className="font-semibold text-white hover:text-brand">
                    {project.name}
                  </Link>
                </td>
                <td className="border-b border-line px-6 py-5 text-white">{project.client}</td>
                <td className="border-b border-line px-6 py-5"><StatusBadge status={project.status} /></td>
                <td className="border-b border-line px-6 py-5 text-white">{project.budget}</td>
                <td className="border-b border-line px-6 py-5"><ProgressBar value={project.progress} /></td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
