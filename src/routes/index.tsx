import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass } from "lucide-react";
import heroImg from "@/assets/hero-carving.jpg";
import { BottomNav } from "@/components/BottomNav";
import { SculptureCard } from "@/components/SculptureCard";
import { artisans, heritageStories, sculptures } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shilpa-Kala Showcase — Ancient Art for the Modern Buyer" },
      { name: "description", content: "Discover verified Indian stone and wood master carvers. Commission heirloom sculptures directly from the workshops of Shivarapatna and beyond." },
      { property: "og:title", content: "Shilpa-Kala Showcase" },
      { property: "og:description", content: "A verified digital gallery connecting India's master shilpis with collectors worldwide." },
    ],
  }),
  component: Index,
});

const categories = [
  { name: "Idols", count: 3 },
  { name: "Statues", count: 1 },
  { name: "Architectural", count: 0 },
  { name: "Custom", count: 0 },
];

function Index() {
  const featured = sculptures[0];
  const recent = sculptures.slice(0, 4);
  const heritage = heritageStories[0];
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* HERO */}
      <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Master stone carver shaping a Hoysala-style deity"
          width={1280}
          height={1920}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 flex h-full flex-col justify-between p-6 pt-12">
          <header className="flex items-center justify-between">
            <div>
              <p className="font-heritage text-[10px] uppercase tracking-luxe text-gold">
                Shilpa · Kala
              </p>
              <p className="mt-0.5 font-ui text-[10px] uppercase tracking-[0.32em] text-foreground/70">
                Showcase
              </p>
            </div>
            <span className="rounded-full glass px-3 py-1 font-ui text-[10px] uppercase tracking-luxe text-foreground/80">
              Est. Shivarapatna
            </span>
          </header>

          <div className="animate-fade-up">
            <div className="gold-hairline w-16 mb-5" />
            <p className="font-heritage text-[11px] uppercase tracking-luxe text-gold">
              Ancient Art · Modern Buyer
            </p>
            <h1 className="mt-3 max-w-md font-display text-[2.6rem] leading-[1.05] text-foreground">
              The chisel<br />
              <span className="italic text-gradient-gold">remembers</span><br />
              what we forget.
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/75">
              A verified gallery of India's living master carvers — and the
              sacred works rising from their workshops.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/gallery"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-3.5 font-ui text-xs font-semibold uppercase tracking-luxe text-primary-foreground shadow-gold transition-transform active:scale-95"
              >
                Enter the Gallery
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/heritage"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border/70 glass px-6 py-3.5 font-ui text-xs font-semibold uppercase tracking-luxe text-foreground"
              >
                <Compass className="h-4 w-4 text-gold" /> Heritage
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="px-6 pt-14">
        <SectionTitle eyebrow="Featured Work" title="A new Nataraja" />
        <div className="mt-5">
          <SculptureCard sculpture={featured} height="h-96" />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-6 pt-14">
        <SectionTitle eyebrow="Explore" title="By tradition" />
        <div className="mt-5 grid grid-cols-2 gap-3">
          {categories.map((c) => (
            <Link
              key={c.name}
              to="/gallery"
              search={{ category: c.name }}
              className="group relative overflow-hidden rounded-lg border border-border/50 bg-card p-5 transition-colors hover:border-gold/60"
            >
              <p className="font-display text-lg text-foreground">{c.name}</p>
              <p className="mt-1 font-ui text-[10px] uppercase tracking-luxe text-muted-foreground">
                {c.count} works
              </p>
              <ArrowRight className="absolute right-4 top-5 h-4 w-4 text-muted-foreground transition-all group-hover:text-gold group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </section>

      {/* RECENT */}
      <section className="px-6 pt-14">
        <div className="flex items-end justify-between">
          <SectionTitle eyebrow="Recent" title="From the workshops" />
          <Link
            to="/gallery"
            className="font-ui text-[10px] uppercase tracking-luxe text-gold"
          >
            View all →
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {recent.map((s, i) => (
            <SculptureCard
              key={s.id}
              sculpture={s}
              height={i % 3 === 0 ? "h-72" : "h-56"}
            />
          ))}
        </div>
      </section>

      {/* ARTISAN SPOTLIGHT */}
      <section className="px-6 pt-14">
        <SectionTitle eyebrow="Spotlight" title="The shilpis" />
        <div className="mt-5 flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 snap-x snap-mandatory">
          {artisans.map((a) => (
            <Link
              key={a.id}
              to="/artisans/$id"
              params={{ id: a.id }}
              className="group relative w-64 shrink-0 overflow-hidden rounded-lg border border-border/50 bg-card snap-start"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={a.image}
                  alt={a.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-scrim" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-heritage text-[10px] uppercase tracking-luxe text-gold">
                  {a.experienceYears} yrs · {a.location.split(",")[0]}
                </p>
                <p className="mt-1 font-display text-lg text-foreground">
                  {a.name}
                </p>
                <p className="font-ui text-[11px] text-foreground/70">
                  {a.specialty}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HERITAGE PREVIEW */}
      <section className="px-6 pt-14">
        <SectionTitle eyebrow="Heritage" title="A living tradition" />
        <Link
          to="/heritage/$id"
          params={{ id: heritage.id }}
          className="group mt-5 block overflow-hidden rounded-lg border border-border/50 bg-card"
        >
          <div className="relative h-56 overflow-hidden">
            <img
              src={heritage.image}
              alt={heritage.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-scrim" />
            <p className="absolute left-4 top-4 font-heritage text-[10px] uppercase tracking-luxe text-gold">
              {heritage.era}
            </p>
          </div>
          <div className="p-5">
            <h3 className="font-display text-xl text-foreground">
              {heritage.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {heritage.excerpt}
            </p>
            <p className="mt-4 inline-flex items-center gap-1.5 font-ui text-[10px] uppercase tracking-luxe text-gold">
              Read the story <ArrowRight className="h-3 w-3" />
            </p>
          </div>
        </Link>
      </section>

      <footer className="px-6 pt-16 pb-8 text-center">
        <div className="gold-hairline mx-auto w-12" />
        <p className="mt-5 font-heritage text-[10px] uppercase tracking-luxe text-gold">
          Shilpa · Kala · Showcase
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Preserving heritage, one chisel-stroke at a time.
        </p>
      </footer>

      <BottomNav />
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="font-heritage text-[10px] uppercase tracking-luxe text-gold">
        {eyebrow}
      </p>
      <h2 className="mt-1 font-display text-2xl text-foreground">{title}</h2>
    </div>
  );
}
