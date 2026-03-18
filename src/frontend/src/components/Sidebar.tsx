import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRIES, type Stadium, loadStadiums } from "@/data/stadiums";
import {
  BarChart3,
  CircleDot,
  Maximize2,
  Menu,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

type Tab = "batting" | "bowling" | "fielding" | "dimensions";

interface SidebarProps {
  selectedCountry: string;
  selectedStadium: Stadium | null;
  activeTab: Tab;
  onCountryChange: (c: string) => void;
  onStadiumChange: (s: Stadium) => void;
  onTabChange: (t: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "batting", label: "Batting Stats", icon: <TrendingUp size={16} /> },
  { id: "bowling", label: "Bowling Analytics", icon: <BarChart3 size={16} /> },
  { id: "fielding", label: "Fielding Stats", icon: <Users size={16} /> },
  {
    id: "dimensions",
    label: "Ground Dimensions",
    icon: <Maximize2 size={16} />,
  },
];

export function Sidebar({
  selectedCountry,
  selectedStadium,
  activeTab,
  onCountryChange,
  onStadiumChange,
  onTabChange,
}: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const stadiums = selectedCountry ? loadStadiums(selectedCountry) : [];

  const content = (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{
            background: "oklch(0.62 0.18 165 / 0.18)",
            border: "1px solid oklch(0.62 0.18 165 / 0.4)",
          }}
        >
          <CircleDot size={18} style={{ color: "oklch(0.72 0.2 165)" }} />
        </div>
        <div>
          <div className="text-sm font-bold text-foreground leading-tight">
            PitchVision
          </div>
          <div
            className="text-xs font-semibold"
            style={{ color: "oklch(0.72 0.2 165)" }}
          >
            Analytics
          </div>
        </div>
      </div>

      {/* Dropdowns */}
      <div className="px-4 py-5 space-y-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
            Country
          </p>
          <Select value={selectedCountry} onValueChange={onCountryChange}>
            <SelectTrigger
              data-ocid="sidebar.select"
              className="w-full bg-secondary border-border text-foreground text-sm h-10 rounded-lg"
            >
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {COUNTRIES.map((c) => (
                <SelectItem key={c} value={c} className="text-sm">
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
            Stadium
          </p>
          <Select
            value={selectedStadium?.id ?? ""}
            onValueChange={(val) => {
              const s = stadiums.find((st) => st.id === val);
              if (s) onStadiumChange(s);
            }}
            disabled={!selectedCountry}
          >
            <SelectTrigger
              data-ocid="stadium.select"
              className="w-full bg-secondary border-border text-foreground text-sm h-10 rounded-lg"
            >
              <SelectValue placeholder="Select stadium" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border max-h-64">
              {stadiums.map((s) => (
                <SelectItem key={s.id} value={s.id} className="text-sm">
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Nav */}
      <div className="px-3 flex-1">
        <p className="text-xs font-medium text-muted-foreground mb-3 px-2 uppercase tracking-wider">
          Analytics
        </p>
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              data-ocid={`sidebar.${tab.id}.tab`}
              onClick={() => {
                onTabChange(tab.id);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
              style={
                activeTab === tab.id
                  ? {
                      background: "oklch(0.62 0.18 165 / 0.15)",
                      color: "oklch(0.72 0.2 165)",
                      borderLeft: "2px solid oklch(0.72 0.2 165)",
                    }
                  : {}
              }
            >
              <span
                style={
                  activeTab === tab.id ? { color: "oklch(0.72 0.2 165)" } : {}
                }
              >
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
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
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 shrink-0 h-screen sticky top-0 sidebar-bg border-r border-border overflow-y-auto">
        {content}
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 sidebar-bg border-b border-border flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <CircleDot size={18} style={{ color: "oklch(0.72 0.2 165)" }} />
          <span className="font-bold text-sm">PitchVision Analytics</span>
        </div>
        <button
          type="button"
          data-ocid="sidebar.mobile.toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg hover:bg-secondary"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 flex">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
            role="button"
            tabIndex={-1}
            aria-label="Close menu"
          />
          <aside className="relative w-72 h-full sidebar-bg border-r border-border overflow-y-auto z-40 mt-14">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
