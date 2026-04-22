import { DashboardShell } from "@/components/dashboard-shell";
import { primaryNav } from "@/lib/data";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell
      navItems={primaryNav}
      brandTitle="Zoonlabs"
      brandSubtitle="Engineering Hub"
      ctaLabel="New Project"
    >
      {children}
    </DashboardShell>
  );
}
