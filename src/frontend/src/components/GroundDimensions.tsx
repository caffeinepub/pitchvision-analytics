import type { Stadium } from "@/data/stadiums";

interface Props {
  stadium: Stadium;
}

export function showGroundDimensions({ stadium }: Props) {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* Oval diagram */}
      <div className="card-panel">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Ground Layout & Dimensions
        </h3>
        <div className="flex justify-center">
          <PitchDiagram stadium={stadium} />
        </div>
      </div>

      {/* Dimension cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: "Straight Boundary", value: stadium.dimStraight, icon: "↑" },
          { label: "Square Leg", value: stadium.dimSquare, icon: "←" },
          { label: "Midwicket", value: stadium.dimMidwicket, icon: "↖" },
        ].map((d) => (
          <div key={d.label} className="card-panel flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shrink-0"
              style={{
                background: "oklch(0.62 0.18 165 / 0.15)",
                color: "oklch(0.72 0.2 165)",
              }}
            >
              {d.icon}
            </div>
            <div>
              <div className="text-xs text-muted-foreground">{d.label}</div>
              <div
                className="text-2xl font-bold"
                style={{ color: "oklch(0.72 0.2 165)" }}
              >
                {d.value}m
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stadium info */}
      <div className="card-panel">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Stadium Information
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Location", value: `${stadium.city}, ${stadium.country}` },
            { label: "Capacity", value: stadium.capacity.toLocaleString() },
            { label: "Established", value: stadium.established },
            { label: "Board", value: stadium.board },
          ].map((info) => (
            <div key={info.label}>
              <div className="text-xs text-muted-foreground mb-1">
                {info.label}
              </div>
              <div className="text-sm font-semibold text-foreground">
                {info.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PitchDiagram({ stadium }: { stadium: Stadium }) {
  const W = 360;
  const H = 300;
  const cx = W / 2;
  const cy = H / 2;
  const rx = 150;
  const ry = 122;

  const scale =
    rx / Math.max(stadium.dimStraight, stadium.dimSquare, stadium.dimMidwicket);
  const straight = stadium.dimStraight * scale;
  const square = stadium.dimSquare * scale;
  const midwicket = stadium.dimMidwicket * scale * 0.92;
  const midwicketAngle = 225 * (Math.PI / 180);

  const mwX = cx + Math.cos(midwicketAngle) * midwicket;
  const mwY = cy + Math.sin(midwicketAngle) * midwicket * (ry / rx);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ maxWidth: "380px" }}
      role="img"
      aria-labelledby="pitch-diagram-title"
    >
      <title id="pitch-diagram-title">
        Cricket ground dimension diagram for {stadium.name}
      </title>

      {/* Grass background */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill="oklch(0.25 0.06 150 / 0.4)"
        stroke="oklch(0.62 0.18 165 / 0.5)"
        strokeWidth="1.5"
      />

      {/* Inner ring (30-yard circle) */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx * 0.56}
        ry={ry * 0.56}
        fill="none"
        stroke="oklch(0.62 0.18 165 / 0.25)"
        strokeWidth="1"
        strokeDasharray="4 3"
      />

      {/* Pitch rectangle */}
      <rect
        x={cx - 8}
        y={cy - 26}
        width={16}
        height={52}
        rx={2}
        fill="oklch(0.55 0.05 80 / 0.5)"
        stroke="oklch(0.72 0.2 165 / 0.5)"
        strokeWidth="1"
      />

      {/* Crease lines */}
      <line
        x1={cx - 10}
        y1={cy - 18}
        x2={cx + 10}
        y2={cy - 18}
        stroke="white"
        strokeWidth="0.8"
        opacity={0.5}
      />
      <line
        x1={cx - 10}
        y1={cy + 18}
        x2={cx + 10}
        y2={cy + 18}
        stroke="white"
        strokeWidth="0.8"
        opacity={0.5}
      />

      {/* Straight */}
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy - straight}
        stroke="oklch(0.72 0.2 165 / 0.7)"
        strokeWidth="1.5"
        strokeDasharray="5 3"
      />
      <polygon
        points={`${cx},${cy - straight} ${cx - 5},${cy - straight + 8} ${cx + 5},${cy - straight + 8}`}
        fill="oklch(0.72 0.2 165)"
      />
      <text
        x={cx + 6}
        y={cy - straight + 4}
        fill="oklch(0.72 0.2 165)"
        fontSize="11"
        fontFamily="Inter,sans-serif"
        fontWeight="600"
      >
        {stadium.dimStraight}m
      </text>

      {/* Square leg */}
      <line
        x1={cx}
        y1={cy}
        x2={cx - square}
        y2={cy}
        stroke="oklch(0.6 0.16 200 / 0.7)"
        strokeWidth="1.5"
        strokeDasharray="5 3"
      />
      <polygon
        points={`${cx - square},${cy} ${cx - square + 8},${cy - 5} ${cx - square + 8},${cy + 5}`}
        fill="oklch(0.6 0.16 200)"
      />
      <text
        x={cx - square + 10}
        y={cy - 5}
        fill="oklch(0.6 0.16 200)"
        fontSize="11"
        fontFamily="Inter,sans-serif"
        fontWeight="600"
      >
        {stadium.dimSquare}m
      </text>

      {/* Midwicket */}
      <line
        x1={cx}
        y1={cy}
        x2={mwX}
        y2={mwY}
        stroke="oklch(0.7 0.18 80 / 0.7)"
        strokeWidth="1.5"
        strokeDasharray="5 3"
      />
      <polygon
        points={`${mwX},${mwY} ${mwX + 7},${mwY - 5} ${mwX + 5},${mwY + 5}`}
        fill="oklch(0.7 0.18 80)"
      />
      <text
        x={mwX - 8}
        y={mwY - 8}
        fill="oklch(0.7 0.18 80)"
        fontSize="11"
        fontFamily="Inter,sans-serif"
        fontWeight="600"
      >
        {stadium.dimMidwicket}m
      </text>

      {/* Center dot */}
      <circle cx={cx} cy={cy} r={3} fill="oklch(0.72 0.2 165)" />

      {/* Labels */}
      <text
        x={cx}
        y={H - 8}
        textAnchor="middle"
        fill="oklch(0.58 0.04 243)"
        fontSize="10"
        fontFamily="Inter,sans-serif"
      >
        Straight
      </text>
      <text
        x={14}
        y={cy + 4}
        textAnchor="middle"
        fill="oklch(0.58 0.04 243)"
        fontSize="10"
        fontFamily="Inter,sans-serif"
      >
        Sq
      </text>
    </svg>
  );
}
