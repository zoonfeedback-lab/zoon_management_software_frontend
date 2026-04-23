"use client";

import { useState } from "react";
import { BarChart, PrimaryButton, Section, StatusBadge } from "@/components/ui";
import { CreateInvoiceModal, SearchFilterModal, ExportModal } from "@/components/modals";
import { invoices as initialInvoices, paymentMetrics } from "@/lib/data";

export default function PaymentsClient() {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [invoices, setInvoices] = useState(initialInvoices);

  const chartData = [
    { label: "JAN", value: 28, maxValue: 100 },
    { label: "FEB", value: 42, maxValue: 100 },
    { label: "MAR", value: 39, maxValue: 100 },
    { label: "APR", value: 61, maxValue: 100 },
    { label: "MAY", value: 70, maxValue: 100 },
    { label: "JUN", value: 82, maxValue: 100 },
  ];

  const distributionData = [
    { method: "Direct Deposit", percentage: 72 },
    { method: "Crypto (USDC)", percentage: 18 },
    { method: "Wire Transfer", percentage: 10 },
  ];

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateInvoice = (invoice: { id: string; project: string; amount: string; dueDate: string; status: string }) => {
    setInvoices((prev) => [invoice, ...prev]);
  };

  const handleFilterApply = (filters: any) => {
    console.log("Filters applied:", filters);
  };

  return (
    <>
      <div className="grid gap-6">
        <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand">zoon / Revenue Ops</p>
            <h1 className="display-title text-4xl text-white md:text-5xl">Payments &amp; Invoicing</h1>
            <p className="mt-4 max-w-4xl text-base leading-7 text-mute md:text-lg">
              Manage project revenue and engineering contracts.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setIsInvoiceModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-brand px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#ff343a] md:px-5 md:py-3 md:text-sm"
            >
              Create New Invoice
            </button>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {paymentMetrics.map((metric, index) => (
            <article key={metric.label} className="panel-surface grid gap-4 p-6 relative overflow-hidden">
              {metric.accent === "red" && (
                <div className="absolute top-0 right-0 w-1 h-full bg-brand"></div>
              )}
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-mute">{metric.label}</span>
                <span className={`text-2xl ${index === 2 ? "text-brand" : "text-zinc-600"}`}>
                  {index === 0 ? "📋" : index === 1 ? "✓" : "⚠️"}
                </span>
              </div>
              <div className="display-title text-3xl md:text-4xl text-white">{metric.value}</div>
              <div className={metric.accent === "green" ? "text-success" : metric.accent === "red" ? "text-brand" : "text-mute text-sm"}>
                {metric.note}
              </div>
            </article>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_1fr]">
          <Section title="Revenue Overview" eyebrow="6 Month Window">
            <div className="p-6 md:p-7">
              <BarChart data={chartData} />
            </div>
          </Section>

          <div className="grid gap-4 auto-rows-max">
            <Section title="Payment Distribution" eyebrow="Collection Split">
              <div className="space-y-4 p-6 md:p-7">
                {distributionData.map((item, idx) => (
                  <div key={item.method}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-zinc-400 uppercase">{item.method}</span>
                      <span className="text-xs font-bold text-white">{item.percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-sm overflow-hidden">
                      <div
                        className={`h-full rounded-sm ${
                          idx === 0 ? "bg-brand" : idx === 1 ? "bg-white" : "bg-zinc-600"
                        }`}
                        data-width
                        style={{ \"--dynamic-width\": `${item.percentage}%` } as any}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <button
              onClick={() => setIsExportModalOpen(true)}
              className="bg-brand p-6 md:p-7 text-white relative overflow-hidden group cursor-pointer hover:opacity-90 transition-opacity border-0"
            >
              <div className="relative z-10">
                <h4 className="font-bold text-lg mb-1">Quick Export</h4>
                <p className="text-white/70 text-sm">Generate tax-ready financial reports for Q2.</p>
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="text-9xl">📊</span>
              </div>
            </button>
          </div>
        </div>

        <Section title="Recent Invoices" eyebrow="Billing Table">
          <div className="border-b border-line p-4 md:p-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-zinc-900/30">
            <div className="relative flex-1 max-w-md w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/50 border border-line text-white text-sm px-9 py-2 rounded-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/50 placeholder:text-zinc-500 transition-colors"
              />
            </div>
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="bg-zinc-800 hover:bg-zinc-700 border border-line px-4 py-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap rounded-sm"
            >
              <span>⚙️</span>
              Filters
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-line bg-black/30">
                  {[
                    "Invoice ID",
                    "Project Name",
                    "Amount",
                    "Due Date",
                    "Status",
                    "",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-6 py-4 text-xs font-bold uppercase tracking-[0.22em] text-mute"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filteredInvoices.map((invoice, index) => (
                  <tr
                    key={invoice.id}
                    className={`transition hover:bg-white/[0.03] ${
                      index % 2 === 1 ? "bg-black/20" : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-mono text-zinc-400">{invoice.id}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-white">
                      {invoice.project}
                    </td>
                    <td className="px-6 py-4 text-sm text-white">{invoice.amount}</td>
                    <td className="px-6 py-4 text-sm text-zinc-400">{invoice.dueDate}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={invoice.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-zinc-500 hover:text-white transition-colors">
                        ⋮
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-line px-6 py-4 flex justify-between items-center text-xs text-zinc-500 font-bold uppercase tracking-wider">
            <span>Showing {filteredInvoices.length} of {invoices.length} Invoices</span>
            <div className="flex gap-4">
              <button className="hover:text-white flex items-center gap-1 transition-colors">
                ← Previous
              </button>
              <button className="hover:text-white flex items-center gap-1 transition-colors">
                Next →
              </button>
            </div>
          </div>
        </Section>
      </div>

      <CreateInvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        onCreate={handleCreateInvoice}
      />
      <SearchFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleFilterApply}
      />
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </>
  );
}
