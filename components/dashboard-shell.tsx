import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { NavItem } from "@/lib/types";

export function DashboardShell({
  children,
  navItems,
  brandTitle,
  brandSubtitle,
  ctaLabel,
  sectionTitle,
}: {
  children: React.ReactNode;
  navItems: NavItem[];
  brandTitle: string;
  brandSubtitle: string;
  ctaLabel: string;
  sectionTitle?: string;
}) {
  return (
    <div className="grid min-h-screen bg-ink md:grid-cols-[280px_minmax(0,1fr)]">
      <Sidebar title={brandTitle} subtitle={brandSubtitle} items={navItems} ctaLabel={ctaLabel} />
      <div className="min-w-0">
        <Topbar sectionTitle={sectionTitle} />
        <main className="px-5 py-6 md:px-8 md:py-7">{children}</main>
      </div>
    </div>
  );
}
