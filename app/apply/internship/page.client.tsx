"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { PrimaryButton, GhostButton, Loader } from "@/components/ui";

const CONFIDENT_AREAS_OPTIONS = [
  "Data Structures & Algorithms (DSA)",
  "Object-Oriented Programming (OOP)",
  "Database Management (SQL / NoSQL)",
  "Web Development (Frontend)",
  "Web Development (Backend)",
  "Full Stack Development",
  "Mobile App Development",
  "Machine Learning / AI",
  "Data Analysis",
  "Cybersecurity",
  "Cloud Computing"
];

const TOOLS_OPTIONS = [
  "Microsoft Excel",
  "Power BI / Tableau",
  "Figma / Adobe XD",
  "Canva",
  "VS Code / Visual Studio",
  "Git / GitHub",
  "CRM Tools (if any)"
];

export default function InternshipApplicationClient() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
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

  const [otherArea, setOtherArea] = useState("");
  const [otherTool, setOtherTool] = useState("");

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "IDENTITY REQUIRED";
      if (!formData.email.trim()) newErrors.email = "VECTOR REQUIRED";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "INVALID VECTOR";
      if (!formData.phone.trim()) newErrors.phone = "COMM LINK REQUIRED";
      if (!formData.universityName) newErrors.universityName = "ACADEMY REQUIRED";
      if (!formData.degreeProgram) newErrors.degreeProgram = "PROGRAM REQUIRED";
      if (!formData.currentSemester) newErrors.currentSemester = "LEVEL REQUIRED";
    }

    if (currentStep === 2) {
      if (formData.confidentAreas.length === 0) newErrors.confidentAreas = "SELECT AT LEAST 1 VECTOR";
      if (formData.skills.some(s => !s.skillName.trim())) newErrors.skills = "NODES REQUIRE IDENTIFIERS";
    }

    if (currentStep === 3) {
      if (!formData.mostConfidentTool.trim()) newErrors.mostConfidentTool = "TOOL IDENTIFICATION REQUIRED";
      if (!formData.mostConfidentToolReason.trim()) newErrors.mostConfidentToolReason = "LOGIC PARAMETERS REQUIRED";
      if (formData.hasProjects) {
        formData.projects.forEach((p, i) => {
          if (!p.title.trim()) newErrors[`project_${i}_title`] = "TITLE REQUIRED";
        });
      }
    }

    if (currentStep === 4) {
      if (!formData.problemSolvingAnswer.trim()) newErrors.problemSolvingAnswer = "LOGIC SEQUENCE REQUIRED";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      if (current.length >= 2) {
        setErrors(prev => ({ ...prev, confidentAreas: "MAX 2 VECTORS ALLOWED" }));
        return;
      }
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
    if (!validateStep(4)) return;
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

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(s => s + 1);
      window.scrollTo(0, 0);
    }
  };
  const prevStep = () => {
    setStep(s => s - 1);
    setErrors({});
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#050608] text-white flex flex-col items-center justify-center p-6 selection:bg-brand/30 relative overflow-hidden">
      {/* Tactical Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ff2026 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-brand/5 via-transparent to-transparent pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-brand mb-4 animate-pulse">Recruitment Terminal 24.A</div>
          <h1 className="text-7xl md:text-8xl font-black italic tracking-tighter uppercase mb-2 text-white leading-none">ZOON BUSINESS ENVIRONMENT</h1>
          <h2 className="text-xl md:text-2xl font-black tracking-[0.3em] uppercase text-zinc-400 mb-6 border-y border-white/5 py-4">Engineering Hub</h2>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] opacity-80">Submit your technical vectors for tactical evaluation.</p>
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
                <InputField label="Full Name" value={formData.fullName} onChange={v => updateField('fullName', v.replace(/[0-9]/g, ''))} placeholder="Ali Ahmed" error={errors.fullName} />
                <InputField label="Email Address" type="email" value={formData.email} onChange={v => updateField('email', v)} placeholder="ali@university.edu" error={errors.email || (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? "INVALID EMAIL VECTOR" : "")} />
                <InputField label="Phone Number" value={formData.phone} onChange={v => updateField('phone', v)} placeholder="+92 XXX XXXXXXX" error={errors.phone} />
                <SelectField label="University Name" value={formData.universityName} onChange={(v: string) => updateField('universityName', v)} placeholder="Select Academy" options={["AUST", "COMSATS, ATD Campus", "Virtual Uni"]} error={errors.universityName} />
                <SelectField label="Degree Program" value={formData.degreeProgram} onChange={(v: string) => updateField('degreeProgram', v)} placeholder="Select Program Vector" options={["CS", "BBA"]} error={errors.degreeProgram} />
                <SelectField label="Current Semester" value={formData.currentSemester} onChange={(v: string) => updateField('currentSemester', v)} placeholder="Select Operational Level" options={["6", "7", "8", "9", "10", "11"]} error={errors.currentSemester} />
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
                <div className="flex justify-between items-center">
                  <label className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${errors.confidentAreas ? 'text-[#ff2026]' : 'text-zinc-500'}`}>Confident Areas (Select up to 2)</label>
                  {errors.confidentAreas ? (
                    <span className="text-[9px] font-bold text-[#ff2026] animate-in fade-in zoom-in-95">{errors.confidentAreas}</span>
                  ) : (
                    <span className="text-[9px] font-bold text-brand">{formData.confidentAreas.length}/2</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {CONFIDENT_AREAS_OPTIONS.map(area => (
                    <button
                      key={area}
                      onClick={() => toggleArea(area)}
                      className={`px-4 py-3 text-[10px] font-bold text-left border transition-all hover:border-brand/50 hover:bg-brand/5 ${formData.confidentAreas.includes(area) ? 'border-brand bg-brand/10 text-brand shadow-[0_0_10px_rgba(255,32,38,0.2)]' : (errors.confidentAreas ? 'border-[#ff2026]/20 bg-[#ff2026]/5 text-[#ff2026]/50' : 'border-white/5 bg-white/[0.02] text-zinc-400')
                        }`}
                    >
                      {area}
                    </button>
                  ))}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Other: ___"
                      value={otherArea}
                      onChange={e => setOtherArea(e.target.value)}
                      onBlur={() => {
                        if (otherArea && !formData.confidentAreas.includes(otherArea)) {
                          toggleArea(otherArea);
                          setOtherArea("");
                        }
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (otherArea && !formData.confidentAreas.includes(otherArea)) {
                            toggleArea(otherArea);
                            setOtherArea("");
                          }
                        }
                      }}
                      className={`w-full bg-[#12151d] border px-4 py-3 text-[10px] font-bold text-white outline-none transition-all focus:ring-1 placeholder:text-zinc-700 ${errors.confidentAreas ? 'border-[#ff2026]/30 focus:border-[#ff2026]' : 'border-white/10 focus:border-brand'}`}
                    />
                  </div>
                </div>
                {/* Display custom selected areas */}
                {formData.confidentAreas.filter(a => !CONFIDENT_AREAS_OPTIONS.includes(a)).length > 0 && (
                  <div className="flex gap-2 flex-wrap mt-2">
                    {formData.confidentAreas.filter(a => !CONFIDENT_AREAS_OPTIONS.includes(a)).map(a => (
                      <span key={a} onClick={() => toggleArea(a)} className="cursor-pointer px-3 py-1 bg-brand/10 text-brand border border-brand/30 text-[9px] font-bold tracking-widest uppercase flex items-center gap-2">
                        {a} <span className="text-[#ff2026] hover:text-white">×</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${errors.skills ? 'text-[#ff2026]' : 'text-zinc-500'}`}>Skills & Proficiency</label>
                  {errors.skills && <span className="text-[9px] font-bold text-[#ff2026] animate-in fade-in zoom-in-95">{errors.skills}</span>}
                </div>
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
                      className={`bg-[#12151d] border px-4 py-3 text-xs font-mono text-white outline-none transition-all focus:ring-1 placeholder:text-zinc-700 ${errors.skills && !skill.skillName ? 'border-[#ff2026]/50 focus:border-[#ff2026]' : 'border-white/10 focus:border-brand'}`}
                    />
                    <select
                      value={skill.proficiency}
                      onChange={e => {
                        const newSkills = [...formData.skills];
                        newSkills[i].proficiency = e.target.value;
                        updateField('skills', newSkills);
                      }}
                      className="bg-[#12151d] border border-white/10 px-4 py-3 text-xs font-mono text-white outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand/50"
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
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Tools Used (Select all that apply)</label>
                <div className="grid grid-cols-3 gap-3">
                  {TOOLS_OPTIONS.map(tool => (
                    <button
                      key={tool}
                      onClick={() => toggleTool(tool)}
                      className={`px-4 py-3 text-[10px] font-bold text-left border transition-all hover:border-brand/50 hover:bg-brand/5 ${formData.toolsUsed.includes(tool) ? 'border-brand bg-brand/10 text-brand shadow-[0_0_10px_rgba(255,32,38,0.2)]' : 'border-white/5 bg-white/[0.02] text-zinc-400'
                        }`}
                    >
                      {tool}
                    </button>
                  ))}
                  <div className="flex gap-2 col-span-3 md:col-span-1">
                    <input
                      type="text"
                      placeholder="Others: ___"
                      value={otherTool}
                      onChange={e => setOtherTool(e.target.value)}
                      onBlur={() => {
                        if (otherTool && !formData.toolsUsed.includes(otherTool)) {
                          toggleTool(otherTool);
                          setOtherTool("");
                        }
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (otherTool && !formData.toolsUsed.includes(otherTool)) {
                            toggleTool(otherTool);
                            setOtherTool("");
                          }
                        }
                      }}
                      className="w-full bg-[#12151d] border border-white/10 px-4 py-3 text-[10px] font-bold text-white outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand/50 placeholder:text-zinc-700"
                    />
                  </div>
                </div>
                {/* Display custom selected tools */}
                {formData.toolsUsed.filter(t => !TOOLS_OPTIONS.includes(t)).length > 0 && (
                  <div className="flex gap-2 flex-wrap mt-2">
                    {formData.toolsUsed.filter(t => !TOOLS_OPTIONS.includes(t)).map(t => (
                      <span key={t} onClick={() => toggleTool(t)} className="cursor-pointer px-3 py-1 bg-brand/10 text-brand border border-brand/30 text-[9px] font-bold tracking-widest uppercase flex items-center gap-2">
                        {t} <span className="text-[#ff2026] hover:text-white">×</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid gap-6">
                <InputField label="Most Confident Tool" value={formData.mostConfidentTool} onChange={v => updateField('mostConfidentTool', v)} placeholder="e.g. VS Code" error={errors.mostConfidentTool} />
                <TextAreaField
                  label="Reason for Confidence"
                  value={formData.mostConfidentToolReason}
                  onChange={(v: string) => updateField('mostConfidentToolReason', v)}
                  placeholder="Explain your expertise..."
                  error={errors.mostConfidentToolReason}
                  className="h-24"
                />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Project Portfolio</label>
                  <label className="flex items-center gap-3 cursor-pointer group hover:bg-white/[0.03] px-3 py-1.5 rounded transition-colors">
                    <span className="text-[9px] font-bold text-zinc-500 group-hover:text-white transition-colors">HAS PROJECTS</span>
                    <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${formData.hasProjects ? 'bg-brand' : 'bg-zinc-800'}`}>
                      <div className={`w-3 h-3 rounded-full bg-white transition-transform ${formData.hasProjects ? 'translate-x-4 shadow-[0_0_5px_rgba(255,255,255,0.8)]' : 'translate-x-0'}`} />
                    </div>
                    <input type="checkbox" checked={formData.hasProjects} onChange={e => updateField('hasProjects', e.target.checked)} className="hidden" />
                  </label>
                </div>
                {formData.hasProjects && formData.projects.map((proj, i) => (
                  <div key={i} className="p-6 border border-white/5 bg-white/[0.01] grid gap-4 hover:border-brand/30 transition-colors relative group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-brand transition-colors" />
                    <InputField label="Project Title" value={proj.title} onChange={v => {
                      const newP = [...formData.projects]; newP[i].title = v; updateField('projects', newP);
                    }} placeholder="e.g. E-Commerce Platform" error={errors[`project_${i}_title`]} />
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
                <div className="bg-brand/5 border border-brand/20 p-6 rounded-sm shadow-[0_0_15px_rgba(255,32,38,0.05)] relative overflow-hidden">
                  <div className="absolute left-0 top-0 w-1 h-full bg-brand" />
                  <p className="text-xs font-medium text-zinc-300 leading-relaxed italic relative z-10">
                    "During your development history, describe a complex technical blockade you encountered and the specific algorithmic or architectural logic you deployed to neutralize it."
                  </p>
                </div>
                <TextAreaField
                  label="Mission Analysis"
                  value={formData.problemSolvingAnswer}
                  onChange={(v: string) => updateField('problemSolvingAnswer', v)}
                  className="h-64 leading-relaxed"
                  placeholder="Deploy your analysis here..."
                  error={errors.problemSolvingAnswer}
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

function InputField({ label, type = "text", value, onChange, placeholder, error }: any) {
  return (
    <div className="grid gap-2 group relative">
      <div className="flex justify-between items-end">
        <label className={`text-[10px] font-black uppercase tracking-widest transition-colors ${error ? 'text-[#ff2026]' : 'text-zinc-500 group-hover:text-zinc-400'}`}>{label}</label>
        {error && <span className="text-[9px] font-bold text-[#ff2026] animate-in fade-in zoom-in-95">{error}</span>}
      </div>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`bg-[#12151d] border px-4 py-3 text-xs font-mono text-white outline-none transition-all focus:ring-1 placeholder:text-zinc-700 ${error ? 'border-[#ff2026]/50 focus:border-[#ff2026] focus:ring-[#ff2026]/50 shadow-[0_0_10px_rgba(255,32,38,0.1)]' : 'border-white/10 hover:border-white/20 focus:border-brand focus:ring-brand/50'}`}
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange, placeholder, error, className }: any) {
  return (
    <div className="grid gap-2 group relative">
      <div className="flex justify-between items-end">
        <label className={`text-[10px] font-black uppercase tracking-widest transition-colors ${error ? 'text-[#ff2026]' : 'text-zinc-500 group-hover:text-zinc-400'}`}>{label}</label>
        {error && <span className="text-[9px] font-bold text-[#ff2026] animate-in fade-in zoom-in-95">{error}</span>}
      </div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`bg-[#12151d] border px-4 py-3 text-xs font-medium text-white outline-none transition-all focus:ring-1 resize-none placeholder:text-zinc-700 ${error ? 'border-[#ff2026]/50 focus:border-[#ff2026] focus:ring-[#ff2026]/50 shadow-[0_0_10px_rgba(255,32,38,0.1)]' : 'border-white/10 hover:border-white/20 focus:border-brand focus:ring-brand/50'} ${className}`}
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options, placeholder, error }: any) {
  return (
    <div className="grid gap-2 group relative">
      <div className="flex justify-between items-end">
        <label className={`text-[10px] font-black uppercase tracking-widest transition-colors ${error ? 'text-[#ff2026]' : 'text-zinc-500 group-hover:text-zinc-400'}`}>{label}</label>
        {error && <span className="text-[9px] font-bold text-[#ff2026] animate-in fade-in zoom-in-95">{error}</span>}
      </div>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`w-full appearance-none bg-[#12151d] border px-4 py-3 text-xs font-mono outline-none transition-all focus:ring-1 ${error ? 'border-[#ff2026]/50 focus:border-[#ff2026] focus:ring-[#ff2026]/50 shadow-[0_0_10px_rgba(255,32,38,0.1)]' : 'border-white/10 hover:border-white/20 focus:border-brand focus:ring-brand/50'} ${!value ? 'text-zinc-700' : 'text-white'}`}
        >
          <option value="" disabled hidden>{placeholder}</option>
          {options.map((opt: string) => (
            <option key={opt} value={opt} className="text-[#12151d] bg-white font-semibold">{opt}</option>
          ))}
        </select>
        <div className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${error ? 'text-[#ff2026]' : 'text-zinc-500 group-hover:text-white'}`}>
          ▼
        </div>
      </div>
    </div>
  );
}
