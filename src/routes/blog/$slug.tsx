import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { blogMap, relatedBlogs, type BlogPost } from "@/data/blogs";
import { toolMap } from "@/data/tools";
import { categoryMap } from "@/data/categories";
import { ToolCard, BlogCard } from "@/components/Cards";
import { TextoraSidebar } from "@/components/TextoraBacklinks";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPage,
  loader: ({ params }) => {
    const post = blogMap[params.slug];
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.post.title} — Utilihub` },
      { name: "description", content: loaderData.post.excerpt },
    ] : [],
  }),
});

function BlogPage() {
  const { post } = Route.useLoaderData() as { post: BlogPost };
  const cat = categoryMap[post.category];
  const relatedToolsList = post.relatedToolSlugs.map((s: string) => toolMap[s]).filter(Boolean);
  const related = relatedBlogs(post.slug, 4);
  return (
    <Layout>
      <nav className="mb-4 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span> / </span>
        <Link to="/blog" className="hover:text-primary">Blog</Link>
        <span> / </span>
        <Link to="/category/$slug" params={{ slug: post.category }} className="hover:text-primary">{cat?.name}</Link>
      </nav>

      <article className="mx-auto max-w-3xl">
        <header className="mb-8">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">{cat?.name} · {post.readMinutes} min read</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{post.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{post.excerpt}</p>
          <time className="mt-2 block text-xs text-muted-foreground">{post.date}</time>
        </header>

        <div className="space-y-6">
          {post.sections.map((s: { heading: string; body: string }, i: number) => (
            <section key={i}>
              <h2 className="text-lg font-semibold tracking-tight">{s.heading}</h2>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </section>
          ))}
        </div>

        {relatedToolsList.length > 0 && (
          <section className="mt-10 rounded-2xl border border-border bg-card/60 p-5">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tools in this article</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedToolsList.map((t: any) => <ToolCard key={t.slug} tool={t} />)}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Keep reading</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map((b) => <BlogCard key={b.slug} post={b} />)}
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
}
