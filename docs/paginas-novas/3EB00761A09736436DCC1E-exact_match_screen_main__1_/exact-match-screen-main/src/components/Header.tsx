import { useEffect, useState } from "react";
import { CtaButton } from "./CtaButton";
import brandLogo from "@/assets/brinde-logo.png.asset.json";

const LINKS = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Resultado", href: "#resultado" },
  { label: "Para quem é", href: "#para-quem-e" },
  { label: "Diagnóstico", href: "#diagnostico-formulario" },
  { label: "FAQ", href: "#faq" },
];

export function Header({ onOpenModal }: { onOpenModal: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/92 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="shell section-x flex h-16 items-center justify-between gap-6 lg:h-20">
        <a
          href="#topo"
          className="flex shrink-0 items-center"
          aria-label="Agência Brinde — início"
        >
          <img src={brandLogo.url} alt="Brinde Marketing & Publicidade" className="h-auto w-[150px] max-w-full self-center object-contain lg:h-14 lg:w-auto lg:max-w-none" />
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[0.8rem] font-medium text-muted-foreground transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <CtaButton size="sm" onClick={onOpenModal}>
            Quero meu diagnóstico gratuito
          </CtaButton>
        </div>

        <a
          href="#diagnostico-formulario"
          className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-gold lg:hidden"
        >
          Diagnóstico
        </a>
      </div>
    </header>
  );
}
