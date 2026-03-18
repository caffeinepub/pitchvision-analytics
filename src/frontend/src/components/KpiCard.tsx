interface KpiCardProps {
  label: string;
  value: string | number;
  sub?: string;
  highlight?: boolean;
}

export function KpiCard({ label, value, sub, highlight }: KpiCardProps) {
  return (
    <div
      className="card-panel flex flex-col gap-1"
      style={
        highlight
          ? {
              borderColor: "oklch(0.62 0.18 165 / 0.5)",
              boxShadow: "0 0 16px oklch(0.62 0.18 165 / 0.12)",
            }
          : {}
      }
    >
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <span
        className="text-2xl font-bold leading-none"
        style={
          highlight
            ? { color: "oklch(0.72 0.2 165)" }
            : { color: "oklch(0.925 0.015 243)" }
        }
      >
        {value}
      </span>
      {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
    </div>
  );
}
