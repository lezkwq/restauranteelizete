/**
 * Cardápio. Os itens abaixo são PLACEHOLDERS DE DESENVOLVIMENTO.
 * Substitua por pratos reais. `price: null` exibe "Preço a confirmar".
 */
export type MenuCategoryId = "petiscos" | "camaroes" | "peixes" | "especialidades" | "bebidas";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  /** Preço em reais. null quando não confirmado. */
  price: number | null;
  category: MenuCategoryId;
  /** Caminho/URL da foto. null mostra o espaço reservado. */
  image: string | null;
  featured: boolean;
  available: boolean;
};

export const categories: { id: MenuCategoryId; label: string; note: string }[] = [
  { id: "petiscos", label: "Petiscos", note: "Para começar e compartilhar." },
  { id: "camaroes", label: "Camarões", note: "Preparos variados do clássico do litoral." },
  { id: "peixes", label: "Peixes", note: "Do mar para a mesa." },
  { id: "especialidades", label: "Especialidades", note: "As receitas da casa." },
  { id: "bebidas", label: "Bebidas", note: "Para acompanhar." },
];

const ph = (category: MenuCategoryId, n: number, featured = false): MenuItem => ({
  id: `${category}-${String(n).padStart(2, "0")}`,
  name: `Placeholder ${categories.find((c) => c.id === category)!.label} ${String(n).padStart(2, "0")}`,
  description: "Descrição do prato a ser preenchida com o cardápio real do restaurante.",
  price: null,
  category,
  image: null,
  featured,
  available: true,
});

export const menu: MenuItem[] = [
  ph("petiscos", 1, true),
  ph("petiscos", 2),
  ph("petiscos", 3),
  ph("camaroes", 1, true),
  ph("camaroes", 2),
  ph("camaroes", 3),
  ph("peixes", 1, true),
  ph("peixes", 2),
  ph("especialidades", 1, true),
  ph("especialidades", 2),
  ph("bebidas", 1),
  ph("bebidas", 2),
];

export const formatPrice = (price: number | null) =>
  price === null
    ? "Preço a confirmar"
    : price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const whatsappMessageFor = (item: MenuItem) =>
  item.price === null
    ? `Olá! Vi o prato ${item.name} no cardápio do Restaurante Elizete e gostaria de saber se está disponível.`
    : `Olá! Vi o prato ${item.name} no cardápio do Restaurante Elizete por ${formatPrice(item.price)} e gostaria de saber se está disponível.`;

export const featuredItems = () => menu.filter((i) => i.featured && i.available);
export const categoryLabel = (id: MenuCategoryId) => categories.find((c) => c.id === id)?.label ?? id;
