import Link from "next/link";

type SectionProps = {
  title: string;
  eyebrow?: string;
  action?: string;
  actionHref?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
};

export function Section({
  title,
  eyebrow,
  action,
  actionHref = "#",
  children,
  className = "",
  bodyClassName = "",
}: SectionProps) {
  return (
    <section className={`panel-surface overflow-hidden ${className}`.trim()}>
      <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-5 md:px-7">
        <div>
          {eyebrow ? (
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-mute">{eyebrow}</p>
          ) : null}
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
        </div>
        {action ? (
          <Link href={actionHref} className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            {action}
          </Link>
        ) : null}
      </div>
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const lower = status.toLowerCase();
  const tone = lower.includes("paid") || lower.includes("complete")
    ? "border-success text-success"
    : lower.includes("pending") || lower.includes("qa")
      ? "border-zinc-200 text-zinc-200"
      : "border-brand text-brand";

  return (
    <span className={`inline-flex items-center gap-2 border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${tone}`}>
      <span className="h-2 w-2 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function ProgressBar({ value, tone = "red" }: { value: number; tone?: "red" | "green" | "white" }) {
  const color = tone === "green" ? "bg-success" : tone === "white" ? "bg-zinc-100" : "bg-brand";

  return (
    <div className="h-2 w-full overflow-hidden bg-zinc-800">
      <span className={`block h-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  );
}

export function PrimaryButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 bg-brand px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#ff343a] ${className}`.trim()}
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 border border-zinc-200 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:border-white hover:bg-white/5 ${className}`.trim()}
    >
      {children}
    </button>
  );
}
