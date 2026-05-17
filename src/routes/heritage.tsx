import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { heritageStories } from "@/lib/data";

export const Route = createFileRoute("/heritage")({
  head: () => ({
    meta: [
      { title: "Heritage — Shilpa-Kala Showcase" },
      { name: "description", content: "Cultural history of India's stone and wood carving traditions — Hoysala, Dravidian and the living shilpis of Shivarapatna." },
      { property: "og:title", content: "Heritage — Shilpa-Kala" },
      { property: "og:description", content: "Cultural history of India's living carving traditions." },
    ],
  }),
  component: HeritageList,
});

function HeritageList() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-6 pt-12 pb-6">
        <p className="font-heritage text-[10px] uppercase tracking-luxe text-gold">
          Stories in Stone
        </p>
        <h1 className="mt-1 font-display text-4xl leading-[1.05] text-foreground">
          Heritage
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          The traditions behind every chisel-mark. Read, listen, and remember
          why these works matter.
        </p>
      </header>

      <section className="space-y-5 px-6">
        {heritageStories.map((s) => (
          <Link
            key={s.id}
            to="/heritage/$id"
            params={{ id: s.id }}
            className="group block overflow-hidden rounded-lg border border-border/50 bg-card shadow-elegant"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-scrim" />
              <p className="absolute left-4 top-4 rounded-full glass px-3 py-1 font-heritage text-[10px] uppercase tracking-luxe text-gold">
                {s.era}
              </p>
            </div>
            <div className="p-5">
              <p className="font-ui text-[10px] uppercase tracking-luxe text-muted-foreground">
                {s.origin}
              </p>
              <h2 className="mt-1 font-display text-xl text-foreground">
                {s.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.excerpt}
              </p>
              <p className="mt-4 inline-flex items-center gap-1.5 font-ui text-[10px] uppercase tracking-luxe text-gold">
                Read story <ArrowRight className="h-3 w-3" />
              </p>
            </div>
          </Link>
        ))}
      </section>

      <BottomNav />
    </div>
  );
}