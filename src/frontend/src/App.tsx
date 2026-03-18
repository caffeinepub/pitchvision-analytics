import { showBattingStats } from "@/components/BattingStats";
import { showBowlingStats } from "@/components/BowlingStats";
import { showFieldingStats } from "@/components/FieldingStats";
import { showGroundDimensions } from "@/components/GroundDimensions";
import { Sidebar } from "@/components/Sidebar";
import { StadiumHeader } from "@/components/StadiumHeader";
import { TabBar } from "@/components/TabBar";
import { COUNTRIES, type Stadium, loadStadiums } from "@/data/stadiums";
import { CircleDot } from "lucide-react";
import { useState } from "react";

type Tab = "batting" | "bowling" | "fielding" | "dimensions";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string>(COUNTRIES[0]);
  const [selectedStadium, setSelectedStadium] = useState<Stadium | null>(
    () => loadStadiums(COUNTRIES[0])[0] ?? null,
  );
  const [activeTab, setActiveTab] = useState<Tab>("batting");
  const [animKey, setAnimKey] = useState(0);

  function handleCountryChange(c: string) {
    setSelectedCountry(c);
    const stadiums = loadStadiums(c);
    setSelectedStadium(stadiums[0] ?? null);
    setAnimKey((k) => k + 1);
  }

  function handleStadiumChange(s: Stadium) {
    setSelectedStadium(s);
    setAnimKey((k) => k + 1);
  }

  function handleTabChange(t: Tab) {
    setActiveTab(t);
    setAnimKey((k) => k + 1);
  }

  if (showSplash) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 50%, oklch(0.62 0.18 165 / 0.12) 0%, transparent 70%)",
          }}
        />

        {/* Cricket ball icon */}
        <div className="mb-6 fade-in">
          <CircleDot size={64} style={{ color: "oklch(0.72 0.2 165)" }} />
        </div>

        {/* Brand name */}
        <h1
          className="text-6xl sm:text-7xl font-black tracking-tight mb-3 fade-in"
          style={{
            color: "oklch(0.92 0.015 243)",
            letterSpacing: "-0.03em",
            animationDelay: "0.1s",
          }}
        >
          Cric<span style={{ color: "oklch(0.72 0.2 165)" }}>Stats</span>
        </h1>

        {/* Tagline */}
        <p
          className="text-base sm:text-lg text-muted-foreground mb-10 fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Deep analytics for cricket stadiums worldwide
        </p>

        {/* CTA button */}
        <button
          type="button"
          onClick={() => setShowSplash(false)}
          className="fade-in px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 active:scale-95"
          style={{
            background: "oklch(0.62 0.18 165)",
            color: "oklch(0.1 0.01 243)",
            boxShadow: "0 0 32px oklch(0.62 0.18 165 / 0.35)",
            animationDelay: "0.3s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "oklch(0.72 0.2 165)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "oklch(0.62 0.18 165)";
          }}
        >
          Let's Start Analysing
        </button>

        {/* Bottom brand */}
        <p
          className="absolute bottom-5 text-xs text-muted-foreground fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          Powered by{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "oklch(0.72 0.2 165)" }}
          >
            caffeine.ai
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        selectedCountry={selectedCountry}
        selectedStadium={selectedStadium}
        activeTab={activeTab}
        onCountryChange={handleCountryChange}
        onStadiumChange={handleStadiumChange}
        onTabChange={handleTabChange}
      />

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pt-20 lg:pt-6">
          {selectedStadium ? (
            <>
              <StadiumHeader stadium={selectedStadium} />
              <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
              <div key={animKey}>
                {activeTab === "batting" &&
                  showBattingStats({
                    stadium: selectedStadium,
                    animKey: String(animKey),
                  })}
                {activeTab === "bowling" &&
                  showBowlingStats({
                    stadium: selectedStadium,
                    animKey: String(animKey),
                  })}
                {activeTab === "fielding" &&
                  showFieldingStats({
                    stadium: selectedStadium,
                    animKey: String(animKey),
                  })}
                {activeTab === "dimensions" &&
                  showGroundDimensions({ stadium: selectedStadium })}
              </div>
            </>
          ) : (
            <div
              data-ocid="app.empty_state"
              className="flex flex-col items-center justify-center h-64 text-center"
            >
              <CircleDot
                size={48}
                className="mb-4"
                style={{ color: "oklch(0.62 0.18 165 / 0.4)" }}
              />
              <h2 className="text-lg font-semibold text-foreground mb-2">
                No Stadium Selected
              </h2>
              <p className="text-sm text-muted-foreground">
                Choose a country and stadium from the sidebar to view analytics.
              </p>
            </div>
          )}
        </div>

        {/* Mobile footer */}
        <footer className="lg:hidden border-t border-border px-4 py-3 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "oklch(0.72 0.2 165)" }}
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
