"use client";

import { useState } from "react";
import { GhostButton, PrimaryButton, StatusBadge } from "@/components/ui";

const DUMMY_INVOICES = [
  { id: "#INV-98224", desc: "Q3 Infrastructure Scaling Phase", date: "Oct 24, 2023", amount: "$8,500.00", status: "PENDING" },
  { id: "#INV-98210", desc: "Security Audit & Encryption Layer", date: "Oct 12, 2023", amount: "$3,950.00", status: "OVERDUE" },
  { id: "#INV-98195", desc: "Monthly Cloud Governance Retainer", date: "Sep 28, 2023", amount: "$12,000.00", status: "PAID" },
  { id: "#INV-98182", desc: "AI/ML Integration - Phase 1", date: "Sep 14, 2023", amount: "$24,500.00", status: "PAID" },
];

export default function ClientPaymentsClient() {
  return (
    <div className="min-h-screen bg-[#050608] p-8 lg:p-12 text-white font-sans selection:bg-brand/30">
      {/* Header Section */}
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
        <div>
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand mb-2">Secure Billing Terminal</p>
           <h1 className="text-4xl font-black tracking-tight text-white italic uppercase">Financial Hub</h1>
           <p className="mt-4 text-[#868b97] text-sm font-medium tracking-wide max-w-xl">
             Manage your project investments, track pending invoices, and access your billing history with cryptographic precision.
           </p>
        </div>
        <button className="bg-brand text-white text-[10px] font-black uppercase tracking-[0.2em] px-8 py-4 hover:bg-[#ff343a] transition-all shadow-[0_0_25px_rgba(255,32,38,0.2)]">
          Update Payment Method
        </button>
      </header>

      {/* KPI HUD */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-[#0b0d12] border border-white/5 p-8 rounded-sm relative overflow-hidden group">
           <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5e626d] mb-4">Total Investment to Date</p>
           <p className="text-4xl font-black text-white italic mb-8">$142,500.00</p>
           <div className="flex items-center gap-2">
              <span className="text-brand text-[10px] font-bold">↗</span>
              <span className="text-brand text-[9px] font-black uppercase tracking-widest">+12.4% from last quarter</span>
           </div>
           <div className="absolute -right-4 -bottom-4 size-32 text-white/[0.02] rotate-12" viewBox="0 0 24 24">
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/><path d="M7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/></svg>
           </div>
        </div>

        <div className="bg-[#0b0d12] border border-white/5 p-8 rounded-sm relative overflow-hidden group">
           <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5e626d] mb-4">Outstanding Balance</p>
           <p className="text-4xl font-black text-white italic mb-2">$12,450.00</p>
           <p className="text-[9px] font-bold text-brand uppercase tracking-widest mb-8 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-brand animate-pulse" />
              Due in 4 days
           </p>
           <button className="w-full py-4 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white/5 transition-all">
             Settle Balance
           </button>
        </div>

        <div className="bg-[#0b0d12] border border-white/5 p-8 rounded-sm relative overflow-hidden group">
           <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5e626d] mb-4">Active Deliverables</p>
           <p className="text-4xl font-black text-white italic mb-4">04</p>
           <p className="text-[10px] font-medium text-[#5e626d] uppercase tracking-widest leading-relaxed">
             Currently being processed for final financial clearance.
           </p>
           {/* Decorative Grid Pattern */}
           <div className="absolute right-0 bottom-0 p-4 opacity-5">
              <div className="grid grid-cols-4 gap-1">
                 {[...Array(16)].map((_, i) => (
                    <div key={i} className="size-3 border border-white" />
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Invoice Registry */}
      <div className="bg-[#0b0d12] border border-white/5 rounded-sm overflow-hidden mb-12">
         <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/90">Invoice Registry</h3>
            <div className="relative">
               <input 
                 type="text" 
                 placeholder="Filter by ID..." 
                 className="bg-[#111214] border border-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white placeholder:text-zinc-700 focus:border-brand/40 outline-none w-64"
               />
               <span className="absolute right-3 top-2 text-[#5e626d]">🔍</span>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="text-[9px] font-black uppercase tracking-[0.3em] text-[#4a4b51] border-b border-white/5">
                     <th className="px-8 py-6">Invoice ID</th>
                     <th className="px-8 py-6">Description</th>
                     <th className="px-8 py-6">Date</th>
                     <th className="px-8 py-6">Amount</th>
                     <th className="px-8 py-6">Status</th>
                     <th className="px-8 py-6 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/[0.02]">
                  {DUMMY_INVOICES.map(inv => (
                    <tr key={inv.id} className="group hover:bg-white/[0.01] transition-colors">
                       <td className="px-8 py-8 font-mono text-[11px] text-zinc-400">{inv.id}</td>
                       <td className="px-8 py-8">
                          <p className="text-[11px] font-bold text-white uppercase tracking-wider">{inv.desc}</p>
                       </td>
                       <td className="px-8 py-8 text-[11px] font-medium text-zinc-500">{inv.date}</td>
                       <td className="px-8 py-8 font-mono text-xs font-black text-white">{inv.amount}</td>
                       <td className="px-8 py-8">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                            inv.status === 'PAID' ? 'bg-success/5 border-success/20 text-success' : 
                            inv.status === 'OVERDUE' ? 'bg-brand/5 border-brand/20 text-brand' : 
                            'bg-white/5 border-white/10 text-zinc-500'
                          }`}>
                            {inv.status}
                          </span>
                       </td>
                       <td className="px-8 py-8 text-right">
                          {inv.status === 'PAID' ? (
                            <div className="flex items-center justify-end gap-3">
                               <svg className="size-4 text-zinc-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                               <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Processed</span>
                            </div>
                          ) : (
                            <button className="flex items-center justify-end gap-3 group/btn">
                               <svg className="size-4 text-brand group-hover/btn:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                               <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand group-hover/btn:text-white transition-all underline decoration-brand/30">Pay Now</span>
                            </button>
                          )}
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
         
         <div className="p-6 border-t border-white/5 flex justify-between items-center bg-white/[0.01]">
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#5e626d]">Showing <span className="text-white">4</span> of <span className="text-white">28</span> invoices</p>
            <div className="flex gap-2">
               <button className="size-8 border border-white/5 flex items-center justify-center text-zinc-600 hover:text-white hover:border-white/20 transition-all rounded-sm">{"<"}</button>
               <button className="size-8 border border-white/5 flex items-center justify-center text-zinc-600 hover:text-white hover:border-white/20 transition-all rounded-sm">{">"}</button>
            </div>
         </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
         <div className="bg-[#0b0d12] border border-white/5 p-8 rounded-sm flex items-center gap-6 group hover:border-brand/20 transition-all cursor-pointer">
            <div className="size-16 bg-brand/10 border border-brand/20 flex items-center justify-center text-2xl group-hover:bg-brand group-hover:text-white transition-all">
               📊
            </div>
            <div>
               <h4 className="text-sm font-black uppercase tracking-widest text-white mb-2">Investment Analytics</h4>
               <p className="text-[10px] text-zinc-500 font-medium leading-relaxed max-w-sm mb-4">
                 View detailed breakdowns of capital allocation across your technology stack and project deliverables.
               </p>
               <p className="text-[9px] font-black uppercase tracking-widest text-brand group-hover:translate-x-1 transition-transform">View Reports →</p>
            </div>
         </div>

         <div className="bg-[#0b0d12] border border-white/5 p-8 rounded-sm flex items-center gap-6 group hover:border-brand/20 transition-all cursor-pointer">
            <div className="size-16 bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:bg-brand group-hover:text-white transition-all">
               🛡️
            </div>
            <div>
               <h4 className="text-sm font-black uppercase tracking-widest text-white mb-2">Encrypted Vault</h4>
               <p className="text-[10px] text-zinc-500 font-medium leading-relaxed max-w-sm mb-4">
                 Securely download all past tax receipts and signed contracts associated with your Zoon accounts.
               </p>
               <p className="text-[9px] font-black uppercase tracking-widest text-brand group-hover:translate-x-1 transition-transform">Access Files →</p>
            </div>
         </div>
      </div>
    </div>
  );
}
