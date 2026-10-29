import { createFileRoute } from "@tanstack/react-router";
import { getSeoOrigin, getSitemap } from "@/data/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => new Response(getSitemap(getSeoOrigin(new URL(request.url).origin)), {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
      }),
    },
  },
});
