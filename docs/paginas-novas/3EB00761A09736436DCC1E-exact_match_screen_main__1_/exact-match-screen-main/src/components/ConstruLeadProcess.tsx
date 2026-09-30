import texture from "@/assets/texture-blue-roma.jpg";
import { Reveal } from "./Reveal";

const STEPS = [
  { number: "01", title: "Atrair na sua região", text: "Colocar sua marmoraria na frente de pessoas procurando o tipo de obra que você executa." },
  { number: "02", title: "Filtrar os curiosos", text: "Separar quem só está pesquisando de quem realmente tem uma obra." },
  { number: "03", title: "Entender o projeto", text: "Coletar as principais informações antes do contato comercial." },
  { number: "04", title: "Entregar a oportunidade", text: "Fazer sua equipe receber o contato já sabendo o que a pessoa procura." },
];

export function ConstruLeadProcess() {
  return (
    <section className="relative isolate overflow-hidden border-t border-border bg-surface">
      <div className="absolute inset-0 -z-10">
        <img src={texture} alt="" aria-hidden="true" loading="lazy" width={1920} height={1088} className="h-full w-full object-cover object-right opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-surface/60" />
      </div>
      <div className="shell section-x grid gap-12 py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <Reveal className="lg:col-span-4">
          <h2 className="text-[1.8rem] leading-[1.12] sm:text-4xl lg:text-[2.2rem]">
            O ConstruLead foi feito pra quem já tem estrutura e quer vender mais.
          </h2>
          <p className="mt-5 text-sm font-semibold">Nós cuidamos da estrutura para:</p>
        </Reveal>

        <ol className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4 lg:gap-7">
          {STEPS.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 90}>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-light text-gold lg:text-5xl">{step.number}</span>
                <span className="h-px flex-1 bg-gold/40" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
