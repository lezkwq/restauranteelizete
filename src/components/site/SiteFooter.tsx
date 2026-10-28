import { nav, site, getMapsUrl } from "@/data/site";

export function SiteFooter() {
  const { contact, location } = site;
  return (
    <footer className="bg-ocean text-on-ocean">
      <div className="container-editorial grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-16">
        <div>
          <p className="font-display text-4xl">{site.name}</p>
          <p className="mt-3 max-w-xs text-sm text-on-ocean-muted">
            Frutos do mar e tradição há mais de 30 anos na {location.region}.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-on-ocean-muted">Navegação</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}><a href={n.href} className="hover:underline underline-offset-4">{n.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold text-on-ocean-muted">Localização</p>
          <address className="mt-4 text-sm not-italic leading-relaxed">
            {location.street && <>{location.street}<br /></>}
            {location.region}<br />
            {location.city}, {location.state}<br />
            CEP {location.postalCode}
          </address>
          <a href={getMapsUrl()} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm underline underline-offset-4">
            Abrir no Google Maps
          </a>
        </div>
        <div>
          <p className="text-xs font-semibold text-on-ocean-muted">Contato</p>
          <ul className="mt-4 space-y-2 text-sm">
            {contact.instagram ? (
              <li><a href={contact.instagram} target="_blank" rel="noreferrer" className="hover:underline underline-offset-4">Instagram</a></li>
            ) : (
              <li className="text-on-ocean-muted">Instagram em breve</li>
            )}
            {contact.phone && <li><a href={contact.phoneHref}>{contact.phone}</a></li>}
            {contact.email && <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>}
            {!contact.phone && !contact.email && <li className="text-on-ocean-muted">Contatos a confirmar</li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-ocean-line">
        <div className="container-editorial flex flex-col gap-2 py-5 text-xs text-on-ocean-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Todos os direitos reservados.</p>
          <p>{location.city}, {location.state}</p>
        </div>
      </div>
    </footer>
  );
}
