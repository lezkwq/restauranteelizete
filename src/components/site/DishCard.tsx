import { ImagePlaceholder } from "./ImagePlaceholder";
import { WhatsappButton } from "./WhatsappButton";
import { formatPrice, whatsappMessageFor, type MenuItem } from "@/data/menu";
import { cn } from "@/lib/utils";

type Props = { item: MenuItem; size?: "default" | "large"; className?: string };
export function DishCard({ item, className }: Props) {
  return (
    <article className={cn("min-w-0 border-t border-border pt-6", className)}>
      {item.image && <ImagePlaceholder slot={{ id: `prato-${item.id}`, label: item.name, alt: item.name, src: item.image }} ratio="4/3" className="mb-5" />}
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="min-w-0 text-3xl leading-tight text-ocean">{item.name}</h3>
        {item.price != null && <span className="shrink-0 text-base font-semibold text-primary">{formatPrice(item.price)}</span>}
      </div>
      {item.description && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.description}</p>}
      {item.options?.length ? <details className="mt-4 text-sm">
        <summary className="cursor-pointer py-2 font-semibold text-primary">Modos de preparo</summary>
        <ul className="grid gap-3 pt-3 sm:grid-cols-2">{item.options.map((o) => <li key={o.name}>{o.name}{o.description && <p className="text-muted-foreground">{o.description}</p>}{o.price != null && <span className="ml-2 font-semibold">{formatPrice(o.price)}</span>}</li>)}</ul>
      </details> : null}
      {item.accompaniments?.length ? <p className="mt-4 text-sm leading-relaxed text-muted-foreground"><span className="font-semibold text-foreground">Acompanhamentos: </span>{item.accompaniments.join(", ")}.</p> : null}
      {item.additions?.length ? <details className="mt-3 text-sm"><summary className="cursor-pointer py-2 font-semibold text-primary">Adicionais</summary><ul className="space-y-2 pt-2">{item.additions.map((o) => <li key={o.name}>{o.name}{o.price != null && <span className="ml-2 font-semibold">{formatPrice(o.price)}</span>}</li>)}</ul></details> : null}
      {!item.available && <p className="mt-2 text-sm text-destructive">Indisponível no momento</p>}
      <WhatsappButton size="sm" variant="outline" className="mt-5" message={whatsappMessageFor(item)} />
    </article>
  );
}
