"use client";

import { useState } from "react";
import { Section } from "@/components/ui";

export default function SettingsClient() {
  const [activeTab, setActiveTab] = useState("PROFILE");

  const tabs = [
    { id: "PROFILE", label: "Terminal Profile" },
    { id: "SECURITY", label: "Security & Access" },
    { id: "NOTIFICATIONS", label: "Signal Preferences" },
  ];

  return (
    <div className="grid gap-8">
      {/* Header */}
      <div>
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff2026]">System / Configuration</p>
        <h1 className="display-title text-4xl text-white md:text-6xl font-bold">Terminal Settings</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#9897a1]">
          Configure your personal interface, security protocols, and operational alert thresholds.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Navigation Tabs */}
        <nav className="flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest transition-all rounded-lg border ${
                activeTab === tab.id
                  ? "bg-[#ff2026]/10 border-[#ff2026] text-[#ff2026]"
                  : "bg-[#171719] border-white/5 text-[#9897a1] hover:border-white/10 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <div className="grid gap-8">
          {activeTab === "PROFILE" && (
            <Section title="Identity Management" eyebrow="Personnel Data">
              <div className="grid gap-6 p-8">
                 <div className="flex items-center gap-8 pb-8 border-b border-white/5">
                    <div className="h-24 w-24 rounded-full bg-zinc-800 border-2 border-[#ff2026] flex items-center justify-center text-3xl font-bold text-white">
                       AD
                    </div>
                    <div>
                       <h3 className="text-lg font-bold text-white">Admin Terminal</h3>
                       <p className="text-xs text-[#9897a1] mt-1">Personnel ID: ZN-8802-X</p>
                       <button className="mt-4 text-[9px] font-black uppercase tracking-widest bg-white/5 border border-white/10 px-4 py-2 hover:bg-white/10 transition-colors">Change Avatar</button>
                    </div>
                 </div>
                 
                 <div className="grid gap-6 md:grid-cols-2">
                    <label className="grid gap-2">
                       <span className="text-[10px] font-black uppercase tracking-widest text-[#9897a1]">Full Display Name</span>
                       <input type="text" defaultValue="Admin User" className="bg-[#0b0b0d] border border-white/10 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-brand/30" />
                    </label>
                    <label className="grid gap-2">
                       <span className="text-[10px] font-black uppercase tracking-widest text-[#9897a1]">Communication Email</span>
                       <input type="email" defaultValue="admin@zoonlabs.int" className="bg-[#0b0b0d] border border-white/10 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-brand/30" />
                    </label>
                 </div>
                 
                 <div className="flex justify-end pt-4">
                    <button className="bg-[#ff2026] text-white px-8 py-3 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-[0_4px_14px_rgba(255,32,38,0.3)] hover:bg-[#ff343a] transition-colors">Save Identity</button>
                 </div>
              </div>
            </Section>
          )}

          {activeTab === "SECURITY" && (
            <Section title="Security Protocol" eyebrow="Access Matrix">
              <div className="grid gap-6 p-8">
                 <div className="grid gap-6">
                    <label className="grid gap-2">
                       <span className="text-[10px] font-black uppercase tracking-widest text-[#9897a1]">Current Terminal Password</span>
                       <input type="password" placeholder="••••••••" className="bg-[#0b0b0d] border border-white/10 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-brand/30" />
                    </label>
                    <div className="grid gap-6 md:grid-cols-2">
                       <label className="grid gap-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#9897a1]">New Authorization Code</span>
                          <input type="password" placeholder="••••••••" className="bg-[#0b0b0d] border border-white/10 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-brand/30" />
                       </label>
                       <label className="grid gap-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#9897a1]">Confirm Code</span>
                          <input type="password" placeholder="••••••••" className="bg-[#0b0b0d] border border-white/10 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-brand/30" />
                       </label>
                    </div>
                 </div>
                 
                 <div className="pt-8 border-t border-white/5">
                    <div className="flex items-center justify-between">
                       <div>
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Multi-Factor Authentication</h4>
                          <p className="text-xs text-[#9897a1] mt-1">Require biometric or hardware key for system entry.</p>
                       </div>
                       <div className="h-6 w-12 bg-[#ff2026] rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full" />
                       </div>
                    </div>
                 </div>

                 <div className="flex justify-end pt-4">
                    <button className="bg-[#ff2026] text-white px-8 py-3 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-[0_4px_14px_rgba(255,32,38,0.3)] hover:bg-[#ff343a] transition-colors">Update Security</button>
                 </div>
              </div>
            </Section>
          )}

          {activeTab === "NOTIFICATIONS" && (
             <div className="grid gap-6">
                <Section title="Signal Thresholds" eyebrow="Alert Protocol">
                   <div className="p-8 grid gap-6">
                      {[
                        { label: "Critical System Alerts", desc: "Immediate notification on infrastructure failure.", active: true },
                        { label: "Task Allocations", desc: "Signal when new missions are assigned to your ID.", active: true },
                        { label: "Revenue Milestones", desc: "Notification on invoice settlements and financial gates.", active: false },
                        { label: "Deployment Logs", desc: "Real-time feed of CI/CD pipeline activities.", active: false },
                      ].map((pref) => (
                        <div key={pref.label} className="flex items-center justify-between pb-6 border-b border-white/5 last:border-0 last:pb-0">
                           <div>
                              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{pref.label}</h4>
                              <p className="text-xs text-[#9897a1] mt-1">{pref.desc}</p>
                           </div>
                           <div className={`h-6 w-12 rounded-full relative cursor-pointer transition-colors ${pref.active ? 'bg-[#ff2026]' : 'bg-zinc-800'}`}>
                              <div className={`absolute top-1 h-4 w-4 bg-white rounded-full transition-all ${pref.active ? 'right-1' : 'left-1'}`} />
                           </div>
                        </div>
                      ))}
                   </div>
                </Section>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
