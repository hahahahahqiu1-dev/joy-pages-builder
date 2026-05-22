import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { TextoraSidebar } from "@/components/TextoraBacklinks";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy — Utilihub" },
      { name: "description", content: "Utilihub privacy notice. All tools run in your browser." },
    ],
  }),
});

function PrivacyPage() {
  return (
    <Layout>
      <article className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">Privacy</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">Privacy notice</h1>
        <p className="mt-4">
          Utilihub is a static website. The tools listed on this site execute entirely inside your browser. Text and values you type into a tool are not sent to any server.
        </p>
        <p className="mt-3">
          We do not collect personal information. We may use basic anonymous analytics to count page views and improve the site.
        </p>
        <p className="mt-3">
          If we ever change this policy, the new version will be posted on this page with a clear date.
        </p>
      </article>
    </Layout>
  );
}
