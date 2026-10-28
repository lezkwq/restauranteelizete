import { createFileRoute, Link } from "@tanstack/react-router";
import heroDesktop from "@/assets/elizete-hero-desktop.png.asset.json";
import heroMobile from "@/assets/elizete-hero-mobile.png.asset.json";
import { MarineMark } from "@/components/site/MarineMark";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { btnClass } from "@/components/site/Buttons";
import { WhatsappButton } from "@/components/site/WhatsappButton";
import { media } from "@/data/media";
import { site, getMapsUrl } from "@/data/site";
import { featuredItems, categoryLabel, formatPrice } from "@/data/menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Restaurante Elizete | Frutos do mar na Praia do Estaleiro" },
      { name: "description", content: "Há mais de 30 anos servindo frutos do mar com vista para o oceano na Praia do Estaleiro, Balneário Camboriú." },
      { property: "og:title", content: "Restaurante Elizete | O mar à mesa" },
      { property: "og:description", content: "Tradição, frutos do mar e bons momentos na Praia do Estaleiro, Balneário Camboriú." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = featuredItems();
  return (
    <>
      <Hero />
      <Reputation />
      <Gastronomia />
      <Experiencia />
      <Historia />
      <PreviaCardapio items={featured.slice(0, 3)} />
      <Localizacao />
    </>
  );
}

function Hero() {
  return (
    <section id="inicio" className="hero-scene relative isolate scroll-mt-20 overflow-hidden text-on-ocean">
      <picture className="absolute inset-0 -z-20">
        <source media="(max-width: 767px)" srcSet={heroMobile.url} />
        <img src={heroDesktop.url} alt="Peixes, camarões, lagosta e frutos do mar sobre gelo" fetchPriority="high" className="h-full w-full object-cover" />
      </picture>
      <div className="hero-shade absolute inset-0 -z-10" />
      <div className="container-editorial flex h-full flex-col justify-end pt-28 pb-14 md:pb-20">
        <p className="eyebrow animate-rise text-on-ocean/80">Restaurante Elizete</p>
        <h1 className="hero-title animate-rise mt-6 [animation-delay:80ms]">O mar <em>à mesa.</em></h1>
        <p className="animate-rise mt-7 max-w-md text-lg leading-relaxed text-on-ocean/90 [animation-delay:160ms]">Mais de 30 anos de tradição, frutos do mar e bons momentos na Praia do Estaleiro.</p>
        <div className="animate-rise mt-8 flex flex-wrap gap-3 [animation-delay:240ms]">
          <Link to="/cardapio" className={btnClass({ variant: "light" })}>Ver cardápio</Link>
          <a href={getMapsUrl()} target="_blank" rel="noreferrer" className={btnClass({ variant: "ghostLight" })}>Como chegar</a>
        </div>
      </div>
    </section>
  );
}

