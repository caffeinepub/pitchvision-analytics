type Tab = "batting" | "bowling" | "fielding" | "dimensions";

interface TabBarProps {
  activeTab: Tab;
  onTabChange: (t: Tab) => void;
}

const TABS: { id: Tab; label: string }[] = [
  { id: "batting", label: "Batting Stats" },
  { id: "bowling", label: "Bowling Analytics" },
  { id: "fielding", label: "Fielding Stats" },
  { id: "dimensions", label: "Ground Dimensions" },
];

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="flex gap-2 mb-6 flex-wrap" role="tablist">
      {TABS.map((tab) => (
        <button
          type="button"
          key={tab.id}
          data-ocid={`content.${tab.id}.tab`}
          role="tab"
          aria-selected={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === tab.id
              ? "text-background font-semibold"
              : "text-muted-foreground hover:text-foreground bg-secondary hover:bg-secondary/80"
          }`}
          style={
            activeTab === tab.id
              ? {
                  background: "oklch(0.62 0.18 165)",
                  color: "oklch(0.98 0.01 165)",
                }
              : {}
          }
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
