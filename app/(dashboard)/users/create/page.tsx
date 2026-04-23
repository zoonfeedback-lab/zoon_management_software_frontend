"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GhostButton, Section } from "@/components/ui";

export default function CreateUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    role: "TEAM_MEMBER",
    phone: "",
    jobTitle: "",
    department: "",
    experienceLevel: "",
    skills: [] as string[],
    availabilityStatus: "AVAILABLE",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create user");
      }

      router.push("/users");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(",").map(s => s.trim()).filter(s => s !== "");
    setFormData({ ...formData, skills });
  };

  return (
    <div className="grid gap-8 xl:grid-cols-[1fr_450px]">
      <section className="grid gap-8">
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff2026]">Zoon / Access Control</p>
          <h1 className="display-title text-4xl text-white md:text-6xl font-bold">Authorize User</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#9897a1]">
            Initialize new terminal access credentials and assign clearance roles to personnel.
          </p>
        </div>

        <Section title="Security Protocol" eyebrow="Access Level">
           <div className="p-8 text-[#9897a1] text-xs uppercase tracking-[0.2em] leading-relaxed">
              ADMIN: Full terminal access, system configuration, and user management capabilities.
              <br/><br/>
              TEAM_MEMBER: Restricted access to assigned projects, technical logs, and collaboration tools.
           </div>
        </Section>
      </section>

      <form onSubmit={handleSubmit} className="relative overflow-hidden border border-white/5 bg-[#171719] shadow-2xl rounded-xl">
        <div className="border-b border-white/5 bg-white/[0.02] px-8 py-6">
          <h2 className="display-title text-2xl font-bold text-white italic">Create Profile</h2>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9897a1]">Personnel Data Entry</p>
        </div>

        <div className="grid gap-6 p-8 overflow-y-auto max-h-[calc(100vh-250px)]">
          {error && (
            <div className="bg-brand/10 border border-brand/20 p-4 rounded text-brand text-xs font-bold uppercase tracking-widest">
              Error: {error}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Full Name</span>
              <input
                required
                type="text"
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                className="rounded-lg border border-white/5 bg-[#0b0b0d] px-4 py-3 text-sm text-white focus:border-[#ff2026]/30 focus:ring-1 focus:ring-[#ff2026]/20 outline-none"
                placeholder="John Doe"
              />
            </div>
            <div className="grid gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Email Address</span>
              <input
                required
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="rounded-lg border border-white/5 bg-[#0b0b0d] px-4 py-3 text-sm text-white focus:border-[#ff2026]/30 focus:ring-1 focus:ring-[#ff2026]/20 outline-none"
                placeholder="john@zoon.int"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Password</span>
            <input
              required
              type="password"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              className="rounded-lg border border-white/5 bg-[#0b0b0d] px-4 py-3 text-sm text-white focus:border-[#ff2026]/30 focus:ring-1 focus:ring-[#ff2026]/20 outline-none"
              placeholder="••••••••"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Clearance Role</span>
              <select
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                className="rounded-lg border border-white/5 bg-[#0b0b0d] px-4 py-3 text-sm text-white focus:border-[#ff2026]/30 focus:ring-1 focus:ring-[#ff2026]/20 outline-none"
              >
                <option value="ADMIN">ADMIN</option>
                <option value="TEAM_MEMBER">TEAM_MEMBER</option>
              </select>
            </div>
            <div className="grid gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Phone</span>
              <input
                type="text"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="rounded-lg border border-white/5 bg-[#0b0b0d] px-4 py-3 text-sm text-white focus:border-[#ff2026]/30 focus:ring-1 focus:ring-[#ff2026]/20 outline-none"
                placeholder="+1-..."
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Job Title</span>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={e => setFormData({ ...formData, jobTitle: e.target.value })}
                className="rounded-lg border border-white/5 bg-[#0b0b0d] px-4 py-3 text-sm text-white focus:border-[#ff2026]/30 focus:ring-1 focus:ring-[#ff2026]/20 outline-none"
                placeholder="Software Engineer"
              />
            </div>
            <div className="grid gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Department</span>
              <input
                type="text"
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                className="rounded-lg border border-white/5 bg-[#0b0b0d] px-4 py-3 text-sm text-white focus:border-[#ff2026]/30 focus:ring-1 focus:ring-[#ff2026]/20 outline-none"
                placeholder="Engineering"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Skills (comma separated)</span>
            <input
              type="text"
              onChange={handleSkillsChange}
              className="rounded-lg border border-white/5 bg-[#0b0b0d] px-4 py-3 text-sm text-white focus:border-[#ff2026]/30 focus:ring-1 focus:ring-[#ff2026]/20 outline-none"
              placeholder="nestjs, prisma, react..."
            />
          </div>
        </div>

        <div className="flex gap-4 border-t border-white/5 bg-white/[0.01] px-8 py-6">
          <Link
            href="/users"
            className="flex-1 rounded-lg border border-white/5 px-4 py-3.5 text-center text-[10px] font-black uppercase tracking-widest text-[#9897a1] transition hover:bg-white/5 hover:text-white"
          >
            Cancel
          </Link>
          <button 
            disabled={loading}
            type="submit"
            className="flex-1 rounded-lg bg-[#ff2026] px-4 py-3.5 text-[10px] font-black uppercase tracking-widest text-white transition hover:bg-[#ff343a] shadow-[0_4px_14px_rgba(255,32,38,0.3)]"
          >
            {loading ? "Authorizing..." : "Initialize Access"}
          </button>
        </div>
      </form>
    </div>
  );
}
