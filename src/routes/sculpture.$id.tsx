import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Bookmark, CheckCircle2, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { buildInquiryLink, getArtisan, getSculpture, type TimelineStage } from "@/lib/data";

export const Route = createFileRoute("/sculpture/$id")({
  loader: ({ params }) => {
    const sculpture = getSculpture(params.id);
    if (!sculpture) throw notFound();
    const artisan = getArtisan(sculpture.artisanId);
    if (!artisan) throw notFound();
    return { sculpture, artisan };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.sculpture.title} — Shilpa-Kala` },
            { name: "description", content: loaderData.sculpture.description },
            { property: "og:title", content: loaderData.sculpture.title },
            { property: "og:description", content: loaderData.sculpture.description },
            { property: "og:image", content: loaderData.sculpture.image },
            { name: "twitter:image", content: loaderData.sculpture.image },
          ],
        }
      : { meta: [] },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center text-foreground">
      Sculpture not found
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="p-8 text-foreground">{error.message}</div>
  ),
  component: Detail,
});

function Detail() {
  const { sculpture, artisan } = Route.useLoaderData();
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(false);
  const [showInquiry, setShowInquiry] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

  const inquiryLink = buildInquiryLink(sculpture, artisan, customMessage);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: sculpture.title,
          text: sculpture.description,
          url: window.location.href,
        });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* HERO IMAGE */}
      <div className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
        <img
          src={sculpture.image}
          alt={sculpture.title}
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
          <div className="flex gap-2">
            <button
              onClick={() => setBookmarked((v) => !v)}
              aria-label="Bookmark"
              className="flex h-10 w-10 items-center justify-center rounded-full glass text-foreground"
            >
              <Bookmark
                className={`h-5 w-5 ${bookmarked ? "fill-gold text-gold" : ""}`}
              />
            </button>
            <button
              onClick={handleShare}
              aria-label="Share"
              className="flex h-10 w-10 items-center justify-center rounded-full glass text-foreground"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 p-6">
          <p className="font-heritage text-[10px] uppercase tracking-luxe text-gold">
            {sculpture.style} · {sculpture.id}
          </p>
          <h1 className="mt-2 font-display text-3xl leading-tight text-foreground">
            {sculpture.title}
          </h1>
          <p className="mt-1 font-ui text-sm text-foreground/80">
            by {artisan.name}
          </p>
        </div>
      </div>

      {/* DETAILS */}
      <section className="px-6 pt-8">
        {sculpture.status === "in-progress" && (
          <div className="mb-6 rounded-lg border border-gold/30 bg-card/60 p-4">
            <div className="flex items-baseline justify-between">
              <p className="font-heritage text-[10px] uppercase tracking-luxe text-gold">
                In Progress
              </p>
              <p className="font-display text-xl text-foreground">
                {sculpture.completion}%
              </p>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-gradient-gold transition-all"
                style={{ width: `${sculpture.completion}%` }}
              />
            </div>
            {sculpture.estimatedCompletion && (
              <p className="mt-3 font-ui text-xs text-muted-foreground">
                Estimated completion · {sculpture.estimatedCompletion}
              </p>
            )}
          </div>
        )}

        <p className="text-sm leading-relaxed text-foreground/85">
          {sculpture.description}
        </p>

        <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border/50 bg-border/40">
          {[
            ["Material", sculpture.material],
            ["Dimensions", sculpture.dimensions],
            ["Weight", sculpture.weight],
            ["Style", sculpture.style],
            ["Category", sculpture.category],
            ["Uploaded", sculpture.uploadDate],
          ].map(([k, v]) => (
            <div key={k} className="bg-card p-4">
              <dt className="font-ui text-[10px] uppercase tracking-luxe text-muted-foreground">
                {k}
              </dt>
              <dd className="mt-1.5 font-display text-sm text-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* TIMELINE */}
      {sculpture.timeline && sculpture.timeline.length > 0 && (
        <section className="px-6 pt-12">
          <p className="font-heritage text-[10px] uppercase tracking-luxe text-gold">
            From Stone to Spirit
          </p>
          <h2 className="mt-1 font-display text-2xl text-foreground">
            Work in Progress
          </h2>

          <ol className="mt-6 relative">
            <div className="absolute left-3 top-3 bottom-3 w-px bg-gradient-to-b from-gold/60 via-gold/30 to-transparent" />
            {sculpture.timeline.map((stage: TimelineStage, i: number) => (
              <li key={i} className="relative pl-10 pb-8 last:pb-0">
                <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-gold/60 bg-background">
                  {i < sculpture.timeline!.length - 1 ? (
                    <CheckCircle2 className="h-4 w-4 text-gold" />
                  ) : (
                    <span className="h-2 w-2 animate-gold-pulse rounded-full bg-gold" />
                  )}
                </div>
                <p className="font-ui text-[10px] uppercase tracking-luxe text-muted-foreground">
                  {stage.date}
                </p>
                <h3 className="mt-1 font-display text-lg text-foreground">
                  {stage.stage}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {stage.description}
                </p>
                <div className="mt-3 overflow-hidden rounded-lg border border-border/60">
                  <img
                    src={stage.image}
                    alt={stage.stage}
                    loading="lazy"
                    className="h-48 w-full object-cover"
                  />
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ARTISAN STRIP */}
      <section className="px-6 pt-12">
        <Link
          to="/artisans/$id"
          params={{ id: artisan.id }}
          className="group flex items-center gap-4 rounded-lg border border-border/60 bg-card p-4"
        >
          <img
            src={artisan.image}
            alt={artisan.name}
            loading="lazy"
            className="h-16 w-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="font-heritage text-[10px] uppercase tracking-luxe text-gold">
              The Shilpi
            </p>
            <p className="mt-0.5 font-display text-base text-foreground">
              {artisan.name}
            </p>
            <p className="font-ui text-xs text-muted-foreground">
              {artisan.location} · {artisan.experienceYears} yrs
            </p>
          </div>
          <span className="font-ui text-[10px] uppercase tracking-luxe text-gold opacity-0 transition-opacity group-hover:opacity-100">
            View →
          </span>
        </Link>
      </section>

      {/* STICKY INQUIRY BAR */}
      <div className="fixed inset-x-0 bottom-[68px] z-40 border-t border-border/60 glass p-3">
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          <div className="flex-1">
            <p className="font-ui text-[10px] uppercase tracking-luxe text-muted-foreground">
              Product ID {sculpture.id}
            </p>
            <p className="font-display text-sm text-foreground truncate">
              {sculpture.title}
            </p>
          </div>
          <button
            onClick={() => setShowInquiry(true)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-3 font-ui text-xs font-semibold uppercase tracking-luxe text-primary-foreground shadow-gold active:scale-95"
          >
            <MessageCircle className="h-4 w-4" /> Enquire
          </button>
        </div>
      </div>

      {/* INQUIRY SHEET */}
      {showInquiry && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-black/70 backdrop-blur-sm"
          onClick={() => setShowInquiry(false)}
        >
          <div
            className="w-full rounded-t-2xl border-t border-gold/30 bg-card p-6 animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
            <p className="font-heritage text-[10px] uppercase tracking-luxe text-gold">
              Direct Inquiry
            </p>
            <h3 className="mt-1 font-display text-xl text-foreground">
              Message {artisan.name}
            </h3>
            <p className="mt-2 font-ui text-xs text-muted-foreground">
              Your message opens in WhatsApp, pre-filled with Product ID{" "}
              <span className="text-gold">{sculpture.id}</span>. You can edit
              before sending.
            </p>

            <label className="mt-5 block">
              <span className="font-ui text-[10px] uppercase tracking-luxe text-muted-foreground">
                Add a personal note (optional)
              </span>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={3}
                placeholder="e.g. I'd like this shipped to Singapore by August."
                className="mt-2 w-full rounded-lg border border-border/70 bg-input p-3 font-ui text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
              />
            </label>

            <a
              href={inquiryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-3.5 font-ui text-xs font-semibold uppercase tracking-luxe text-primary-foreground shadow-gold active:scale-95"
            >
              <MessageCircle className="h-4 w-4" /> Open WhatsApp
            </a>
            <a
              href={`mailto:?subject=Inquiry%20${sculpture.id}%20-%20${encodeURIComponent(sculpture.title)}&body=${encodeURIComponent(`Hello, I'm interested in ${sculpture.title} (${sculpture.id}) by ${artisan.name}.\n\n${customMessage}`)}`}
              className="mt-3 flex items-center justify-center gap-2 rounded-full border border-border/70 px-6 py-3.5 font-ui text-xs font-semibold uppercase tracking-luxe text-foreground"
            >
              Email instead
            </a>
            <button
              onClick={() => setShowInquiry(false)}
              className="mt-3 w-full py-3 font-ui text-xs uppercase tracking-luxe text-muted-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}