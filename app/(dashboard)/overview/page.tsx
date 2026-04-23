import Link from "next/link";
import { GhostButton, PrimaryButton, ProgressBar, Section, StatusBadge } from "@/components/ui";
import { overviewMetrics, projects, recentActivity } from "@/lib/data";
import OverviewClient from "./page.client";

export default function OverviewPage() {
  return (
    <>
      <OverviewClient />
    </>
  );
}
