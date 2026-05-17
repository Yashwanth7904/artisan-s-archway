import { Link } from "@tanstack/react-router";
import type { Sculpture } from "@/lib/data";

interface Props {
  sculpture: Sculpture;
  height?: string;
}

export function SculptureCard({ sculpture, height = "h-72" }: Props) {
  return (
    <Link
      to="/sculpture/$id"
      params={{ id: sculpture.id }}
      className="group relative block overflow-hidden rounded-lg border border-border/50 bg-card shadow-elegant"
    >
      <div className={`relative ${height} overflow-hidden`}>
        <img
          src={sculpture.image}
          alt={sculpture.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-scrim" />
        {sculpture.status === "in-progress" && (
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full glass px-2.5 py-1 font-ui text-[10px] uppercase tracking-luxe text-gold">
            <span className="h-1.5 w-1.5 animate-gold-pulse rounded-full bg-gold" />
            In Progress · {sculpture.completion}%
          </div>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="font-ui text-[10px] uppercase tracking-luxe text-gold/80">
          {sculpture.style} · {sculpture.material}
        </p>
        <h3 className="mt-1 font-display text-lg leading-tight text-foreground">
          {sculpture.title}
        </h3>
      </div>
    </Link>
  );
}