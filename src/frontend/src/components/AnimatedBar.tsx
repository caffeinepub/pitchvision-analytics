import { useEffect, useState } from "react";

interface AnimatedBarProps {
  value: number;
  max: number;
  label: string;
  suffix?: string;
  color?: string;
  animKey?: string | number;
}

export function AnimatedBar({
  value,
  max,
  label,
  suffix = "%",
  animKey,
  color,
}: AnimatedBarProps) {
  const [width, setWidth] = useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: animKey triggers reset animation
  useEffect(() => {
    setWidth(0);
    const t = setTimeout(() => setWidth((value / max) * 100), 60);
    return () => clearTimeout(t);
  }, [value, max, animKey]);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-semibold text-foreground">
          {value}
          {suffix}
        </span>
      </div>
      <div
        className="h-2.5 rounded-full overflow-hidden"
        style={{ background: "oklch(0.22 0.03 243)" }}
      >
        <div
          className="h-full rounded-full bar-animate"
          style={{
            width: `${width}%`,
            background:
              color ??
              "linear-gradient(90deg, oklch(0.45 0.14 165) 0%, oklch(0.72 0.2 165) 100%)",
          }}
        />
      </div>
    </div>
  );
}

export function AnimatedVerticalBar({
  value,
  max,
  label,
  suffix = "",
  animKey,
}: AnimatedBarProps) {
  const [height, setHeight] = useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: animKey triggers reset animation
  useEffect(() => {
    setHeight(0);
    const t = setTimeout(() => setHeight((value / max) * 100), 80);
    return () => clearTimeout(t);
  }, [value, max, animKey]);

  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      <span className="text-xs font-semibold text-foreground">
        {value}
        {suffix}
      </span>
      <div
        className="w-full flex-1 flex items-end rounded-t-md overflow-hidden"
        style={{
          background: "oklch(0.22 0.03 243)",
          minHeight: "80px",
          maxHeight: "120px",
        }}
      >
        <div
          className="w-full rounded-t-md bar-animate"
          style={{
            height: `${height}%`,
            background:
              "linear-gradient(180deg, oklch(0.72 0.2 165) 0%, oklch(0.45 0.14 165) 100%)",
            transition: "height 0.7s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
      <span className="text-xs text-muted-foreground text-center leading-tight">
        {label}
      </span>
    </div>
  );
}
