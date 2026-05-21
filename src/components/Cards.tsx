import { Link } from "@tanstack/react-router";
import type { Tool } from "@/data/tools";
import type { BlogPost } from "@/data/blogs";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      to="/tools/$slug"
      params={{ slug: tool.slug }}
      className="group block rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold group-hover:text-primary">{tool.title}</h3>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{tool.category}</span>
      </div>
      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{tool.description}</p>
    </Link>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group block rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary"
    >
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{post.category} · {post.readMinutes} min</span>
      <h3 className="mt-1 text-sm font-semibold group-hover:text-primary">{post.title}</h3>
      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{post.excerpt}</p>
    </Link>
  );
}

export function SectionTitle({ title, href, linkLabel }: { title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {href && (
        <Link to={href as any} className="text-xs text-primary hover:underline">
          {linkLabel ?? "See all →"}
        </Link>
      )}
    </div>
  );
}
