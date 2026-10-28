import { getWhatsappUrl } from "@/data/site";
import { btnClass, type BtnProps } from "./Buttons";

type Props = BtnProps & { message?: string; label?: string; className?: string };

/** Só vira link quando o número está configurado em src/data/site.ts. */
export function WhatsappButton({ message, label = "Consultar pelo WhatsApp", className, ...v }: Props) {
  const url = getWhatsappUrl(message);
  if (!url) {
    return (
      <span
        aria-disabled="true"
        title="WhatsApp ainda não configurado"
        className={btnClass({ ...v, className: `pointer-events-none opacity-45 ${className ?? ""}` })}
      >
        WhatsApp em breve
      </span>
    );
  }
  return (
    <a href={url} target="_blank" rel="noreferrer" className={btnClass({ ...v, className })}>
      {label}
    </a>
  );
}
