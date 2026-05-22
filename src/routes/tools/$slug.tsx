import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { toolMap, relatedTools } from "@/data/tools";
import { blogsLinkingTool } from "@/data/blogs";
import { categoryMap } from "@/data/categories";
import { ToolCard, BlogCard } from "@/components/Cards";
import { ToolRunner } from "@/components/ToolRunner";
import { TextoraSidebar } from "@/components/TextoraBacklinks";


export const Route = createFileRoute("/tools/$slug")({
  component: ToolPage,
  loader: ({ params }) => {
    const tool = toolMap[params.slug];
    if (!tool) throw notFound();
    return { tool };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.tool.title} — Utilihub` },
      { name: "description", content: loaderData.tool.description },
    ] : [],
  }),
});

function ToolPage() {
  const { tool } = Route.useLoaderData();
  const related = relatedTools(tool.slug, 6);
  const articles = blogsLinkingTool(tool.slug, 4);
  const cat = categoryMap[tool.category];
  return (
    <Layout>
      <nav className="mb-4 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span> / </span>
        <Link to="/tools" className="hover:text-primary">Tools</Link>
        <span> / </span>
        <Link to="/category/$slug" params={{ slug: tool.category }} className="hover:text-primary">{cat?.name}</Link>
      </nav>

      <header className="mb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">{cat?.name}</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">{tool.title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{tool.description}</p>
      </header>

      <ToolRunner tool={tool} />

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold">Related tools</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t) => <ToolCard key={t.slug} tool={t} />)}
          </div>
        </section>
      )}

      {articles.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold">Articles that use this tool</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {articles.map((b) => <BlogCard key={b.slug} post={b} />)}
          </div>
        </section>
      )}
    </Layout>
  );
}
