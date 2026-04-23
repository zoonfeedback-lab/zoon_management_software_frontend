"use client";

import React, { useState } from "react";
import { BarChart, Section, StatusBadge } from "@/components/ui";
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
    { method: "Direct Deposit", percentage: 72, color: "bg-[#ff2026]" },
    { method: "Crypto (USDC)", percentage: 18, color: "bg-white" },
    { method: "Wire Transfer", percentage: 10, color: "bg-zinc-600" },
  ];

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateInvoice = (invoice: { id: string; project: string; amount: string; dueDate: string; status: "Paid" | "Pending" | "Overdue" }) => {
    setInvoices((prev) => [invoice, ...prev]);
  };

  const handleFilterApply = (filters: any) => {
    console.log("Filters applied:", filters);
  };

  return (
    <>
      <div className="grid gap-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff2026]">Finance / Revenue Ops</p>
            <h1 className="display-title text-4xl text-white md:text-5xl font-bold">Payments & Invoicing</h1>
            <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[#9897a1]">
              Manage multi-currency revenue streams, engineering contracts, and automated invoicing cycles.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
             <button
              onClick={() => setIsExportModalOpen(true)}
              className="flex items-center justify-center gap-3 border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white/[0.08] rounded-lg"
            >
              Export Reports
            </button>
            <button
              onClick={() => setIsInvoiceModalOpen(true)}
              className="inline-flex items-center justify-center gap-3 bg-[#ff2026] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#ff343a] rounded-lg shadow-[0_4px_14px_rgba(255,32,38,0.3)]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Generate Invoice
            </button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid gap-4 md:grid-cols-3">
          {paymentMetrics.map((metric, index) => (
            <article key={metric.label} className="panel-surface relative flex flex-col gap-4 overflow-hidden rounded-xl bg-[#171719] p-7 shadow-xl">
              <div className="flex items-center justify-between">
                 <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9897a1]">{metric.label}</span>
                 <div className={`h-2 w-2 rounded-full ${metric.accent === 'green' ? 'bg-success' : metric.accent === 'red' ? 'bg-brand' : 'bg-white'}`} />
              </div>
              <div className="display-title text-3xl font-bold text-white md:text-4xl">{metric.value}</div>
              <div className={`text-xs font-bold ${metric.accent === "green" ? "text-success" : metric.accent === "red" ? "text-brand" : "text-[#9897a1]/60"}`}>
                {metric.note}
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white/5">
                 <div className={`h-full ${metric.accent === 'green' ? 'bg-success' : metric.accent === 'red' ? 'bg-brand' : 'bg-white/20'}`} style={{ width: index === 0 ? '75%' : index === 1 ? '90%' : '15%' }} />
              </div>
            </article>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <Section title="Revenue Forecast" eyebrow="6 Month Trajectory">
            <div className="p-8">
              <BarChart data={chartData} />
            </div>
          </Section>

          <div className="grid gap-6">
            <Section title="Asset Distribution" eyebrow="Payment Rails">
              <div className="grid gap-6 p-8">
                {distributionData.map((item) => (
                  <div key={item.method} className="grid gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#9897a1]">{item.method}</span>
                      <span className="font-mono text-xs font-bold text-white">{item.percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${item.color}`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <div className="panel-surface relative overflow-hidden rounded-xl bg-gradient-to-br from-[#ff2026] to-[#b91c1c] p-8 text-white shadow-2xl">
               <div className="relative z-10">
                  <h4 className="text-xl font-bold">Tax Compliance</h4>
                  <p className="mt-2 text-sm text-white/80 leading-relaxed">Automatic generation of regional tax reports and VAT compliance for Q3 is now active.</p>
                  <button className="mt-6 text-[10px] font-black uppercase tracking-widest bg-white text-brand px-4 py-2 rounded">Check Status</button>
               </div>
               <svg className="absolute -right-4 -bottom-4 h-32 w-32 text-white/10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <Section title="Billing Registry" eyebrow="Recent Invoices">
          <div className="flex flex-col gap-4 border-b border-white/5 bg-white/[0.01] p-6 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full max-w-md">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9897a1]/40" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input
                type="text"
                placeholder="Filter by ID or Project..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-[#0b0b0d] py-3 pl-12 pr-4 text-sm text-white transition-all focus:border-[#ff2026]/30 focus:ring-1 focus:ring-[#ff2026]/20"
              />
            </div>
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#9897a1] transition hover:bg-white/[0.08] hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
              Filters
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white/[0.01]">
                  {["Invoice ID", "Project / Engagement", "Amount", "Due Date", "Status", ""].map((heading) => (
                    <th key={heading} className="px-8 py-5 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-[#9897a1]">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="transition hover:bg-white/[0.02]">
                    <td className="px-8 py-6 font-mono text-xs font-bold text-[#ff2026]/80">{invoice.id}</td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-white">{invoice.project}</div>
                    </td>
                    <td className="px-8 py-6 font-mono text-sm font-bold text-white">{invoice.amount}</td>
                    <td className="px-8 py-6 text-sm text-[#9897a1]">{invoice.dueDate}</td>
                    <td className="px-8 py-6">
                      <StatusBadge status={invoice.status} />
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-[#9897a1] transition hover:text-white">
                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.01] px-8 py-5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9897a1]/40">
              Audit log synchronized • Total Invoices: {invoices.length}
            </span>
            <div className="flex gap-4">
              <button className="text-[10px] font-black uppercase tracking-widest text-[#9897a1] hover:text-white">Previous</button>
              <button className="text-[10px] font-black uppercase tracking-widest text-[#ff2026]">Next</button>
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
