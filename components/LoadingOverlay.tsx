"use client";

import { useEffect, useState } from "react";
import { Loader } from "./ui";

export function LoadingOverlay() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate initial system synchronization
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0b0b0d]">
      <Loader text="Synchronizing Project Nodes..." />
      <div className="absolute bottom-12 left-12">
        <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-zinc-700">Zoon Mainframe / Boot Sequence 1.0.4</p>
      </div>
    </div>
  );
}
