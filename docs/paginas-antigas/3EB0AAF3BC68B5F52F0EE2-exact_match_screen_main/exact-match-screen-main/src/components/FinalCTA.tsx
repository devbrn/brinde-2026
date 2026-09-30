import texture from "@/assets/texture-blue-roma.jpg";
import { ArrowRight } from "lucide-react";
import { CtaButton } from "./CtaButton";
import { Reveal } from "./Reveal";

export function FinalCTA({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="relative isolate overflow-hidden border-t border-border">
      <div className="absolute inset-0 -z-10">
        <img src={texture} alt="" aria-hidden="true" loading="lazy" width={1920} height={1088} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--background)_0%,transparent_70%)] opacity-80" />
      </div>
      <div className="shell section-x py-20 text-center lg:py-24">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="text-[1.9rem] leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
            Descubra <span className="text-gold">onde sua marmoraria</span> pode estar{" "}
            <span className="text-gold">perdendo novas obras.</span>
          </h2>
          <p className="mt-6 text-sm leading-relaxed sm:text-base">
            Agende um diagnóstico gratuito de 30 minutos com nosso time.
          </p>
          <p className="mt-1 text-sm leading-relaxed sm:text-base">
            Vamos analisar seu marketing, seus gargalos e entender se existe
            espaço para gerar mais pedidos de orçamento.
          </p>
          <p className="mt-5 text-sm font-semibold text-gold sm:text-base">Sem compromisso de contratação.</p>
          <div className="mt-7">
            <CtaButton size="lg" onClick={onOpenModal} className="w-full sm:w-auto">
              Quero agendar meu diagnóstico gratuito
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
