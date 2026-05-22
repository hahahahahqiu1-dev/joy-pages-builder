import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { TextoraSidebar } from "@/components/TextoraBacklinks";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms — Utilihub" },
      { name: "description", content: "Utilihub terms of use." },
    ],
  }),
});

function TermsPage() {
  return (
    <Layout>
      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <article className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">Terms</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">Terms of use</h1>
          <p className="mt-4">
            Utilihub is provided as-is for personal and commercial use. Calculations and conversions are best-effort and should not be relied on for safety-critical, medical, legal or financial decisions without independent verification.
          </p>
          <p className="mt-3">
            By using this site, you agree not to abuse the service, scrape it at high volume, or attempt to disrupt it.
          </p>
        </article>

        <div className="space-y-6">
          <TextoraSidebar />
        </div>
      </div>
    </Layout>
  );
}
