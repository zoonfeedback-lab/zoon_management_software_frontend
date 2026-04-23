import { mockClients } from "@/lib/data";
import { StatusBadge } from "@/components/ui";

export default function ClientsPage() {
  return (
    <div className="grid gap-8">
      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <article className="panel-surface relative flex flex-col gap-3 overflow-hidden rounded-xl bg-[#171719] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9897a1]">Total Clients</span>
            <div className="rounded-full bg-white/5 p-2">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff2026" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="display-title text-3xl font-bold text-white md:text-4xl">128</span>
            <span className="flex items-center gap-1 text-sm font-bold text-success">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m5 12 7-7 7 7"/></svg>
              12%
            </span>
          </div>
          <p className="text-xs text-[#9897a1]/60">Across 14 global regions</p>
        </article>

        <article className="panel-surface relative flex flex-col gap-3 overflow-hidden rounded-xl bg-[#171719] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9897a1]">Active Partners</span>
            <div className="rounded-full bg-white/5 p-2">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff2026" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="display-title text-3xl font-bold text-white md:text-4xl">94</span>
            <span className="text-xs font-bold text-white/80">88.2% Retention</span>
          </div>
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/5">
            <div className="absolute inset-y-0 left-0 bg-[#ff2026]" style={{ width: "88%" }} />
          </div>
        </article>

        <article className="panel-surface relative flex flex-col gap-3 overflow-hidden rounded-xl bg-[#171719] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9897a1]">New Clients (Month)</span>
            <div className="rounded-full bg-white/5 p-2">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff2026" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="display-title text-3xl font-bold text-white md:text-4xl">12</span>
            <span className="flex items-center gap-1 text-sm font-bold text-brand">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m19 12-7 7-7-7"/></svg>
              4%
            </span>
          </div>
          <p className="text-xs text-[#9897a1]/60">Compared to last month (16)</p>
        </article>
      </div>

      {/* Main Table Section */}
      <div className="panel-surface overflow-hidden rounded-xl bg-[#171719] shadow-2xl">
        {/* Table Controls */}
        <div className="flex flex-col items-center justify-between gap-4 border-b border-white/5 p-6 md:flex-row">
          <div className="relative w-full max-w-md">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9897a1]/40" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input 
              type="text" 
              placeholder="Search clients..." 
              className="w-full rounded-lg border border-white/5 bg-[#0b0b0d] py-3 pl-12 pr-4 text-sm text-white transition-all focus:border-[#ff2026]/30 focus:ring-1 focus:ring-[#ff2026]/20"
            />
          </div>
          <div className="flex w-full gap-3 md:w-auto">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white/[0.08] md:flex-none">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
              Filter
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#ff2026] px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#ff343a] md:flex-none">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add New Client
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/[0.02]">
                <th className="px-8 py-5 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-[#9897a1]">Client</th>
                <th className="px-8 py-5 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-[#9897a1]">Active Projects</th>
                <th className="px-8 py-5 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-[#9897a1]">Total Revenue</th>
                <th className="px-8 py-5 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-[#9897a1]">Status</th>
                <th className="px-8 py-5 text-right text-[10px] font-bold uppercase tracking-[0.2em] text-[#9897a1]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockClients.map((client) => (
                <tr key={client.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 overflow-hidden rounded bg-white/5 flex items-center justify-center text-xs font-bold text-white/40 border border-white/5">
                        {client.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-white">{client.name}</div>
                        <div className="text-xs text-[#9897a1]/60">{client.contact}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3 font-mono text-lg text-white/90">
                      {client.activeProjects}
                      {client.activeProjects > 5 && (
                        <div className="flex -space-x-2">
                           <div className="h-5 w-5 rounded-full border border-[#171719] bg-zinc-700 text-[8px] flex items-center justify-center">S.</div>
                           <div className="h-5 w-5 rounded-full border border-[#171719] bg-zinc-600 text-[8px] flex items-center justify-center">RT</div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6 font-mono font-bold text-white">{client.totalRevenue}</td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      client.status === 'ACTIVE' 
                        ? 'bg-success/10 text-success border border-success/20' 
                        : 'bg-white/5 text-[#9897a1] border border-white/10'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-[#9897a1] transition hover:text-white">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-white/5 px-8 py-4">
          <p className="text-[11px] text-[#9897a1]/60">Showing 1 to 4 of 128 clients</p>
          <div className="flex gap-2">
            <button className="rounded border border-white/5 bg-white/[0.03] p-1.5 text-[#9897a1] hover:bg-white/[0.08] hover:text-white disabled:opacity-30">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button className="rounded border border-white/5 bg-white/[0.03] p-1.5 text-[#9897a1] hover:bg-white/[0.08] hover:text-white">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px_280px]">
        <div className="panel-surface flex flex-col gap-6 rounded-xl bg-[#171719] p-8 shadow-xl">
           <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9897a1]">Revenue Forecast</p>
              <h3 className="display-title mt-2 text-2xl text-white">Q4: $12.4M Projected</h3>
           </div>
           <div className="flex flex-1 items-end gap-3 px-2">
              {[35, 45, 40, 65, 85, 45].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-white/5 relative group">
                  <div 
                    className={`absolute bottom-0 inset-x-0 rounded-t transition-all duration-700 ${i === 4 ? 'bg-[#ff2026]' : 'bg-white/10 group-hover:bg-white/20'}`} 
                    style={{ height: `${h}%` }} 
                  />
                </div>
              ))}
           </div>
        </div>

        <div className="bg-[#000000] p-8 flex flex-col justify-between border border-white/5 rounded-xl">
           <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/90">System Health</h3>
              <div className="mt-8 grid gap-6">
                <div className="flex items-center justify-between">
                   <span className="text-xs text-white/60">Server Uptime</span>
                   <span className="text-xs font-bold text-success">99.9%</span>
                </div>
                <div className="flex items-center justify-between">
                   <span className="text-xs text-white/60">API Latency</span>
                   <span className="text-xs font-bold text-white">42ms</span>
                </div>
              </div>
           </div>
           <button className="flex items-center justify-between group">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">View Logs</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
           </button>
        </div>

        <div className="panel-surface flex flex-col items-center justify-center gap-6 rounded-xl bg-[#171719] p-8 text-center border border-white/5">
           <div className="rounded-xl bg-brand/10 p-5 border border-brand/20">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff2026" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
           </div>
           <div>
              <h4 className="font-bold text-white">Compliance Audit</h4>
              <p className="mt-2 text-xs text-[#9897a1]/60 leading-relaxed">Next scheduled check:<br/>Oct 24, 2023</p>
           </div>
        </div>
      </div>
    </div>
  );
}
