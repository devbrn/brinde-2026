import { useId, useState } from "react";
import texture from "@/assets/texture-blue-roma.jpg";
import { DiagnosticSection } from "./DiagnosticSection";
import { Reveal } from "./Reveal";

const ITEMS = [
  {
    q: "O diagnóstico é realmente gratuito?",
    a: [
      "Sim.",
      "É uma conversa de aproximadamente 30 minutos pelo Google Meet para entendermos seu cenário e avaliarmos se existe oportunidade de melhoria.",
      "Não existe obrigação de contratar.",
    ],
  },
  {
    q: "Vocês vão tentar me vender alguma coisa na chamada?",
    a: [
      "Primeiro vamos analisar sua operação.",
      "Se entendermos que o ConstruLead pode ajudar, mostramos como ele funcionaria no seu caso.",
      "Se não fizer sentido, também vamos dizer isso.",
    ],
  },
  {
    q: "Já tentei tráfego pago e só veio curioso. O que muda?",
    a: [
      "O ConstruLead não trabalha só o anúncio.",
      "A estrutura envolve campanha, página, filtros e qualificação para reduzir contatos sem perfil antes de chegarem ao seu comercial.",
    ],
  },
  {
    q: "Isso funciona para marmoraria de alto padrão?",
    a: [
      "Essa é justamente a proposta.",
      "A comunicação, a segmentação e a jornada são construídas pensando no tipo de obra, região e perfil de cliente que sua marmoraria quer atrair.",
    ],
  },
  {
    q: "Vou receber um monte de gente perguntando preço?",
    a: [
      "Algumas pessoas sempre vão comparar preço.",
      "O objetivo é reduzir esse tipo de contato e priorizar quem realmente tem uma obra e contexto para avançar.",
    ],
  },
  {
    q: "Quanto preciso investir?",
    a: [
      "Isso depende da região, ticket, objetivo e capacidade da sua operação.",
      "Por isso não apresentamos uma solução pronta antes de entender sua empresa.",
    ],
  },
  {
    q: "Em quanto tempo começo a receber oportunidades?",
    a: [
      "Isso varia conforme região, demanda, oferta e histórico da operação.",
      "O ConstruLead é testado, medido e ajustado ao longo do processo.",
    ],
  },
  {
    q: "Minha marmoraria já vive bem de indicação. Ainda faz sentido?",
    a: [
      "Pode fazer.",
      "O objetivo não é substituir a indicação.",
      "É criar outra forma de gerar novos pedidos de orçamento sem depender exclusivamente dela.",
    ],
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section className="relative isolate overflow-hidden border-t border-border bg-background">
      <div className="absolute inset-y-0 left-0 -z-10 hidden w-[62%] lg:block">
        <img src={texture} alt="" aria-hidden="true" loading="lazy" width={1920} height={1088} className="h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-background/60 to-background" />
      </div>
      <div className="grid lg:grid-cols-12">
        <div className="section-x lg:col-span-7 lg:pl-0 lg:pr-12">
          <DiagnosticSection />
        </div>
        <div id="faq" className="section-x border-t border-border py-16 lg:col-span-5 lg:border-t-0 lg:py-20 lg:pl-8">
          <Reveal>
            <h2 className="text-[1.6rem] leading-[1.15] sm:text-3xl">Dúvidas frequentes</h2>
          </Reveal>
          <div className="mt-6">
            {ITEMS.map((item, index) => {
              const expanded = open === index;
              const panelId = `${baseId}-panel-${index}`;
              const buttonId = `${baseId}-button-${index}`;
              return (
                <div key={item.q} className="border-b border-border">
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      onClick={() => setOpen(expanded ? null : index)}
                      className="flex w-full items-start gap-4 py-3.5 text-left transition-colors hover:text-gold"
                    >
                      <span className="w-6 shrink-0 text-xs text-gold">{String(index + 1).padStart(2, "0")}</span>
                      <span className="flex-1 text-sm font-medium leading-snug">{item.q}</span>
                      <span aria-hidden="true" className={`shrink-0 text-lg leading-none text-gold transition-transform duration-300 ${expanded ? "rotate-45" : ""}`}>+</span>
                    </button>
                  </h3>
                  <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!expanded}>
                    <div className="space-y-2 pb-4 pl-10 pr-6 text-sm leading-relaxed text-muted-foreground">
                      {item.a.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
