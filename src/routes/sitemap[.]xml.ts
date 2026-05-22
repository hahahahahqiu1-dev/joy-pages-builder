import { createFileRoute } from "@tanstack/react-router";
import { tools } from "@/data/tools";
import { blogs } from "@/data/blogs";
import { categories } from "@/data/categories";

const BASE_URL = "https://id-preview--e3a8a5e1-868d-4466-b81e-6833315e802d.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: string;
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/tools", changefreq: "weekly", priority: "0.9" },
          { path: "/blog", changefreq: "weekly", priority: "0.9" },
          { path: "/about", changefreq: "monthly", priority: "0.5" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
          { path: "/sitemap", changefreq: "weekly", priority: "0.5" },
        ];

        categories.forEach((c) =>
          entries.push({
            path: `/category/${c.slug}`,
            changefreq: "weekly",
            priority: "0.8",
          })
        );

        tools.forEach((t) =>
          entries.push({
            path: `/tools/${t.slug}`,
            changefreq: "monthly",
            priority: "0.7",
          })
        );

        blogs.forEach((b) =>
          entries.push({
            path: `/blog/${b.slug}`,
            changefreq: "monthly",
            priority: "0.6",
          })
        );

        const urls = entries.map(
          (e) =>
            `  <url>\n` +
            `    <loc>${BASE_URL}${e.path}</loc>\n` +
            `    <changefreq>${e.changefreq ?? "monthly"}</changefreq>\n` +
            `    <priority>${e.priority ?? "0.5"}</priority>\n` +
            `  </url>`,
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
