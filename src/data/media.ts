/**
 * Mapa de fotografias. Para inserir uma foto real, preencha `src`
 * (ex.: importando de "@/assets/...") e revise o `alt`.
 */
export type MediaSlot = {
  id: string;
  label: string;
  alt: string;
  src: string | null;
};

const slot = (id: string, label: string, alt: string): MediaSlot => ({ id, label, alt, src: null });

export const media = {
  heroOceano: slot("hero-oceano", "Vista do mar a partir do restaurante", "Vista do mar na Praia do Estaleiro a partir do Restaurante Elizete"),
  pratoDestaque01: slot("prato-destaque-01", "Prato em destaque 01", "Prato de frutos do mar do Restaurante Elizete"),
  pratoDestaque02: slot("prato-destaque-02", "Prato em destaque 02", "Prato de frutos do mar do Restaurante Elizete"),
  pratoDestaque03: slot("prato-destaque-03", "Prato em destaque 03", "Prato de frutos do mar do Restaurante Elizete"),
  pratoDestaque04: slot("prato-destaque-04", "Prato em destaque 04", "Prato de frutos do mar do Restaurante Elizete"),
  experienciaMar: slot("experiencia-mar", "Panorâmica do litoral", "Panorâmica da Praia do Estaleiro em Balneário Camboriú"),
  ambienteRestaurante: slot("ambiente-restaurante", "Ambiente do salão", "Salão do Restaurante Elizete"),
  historiaRestaurante: slot("historia-restaurante", "Restaurante ou equipe", "Equipe e fachada do Restaurante Elizete"),
  cardapioCapa: slot("cardapio-capa", "Fotografia gastronômica horizontal", "Mesa servida com pratos do Restaurante Elizete"),
} satisfies Record<string, MediaSlot>;
