import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { DishCard } from "@/components/site/DishCard";
import { menu, whatsappMessageFor } from "@/data/menu";
import { getWhatsappUrl, site } from "@/data/site";

// Synthetic, non-routable fixture: never configured in the app or contacted.
const testNumber = "5500000000000";
const originalNumber = Object.getOwnPropertyDescriptor(site.contact, "whatsapp")!;
const configureNumber = (value: string | null) => Object.defineProperty(site.contact, "whatsapp", { ...originalNumber, value });
const item = menu.find((dish) => dish.id === "camarao-elizete")!;

afterEach(() => {
  cleanup();
  Object.defineProperty(site.contact, "whatsapp", originalNumber);
});

describe("Menu WhatsApp ordering", () => {
  it("keeps every product accessible but inactive without a confirmed number", () => {
    configureNumber(null);
    render(<>{menu.map((dish) => <DishCard key={dish.id} item={dish} />)}</>);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(menu.length);
    for (const link of links) {
      expect(link).toHaveAttribute("aria-disabled", "true");
      expect(link).not.toHaveAttribute("href");
      expect(link).toHaveAttribute("tabindex", "0");
      expect(link).toHaveAccessibleDescription(/até a confirmação do número/);
    }
    expect(getWhatsappUrl(whatsappMessageFor(item))).toBeNull();
  });

  it("builds a correctly encoded link for every registered product using its exact name", () => {
    configureNumber(testNumber);
    render(<>{menu.map((dish) => <DishCard key={dish.id} item={dish} />)}</>);
    for (const dish of menu) {
      const expected = `Olá! Estava olhando o cardápio do Restaurante Elizete e gostaria de pedir o ${dish.name}. Poderiam me confirmar a disponibilidade e o valor?`;
      const link = screen.getByRole("link", { name: `Pedir ${dish.name} pelo WhatsApp` });
      expect(link).toHaveAttribute("href", `https://wa.me/${testNumber}?text=${encodeURIComponent(expected)}`);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).not.toHaveAttribute("aria-disabled");
      expect(new URL(link.getAttribute("href")!).searchParams.get("text")).toBe(expected);
    }
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("includes only the principal name, even with prices, preparations and additions", () => {
    const salmon = menu.find((dish) => dish.id === "salmao")!;
    const message = whatsappMessageFor({ ...salmon, price: 987.65 });
    expect(message).toBe("Olá! Estava olhando o cardápio do Restaurante Elizete e gostaria de pedir o Salmão. Poderiam me confirmar a disponibilidade e o valor?");
    expect(message).not.toMatch(/987|R\$|Grelhado|Farofa|Arroz/);
  });

  it("rejects incomplete or malformed phone configuration", () => {
    for (const number of [null, "", "123", "+55 (00) 0000-0000", "not-a-number"]) {
      configureNumber(number);
      expect(getWhatsappUrl(whatsappMessageFor(item))).toBeNull();
    }
  });

  it("does not link unavailable dishes even with a configured number", () => {
    configureNumber(testNumber);
    render(<DishCard item={{ ...item, available: false }} />);
    const link = screen.getByRole("link", { name: `Pedir ${item.name} pelo WhatsApp` });
    expect(link).not.toHaveAttribute("href");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAccessibleDescription("Este prato está indisponível para pedidos.");
  });
});
