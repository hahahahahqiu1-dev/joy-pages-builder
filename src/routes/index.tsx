import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { tools } from "@/data/tools";
import { blogs } from "@/data/blogs";
import { categories } from "@/data/categories";
import { ToolCard, BlogCard, SectionTitle } from "@/components/Cards";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Utilihub — 150+ free everyday tools and short guides" },
      { name: "description", content: "A growing library of small, fast, browser-only tools: converters, calculators, text utilities, generators, and clear how-to guides." },
    ],
  }),
});

function Index() {
  const featuredTools = tools.slice(0, 12);
  const latestBlogs = blogs.slice(0, 6);
  return (
    <Layout>
      <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-secondary/40 via-card to-background p-8 md:p-14">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">Utilihub</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
          {tools.length}+ tiny tools and short guides for everyday tasks.
        </h1>
        <p className="mt-4 max-w-xl text-sm text-muted-foreground">
          Converters, calculators, text utilities, generators and plain-English articles. Everything runs in your browser — nothing to install, nothing leaves your device.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/tools" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Browse tools</Link>
          <Link to="/blog" className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:border-primary">Read articles</Link>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-3 md:grid-cols-4">
          {[{ k: "Tools", v: tools.length }, { k: "Articles", v: blogs.length }, { k: "Categories", v: categories.length }, { k: "Sign-up", v: "Never" }].map((s) => (
            <div key={s.k} className="rounded-xl border border-border bg-card/60 p-3">
              <div className="text-xs uppercase text-muted-foreground">{s.k}</div>
              <div className="mt-1 text-xl font-semibold text-primary">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionTitle title="Browse by category" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary"
            >
              <h3 className="text-base font-semibold group-hover:text-primary">{c.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{c.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionTitle title="Popular tools" href="/tools" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </section>

      <section className="mt-12">
        <SectionTitle title="From the blog" href="/blog" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {latestBlogs.map((b) => <BlogCard key={b.slug} post={b} />)}
        </div>
      </section>
    </Layout>
  );
}
