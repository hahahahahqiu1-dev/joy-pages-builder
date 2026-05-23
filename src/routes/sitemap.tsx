import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { tools } from "@/data/tools";
import { blogs } from "@/data/blogs";
import { categories } from "@/data/categories";

export const Route = createFileRoute("/sitemap")({
  component: Sitemap,
  head: () => ({
    meta: [
      { title: "Sitemap — Utilihub" },
      { name: "description", content: "Browse all tools, articles, and categories on Utilihub" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function Sitemap() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Sitemap</h1>
          <p className="mt-2 text-muted-foreground">
            Complete directory of all tools, articles, and categories
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section>
            <h2 className="text-xl font-semibold">Main pages</h2>
            <ul className="mt-3 space-y-2">
              <li><Link to="/" className="text-primary hover:underline">Home</Link></li>
              <li><Link to="/tools" className="text-primary hover:underline">All tools</Link></li>
              <li><Link to="/blog" className="text-primary hover:underline">All articles</Link></li>
              <li><Link to="/about" className="text-primary hover:underline">About</Link></li>
              <li><Link to="/privacy" className="text-primary hover:underline">Privacy policy</Link></li>
              <li><Link to="/terms" className="text-primary hover:underline">Terms of service</Link></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Categories ({categories.length})</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  to="/category/$slug"
                  params={{ slug: c.slug }}
                  className="text-primary hover:underline"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </section>
        </div>

        <section>
          <h2 className="text-xl font-semibold">All tools ({tools.length})</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {tools.map((t) => (
              <Link
                key={t.slug}
                to="/tools/$slug"
                params={{ slug: t.slug }}
                className="text-sm text-primary hover:underline"
              >
                {t.title}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">All articles ({blogs.length})</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {blogs.map((b) => (
              <Link
                key={b.slug}
                to="/blog/$slug"
                params={{ slug: b.slug }}
                className="text-primary hover:underline"
              >
                {b.title}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
