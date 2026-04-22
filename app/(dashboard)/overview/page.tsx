import Link from "next/link";
import { GhostButton, PrimaryButton, ProgressBar, Section, StatusBadge } from "@/components/ui";
import { overviewMetrics, projects, recentActivity } from "@/lib/data";

export default function OverviewPage() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand">zoon / Command Center</p>
          <h1 className="display-title text-3xl text-white md:text-5xl">Engineering Hub</h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-mute md:text-lg">
            Monitor active programs, deadlines, revenue movement, and delivery health from one precision-built operating view.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <GhostButton>Live Server</GhostButton>
          <Link
            href="/projects/create"
            className="inline-flex items-center justify-center gap-2 bg-brand px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#ff343a] md:px-5 md:py-3 md:text-sm"
          >
            Create Project
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {overviewMetrics.map((metric) => (
          <article key={metric.label} className="panel-surface grid gap-2.5 p-4">
            <div className="text-xs uppercase tracking-[0.22em] text-mute md:text-sm">{metric.label}</div>
            <div className="display-title text-3xl text-white md:text-4xl">{metric.value}</div>
            <div className={metric.accent === "green" ? "text-success" : metric.accent === "red" ? "text-brand" : "text-mute"}>
              {metric.note}
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.9fr)_360px]">
        <Section title="Active Pipeline" eyebrow="Operations">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
            <thead>
              <tr>
                {["Project Name", "Client", "Status", "Health", "Deadline"].map((heading) => (
                  <th key={heading} className="border-b border-line px-6 py-4 text-left text-xs uppercase tracking-[0.22em] text-mute">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="transition hover:bg-white/[0.03]">
                  <td className="border-b border-line px-6 py-5 text-white">
                    <Link href={`/projects/${project.id}`} className="font-semibold hover:text-brand">
                      {project.name}
                    </Link>
                  </td>
                  <td className="border-b border-line px-6 py-5 text-mute">{project.client}</td>
                  <td className="border-b border-line px-6 py-5"><StatusBadge status={project.status} /></td>
                  <td className="border-b border-line px-6 py-5"><ProgressBar value={project.progress} tone={project.progress > 70 ? "white" : "red"} /></td>
                  <td className="border-b border-line px-6 py-5 text-white">{project.deadline}</td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </Section>

        <Section title="Recent Activity" eyebrow="Signals">
          <div className="grid">
            {recentActivity.map((item) => (
              <div key={item.title} className="grid grid-cols-[42px_minmax(0,1fr)] gap-4 border-b border-line px-6 py-5 last:border-b-0">
                <div className={`h-10 w-10 border-2 ${item.tone === "red" ? "border-brand text-brand" : "border-zinc-200 text-zinc-200"}`} />
                <div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 leading-7 text-mute">{item.detail}</p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand">{item.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
