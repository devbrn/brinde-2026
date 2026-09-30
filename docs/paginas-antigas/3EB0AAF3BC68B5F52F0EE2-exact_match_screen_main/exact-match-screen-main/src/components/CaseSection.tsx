import caseImage from "@/assets/case-blue-roma-slabs.jpg";
import texture from "@/assets/texture-blue-roma.jpg";
import { Reveal } from "./Reveal";

const METRICS = [
  { value: "R$ 1.500", label: "investidos em mídia" },
  { value: "R$ 691.955", label: "em orçamentos registrados" },
  { value: "R$ 14,56", label: "de custo por lead" },
  { value: "30 dias", label: "de campanha" },
];

export function CaseSection() {
  return (
    <section id="resultado" className="relative isolate overflow-hidden border-t border-border bg-background">
      <div className="absolute inset-0 -z-10">
        <img src={texture} alt="" aria-hidden="true" loading="lazy" width={1920} height={1088} className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-[40%] lg:block">
        <img src={caseImage} alt="" aria-hidden="true" loading="lazy" width={1408} height={1008} className="h-full w-full object-cover object-left" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent" />
      </div>

      <div className="shell section-x py-20 lg:py-24">
        <Reveal className="max-w-2xl">
          <h2 className="text-[1.5rem] leading-[1.15] sm:text-3xl">
            Resultado real de uma marmoraria que confiou na Brinde
          </h2>
          <p className="mt-4 text-[3.6rem] font-extrabold leading-none tracking-[-0.04em] text-gold sm:text-[5.5rem] lg:text-[6.5rem]">
            R$ 691 mil
          </p>
          <p className="mt-4 text-xl font-semibold sm:text-2xl">em orçamentos originados em 30 dias.</p>
        </Reveal>

        <div className="mt-10 grid max-w-3xl grid-cols-2 gap-y-7 lg:grid-cols-4">
          {METRICS.map((metric, index) => (
            <Reveal key={metric.value} delay={index * 80} className="border-l border-border-strong pl-4 lg:pl-5">
              <p className="text-xl font-bold text-gold sm:text-2xl">{metric.value}</p>
              <p className="mt-1 text-xs text-foreground sm:text-sm">{metric.label}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-10 max-w-2xl space-y-1 text-xs leading-relaxed text-muted-foreground">
          <p>Dados extraídos do CRM do cliente.</p>
          <p>
            Valor orçado não representa faturamento realizado. O fechamento
            depende também do atendimento, proposta, preço e negociação da
            própria empresa.
          </p>
        </Reveal>
      </div>

      <img src={caseImage} alt="" aria-hidden="true" loading="lazy" width={1408} height={1008} className="h-56 w-full object-cover [mask-image:linear-gradient(to_bottom,transparent,black_40%)] lg:hidden" />
    </section>
  );
}
