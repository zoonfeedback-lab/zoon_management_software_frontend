import Link from "next/link";
import { ProgressBar, Section, StatusBadge } from "@/components/ui";
import { projects } from "@/lib/data";

export default function ProjectsPage() {
  return (
    <div className="page-stack">
      <div className="hero">
        <div>
          <p className="eyebrow">Zoonlabs / Projects</p>
          <h1>Project Delivery</h1>
          <p>Track milestones, engineering squads, and client deliverables across the full delivery lifecycle.</p>
        </div>
        <div className="hero-actions">
          <button className="ghost-button">Export Board</button>
          <button className="primary-button">New Project</button>
        </div>
      </div>

      <Section title="Project Board" eyebrow="Execution Timeline">
        <table className="table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Project</th>
              <th>Client</th>
              <th>Status</th>
              <th>Budget</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="table-subtle">{project.code}</td>
                <td><Link href={`/projects/${project.id}`}>{project.name}</Link></td>
                <td>{project.client}</td>
                <td><StatusBadge status={project.status} /></td>
                <td>{project.budget}</td>
                <td><ProgressBar value={project.progress} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}
