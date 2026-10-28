import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const btn = cva(
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-ocean",
        outline: "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        light: "bg-background text-primary hover:bg-ice",
        ghostLight: "border border-on-ocean/40 text-on-ocean hover:bg-on-ocean hover:text-ocean",
        link: "min-h-0 rounded-none px-0 text-primary underline-offset-8 hover:underline",
      },
      size: { md: "", sm: "min-h-10 px-5 text-[0.8125rem]" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type BtnProps = VariantProps<typeof btn>;
export const btnClass = (p: BtnProps & { className?: string }) => cn(btn(p), p.className);
