import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { categoryMap } from "@/data/categories";
import { toolsByCategory } from "@/data/tools";
import { blogsByCategory } from "@/data/blogs";
import { ToolCard, BlogCard, SectionTitle } from "@/components/Cards";

export const Route = createFileRoute("/category/$slug")({
  component: CategoryPage,
  loader: ({ params }) => {
    const cat = categoryMap[params.slug];
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.cat.name} — Utilihub` },
      { name: "description", content: loaderData.cat.description },
    ] : [],
  }),
});

function CategoryPage() {
  const { cat } = Route.useLoaderData();
  const t = toolsByCategory(cat.slug);
  const b = blogsByCategory(cat.slug);
  return (
    <Layout>
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">Category</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">{cat.name}</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">{cat.description}</p>
      </header>

      <SectionTitle title={`${t.length} tools`} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {t.map((x) => <ToolCard key={x.slug} tool={x} />)}
      </div>

      {b.length > 0 && (
        <>
          <div className="mt-12" />
          <SectionTitle title={`${b.length} articles`} />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {b.map((x) => <BlogCard key={x.slug} post={x} />)}
          </div>
        </>
      )}
    </Layout>
  );
}
