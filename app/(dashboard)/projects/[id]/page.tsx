import { notFound } from "next/navigation";
import { ProgressBar, Section, StatusBadge } from "@/components/ui";
import { projects } from "@/lib/data";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((entry) => entry.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="page-stack">
      <div className="subnav">
        <span className="active">Overview</span>
        <span>Resources</span>
        <span>Analytics</span>
      </div>

      <div className="hero">
        <div>
          <div className="status-row">
            <span className="table-subtle">{project.code}</span>
            <StatusBadge status={project.status} />
          </div>
          <h1>{project.name}</h1>
          <p>{project.summary}</p>
        </div>
        <div className="hero-actions">
          <button className="ghost-button">Edit Project</button>
          <button className="primary-button">Deploy</button>
        </div>
      </div>

      <div className="project-grid">
        <Section title="Project Description" eyebrow={project.category}>
          <div className="stack-list">
            <div className="stack-item">
              <p>{project.summary}</p>
              <div style={{ marginTop: 20, display: "grid", gap: 10 }}>
                <div className="muted-copy">&gt; Target Release Date: Q3 2024</div>
                <div className="muted-copy">&gt; Priority: Critical</div>
                <div className="muted-copy">&gt; Technical Lead: Sarah Jenkins</div>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Metadata" eyebrow="Delivery Snapshot">
          <div className="stack-list">
            <div className="stack-item"><p className="table-subtle">Client</p><h3>{project.client}</h3></div>
            <div className="stack-item"><p className="table-subtle">Budget</p><h3>{project.budget}</h3></div>
            <div className="stack-item"><p className="table-subtle">Timeline</p><h3>6 Months</h3></div>
            <div className="stack-item">
              <p className="table-subtle">Completion</p>
              <ProgressBar value={project.progress} />
            </div>
          </div>
        </Section>
      </div>

      <div className="project-grid">
        <Section title="Project Milestones" eyebrow="Execution Timeline">
          <div className="timeline-list">
            {project.milestones.map((milestone) => (
              <div key={milestone.title} className="timeline-item">
                <div className={`timeline-marker ${milestone.state.toLowerCase()}`}>{milestone.state === "Complete" ? "OK" : milestone.state === "Active" ? "GO" : "..."}</div>
                <div>
                  <h3 className={`timeline-title ${milestone.state === "Active" ? "red" : ""}`}>{milestone.title}</h3>
                  <p className="timeline-copy">{milestone.description}</p>
                  {milestone.progress ? <div style={{ marginTop: 18 }}><ProgressBar value={milestone.progress} /></div> : null}
                </div>
                <div className="timeline-date">{milestone.date}</div>
              </div>
            ))}
          </div>
        </Section>

        <div className="page-stack">
          <Section title="Engineering Team" eyebrow="Squad">
            <div className="member-list">
              {project.team.map((member) => (
                <div key={member.id} className="member-row">
                  <div className="member-avatar">{member.initials}</div>
                  <div>
                    <div>{member.name}</div>
                    <small>{member.role}</small>
                  </div>
                  <span className="chat-dot" />
                </div>
              ))}
            </div>
          </Section>

          <Section title="Client Deliverables" eyebrow="Handover">
            <div className="stack-list">
              {project.deliverables.map((item) => (
                <div key={item.label} className="stack-item">
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                    <span>{item.label}</span>
                    <span className="text-action">{item.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>

      <Section title="Project Files" eyebrow="Asset Archive">
        <div className="file-list">
          {project.files.map((file) => (
            <div key={file.name} className="file-row">
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <span className="file-pill">{file.kind}</span>
                <div>
                  <div>{file.name}</div>
                  <p className="file-meta">{file.meta}</p>
                </div>
              </div>
              <div>{file.size}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Project Activity Log" eyebrow="Delivery Events">
        <table className="table">
          <thead>
            <tr>
              <th>Action</th>
              <th>User</th>
              <th>Commit / Status</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {project.activity.map((item) => (
              <tr key={`${item.action}-${item.timestamp}`}>
                <td>{item.action}</td>
                <td>{item.user}</td>
                <td className="text-action">{item.status}</td>
                <td>{item.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}
