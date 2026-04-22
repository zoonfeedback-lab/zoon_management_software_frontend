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
    <div className="grid min-h-screen bg-ink md:grid-cols-[224px_minmax(0,1fr)]">
      <Sidebar title={brandTitle} subtitle={brandSubtitle} items={navItems} ctaLabel={ctaLabel} />
      <div className="min-w-0">
        <Topbar sectionTitle={sectionTitle} />
        <main className="mx-auto w-full max-w-[1680px] px-4 py-4 md:px-5 md:py-5">{children}</main>
      </div>
    </div>
  );
}
