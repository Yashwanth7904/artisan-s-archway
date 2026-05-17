import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Bookmark } from "lucide-react";
import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { getHeritage } from "@/lib/data";

export const Route = createFileRoute("/heritage/$id")({
  loader: ({ params }) => {
    const story = getHeritage(params.id);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.story.title} — Heritage · Shilpa-Kala` },
            { name: "description", content: loaderData.story.excerpt },
            { property: "og:title", content: loaderData.story.title },
            { property: "og:description", content: loaderData.story.excerpt },
            { property: "og:image", content: loaderData.story.image },
            { name: "twitter:image", content: loaderData.story.image },
          ],
        }
      : { meta: [] },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center text-foreground">
      Story not found
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="p-8 text-foreground">{error.message}</div>
  ),
  component: HeritageDetail,
});

function HeritageDetail() {
  const { story } = Route.useLoaderData();
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />

        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-5">
          <button
            onClick={() => router.history.back()}
            aria-label="Back"
            className="flex h-10 w-10 items-center justify-center rounded-full glass text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setSaved((v) => !v)}
            aria-label="Save"
            className="flex h-10 w-10 items-center justify-center rounded-full glass text-foreground"
          >
            <Bookmark className={`h-5 w-5 ${saved ? "fill-gold text-gold" : ""}`} />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 p-6">
          <p className="font-heritage text-[10px] uppercase tracking-luxe text-gold">
            {story.era} · {story.origin}
          </p>
          <h1 className="mt-2 font-display text-3xl leading-tight text-foreground">
            {story.title}
          </h1>
        </div>
      </div>

      <article className="prose-invert px-6 pt-8">
        <p className="font-display text-lg italic leading-relaxed text-foreground/90">
          “{story.excerpt}”
        </p>
        <div className="gold-hairline my-6 w-12" />
        {story.paragraphs.map((p: string, i: number) => (
          <p
            key={i}
            className="mt-5 text-[15px] leading-[1.75] text-foreground/85"
          >
            {p}
          </p>
        ))}

        <h2 className="mt-10 font-display text-xl text-foreground">
          Visual Characteristics
        </h2>
        <ul className="mt-3 space-y-2">
          {story.characteristics.map((c: string) => (
            <li
              key={c}
              className="flex items-start gap-3 rounded-lg border border-border/40 bg-card/60 p-3 font-ui text-sm text-foreground/85"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {c}
            </li>
          ))}
        </ul>

        <h2 className="mt-10 font-display text-xl text-foreground">
          Famous Examples
        </h2>
        <ul className="mt-3 space-y-2">
          {story.famousExamples.map((e: string) => (
            <li
              key={e}
              className="font-heritage text-sm uppercase tracking-luxe text-foreground/80"
            >
              · {e}
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-lg border border-gold/30 bg-card/60 p-5 text-center">
          <p className="font-heritage text-[10px] uppercase tracking-luxe text-gold">
            Continue
          </p>
          <p className="mt-2 font-display text-base text-foreground">
            See work in this tradition →
          </p>
          <Link
            to="/gallery"
            className="mt-4 inline-flex rounded-full bg-gradient-gold px-5 py-2.5 font-ui text-[11px] font-semibold uppercase tracking-luxe text-primary-foreground shadow-gold"
          >
            Enter the Gallery
          </Link>
        </div>
      </article>

      <BottomNav />
    </div>
  );
}