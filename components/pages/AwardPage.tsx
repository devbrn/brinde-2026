'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Dictionary } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

type CardLayout = {
  image?: string;
  widthClass: string;
  mtClass: string;
  parallax: number;
};

const cardLayouts: CardLayout[] = [
  {
    image:
      'https://res.cloudinary.com/dyezpmorm/image/upload/v1782928921/Fundada_2021_opyejj.png',
    widthClass: 'lg:w-[35vw] xl:w-[28vw]',
    mtClass: 'lg:mt-[6vh]',
    parallax: -80,
  },
  {
    widthClass: 'lg:w-[28vw] xl:w-[22vw]',
    mtClass: 'lg:mt-[18vh]',
    parallax: 0,
  },
  {
    image:
      'https://res.cloudinary.com/dyezpmorm/image/upload/v1782928921/Consolida%C3%A7%C3%A3o_2022_jvd3vw.png',
    widthClass: 'lg:w-[28vw] xl:w-[22vw]',
    mtClass: 'lg:mt-[-4vh]',
    parallax: 60,
  },
  {
    image:
      'https://res.cloudinary.com/dyezpmorm/image/upload/v1782924825/IMG_5747_zjexv0.jpg',
    widthClass: 'lg:w-[38vw] xl:w-[30vw]',
    mtClass: 'lg:mt-[14vh]',
    parallax: -100,
  },
  {
    image:
      'https://res.cloudinary.com/dyezpmorm/image/upload/v1782928921/Expans%C3%A3o_2024_ddgu2e.png',
    widthClass: 'lg:w-[32vw] xl:w-[25vw]',
    mtClass: 'lg:mt-[-10vh]',
    parallax: 70,
  },
  {
    image:
      'https://res.cloudinary.com/dyezpmorm/image/upload/v1782928920/Valida%C3%A7%C3%A3o_2025_tllu3k.png',
    widthClass: 'lg:w-[42vw] xl:w-[33vw]',
    mtClass: 'lg:mt-[10vh]',
    parallax: -90,
  },
];

