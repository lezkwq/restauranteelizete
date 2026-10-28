/**
 * Fotografias fornecidas pelo restaurante, tratadas e servidas como PNG local.
 * As legendas descrevem a foto sem atribuir receitas não confirmadas.
 */
export type MediaSlot = {
  id: string;
  label: string;
  alt: string;
  src: string | null;
};

const slot = (id: string, label: string, alt: string, file: string): MediaSlot => ({
  id, label, alt, src: `/images/${file}.png`,
});

export const media = {
  pratoDestaque01: slot("prato-destaque-01", "Polvo e acompanhamentos", "Polvo servido com batatas e acompanhamentos na mesa do Elizete", "polvo-acompanhamentos"),
  pratoDestaque02: slot("prato-destaque-02", "Frutos do mar à mesa", "Travessa com camarões, lulas e molho da cozinha do Elizete", "frutos-do-mar"),
  pratoDestaque03: slot("prato-destaque-03", "Peixe à milanesa", "Peixe empanado com banana assada, batatas e arroz", "peixe-milanesa"),
  pratoDestaque04: slot("prato-destaque-04", "Nossa caipirinha da casa", "Caipirinha de maracujá com banana em frente ao mar", "caipirinha-casa"),
  experienciaMar: slot("experiencia-mar", "Uma mesa de frente para o mar", "Deck do Restaurante Elizete com mesas, ombrelones e vista para a Praia do Estaleiro", "deck-vista-mar"),
  ambienteRestaurante: slot("ambiente-restaurante", "Um tempo para ficar", "Lounge com poltronas e ombrelones de frente para o mar", "lounge-vista-mar"),
  historiaRestaurante: slot("historia-restaurante", "Pelas mãos da chef", "Chef Elizete segurando uma travessa gratinada preparada na casa", "chef-elizete"),
  fachada: slot("fachada", "Nossa casa", "Fachada do Chef Elizete Restaurante, com letreiro azul e palmeiras", "fachada-elizete"),
  praia: slot("praia", "Praia do Estaleiro", "Ondas nas pedras do litoral da Praia do Estaleiro", "praia-estaleiro"),
  cardapioCapa: slot("cardapio-capa", "Da nossa cozinha para a sua mesa", "Camarões e lulas preparados na cozinha do Restaurante Elizete", "frutos-do-mar"),
} satisfies Record<string, MediaSlot>;
