"use client";

import React, { ReactNode, useState } from "react";

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
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    category: "",
    budget: "",
    timeline: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Project created:", formData);
    onClose();
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
            <input
              type="text"
              required
              className="bg-black/50 border border-line text-white px-3 py-2 rounded-sm focus:border-brand focus:outline-none transition-colors"
              placeholder="Client name"
              value={formData.client}
              onChange={(e) =>
                setFormData({ ...formData, client: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="filter-category" className="text-sm font-semibold text-white">Category *</label>
            <select
              id="filter-category"
              title="Select category"
              required
              className="bg-black/50 border border-line text-white px-3 py-2 rounded-sm focus:border-brand focus:outline-none transition-colors"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="">Select category</option>
              <option value="Web Development">Web Development</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Security">Security</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-white">Budget *</label>
            <input
              type="text"
              required
              className="bg-black/50 border border-line text-white px-3 py-2 rounded-sm focus:border-brand focus:outline-none transition-colors"
              placeholder="$50,000"
              value={formData.budget}
              onChange={(e) =>
                setFormData({ ...formData, budget: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-white">Timeline *</label>
            <input
              type="text"
              required
              className="bg-black/50 border border-line text-white px-3 py-2 rounded-sm focus:border-brand focus:outline-none transition-colors"
              placeholder="3 Months"
              value={formData.timeline}
              onChange={(e) =>
                setFormData({ ...formData, timeline: e.target.value })
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
            className="flex-1 px-4 py-2 bg-brand text-white font-semibold hover:bg-[#ff343a] transition-colors rounded-sm"
          >
            Create Project
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
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = () => {
    console.log("Uploading files:", files);
    setFiles([]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Files" size="md">
      <div className="grid gap-5">
        <div className="border border-dashed border-line p-8 rounded-sm text-center hover:border-brand transition-colors group cursor-pointer">
          <input
            type="file"
            multiple
            className="hidden"
            id="file-upload"
            onChange={handleFileChange}
            accept=".pdf,.zip,.doc,.docx"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer block"
          >
            <p className="text-2xl mb-2">📤</p>
            <p className="text-white font-semibold">Drop files here or click to select</p>
            <p className="text-sm text-zinc-500 mt-1">Max 50MB per file. Supported: PDF, ZIP, DOCX</p>
          </label>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-white">Files to upload:</p>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-zinc-900/50 p-2 rounded-sm text-sm"
                >
                  <span className="text-white truncate">{file.name}</span>
                  <span className="text-zinc-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t border-line">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-line text-white font-semibold bg-transparent hover:bg-white/5 transition-colors rounded-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={files.length === 0}
            className="flex-1 px-4 py-2 bg-brand text-white font-semibold hover:bg-[#ff343a] transition-colors rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload {files.length > 0 ? `(${files.length})` : ""}
          </button>
        </div>
      </div>
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
