import { Invoice, Metric, NavItem, Project, Review } from "@/lib/types";

export const primaryNav: NavItem[] = [
  { href: "/overview", label: "Dashboard", icon: "grid" },
  { href: "/projects", label: "Projects", icon: "folder" },
  { href: "/tasks", label: "Tasks", icon: "task" },
  { href: "/employees", label: "Team", icon: "users" },
  { href: "/clients", label: "Clients", icon: "users" },
  { href: "/reports", label: "Reports", icon: "list" },
  { href: "/internee", label: "Internee", icon: "users" },
  { href: "/settings", label: "Settings", icon: "settings" },
  { href: "/internship-applications", label: "Applications", icon: "users" },
]
export interface Client {
  id: string;
  name: string;
  contact: string;
  activeProjects: number;
  totalRevenue: string;
  status: "ACTIVE" | "INACTIVE";
  logo?: string;
  contactImage?: string;
}

export const mockClients: Client[] = [
  {
    id: "1",
    name: "BioTech Corp",
    contact: "Dr. Sarah Jenkins",
    activeProjects: 8,
    totalRevenue: "$482,500",
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Nexus Health",
    contact: "Marcus Thorne",
    activeProjects: 3,
    totalRevenue: "$124,900",
    status: "ACTIVE",
  },
  {
    id: "3",
    name: "Starlight Systems",
    contact: "Elena Vance",
    activeProjects: 12,
    totalRevenue: "$2,105,000",
    status: "INACTIVE",
  },
  {
    id: "4",
    name: "Cyberdyne Tech",
    contact: "Miles Dyson",
    activeProjects: 5,
    totalRevenue: "$850,200",
    status: "ACTIVE",
  },
];

export const overviewMetrics: Metric[] = [
  { label: "Total Projects", value: "42", note: "+4 this month", accent: "red" },
  { label: "Active Nodes", value: "12", note: "Realtime tracking enabled", accent: "red" },
  { label: "Total Revenue", value: "$124k", note: "Q3 projections met", accent: "white" },
  { label: "Team Members", value: "18", note: "Manage directory", accent: "red" },
];

export const paymentMetrics: Metric[] = [
  { label: "Total Invoiced", value: "$142,500.00", note: "+12.5% from last month", accent: "green" },
  { label: "Paid Amount", value: "$128,420.00", note: "90.1% collection rate", accent: "white" },
  { label: "Pending Revenue", value: "$14,080.00", note: "3 invoices overdue", accent: "red" },
];

