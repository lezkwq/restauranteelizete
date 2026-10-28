import { ImagePlaceholder } from "./ImagePlaceholder";
import { formatPrice, whatsappMessageFor, type MenuItem } from "@/data/menu";
import { getWhatsappUrl } from "@/data/site";
import { cn } from "@/lib/utils";

type Props = { item: MenuItem; size?: "default" | "large"; className?: string };
export function DishCard({ item, className }: Props) {
  const url = item.available ? getWhatsappUrl(whatsappMessageFor(item)) : null;
  const disabledReasonId = `pedido-${item.id}-indisponivel`;
  return (
    <article className={cn("relative min-w-0 border-t border-border pt-6", url ? "hover:border-primary/50" : "", className)}>
      {item.image && <ImagePlaceholder slot={{ id: `prato-${item.id}`, label: item.name, alt: item.name, src: item.image }} ratio="4/3" className="mb-5" />}
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="min-w-0 text-3xl leading-tight text-ocean">
          <a
            href={url ?? undefined}
            target={url ? "_blank" : undefined}
            rel={url ? "noopener noreferrer" : undefined}
            role={url ? undefined : "link"}
            tabIndex={0}
            aria-label={`Pedir ${item.name} pelo WhatsApp`}
            aria-disabled={url ? undefined : true}
            aria-describedby={url ? undefined : disabledReasonId}
            title={url ? `Pedir ${item.name} pelo WhatsApp` : item.available ? "WhatsApp ainda não configurado" : "Prato indisponível"}
            className={cn("outline-none after:absolute after:inset-0 after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-primary", url ? "cursor-pointer" : "cursor-not-allowed")}
          >{item.name}</a>
        </h3>
        {item.price != null && <span className="shrink-0 text-base font-semibold text-primary">{formatPrice(item.price)}</span>}
      </div>
      {item.description && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.description}</p>}
      {item.options?.length ? <details className="relative z-10 mt-4 text-sm">
        <summary className="cursor-pointer py-2 font-semibold text-primary">Modos de preparo</summary>
        <ul className="grid gap-3 pt-3 sm:grid-cols-2">{item.options.map((o) => <li key={o.name}>{o.name}{o.description && <p className="text-muted-foreground">{o.description}</p>}{o.price != null && <span className="ml-2 font-semibold">{formatPrice(o.price)}</span>}</li>)}</ul>
      </details> : null}
      {item.accompaniments?.length ? <p className="mt-4 text-sm leading-relaxed text-muted-foreground"><span className="font-semibold text-foreground">Acompanhamentos: </span>{item.accompaniments.join(", ")}.</p> : null}
      {item.additions?.length ? <details className="relative z-10 mt-3 text-sm"><summary className="cursor-pointer py-2 font-semibold text-primary">Adicionais</summary><ul className="space-y-2 pt-2">{item.additions.map((o) => <li key={o.name}>{o.name}{o.price != null && <span className="ml-2 font-semibold">{formatPrice(o.price)}</span>}</li>)}</ul></details> : null}
      {!item.available && <p className="mt-2 text-sm text-destructive">Indisponível no momento</p>}
      {!url && <span id={disabledReasonId} className="sr-only">{item.available ? "Pedidos pelo WhatsApp indisponíveis até a confirmação do número do restaurante." : "Este prato está indisponível para pedidos."}</span>}
    </article>
  );
}
