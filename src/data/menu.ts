/** Produtos transcritos do material fornecido. Valores antigos não são preços atuais. */
export type MenuCategoryId = "petiscos" | "files" | "camaroes" | "peixes" | "moquecas" | "massas" | "carnes" | "bebidas" | "kids" | "pet";
export type MenuOption = { name: string; description?: string; price?: number | null };
export type MenuItem = {
  id: string; name: string; description: string; price: number | null;
  category: MenuCategoryId; image: string | null; featured: boolean; available: boolean;
  accompaniments?: string[]; options?: MenuOption[]; additions?: MenuOption[];
};
export const categories: { id: MenuCategoryId; label: string; note: string }[] = [
  { id: "petiscos", label: "Petiscos", note: "" },
  { id: "files", label: "Filés", note: "Salmão, congro e linguado" },
  { id: "camaroes", label: "Camarões", note: "" },
  { id: "peixes", label: "Peixes e frutos do mar", note: "" },
  { id: "moquecas", label: "Moquecas e caldeiradas", note: "" },
  { id: "massas", label: "Massas", note: "" },
  { id: "carnes", label: "Carnes e aves", note: "" },
  { id: "bebidas", label: "Bebidas", note: "" },
  { id: "kids", label: "Menu kids", note: "" },
  { id: "pet", label: "Pratos pet", note: "" },
];
const dish = (category: MenuCategoryId, id: string, name: string, extra: Partial<MenuItem> = {}): MenuItem => ({
  id, name, category, description: "", price: null, image: null, featured: false, available: true, ...extra,
});
const filletOptions: MenuOption[] = [
  "Grelhado", "À belle meunière", "À fiorentina", "À portuguesa", "Joana do mar",
  "Grelhado ao molho de camarão", "Baden Baden", "À tropical", "À provençal", "À Elizete",
].map((name) => ({ name }));
const filletSides = ["Arroz de castanha e banana", "Arroz branco", "Pirão de peixe", "Seleção de legumes", "Banana assada"];
const filletAdditions: MenuOption[] = ["Farofa de banana", "Farofa de camarão seco do sol", "Arroz de camarão com curry", "Arroz à provençal"].map((name) => ({ name }));
export const menu: MenuItem[] = [
  dish("petiscos", "bolinho-camarao", "Bolinho de camarão", { featured: true }),
  ...[
    ["camarao-soltinho", "Camarão soltinho à milanesa"], ["camarao-soltinho-medio", "Camarão soltinho médio Elizete ou grelhado"],
    ["salada-mista", "Salada mista"], ["pastel-camarao", "Pastel de camarão"], ["casquinha-siri", "Casquinha de siri"],
    ["coquiles-ostra", "Coquiles de ostra"], ["coquiles-lagosta", "Coquiles de lagosta"], ["ostra-gratinada", "Ostra gratinada ao bafo ou in natura"],
    ["bolinho-siri", "Bolinho de siri"], ["bolinho-lagosta", "Bolinho de lagosta"], ["coquiles-camarao", "Coquiles de camarão"],
    ["lula-grelhada", "Lula grelhada"], ["lula-milanesa", "Lula à milanesa"],
    ["bolinho-batata", "Porção de bolinho de batata doce com bacon",], ["batatas-fritas", "Batatas fritas"],
    ["sopa-frutos-mar", "Sopa de frutos do mar na caneca"], ["salada-palmito", "Salada de palmito"],
    ["isca-peixe", "Isca de peixe à milanesa"], ["peixe-frito", "Peixe frito"],
    ["maionese-lagosta", "Maionese de lagosta"], ["maionese-camarao", "Maionese de camarão"],
  ].map(([id, name]) => dish("petiscos", id ?? "", name ?? "")),
  ...["Salmão", "Congro", "Linguado"].map((name) => dish("files", name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(), name, {
    options: filletOptions, accompaniments: filletSides, additions: filletAdditions,
  })),
  dish("camaroes", "camarao-elizete", "Camarão Elizete", { featured: true, description: "Empanado com queijo parmesão." }),
  dish("camaroes", "camarao-milanesa", "Camarão à milanesa", { featured: true }),
  ...[
    ["camarao-grelhado", "Camarão grelhado"], ["strogonoff-camarao", "Strogonoff de camarão"],
    ["camarao-punta", "Camarão à Punta del Este"], ["camarao-parmegiana", "Camarão à parmegiana"],
    ["camarao-grega", "Camarão à grega"], ["camarao-baiana", "Camarão à baiana"], ["camarao-tropical", "Camarão tropical"],
  ].map(([id, name]) => dish("camaroes", id ?? "", name ?? "")),
  dish("peixes", "misto-interpraias", "Misto à milanesa Interpraias"),
  dish("peixes", "misto-estaleirinho", "Misto grelhado Estaleirinho"),
  dish("peixes", "file-milanesa", "Filé de peixe à milanesa", { featured: true }),
  dish("peixes", "file-bechamel", "Filé de peixe e bechamel gratinado"),
  dish("peixes", "anchova", "Anchova grelhada"),
  dish("peixes", "pulpo-gallega", "Pulpo à la gallega"),
  dish("peixes", "polvo-casa", "Polvo da casa"),
  dish("peixes", "polvo-marterra", "Polvo Mar&Terra"),
  dish("peixes", "lagosta-tropical", "Lagosta tropical"),
  dish("peixes", "lagosta-grelhada", "Lagosta grelhada"),
  dish("peixes", "lagosta-termidor", "Lagosta à termidor"),
  dish("peixes", "lagosta-parmegiana", "Lagosta à parmegiana"),
  dish("moquecas", "moqueca-peixe", "Moqueca de peixe"),
  dish("moquecas", "caldeirada-frutos-mar", "Caldeirada de frutos do mar"),
  dish("massas", "massa-frutos-mar", "Massa de frutos do mar"),
];
/** Only populated groups are public; remaining groups are ready for confirmed products. */
export const visibleCategories = categories.filter((c) => menu.some((m) => m.category === c.id));
export const formatPrice = (price: number | null | undefined) => price == null ? null : price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const whatsappMessageFor = (item: MenuItem) => `Olá! Estava olhando o cardápio do Restaurante Elizete e gostaria de pedir o ${item.name}. Poderiam me confirmar a disponibilidade e o valor?`;
export const featuredItems = () => menu.filter((i) => i.featured && i.available);
export const categoryLabel = (id: MenuCategoryId) => categories.find((c) => c.id === id)?.label ?? id;