export const projects: Project[] = [
  {
    id: "quantum-core-refactoring",
    code: "PRJ-2024-X1",
    name: "Quantum Core Refactoring",
    client: "Apex Trading Group",
    category: "High Frequency Trading",
    status: "In Progress",
    deadline: "Dec 05",
    budget: "$450,000",
    progress: 68,
    summary:
      "Overhauling the legacy transaction engine to support sub-millisecond processing pipelines for trading partners.",
    team: [
      { id: "1", name: "Sarah Jenkins", role: "Technical Lead", initials: "SJ" },
      { id: "2", name: "Elena Stone", role: "Senior Designer", initials: "ES" },
      { id: "3", name: "Mike Torres", role: "Backend Engineer", initials: "MT" },
      { id: "4", name: "Ravi Khan", role: "DevOps Lead", initials: "RK" },
    ],
    milestones: [
      { title: "Discovery", description: "Architecture mapping and stakeholder alignment complete.", state: "Complete", date: "Jun 12" },
      { title: "Design", description: "Hi-fi prototypes and design system documentation finalized.", state: "Complete", date: "Jul 04" },
      { title: "Front-end Development", description: "App shell, analytics widgets, and data tables in active delivery.", state: "Active", date: "Active Phase", progress: 66 },
      { title: "Back-end Integration", description: "API orchestration and database synchronization queued.", state: "Pending", date: "Pending" },
      { title: "Final Delivery", description: "UAT, deployment, and final client hand-off.", state: "Pending", date: "Est. Sept 15" },
    ],
    deliverables: [
      { label: "Figma Project Files", type: "Download" },
      { label: "Code Repository", type: "Open" },
      { label: "Documentation API", type: "Download" },
    ],
    files: [
      { name: "Technical_Requirements_v2.pdf", meta: "Uploaded by Sarah J. 2 days ago", size: "2.4 MB", kind: "PDF" },
      { name: "legacy_engine_source_dump.zip", meta: "Uploaded by Mike T. 1 week ago", size: "42.1 MB", kind: "ZIP" },
      { name: "Q3_Stakeholder_Brief.docx", meta: "Uploaded by System 3 weeks ago", size: "850 KB", kind: "DOC" },
    ],
    media: [
      { id: "1", label: "Arch_v2.png", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4EKIqoHmyBHrjOO8B2c28MvxBhcAAXbHsQr6F9vFixDg7R-9vCIjeO-QwawpZSgON8LnJWMydW0ujUudGrL5JIVB-xyXkZpAPLTmfnxnptRr1DEAqlPe8wYFBnvIok-XSmIZFVMNbFLAYFLoKmUhLa8W6_Nb8CgZ38raGgHCpFqfGTRRxNhUF6Ly3GTBpBnRQvj45MFHz8l4NC8tvVhlhersyF07L0_AfjV-JGcH56ACHLdMLhH-f04ayRBUUUo-PDMXzb7XNS2o", type: "image" },
      { id: "2", label: "core_loop.rs", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBn2deWznNGsGE5Bm2N9htwk4Mrb-kf985aa8xU3UtjQX9xaYWV_ameSaEz3wc2J9jTG1oC8tBbZ_Qkr2uWnY7dl7wLq3TLobP2FR4g0Y90v_vUyay4XgsUdgrQwWx_Py9jba4WajD9u5T8TjWFGLnPGlGv6HDvcr22ani9nQV6rfU1ypGUuTay2X21fmKUa6SGh1mOrQ_U65DnzT37xCP5SJef1tDU8teO6AOwj_eFgrWaqi7j9IWbr0aOvznUVwcgqx0EuWjMmRA", type: "image" },
      { id: "3", label: "network_top.jpg", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtP_6p2jITQg3wmyrI_ZpAvsNYut3fv1wGxiN55kusvVAvWwIh63Z3NpoLzTJ2OHIj8aArOpp2LLn6eS6kOJRfh7gF8EL9CKZLZ0oPRTP9A0jqwg_QH25VZLt4jXiKmggf7J4sCt9L93z1fRmu9sAkpNzlT9a-Od-qPQu20n_grldSJdMRtudQcuhQLpMAA-B6ffTkWiprmqBiAgpQbZwVg-3Ozw7iVZbaOGouuH45amzAabP-IzRx6wezf9PgdNzJxnSpq9R4LSQ", type: "image" },
    ],
    activity: [
      { action: "Component Library Update", user: "Marcus V.", status: "feat: navigation-v2", timestamp: "2 hours ago" },
      { action: "Product Detail Prototype", user: "Elena S.", status: "v1.2 approved", timestamp: "Yesterday, 4:45 PM" },
      { action: "Database Schema Design", user: "David K.", status: "PR #402 merged", timestamp: "Jul 10, 2023" },
    ],
  },
  {
    id: "neural-engine-core",
    code: "PRJ-2024-X2",
    name: "Neural Engine Core",
    client: "Synth Dynamics",
    category: "AI Platform",
    status: "Design",
    deadline: "Nov 12",
    budget: "$280,000",
    progress: 41,
    summary: "Designing a real-time AI infrastructure layer for enterprise inference workloads.",
    team: [],
    milestones: [],
    deliverables: [],
    files: [],
    activity: [],
  },
  {
    id: "ghost-protocol",
    code: "PRJ-2024-X3",
    name: "Ghost Protocol",
    client: "Private Client",
    category: "Security Infrastructure",
    status: "QA",
    deadline: "Oct 19",
    budget: "$198,000",
    progress: 87,
    summary: "Pen-test remediation and compliance delivery for a stealth security engagement.",
    team: [],
    milestones: [],
    deliverables: [],
    files: [],
    activity: [],
  },
  {
    id: "titan-infra",
    code: "PRJ-2024-X4",
    name: "Titan Infra",
    client: "Stark Industries",
    category: "Cloud Infrastructure",
    status: "In Progress",
    deadline: "Dec 05",
    budget: "$320,000",
    progress: 24,
    summary: "Large-scale infrastructure migration with observability and release automation.",
    team: [],
    milestones: [],
    deliverables: [],
    files: [],
    activity: [],
  },
];

export const invoices: Invoice[] = [
  { id: "#INV-9402", project: "Neural Engine Core", amount: "$12,500.00", dueDate: "Oct 12, 2023", status: "Paid" },
  { id: "#INV-9398", project: "Quantum API Gateway", amount: "$8,420.00", dueDate: "Oct 15, 2023", status: "Pending" },
  { id: "#INV-9382", project: "Holo-Display Interface", amount: "$15,000.00", dueDate: "Oct 01, 2023", status: "Overdue" },
  { id: "#INV-9375", project: "Bio-Metrics Auth v2", amount: "$22,100.00", dueDate: "Sep 28, 2023", status: "Paid" },
];

export const reviews: Review[] = [
  { client: "Cyberdyne Systems", project: "Project Nexus", score: "4.9/5", quote: "The architecture of Nexus is outstanding. Efficient and scalable.", type: "Product Review", updatedAt: "4 hours ago" },
  { client: "Aether Tech", project: "Epsilon Core", score: "5.0/5", quote: "The team moved quickly, communicated clearly, and delivered a polished system.", type: "Delivery Review", updatedAt: "Yesterday" },
  { client: "Apex Trading Group", project: "Quantum Core Refactoring", score: "4.8/5", quote: "Strong execution and confidence under pressure. The delivery rhythm feels world-class.", type: "Executive Feedback", updatedAt: "2 days ago" },
];

export const recentActivity = [
  { title: "New Deployment to Production", detail: "Project Epsilon v2.4.1 successful. Latency reduced by 14%.", timestamp: "2 mins ago", tone: "red" },
  { title: "Invoice Paid by Aether Tech", detail: "Invoice #ZN-2024-089 settled for $14,500.00.", timestamp: "1 hour ago", tone: "white" },
  { title: "New Review from Cyberdyne", detail: "\"The architecture of Nexus is outstanding. Efficient and scalable.\"", timestamp: "4 hours ago", tone: "red" },
];
