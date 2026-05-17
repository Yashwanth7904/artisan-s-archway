import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { Award, ArrowLeft, MapPin, Star } from "lucide-react";
import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { SculptureCard } from "@/components/SculptureCard";
import { getArtisan, sculpturesByArtisan, type Sculpture } from "@/lib/data";

export const Route = createFileRoute("/artisans/$id")({
  loader: ({ params }) => {
    const artisan = getArtisan(params.id);
    if (!artisan) throw notFound();
    return { artisan, works: sculpturesByArtisan(artisan.id) };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.artisan.name} — Shilpi · Shilpa-Kala` },
            { name: "description", content: loaderData.artisan.bio },
            { property: "og:title", content: loaderData.artisan.name },
            { property: "og:description", content: loaderData.artisan.bio },
            { property: "og:image", content: loaderData.artisan.image },
            { name: "twitter:image", content: loaderData.artisan.image },
          ],
        }
      : { meta: [] },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center text-foreground">
      Artisan not found
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="p-8 text-foreground">{error.message}</div>
  ),
  component: ArtisanDetail,
});

function ArtisanDetail() {
  const { artisan, works } = Route.useLoaderData();
  const router = useRouter();
  const [following, setFollowing] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="relative h-[60vh] min-h-[440px] w-full overflow-hidden">
        <img
          src={artisan.image}
          alt={artisan.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <button
          onClick={() => router.history.back()}
          aria-label="Back"
          className="absolute left-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full glass text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="absolute inset-x-0 bottom-0 z-10 p-6">
          <p className="font-heritage text-[10px] uppercase tracking-luxe text-gold">
            {artisan.specialty}
          </p>
          <h1 className="mt-2 font-display text-3xl text-foreground">
            {artisan.name}
          </h1>
          <p className="mt-1 flex items-center gap-1.5 font-ui text-sm text-foreground/80">
            <MapPin className="h-3.5 w-3.5 text-gold" />
            {artisan.location}
          </p>
        </div>
      </div>

      <section className="px-6 pt-7">
        <div className="flex items-center justify-between gap-4 rounded-lg border border-border/60 bg-card p-4">
          <div>
            <p className="font-display text-2xl text-foreground">
              {artisan.experienceYears}
              <span className="ml-1 font-ui text-xs uppercase tracking-luxe text-muted-foreground">
                yrs
              </span>
            </p>
            <p className="font-ui text-[10px] uppercase tracking-luxe text-muted-foreground">
              Practice
            </p>
          </div>
          <div>
            <p className="font-display text-2xl text-foreground">
              {works.length}
            </p>
            <p className="font-ui text-[10px] uppercase tracking-luxe text-muted-foreground">
              Works
            </p>
          </div>
          <button
            onClick={() => setFollowing((v) => !v)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-ui text-[11px] font-semibold uppercase tracking-luxe transition-colors ${
              following
                ? "border border-gold text-gold"
                : "bg-gradient-gold text-primary-foreground shadow-gold"
            }`}
          >
            <Star className={`h-3.5 w-3.5 ${following ? "fill-gold" : ""}`} />
            {following ? "Following" : "Follow"}
          </button>
        </div>

        <p className="mt-6 text-[15px] leading-[1.75] text-foreground/85">
          {artisan.bio}
        </p>

        <div className="mt-6 rounded-lg border border-gold/30 bg-card/60 p-4">
          <p className="font-heritage text-[10px] uppercase tracking-luxe text-gold">
            Signature
          </p>
          <p className="mt-2 font-display italic text-foreground/90">
            {artisan.signature}
          </p>
        </div>

        {artisan.awards.length > 0 && (
          <div className="mt-6">
            <p className="font-heritage text-[10px] uppercase tracking-luxe text-gold">
              Recognition
            </p>
            <ul className="mt-3 space-y-2">
              {artisan.awards.map((a: string) => (
                <li
                  key={a}
                  className="flex items-start gap-3 rounded-lg border border-border/40 p-3 font-ui text-sm text-foreground/85"
                >
                  <Award className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {works.length > 0 && (
        <section className="px-6 pt-10">
          <p className="font-heritage text-[10px] uppercase tracking-luxe text-gold">
            Portfolio
          </p>
          <h2 className="mt-1 font-display text-2xl text-foreground">
            Works by {artisan.name.split(" ")[0]}
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {works.map((w: Sculpture) => (
              <SculptureCard key={w.id} sculpture={w} height="h-64" />
            ))}
          </div>
        </section>
      )}

      <BottomNav />
    </div>
  );
}