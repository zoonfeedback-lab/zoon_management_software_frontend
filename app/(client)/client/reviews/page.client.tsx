"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { GhostButton, PrimaryButton, StatusBadge, Loader } from "@/components/ui";

export default function ClientReviewsClient() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({ rating: 4.9, count: 128, nps: 82 });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // In a real scenario, we'd fetch all projects first, then their feedback
        const res = await api.get('/client/projects');
        if (res.ok) {
          const projects = await res.json();
          // For now, if we don't have an aggregate endpoint, we engage Preview Mode
          // with the high-fidelity data from the screenshot
          if (projects.data?.length === 0 || true) {
            console.warn("Engaging Review Preview Mode");
            setReviews([
              { 
                id: '1', 
                author: 'Marcus Thorne', 
                role: 'CTO @ ARIS TECH', 
                project: 'NEURAL INTEGRATION MODULE',
                rating: 5,
                content: "The technical precision Zoonlabs brought to our neural core integration was beyond expectation. The modular architecture they implemented has reduced our deployment cycles by 40%. Exceptionally high-performance execution.",
                status: 'APPROVED'
              },
              { 
                id: '2', 
                author: 'Elena Vance', 
                role: 'LEAD ENGINEER @ SECTOR 7', 
                project: 'QUANTUM ENCRYPTION LAYER',
                rating: 5,
                content: "A few minor latency issues in the initial staging, but the team resolved them within 24 hours. The resulting encryption layer is solid. Great documentation provided.",
                status: 'PENDING'
              },
              { 
                id: '3', 
                author: 'Sarah J. Miller', 
                role: 'VP ENGINEERING @ OMNICORP', 
                project: 'SCALABLE DATA WAREHOUSE',
                rating: 5,
                content: "Incredible attention to detail. The warehouse scales automatically based on our peak loads without any manual intervention. Saved us thousands in infrastructure costs already.",
                status: 'APPROVED'
              }
            ]);
          }
        }
      } catch (err) {
        console.error("Feedback sync failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#09090b]"><Loader /></div>;

  return (
    <div className="min-h-screen bg-[#09090b] p-8 lg:p-12 text-white selection:bg-brand/30">
      {/* Header */}
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
        <div>
           <h1 className="text-4xl font-black tracking-tight text-white italic uppercase">Feedback Summary</h1>
           <p className="mt-4 text-[#868b97] text-sm font-medium tracking-wide max-w-xl">
             Analyze and manage client testimonials across all engineering hubs.
           </p>
        </div>
        <PrimaryButton className="!px-10 !py-5 text-sm">
           <span className="mr-2">➤</span> REQUEST FEEDBACK
        </PrimaryButton>
      </header>

      {/* Metrics HUD */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-[#111214] border border-white/5 p-10 rounded-sm relative group hover:border-brand/30 transition-all">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#5e626d] mb-6">Average Rating</p>
           <div className="flex items-baseline gap-2 mb-4">
              <span className="text-6xl font-black italic">{metrics.rating}</span>
              <span className="text-xl font-bold text-zinc-600">/5</span>
           </div>
           <div className="flex gap-1 text-brand text-xl">
              {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
           </div>
        </div>

        <div className="bg-[#111214] border border-white/5 p-10 rounded-sm relative group hover:border-brand/30 transition-all">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#5e626d] mb-6">Total Reviews</p>
           <div className="flex items-baseline gap-2 mb-6">
              <span className="text-6xl font-black italic">{metrics.count}</span>
           </div>
           <div className="flex items-center gap-2">
              <span className="text-success text-[10px] font-bold">↗</span>
              <span className="text-success text-[10px] font-black uppercase tracking-widest">+12% this month</span>
           </div>
        </div>

        <div className="bg-[#111214] border border-white/5 p-10 rounded-sm relative group hover:border-brand/30 transition-all overflow-hidden">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#5e626d] mb-6">Net Promoter Score (NPS)</p>
           <div className="flex items-center gap-6 mb-6">
              <span className="text-6xl font-black italic">{metrics.nps}</span>
              <span className="bg-brand/10 text-brand border border-brand/30 px-3 py-1 text-[9px] font-black tracking-widest uppercase">World Class</span>
           </div>
           <p className="text-[11px] text-zinc-500 font-medium leading-relaxed max-w-[200px]">
             Your score is higher than 94% of engineering firms in the sector.
           </p>
           {/* Decorative Chart Background */}
           <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
              <svg width="180" height="100" viewBox="0 0 180 100">
                 <path d="M0 100 L40 70 L80 85 L120 40 L160 60 L180 20 L180 100 Z" fill="currentColor" />
              </svg>
           </div>
        </div>
      </div>

      {/* Review Feed */}
      <div className="space-y-10">
         <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black uppercase tracking-widest italic text-white/90">Latest Reviews</h2>
            <div className="flex gap-4">
               <select className="bg-[#111214] border border-white/5 px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-zinc-400 focus:border-brand/40 outline-none">
                  <option>All Projects</option>
               </select>
               <select className="bg-[#111214] border border-white/5 px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-zinc-400 focus:border-brand/40 outline-none">
                  <option>Highest Rated</option>
               </select>
            </div>
         </div>

         <div className="grid gap-6">
            {reviews.map(review => (
               <article key={review.id} className="bg-[#111214] border border-white/5 p-10 rounded-sm relative group">
                  {review.status === 'PENDING' && (
                    <div className="absolute top-0 right-0 bg-zinc-800 px-4 py-1 text-[9px] font-black tracking-widest uppercase text-zinc-500">
                       Pending Review
                    </div>
                  )}
                  
                  <div className="flex flex-col lg:flex-row justify-between gap-10">
                     <div className="flex-1">
                        <div className="flex items-center gap-5 mb-8">
                           <div className="size-14 bg-zinc-800 flex items-center justify-center text-xl grayscale group-hover:grayscale-0 transition-all">
                              👤
                           </div>
                           <div>
                              <h4 className="text-lg font-black text-white uppercase tracking-widest">{review.author}</h4>
                              <p className="text-[10px] font-bold text-brand uppercase tracking-widest">{review.role}</p>
                           </div>
                           <div className="ml-auto flex gap-1 text-brand text-xs">
                              {[...Array(review.rating)].map((_, i) => <span key={i}>★</span>)}
                           </div>
                        </div>

                        <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4">Project: {review.project}</p>
                        
                        <blockquote className="text-lg md:text-xl text-zinc-400 font-medium leading-relaxed italic max-w-4xl">
                           "{review.content}"
                        </blockquote>
                     </div>

                     <div className="flex flex-col gap-3 w-full lg:w-48 pt-4">
                        <button className={`py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${
                          review.status === 'APPROVED' 
                          ? 'bg-zinc-800 border-zinc-700 text-zinc-500 cursor-default' 
                          : 'bg-brand text-white border-brand hover:bg-[#ff343a]'
                        }`}>
                           {review.status === 'APPROVED' ? 'Approved' : 'Approve'}
                        </button>
                        <button className="py-4 border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-[#868b97] hover:bg-white/5 transition-all">
                           Hide
                        </button>
                        <button className="mt-2 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600 hover:text-brand transition-colors text-center">
                           Revision
                        </button>
                     </div>
                  </div>
               </article>
            ))}
         </div>

         {/* Pagination */}
         <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5">
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#5e626d]">Showing <span className="text-white">1-3</span> of <span className="text-white">128</span> reviews</p>
            <div className="flex gap-2">
               <button className="size-10 border border-white/5 flex items-center justify-center text-zinc-600 hover:text-white rounded-sm">{"<"}</button>
               <button className="size-10 border border-brand bg-brand/5 flex items-center justify-center text-brand font-black rounded-sm">1</button>
               <button className="size-10 border border-white/5 flex items-center justify-center text-zinc-600 hover:text-white rounded-sm">2</button>
               <button className="size-10 border border-white/5 flex items-center justify-center text-zinc-600 hover:text-white rounded-sm">3</button>
               <button className="size-10 border border-white/5 flex items-center justify-center text-zinc-600 hover:text-white rounded-sm">{">"}</button>
            </div>
         </div>
      </div>
    </div>
  );
}
