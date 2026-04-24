import { notFound } from "next/navigation";
import ProjectDetailClient from "./page.client";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // We'll pass the ID to the client component which will handle the authenticated fetch
  // This is better because the server component doesn't have easy access to the client-side localStorage token
  return <ProjectDetailClient projectId={id} />;
}
