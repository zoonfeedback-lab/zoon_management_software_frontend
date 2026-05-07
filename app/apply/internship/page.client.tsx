"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { PrimaryButton, GhostButton, Loader } from "@/components/ui";

const CONFIDENT_AREAS_OPTIONS = [
  "Web Development (Frontend)",
  "Web Development (Backend)",
  "Full Stack Development",
  "Mobile App Development",
  "UI/UX Design",
  "DevOps & Cloud",
  "AI / Machine Learning",
  "Data Science"
];

const TOOLS_OPTIONS = [
  "VS Code / Visual Studio",
  "Git / GitHub",
  "Figma / Adobe XD",
  "Postman / Insomnia",
  "Docker / Kubernetes",
  "Jira / Trello"
];

export default function InternshipApplicationClient() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    universityName: "",
    degreeProgram: "",
    currentSemester: "",
    confidentAreas: [] as string[],
    skills: [{ skillName: "", proficiency: "INTERMEDIATE" }],
    toolsUsed: [] as string[],
    mostConfidentTool: "",
    mostConfidentToolReason: "",
    hasProjects: true,
    projects: [{ title: "", role: "", technologies: "", link: "" }],
    problemSolvingAnswer: ""
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { skillName: "", proficiency: "INTERMEDIATE" }]
    }));
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { title: "", role: "", technologies: "", link: "" }]
    }));
  };

  const toggleArea = (area: string) => {
    const current = formData.confidentAreas;
    if (current.includes(area)) {
      updateField('confidentAreas', current.filter(a => a !== area));
    } else {
      updateField('confidentAreas', [...current, area]);
    }
  };

  const toggleTool = (tool: string) => {
    const current = formData.toolsUsed;
    if (current.includes(tool)) {
      updateField('toolsUsed', current.filter(t => t !== tool));
    } else {
      updateField('toolsUsed', [...current, tool]);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await api.post("/internship-applications", formData);
      if (res.ok) {
        router.push("/apply/welcome");
      } else {
        const err = await res.json();
        alert(err.message || "Transmission failed. Check parameters.");
      }
    } catch (err) {
      alert("Encryption error during transmission. System node unreachable.");
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="min-h-screen bg-[#050608] text-white flex flex-col items-center justify-center p-6 selection:bg-brand/30">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <header className="mb-12 text-center">
           <div className="text-[10px] font-black uppercase tracking-[0.5em] text-brand mb-4 animate-pulse">Recruitment Terminal 24.A</div>
           <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-4">Engineering Hub</h1>
           <p className="text-zinc-500 text-sm font-medium tracking-wide">Submit your technical vectors for tactical evaluation.</p>
        </header>

        {/* Progress HUD */}
        <div className="flex gap-2 mb-12">
           {[1, 2, 3, 4].map(i => (
              <div key={i} className={`h-1 flex-1 transition-all duration-500 ${step >= i ? 'bg-brand' : 'bg-white/10'}`} />
           ))}
        </div>

        {/* Form Container */}
        <div className="bg-[#0b0d12] border border-white/5 p-8 md:p-12 rounded-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <span className="text-8xl font-black italic">0{step}</span>
           </div>

           {step === 1 && (
             <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-lg font-black uppercase tracking-widest text-brand border-b border-brand/20 pb-4">Phase 1: Identity & Academy</h2>
                <div className="grid md:grid-cols-2 gap-6">
                   <InputField label="Full Name" value={formData.fullName} onChange={v => updateField('fullName', v)} placeholder="Ali Ahmed" />
                   <InputField label="Email Address" type="email" value={formData.email} onChange={v => updateField('email', v)} placeholder="ali@university.edu" />
                   <InputField label="Phone Number" value={formData.phone} onChange={v => updateField('phone', v)} placeholder="+92 XXX XXXXXXX" />
                   <InputField label="University Name" value={formData.universityName} onChange={v => updateField('universityName', v)} placeholder="FAST NUCES" />
                   <InputField label="Degree Program" value={formData.degreeProgram} onChange={v => updateField('degreeProgram', v)} placeholder="BS Computer Science" />
                   <InputField label="Current Semester" value={formData.currentSemester} onChange={v => updateField('currentSemester', v)} placeholder="6th Semester" />
                </div>
                <div className="pt-6 flex justify-end">
                   <PrimaryButton onClick={nextStep} className="!px-12">Initialize Phase 2 →</PrimaryButton>
                </div>
             </div>
           )}

           {step === 2 && (
             <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-lg font-black uppercase tracking-widest text-brand border-b border-brand/20 pb-4">Phase 2: Technical Vector</h2>
                
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Confident Areas</label>
                   <div className="grid grid-cols-2 gap-3">
                      {CONFIDENT_AREAS_OPTIONS.map(area => (
                         <button 
                           key={area}
                           onClick={() => toggleArea(area)}
                           className={`px-4 py-3 text-[10px] font-bold text-left border transition-all ${
                             formData.confidentAreas.includes(area) ? 'border-brand bg-brand/10 text-brand' : 'border-white/5 bg-white/[0.02] text-zinc-400'
                           }`}
                         >
                           {area}
                         </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-6">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Skills & Proficiency</label>
                   {formData.skills.map((skill, i) => (
                      <div key={i} className="grid grid-cols-2 gap-4">
                         <input 
                           placeholder="Skill Name (e.g. JavaScript)"
                           value={skill.skillName}
                           onChange={e => {
                             const newSkills = [...formData.skills];
                             newSkills[i].skillName = e.target.value;
                             updateField('skills', newSkills);
                           }}
                           className="bg-[#12151d] border border-white/10 px-4 py-3 text-xs font-mono text-white outline-none focus:border-brand"
                         />
                         <select 
                           value={skill.proficiency}
                           onChange={e => {
                             const newSkills = [...formData.skills];
                             newSkills[i].proficiency = e.target.value;
                             updateField('skills', newSkills);
                           }}
                           className="bg-[#12151d] border border-white/10 px-4 py-3 text-xs font-mono text-white outline-none focus:border-brand"
                         >
                            <option value="BEGINNER">BEGINNER</option>
                            <option value="INTERMEDIATE">INTERMEDIATE</option>
                            <option value="ADVANCED">ADVANCED</option>
                            <option value="EXPERT">EXPERT</option>
                         </select>
                      </div>
                   ))}
                   <GhostButton onClick={addSkill} className="w-full text-[10px] font-black tracking-widest">+ ADD SKILL NODE</GhostButton>
                </div>

                <div className="pt-6 flex justify-between">
                   <GhostButton onClick={prevStep}>← Return to Phase 1</GhostButton>
                   <PrimaryButton onClick={nextStep} className="!px-12">Initialize Phase 3 →</PrimaryButton>
                </div>
             </div>
           )}

           {step === 3 && (
             <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-lg font-black uppercase tracking-widest text-brand border-b border-brand/20 pb-4">Phase 3: Toolkit & Missions</h2>
                
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Tools Used</label>
                   <div className="grid grid-cols-3 gap-3">
                      {TOOLS_OPTIONS.map(tool => (
                         <button 
                           key={tool}
                           onClick={() => toggleTool(tool)}
                           className={`px-4 py-3 text-[10px] font-bold text-left border transition-all ${
                             formData.toolsUsed.includes(tool) ? 'border-brand bg-brand/10 text-brand' : 'border-white/5 bg-white/[0.02] text-zinc-400'
                           }`}
                         >
                           {tool}
                         </button>
                      ))}
                   </div>
                </div>

                <div className="grid gap-6">
                   <InputField label="Most Confident Tool" value={formData.mostConfidentTool} onChange={v => updateField('mostConfidentTool', v)} placeholder="e.g. VS Code" />
                   <div className="grid gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Reason for Confidence</label>
                      <textarea 
                        value={formData.mostConfidentToolReason}
                        onChange={e => updateField('mostConfidentToolReason', e.target.value)}
                        className="bg-[#12151d] border border-white/10 px-4 py-3 text-xs font-medium text-white outline-none focus:border-brand h-24 resize-none"
                        placeholder="Explain your expertise..."
                      />
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Project Portfolio</label>
                      <label className="flex items-center gap-2 cursor-pointer">
                         <span className="text-[9px] font-bold text-zinc-600">HAS PROJECTS</span>
                         <input type="checkbox" checked={formData.hasProjects} onChange={e => updateField('hasProjects', e.target.checked)} className="accent-brand" />
                      </label>
                   </div>
                   {formData.hasProjects && formData.projects.map((proj, i) => (
                      <div key={i} className="p-6 border border-white/5 bg-white/[0.01] grid gap-4">
                         <InputField label="Project Title" value={proj.title} onChange={v => {
                            const newP = [...formData.projects]; newP[i].title = v; updateField('projects', newP);
                         }} placeholder="e.g. E-Commerce Platform" />
                         <div className="grid md:grid-cols-2 gap-4">
                            <InputField label="Your Role" value={proj.role} onChange={v => {
                               const newP = [...formData.projects]; newP[i].role = v; updateField('projects', newP);
                            }} placeholder="Full Stack Developer" />
                            <InputField label="Technologies" value={proj.technologies} onChange={v => {
                               const newP = [...formData.projects]; newP[i].technologies = v; updateField('projects', newP);
                            }} placeholder="React, Node.js" />
                         </div>
                         <InputField label="Project Link" value={proj.link} onChange={v => {
                            const newP = [...formData.projects]; newP[i].link = v; updateField('projects', newP);
                         }} placeholder="github.com/..." />
                      </div>
                   ))}
                   {formData.hasProjects && <GhostButton onClick={addProject} className="w-full text-[10px] font-black tracking-widest">+ ADD MISSION LOG</GhostButton>}
                </div>

                <div className="pt-6 flex justify-between">
                   <GhostButton onClick={prevStep}>← Return to Phase 2</GhostButton>
                   <PrimaryButton onClick={nextStep} className="!px-12">Initialize Phase 4 →</PrimaryButton>
                </div>
             </div>
           )}

           {step === 4 && (
             <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-lg font-black uppercase tracking-widest text-brand border-b border-brand/20 pb-4">Phase 4: Cognitive Logic</h2>
                
                <div className="space-y-4">
                   <div className="bg-brand/5 border border-brand/20 p-6 rounded-sm">
                      <p className="text-xs font-medium text-zinc-300 leading-relaxed italic">
                        "During your development history, describe a complex technical blockade you encountered and the specific algorithmic or architectural logic you deployed to neutralize it."
                      </p>
                   </div>
                   <textarea 
                     value={formData.problemSolvingAnswer}
                     onChange={e => updateField('problemSolvingAnswer', e.target.value)}
                     className="bg-[#12151d] border border-white/10 px-4 py-8 text-sm font-medium text-white outline-none focus:border-brand h-64 resize-none leading-relaxed"
                     placeholder="Deploy your analysis here..."
                   />
                </div>

                <div className="pt-6 flex justify-between">
                   <GhostButton onClick={prevStep} disabled={submitting}>← Return to Phase 3</GhostButton>
                   <PrimaryButton onClick={handleSubmit} disabled={submitting} className="!px-16 !py-5">
                      {submitting ? <Loader /> : "SUBMIT APPLICATION TRANSMISSION"}
                   </PrimaryButton>
                </div>
             </div>
           )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-[9px] font-black uppercase tracking-[0.3em] text-[#3a3d46]">
           Secure Transmission Gated by ZOON CORE SECURITY V4.1
        </footer>
      </div>
    </div>
  );
}

function InputField({ label, type = "text", value, onChange, placeholder }: any) {
  return (
    <div className="grid gap-2">
       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{label}</label>
       <input 
         type={type}
         value={value}
         onChange={e => onChange(e.target.value)}
         placeholder={placeholder}
         className="bg-[#12151d] border border-white/10 px-4 py-3 text-xs font-mono text-white outline-none transition-colors focus:border-brand placeholder:text-zinc-700"
       />
    </div>
  );
}
