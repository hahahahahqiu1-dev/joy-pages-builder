import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { TextoraSidebar } from "@/components/TextoraBacklinks";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Utilihub" },
      { name: "description", content: "Utilihub is a free library of small browser-based tools and short, practical guides." },
    ],
  }),
});

function AboutPage() {
  return (
    <Layout>
      <article className="mx-auto max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">About</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Tiny tools, no friction.</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Utilihub is a growing library of small utilities — converters, calculators, text helpers, generators, and short how-to articles. Everything runs locally in your browser, so nothing you type leaves your device.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          We built it because the web is full of bloated tool pages that load five trackers before they let you paste a number into a box. No accounts, no ads, no paywall — just a clean page with the tool you came for and a few related ones in case they're useful.
        </p>
        <h2 className="mt-8 text-lg font-semibold">Start exploring</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
          <li><Link to="/tools" className="text-primary hover:underline">All tools</Link></li>
          <li><Link to="/blog" className="text-primary hover:underline">All articles</Link></li>
          <li><Link to="/sitemap" className="text-primary hover:underline">Sitemap</Link></li>
        </ul>
      </article>
    </Layout>
  );
}
