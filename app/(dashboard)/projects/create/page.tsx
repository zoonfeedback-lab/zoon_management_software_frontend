"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GhostButton, Section, Loader } from "@/components/ui";
import { api } from "@/lib/api";

interface Client {
  id: string;
  companyName: string;
}

interface User {
  id: string;
  fullName: string;
}

export default function CreateProjectPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    clientId: "",
    startDate: "",
    deadline: "",
    memberIds: [] as string[],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsRes, usersRes] = await Promise.all([
          api.get("/clients"),
          api.get("/users"),
        ]);

        if (!clientsRes.ok || !usersRes.ok) {
          throw new Error("Failed to fetch initial data");
        }

        const [clientsData, usersData] = await Promise.all([
          clientsRes.json(),
          usersRes.json(),
        ]);

        setClients(clientsData.data || []);
        setUsers(usersData.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await api.post("/projects", formData);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create project");
      }

      router.push("/projects");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleMemberToggle = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      memberIds: prev.memberIds.includes(userId)
        ? prev.memberIds.filter(id => id !== userId)
        : [...prev.memberIds, userId]
    }));
  };

  if (loading) {
    return <div className="flex h-[400px] items-center justify-center"><Loader /></div>;
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1fr_450px]">
      <section className="grid gap-8">
        <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff2026]">Zoon / Initialize Project</p>
            <h1 className="display-title text-4xl text-white md:text-6xl font-bold">Project Genesis</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#9897a1]">
              Define the mission parameters, select your engineering squad, and establish the delivery timeline.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Section title="Active Statistics" eyebrow="Live Feed">
             <div className="grid gap-6 p-6">
                <div className="flex justify-between items-center">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-[#9897a1]">Nodes in Grid</span>
                   <span className="font-mono text-xl text-white">42</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-[#9897a1]">System Load</span>
                   <span className="font-mono text-xl text-[#ff2026]">84%</span>
                </div>
             </div>
          </Section>
          <Section title="Guidelines" eyebrow="Protocol">
             <div className="p-6 text-xs text-[#9897a1] leading-relaxed uppercase tracking-widest">
                Ensure all technical requirements are attached. Verify client clearance before initializing.
             </div>
          </Section>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="relative overflow-hidden border border-white/5 bg-[#171719] shadow-2xl rounded-xl">
        <div className="border-b border-white/5 bg-white/[0.02] px-8 py-6">
          <h2 className="display-title text-2xl font-bold text-white italic">Initialize Deployment</h2>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9897a1]">Project Metadata Entry</p>
        </div>

        <div className="grid gap-6 p-8 overflow-y-auto max-h-[calc(100vh-300px)]">
          {error && (
            <div className="bg-brand/10 border border-brand/20 p-4 rounded text-brand text-xs font-bold uppercase tracking-widest">
              Error: {error}
            </div>
          )}

          <div className="grid gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Project Name</span>
            <input
              required
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Project Epsilon"
              className="rounded-lg border border-white/5 bg-[#0b0b0d] px-4 py-3 text-sm text-white transition-all focus:border-[#ff2026]/30 focus:ring-1 focus:ring-[#ff2026]/20 placeholder:text-zinc-700"
            />
          </div>

          <div className="grid gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Client / Partner</span>
            <select
              required
              value={formData.clientId}
              onChange={e => setFormData({ ...formData, clientId: e.target.value })}
              className="rounded-lg border border-white/5 bg-[#0b0b0d] px-4 py-3 text-sm text-white transition-all focus:border-[#ff2026]/30 focus:ring-1 focus:ring-[#ff2026]/20"
            >
              <option value="">Select Client Node</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.companyName}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Start Date</span>
              <input
                required
                type="date"
                value={formData.startDate}
                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                className="rounded-lg border border-white/5 bg-[#0b0b0d] px-4 py-3 text-sm text-white transition-all focus:border-[#ff2026]/30 focus:ring-1 focus:ring-[#ff2026]/20"
              />
            </div>
            <div className="grid gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Deadline</span>
              <input
                required
                type="date"
                value={formData.deadline}
                onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                className="rounded-lg border border-white/5 bg-[#0b0b0d] px-4 py-3 text-sm text-white transition-all focus:border-[#ff2026]/30 focus:ring-1 focus:ring-[#ff2026]/20"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Engineering Squad</span>
            <div className="grid gap-2 max-h-48 overflow-y-auto rounded-lg border border-white/5 bg-[#0b0b0d] p-4">
               {users.map(emp => (
                 <label key={emp.id} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={formData.memberIds.includes(emp.id)}
                      onChange={() => handleMemberToggle(emp.id)}
                      className="h-4 w-4 rounded border-white/10 bg-white/5 text-brand accent-brand"
                    />
                    <span className="text-xs text-[#9897a1] group-hover:text-white transition-colors">{emp.fullName}</span>
                 </label>
               ))}
            </div>
          </div>

          <div className="grid gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Mission Description</span>
            <textarea
              rows={3}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Primary objectives..."
              className="resize-none rounded-lg border border-white/5 bg-[#0b0b0d] px-4 py-3 text-sm text-white transition-all focus:border-[#ff2026]/30 focus:ring-1 focus:ring-[#ff2026]/20 placeholder:text-zinc-700"
            />
          </div>
        </div>

        <div className="flex gap-4 border-t border-white/5 bg-white/[0.01] px-8 py-6">
          <Link
            href="/projects"
            className="flex-1 rounded-lg border border-white/5 px-4 py-3.5 text-center text-[10px] font-black uppercase tracking-widest text-[#9897a1] transition hover:bg-white/5 hover:text-white"
          >
            Cancel
          </Link>
          <button 
            disabled={submitting}
            type="submit"
            className="flex-1 rounded-lg bg-[#ff2026] px-4 py-3.5 text-[10px] font-black uppercase tracking-widest text-white transition hover:bg-[#ff343a] shadow-[0_4px_14px_rgba(255,32,38,0.3)] disabled:opacity-50"
          >
            {submitting ? "Initializing..." : "Kickoff Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
