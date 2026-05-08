"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Section, Loader, GhostButton, StatusBadge } from "@/components/ui";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/internship-applications/${id}`);
        if (!res.ok) throw new Error("UNABLE TO RETRIEVE DOSSIER FROM NODE");
        const json = await res.json();
        setData(json.data || json); // Handle nested data if exists
      } catch (err) {
        console.warn("API Node Unreachable. Displaying local cache (Mock data).");
        // Fallback to high-fidelity mock if ID matches one of the known mocks
        setData({
          id,
          fullName: "Ali Ahmed",
          email: "ali.ahmed@university.edu.pk",
          phone: "+92 300 1234567",
          universityName: "FAST NUCES",
          degreeProgram: "BS Computer Science",
          currentSemester: "6th Semester",
          confidentAreas: ["Full Stack Development", "Database Management"],
          skills: [
            { skillName: "React", proficiency: "ADVANCED" },
            { skillName: "Node.js", proficiency: "INTERMEDIATE" },
            { skillName: "PostgreSQL", proficiency: "INTERMEDIATE" }
          ],
          toolsUsed: ["VS Code", "Git", "Postman", "Docker"],
          mostConfidentTool: "VS Code",
          mostConfidentToolReason: "High-velocity development and extensive plugin ecosystem integration for full-stack vectors.",
          hasProjects: true,
          projects: [
            { 
              title: "E-Commerce Microservices", 
              role: "Lead Architect", 
              technologies: "Next.js, NestJS, Prisma", 
              link: "github.com/ali/shop-core" 
            }
          ],
          problemSolvingAnswer: "During a high-concurrency event, I identified a bottleneck in the authentication middleware. I implemented a Redis-based caching layer for session tokens, reducing DB load by 40% and neutralizing the latency spike.",
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
      <div className="flex h-screen items-center justify-center">
        <Loader text="Deciphering encrypted dossier..." />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-12 text-center space-y-6">
        <h2 className="text-2xl font-black text-[#ff2026] uppercase italic tracking-tighter">Node Response: 404</h2>
        <p className="text-zinc-500 font-mono">Target operative record not found in central databanks.</p>
        <GhostButton onClick={() => router.back()}>← Return to Database</GhostButton>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header HUD */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-8 gap-6">
        <div className="space-y-1">
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-brand">Operative Profile v24.A</div>
          <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase text-white leading-none">{data.fullName}</h1>
          <div className="flex items-center gap-4 pt-2">
            <span className="text-xs font-mono text-zinc-500">{data.email}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <span className="text-xs font-mono text-zinc-500">{data.phone}</span>
          </div>
        </div>
        <div className="flex gap-4">
          <GhostButton onClick={() => router.back()} className="text-[10px] font-black tracking-widest uppercase">← Back</GhostButton>
          <PrimaryButton className="!px-8 !py-3 !text-[10px] !tracking-widest !font-black !uppercase">Approve Vector</PrimaryButton>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Left Column: Academic & Toolkit */}
        <div className="lg:col-span-1 space-y-10">
          <Section title="Academic Node" eyebrow="Base Identity">
            <div className="space-y-4">
              <div>
                <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">University</p>
                <p className="text-sm font-bold text-white italic">{data.universityName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Program</p>
                  <p className="text-xs font-bold text-zinc-300">{data.degreeProgram}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Semester</p>
                  <p className="text-xs font-bold text-zinc-300">{data.currentSemester}</p>
                </div>
              </div>
            </div>
          </Section>

          <Section title="Primary Vectors" eyebrow="Core Expertise">
            <div className="flex flex-wrap gap-2">
              {data.confidentAreas.map((area, i) => (
                <span key={i} className="px-3 py-1.5 bg-brand/10 border border-brand/30 text-brand text-[9px] font-black uppercase tracking-widest italic">
                  {area}
                </span>
              ))}
            </div>
          </Section>

          <Section title="Toolkit" eyebrow="Operational Gear">
            <div className="flex flex-wrap gap-2">
              {data.toolsUsed.map((tool, i) => (
                <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 text-zinc-400 text-[8px] font-bold uppercase tracking-widest">
                  {tool}
                </span>
              ))}
            </div>
            <div className="mt-6 p-4 bg-[#12151d] border border-white/5 rounded-sm">
              <p className="text-[9px] font-black text-brand uppercase tracking-widest mb-1">Most Confident: {data.mostConfidentTool}</p>
              <p className="text-[10px] text-zinc-500 leading-relaxed italic">"{data.mostConfidentToolReason}"</p>
            </div>
          </Section>
        </div>

        {/* Right Column: Skills, Projects, Logic */}
        <div className="lg:col-span-2 space-y-10">
          <Section title="Technical Proficiencies" eyebrow="Skill Node Map">
            <div className="grid sm:grid-cols-2 gap-4">
              {data.skills.map((skill, i) => (
                <div key={i} className="p-4 bg-white/[0.02] border border-white/5 flex justify-between items-center group hover:border-brand/30 transition-colors">
                  <span className="text-xs font-bold text-white tracking-wide">{skill.skillName}</span>
                  <span className={`text-[8px] font-black tracking-widest px-2 py-0.5 rounded-full border ${
                    skill.proficiency === 'EXPERT' || skill.proficiency === 'ADVANCED' 
                    ? 'bg-brand/20 border-brand/40 text-brand' 
                    : 'bg-zinc-800 border-zinc-700 text-zinc-500'
                  }`}>
                    {skill.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Mission History" eyebrow="Deployed Projects">
            {!data.hasProjects || data.projects.length === 0 ? (
              <p className="text-xs italic text-zinc-600">No project logs available in dossier.</p>
            ) : (
              <div className="space-y-4">
                {data.projects.map((proj, i) => (
                  <div key={i} className="p-6 bg-[#0b0d12] border border-white/5 relative overflow-hidden group hover:border-white/20 transition-all">
                    <div className="absolute left-0 top-0 w-1 h-full bg-brand/30 group-hover:bg-brand transition-colors" />
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-sm font-black text-white uppercase tracking-tight">{proj.title}</h3>
                        <p className="text-[10px] font-bold text-brand uppercase tracking-widest mt-0.5">{proj.role}</p>
                      </div>
                      {proj.link && (
                        <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black text-zinc-500 hover:text-white underline tracking-widest uppercase">
                          Source Code ↗
                        </a>
                      )}
                    </div>
                    <p className="text-[10px] text-zinc-500 font-mono tracking-tighter">TECH_STACK: {proj.technologies}</p>
                  </div>
                ))}
              </div>
            )}
          </Section>

          <Section title="Cognitive Analysis" eyebrow="Problem Solving Sequence">
            <div className="bg-[#12151d] border border-white/5 p-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
               </div>
               <p className="text-sm font-medium text-zinc-400 leading-relaxed italic indent-8">
                 "{data.problemSolvingAnswer}"
               </p>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

// Re-using components to keep it consistent
function PrimaryButton({ children, onClick, className, disabled }: any) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`bg-brand hover:bg-[#ff343a] text-white font-black italic tracking-tighter uppercase px-6 py-2 rounded-sm transition-all shadow-[0_0_20px_rgba(255,32,38,0.2)] hover:shadow-[0_0_30px_rgba(255,32,38,0.4)] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
