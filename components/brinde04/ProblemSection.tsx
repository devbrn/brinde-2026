'use client';

import { Reveal } from './Reveal';

const TEXTURE = '/marmoristas/brinde-04/assets/texture-blue-roma.jpg';
const CRAFTSMAN = '/marmoristas/brinde-04/assets/craftsman-polishing.jpg';

export function ProblemSection() {
  return (
    <section className="relative isolate overflow-hidden border-t border-border bg-background">
      {/* Pedra à esquerda */}
      <div className="absolute inset-y-0 left-0 -z-10 hidden w-[30%] lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={TEXTURE} alt="" aria-hidden="true" loading="lazy" width={1920} height={1088} className="h-full w-full object-cover object-left opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/40 to-background" />
      </div>
      {/* Marmorista à direita */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-64 lg:inset-y-0 lg:left-auto lg:h-auto lg:w-[42%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={CRAFTSMAN} alt="" aria-hidden="true" loading="lazy" width={1600} height={1008} className="h-full w-full object-cover object-[65%_center] opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background/20 lg:bg-gradient-to-r lg:from-background lg:via-background/30 lg:to-transparent" />
      </div>

      <div className="b4-shell b4-section-x pb-72 pt-20 lg:py-24">
        <div className="max-w-xl lg:ml-[24%]">
          <Reveal>
            <h2 className="text-[1.9rem] leading-[1.1] sm:text-4xl lg:text-[2.6rem]">
              Até quando você vai esperar a próxima indicação chegar?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-5 text-base text-muted-foreground">Sua marmoraria já sabe executar.</p>
            <p className="mt-3 text-lg font-semibold leading-snug text-gold">
              O problema é depender da indicação para trazer a próxima obra.
            </p>
          </Reveal>
          <Reveal delay={160} className="mt-6 space-y-1 text-base text-muted-foreground">
            <p>Tem mês com vários pedidos de orçamento.</p>
            <p>No outro, o movimento cai.</p>
            <p className="pt-3">A indicação funciona.</p>
            <p className="font-semibold text-gold">Mas você não controla quando ela chega.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
