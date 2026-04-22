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
    <header className="sticky top-0 z-20 border-b border-line bg-black/90 backdrop-blur">
      <div className="flex flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-4 md:flex-row md:items-center">
          <div className="display-title text-2xl uppercase text-brand">{sectionTitle ?? "Zoonlabs"}</div>
          <label className="flex min-w-0 flex-1 items-center gap-3 border border-line bg-white/[0.03] px-4 py-3 md:max-w-md">
            <SearchIcon />
            <input
              aria-label="Search projects"
              placeholder="Search project reviews..."
              className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-mute"
            />
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button aria-label="Notifications" className="grid h-10 w-10 place-items-center">
            <BellIcon />
          </button>
          <button aria-label="Settings" className="grid h-10 w-10 place-items-center">
            <GearIcon />
          </button>
          <div className="grid h-11 w-11 place-items-center rounded-full border border-line bg-gradient-to-br from-sky-900 to-sky-500 text-sm font-bold text-white">
            GK
          </div>
        </div>
      </div>
    </header>
  );
}
