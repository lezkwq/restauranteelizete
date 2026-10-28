import { describe, expect, it } from "vitest";
import { site, getMapsUrl, getWhatsappUrl } from "@/data/site";
import { menu, categories, formatPrice, whatsappMessageFor } from "@/data/menu";

describe("Confirmed restaurant data", () => {
  it("does not expose old menu prices", () => {
    expect(menu.length).toBeGreaterThan(0);
    expect(menu.every((item) => item.price === null)).toBe(true);
    expect(formatPrice(null)).toBeNull();
  });
  it("uses the confirmed WhatsApp number, separate from the public telephone", () => {
    expect(site.contact.phoneHref).toBe("tel:+554733689946");
    expect(site.contact.whatsapp).toBe("554796993755");
    expect(getWhatsappUrl("Olá")).toBe("https://wa.me/554796993755?text=Ol%C3%A1");
  });
  it("retains the confirmed address and Maps location", () => {
    expect(site.location.street).toBe("Av. Rodesindo Pavan, 10205");
    expect(site.location.postalCode).toBe("88334-540");
    expect(getMapsUrl()).toBe("https://www.google.com/maps/search/?api=1&query=Restaurante+Elizete+Av+Rodesindo+Pavan+10205+Balneario+Camboriu+SC");
  });
  it("retains the confirmed Instagram", () => {
    expect(site.contact.instagram).toBe("https://www.instagram.com/restauranteelizete/");
  });
  it("uses the opening hours from the supplied restaurant post", () => {
    expect(site.hours).toEqual([{ days: "Todos os dias", hours: "11h às 18h" }]);
  });
  it("retains the Google reputation and tradition figures", () => {
    expect(site.reputation.map((r) => r.value)).toEqual(["4,8", "500+", "30+"]);
  });
  it("supports all requested menu groups without duplicate products", () => {
    expect(categories.map((c) => c.id)).toEqual(["petiscos", "files", "camaroes", "peixes", "moquecas", "massas", "carnes", "bebidas", "kids", "pet"]);
    expect(new Set(menu.map((i) => i.id)).size).toBe(menu.length);
    expect(menu.find((i) => i.id === "salmao")?.options?.length).toBe(10);
  });
  it("prepares an individual availability and value inquiry", () => {
    const item = menu.find((i) => i.id === "camarao-elizete");
    expect(item).toBeDefined();
    if (!item) throw new Error("Missing confirmed dish");
    expect(whatsappMessageFor(item)).toBe("Olá! Estava olhando o cardápio do Restaurante Elizete e gostaria de pedir o Camarão Elizete. Poderiam me confirmar a disponibilidade e o valor?");
  });
});
