// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  vite: {
    base: process.env.BASE_PATH || "/",
    publicDir: "public",
    plugins: [
      {
        name: "generate-static-index",
        apply: "build",
        enforce: "post",
        async closeBundle() {
          const distClientPath = join("dist", "client");

          // Copy robots.txt to dist if it exists
          try {
            const robotsPath = join("public", "robots.txt");
            const robotsContent = readFileSync(robotsPath, "utf-8");
            writeFileSync(join(distClientPath, "robots.txt"), robotsContent);
            console.log("✓ Copied robots.txt to dist");
          } catch {
            console.log("ℹ robots.txt not found in public folder");
          }

          // For GitHub Pages, create a minimal index.html and 404.html as SPA fallback
          if (process.env.GITHUB_PAGES === "true") {
            const basePath = process.env.BASE_PATH || "/";

            const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Utilihub - 150+ Tiny Tools</title>
  <script type="module">
    const path = window.location.pathname.replace('${basePath}', '/').replace(/\\/$/, '') || '/';
    const url = new URL(window.location);
    url.pathname = '${basePath}';
    url.hash = '#' + path;
    window.location.href = url.href;
  </script>
</head>
<body>
  <div id="app"></div>
</body>
</html>`;

            writeFileSync(join(distClientPath, "index.html"), indexHtml);
            writeFileSync(join(distClientPath, "404.html"), indexHtml);
            console.log("✓ Generated index.html and 404.html for GitHub Pages");
          }
        },
      },
    ],
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
