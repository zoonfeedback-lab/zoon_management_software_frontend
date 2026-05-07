import Link from "next/link";
import { PrimaryButton } from "@/components/ui";

export const metadata = {
  title: "Welcome to ZOON | Recruitment Status",
  description: "Your technical vector has been successfully transmitted to the ZOON engineering hub.",
};

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#050608] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-xl space-y-10 animate-in fade-in zoom-in duration-1000">
        {/* Success Icon */}
        <div className="mx-auto size-24 rounded-full border-2 border-brand flex items-center justify-center text-4xl shadow-[0_0_50px_rgba(255,32,38,0.3)] animate-pulse">
           ✔
        </div>

        <div className="space-y-4">
           <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase">Transmission Received</h1>
           <p className="text-zinc-500 font-black uppercase tracking-[0.3em] text-xs">Technical Vector Successfully Uplinked</p>
        </div>

        <p className="text-[#8b909c] text-sm font-medium leading-relaxed max-w-md mx-auto">
           Your internship application has been successfully synchronized with the ZOON recruitment terminal. Our senior engineers will now evaluate your technical profile.
        </p>

        <div className="pt-8 space-y-6">
           <Link href="/">
              <PrimaryButton className="!px-16 !py-5">Return to Main Terminal</PrimaryButton>
           </Link>
           <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest">
              Please monitor your email for further mission directives.
           </p>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand/5 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
