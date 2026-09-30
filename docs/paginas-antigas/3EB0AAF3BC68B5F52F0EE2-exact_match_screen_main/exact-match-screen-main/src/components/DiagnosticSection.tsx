import interior from "@/assets/diagnostic-interior.jpg";
import { CircleCheck } from "lucide-react";
import { Reveal } from "./Reveal";

const POINTS = [
  "de onde vêm seus pedidos de orçamento hoje",
  "quanto sua empresa depende de indicação",
  "como seus contatos chegam",
  "onde você pode estar perdendo oportunidades",
  "se existe espaço para gerar mais demanda",
  "se o ConstruLead faz sentido para sua realidade",
];

export function DiagnosticSection() {
  return (
    <div id="diagnostico" className="relative isolate">
      <div className="absolute inset-y-0 left-0 -z-10 w-full sm:w-[38%]">
        <img src={interior} alt="" aria-hidden="true" loading="lazy" width={1008} height={1200} className="h-full w-full object-cover opacity-40 sm:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-background/60 to-background" />
      </div>
      <div className="py-16 sm:pl-[34%] lg:py-20">
        <Reveal>
          <h2 className="text-[1.6rem] leading-[1.15] sm:text-3xl">
            O que vamos analisar no diagnóstico
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">Em 30 minutos, vamos olhar pontos como:</p>
        </Reveal>
        <ul className="mt-6 space-y-3">
          {POINTS.map((point, index) => (
            <Reveal as="li" key={point} delay={index * 60} className="flex items-start gap-3 text-sm">
              <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <span>{point};</span>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={120}>
          <p className="mt-8 text-sm font-semibold leading-snug">
            Você sai da conversa com uma visão mais clara do seu marketing, mesmo
            que não contrate a Brinde.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
