import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { tools } from "@/data/tools";
import { blogs } from "@/data/blogs";
import { categories } from "@/data/categories";

export const Route = createFileRoute("/sitemap")({
  component: SitemapPage,
  head: () => ({
    meta: [
      { title: "Sitemap — Utilihub" },
      { name: "description", content: "Every page on Utilihub in one place." },
    ],
  }),
});

function SitemapPage() {
  return (
    <Layout>
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">Sitemap</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Every page on Utilihub</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          {tools.length} tools + {blogs.length} articles + {categories.length} category hubs + core pages.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="mb-3 text-lg font-semibold">Site</h2>
        <ul className="grid gap-1 text-sm sm:grid-cols-2">
          <li><Link to="/" className="hover:text-primary">Home</Link></li>
          <li><Link to="/tools" className="hover:text-primary">All tools</Link></li>
          <li><Link to="/blog" className="hover:text-primary">All articles</Link></li>
          <li><Link to="/about" className="hover:text-primary">About</Link></li>
          <li><Link to="/privacy" className="hover:text-primary">Privacy</Link></li>
          <li><Link to="/terms" className="hover:text-primary">Terms</Link></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-lg font-semibold">Categories</h2>
        <ul className="grid gap-1 text-sm sm:grid-cols-2">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link to="/category/$slug" params={{ slug: c.slug }} className="hover:text-primary">{c.name}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-lg font-semibold">Tools ({tools.length})</h2>
        <ul className="grid gap-1 text-xs sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <li key={t.slug}>
              <Link to="/tools/$slug" params={{ slug: t.slug }} className="text-muted-foreground hover:text-primary">{t.title}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Articles ({blogs.length})</h2>
        <ul className="grid gap-1 text-xs sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((b) => (
            <li key={b.slug}>
              <Link to="/blog/$slug" params={{ slug: b.slug }} className="text-muted-foreground hover:text-primary">{b.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
