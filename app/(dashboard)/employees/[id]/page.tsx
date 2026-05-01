"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Section, StatusBadge, GhostButton, Loader } from "@/components/ui";
import { api } from "@/lib/api";

interface Employee {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  isActive: boolean;
  role: {
    key: string;
    name: string;
  };
  jobTitle: string;
  department: string;
  experienceLevel: string;
  availabilityStatus: string;
  skills: string[];
  createdAt: string;
}

export default function EmployeeProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await api.get(`/employees/${params.id}`);
        if (!res.ok) throw new Error("Personnel node not found in registry.");
        const json = await res.json();
        setEmployee(json.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchEmployee();
  }, [params.id]);

  if (loading) return <div className="flex h-screen items-center justify-center bg-black"><Loader /></div>;
  
  if (error || !employee) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black gap-6">
        <div className="text-[#ff2026] text-xs font-black uppercase tracking-[0.3em] animate-pulse">Critical Error: {error || "Node offline"}</div>
        <button onClick={() => router.back()} className="text-white text-[10px] font-bold uppercase tracking-widest border border-line px-6 py-2 hover:bg-white/5 transition-all">Return to Registry</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-mute hover:text-white transition-colors mb-8 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Personnel Registry</span>
      </button>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Left Column: Identity Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-900/40 border border-line p-8 rounded-sm text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand/50" />
            <div className="h-24 w-24 mx-auto border-2 border-brand/20 bg-black grid place-items-center text-3xl font-black text-white mb-6">
               {employee.fullName.split(' ').map(n => n[0]).join('')}
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">{employee.fullName}</h1>
            <p className="text-[10px] text-brand font-black uppercase tracking-[0.2em] mb-4">{employee.role.name}</p>
            
            <div className="flex flex-col gap-3 pt-6 border-t border-line">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-mute font-bold uppercase tracking-widest">Status</span>
                <span className={`font-black uppercase tracking-widest ${employee.isActive ? 'text-success' : 'text-brand'}`}>
                   {employee.isActive ? 'Active Node' : 'Suspended'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-mute font-bold uppercase tracking-widest">Availability</span>
                <span className="text-white font-black uppercase tracking-widest">{employee.availabilityStatus}</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-line p-6 rounded-sm space-y-4">
             <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] border-b border-line pb-3">Contact Grid</h3>
             <div className="space-y-4">
                <div>
                   <label className="text-[9px] text-mute font-bold uppercase tracking-widest block mb-1">Email Node</label>
                   <p className="text-sm text-zinc-300 font-mono">{employee.email}</p>
                </div>
                <div>
                   <label className="text-[9px] text-mute font-bold uppercase tracking-widest block mb-1">Secure Line</label>
                   <p className="text-sm text-zinc-300 font-mono">{employee.phone || "Not configured"}</p>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Operational Intel */}
        <div className="lg:col-span-2 space-y-8">
           <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/20 border border-line p-6 rounded-sm">
                 <h4 className="text-[10px] text-mute font-black uppercase tracking-widest mb-4">Departmental Node</h4>
                 <div className="flex items-end gap-3">
                    <span className="text-4xl font-bold text-white leading-none">{employee.department}</span>
                    <span className="text-[10px] text-mute uppercase font-medium pb-1">Sector</span>
                 </div>
              </div>
              <div className="bg-black/20 border border-line p-6 rounded-sm">
                 <h4 className="text-[10px] text-mute font-black uppercase tracking-widest mb-4">Clearance Level</h4>
                 <div className="flex items-end gap-3">
                    <span className="text-4xl font-bold text-white leading-none">{employee.experienceLevel}</span>
                    <span className="text-[10px] text-mute uppercase font-medium pb-1">Tier</span>
                 </div>
              </div>
           </div>

           <div className="bg-zinc-900/40 border border-line p-8 rounded-sm">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                 <span className="h-5 w-1 bg-brand" />
                 Technical Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                 {employee.skills.map((skill, idx) => (
                    <span key={idx} className="bg-black border border-brand/20 text-brand px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-sm hover:border-brand/50 transition-colors cursor-default">
                       {skill}
                    </span>
                 ))}
                 {employee.skills.length === 0 && (
                    <span className="text-mute text-[10px] font-medium uppercase tracking-widest italic">No specialized skills registered.</span>
                 )}
              </div>
           </div>

           <div className="bg-zinc-900/40 border border-line p-8 rounded-sm">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                 <span className="h-5 w-1 bg-brand" />
                 Operational History
              </h3>
              <div className="space-y-6">
                 <div className="flex gap-4">
                    <div className="w-px bg-line relative">
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-brand" />
                    </div>
                    <div>
                       <p className="text-[10px] text-mute font-black uppercase tracking-widest mb-1">Registry Initialized</p>
                       <p className="text-sm text-zinc-300">Personnel node was successfully synchronized with the Zoon Mainframe on {new Date(employee.createdAt).toLocaleDateString()}.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
