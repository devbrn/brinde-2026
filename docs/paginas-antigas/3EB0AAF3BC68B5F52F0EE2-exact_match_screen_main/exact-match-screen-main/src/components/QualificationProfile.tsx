import stone from "@/assets/texture-light-stone.jpg";
import { BadgeDollarSign, Building2, Factory, Images, TrendingUp, Users } from "lucide-react";
import { Reveal } from "./Reveal";

const ITEMS = [
  { icon: Factory, text: "já possuem operação ativa" },
  { icon: Images, text: "têm portfólio" },
  { icon: BadgeDollarSign, text: "já faturam" },
  { icon: Building2, text: "conseguem atender novas obras" },
  { icon: Users, text: "querem reduzir a dependência de indicação" },
  { icon: TrendingUp, text: "estão dispostas a investir em crescimento" },
];

export function QualificationProfile() {
  return (
    <section id="para-quem-e" className="relative isolate overflow-hidden bg-stone text-stone-ink">
      <img src={stone} alt="" aria-hidden="true" loading="lazy" width={1920} height={800} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70" />
      <div className="shell section-x grid gap-10 py-16 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-20">
        <Reveal className="lg:col-span-3">
          <h2 className="text-[1.8rem] leading-[1.12] sm:text-3xl">
            O ConstruLead faz mais sentido para marmorarias que:
          </h2>
        </Reveal>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:col-span-9 lg:grid-cols-6">
          {ITEMS.map(({ icon: Icon, text }, index) => (
            <Reveal as="li" key={text} delay={index * 60}>
              <Icon className="h-8 w-8 text-stone-muted" strokeWidth={1.25} aria-hidden="true" />
              <p className="mt-3 text-sm leading-snug text-stone-muted">{text};</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
