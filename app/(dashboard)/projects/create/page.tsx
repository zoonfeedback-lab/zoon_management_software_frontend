import Link from "next/link";

export default function CreateProjectPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_430px]">
      <section className="grid gap-6">
        <div className="flex flex-col justify-between gap-5 border-b border-line pb-6 xl:flex-row xl:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand">zoon / Initialize Project</p>
            <h1 className="display-title text-4xl text-white md:text-6xl">Command Center</h1>
            <p className="mt-4 max-w-4xl text-base leading-7 text-mute md:text-lg">
              Set up a new delivery pipeline, attach starter files, and lock in the project metadata before kickoff.
            </p>
          </div>
          <div className="flex -space-x-2">
            {["EL", "SK", "MV"].map((member) => (
              <div
                key={member}
                className="grid h-9 w-9 place-items-center border border-black bg-gradient-to-br from-sky-900 to-sky-500 text-xs font-bold text-white"
              >
                {member}
              </div>
            ))}
            <div className="grid h-9 w-9 place-items-center border border-black bg-[#2a2a2a] text-[10px] text-zinc-400">+15</div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["Total Projects", "42", "+4 this month", "text-brand"],
            ["Active Nodes", "12", "Real-time tracking enabled", "text-brand"],
            ["Total Revenue", "$124k", "Q3 projections met", "text-white"],
            ["Team Members", "18", "Manage directory", "text-brand"],
          ].map(([label, value, note, accent]) => (
            <article key={label} className="panel-surface grid gap-3 p-5">
              <div className="text-xs uppercase tracking-[0.22em] text-mute">{label}</div>
              <div className="display-title text-4xl text-white">{value}</div>
              <div className={`text-sm ${accent}`}>{note}</div>
            </article>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.8fr)_360px]">
          <section className="panel-surface overflow-hidden">
            <div className="flex items-center justify-between border-b border-line px-5 py-4 md:px-6">
              <h2 className="text-xl font-semibold uppercase text-white">Active Pipeline</h2>
              <span className="text-sm text-mute">Live Feed</span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    {["Project Name", "Client", "Status", "Health", "Deadline"].map((heading) => (
                      <th key={heading} className="border-b border-line bg-black/40 px-5 py-4 text-left text-[11px] uppercase tracking-[0.22em] text-mute">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Epsilon Core", "Aether Tech", "Development", "75%", "OCT 24"],
                    ["Project Nexus", "Cyberdyne Systems", "Design", "40%", "NOV 12"],
                    ["Ghost Protocol", "Private Client", "QA Phase", "90%", "OCT 19"],
                    ["Titan Infra", "Stark Indust.", "Development", "15%", "DEC 05"],
                  ].map(([project, client, status, health, deadline], index) => (
                    <tr key={project} className={index % 2 === 1 ? "bg-black/20" : ""}>
                      <td className="border-b border-line px-5 py-5 font-semibold text-white">{project}</td>
                      <td className="border-b border-line px-5 py-5 text-mute">{client}</td>
                      <td className="border-b border-line px-5 py-5">
                        <span className={`inline-flex items-center gap-2 border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${
                          status === "Design" ? "border-white text-white" : status === "QA Phase" ? "border-zinc-600 text-zinc-500" : "border-brand text-brand"
                        }`}>
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {status}
                        </span>
                      </td>
                      <td className="border-b border-line px-5 py-5">
                        <div className="h-1 w-20 bg-zinc-800">
                          <div
                            className={`${status === "Design" ? "bg-white" : status === "QA Phase" ? "bg-zinc-500" : "bg-brand"} h-1`}
                            style={{ width: health }}
                          />
                        </div>
                      </td>
                      <td className="border-b border-line px-5 py-5 text-right text-xs uppercase tracking-[0.16em] text-white">{deadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="panel-surface overflow-hidden">
            <div className="border-b border-line px-5 py-4 md:px-6">
              <h2 className="text-xl font-semibold uppercase text-white">Recent Activity</h2>
            </div>
            <div className="grid gap-6 p-5 md:p-6">
              {[
                ["New Deployment", "Project Epsilon v2.4.1 successful. Latency reduced by 14%.", "2 mins ago", "border-brand text-brand"],
                ["Invoice Paid", "Invoice #ZN-2024-089 settled for $14,500.00.", "1 hour ago", "border-white text-white"],
                ["New Review", '"The architecture of Nexus is outstanding. Efficient and scalable."', "4 hours ago", "border-zinc-500 text-zinc-400"],
              ].map(([title, detail, time, tone]) => (
                <div key={title} className="grid grid-cols-[32px_minmax(0,1fr)] gap-4">
                  <div className={`h-8 w-8 border-2 ${tone}`} />
                  <div>
                    <div className="text-sm font-semibold text-white">{title}</div>
                    <p className="mt-1 text-sm leading-6 text-mute">{detail}</p>
                    <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-brand">{time}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <aside className="relative overflow-hidden border border-line bg-[#1a1a1a] shadow-[0_18px_48px_rgba(0,0,0,0.28)]">
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <div>
            <h2 className="display-title text-2xl uppercase italic text-white">Create Project</h2>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-mute">Initialize a new deployment pipeline.</p>
          </div>
          <Link href="/projects" className="text-sm text-mute transition hover:text-white">
            Close
          </Link>
        </div>

        <div className="grid gap-7 p-6">
          <label className="grid gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-mute">Project Name</span>
            <input
              type="text"
              placeholder="e.g. Project Epsilon"
              className="border border-line bg-black/45 px-4 py-3 text-sm text-white placeholder:text-zinc-600"
            />
          </label>

          <label className="grid gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-mute">Description</span>
            <textarea
              rows={4}
              placeholder="Enter project details..."
              className="resize-none border border-line bg-black/45 px-4 py-3 text-sm text-white placeholder:text-zinc-600"
            />
          </label>

          <div className="grid gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-mute">Cover Image</span>
            <label className="grid cursor-pointer place-items-center gap-3 border-2 border-dashed border-line bg-black/45 px-6 py-10 text-center transition hover:border-brand">
              <span className="text-4xl text-zinc-600">[]</span>
              <div className="text-sm text-zinc-300">
                <span className="font-semibold text-brand">Upload a file</span>
                <span className="text-zinc-500"> or drag and drop</span>
              </div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">PNG, JPG, GIF up to 10MB</span>
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>

          <div className="grid gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-mute">Project Files</span>
            <label className="grid cursor-pointer place-items-center gap-3 border-2 border-dashed border-line bg-black/45 px-6 py-10 text-center transition hover:border-white">
              <span className="text-4xl text-zinc-600">##</span>
              <div className="text-sm text-zinc-300">
                <span className="font-semibold text-white">Select files</span>
                <span className="text-zinc-500"> to attach</span>
              </div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">ZIP, PDF, DOCX supported</span>
              <span className="bg-brand/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">Max file size 50MB</span>
              <input type="file" accept=".zip,.pdf,.docx" className="hidden" />
            </label>
          </div>
        </div>

        <div className="flex gap-3 border-t border-line bg-[#1a1a1a] px-6 py-5">
          <Link
            href="/projects"
            className="flex-1 border border-line px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-zinc-400 transition hover:bg-[#2a2a2a] hover:text-white"
          >
            Cancel
          </Link>
          <button className="flex-1 bg-brand px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#ff343a]">
            Initialize
          </button>
        </div>
      </aside>
    </div>
  );
}
