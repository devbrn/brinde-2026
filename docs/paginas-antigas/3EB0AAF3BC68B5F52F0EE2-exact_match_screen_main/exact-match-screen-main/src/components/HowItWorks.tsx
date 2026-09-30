import texture from "@/assets/texture-blue-roma.jpg";
import { ArrowRight } from "lucide-react";
import { CtaButton } from "./CtaButton";
import { Reveal } from "./Reveal";

const STEPS = [
  { n: "1", title: "Responda o formulário", text: "Leva poucos minutos. Queremos entender se sua marmoraria tem o perfil certo." },
  { n: "2", title: "Faça o diagnóstico gratuito", text: "Em uma chamada de 30 minutos no Google Meet, analisamos como seu marketing funciona hoje, de onde vêm seus pedidos de orçamento e onde podem estar os principais gargalos." },
  { n: "3", title: "Veja o que faz sentido melhorar", text: "Ao final, mostramos o que enxergamos na sua operação e quais seriam os próximos passos." },
];

export function HowItWorks({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section id="como-funciona" className="relative isolate overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10">
        <img src={texture} alt="" aria-hidden="true" loading="lazy" width={1920} height={1088} className="h-full w-full object-cover object-left opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/90 to-background/60" />
      </div>
      <div className="shell section-x py-20 lg:py-24">
        <Reveal>
          <h2 className="text-[1.9rem] leading-[1.1] sm:text-4xl">Como funciona</h2>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <ol className="grid gap-8 sm:grid-cols-3 sm:gap-0 lg:col-span-9">
            {STEPS.map((step, index) => (
              <Reveal as="li" key={step.n} delay={index * 90} className="flex gap-4 border-border sm:border-r sm:px-6 sm:first:pl-0">
                <span className="text-4xl font-light leading-none text-gold">{step.n}</span>
                <div>
                  <h3 className="text-base font-semibold text-gold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={200} className="lg:col-span-3">
            <p className="text-base font-semibold text-gold">Sem compromisso de contratação.</p>
            <CtaButton size="md" onClick={onOpenModal} className="mt-4 w-full">
              Quero agendar meu diagnóstico gratuito
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </CtaButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
