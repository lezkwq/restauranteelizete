import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { DishCard } from "@/components/site/DishCard";
import { MarineMark } from "@/components/site/MarineMark";
import { btnClass } from "@/components/site/Buttons";
import { visibleCategories, menu, type MenuCategoryId } from "@/data/menu";
import { cn } from "@/lib/utils";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { media } from "@/data/media";

export const Route = createFileRoute("/cardapio")({
  head: () => ({ meta: [
    { title: "Cardápio | Restaurante Elizete" },
    { name: "description", content: "Consulte petiscos, filés, camarões e frutos do mar do Restaurante Elizete, na Praia do Estaleiro." },
    { property: "og:title", content: "Nosso cardápio | Restaurante Elizete" },
    { property: "og:description", content: "Os sabores do Restaurante Elizete, dos petiscos aos preparos de frutos do mar." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Cardapio,
});
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
function Cardapio() {
  const [active, setActive] = useState<MenuCategoryId>("petiscos");
  const [search, setSearch] = useState("");
  const tabsRef = useRef<HTMLDivElement>(null);
  const shown = menu.filter((item) => normalize(`${item.name} ${item.description}`).includes(normalize(search)));
  const groups = visibleCategories.filter((c) => shown.some((item) => item.category === c.id));
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (vis) setActive(vis.target.id as MenuCategoryId);
    }, { rootMargin: "-160px 0px -55% 0px" });
    visibleCategories.forEach((c) => { const el = document.getElementById(c.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [search]);
  useEffect(() => {
    const container = tabsRef.current;
    const tab = container?.querySelector<HTMLElement>(`[data-cat="${active}"]`);
    if (!container || !tab) return;
    container.scrollTo({ left: tab.offsetLeft - container.offsetLeft - (container.clientWidth - tab.clientWidth) / 2, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, [active]);
  return <>
    <section className="container-editorial relative border-b border-border py-12 md:py-20">
      <p className="eyebrow text-primary">Restaurante Elizete</p>
      <h1 className="display-lg mt-5 text-ocean">Nosso <em className="text-primary">cardápio.</em></h1>
      <MarineMark className="absolute top-12 right-10 hidden w-44 text-primary/25 md:block" />
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">Feito na hora, do nosso jeito. Escolha entre os petiscos, peixes, camarões e outros preparos da casa.</p>
      <div className="mt-8 flex max-w-md items-center gap-3 border-b border-primary py-3">
        <Search className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <input type="search" aria-label="Buscar prato" placeholder="Buscar prato" value={search} onChange={(e) => setSearch(e.target.value)} className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground" />
        {search && <button aria-label="Limpar busca" className={btnClass({ variant: "link", className: "h-8 w-8" })} onClick={() => setSearch("")}><X className="h-4 w-4" /></button>}
      </div>
      <figure className="mt-10">
        <ImagePlaceholder slot={media.cardapioCapa} ratio="16/7" />
        <figcaption className="mt-3 text-sm text-muted-foreground">Um pouco do que sai da nossa cozinha. Os preparos e acompanhamentos variam conforme o prato escolhido.</figcaption>
      </figure>
    </section>
    <nav aria-label="Categorias do cardápio" className="sticky top-18 z-40 border-y border-border bg-background/95 backdrop-blur md:top-20">
      <div ref={tabsRef} className="container-editorial no-scrollbar flex gap-6 overflow-x-auto py-3">
        {groups.map((c) => <a key={c.id} href={`#${c.id}`} data-cat={c.id} aria-current={active === c.id ? "true" : undefined} onClick={() => setActive(c.id)} className={cn("shrink-0 border-b-2 py-3 text-sm font-semibold transition-colors", active === c.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-primary")}>{c.label}</a>)}
      </div>
    </nav>
    <div className="container-editorial pb-24">
      {groups.map((c) => <section key={c.id} id={c.id} className="scroll-mt-44 py-12 md:py-16">
        <header className="mb-8 flex items-baseline gap-5"><span className="font-display text-2xl text-primary">{String(visibleCategories.indexOf(c) + 1).padStart(2, "0")}</span><div><h2 className="display-md text-ocean">{c.label}</h2>{c.note && <p className="mt-2 text-muted-foreground">{c.note}</p>}</div></header>
        <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">{shown.filter((item) => item.category === c.id).map((item) => <DishCard key={item.id} item={item} />)}</div>
      </section>)}
      {!shown.length && <p role="status" className="py-16 text-lg text-muted-foreground">Nenhum prato encontrado.</p>}
    </div>
  </>;
}
