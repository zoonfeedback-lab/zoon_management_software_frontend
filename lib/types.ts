export type NavItem = {
  href: string;
  label: string;
  icon: "grid" | "folder" | "wallet" | "review" | "task" | "file" | "clock" | "settings";
};

export type Metric = {
  label: string;
  value: string;
  note: string;
  accent?: "red" | "green" | "white";
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  initials: string;
};

export type Milestone = {
  title: string;
  description: string;
  state: "Complete" | "Active" | "Pending";
  date: string;
  progress?: number;
};

export type Deliverable = {
  label: string;
  type: "Download" | "Open";
};

export type ProjectFile = {
  name: string;
  meta: string;
  size: string;
  kind: "PDF" | "ZIP" | "DOC";
};

export type ActivityItem = {
  action: string;
  user: string;
  status: string;
  timestamp: string;
};

export type MediaAsset = {
  id: string;
  label: string;
  src: string;
  type: "image" | "video" | "document";
};

export type Project = {
  id: string;
  code: string;
  name: string;
  client: string;
  category: string;
  status: "In Progress" | "Design" | "QA" | "Completed";
  deadline: string;
  budget: string;
  progress: number;
  summary: string;
  team: TeamMember[];
  milestones: Milestone[];
  deliverables: Deliverable[];
  files: ProjectFile[];
  media?: MediaAsset[];
  activity: ActivityItem[];
};

export type Invoice = {
  id: string;
  project: string;
  amount: string;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue";
};

export type Review = {
  client: string;
  project: string;
  score: string;
  quote: string;
  type: string;
  updatedAt: string;
};
