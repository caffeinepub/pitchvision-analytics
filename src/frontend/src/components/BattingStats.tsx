import type { Stadium } from "@/data/stadiums";
import { AnimatedVerticalBar } from "./AnimatedBar";
import { KpiCard } from "./KpiCard";

interface Props {
  stadium: Stadium;
  animKey: string;
}

export function showBattingStats({ stadium, animKey }: Props) {
  const dewColor: Record<string, string> = {
    Low: "oklch(0.7 0.15 200)",
    Medium: "oklch(0.72 0.18 165)",
    High: "oklch(0.75 0.2 130)",
    "Very High": "oklch(0.7 0.2 50)",
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <KpiCard
          label="Avg 1st Innings"
          value={stadium.avgFirstInnings}
          sub="runs"
          highlight
        />
        <KpiCard
          label="Highest Chase"
          value={stadium.highestChase}
          sub="runs"
        />
        <KpiCard
          label="Boundary %"
          value={`${stadium.boundaryPct}%`}
          sub="of all runs"
        />
        <KpiCard
          label="Dot Ball %"
          value={`${stadium.dotBallPct}%`}
          sub="dot balls faced"
        />
        <KpiCard
          label="Dew Factor"
          value={stadium.dewFactor}
          sub="conditions"
        />
      </div>

      {/* Phase strike rate chart */}
      <div className="card-panel">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Strike Rate by Phase (runs/100 balls)
        </h3>
        <div className="flex gap-4 items-end" style={{ height: "160px" }}>
          <AnimatedVerticalBar
            key={`${animKey}-pp`}
            value={stadium.srPowerplay}
            max={220}
            label="Powerplay (1-6)"
            animKey={animKey}
          />
          <AnimatedVerticalBar
            key={`${animKey}-mid`}
            value={stadium.srMiddle}
            max={220}
            label="Middle (7-16)"
            animKey={animKey}
          />
          <AnimatedVerticalBar
            key={`${animKey}-death`}
            value={stadium.srDeath}
            max={220}
            label="Death (17-20)"
            animKey={animKey}
          />
        </div>
      </div>

      {/* Dew factor badge */}
      <div className="card-panel flex items-center gap-4">
        <div
          className="w-2 h-10 rounded-full"
          style={{ background: dewColor[stadium.dewFactor] }}
        />
        <div>
          <div className="text-sm font-semibold text-foreground">
            Dew Factor: {stadium.dewFactor}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            {stadium.dewFactor === "Very High" &&
              "Evening matches heavily affected. Fielding side disadvantaged in 2nd innings."}
            {stadium.dewFactor === "High" &&
              "Dew expected in second innings. Batting first generally advantageous."}
            {stadium.dewFactor === "Medium" &&
              "Moderate dew presence. Both teams can adapt strategies accordingly."}
            {stadium.dewFactor === "Low" &&
              "Minimal dew effect. Pitch conditions remain consistent throughout."}
          </div>
        </div>
      </div>
    </div>
  );
}
