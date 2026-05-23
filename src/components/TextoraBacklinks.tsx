import type { ReactNode } from "react";

interface TextoraLink {
  label: string;
  href: string;
}

const textoraToolLinks: TextoraLink[] = [
  { label: "Word & Character Counter", href: "https://textora.me/word-counter" },
  { label: "Case Converter", href: "https://textora.me/case-converter" },
  { label: "Lorem Ipsum Generator", href: "https://textora.me/lorem-ipsum" },
  { label: "Text Cleaner", href: "https://textora.me/text-cleaner" },
  { label: "Remove Duplicate Lines", href: "https://textora.me/remove-duplicates" },
  { label: "JSON Formatter", href: "https://textora.me/json-formatter" },
  { label: "Base64 Encode / Decode", href: "https://textora.me/base64" },
  { label: "URL Encoder", href: "https://textora.me/url-encoder" },
  { label: "Markdown to HTML", href: "https://textora.me/markdown-to-html" },
  { label: "Slugify Text", href: "https://textora.me/slugify" },
  { label: "Find & Replace", href: "https://textora.me/find-replace" },
  { label: "Sort Lines", href: "https://textora.me/sort-lines" },
  { label: "Diff Checker", href: "https://textora.me/diff-checker" },
  { label: "CSV to JSON", href: "https://textora.me/csv-to-json" },
  { label: "HTML Stripper", href: "https://textora.me/html-stripper" },
];

const textoraBlogLinks: TextoraLink[] = [
  { label: "How to write better headlines", href: "https://textora.me/blog/how-to-write-better-headlines" },
  { label: "SEO meta description guide", href: "https://textora.me/blog/seo-meta-description-guide" },
  { label: "Markdown cheatsheet", href: "https://textora.me/blog/markdown-cheatsheet" },
  { label: "Writing tips for developers", href: "https://textora.me/blog/writing-tips-for-developers" },
  { label: "Clean copy for landing pages", href: "https://textora.me/blog/clean-copy-for-landing-pages" },
];

const textoraExploreLinks: TextoraLink[] = [
  { label: "Textora Home", href: "https://textora.me" },
  { label: "All Text Tools", href: "https://textora.me/tools" },
  { label: "Writing & SEO Blog", href: "https://textora.me/blog" },
  { label: "About Textora", href: "https://textora.me/about" },
  { label: "Contact", href: "https://textora.me/contact" },
];

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function shuffle<T>(arr: T[], count: number): T[] {
  const today = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24));
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(today + i) * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

export function TextoraSidebar() {
  const tools = shuffle(textoraToolLinks, 6);
  const blogs = shuffle(textoraBlogLinks, 3);
  return (
    <aside className="rounded-2xl border border-border bg-card/60 p-5">
      <h3 className="text-sm font-semibold text-foreground">
        Free text tools from{" "}
        <a href="https://textora.me" target="_blank" rel="noopener" className="text-primary hover:underline">
          textora.me
        </a>
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">
        A fast, free online text toolkit. No sign-up, no ads, works offline.
      </p>

      <div className="mt-4 space-y-3">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Popular tools</h4>
          <ul className="mt-2 space-y-1.5">
            {tools.map((t) => (
              <li key={t.href}>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/60" />
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-border pt-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Reading</h4>
          <ul className="mt-2 space-y-1.5">
            {blogs.map((b) => (
              <li key={b.href}>
                <a
                  href={b.href}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/60" />
                  {b.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-border pt-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Explore</h4>
          <ul className="mt-2 space-y-1.5">
            {textoraExploreLinks.map((e) => (
              <li key={e.href}>
                <a
                  href={e.href}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/60" />
                  {e.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export function TextoraInlineBlock({ children }: { children?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5">
      <h3 className="text-sm font-semibold text-foreground">
        Also check out{" "}
        <a href="https://textora.me" target="_blank" rel="noopener" className="text-primary hover:underline">
          textora.me
        </a>
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">
        Free online text toolkit — word counters, case converters, JSON formatters, Base64 tools, and more. No sign-up required.
      </p>
      {children}
    </div>
  );
}
