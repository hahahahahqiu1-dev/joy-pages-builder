import { Link } from "@tanstack/react-router";
import { categories } from "@/data/categories";
import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="inline-block h-6 w-6 rounded-md bg-primary" />
            <span>Utilihub</span>
          </Link>
          <nav className="hidden gap-1 md:flex">
            <Link to="/tools" className="rounded-md px-3 py-1.5 text-sm hover:bg-muted">Tools</Link>
            <Link to="/blog" className="rounded-md px-3 py-1.5 text-sm hover:bg-muted">Blog</Link>
            <Link to="/about" className="rounded-md px-3 py-1.5 text-sm hover:bg-muted">About</Link>
            <Link to="/sitemap" className="rounded-md px-3 py-1.5 text-sm hover:bg-muted">Sitemap</Link>
          </nav>
        </div>
        <div className="border-t border-border/60 bg-background/60">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-1 px-4 py-2 text-xs">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="rounded-full border border-border px-3 py-1 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>

      <footer className="mt-12 border-t border-border bg-card/40">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold">Utilihub</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              150+ small, fast, offline-friendly tools and short articles to help you finish everyday tasks faster.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Categories</h3>
            <ul className="mt-2 space-y-1 text-xs">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link to="/category/$slug" params={{ slug: c.slug }} className="text-muted-foreground hover:text-primary">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Explore</h3>
            <ul className="mt-2 space-y-1 text-xs">
              <li><Link to="/tools" className="text-muted-foreground hover:text-primary">All tools</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary">All articles</Link></li>
              <li><Link to="/sitemap" className="text-muted-foreground hover:text-primary">Sitemap</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Site</h3>
            <ul className="mt-2 space-y-1 text-xs">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary">About</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary">Privacy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/60 bg-card/60">
          <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-muted-foreground">
            <h3 className="text-base font-semibold text-foreground">
              You might also like:{" "}
              <a href="https://textora.me" target="_blank" rel="noopener" className="text-primary underline-offset-4 hover:underline">
                Textora.me
              </a>
            </h3>
            <p className="mt-2 leading-relaxed">
              <a href="https://textora.me" target="_blank" rel="noopener" className="text-primary hover:underline">Textora.me</a> is a
              free online text toolkit we recommend for anyone who works with words daily — writers, students,
              developers, SEO marketers, and editors. Every tool runs instantly in your browser, requires no
              sign-up, and never stores your text on a server.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <h4 className="text-xs font-semibold text-foreground">Popular Textora text tools</h4>
                <ul className="mt-2 space-y-1">
                  <li><a href="https://textora.me/word-counter" target="_blank" rel="noopener" className="hover:text-primary">Word & Character Counter</a></li>
                  <li><a href="https://textora.me/case-converter" target="_blank" rel="noopener" className="hover:text-primary">Case Converter</a></li>
                  <li><a href="https://textora.me/lorem-ipsum" target="_blank" rel="noopener" className="hover:text-primary">Lorem Ipsum Generator</a></li>
                  <li><a href="https://textora.me/text-cleaner" target="_blank" rel="noopener" className="hover:text-primary">Text Cleaner</a></li>
                  <li><a href="https://textora.me/remove-duplicates" target="_blank" rel="noopener" className="hover:text-primary">Remove Duplicate Lines</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-foreground">Developer & formatters</h4>
                <ul className="mt-2 space-y-1">
                  <li><a href="https://textora.me/json-formatter" target="_blank" rel="noopener" className="hover:text-primary">JSON Formatter</a></li>
                  <li><a href="https://textora.me/base64" target="_blank" rel="noopener" className="hover:text-primary">Base64 Encode / Decode</a></li>
                  <li><a href="https://textora.me/url-encoder" target="_blank" rel="noopener" className="hover:text-primary">URL Encoder</a></li>
                  <li><a href="https://textora.me/markdown-to-html" target="_blank" rel="noopener" className="hover:text-primary">Markdown to HTML</a></li>
                  <li><a href="https://textora.me/slugify" target="_blank" rel="noopener" className="hover:text-primary">Slugify Text</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-foreground">Explore Textora</h4>
                <ul className="mt-2 space-y-1">
                  <li><a href="https://textora.me" target="_blank" rel="noopener" className="hover:text-primary">Textora Home</a></li>
                  <li><a href="https://textora.me/tools" target="_blank" rel="noopener" className="hover:text-primary">All Text Tools</a></li>
                  <li><a href="https://textora.me/blog" target="_blank" rel="noopener" className="hover:text-primary">Writing & SEO Blog</a></li>
                  <li><a href="https://textora.me/about" target="_blank" rel="noopener" className="hover:text-primary">About Textora</a></li>
                  <li><a href="https://textora.me/contact" target="_blank" rel="noopener" className="hover:text-primary">Contact</a></li>
                </ul>
              </div>
            </div>

            <p className="mt-4 leading-relaxed">
              Suggested reading from Textora:{" "}
              <a href="https://textora.me/blog/how-to-write-better-headlines" target="_blank" rel="noopener" className="text-primary hover:underline">How to write better headlines</a>,{" "}
              <a href="https://textora.me/blog/seo-meta-description-guide" target="_blank" rel="noopener" className="text-primary hover:underline">SEO meta description guide</a>, and{" "}
              <a href="https://textora.me/blog/markdown-cheatsheet" target="_blank" rel="noopener" className="text-primary hover:underline">Markdown cheatsheet</a>.
            </p>
          </div>
        </div>

        <div className="border-t border-border/60 px-4 py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Utilihub · All tools run locally in your browser · Visit{" "}
          <a href="https://textora.me" target="_blank" rel="noopener" className="text-primary hover:underline">textora.me</a> for free text tools.
        </div>
      </footer>
    </div>
  );
}