function Reputation() {
  return (
    <section aria-label="Reputação" className="border-y border-border">
      <dl className="container-editorial grid grid-cols-3 divide-x divide-border">
        {site.reputation.map((r) => (
          <div key={r.label} className="px-2 py-8 text-center sm:px-6 md:py-10">
            <dt className="sr-only">{r.label}</dt>
            <dd className="font-display text-4xl leading-none text-primary md:text-5xl">{r.value}</dd>
            <dd className="mt-3 text-xs font-medium text-muted-foreground sm:text-sm">{r.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Gastronomia() {
  const items = featuredItems();
  const slots = [media.pratoDestaque01, media.pratoDestaque02, media.pratoDestaque03, media.pratoDestaque04] as const;
  const Caption = ({ i }: { i: number }) => {
    const it = items[i];
    if (!it) return null;
    return (
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-primary">{categoryLabel(it.category)}</p>
          <h3 className="mt-1 text-2xl leading-tight text-ocean md:text-3xl">{it.name}</h3>
        </div>
        <Link to="/cardapio" hash={it.category} className="shrink-0 text-sm font-semibold text-primary hover:underline underline-offset-4">Ver no cardápio</Link>
      </div>
    );
  };
  return (
    <section className="container-editorial relative py-20 md:py-32">
      <MarineMark className="mb-8 w-28 text-primary/30" />
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <h2 className="display-lg text-ocean md:col-span-7">Sabores que contam <em className="text-primary">nossa história.</em></h2>
        <p className="max-w-sm text-muted-foreground md:col-span-4 md:col-start-9">
          Uma cozinha dedicada aos frutos do mar, com receitas que acompanham o restaurante há mais de três décadas.
        </p>
      </div>
      <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5 md:row-span-2">
          <ImagePlaceholder slot={slots[0]} ratio="3/4" />
          <Caption i={0} />
        </div>
        <div className="md:col-span-7">
          <ImagePlaceholder slot={slots[1]} ratio="16/10" />
          <Caption i={1} />
        </div>
        <div className="md:col-span-3 md:mt-10">
          <ImagePlaceholder slot={slots[2]} ratio="1/1" />
          <Caption i={2} />
        </div>
        <div className="md:col-span-4 md:mt-24">
          <ImagePlaceholder slot={slots[3]} ratio="4/5" />
          <Caption i={3} />
        </div>
      </div>
    </section>
  );
}

function Experiencia() {
  return (
    <section className="bg-ocean text-on-ocean">
      <div className="container-editorial py-20 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <p className="eyebrow text-on-ocean-muted md:col-span-12">À beira-mar</p>
          <h2 className="display-lg md:col-span-8">Uma experiência com <em>vista para o mar.</em></h2>
          <p className="max-w-sm self-end text-lg leading-relaxed text-on-ocean-muted md:col-span-4">
            Na Praia do Estaleiro, a tradição da nossa cozinha encontra a beleza do litoral.
          </p>
        </div>
        <ImagePlaceholder slot={media.experienciaMar} tone="ocean" className="mt-14 aspect-[4/3] md:aspect-[21/9]" />
        <div className="mt-6 grid gap-6 border-t border-ocean-line pt-6 text-sm text-on-ocean-muted sm:grid-cols-3">
          <p>{site.location.region}</p>
          <p>{site.location.city}, {site.location.state}</p>
          <a href="#localizacao" className="text-on-ocean underline-offset-4 hover:underline sm:text-right">Como chegar</a>
        </div>
      </div>
    </section>
  );
}

function Historia() {
  return (
    <section id="historia" className="scroll-mt-20">
      <div className="container-editorial grid gap-12 py-20 md:grid-cols-12 md:py-32">
        <div className="md:col-span-5">
          <ImagePlaceholder slot={media.historiaRestaurante} ratio="4/5" />
        </div>
        <div className="flex flex-col justify-center md:col-span-6 md:col-start-7">
          <p className="eyebrow text-primary">Nossa história</p>
          <h2 className="display-md mt-6 text-ocean">Uma história feita de <em className="text-primary">sabores e encontros.</em></h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              Há mais de 30 anos, o Restaurante Elizete recebe moradores e visitantes na Praia do Estaleiro,
              em Balneário Camboriú.
            </p>
            <p>
              Uma cozinha de frutos do mar, um salão de frente para o oceano e a hospitalidade de quem
              gosta de ver a mesa cheia.
            </p>
          </div>
          <div className="mt-10 flex items-center gap-6 border-t border-border pt-6">
            <span className="font-display text-6xl leading-none text-primary">30+</span>
            <span className="text-sm text-muted-foreground">anos de tradição<br />à beira-mar</span>
          </div>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <ImagePlaceholder slot={media.ambienteRestaurante} ratio="16/9" />
        </div>
      </div>
    </section>
  );
}

function PreviaCardapio({ items }: { items: ReturnType<typeof featuredItems> }) {
  return (
    <section className="bg-ice">
      <div className="container-editorial py-20 md:py-28">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6">
          <div className="min-w-0">
            <p className="eyebrow text-primary">Cardápio</p>
            <h2 className="display-md mt-5 text-ocean">Escolha seu próximo prato.</h2>
          </div>
          <Link to="/cardapio" className={btnClass({ className: "hidden md:inline-flex" })}>Explorar o cardápio completo</Link>
        </div>
        <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {items.map((it, i) => (
            <li key={it.id} className={i === 1 ? "md:mt-16" : undefined}>
              <Link to="/cardapio" hash={it.category} className="group block">
                <ImagePlaceholder
                  slot={{ id: `prato-${it.id}`, label: it.name, alt: `Fotografia do prato ${it.name}`, src: it.image }}
                  ratio="4/5"
                  className="bg-background"
                />
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h3 className="min-w-0 text-2xl text-ocean group-hover:text-primary">{it.name}</h3>
                  {it.price != null && <span className="shrink-0 text-sm font-semibold">{formatPrice(it.price)}</span>}
                </div>
                {it.description && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.description}</p>}
              </Link>
            </li>
          ))}
        </ol>
        <Link to="/cardapio" className={btnClass({ className: "mt-12 w-full md:hidden" })}>Explorar o cardápio completo</Link>
      </div>
    </section>
  );
}

function Localizacao() {
  const { location, hours, contact } = site;
  return (
    <section id="localizacao" className="scroll-mt-20">
      <div className="container-editorial grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <p className="eyebrow text-primary">Localização e contato</p>
          <h2 className="display-md mt-5 text-ocean">Venha nos visitar.</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={getMapsUrl()} target="_blank" rel="noreferrer" className={btnClass({})}>Abrir no Google Maps</a>
            <WhatsappButton variant="outline" label="Falar pelo WhatsApp" message={`Olá! Gostaria de mais informações sobre o ${site.name}.`} />
          </div>
        </div>
        <dl className="grid gap-8 sm:grid-cols-2 md:col-span-7">
          <InfoBlock title="Endereço">
            <p className="text-ocean">{site.name}</p>
            {location.street && <p>{location.street}</p>}
            <p>{location.region}</p>
            <p>{location.city}, {location.state}</p>
            <p>CEP {location.postalCode}</p>
          </InfoBlock>
          {hours.length > 0 && <InfoBlock title="Horário">
            {hours.map((h) => <p key={h.days}>{h.days}: {h.hours}</p>)}
          </InfoBlock>}
          <InfoBlock title="Contato">
            {contact.phone && <p><a href={contact.phoneHref}>{contact.phone}</a></p>}
            {contact.email && <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>}
            <p><a href={contact.instagram} target="_blank" rel="noreferrer">Instagram</a></p>
          </InfoBlock>
        </dl>
      </div>
    </section>
  );
}

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-primary pt-5">
      <dt className="text-xs font-semibold text-primary">{title}</dt>
      <dd className="mt-3 space-y-1 text-[0.95rem] leading-relaxed text-muted-foreground">{children}</dd>
    </div>
  );
}
