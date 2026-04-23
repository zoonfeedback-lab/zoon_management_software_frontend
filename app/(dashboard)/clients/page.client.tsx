"use client";

import { useEffect, useState } from "react";
import { CreateClientModal } from "@/components/modals";

interface Client {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  createdAt: string;
}

export default function ClientsClient() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("/api/clients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch clients");
      }

      const data = await response.json();
      setClients(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter(client => 
    client.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="flex h-[400px] items-center justify-center text-mute uppercase tracking-[0.2em]">Synchronizing Partner Grid...</div>;
  }

  return (
    <div className="grid gap-8">
      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <article className="panel-surface relative flex flex-col gap-3 overflow-hidden rounded-xl bg-[#171719] p-6 shadow-xl border border-transparent hover:border-white/5 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9897a1]">Total Clients</span>
            <div className="rounded-full bg-white/5 p-2">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff2026" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="display-title text-3xl font-bold text-white md:text-4xl">{clients.length}</span>
          </div>
          <p className="text-xs text-[#9897a1]/60">Authorized partner nodes</p>
        </article>

        <article className="panel-surface relative flex flex-col gap-3 overflow-hidden rounded-xl bg-[#171719] p-6 shadow-xl border border-transparent hover:border-white/5 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9897a1]">System Health</span>
            <div className="rounded-full bg-white/5 p-2">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff2026" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="display-title text-3xl font-bold text-white md:text-4xl">OPTIMAL</span>
          </div>
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/5">
            <div className="absolute inset-y-0 left-0 bg-success" style={{ width: "99.9%" }} />
          </div>
        </article>

        <article className="panel-surface relative flex flex-col gap-3 overflow-hidden rounded-xl bg-[#171719] p-6 shadow-xl border border-transparent hover:border-white/5 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9897a1]">Compliance Rate</span>
            <div className="rounded-full bg-white/5 p-2">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff2026" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="display-title text-3xl font-bold text-white md:text-4xl">100%</span>
          </div>
          <p className="text-xs text-success uppercase font-bold tracking-widest">Verified</p>
        </article>
      </div>

      {/* Main Table Section */}
      <div className="panel-surface overflow-hidden rounded-xl bg-[#171719] shadow-2xl border border-white/5">
        {/* Table Controls */}
        <div className="flex flex-col items-center justify-between gap-4 border-b border-white/5 p-6 md:flex-row bg-white/[0.01]">
          <div className="relative w-full max-w-md">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9897a1]/40" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input 
              type="text" 
              placeholder="Search clients..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#0b0b0d] py-3 pl-12 pr-4 text-sm text-white transition-all focus:border-[#ff2026]/30 focus:ring-1 focus:ring-[#ff2026]/20 outline-none"
            />
          </div>
          <div className="flex w-full gap-3 md:w-auto">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-6 py-3 text-[10px] font-black uppercase tracking-wider text-[#9897a1] transition hover:bg-white/[0.08] hover:text-white md:flex-none">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
              Filter Signals
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex flex-1 items-center justify-center gap-3 rounded-lg bg-[#ff2026] px-6 py-3 text-[10px] font-black uppercase tracking-wider text-white transition hover:bg-[#ff343a] md:flex-none shadow-[0_4px_14px_rgba(255,32,38,0.3)]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Register Partner
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/[0.02]">
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Client Identity</th>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Lead Contact</th>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Signal Payload (Email)</th>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Authorization</th>
                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredClients.map((client) => (
                <tr key={client.id} className="transition-colors hover:bg-white/[0.02] group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 overflow-hidden rounded-lg bg-zinc-800 flex items-center justify-center text-xs font-bold text-[#ff2026] border border-white/5 group-hover:border-[#ff2026]/30 transition-colors">
                        {client.companyName.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="font-bold text-white group-hover:text-[#ff2026] transition-colors">{client.companyName}</div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-white/80">{client.contactPerson}</td>
                  <td className="px-8 py-6 text-xs font-mono text-[#9897a1]">{client.email}</td>
                  <td className="px-8 py-6">
                    <span className="inline-flex rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-success/10 text-success border border-success/20">
                      ACTIVE_PARTNER
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-[#9897a1] transition hover:text-white">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-xs font-black uppercase tracking-widest text-[#9897a1]/40">
                    No partner signals detected in the current range.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="border-t border-white/5 bg-white/[0.01] px-8 py-4">
           <p className="text-[10px] font-bold uppercase tracking-widest text-[#9897a1]/60">Grid Sync Status: OPTIMAL</p>
        </div>
      </div>

      <CreateClientModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={() => fetchClients()}
      />
    </div>
  );
}
