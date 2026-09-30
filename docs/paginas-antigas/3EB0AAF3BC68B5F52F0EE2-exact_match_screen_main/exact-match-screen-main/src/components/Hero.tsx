import heroImage from "@/assets/hero-blue-roma-kitchen.jpg";
import { ArrowRight, CalendarCheck, TrendingUp, Users } from "lucide-react";
import { CtaButton } from "./CtaButton";

const BENEFITS = [
  { icon: TrendingUp, text: "Mais pedidos de orçamento." },
  { icon: CalendarCheck, text: "Mais previsibilidade." },
  { icon: Users, text: "Menos dependência da indicação.", gold: true },
];

export function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section id="topo" className="relative isolate overflow-hidden bg-background">
      {/* Foto: metade direita no desktop, topo no mobile */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[52svh] lg:inset-y-0 lg:left-auto lg:h-auto lg:w-[54%]">
        <img
          src={heroImage}
          alt="Cozinha contemporânea com ilha em pedra Blue Roma"
          width={1600}
          height={1200}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10 lg:bg-gradient-to-r lg:from-background lg:via-background/25 lg:to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background/80 to-transparent" />
      </div>

      <div className="shell section-x flex min-h-[100svh] flex-col justify-end pb-16 pt-[40svh] lg:min-h-[92vh] lg:justify-center lg:pb-24 lg:pt-32">
        <div className="max-w-xl lg:max-w-[40rem]">
          <p className="kicker flex items-center gap-4">
            <span className="hidden h-px w-12 bg-gold sm:block" aria-hidden="true" />
            Para marmorarias que já faturam e têm estrutura para crescer
          </p>

          <h1 className="mt-6 text-[2.1rem] font-extrabold leading-[1.05] sm:text-5xl lg:text-[3.6rem]">
            Sua marmoraria já tem estrutura para crescer.{" "}
            <span className="text-gold">Agora precisa gerar mais pedidos de orçamento.</span>
          </h1>

          <p className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
            A Brinde cria uma estrutura para colocar sua marmoraria na frente de
            pessoas com projetos compatíveis com o tipo de obra que você quer
            executar.
          </p>

          <ul className="mt-7 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {BENEFITS.map(({ icon: Icon, text, gold }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/60 text-gold">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className={`text-sm font-semibold leading-tight ${gold ? "text-gold" : "text-foreground"}`}>
                  {text}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-7 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Antes de falar em qualquer contratação, fazemos um diagnóstico
            gratuito de 30 minutos para entender seu marketing e ver se o{" "}
            <strong className="text-foreground">ConstruLead</strong> realmente faz sentido para sua operação.
          </p>

          <div className="mt-8">
            <CtaButton size="lg" onClick={onOpenModal} className="w-full sm:w-auto">
              Quero meu diagnóstico gratuito
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
