"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { api } from "@/lib/api";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  if (!isOpen) return null;

  const sizeClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
  }[size];

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className={`${sizeClass} w-full bg-zinc-900 border border-line rounded-sm overflow-hidden`}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-line">
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </>
  );
}

export function CreateProjectModal({
  isOpen,
  onClose,
  onCreate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: () => void;
}) {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    clientId: "",
    description: "",
    startDate: "",
    deadline: "",
  });

  useEffect(() => {
    if (isOpen) {
      api.get("/clients").then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setClients(data.data);
        }
      });
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/projects", formData);
      if (res.ok) {
        if (onCreate) onCreate();
        onClose();
        setFormData({ name: "", clientId: "", description: "", startDate: "", deadline: "" });
      }
    } catch (err) {
      console.error("Project creation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project" size="lg">
      <form onSubmit={handleSubmit} className="grid gap-5">
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-white">Project Name *</label>
          <input
            type="text"
            required
            className="bg-black/50 border border-line text-white px-3 py-2 rounded-sm focus:border-brand focus:outline-none transition-colors"
            placeholder="e.g., Quantum Core Refactoring"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-white">Client *</label>
            <select
              required
              className="bg-black/50 border border-line text-white px-3 py-2 rounded-sm focus:border-brand focus:outline-none transition-colors"
              value={formData.clientId}
              onChange={(e) =>
                setFormData({ ...formData, clientId: e.target.value })
              }
            >
              <option value="">Select Client</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.companyName}</option>)}
            </select>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-white">Description</label>
            <input
              type="text"
              className="bg-black/50 border border-line text-white px-3 py-2 rounded-sm focus:border-brand focus:outline-none transition-colors"
              placeholder="Project description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-white">Start Date</label>
            <input
              type="date"
              className="bg-black/50 border border-line text-white px-3 py-2 rounded-sm focus:border-brand focus:outline-none transition-colors"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-white">Deadline</label>
            <input
              type="date"
              className="bg-black/50 border border-line text-white px-3 py-2 rounded-sm focus:border-brand focus:outline-none transition-colors"
              value={formData.deadline}
              onChange={(e) =>
                setFormData({ ...formData, deadline: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-line">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-line text-white font-semibold bg-transparent hover:bg-white/5 transition-colors rounded-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2 bg-brand text-white font-semibold hover:bg-[#ff343a] transition-colors rounded-sm disabled:opacity-50"
          >
            {loading ? "Initializing..." : "Create Project"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export function CreateInvoiceModal({
  isOpen,
  onClose,
  onCreate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (invoice: { id: string; project: string; amount: string; dueDate: string; status: string }) => void;
}) {
  const [formData, setFormData] = useState({
    project: "",
    amount: "",
    dueDate: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInvoice = {
      id: `#INV-${Math.floor(Math.random() * 9000) + 1000}`,
      project: formData.project,
      amount: formData.amount,
      dueDate: formData.dueDate,
      status: "Pending",
    };
    if (typeof onCreate === "function") onCreate(newInvoice);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Invoice" size="md">
      <form onSubmit={handleSubmit} className="grid gap-5">
        <div className="grid gap-2">
          <label htmlFor="create-project" className="text-sm font-semibold text-white">Project *</label>
          <select
            id="create-project"
            title="Select project"
            required
            className="bg-black/50 border border-line text-white px-3 py-2 rounded-sm focus:border-brand focus:outline-none transition-colors"
            value={formData.project}
            onChange={(e) =>
              setFormData({ ...formData, project: e.target.value })
            }
          >
            <option value="">Select project</option>
            <option value="Quantum Core Refactoring">Quantum Core Refactoring</option>
            <option value="Neural Engine Core">Neural Engine Core</option>
            <option value="Ghost Protocol">Ghost Protocol</option>
            <option value="Titan Infra">Titan Infra</option>
          </select>
        </div>

        <div className="grid gap-2">
          <label htmlFor="create-amount" className="text-sm font-semibold text-white">Amount *</label>
          <input
            id="create-amount"
            type="text"
            title="Invoice amount"
            required
            className="bg-black/50 border border-line text-white px-3 py-2 rounded-sm focus:border-brand focus:outline-none transition-colors"
            placeholder="$12,500.00"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="invoice-duedate" className="text-sm font-semibold text-white">Due Date *</label>
          <input
            id="invoice-duedate"
            type="date"
            title="Due Date"
            required
            className="bg-black/50 border border-line text-white px-3 py-2 rounded-sm focus:border-brand focus:outline-none transition-colors"
            value={formData.dueDate}
            onChange={(e) =>
              setFormData({ ...formData, dueDate: e.target.value })
            }
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-white">Description</label>
          <textarea
            className="bg-black/50 border border-line text-white px-3 py-2 rounded-sm focus:border-brand focus:outline-none transition-colors resize-none"
            placeholder="Invoice details..."
            rows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div className="flex gap-3 pt-4 border-t border-line">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-line text-white font-semibold bg-transparent hover:bg-white/5 transition-colors rounded-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-brand text-white font-semibold hover:bg-[#ff343a] transition-colors rounded-sm"
          >
            Create Invoice
          </button>
        </div>
      </form>
    </Modal>
  );
}

export function EditProjectModal({
  isOpen,
  onClose,
  projectName = "Quantum Core Refactoring",
}: {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
}) {
  const [formData, setFormData] = useState({
    name: projectName,
    status: "In Progress",
    progress: "68",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Project updated:", formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Project" size="md">
      <form onSubmit={handleSubmit} className="grid gap-5">
        <div className="grid gap-2">
          <label htmlFor="edit-project-name" className="text-sm font-semibold text-white">Project Name</label>
          <input
            id="edit-project-name"
            type="text"
            title="Project Name"
            className="bg-black/50 border border-line text-white px-3 py-2 rounded-sm focus:border-brand focus:outline-none transition-colors"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="edit-status" className="text-sm font-semibold text-white">Status</label>
          <select
            id="edit-status"
            title="Project status"
            className="bg-black/50 border border-line text-white px-3 py-2 rounded-sm focus:border-brand focus:outline-none transition-colors"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option value="In Progress">In Progress</option>
            <option value="Design">Design</option>
            <option value="QA">QA</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="grid gap-2">
          <label htmlFor="edit-progress" className="text-sm font-semibold text-white">Progress (%)</label>
          <input
            id="edit-progress"
            type="number"
            title="Project progress percentage"
            min="0"
            max="100"
            className="bg-black/50 border border-line text-white px-3 py-2 rounded-sm focus:border-brand focus:outline-none transition-colors"
            value={formData.progress}
            onChange={(e) =>
              setFormData({ ...formData, progress: e.target.value })
            }
          />
        </div>

        <div className="flex gap-3 pt-4 border-t border-line">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-line text-white font-semibold bg-transparent hover:bg-white/5 transition-colors rounded-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-brand text-white font-semibold hover:bg-[#ff343a] transition-colors rounded-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}

export function DeployModal({
  isOpen,
  onClose,
  projectName = "Quantum Core Refactoring",
}: {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
}) {
  const [deployStep, setDeployStep] = useState(0);

  const steps = [
    "Building artifacts...",
    "Running tests...",
    "Deploying to staging...",
    "Health checks...",
    "Go live!",
  ];

  const handleDeploy = () => {
    setDeployStep(0);
    const interval = setInterval(() => {
      setDeployStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(onClose, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Deploy Project" size="md">
      <div className="grid gap-6">
        <div>
          <p className="text-sm text-zinc-400 mb-2">Project</p>
          <p className="text-lg font-bold text-white">{projectName}</p>
        </div>

        {deployStep > 0 ? (
          <div className="space-y-3">
            {steps.map((step, idx) => (
              <div key={step} className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    idx < deployStep
                      ? "bg-success text-white"
                      : idx === deployStep
                        ? "bg-brand text-white animate-pulse"
                        : "bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {idx < deployStep ? "✓" : idx === deployStep ? "→" : idx + 1}
                </div>
                <span className={idx <= deployStep ? "text-white" : "text-zinc-500"}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-zinc-900/50 border border-line p-4 rounded-sm">
            <p className="text-sm text-zinc-300">
              This will deploy the latest build to production. Ensure all tests pass before proceeding.
            </p>
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t border-line">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-line text-white font-semibold bg-transparent hover:bg-white/5 transition-colors rounded-sm disabled:opacity-50"
            disabled={deployStep > 0}
          >
            Cancel
          </button>
          {deployStep === 0 ? (
            <button
              onClick={handleDeploy}
              className="flex-1 px-4 py-2 bg-brand text-white font-semibold hover:bg-[#ff343a] transition-colors rounded-sm"
            >
              Start Deploy
            </button>
          ) : deployStep === steps.length - 1 ? (
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-success text-white font-semibold hover:opacity-90 transition-colors rounded-sm"
            >
              Done
            </button>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}

export function SearchFilterModal({
  isOpen,
  onClose,
  onApply,
}: {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: { status?: string; dateRange?: string }) => void;
}) {
  const [filters, setFilters] = useState({
    status: "all",
    dateRange: "all",
  });

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filter Invoices" size="sm">
      <div className="grid gap-5">
        <div className="grid gap-2">
          <label htmlFor="filter-status" className="text-sm font-semibold text-white">Status</label>
          <select
            id="filter-status"
            title="Filter by status"
            className="bg-black/50 border border-line text-white px-3 py-2 rounded-sm focus:border-brand focus:outline-none transition-colors"
            value={filters.status}
            onChange={(e) =>
              setFilters({ ...filters, status: e.target.value })
            }
          >
            <option value="all">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <div className="grid gap-2">
          <label htmlFor="filter-daterange" className="text-sm font-semibold text-white">Date Range</label>
          <select
            id="filter-daterange"
            title="Filter by date range"
            className="bg-black/50 border border-line text-white px-3 py-2 rounded-sm focus:border-brand focus:outline-none transition-colors"
            value={filters.dateRange}
            onChange={(e) =>
              setFilters({ ...filters, dateRange: e.target.value })
            }
          >
            <option value="all">All Time</option>
            <option value="thisMonth">This Month</option>
            <option value="last3Months">Last 3 Months</option>
            <option value="thisYear">This Year</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4 border-t border-line">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-line text-white font-semibold bg-transparent hover:bg-white/5 transition-colors rounded-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-4 py-2 bg-brand text-white font-semibold hover:bg-[#ff343a] transition-colors rounded-sm"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function FileUploadModal({
  isOpen,
  onClose,
  projectId,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  onSuccess?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fileName: "",
    fileUrl: "",
    fileType: "application/pdf",
    fileSize: 0,
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post(`/projects/${projectId}/deliverables`, {
        ...formData,
        projectId,
      });
      if (res.ok) {
        if (onSuccess) onSuccess();
        onClose();
        setFormData({
          fileName: "",
          fileUrl: "",
          fileType: "application/pdf",
          fileSize: 0,
          description: "",
        });
      }
    } catch (err) {
      console.error("Failed to create deliverable:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register Deliverable" size="md">
      <form onSubmit={handleSubmit} className="grid gap-5">
        <div className="grid gap-2">
          <label className="text-xs font-black uppercase tracking-widest text-[#9897a1]">File Name</label>
          <input
            required
            type="text"
            className="bg-[#0b0b0d] border border-white/10 text-white px-4 py-3 rounded-lg focus:border-brand/30 outline-none"
            placeholder="e.g., architectural-blueprint-v1.pdf"
            value={formData.fileName}
            onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
          />
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-black uppercase tracking-widest text-[#9897a1]">File URL (Public Access)</label>
          <input
            required
            type="url"
            className="bg-[#0b0b0d] border border-white/10 text-white px-4 py-3 rounded-lg focus:border-brand/30 outline-none"
            placeholder="https://cdn.zoonlabs.io/..."
            value={formData.fileUrl}
            onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-[#9897a1]">File Type</label>
            <select
              className="bg-[#0b0b0d] border border-white/10 text-white px-4 py-3 rounded-lg focus:border-brand/30 outline-none"
              value={formData.fileType}
              onChange={(e) => setFormData({ ...formData, fileType: e.target.value })}
            >
              <option value="application/pdf">PDF</option>
              <option value="application/zip">ZIP Archive</option>
              <option value="image/png">PNG Image</option>
              <option value="application/octet-stream">Binary Data</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-[#9897a1]">Size (Bytes)</label>
            <input
              type="number"
              className="bg-[#0b0b0d] border border-white/10 text-white px-4 py-3 rounded-lg focus:border-brand/30 outline-none"
              value={formData.fileSize}
              onChange={(e) => setFormData({ ...formData, fileSize: parseInt(e.target.value) })}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-black uppercase tracking-widest text-[#9897a1]">Description</label>
          <textarea
            rows={3}
            className="bg-[#0b0b0d] border border-white/10 text-white px-4 py-3 rounded-lg focus:border-brand/30 outline-none resize-none"
            placeholder="Technical specs, handover notes, etc..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="flex gap-3 pt-4 border-t border-white/5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-white/10 text-[#9897a1] font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 rounded-lg transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-3 bg-brand text-white font-bold uppercase tracking-widest text-[10px] hover:bg-[#ff343a] rounded-lg shadow-[0_4px_14px_rgba(255,32,38,0.3)] disabled:opacity-50 transition-all"
          >
            {loading ? "Registering..." : "Finalize Asset"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export function ExportModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [format, setFormat] = useState("pdf");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      console.log(`Exporting as ${format.toUpperCase()}`);
      setIsExporting(false);
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick Export" size="sm">
      <div className="grid gap-5">
        <p className="text-sm text-zinc-400">
          Generate tax-ready financial reports for Q2 in your preferred format.
        </p>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-white">Format</label>
          <div className="space-y-2">
            {[
              { value: "pdf", label: "PDF - Best for printing" },
              { value: "csv", label: "CSV - For spreadsheets" },
              { value: "json", label: "JSON - For integrations" },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value={option.value}
                  checked={format === option.value}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-white">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-line">
          <button
            onClick={onClose}
            disabled={isExporting}
            className="flex-1 px-4 py-2 border border-line text-white font-semibold bg-transparent hover:bg-white/5 transition-colors rounded-sm disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex-1 px-4 py-2 bg-brand text-white font-semibold hover:bg-[#ff343a] transition-colors rounded-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isExporting ? (
              <>
                <span className="inline-block animate-spin">⟳</span>
                Exporting...
              </>
            ) : (
              <>📥 Export</>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
export function CreateTaskModal({
  isOpen,
  onClose,
  onCreate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (task: any) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [projects, setProjects] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectId: "",
    assignedToId: "",
    priority: "MEDIUM",
    dueDate: "",
  });

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          const [pRes, uRes] = await Promise.all([
            api.get("/projects"),
            api.get("/users"),
          ]);
          if (pRes.ok && uRes.ok) {
            setProjects((await pRes.json()).data || []);
            setUsers((await uRes.json()).data || []);
          }
        } catch (err) {
          console.error("Failed to fetch task form data:", err);
        }
      };
      fetchData();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Clean data: don't send empty string for optional UUID
    const payload = { ...formData };
    if (!payload.assignedToId) delete payload.assignedToId;

    try {
      const res = await api.post("/tasks", payload);
      if (res.ok) {
        const newTask = (await res.json()).data;
        if (onCreate) onCreate(newTask);
        onClose();
        setFormData({
          title: "",
          description: "",
          projectId: "",
          assignedToId: "",
          priority: "MEDIUM",
          dueDate: "",
        });
      } else {
        const errJson = await res.json();
        setError(errJson.message || "Failed to create task");
      }
    } catch (err: any) {
      setError(err.message || "Task creation failed");
      console.error("Task creation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Initialize Task" size="md">
      <form onSubmit={handleSubmit} className="grid gap-5">
        {error && (
          <div className="bg-brand/10 border border-brand/20 p-3 rounded text-brand text-[10px] font-bold uppercase tracking-wider">
            {error}
          </div>
        )}
        <div className="grid gap-2">
          <label className="text-xs font-black uppercase tracking-widest text-[#9897a1]">Task Title</label>
          <input
            required
            type="text"
            className="bg-[#0b0b0d] border border-white/10 text-white px-4 py-3 rounded-lg focus:border-brand/30 outline-none"
            placeholder="e.g., Integrate Auth Middleware"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-[#9897a1]">Project</label>
            <select
              required
              className="bg-[#0b0b0d] border border-white/10 text-white px-4 py-3 rounded-lg focus:border-brand/30 outline-none"
              value={formData.projectId}
              onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
            >
              <option value="">Select Project</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-[#9897a1]">Assignee</label>
            <select
              className="bg-[#0b0b0d] border border-white/10 text-white px-4 py-3 rounded-lg focus:border-brand/30 outline-none"
              value={formData.assignedToId}
              onChange={(e) => setFormData({ ...formData, assignedToId: e.target.value })}
            >
              <option value="">Unassigned</option>
              {formData.projectId ? (
                projects.find(p => p.id === formData.projectId)?.members?.map((m: any) => (
                  <option key={m.user.id} value={m.user.id}>{m.user.fullName}</option>
                ))
              ) : (
                users.map(u => <option key={u.id} value={u.id}>{u.fullName}</option>)
              )}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-[#9897a1]">Priority</label>
            <select
              className="bg-[#0b0b0d] border border-white/10 text-white px-4 py-3 rounded-lg focus:border-brand/30 outline-none"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-[#9897a1]">Due Date</label>
            <input
              type="date"
              className="bg-[#0b0b0d] border border-white/10 text-white px-4 py-3 rounded-lg focus:border-brand/30 outline-none"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-black uppercase tracking-widest text-[#9897a1]">Description</label>
          <textarea
            rows={3}
            className="bg-[#0b0b0d] border border-white/10 text-white px-4 py-3 rounded-lg focus:border-brand/30 outline-none resize-none"
            placeholder="Mission parameters..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="flex gap-4 pt-4 border-t border-white/5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3.5 border border-white/10 text-[#9897a1] font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition-colors rounded-lg"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            type="submit"
            className="flex-1 px-4 py-3.5 bg-brand text-white font-bold uppercase tracking-widest text-[10px] hover:bg-[#ff343a] transition-colors rounded-lg shadow-[0_4px_14px_rgba(255,32,38,0.3)] disabled:opacity-50"
          >
            {loading ? "Allocating..." : "Assign Mission"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
export function TaskDetailsModal({
  isOpen,
  onClose,
  task,
}: {
  isOpen: boolean;
  onClose: () => void;
  task: any;
}) {
  const [loading, setLoading] = useState(false);
  const [fullTask, setFullTask] = useState<any>(task);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    if (!task?.id) return;
    try {
      const res = await api.get(`/tasks/${task.id}/comments`);
      if (res.ok) {
        setComments((await res.json()).data);
      }
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  const fetchTaskDetails = async () => {
    if (!task?.id) return;
    try {
      const res = await api.get(`/tasks/${task.id}`);
      if (res.ok) {
        const data = await res.json();
        setFullTask(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch task details:", err);
    }
  };

  useEffect(() => {
    if (isOpen && task?.id) {
      fetchTaskDetails();
      fetchComments();
    }
  }, [isOpen, task?.id]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setLoading(true);
    try {
      const res = await api.post(`/tasks/${task.id}/comments`, { content: newComment });
      if (res.ok) {
        setNewComment("");
        fetchComments();
      }
    } catch (err) {
      console.error("Failed to add comment:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!task) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Intelligence" size="lg">
      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        {/* Main Info & Comments */}
        <div className="grid gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <span className="text-[10px] font-black uppercase tracking-widest text-brand">{fullTask?.project?.name || "Sector Assigned"}</span>
               <div className="h-1 w-1 rounded-full bg-[#9897a1]/40" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-[#9897a1]">{fullTask?.status}</span>
               <div className="h-1 w-1 rounded-full bg-[#9897a1]/40" />
               <span className={`text-[10px] font-bold uppercase tracking-widest ${fullTask?.priority === 'HIGH' ? 'text-brand' : 'text-zinc-500'}`}>
                  {fullTask?.priority} Priority
               </span>
            </div>
            <h2 className="text-2xl font-bold text-white">{fullTask?.title}</h2>
            <p className="mt-4 text-sm text-[#9897a1] leading-relaxed">{fullTask?.description || "No mission description provided."}</p>
          </div>

          <div className="grid gap-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white border-b border-white/5 pb-2">Comms Log</h3>
            <div className="flex flex-col gap-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <div className="h-8 w-8 rounded-lg bg-zinc-800 border border-white/5 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                    {comment.user?.fullName.split(' ').map((n: any) => n[0]).join('')}
                  </div>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-3">
                       <span className="text-xs font-bold text-white">{comment.user?.fullName}</span>
                       <span className="text-[9px] font-bold text-[#9897a1]/40 uppercase tracking-widest">
                          {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </span>
                    </div>
                    <p className="text-xs text-[#9897a1] leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              ))}
              {comments.length === 0 && (
                <div className="py-8 text-center text-[10px] font-bold uppercase tracking-widest text-[#9897a1]/30">
                   No signals recorded.
                </div>
              )}
            </div>

            <form onSubmit={handleAddComment} className="relative mt-2">
               <textarea
                 rows={2}
                 value={newComment}
                 onChange={(e) => setNewComment(e.target.value)}
                 placeholder="Enter signal payload..."
                 className="w-full bg-[#0b0b0d] border border-white/10 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-brand/30 resize-none pr-12"
               />
               <button 
                 disabled={loading || !newComment.trim()}
                 type="submit"
                 className="absolute right-3 bottom-3 text-brand hover:text-[#ff343a] disabled:opacity-30 transition-colors"
               >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
               </button>
            </form>
          </div>
        </div>

        {/* Sidebar Metadata */}
        <div className="grid gap-6 border-l border-white/5 pl-8">
           <div className="grid gap-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-[#9897a1]">Assignee</span>
              <div className="flex items-center gap-3">
                 <div className="h-6 w-6 rounded-full bg-zinc-800 border border-white/5 flex items-center justify-center text-[8px] font-bold text-white">
                    {task.assignedTo?.fullName.split(' ').map((n: any) => n[0]).join('') || '?'}
                 </div>
                 <span className="text-xs font-bold text-white/80">{task.assignedTo?.fullName || "Unassigned"}</span>
              </div>
           </div>
           
           <div className="grid gap-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-[#9897a1]">Priority</span>
              <div className="flex items-center gap-2">
                 <div className={`h-1.5 w-1.5 rounded-full ${task.priority === 'CRITICAL' ? 'bg-brand shadow-[0_0_8px_rgba(255,32,38,0.5)]' : 'bg-zinc-600'}`} />
                 <span className="text-[10px] font-black uppercase tracking-widest text-white">{task.priority}</span>
              </div>
           </div>

           <div className="grid gap-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-[#9897a1]">Due Date</span>
              <span className="font-mono text-xs font-bold text-white">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'NO DEADLINE'}</span>
           </div>

           <div className="pt-4 mt-auto border-t border-white/5">
              <button onClick={onClose} className="w-full py-2.5 rounded-lg border border-white/10 text-[10px] font-black uppercase tracking-widest text-[#9897a1] hover:bg-white/5 hover:text-white transition-all">
                 Dismiss
              </button>
           </div>
        </div>
      </div>
    </Modal>
  );
}
export function CreateClientModal({
  isOpen,
  onClose,
  onCreate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (client: any) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/clients", formData);
      if (res.ok) {
        const newClient = (await res.json()).data;
        if (onCreate) onCreate(newClient);
        onClose();
        setFormData({
          companyName: "",
          contactPerson: "",
          email: "",
          phone: "",
        });
      }
    } catch (err) {
      console.error("Client creation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register Client Partner" size="md">
      <form onSubmit={handleSubmit} className="grid gap-5">
        <div className="grid gap-2">
          <label className="text-xs font-black uppercase tracking-widest text-[#9897a1]">Company Name</label>
          <input
            required
            type="text"
            className="bg-[#0b0b0d] border border-white/10 text-white px-4 py-3 rounded-lg focus:border-brand/30 outline-none"
            placeholder="e.g., Acme Corp"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          />
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-black uppercase tracking-widest text-[#9897a1]">Contact Person</label>
          <input
            required
            type="text"
            className="bg-[#0b0b0d] border border-white/10 text-white px-4 py-3 rounded-lg focus:border-brand/30 outline-none"
            placeholder="Jane Smith"
            value={formData.contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-[#9897a1]">Email Address</label>
            <input
              required
              type="email"
              className="bg-[#0b0b0d] border border-white/10 text-white px-4 py-3 rounded-lg focus:border-brand/30 outline-none"
              placeholder="contact@acme.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-[#9897a1]">Phone Number</label>
            <input
              type="text"
              className="bg-[#0b0b0d] border border-white/10 text-white px-4 py-3 rounded-lg focus:border-brand/30 outline-none"
              placeholder="+1-..."
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t border-white/5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3.5 border border-white/10 text-[#9897a1] font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition-colors rounded-lg"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            type="submit"
            className="flex-1 px-4 py-3.5 bg-brand text-white font-bold uppercase tracking-widest text-[10px] hover:bg-[#ff343a] transition-colors rounded-lg shadow-[0_4px_14px_rgba(255,32,38,0.3)] disabled:opacity-50"
          >
            {loading ? "Registering..." : "Authorize Partner"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
