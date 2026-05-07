"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { GhostButton, PrimaryButton, StatusBadge, Loader } from "@/components/ui";

export default function RevisionsClient() {
  const [revisions, setRevisions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRevisions = async () => {
    try {
      // For now, we engage Preview Mode since the user is getting 404s on the API
      // In a real scenario, this would be api.get('/project-manager/revisions')
      console.warn("Engaging Revision Preview Mode (API currently returning 404)");
      setRevisions([
        {
          id: '550e8400-e29b-41d4-a716-446655440003',
          projectId: 'PRJ-2023-A4',
          projectName: 'E-Commerce Platform Migration',
          description: 'Phase 2: Database integration and initial frontend component deployment completed on Oct 12.',
          status: 'PENDING',
          operatives: ['MG', 'DT'],
          type: 'AWAITING_REVIEW'
        },
        {
          id: '2',
          projectId: 'PRJ-2023-B1',
          projectName: 'Mobile App MVP',
          date: 'Sep 15, 2023',
          rating: 4.5,
          feedback: "The team delivered the core features ahead of schedule. The code quality looks solid, and the initial user testing phase went smoothly. A minor issue with the authentication flow was resolved quickly. Excellent communication throughout.",
          tags: ['Communication', 'Speed'],
          status: 'COMPLETED',
          type: 'PAST_FEEDBACK'
        },
        {
          id: '3',
          projectId: 'PRJ-2023-C2',
          projectName: 'Legacy API Re-architecture',
          date: 'Jul 02, 2023',
          rating: 5.0,
          feedback: "Brilliant technical execution. The transition from monolithic endpoints to microservices was seamless, resulting in a 40% reduction in latency. The documentation provided for the new architecture is comprehensive and invaluable for our internal team.",
          status: 'COMPLETED',
          type: 'PAST_FEEDBACK'
        }
      ]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevisions();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const res = await api.patch(`/project-manager/revisions/${id}/approve`);
      if (res.ok) {
        alert("Revision Approved Successfully");
        fetchRevisions();
      } else {
        alert("Failed to approve revision (Backend Node Offline)");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id: string, feedback: string) => {
    try {
      const res = await api.patch(`/project-manager/revisions/${id}/reject`, { feedback });
      if (res.ok) {
        alert("Revision Rejected Successfully");
        fetchRevisions();
      } else {
        alert("Failed to reject revision (Backend Node Offline)");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#09090b]"><Loader /></div>;

  const awaiting = revisions.filter(r => r.type === 'AWAITING_REVIEW');
  const past = revisions.filter(r => r.type === 'PAST_FEEDBACK');

  return (
    <div className="min-h-screen bg-[#09090b] p-8 lg:p-12 text-white selection:bg-brand/30 font-sans">
      {/* Header */}
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
        <div>
           <h1 className="text-4xl font-black tracking-tight text-white italic uppercase">Reviews & Feedback</h1>
           <p className="mt-4 text-[#868b97] text-sm font-medium tracking-wide max-w-xl">
             Manage evaluations and provide insights for your active projects.
           </p>
        </div>
        <div className="flex gap-4">
           <button className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-[#121214] text-zinc-500 hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>
           </button>
           <button className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-[#121214] text-zinc-500 hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
           </button>
           <div className="size-10 rounded-full border border-white/10 overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Manager" alt="Avatar" className="w-full h-full" />
           </div>
        </div>
      </header>

      {/* Awaiting Review Section */}
      <section className="mb-16">
         <h2 className="text-2xl font-black uppercase tracking-[0.2em] italic text-white/90 mb-10 flex items-center gap-4">
            <span className="w-1.5 h-8 bg-brand" />
            Awaiting Your Review
         </h2>
         <div className="grid lg:grid-cols-2 gap-8">
            {awaiting.map(rev => (
               <article key={rev.id} className="bg-[#111214] border border-white/5 p-8 rounded-sm relative group hover:border-brand/20 transition-all">
                  <div className="flex items-center gap-4 mb-6">
                     <span className="bg-brand/10 text-brand border border-brand/30 px-3 py-1 text-[9px] font-black tracking-widest uppercase flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-brand animate-pulse" />
                        ACTION REQUIRED
                     </span>
                     <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{rev.projectId}</span>
                  </div>
                  
                  <h3 className="text-xl font-black text-white uppercase tracking-wider mb-4 group-hover:text-brand transition-colors">{rev.projectName}</h3>
                  <p className="text-sm text-zinc-400 font-medium leading-relaxed mb-10 max-w-lg">
                    {rev.description}
                  </p>

                  <div className="flex items-center justify-between border-t border-white/5 pt-8">
                     <div className="flex -space-x-3">
                        {rev.operatives.map((op: string, i: number) => (
                           <div key={i} className="size-8 rounded-md border-2 border-[#111214] bg-zinc-800 grid place-items-center text-[10px] font-bold text-zinc-400">
                              {op}
                           </div>
                        ))}
                     </div>
                     <button 
                       onClick={() => handleApprove(rev.id)}
                       className="bg-brand text-white text-[10px] font-black uppercase tracking-[0.2em] px-8 py-4 hover:bg-[#ff343a] transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(255,32,38,0.15)]"
                     >
                       Submit Review <span className="text-sm">→</span>
                     </button>
                  </div>
               </article>
            ))}
         </div>
      </section>

      {/* Past Feedback Section */}
      <section>
         <h2 className="text-2xl font-black uppercase tracking-[0.2em] italic text-white/90 mb-10 flex items-center gap-4">
            <span className="w-1.5 h-8 bg-zinc-800" />
            Past Feedback
         </h2>
         <div className="grid gap-6">
            {past.map(fb => (
               <article key={fb.id} className="bg-[#111214] border border-white/5 p-10 rounded-sm relative group hover:bg-white/[0.01] transition-all">
                  <div className="flex flex-col lg:flex-row justify-between gap-10">
                     <div className="w-full lg:w-72">
                        <div className="mb-4">
                           <span className="border border-white/20 px-3 py-1 text-[9px] font-black tracking-widest uppercase text-white flex items-center gap-2 w-fit">
                              <span className="size-1.5 rounded-full bg-white" />
                              COMPLETED
                           </span>
                        </div>
                        <h4 className="text-lg font-black text-white uppercase tracking-wider mb-2">{fb.projectName}</h4>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{fb.date}</p>
                     </div>

                     <div className="flex-1">
                        <div className="flex items-center gap-4 mb-6">
                           <div className="flex gap-1 text-brand text-lg">
                              {[...Array(5)].map((_, i) => (
                                 <span key={i} className={i < Math.floor(fb.rating) ? 'text-brand' : 'text-zinc-800'}>★</span>
                              ))}
                           </div>
                           <span className="text-sm font-black text-zinc-500 italic">{fb.rating} / 5.0</span>
                        </div>
                        
                        <blockquote className="text-lg text-zinc-400 font-medium leading-relaxed italic mb-8 max-w-4xl">
                           "{fb.feedback}"
                        </blockquote>

                        <div className="flex gap-3">
                           {fb.tags?.map((tag: string) => (
                              <span key={tag} className="bg-white/5 border border-white/10 px-3 py-1.5 text-[8px] font-black tracking-[0.2em] uppercase text-zinc-500">
                                 {tag}
                              </span>
                           ))}
                        </div>
                     </div>
                  </div>
               </article>
            ))}
         </div>
      </section>

      {/* New Feedback Trigger */}
      <button className="fixed bottom-10 left-10 bg-brand text-white text-[10px] font-black uppercase tracking-[0.3em] px-10 py-5 hover:bg-[#ff343a] transition-all flex items-center gap-4 shadow-[0_10px_30px_rgba(255,32,38,0.25)] group z-50">
         <span className="text-lg group-hover:rotate-90 transition-transform">+</span> New Feedback
      </button>
    </div>
  );
}
