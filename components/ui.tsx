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
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3.5 md:px-5">
        <div>
          {eyebrow ? (
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-mute">{eyebrow}</p>
          ) : null}
          <h2 className="text-lg font-semibold text-white md:text-xl">{title}</h2>
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
      <span 
        className={`block h-full ${color}`} 
        data-width={value}
        style={{ "--dynamic-width": `${value}%` } as any}
      />
    </div>
  );
}

export function PrimaryButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 bg-brand px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#ff343a] md:px-5 md:py-3 md:text-sm ${className}`.trim()}
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 border border-zinc-200 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:border-white hover:bg-white/5 md:px-5 md:py-3 md:text-sm ${className}`.trim()}
    >
      {children}
    </button>
  );
}

type MediaGalleryProps = {
  media: Array<{ id: string; label: string; src: string; type: "image" | "video" | "document" }>;
};

export function MediaGallery({ media }: MediaGalleryProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {media.map((asset) => (
        <div
          key={asset.id}
          className="group aspect-video cursor-pointer overflow-hidden border border-line bg-black relative"
        >
          <img
            alt={asset.label}
            src={asset.src}
            className="h-full w-full object-cover opacity-80 transition-all group-hover:opacity-100 group-hover:scale-105 duration-300"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-3xl">👁️</span>
          </div>
          <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white border border-line">
            {asset.label}
          </div>
        </div>
      ))}
      <div className="group aspect-video border-2 border-dashed border-line flex flex-col items-center justify-center text-zinc-500 hover:text-white hover:border-white transition-colors cursor-pointer">
        <span className="text-3xl mb-2">📤</span>
        <span className="text-xs font-semibold uppercase tracking-[0.18em]">Add New</span>
      </div>
    </div>
  );
}

type FileListProps = {
  files: Array<{ name: string; meta: string; size: string; kind: "PDF" | "ZIP" | "DOC" }>;
  onDownload?: (fileName: string) => void;
  onDelete?: (fileName: string) => void;
};

export function FileList({ files, onDownload, onDelete }: FileListProps) {
  const getFileIcon = (kind: string) => {
    switch (kind) {
      case "PDF":
        return "📄";
      case "ZIP":
        return "📦";
      case "DOC":
        return "📋";
      default:
        return "📎";
    }
  };

  return (
    <div className="divide-y divide-line">
      {files.map((file) => (
        <div
          key={file.name}
          className="flex flex-col gap-4 p-4 transition hover:bg-white/[0.03] md:flex-row md:items-center md:justify-between md:p-5 group"
        >
          <div className="flex items-center gap-4">
            <div className="text-2xl">{getFileIcon(file.kind)}</div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-white group-hover:text-brand transition-colors cursor-pointer truncate">
                {file.name}
              </h4>
              <p className="text-sm text-mute">{file.meta}</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
            <span className="text-sm font-semibold text-mute">{file.size}</span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onDownload && onDownload(file.name)}
                  className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                  title="Download"
                >
                  ⬇️
                </button>
                <button
                  onClick={() => onDelete && onDelete(file.name)}
                  className="p-1.5 text-zinc-400 hover:text-brand transition-colors"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
          </div>
        </div>
      ))}
    </div>
  );
}

type BarChartData = {
  label: string;
  value: number;
  maxValue: number;
};

type BarChartProps = {
  data: BarChartData[];
};

export function BarChart({ data }: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="flex items-end justify-center gap-3 min-h-[320px] w-full pt-6 pb-4">
      {data.map((item, index) => {
        const heightPercent = (item.value / maxValue) * 100;
        const isHighest = item.value === maxValue;

        return (
          <div
            key={item.label}
            className="flex-1 flex flex-col items-center gap-3 group"
          >
            <div className="w-full flex flex-col items-center gap-1">
              <div className="relative w-full flex items-end justify-center h-64 bg-zinc-900/50 rounded-sm overflow-hidden">
                <div
                  className={`w-3/4 rounded-t-sm transition-all ${
                    isHighest ? "bg-brand" : "bg-brand/60"
                  }`}
                  data-height-chart
                  style={{ "--chart-height": `${heightPercent}%` } as any}
                />
              </div>
            </div>
            <span className={`text-xs font-bold uppercase tracking-wider ${
              isHighest ? "text-zinc-300" : "text-zinc-600"
            }`}>
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
