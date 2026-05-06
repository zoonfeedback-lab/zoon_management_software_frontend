"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { StatCard, StatusBadge, GhostButton, PrimaryButton, Loader } from "@/components/ui";

export default function TeamPageClient() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("ALL");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get('/employees');
        const data = await res.json();
        if (res.ok) {
          setEmployees(data.data || []);
        } else {
          setError(data.message || "Failed to fetch operatives");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const roles = ["ALL", ...new Set(employees.map(e => e.jobTitle || "ENGINEER"))];

  const filteredEmployees = employees.filter(e => {
    const matchesSearch = e.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (e.email && e.email.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRole = filterRole === "ALL" || e.jobTitle === filterRole;
    return matchesSearch && matchesRole;
  });

  const stats = {
    total: employees.length,
    engineers: employees.filter(e => (e.jobTitle || "").toLowerCase().includes('eng')).length,
    designers: employees.filter(e => (e.jobTitle || "").toLowerCase().includes('des')).length,
    available: employees.filter(e => !e.projectMembers || e.projectMembers.length === 0).length
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#09090b]"><Loader /></div>;
  if (error) return <div className="h-screen flex items-center justify-center bg-[#09090b] text-brand font-black uppercase tracking-widest">{error}</div>;

  return (
    <div className="p-6 md:p-10 max-w-[1600px] mx-auto min-h-screen bg-[#09090b]">
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">
            <span>Manager Workspace</span>
            <span>/</span>
            <span className="text-brand">Operative Registry</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-widest uppercase">
             Operative Command
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <PrimaryButton>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
            Add New Operative
          </PrimaryButton>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Operatives" value={stats.total} color="white" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>} />
        <StatCard label="Engineers" value={stats.engineers} color="blue" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>} />
        <StatCard label="Design Units" value={stats.designers} color="green" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.5 1.5"/><path d="M14 11l-4-4"/></svg>} />
        <StatCard label="Available Now" value={stats.available} color="red" trend={stats.available > 0 ? "24" : undefined} icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>} />
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
         <div className="relative flex-1 max-w-md">
            <input 
               type="text" 
               placeholder="Search by name or email..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-[#171719] border border-white/5 px-10 py-3 text-xs font-bold text-white placeholder:text-zinc-600 outline-none focus:border-brand/40 transition-colors"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
         </div>

         <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {roles.map(role => (
               <button 
                  key={role}
                  onClick={() => setFilterRole(role)}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${filterRole === role ? 'bg-brand text-white border-brand shadow-[0_0_10px_rgba(255,32,38,0.2)]' : 'bg-[#171719] text-zinc-500 border-white/5 hover:border-white/10'}`}
               >
                  {role}
               </button>
            ))}
         </div>
      </div>

      {/* Operative Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
         {filteredEmployees.map(member => (
            <div key={member.id} className="group bg-[#171719] border border-white/5 p-6 hover:border-brand/40 transition-all relative overflow-hidden">
               {/* Codename & ID */}
               <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-zinc-800 border border-white/10 grid place-items-center text-sm font-black text-white shadow-lg group-hover:bg-brand transition-colors duration-300">
                     {member.fullName.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="text-right">
                     <div className="text-[9px] font-black text-zinc-600 tracking-widest uppercase mb-1">UNIT_ID</div>
                     <div className="text-[10px] font-mono text-zinc-400">#{member.id.substring(0, 6)}</div>
                  </div>
               </div>

               {/* Bio */}
               <div className="mb-6">
                  <h3 className="text-base font-black text-white tracking-widest uppercase group-hover:text-brand transition-colors">{member.fullName}</h3>
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">{member.jobTitle || "OPERATIVE"}</div>
               </div>

               {/* Metrics */}
               <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                  <div>
                     <div className="text-[9px] font-black text-zinc-600 tracking-widest uppercase mb-1">PROJECTS</div>
                     <div className="text-sm font-black text-white uppercase tracking-tighter">
                        {member.projectMembers?.length || 0} ACTIVE
                     </div>
                  </div>
                  <div>
                     <div className="text-[9px] font-black text-zinc-600 tracking-widest uppercase mb-1">STATUS</div>
                     <StatusBadge status={member.projectMembers?.length > 0 ? "ASSIGNED" : "AVAILABLE"} />
                  </div>
               </div>

               {/* Skills Tag Cloud */}
               <div className="mt-6 flex flex-wrap gap-1.5">
                  {(member.skills || ["JS", "TS", "REACT"]).map((skill: string) => (
                     <span key={skill} className="px-1.5 py-0.5 bg-white/[0.03] border border-white/5 text-[8px] font-black text-zinc-500 uppercase tracking-tighter hover:text-brand hover:border-brand/20 transition-colors">{skill}</span>
                  ))}
               </div>

               {/* Hover Action */}
               <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 bg-white/5 hover:bg-brand transition-all text-white rounded-sm">
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
                  </button>
               </div>
            </div>
         ))}
      </div>

      {filteredEmployees.length === 0 && (
         <div className="py-32 text-center bg-[#171719] border border-dashed border-white/10 mt-6">
            <h3 className="text-lg font-black text-zinc-600 uppercase tracking-[0.3em]">No operatives found in sector</h3>
            <p className="text-zinc-700 text-xs font-bold uppercase mt-2">Adjust your filters or initiate recruitment</p>
         </div>
      )}
    </div>
  );
}
