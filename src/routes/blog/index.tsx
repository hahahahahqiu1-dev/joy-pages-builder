import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { blogs } from "@/data/blogs";
import { categories } from "@/data/categories";
import { BlogCard } from "@/components/Cards";
import { TextoraSidebar } from "@/components/TextoraBacklinks";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  head: () => ({
    meta: [
      { title: `Blog — Utilihub` },
      { name: "description", content: `Short, practical articles on everyday tools: converters, calculators, text utilities and more.` },
    ],
  }),
});

function BlogIndex() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    return blogs.filter((b) => (!cat || b.category === cat) && (!s || b.title.toLowerCase().includes(s)));
  }, [q, cat]);
  return (
    <Layout>
      <header className="mb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">Blog</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">{blogs.length} short, practical articles</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">No fluff, no autoplay videos. Just useful guides on the small tools you actually use.</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <div>
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search articles…"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm md:max-w-xs"
            />
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setCat(null)}
                className={`rounded-full border px-3 py-1 text-xs ${cat === null ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary"}`}
              >All</button>
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setCat(c.slug === cat ? null : c.slug)}
                  className={`rounded-full border px-3 py-1 text-xs ${cat === c.slug ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary"}`}
                >{c.name}</button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((b) => <BlogCard key={b.slug} post={b} />)}
          </div>
        </div>

        <div className="space-y-6">
          <TextoraSidebar />
        </div>
      </div>
    </Layout>
  );
}
