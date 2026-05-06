"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Section, StatusBadge, GhostButton, Loader } from "@/components/ui";
import { CreateEmployeeModal, EditEmployeeModal } from "@/components/modals";
import { api } from "@/lib/api";

interface Employee {
  id: string;
  fullName: string;
  email: string;
  isActive: boolean;
  role: {
    key: string;
    name: string;
  };
  jobTitle: string;
  department: string;
  experienceLevel: string;
  availabilityStatus: string;
  createdAt: string;
}

export default function EmployeesClient() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await api.get("/employees");
      if (!response.ok) throw new Error("Failed to synchronize personnel database.");
      const json = await response.json();
      setEmployees(json.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(emp => 
    emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="flex h-[400px] items-center justify-center"><Loader /></div>;
  }

  return (
    <div className="grid gap-8">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <h1 className="display-title text-4xl text-white md:text-6xl">Personnel Registry</h1>
          <p className="mt-4 max-w-2xl text-mute text-lg uppercase tracking-widest font-medium">Manage internal team nodes and clearance protocols.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-brand text-white px-8 py-3 text-sm font-black uppercase tracking-[0.2em] hover:bg-[#ff343a] transition-all shadow-[0_0_20px_rgba(255,32,38,0.2)] rounded-sm"
        >
          + Initialize Node
        </button>
      </div>

      <div className="grid gap-6">
        <div className="flex items-center gap-4 border-b border-line pb-4">
           <div className="relative flex-1 max-w-md">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-mute">🔍</span>
              <input 
                type="text" 
                placeholder="Search by name, email, or title..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-line rounded-sm py-2.5 pl-12 pr-4 text-sm text-white focus:border-brand outline-none transition-colors"
              />
           </div>
           <div className="flex gap-2">
              <button className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-mute border border-line hover:border-white transition-colors">EXPORT</button>
           </div>
        </div>

        {error && (
          <div className="bg-[#38161a] border border-[#ff2026]/20 p-4 text-[#ff2026] text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
             Operational Sync Failed: {error}
          </div>
        )}

        <div className="overflow-hidden border border-line bg-black/20 rounded-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-line text-left">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-mute">Personnel Node</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-mute">Department</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-mute">Role / Level</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-mute">Status</th>
                  <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-[0.2em] text-mute">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-6 py-5">
                      <Link href={`/employees/${emp.id}`} className="flex items-center gap-4 group/node cursor-pointer">
                        <div className="h-10 w-10 border border-brand/30 bg-zinc-900 grid place-items-center text-xs font-bold text-white uppercase group-hover/node:border-brand transition-all">
                           {emp.fullName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white group-hover/node:text-brand transition-colors">{emp.fullName}</div>
                          <div className="text-[10px] text-mute font-mono">{emp.email}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-5">
                       <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider">{emp.jobTitle || "Engineer"}</div>
                       <div className="text-[10px] text-mute uppercase font-medium">{emp.department || "Operations"}</div>
                    </td>
                    <td className="px-6 py-5">
                       <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-black text-white uppercase tracking-widest">{emp.role.name}</span>
                          <span className="text-[9px] text-mute uppercase font-bold">{emp.experienceLevel || "Senior"}</span>
                       </div>
                    </td>
                    <td className="px-6 py-5">
                       <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-1.5">
                             <div className={`h-1.5 w-1.5 rounded-full ${emp.availabilityStatus === 'AVAILABLE' ? 'bg-success shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-zinc-600'}`} />
                             <span className="text-[9px] font-black uppercase tracking-widest text-white">{emp.availabilityStatus}</span>
                          </div>
                          <span className={`text-[8px] font-black uppercase tracking-widest ${emp.isActive ? 'text-zinc-500' : 'text-brand'}`}>
                             {emp.isActive ? 'Active Node' : 'Suspended'}
                          </span>
                       </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                       <button 
                         onClick={async () => {
                           try {
                             const res = await api.get(`/employees/${emp.id}`);
                             if (res.ok) {
                               const json = await res.json();
                               setSelectedEmployee(json.data);
                             }
                           } catch (err) {
                             console.error("Failed to fetch node details:", err);
                             setSelectedEmployee(emp); // Fallback to local data
                           }
                         }}
                         className="text-zinc-500 hover:text-brand transition-colors p-2"
                       >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                       </button>
                    </td>
                  </tr>
                ))}
                {filteredEmployees.length === 0 && !loading && (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center text-xs font-black uppercase tracking-[0.2em] text-mute opacity-30">
                       No personnel records identified in this sector.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CreateEmployeeModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSuccess={fetchEmployees}
      />

      {selectedEmployee && (
        <EditEmployeeModal 
          isOpen={!!selectedEmployee} 
          onClose={() => setSelectedEmployee(null)} 
          employee={selectedEmployee}
          onSuccess={fetchEmployees}
        />
      )}
    </div>
  );
}
