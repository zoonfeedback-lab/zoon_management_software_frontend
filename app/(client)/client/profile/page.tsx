"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Loader, Section } from "@/components/ui";

export default function ClientProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
  });
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/client/profile");
        if (res.ok) {
          const json = await res.json();
          setProfile(json.data);
          setFormData({
            companyName: json.data.companyName || "",
            contactPerson: json.data.contactPerson || "",
            email: json.data.email || "",
            phone: json.data.phone || "",
          });
        } else {
          // DEVELOPER PREVIEW MODE: Fallback to high-fidelity tactical profile if node is offline
          console.warn("Client Profile Node Offline. Engaging Preview Mode.");
          const mockProfile = {
            id: 'client-001',
            companyName: "ARIS TECHNOLOGIES",
            contactPerson: "Marcus Thorne",
            email: "m.thorne@aritech.io",
            phone: "+1 (555) 082-9411",
            projects: [
              { id: 'proj-771', name: 'NOVA CORE V4', status: 'ACTIVE', startDate: '2023-01-15', deadline: '2024-10-24' },
              { id: 'proj-422', name: 'ZENITH UI KIT', status: 'COMPLETED', startDate: '2022-06-10', deadline: '2023-03-05' }
            ]
          };
          setProfile(mockProfile);
          setFormData({
            companyName: mockProfile.companyName,
            contactPerson: mockProfile.contactPerson,
            email: mockProfile.email,
            phone: mockProfile.phone,
          });
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await api.patch("/client/profile", formData);
      if (res.ok) {
        setMessage({ text: "Profile parameters updated successfully.", type: "success" });
      } else {
        const err = await res.json();
        setMessage({ text: err.message || "Failed to update profile.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "A synchronization error occurred.", type: "error" });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050608]">
        <Loader />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050608] text-brand font-black uppercase tracking-widest">
        Node Offline: Profile Data Unavailable
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050608] p-8 text-white lg:p-12">
      <header className="mb-12">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-brand">Identity Management /</p>
        <h1 className="text-5xl font-black italic tracking-tighter text-white md:text-7xl uppercase">Client Profile</h1>
        <p className="mt-4 max-w-2xl text-lg text-[#9897a1]">
          Manage your organizational details, primary contact parameters, and review your complete operational history.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        {/* Profile Form */}
        <div className="rounded-2xl border border-white/5 bg-[#0b0d12] p-8">
          <h2 className="mb-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#5e5f66]">
            <span className="grid size-4 place-items-center rounded-full border-2 border-brand text-[8px] text-brand">!</span>
            Organization Details
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#8b909c]">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="rounded-xl border border-white/10 bg-[#12151d] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#8b909c]">Primary Contact Person</label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                className="rounded-xl border border-white/10 bg-[#12151d] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand"
                required
              />
            </div>

            <div className="grid gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#8b909c]">Secure Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="rounded-xl border border-white/10 bg-[#12151d] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand"
                required
              />
            </div>

            <div className="grid gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#8b909c]">Contact Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="rounded-xl border border-white/10 bg-[#12151d] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand"
              />
            </div>

            {message && (
              <div
                className={`rounded-lg border px-4 py-3 text-[10px] font-bold uppercase tracking-widest ${
                  message.type === "success"
                    ? "border-success/30 bg-success/10 text-success"
                    : "border-brand/30 bg-brand/10 text-brand"
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="mt-4 w-full bg-brand px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white shadow-[0_0_20px_rgba(255,32,38,0.2)] transition-all hover:bg-[#ff343a] disabled:opacity-50"
            >
              {saving ? "Synchronizing..." : "Update Identity Parameters"}
            </button>
          </form>
        </div>

        {/* Project History */}
        <div className="flex flex-col gap-6">
          <Section title="Operational History" eyebrow="Mission Archives" className="border-white/5 bg-[#0b0d12]">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-[8px] font-black uppercase tracking-[0.2em] text-[#4a4b51]">
                    <th className="px-6 py-4">Mission Node</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Timeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                  {profile.projects?.length > 0 ? (
                    profile.projects.map((project: any) => (
                      <tr key={project.id} className="group transition-colors hover:bg-white/[0.01]">
                        <td className="px-6 py-5">
                          <p className="text-sm font-bold text-white group-hover:text-brand transition-colors">{project.name}</p>
                          <p className="mt-1 text-[9px] font-mono uppercase tracking-widest text-[#5e5f66]">ID: {project.id.split("-")[0]}</p>
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`rounded-sm border px-3 py-1 text-[8px] font-black uppercase tracking-widest ${
                              project.status === "ACTIVE"
                                ? "border-brand/20 bg-brand/10 text-brand"
                                : project.status === "COMPLETED"
                                ? "border-success/20 bg-success/10 text-success"
                                : "border-white/10 bg-white/5 text-[#9897a1]"
                            }`}
                          >
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-[10px] font-mono text-white/80">
                            {project.startDate ? new Date(project.startDate).toLocaleDateString() : "TBD"} -{" "}
                            {project.deadline ? new Date(project.deadline).toLocaleDateString() : "TBD"}
                          </p>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-[10px] font-black uppercase tracking-widest text-[#4a4b51]">
                        No operational history found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Section>
          
          <div className="rounded-2xl border border-white/5 bg-[#0b0d12] p-8">
            <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#5e5f66]">Security Notice</h3>
            <p className="text-xs leading-relaxed text-[#8b909c]">
              Updating your organizational identity details may require re-verification by the ZoonLabs administration team. 
              Please ensure all parameters are accurate to prevent service interruption.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
