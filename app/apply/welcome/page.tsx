import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Welcome to ZOON | Recruitment Status",
  description: "Your technical vector has been successfully transmitted to the ZOON engineering hub.",
};

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-brand selection:text-white flex flex-col font-sans overflow-x-hidden">
      {/* Dynamic Background Noise & Grids */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand/5 blur-[120px]" />
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand rounded-sm shadow-[0_0_15px_rgba(255,32,38,0.4)] flex items-center justify-center">
            <span className="text-white font-black italic tracking-tighter">Z</span>
          </div>
          <span className="text-xl font-black italic tracking-tighter uppercase">ZOON</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-bold tracking-widest uppercase text-brand animate-pulse border border-brand/30 bg-brand/5 px-3 py-1 rounded-full">
            CONNECTION SECURE
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mx-auto size-20 md:size-24 rounded-full border border-brand bg-brand/10 flex items-center justify-center text-4xl shadow-[0_0_50px_rgba(255,32,38,0.3)] animate-pulse mb-8">
           <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff2026" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-black italic tracking-tighter uppercase leading-none mb-6 animate-fade-in-up animation-delay-100">
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-zinc-600">WELCOME TO</span>
          <br />
          <span className="text-brand">ZOON</span>
        </h1>
        
        <div className="space-y-4 mb-12 animate-fade-in-up animation-delay-200">
           <h2 className="text-xl md:text-2xl font-black tracking-[0.3em] uppercase text-zinc-300">Transmission Received</h2>
           <p className="max-w-2xl text-sm md:text-base text-zinc-500 font-medium leading-relaxed mx-auto">
             Your technical vector has been successfully synchronized with the ZOON core framework. 
             Our senior engineering nodes are currently evaluating your profile. Please monitor your communications for further operational directives.
           </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-6 animate-fade-in-up animation-delay-300">
          <Link 
            href="/" 
            className="group px-8 py-4 border border-white/10 hover:border-brand/50 hover:bg-brand/10 text-white font-black uppercase tracking-widest text-xs rounded-sm transition-all flex items-center gap-3"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Return to Terminal
          </Link>
        </div>
      </main>

      {/* Metrics / Features Grid */}
      <section className="relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
          <div className="p-12 text-center group hover:bg-white/[0.02] transition-colors">
            <div className="text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-2">99.9%</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-brand">System Uptime</div>
            <p className="mt-4 text-xs text-zinc-500 leading-relaxed max-w-[200px] mx-auto">
              Resilient server architecture ensuring continuous mission operation.
            </p>
          </div>
          <div className="p-12 text-center group hover:bg-white/[0.02] transition-colors">
            <div className="text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-2">50+</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-brand">Active Nodes</div>
            <p className="mt-4 text-xs text-zinc-500 leading-relaxed max-w-[200px] mx-auto">
              Global deployment vectors processing real-time intelligence.
            </p>
          </div>
          <div className="p-12 text-center group hover:bg-white/[0.02] transition-colors">
            <div className="text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-2">V4.1</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-brand">Core Protocol</div>
            <p className="mt-4 text-xs text-zinc-500 leading-relaxed max-w-[200px] mx-auto">
              Running on the latest ZOON operational framework for maximum velocity.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center border-t border-white/5">
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
          © {new Date().getFullYear()} ZOON Systems. Secure Transmission.
        </p>
      </footer>
    </div>
  );
}
