/**
 * Configuração central do site. Use null nos campos ainda não
 * confirmados. Componentes ocultam ou desabilitam ações sem dados válidos.
 */
export const site = {
  name: "Restaurante Elizete",
  shortName: "Elizete",
  location: {
    region: "Praia do Estaleiro",
    city: "Balneário Camboriú",
    state: "SC",
    /** Endereço completo confirmado. Ex.: "Rua ..., 123" */
    street: "Av. Rodesindo Pavan, 10205",
    /** Link do Google Maps. Se null, usa busca pelo nome do restaurante. */
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Restaurante+Elizete+Av+Rodesindo+Pavan+10205+Balneario+Camboriu+SC",
    postalCode: "88334-540",
  },
  /** Horários confirmados. Ex.: [{ days: "Terça a domingo", hours: "11h às 16h" }] */
  hours: [{ days: "Todos os dias", hours: "11h às 18h" }] as { days: string; hours: string }[],
  contact: {
    /** WhatsApp comercial confirmado, somente dígitos com DDI. null desativa pedidos.
     * Não preencher automaticamente com o telefone fixo abaixo. */
    whatsapp: "554796993755" as string | null,
    phone: "(47) 3368-9946",
    phoneHref: "tel:+554733689946",
    email: null as string | null,
    instagram: "https://www.instagram.com/restauranteelizete/",
  },
  /** Indicadores de reputação. Atualize conforme o Google. */
  reputation: [
    { value: "4,8", label: "Nota no Google" },
    { value: "500+", label: "Avaliações de clientes" },
    { value: "30+", label: "Anos de experiência" },
  ],
} as const;

export function getMapsUrl() {
  if (site.location.mapsUrl) return site.location.mapsUrl;
  const q = encodeURIComponent(
    `${site.name}, ${site.location.region}, ${site.location.city}, ${site.location.state}`,
  );
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/** Retorna link do WhatsApp ou null se o número não estiver configurado. */
export function getWhatsappUrl(message?: string): string | null {
  const n = site.contact.whatsapp;
  if (!n || !/^\d{10,15}$/.test(n)) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${n}${text}`;
}

export const nav = [
  { label: "Início", href: "/#inicio" },
  { label: "O restaurante", href: "/#historia" },
  { label: "Cardápio", href: "/cardapio" },
  { label: "Localização", href: "/#localizacao" },
] as const;
