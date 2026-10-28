import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-elizete.png.asset.json";
import { nav, site } from "@/data/site";
import { btnClass } from "./Buttons";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const immersive = pathname === "/" && !scrolled && !open;
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKey); };
  }, [open]);
  return <header className={cn("sticky top-0 z-50 border-b transition-colors duration-300", pathname === "/" && "-mb-18 md:-mb-20", immersive ? "border-on-ocean/15 bg-transparent text-on-ocean" : "border-border bg-background/95 text-ocean backdrop-blur")}>
    <div className="container-editorial grid h-18 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:h-20 lg:grid-cols-[auto_1fr_auto]">
      <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
        <img src={logo.url} alt={site.name} className="h-11 w-11 shrink-0 rounded-full md:h-12 md:w-12" />
        <span className="font-display text-3xl leading-none">Elizete<span className="mt-1 block font-sans text-[0.65rem] font-semibold">RESTAURANTE</span></span>
      </Link>
      <nav aria-label="Principal" className="hidden justify-center gap-10 lg:flex">{nav.map((n) => <a key={n.href} href={n.href} className="text-sm font-medium transition-opacity hover:opacity-70">{n.label}</a>)}</nav>
      <div className="flex items-center gap-2">
        <Link to="/cardapio" className={btnClass({ size: "sm", variant: immersive ? "ghostLight" : "primary", className: "hidden sm:inline-flex" })}>Ver cardápio</Link>
        <button type="button" className={btnClass({ variant: "link", className: "h-11 w-11 min-h-11 text-inherit lg:hidden" })} aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen((v) => !v)}>{open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
      </div>
    </div>
    {open && <div id="menu-mobile" className="fixed inset-x-0 top-18 bottom-0 overflow-y-auto bg-background text-ocean md:top-20 lg:hidden">
      <nav aria-label="Menu mobile" className="container-editorial flex flex-col pt-8">{nav.map((n) => <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-border py-5 font-display text-4xl">{n.label}</a>)}<Link to="/cardapio" onClick={() => setOpen(false)} className={btnClass({ className: "mt-10" })}>Ver cardápio</Link></nav>
    </div>}
  </header>;
}
