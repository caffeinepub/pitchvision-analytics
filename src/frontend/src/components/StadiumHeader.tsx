import { Badge } from "@/components/ui/badge";
import type { Stadium } from "@/data/stadiums";
import { Calendar, MapPin, Users } from "lucide-react";

interface StadiumHeaderProps {
  stadium: Stadium;
}

export function StadiumHeader({ stadium }: StadiumHeaderProps) {
  return (
    <header className="mb-6 animate-fade-in">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 leading-tight">
        {stadium.name}
      </h1>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Badge
          className="text-xs font-medium"
          style={{
            background: "oklch(0.62 0.18 165 / 0.18)",
            color: "oklch(0.72 0.2 165)",
            border: "1px solid oklch(0.62 0.18 165 / 0.4)",
          }}
        >
          {stadium.board}
        </Badge>
        <Badge variant="outline" className="text-xs text-muted-foreground">
          {stadium.homeTeam}
        </Badge>
      </div>
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <MapPin size={14} />
          {stadium.city}, {stadium.country}
        </span>
        <span className="flex items-center gap-1.5">
          <Users size={14} />
          {stadium.capacity.toLocaleString()} capacity
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar size={14} />
          Est. {stadium.established}
        </span>
      </div>
    </header>
  );
}
