import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { artisans } from "@/lib/data";

export const Route = createFileRoute("/artisans")({
  head: () => ({
    meta: [
      { title: "Artisans — Shilpa-Kala Showcase" },
      { name: "description", content: "Meet the verified master stone and wood carvers behind Shilpa-Kala — generational shilpis of South India." },
      { property: "og:title", content: "The Shilpis — Shilpa-Kala" },
      { property: "og:description", content: "Meet the verified master carvers behind every piece." },
    ],
  }),
  component: ArtisansList,
});

function ArtisansList() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-6 pt-12 pb-6">
        <p className="font-heritage text-[10px] uppercase tracking-luxe text-gold">
          The Hands Behind the Stone
        </p>
        <h1 className="mt-1 font-display text-4xl leading-[1.05] text-foreground">
          Artisans
        </h1>
      </header>

      <section className="space-y-5 px-6">
        {artisans.map((a) => (
          <Link
            key={a.id}
            to="/artisans/$id"
            params={{ id: a.id }}
            className="group flex gap-4 overflow-hidden rounded-lg border border-border/50 bg-card p-4"
          >
            <img
              src={a.image}
              alt={a.name}
              loading="lazy"
              className="h-24 w-24 shrink-0 rounded-md object-cover"
            />
            <div className="flex-1">
              <p className="font-heritage text-[10px] uppercase tracking-luxe text-gold">
                {a.specialty}
              </p>
              <h2 className="mt-1 font-display text-lg text-foreground">
                {a.name}
              </h2>
              <p className="mt-1 flex items-center gap-1.5 font-ui text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 text-gold" />
                {a.location}
              </p>
              <p className="mt-1 font-ui text-[11px] text-muted-foreground">
                {a.experienceYears} years of practice
              </p>
            </div>
          </Link>
        ))}
      </section>

      <BottomNav />
    </div>
  );
}