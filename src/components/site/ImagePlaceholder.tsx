import { cn } from "@/lib/utils";
import type { MediaSlot } from "@/data/media";

type Tone = "ice" | "ocean" | "royal";

type Props = {
  slot: MediaSlot | { id: string; label: string; alt: string; src: string | null };
  /** Proporção CSS, ex.: "4/5", "16/9". Omitir para preencher o pai. */
  ratio?: string;
  tone?: Tone;
  className?: string;
  priority?: boolean;
};

const toneClass: Record<Tone, string> = {
  ice: "photo-slot text-primary/70",
  ocean: "photo-slot-ocean text-on-ocean-muted",
  royal: "photo-slot-royal text-primary-foreground/80",
};

export function ImagePlaceholder({ slot, ratio, tone = "ice", className, priority }: Props) {
  const style = ratio ? { aspectRatio: ratio } : undefined;
  if (slot.src) {
    return (
      <div className={cn("relative overflow-hidden", className)} style={style} data-media-id={slot.id}>
        <img
          src={slot.src}
          alt={slot.alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`Espaço reservado: ${slot.alt}`}
      data-media-id={slot.id}
      className={cn("relative overflow-hidden", toneClass[tone], className)}
      style={style}
    >

    </div>
  );
}
