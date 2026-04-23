import { DashboardShell } from "@/components/dashboard-shell";
import { primaryNav } from "@/lib/data";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell
      navItems={primaryNav}
      brandTitle="ZOON"
      brandSubtitle="Engineering Hub"
      ctaLabel="Create Project"
    >
      {children}
    </DashboardShell>
  );
}
