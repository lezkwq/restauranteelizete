import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-elizete.png.asset.json";
import { nav, site } from "@/data/site";
import { btnClass } from "./Buttons";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-background/95 backdrop-blur transition-[border-color] duration-300",
        scrolled ? "border-b border-border" : "border-b border-transparent",
      )}
    >
      <div className="container-editorial grid h-18 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:h-20 lg:grid-cols-[auto_1fr_auto]">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo.url} alt={site.name} className="h-11 w-11 shrink-0 rounded-sm md:h-12 md:w-12" />
          <span className="truncate font-display text-2xl leading-none text-ocean">Elizete</span>
        </Link>

        <nav aria-label="Principal" className="hidden justify-center gap-10 lg:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-graphite transition-colors hover:text-primary">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/cardapio" className={btnClass({ size: "sm", className: "hidden sm:inline-flex" })}>
            Ver cardápio
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-ocean hover:bg-ice lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        className={cn(
          "fixed inset-x-0 top-18 bottom-0 bg-background transition-[opacity,transform] duration-300 md:top-20 lg:hidden",
          open ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <nav aria-label="Menu mobile" className="container-editorial flex flex-col pt-8">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="border-b border-border py-5 font-display text-4xl text-ocean"
            >
              {n.label}
            </a>
          ))}
          <Link to="/cardapio" onClick={() => setOpen(false)} className={btnClass({ className: "mt-10" })}>
            Ver cardápio
          </Link>
        </nav>
      </div>
    </header>
  );
}
