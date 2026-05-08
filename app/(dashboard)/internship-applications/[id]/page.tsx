import InternshipApplicationDetailClient from "./page.client";

export const metadata = {
  title: "Candidate Dossier | ZOON Terminal",
};

export default async function InternshipApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <InternshipApplicationDetailClient id={id} />;
}
