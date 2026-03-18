import type { Stadium } from "@/data/stadiums";
import { AnimatedBar } from "./AnimatedBar";
import { KpiCard } from "./KpiCard";

interface Props {
  stadium: Stadium;
  animKey: string;
}

function getRating(
  value: number,
  thresholds: [number, number],
): { label: string; color: string } {
  if (value >= thresholds[0])
    return { label: "Excellent", color: "oklch(0.72 0.2 165)" };
  if (value >= thresholds[1])
    return { label: "Good", color: "oklch(0.7 0.15 200)" };
  return { label: "Below Average", color: "oklch(0.65 0.15 50)" };
}

export function showFieldingStats({ stadium, animKey }: Props) {
  const catchRating = getRating(stadium.catchPct, [88, 82]);
  const misfieldRating =
    stadium.misfieldPct <= 6
      ? { label: "Excellent", color: "oklch(0.72 0.2 165)" }
      : stadium.misfieldPct <= 9
        ? { label: "Average", color: "oklch(0.7 0.15 200)" }
        : { label: "Below Average", color: "oklch(0.65 0.15 50)" };
  const runOutRating =
    stadium.runOutPct >= 1.6
      ? { label: "High Activity", color: "oklch(0.65 0.15 50)" }
      : stadium.runOutPct >= 1.2
        ? { label: "Active", color: "oklch(0.7 0.15 200)" }
        : { label: "Low", color: "oklch(0.72 0.2 165)" };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <KpiCard
          label="Catch Success"
          value={`${stadium.catchPct}%`}
          sub={catchRating.label}
          highlight
        />
        <KpiCard
          label="Misfield Rate"
          value={`${stadium.misfieldPct}%`}
          sub={misfieldRating.label}
        />
        <KpiCard
          label="Run-outs / Match"
          value={stadium.runOutPct.toFixed(1)}
          sub={runOutRating.label}
        />
      </div>

      {/* Bars */}
      <div className="card-panel space-y-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Fielding Performance Breakdown
        </h3>
        <AnimatedBar
          value={stadium.catchPct}
          max={100}
          label="Catch Success Rate"
          suffix="%"
          animKey={animKey}
        />
        <AnimatedBar
          value={stadium.misfieldPct}
          max={20}
          label="Misfield Rate"
          suffix="%"
          animKey={animKey}
          color="linear-gradient(90deg, oklch(0.55 0.18 50) 0%, oklch(0.7 0.2 50) 100%)"
        />
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Run-outs per Match
            </span>
            <span className="text-sm font-semibold text-foreground">
              {stadium.runOutPct.toFixed(1)}
            </span>
          </div>
          <div
            className="h-2.5 rounded-full overflow-hidden"
            style={{ background: "oklch(0.22 0.03 243)" }}
          >
            <div
              className="h-full rounded-full bar-animate"
              style={{
                width: `${(stadium.runOutPct / 3) * 100}%`,
                background:
                  "linear-gradient(90deg, oklch(0.45 0.14 165) 0%, oklch(0.72 0.2 165) 100%)",
                transition: "width 0.7s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Rating badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { metric: "Catching", rating: catchRating },
          { metric: "Misfielding", rating: misfieldRating },
          { metric: "Run-outs", rating: runOutRating },
        ].map(({ metric, rating }) => (
          <div key={metric} className="card-panel flex items-center gap-3">
            <div
              className="w-2 h-8 rounded-full"
              style={{ background: rating.color }}
            />
            <div>
              <div className="text-xs text-muted-foreground">{metric}</div>
              <div
                className="text-sm font-semibold"
                style={{ color: rating.color }}
              >
                {rating.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
