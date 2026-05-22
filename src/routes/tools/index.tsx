import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { ToolCard } from "@/components/Cards";
import { TextoraSidebar } from "@/components/TextoraBacklinks";

export const Route = createFileRoute("/tools/")({
  component: ToolsIndex,
  head: () => ({
    meta: [
      { title: `All tools — Utilihub` },
      { name: "description", content: `Browse all ${tools.length}+ tools on Utilihub. Filter by category or search by name.` },
    ],
  }),
});

function ToolsIndex() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    return tools.filter((t) => (!cat || t.category === cat) && (!s || t.title.toLowerCase().includes(s) || t.description.toLowerCase().includes(s)));
  }, [q, cat]);
  return (
    <Layout>
      <header className="mb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">All tools</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Every tool on Utilihub</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          {tools.length} small utilities, all running in your browser. Filter, search, and bookmark whatever you use often.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <div>
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search tools…"
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
            {filtered.map((t) => <ToolCard key={t.slug} tool={t} />)}
          </div>
          {filtered.length === 0 && (
            <p className="mt-8 text-center text-sm text-muted-foreground">No tools match. Try a different search.</p>
          )}
        </div>

        <div className="space-y-6">
          <TextoraSidebar />
        </div>
      </div>
    </Layout>
  );
}
