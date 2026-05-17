import { createFileRoute } from "@tanstack/react-router";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { BottomNav } from "@/components/BottomNav";
import { SculptureCard } from "@/components/SculptureCard";
import { sculptures } from "@/lib/data";

type GallerySearch = {
  category: string;
  style: string;
  status: "All" | "completed" | "in-progress";
};

const searchSchema = z.object({
  category: fallback(z.string(), "All").default("All"),
  style: fallback(z.string(), "All").default("All"),
  status: fallback(z.enum(["All", "completed", "in-progress"]), "All").default("All"),
});

export const Route = createFileRoute("/gallery")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Gallery — Shilpa-Kala Showcase" },
      { name: "description", content: "Browse the verified portfolio of stone and wood sculptures by India's master shilpis." },
      { property: "og:title", content: "Gallery — Shilpa-Kala Showcase" },
      { property: "og:description", content: "Verified sculptures and works-in-progress from India's master carvers." },
    ],
  }),
  component: Gallery,
});

const categories = ["All", "Idols", "Statues", "Architectural", "Custom"];
const styles = ["All", "Hoysala", "Dravidian", "Pallava", "Mysore Wood"];

function Gallery() {
  const { category, style, status } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return sculptures.filter((s) => {
      if (category !== "All" && s.category !== category) return false;
      if (style !== "All" && s.style !== style) return false;
      if (status !== "All" && s.status !== status) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        return (
          s.title.toLowerCase().includes(q) ||
          s.material.toLowerCase().includes(q) ||
          s.style.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [category, style, status, query]);

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-30 border-b border-border/50 glass">
        <div className="px-6 pt-8 pb-4">
          <p className="font-heritage text-[10px] uppercase tracking-luxe text-gold">
            The Collection
          </p>
          <h1 className="mt-1 font-display text-3xl text-foreground">Gallery</h1>

          <div className="mt-5 flex items-center gap-2 rounded-full border border-border/70 bg-input/50 px-4 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ganesha, granite, Hoysala…"
              className="w-full bg-transparent font-ui text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto px-6 pb-4 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => navigate({ search: (p: GallerySearch) => ({ ...p, category: c }) })}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 font-ui text-[10px] uppercase tracking-luxe transition-colors ${
                category === c
                  ? "border-gold bg-gradient-gold text-primary-foreground"
                  : "border-border/70 text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto px-6 pb-3 scrollbar-none">
          {styles.map((s) => (
            <button
              key={s}
              onClick={() => navigate({ search: (p: GallerySearch) => ({ ...p, style: s }) })}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 font-ui text-[10px] uppercase tracking-luxe transition-colors ${
                style === s
                  ? "border-gold/80 text-gold"
                  : "border-border/50 text-muted-foreground"
              }`}
            >
              {s}
            </button>
          ))}
          {(["All", "completed", "in-progress"] as const).map((st) => (
            <button
              key={st}
              onClick={() => navigate({ search: (p: GallerySearch) => ({ ...p, status: st }) })}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 font-ui text-[10px] uppercase tracking-luxe transition-colors ${
                status === st
                  ? "border-gold/80 text-gold"
                  : "border-border/50 text-muted-foreground"
              }`}
            >
              {st === "in-progress" ? "WIP" : st}
            </button>
          ))}
        </div>
      </header>

      <section className="px-6 pt-6">
        {filtered.length === 0 ? (
          <p className="py-20 text-center font-ui text-sm text-muted-foreground">
            No works match these filters.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((s, i) => (
              <div
                key={s.id}
                className={i % 5 === 0 ? "col-span-2" : ""}
              >
                <SculptureCard
                  sculpture={s}
                  height={i % 5 === 0 ? "h-80" : i % 3 === 0 ? "h-72" : "h-60"}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <BottomNav />
    </div>
  );
}