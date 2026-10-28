/**
 * Configuração central do site. Preencha os campos com null quando
 * confirmados. Componentes ocultam ou desabilitam ações sem dados válidos.
 */
export const site = {
  name: "Restaurante Elizete",
  shortName: "Elizete",
  location: {
    region: "Praia do Estaleiro",
    city: "Balneário Camboriú",
    state: "Santa Catarina",
    /** Endereço completo confirmado. Ex.: "Rua ..., 123" */
    street: null as string | null,
    /** Link do Google Maps. Se null, usa busca pelo nome do restaurante. */
    mapsUrl: null as string | null,
  },
  /** Horários confirmados. Ex.: [{ days: "Terça a domingo", hours: "11h às 16h" }] */
  hours: [] as { days: string; hours: string }[],
  contact: {
    /** Somente dígitos com DDI. Ex.: "5547999999999". null desativa o WhatsApp. */
    whatsapp: null as string | null,
    phone: null as string | null,
    email: null as string | null,
    instagram: null as string | null,
  },
  /** Indicadores de reputação. Atualize conforme o Google. */
  reputation: [
    { value: "4,8", label: "Nota no Google" },
    { value: "500+", label: "Avaliações de clientes" },
    { value: "30+", label: "Anos de tradição" },
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
