function SearchIcon() {
  return (
    <svg className="h-4 w-4 text-mute" viewBox="0 0 20 20" fill="none">
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg className="h-5 w-5 text-zinc-200" viewBox="0 0 24 24" fill="none">
      <path d="M12 4a4 4 0 0 0-4 4v2.7c0 .9-.3 1.8-.8 2.5L6 15h12l-1.2-1.8c-.5-.7-.8-1.6-.8-2.5V8a4 4 0 0 0-4-4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 18a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg className="h-5 w-5 text-brand" viewBox="0 0 24 24" fill="none">
      <path d="M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 1 0 12 8.5Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 2v3M12 19v3M4.9 4.9l2.2 2.2M16.9 16.9l2.2 2.2M2 12h3M19 12h3M4.9 19.1l2.2-2.2M16.9 7.1l2.2-2.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function Topbar({ sectionTitle }: { sectionTitle?: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-[#0b0b0d]/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1680px] items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-white/90">
            {sectionTitle ?? "Client Management"}
          </h2>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 border-r border-white/5 pr-6">
            <button aria-label="Notifications" className="grid h-9 w-9 place-items-center rounded-lg transition hover:bg-white/5">
              <BellIcon />
            </button>
            <button aria-label="Help" className="grid h-9 w-9 place-items-center rounded-lg transition hover:bg-white/5">
              <svg className="h-5 w-5 text-[#9897a1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-white">Admin User</div>
              <div className="text-[10px] font-medium uppercase tracking-wider text-[#9897a1]">System Lead</div>
            </div>
            <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10 p-0.5 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100" 
                alt="Admin" 
                className="h-full w-full rounded-md object-cover"
              />
              <div className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0b0b0d] bg-success" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
