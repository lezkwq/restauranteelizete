import { getMapsUrl, getWhatsappUrl, site } from "./site";

/** Domínio escolhido pelo proprietário; ainda depende de registro e conexão. */
export const plannedSiteOrigin = "https://restauranteelizete.com.br";
export const publicPagePaths = ["/", "/cardapio"] as const;

/** Usa o endereço ativo; só adota o domínio definitivo quando ele servir o site. */
export function getSeoOrigin(currentOrigin: string) {
  const current = new URL(currentOrigin);
  const planned = new URL(plannedSiteOrigin);
  return [planned.hostname, `www.${planned.hostname}`].includes(current.hostname)
    ? planned.origin
    : current.origin;
}

export function getRestaurantSchema(origin: string) {
  const url = (path: string) => new URL(path, origin).href;
  const whatsappUrl = getWhatsappUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": url("/#restaurante"),
    name: site.name,
    description: "Uma casa de família, comida feita na hora e uma mesa de frente para o mar na Praia do Estaleiro, Balneário Camboriú.",
    url: url("/"),
    image: url("/images/fachada-elizete.png"),
    logo: url("/images/logo-elizete.png"),
    telephone: site.contact.phoneHref.slice(4),
    ...(whatsappUrl ? {
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "reservas e informações",
        telephone: `+${site.contact.whatsapp}`,
        url: whatsappUrl,
        availableLanguage: "pt-BR",
      },
    } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.location.street,
      addressLocality: site.location.city,
      addressRegion: site.location.state,
      postalCode: site.location.postalCode,
      addressCountry: "BR",
    },
    // Horário confirmado na publicação fornecida pelo restaurante.
    openingHours: "Mo-Su 11:00-18:00",
    servesCuisine: "Frutos do mar",
    hasMenu: url("/cardapio"),
    hasMap: getMapsUrl(),
    sameAs: [site.contact.instagram],
  };
}

export function getSitemap(origin: string) {
  const escapeXml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicPagePaths.map((path) => `  <url><loc>${escapeXml(new URL(path, origin).href)}</loc></url>`).join("\n")}\n</urlset>\n`;
}
