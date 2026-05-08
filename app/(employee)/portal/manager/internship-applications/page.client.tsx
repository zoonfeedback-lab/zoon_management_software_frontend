"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Section, Loader, StatusBadge } from "@/components/ui";

type Application = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  universityName: string;
  degreeProgram: string;
  currentSemester: string;
  confidentAreas: string[];
  hasProjects: boolean;
  createdAt: string;
};

// High-fidelity tactical mock data for Resilient Mode
const MOCK_APPLICATIONS: Application[] = [
  {
    id: "a1b2c3d4",
    fullName: "Ali Ahmed",
    email: "ali.ahmed@university.edu.pk",
    phone: "+92 300 1234567",
    universityName: "FAST NUCES",
    degreeProgram: "BS Computer Science",
    currentSemester: "6th Semester",
    confidentAreas: ["Full Stack Development", "Database Management"],
    hasProjects: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "e5f6g7h8",
    fullName: "Sara Khan",
    email: "s.khan@lums.edu.pk",
    phone: "+92 333 9876543",
    universityName: "LUMS",
    degreeProgram: "BS Software Engineering",
    currentSemester: "8th Semester",
    confidentAreas: ["UI/UX Design", "Web Development (Frontend)"],
    hasProjects: true,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "i9j0k1l2",
    fullName: "Zainab Malik",
    email: "z.malik@nust.edu.pk",
    phone: "+92 321 4567890",
    universityName: "NUST",
    degreeProgram: "MS Computer Science",
    currentSemester: "2nd Semester",
    confidentAreas: ["Machine Learning / AI", "Data Analysis"],
    hasProjects: false,
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];

export default function InternshipApplicationsClient() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [isResilientMode, setIsResilientMode] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get("/internship-applications");
        if (!res.ok) throw new Error("API returned an error status");
        
        const json = await res.json();
        setApplications(json.data || []);
      } catch (err) {
        console.warn("Backend node unreachable or endpoint not deployed. Engaging Resilient Mode with tactical mock data.");
        setIsResilientMode(true);
        setApplications(MOCK_APPLICATIONS);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader text="Decrypting applicant records..." />
      </div>
    );
  }

  return (
    <div className="grid gap-6 animate-in fade-in zoom-in-95 duration-500">
      {/* Resilient Mode Warning Banner */}
      {isResilientMode && (
        <div className="bg-[#ff2026]/10 border border-[#ff2026]/30 px-5 py-3 rounded-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-[#ff2026] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#ff2026]">Resilient Mode Engaged</span>
          </div>
          <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Live link severed. Displaying tactical mock databanks.</span>
        </div>
      )}

      {/* Main Dashboard Section */}
      <Section title="Candidate Database" eyebrow="Internship Recruitment Terminal">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-[#121214]">
                <th className="px-5 py-4 text-[10px] font-black tracking-widest text-zinc-500 uppercase">Operative</th>
                <th className="px-5 py-4 text-[10px] font-black tracking-widest text-zinc-500 uppercase">Academy / Degree</th>
                <th className="px-5 py-4 text-[10px] font-black tracking-widest text-zinc-500 uppercase hidden md:table-cell">Vectors (Skills)</th>
                <th className="px-5 py-4 text-[10px] font-black tracking-widest text-zinc-500 uppercase">Status</th>
                <th className="px-5 py-4 text-[10px] font-black tracking-widest text-zinc-500 uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-[#09090b]">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500 opacity-60">No applications recorded.</p>
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="transition-colors hover:bg-white/[0.02] group">
                    <td className="px-5 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white tracking-wide">{app.fullName}</span>
                        <span className="text-[10px] text-zinc-500 font-mono mt-0.5">{app.email}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-zinc-300">{app.universityName}</span>
                        <span className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase mt-0.5">{app.degreeProgram} - {app.currentSemester}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                        {app.confidentAreas.slice(0, 2).map((area, i) => (
                           <span key={i} className="text-[8px] font-black uppercase tracking-widest bg-brand/10 text-brand px-1.5 py-0.5 rounded-sm border border-brand/20 whitespace-nowrap">
                             {area}
                           </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={app.hasProjects ? "Projects Attached" : "Pending Review"} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] font-black tracking-widest uppercase text-white rounded transition-colors" onClick={() => alert("Candidate Dossier Module Not Yet Initialized.")}>
                         Inspect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
