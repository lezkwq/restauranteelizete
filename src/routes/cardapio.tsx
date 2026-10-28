import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { DishCard } from "@/components/site/DishCard";
import { media } from "@/data/media";
import { categories, menu, type MenuCategoryId } from "@/data/menu";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cardapio")({
  head: () => ({
    meta: [
      { title: "Cardápio | Restaurante Elizete" },
      { name: "description", content: "Petiscos, camarões, peixes e especialidades do Restaurante Elizete, na Praia do Estaleiro." },
      { property: "og:title", content: "Nosso cardápio | Restaurante Elizete" },
      { property: "og:description", content: "Explore os sabores do Restaurante Elizete." },
    ],
  }),
  component: Cardapio,
});

function Cardapio() {
  const [active, setActive] = useState<MenuCategoryId>(categories[0].id);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (vis) setActive(vis.target.id as MenuCategoryId);
      },
      { rootMargin: "-160px 0px -55% 0px" },
    );
    categories.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const btn = tabsRef.current?.querySelector<HTMLElement>(`[data-cat="${active}"]`);
    btn?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);

  return (
    <>
      <section className="container-editorial grid gap-8 pt-10 pb-12 md:grid-cols-12 md:items-end md:pt-16">
        <div className="md:col-span-5">
          <p className="eyebrow text-primary">Cardápio</p>
          <h1 className="display-lg mt-5 text-ocean">Nosso <em className="text-primary">cardápio</em></h1>
          <p className="mt-5 max-w-sm text-lg text-muted-foreground">Explore os sabores do Restaurante Elizete.</p>
        </div>
        <ImagePlaceholder slot={media.cardapioCapa} tone="royal" className="aspect-[16/9] md:col-span-7 md:aspect-[21/9]" priority />
      </section>

      <nav aria-label="Categorias do cardápio" className="sticky top-18 z-40 border-y border-border bg-background/95 backdrop-blur md:top-20">
        <div ref={tabsRef} className="container-editorial no-scrollbar flex gap-2 overflow-x-auto py-3 md:justify-center">
          {categories.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              data-cat={c.id}
              aria-current={active === c.id ? "true" : undefined}
              onClick={() => setActive(c.id)}
              className={cn(
                "shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                active === c.id ? "bg-primary text-primary-foreground" : "text-graphite hover:bg-ice",
              )}
            >
              {c.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="container-editorial pb-24">
        {categories.map((c, ci) => {
          const items = menu.filter((m) => m.category === c.id);
          const [lead, ...rest] = items;
          return (
            <section key={c.id} id={c.id} className="scroll-mt-40 border-b border-border py-16 last:border-b-0 md:py-20">
              <header className="mb-10 grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-5">
                <span className="font-display text-2xl text-primary">{String(ci + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <h2 className="display-md text-ocean">{c.label}</h2>
                  <p className="mt-2 text-muted-foreground">{c.note}</p>
                </div>
              </header>
              {items.length === 0 ? (
                <p className="text-muted-foreground">Itens desta categoria serão adicionados em breve.</p>
              ) : (
                <div className="space-y-14">
                  {lead && <DishCard item={lead} size={lead.featured ? "large" : "default"} />}
                  {rest.length > 0 && (
                    <div className="grid gap-14 md:grid-cols-2 md:gap-x-10">
                      {rest.map((it) => <DishCard key={it.id} item={it} />)}
                    </div>
                  )}
                </div>
              )}
            </section>
          );
        })}
        <p className="mt-6 text-sm text-muted-foreground">
          Itens identificados como placeholder são demonstrativos e serão substituídos pelo cardápio oficial.
        </p>
      </div>
    </>
  );
}
