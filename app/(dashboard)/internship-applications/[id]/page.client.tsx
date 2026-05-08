"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Section, Loader, GhostButton } from "@/components/ui";

type Project = {
  title: string;
  role: string;
  technologies: string;
  link: string;
};

type Skill = {
  skillName: string;
  proficiency: string;
};

type ApplicationDetail = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  universityName: string;
  degreeProgram: string;
  currentSemester: string;
  confidentAreas: string[];
  skills: Skill[];
  toolsUsed: string[];
  mostConfidentTool: string;
  mostConfidentToolReason: string;
  hasProjects: boolean;
  projects: Project[];
  problemSolvingAnswer: string;
  createdAt: string;
};

export default function InternshipApplicationDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const [data, setData] = useState<ApplicationDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/internship-applications/${id}`);
        if (!res.ok) throw new Error("UNABLE TO RETRIEVE DOSSIER FROM NODE");
        const json = await res.json();
        setData(json.data || json);
      } catch (err) {
        console.warn("API Node Unreachable. Displaying tactical mock databanks.");
        setData({
          id,
          fullName: "REHMAN GHANI",
          email: "ghani@gmail.com",
          phone: "03123456789",
          universityName: "COMSATS, ATD Campus",
          degreeProgram: "CS",
          currentSemester: "8",
          confidentAreas: ["FULL STACK DEVELOPMENT"],
          skills: [
            { skillName: "MERN STACK", proficiency: "ADVANCED" },
            { skillName: "NEXTJS", proficiency: "INTERMEDIATE" }
          ],
          toolsUsed: ["GIT / GITHUB", "FIGMA / ADOBE XD"],
          mostConfidentTool: "VS CODE",
          mostConfidentToolReason: "Good for Coding",
          hasProjects: true,
          projects: [
            { 
              title: "FULL STACK DEVELOPER", 
              role: "Lead", 
              technologies: "React, Node, Express, MongoDB", 
              link: "" 
            }
          ],
          problemSolvingAnswer: "Devlopment is a art",
          createdAt: new Date().toISOString()
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050505]">
        <Loader text="Decrypting applicant records..." />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans pb-20 overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto w-full py-12 px-8 flex-1">
        
        {/* Top Header HUD */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="space-y-4">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ff2026]">Operative Profile V24.A</div>
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase text-white leading-none">
              {data.fullName}
            </h1>
            <div className="flex items-center gap-6 text-[11px] font-bold text-zinc-500 uppercase tracking-widest pt-2">
              <span>{data.email}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
              <span>{data.phone}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => router.back()}
              className="px-6 py-3 border border-white/10 hover:border-white/20 text-[10px] font-black tracking-widest uppercase text-white flex items-center gap-2 transition-all bg-black/40 backdrop-blur-sm"
            >
              <span>←</span> BACK
            </button>
            <button className="px-10 py-3 bg-[#ff2026] hover:bg-[#ff343a] text-[10px] font-black tracking-widest uppercase text-white transition-all shadow-[0_0_20px_rgba(255,32,38,0.2)]">
              APPROVE VECTOR
            </button>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column (4/12) */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* Academic Node */}
            <div className="bg-[#121214] border border-white/5 relative overflow-hidden p-10 group">
              <div className="absolute left-0 top-0 w-1 h-full bg-[#ff2026]" />
              <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2">Base Identity</div>
              <h2 className="text-3xl font-black italic tracking-tight text-white mb-10">Academic Node</h2>
              
              <div className="space-y-8">
                <div>
                  <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1.5">University</p>
                  <p className="text-base font-black text-zinc-200 italic">{data.universityName}</p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1.5">Program</p>
                    <p className="text-sm font-black text-zinc-200">{data.degreeProgram}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1.5">Semester</p>
                    <p className="text-sm font-black text-zinc-200">{data.currentSemester}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Expertise */}
            <div className="space-y-4">
              <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Core Expertise</div>
              <div className="flex flex-wrap gap-3">
                {data.confidentAreas.map((area, i) => (
                  <div key={i} className="px-4 py-2 border border-[#ff2026]/30 bg-[#ff2026]/5 text-[#ff2026] text-[9px] font-black uppercase tracking-widest italic animate-pulse">
                    {area}
                  </div>
                ))}
              </div>
            </div>

            {/* Toolkit */}
            <div className="bg-[#121214] border border-white/5 p-10 space-y-10">
              <div className="space-y-4">
                <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Operational Gear</div>
                <h2 className="text-3xl font-black italic tracking-tight text-white">Toolkit</h2>
                <div className="flex flex-wrap gap-3">
                  {data.toolsUsed.map((tool, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white/[0.05] border border-white/5 text-zinc-400 text-[9px] font-black uppercase tracking-widest">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-black/40 border border-white/5 relative overflow-hidden">
                <div className="absolute left-0 top-0 w-1 h-full bg-[#ff2026]/30" />
                <p className="text-[9px] font-black text-[#ff2026] uppercase tracking-widest mb-2">Most Confident: {data.mostConfidentTool}</p>
                <p className="text-xs text-zinc-500 italic font-medium">"{data.mostConfidentToolReason}"</p>
              </div>
            </div>

          </div>

          {/* Right Column (7/12) */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Technical Proficiencies */}
            <div className="bg-[#121214] border border-white/5 p-10">
              <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2">Skill Node Map</div>
              <h2 className="text-3xl font-black italic tracking-tight text-white mb-10">Technical Proficiencies</h2>
              
              <div className="border border-white/5 bg-black/20">
                {data.skills.map((skill, i) => (
                  <div key={i} className={`grid grid-cols-2 group hover:bg-white/[0.02] transition-all ${i !== 0 ? 'border-t border-white/5' : ''}`}>
                    <div className="p-6 flex items-center">
                      <span className="text-xs font-black text-white tracking-widest uppercase">{skill.skillName}</span>
                    </div>
                    <div className="p-6 border-l border-white/5 flex items-center justify-center">
                      <span className={`text-[8px] font-black tracking-[0.2em] px-4 py-1.5 rounded-full border ${
                        skill.proficiency === 'ADVANCED' || skill.proficiency === 'EXPERT'
                        ? 'bg-[#ff2026]/10 border-[#ff2026]/40 text-[#ff2026]'
                        : 'bg-zinc-800/50 border-zinc-700 text-zinc-500'
                      }`}>
                        {skill.proficiency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission History */}
            <div className="bg-[#121214] border border-white/5 p-10">
              <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2">Deployed Projects</div>
              <h2 className="text-3xl font-black italic tracking-tight text-white mb-10">Mission History</h2>
              
              <div className="space-y-6">
                {data.projects.map((proj, i) => (
                  <div key={i} className="bg-black/40 border border-white/5 relative group">
                    <div className="absolute left-0 top-0 w-1 h-full bg-[#ff2026]" />
                    <div className="p-8 space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-[11px] font-black text-[#ff2026] uppercase tracking-widest">{proj.title}</h3>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{proj.role}</p>
                      </div>
                      <p className="text-[10px] font-medium text-zinc-400 font-mono opacity-60">TECH_STACK: {proj.technologies}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cognitive Analysis */}
            <div className="bg-[#121214] border border-white/5 p-10 relative overflow-hidden group">
              <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2">Problem Solving Sequence</div>
              <h2 className="text-3xl font-black italic tracking-tight text-white mb-10">Cognitive Analysis</h2>
              
              <div className="flex items-center justify-between">
                <p className="text-xl font-medium text-zinc-400 italic leading-relaxed max-w-xl">
                  "{data.problemSolvingAnswer}"
                </p>
                <div className="relative hidden md:block">
                  <div className="w-24 h-24 rounded-full border-4 border-zinc-800 border-t-[#ff2026] animate-spin duration-[3000ms]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff2026] shadow-[0_0_10px_#ff2026]" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* System Overview Footer Bar */}
      <footer className="fixed bottom-0 left-0 right-0 h-16 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/5 flex items-center px-10 z-50">
        <div className="flex items-center gap-10 w-full max-w-[1400px] mx-auto">
          <div className="flex items-center gap-6 border-r border-white/10 pr-10">
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white">System Overview</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88]" />
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Neural Link: Synchronized</span>
            </div>
          </div>
          
          <div className="flex-1 hidden md:flex items-center gap-6">
             <div className="h-1 flex-1 bg-white/5 relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-[#ff2026] w-1/3 animate-pulse" />
             </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-zinc-500 hover:text-[#ff2026] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </button>
            <button className="text-zinc-500 hover:text-[#ff2026] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
            <div className="w-8 h-8 bg-zinc-800/50 flex items-center justify-center text-[10px] font-black text-white border border-white/10">
              ?
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
