import type { Stadium } from "@/data/stadiums";
import { AnimatedBar } from "./AnimatedBar";

interface Props {
  stadium: Stadium;
  animKey: string;
}

export function showBowlingStats({ stadium, animKey }: Props) {
  const lengths = [
    {
      label: "Short Pitched",
      value: stadium.lengthShort,
      desc: "Bouncers & short balls",
    },
    {
      label: "Good Length",
      value: stadium.lengthGood,
      desc: "Most wickets from this zone",
    },
    {
      label: "Yorker",
      value: stadium.lengthYorker,
      desc: "Ideal for death overs",
    },
    {
      label: "Back of Length",
      value: stadium.lengthBack,
      desc: "Extracts bounce off pitch",
    },
    {
      label: "Full / Half-Volley",
      value: stadium.lengthFull,
      desc: "Risky against aggressive batters",
    },
  ];

  const totalWickets = lengths.reduce((s, l) => s + l.value, 0);

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="card-panel">
        <h3 className="text-sm font-semibold text-foreground mb-1">
          Bowling Length Effectiveness
        </h3>
        <p className="text-xs text-muted-foreground mb-5">
          % of wickets taken per delivery length at {stadium.name}
        </p>
        <div className="space-y-4">
          {lengths.map((l) => (
            <div key={l.label}>
              <AnimatedBar
                value={l.value}
                max={Math.max(...lengths.map((x) => x.value)) + 5}
                label={l.label}
                suffix="%"
                animKey={animKey}
              />
              <p className="text-xs text-muted-foreground mt-0.5 pl-0.5">
                {l.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="card-panel">
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
            Best Bowling Length
          </div>
          <div className="text-lg font-bold text-foreground">
            {
              lengths.reduce((best, l) => (l.value > best.value ? l : best))
                .label
            }
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {
              lengths.reduce((best, l) => (l.value > best.value ? l : best))
                .value
            }
            % of wickets
          </div>
        </div>
        <div className="card-panel">
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
            Wicket Distribution
          </div>
          <div className="flex gap-1 mt-2">
            {lengths.map((l) => (
              <div
                key={l.label}
                className="flex-1 rounded-sm"
                title={`${l.label}: ${l.value}%`}
                style={{
                  height: "24px",
                  opacity: 0.4 + (l.value / totalWickets) * 1.4,
                  background: "oklch(0.62 0.18 165)",
                }}
              />
            ))}
          </div>
          <div className="flex gap-1 mt-1">
            {lengths.map((l) => (
              <div
                key={l.label}
                className="flex-1 text-center"
                style={{ fontSize: "9px", color: "oklch(0.58 0.04 243)" }}
              >
                {l.value}%
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
