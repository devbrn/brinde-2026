import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-semibold uppercase tracking-[0.12em] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 text-center";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-[0_16px_40px_-18px_var(--color-primary)] hover:brightness-110 hover:-translate-y-px active:translate-y-0",
  outline:
    "border border-border-strong text-foreground hover:border-gold hover:text-gold",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2.5 text-[0.65rem]",
  md: "px-6 py-3.5 text-[0.7rem]",
  lg: "px-7 py-4 text-[0.72rem] sm:px-9 sm:py-[1.15rem] sm:text-[0.8rem]",
};

export function CtaButton({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button
      type="button"
      {...props}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    />
  );
}
