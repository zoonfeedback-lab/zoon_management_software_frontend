import Link from "next/link";
import { ProgressBar, Section, StatusBadge } from "@/components/ui";
import { overviewMetrics, projects, recentActivity } from "@/lib/data";

export default function OverviewPage() {
  return (
    <div className="page-stack">
      <div className="hero">
        <div>
          <p className="eyebrow">Zoonlabs / Command Center</p>
          <h1>Engineering Hub</h1>
          <p>Monitor active programs, deadlines, revenue movement, and delivery health from one precision-built operating view.</p>
        </div>
        <div className="hero-actions">
          <button className="ghost-button">Live Server</button>
          <button className="primary-button">Create Project</button>
        </div>
      </div>

      <div className="metrics-grid" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
        {overviewMetrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <div className="metric-label">{metric.label}</div>
            <div className="metric-value">{metric.value}</div>
            <div className={`metric-note ${metric.accent ?? ""}`}>{metric.note}</div>
          </article>
        ))}
      </div>

      <div className="projects-grid">
        <Section title="Active Pipeline" eyebrow="Operations">
          <table className="table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Client</th>
                <th>Status</th>
                <th>Health</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <Link href={`/projects/${project.id}`}>{project.name}</Link>
                  </td>
                  <td className="table-subtle">{project.client}</td>
                  <td><StatusBadge status={project.status} /></td>
                  <td><ProgressBar value={project.progress} tone={project.progress > 70 ? "white" : "red"} /></td>
                  <td>{project.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="Recent Activity" eyebrow="Signals">
          <div className="activity-list">
            {recentActivity.map((item) => (
              <div key={item.title} className="activity-card">
                <div className={`activity-icon ${item.tone}`} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                  <p className="text-action" style={{ marginTop: 10 }}>{item.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