export function AwardPage({ dict }: { dict: Dictionary }) {
  const t = dict.award;
  const cards = cardLayouts.map((layout, i) => ({ ...layout, ...t.cards[i] }));
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    const mm = gsap.matchMedia();

    // Abaixo de lg os cards empilham e rolam com a página: sem lock de scroll,
    // sem parallax residual do GSAP nas imagens.
    mm.add('(max-width: 1023px)', () => {
      section?.removeAttribute('data-lenis-prevent');
      imageRefs.current.forEach((img) => img && gsap.set(img, { clearProps: 'all' }));
    });

    mm.add('(min-width: 1024px)', () => {
      if (!section || !track || !wrapper) return;
      section.removeAttribute('data-lenis-prevent');

      const getScrollAmount = () =>
        -(track.scrollWidth - window.innerWidth);

      const setWrapperHeight = () => {
        wrapper.style.height = `${window.innerHeight + Math.abs(getScrollAmount())}px`;
      };
      setWrapperHeight();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => `+=${Math.abs(getScrollAmount())}`,
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: setWrapperHeight,
        },
      });

      const horizontalTween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        duration: 10,
      });

      tl.add(horizontalTween, 0);

      imageRefs.current.forEach((img, i) => {
        if (!img) return;
        const card = cards[i];
        if (!card || card.parallax === 0) return;
        gsap.set(img, { scale: 1.2 });
        tl.to(
          img,
          { x: card.parallax, ease: 'none', duration: 10 },
          0,
        );
      });

      cardRefs.current.forEach((cardEl, i) => {
        if (!cardEl) return;
        tl.fromTo(
          cardEl,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power2.out',
            duration: 1.5,
          },
          i * 0.7,
        );
      });

      return () => {
        wrapper.style.height = '';
      };
    });

    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* ─── PG 16: VÍDEO DO PRÊMIO ─── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1.2, ease: 'easeOut' } }}
        className="pt-20 relative min-h-[100dvh] bg-[#050a30] flex items-center justify-center overflow-hidden"
      >
        {/* Iframe não aceita object-cover: dimensionamos em 16:9 pelo lado maior
            da viewport, cobrindo a tela inteira sem faixas. O scale empurra a
            moldura preta do player para fora — overflow-hidden corta o excedente. */}
        <iframe
          src="https://www.youtube.com/embed/vB5FYlsGybM?autoplay=1&mute=1&loop=1&playlist=vB5FYlsGybM&controls=0&showinfo=0&rel=0&modestbranding=1&cc_load_policy=0&cc_lang_pref=pt&iv_load_policy=3&disablekb=1&fs=0&playsinline=1"
          className="absolute left-1/2 top-1/2 pointer-events-none w-[max(138vw,245lvh)] h-[max(77.6vw,138lvh)] max-w-none -translate-x-1/2 -translate-y-1/2"
          style={{ border: 'none' }}
          allow="autoplay; mute"
          title={t.videoTitle}
        />
        <div className="absolute inset-0 bg-[#050a30]/40" />
      </motion.section>

      {/* ─── PG 17-18: Horizontal scroll com sticky + parallax (GSAP) ─── */}
      <div ref={wrapperRef} className="relative">
        <section
          ref={sectionRef}
          className="lg:sticky lg:top-0 lg:h-screen w-full bg-[#050a30] lg:overflow-hidden py-16 lg:py-0"
        >
        {/* Mobile/tablet: empilha vertical (cada card revela ao entrar na viewport).
            lg+: track horizontal movido pelo GSAP. */}
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row items-center lg:h-full gap-12 lg:gap-24 px-6 lg:px-[12vw] w-full lg:w-max"
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el as HTMLDivElement | null;
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`w-full max-w-[420px] lg:max-w-none lg:shrink-0 flex flex-col gap-4 ${card.widthClass} ${card.mtClass}`}
            >
              {card.label && (
                <span
                  className="text-white text-sm md:text-base font-bold"
                  style={{ fontFamily: 'Aileron, sans-serif' }}
                >
                  {card.label}
                </span>
              )}
              {card.quote ? (
                <p
                  className="text-white text-2xl md:text-3xl leading-snug px-4 text-center lg:text-left"
                  style={{ fontFamily: '"Tan Pearl", serif' }}
                >
                  {card.quote}
                </p>
              ) : (
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-red-900/50 bg-[#050a30]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={(el) => {
                      imageRefs.current[i] = el;
                    }}
                    src={card.image}
                    alt={card.label ?? ''}
                    className="w-full h-full object-cover will-change-transform"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
        </section>
      </div>

      {/* ─── PG 19: Texto Prêmio ─── */}
      <section
        className="flex items-center pt-8 pb-8 md:pb-20 px-6 md:px-16 lg:px-24"
        style={{ backgroundColor: '#fdfdfd' }}
        data-nav-light
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 w-full">
          <p
            className="text-2xl md:text-3xl lg:text-4xl text-[#050a30] leading-snug"
            style={{ fontFamily: 'Aileron, sans-serif' }}
          >
            {t.lead}
          </p>
          <div className="flex flex-col gap-6">
            <p
              className="text-base md:text-lg text-gray-800 leading-relaxed"
              style={{ fontFamily: 'Aileron, sans-serif' }}
            >
              {t.p1}
            </p>
            <p
              className="text-base md:text-lg text-gray-800 leading-relaxed"
              style={{ fontFamily: 'Aileron, sans-serif' }}
            >
              {t.p2}
            </p>
          </div>
        </div>
      </section>

      {/* ─── PG 20: Troféu Ouro ─── */}
      {/* Imagem 1920×736 (2.61:1): com h-screen + object-contain sobrava um vazio
          enorme acima/abaixo no mobile. A seção passa a ter a altura da imagem. */}
      {/* O webp não é branco puro (#fdfdfd), então bg-white criava uma linha
          visível na emenda com a seção acima. A seção usa a cor da imagem. */}
      <section
        className="relative w-full h-auto lg:h-screen overflow-hidden pb-10 lg:pb-0"
        style={{ backgroundColor: '#fdfdfd' }}
        data-nav-light
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://res.cloudinary.com/dyezpmorm/image/upload/v1781110726/Site_Brinde_2026_1_jwnfgc.webp"
          alt={t.trophyAlt}
          className="w-full h-auto object-contain lg:absolute lg:inset-0 lg:h-full"
        />
      </section>
    </>
  );
}
