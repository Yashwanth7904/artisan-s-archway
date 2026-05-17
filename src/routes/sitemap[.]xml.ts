import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { artisans, heritageStories, sculptures } from "@/lib/data";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/gallery", changefreq: "weekly", priority: "0.9" },
          { path: "/heritage", changefreq: "monthly", priority: "0.8" },
          { path: "/artisans", changefreq: "monthly", priority: "0.8" },
          ...sculptures.map((s) => ({ path: `/sculpture/${s.id}`, changefreq: "monthly", priority: "0.7" })),
          ...heritageStories.map((h) => ({ path: `/heritage/${h.id}`, changefreq: "monthly", priority: "0.6" })),
          ...artisans.map((a) => ({ path: `/artisans/${a.id}`, changefreq: "monthly", priority: "0.6" })),
        ];

        const urls = entries.map(
          (e) =>
            `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});