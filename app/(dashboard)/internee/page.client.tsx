"use client";

import { useEffect, useState } from "react";
import { CreateInternModal, UpdateInternModal } from "@/components/modals";
import { api } from "@/lib/api";
import { Loader, StatusBadge } from "@/components/ui";

export default function InterneeClient() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState<any>(null);
  const [interns, setInterns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"actions" | "list">("actions");

  const fetchInterns = async () => {
    setLoading(true);
    try {
      const res = await api.get("/interns");
      if (res.ok) {
        const json = await res.json();
        setInterns(json.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch interns:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterns();
  }, []);

  const filteredInterns = interns.filter(
    (intern) =>
      intern.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intern.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intern.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const actions = [
    {
      id: "add",
      label: "Add Internee",
      description: "Initialize a new internee node into the system registry.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <line x1="20" y1="8" x2="20" y2="14" />
          <line x1="17" y1="11" x2="23" y2="11" />
        </svg>
      ),
      onClick: () => setIsCreateModalOpen(true),
      active: true,
    },
    {
      id: "list",
      label: "List All Internees",
      description: "Access the comprehensive directory of all registered internees.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
      ),
      onClick: () => setView("list"),
      active: true,
    },
    {
      id: "search",
      label: "Search by ID / Data",
      description: "Locate a specific internee node via their unique identifier.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
      onClick: () => setView("list"),
      active: true,
    },
    {
      id: "update",
      label: "Update Node Info",
      description: "Modify existing internee records and clearance levels.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      ),
      onClick: () => setView("list"),
      active: true,
    },
  ];

  return (
    <div className="grid gap-8">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="display-title text-4xl text-white md:text-6xl uppercase tracking-tighter">Internee Command</h1>
            <div className="h-1 w-20 bg-brand mt-4 mb-4" />
            <p className="max-w-2xl text-mute text-lg uppercase tracking-[0.2em] font-bold">
              Manage and orchestrate the next generation of talent nodes.
            </p>
          </div>
          {view === "list" && (
            <button
              onClick={() => setView("actions")}
              className="px-6 py-2 border border-line text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all"
            >
              ← Back to Actions
            </button>
          )}
        </div>
      </div>

      {view === "actions" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`group relative overflow-hidden border border-line bg-black/40 p-10 text-left transition-all hover:border-brand/50 hover:bg-brand/5 rounded-sm ${
                !action.active ? "opacity-40 grayscale cursor-help" : ""
              }`}
            >
              <div className="relative z-10">
                <div className={`mb-6 p-3 w-fit border ${action.active ? 'border-brand text-brand shadow-[0_0_15px_rgba(255,32,38,0.2)]' : 'border-line text-mute'}`}>
                  {action.icon}
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-wider group-hover:text-brand transition-colors">
                  {action.label}
                </h3>
                <p className="mt-4 text-[10px] text-mute uppercase tracking-[0.2em] font-black leading-relaxed">
                  {action.description}
                </p>
              </div>
              {!action.active && (
                <div className="absolute top-6 right-6 text-[9px] font-black text-brand uppercase tracking-[0.3em] bg-brand/10 px-2 py-1 border border-brand/20">
                  PENDING SYNC
                </div>
              )}
              <div className="absolute -bottom-10 -right-10 text-8xl opacity-[0.02] group-hover:opacity-[0.05] transition-all transform group-hover:-translate-x-4 group-hover:-translate-y-4">
                 {action.icon}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="flex items-center gap-4 border-b border-line pb-4">
              <div className="relative flex-1 max-w-md">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-mute">🔍</span>
                 <input 
                   type="text" 
                   placeholder="Search by ID, Name or Email..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full bg-black/40 border border-line rounded-sm py-2.5 pl-12 pr-4 text-sm text-white focus:border-brand outline-none transition-colors"
                 />
              </div>
              <button 
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-brand text-white px-6 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-[#ff343a] transition-all"
              >
                + Register New Node
              </button>
           </div>

           {loading ? (
             <div className="flex h-[300px] items-center justify-center"><Loader /></div>
           ) : (
             <div className="overflow-hidden border border-line bg-black/20 rounded-sm">
                <div className="overflow-x-auto">
                   <table className="w-full border-collapse">
                      <thead>
                         <tr className="bg-white/[0.02] border-b border-line text-left">
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-mute">Node Identity</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-mute">Academic Source</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-mute">Expertise / Skills</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-mute">Availability</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-mute">Status</th>
                            <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-[0.2em] text-mute">Actions</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                         {filteredInterns.map((intern) => (
                            <tr key={intern.id} className="hover:bg-white/[0.01] transition-colors group">
                               <td className="px-6 py-5">
                                  <div className="flex items-center gap-4">
                                     <div className="h-9 w-9 border border-brand/30 bg-zinc-900 grid place-items-center text-[10px] font-black text-white uppercase group-hover:border-brand transition-all">
                                        {intern.fullName.split(' ').map((n:any) => n[0]).join('')}
                                     </div>
                                     <div>
                                        <div className="text-sm font-bold text-white">{intern.fullName}</div>
                                        <div className="text-[10px] text-mute font-mono">{intern.email}</div>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-6 py-5">
                                  <div className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">{intern.universityName || intern.department}</div>
                                  <div className="text-[9px] text-mute uppercase font-medium">{intern.degreeProgram || intern.jobTitle} • {intern.currentSemester || intern.experienceLevel}</div>
                               </td>
                               <td className="px-6 py-5">
                                  <div className="flex flex-wrap gap-1 max-w-[180px]">
                                     {intern.skills?.slice(0, 3).map((skill: string) => (
                                        <span key={skill} className="bg-white/5 border border-white/10 px-1.5 py-0.5 text-[8px] font-bold text-zinc-400 rounded-sm uppercase tracking-wider">
                                           {skill}
                                        </span>
                                     ))}
                                     {intern.skills?.length > 3 && (
                                        <span className="text-[8px] text-brand font-black flex items-center">+{intern.skills.length - 3}</span>
                                     )}
                                  </div>
                               </td>
                               <td className="px-6 py-5">
                                  <div className="flex items-center gap-1.5">
                                     <div className={`h-1.5 w-1.5 rounded-full ${
                                       intern.availabilityStatus === 'AVAILABLE' ? 'bg-success shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 
                                       intern.availabilityStatus === 'ON_LEAVE' ? 'bg-brand shadow-[0_0_8px_rgba(255,32,38,0.5)]' : 
                                       'bg-zinc-600'
                                     }`} />
                                     <span className="text-[9px] font-black uppercase tracking-widest text-white">
                                        {intern.availabilityStatus === 'ON_LEAVE' ? 'UNAVAILABLE' : (intern.availabilityStatus || "PENDING")}
                                     </span>
                                  </div>
                               </td>
                               <td className="px-6 py-5">
                                  <StatusBadge status={intern.isActive ? "ACTIVE" : "INACTIVE"} />
                               </td>
                               <td className="px-6 py-5 text-right">
                                  <button 
                                    onClick={() => {
                                       setSelectedIntern(intern);
                                       setIsUpdateModalOpen(true);
                                    }}
                                    className="text-zinc-500 hover:text-brand transition-colors p-2"
                                  >
                                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                  </button>
                               </td>
                            </tr>
                         ))}
                         {filteredInterns.length === 0 && (
                            <tr>
                               <td colSpan={6} className="px-6 py-20 text-center text-xs font-black uppercase tracking-[0.2em] text-mute opacity-30">
                                  No internee nodes identified in this sector.
                               </td>
                            </tr>
                         )}
                      </tbody>
                   </table>
                </div>
             </div>
           )}
        </div>
      )}

      <CreateInternModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
           fetchInterns();
        }}
      />

      {selectedIntern && (
        <UpdateInternModal 
          isOpen={isUpdateModalOpen}
          onClose={() => {
             setIsUpdateModalOpen(false);
             setSelectedIntern(null);
          }}
          intern={selectedIntern}
          onSuccess={fetchInterns}
        />
      )}
    </div>
  );
}
