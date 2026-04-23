import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import ProjectDetailClient from "./page.client";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((entry) => entry.id === id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
