import { ImagePlaceholder } from "./ImagePlaceholder";
import { WhatsappButton } from "./WhatsappButton";
import { categoryLabel, formatPrice, whatsappMessageFor, type MenuItem } from "@/data/menu";
import { cn } from "@/lib/utils";

type Props = { item: MenuItem; size?: "default" | "large"; className?: string };

export function DishCard({ item, size = "default", className }: Props) {
  const large = size === "large";
  return (
    <article className={cn("group flex flex-col", large && "md:grid md:grid-cols-[1.3fr_1fr] md:items-end md:gap-10", className)}>
      <ImagePlaceholder
        slot={{ id: `prato-${item.id}`, label: item.name, alt: `Fotografia do prato ${item.name}`, src: item.image }}
        ratio={large ? "4/3" : "5/4"}
      />
      <div className={cn("pt-5", large && "md:pb-2")}>
        <p className="text-xs font-semibold text-primary">{categoryLabel(item.category)}</p>
        <div className="mt-2 flex items-baseline justify-between gap-4 border-b border-border pb-3">
          <h3 className={cn("min-w-0 text-ocean", large ? "text-4xl md:text-5xl" : "text-3xl")}>{item.name}</h3>
          <span className="shrink-0 text-sm font-semibold text-graphite">{formatPrice(item.price)}</span>
        </div>
        <p className="mt-3 max-w-prose text-[0.95rem] leading-relaxed text-muted-foreground">{item.description}</p>
        {!item.available && <p className="mt-2 text-sm font-medium text-destructive">Indisponível no momento</p>}
        <WhatsappButton size="sm" variant="outline" className="mt-5" message={whatsappMessageFor(item)} />
      </div>
    </article>
  );
}
