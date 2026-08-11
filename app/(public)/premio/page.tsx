'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type StoryCard = {
  label?: string;
  quote?: string;
  image?: string;
  widthClass: string;
  mtClass: string;
  parallax: number;
};

const cards: StoryCard[] = [
  {
    label: 'Fundada 2021',
    image:
      'https://res.cloudinary.com/dyezpmorm/image/upload/v1782928921/Fundada_2021_opyejj.png',
    widthClass: 'w-[70vw] lg:w-[35vw] xl:w-[28vw]',
    mtClass: 'mt-[6vh]',
    parallax: -80,
  },
  {
    quote: 'Mais importante que o começo, é a forma como evoluímos.',
    widthClass: 'w-[65vw] lg:w-[28vw] xl:w-[22vw]',
    mtClass: 'mt-[18vh]',
    parallax: 0,
  },
  {
    label: 'Consolidação 2022',
    image:
      'https://res.cloudinary.com/dyezpmorm/image/upload/v1782928921/Consolida%C3%A7%C3%A3o_2022_jvd3vw.png',
    widthClass: 'w-[60vw] lg:w-[28vw] xl:w-[22vw]',
    mtClass: 'mt-[-4vh]',
    parallax: 60,
  },
  {
    label: 'Identidade 2023',
    image:
      'https://res.cloudinary.com/dyezpmorm/image/upload/v1782924825/IMG_5747_zjexv0.jpg',
    widthClass: 'w-[75vw] lg:w-[38vw] xl:w-[30vw]',
    mtClass: 'mt-[14vh]',
    parallax: -100,
  },
  {
    label: 'Expansão 2024',
    image:
      'https://res.cloudinary.com/dyezpmorm/image/upload/v1782928921/Expans%C3%A3o_2024_ddgu2e.png',
    widthClass: 'w-[68vw] lg:w-[32vw] xl:w-[25vw]',
    mtClass: 'mt-[-10vh]',
    parallax: 70,
  },
  {
    label: 'Validação 2025',
    image:
      'https://res.cloudinary.com/dyezpmorm/image/upload/v1782928920/Valida%C3%A7%C3%A3o_2025_tllu3k.png',
    widthClass: 'w-[80vw] lg:w-[42vw] xl:w-[33vw]',
    mtClass: 'mt-[10vh]',
    parallax: -90,
  },
];

export default function Premio() {
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

    mm.add('(max-width: 1023px)', () => {
      section?.setAttribute('data-lenis-prevent', '');
      return () => section?.removeAttribute('data-lenis-prevent');
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
  }, []);

  return (
    <>
      {/* ─── PG 16: VÍDEO DO PRÊMIO ─── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1.2, ease: 'easeOut' } }}
        className="pt-20 relative min-h-screen bg-[#050a30] flex items-center justify-center overflow-hidden"
      >
        <iframe
          src="https://www.youtube.com/embed/vB5FYlsGybM?autoplay=1&mute=1&loop=1&playlist=vB5FYlsGybM&controls=0&showinfo=0&rel=0&modestbranding=1"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ border: 'none', transform: 'scale(1.4)', transformOrigin: 'center' }}
          allow="autoplay; mute"
          title="Prêmio"
        />
        <div className="absolute inset-0 bg-[#050a30]/40" />
      </motion.section>

      {/* ─── PG 17-18: Horizontal scroll com sticky + parallax (GSAP) ─── */}
      <div ref={wrapperRef} className="relative">
        <section
          ref={sectionRef}
          className="sticky top-0 h-screen w-full bg-[#050a30] overflow-x-auto lg:overflow-hidden snap-x snap-mandatory lg:snap-none"
        >
        <div
          ref={trackRef}
          className="flex h-full items-center gap-8 lg:gap-24 px-[8vw] lg:px-[12vw] w-max"
        >
          {cards.map((card, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`shrink-0 flex flex-col gap-4 snap-center ${card.widthClass} ${card.mtClass}`}
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
                  className="text-white text-2xl md:text-3xl leading-snug px-4"
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
            </div>
          ))}
        </div>
        </section>
      </div>

      {/* ─── PG 19: Texto Prêmio ─── */}
      <section className="bg-white flex items-center pt-8 pb-20 px-6 md:px-16 lg:px-24" data-nav-light>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 w-full">
          <p
            className="text-2xl md:text-3xl lg:text-4xl text-[#050a30] leading-snug"
            style={{ fontFamily: 'Aileron, sans-serif' }}
          >
            O 35º Mídia Festival reconheceu um princípio que orienta a Brinde
            desde o início: estratégia, criação e consistência constroem marcas fortes.
          </p>
          <div className="flex flex-col gap-6">
            <p
              className="text-base md:text-lg text-gray-800 leading-relaxed"
              style={{ fontFamily: 'Aileron, sans-serif' }}
            >
              Entre mais de 300 agências, a Brinde conquistou o troféu de ouro
              por um trabalho que uniu estratégia, estética e propósito com
              relevância para o mercado.
            </p>
            <p
              className="text-base md:text-lg text-gray-800 leading-relaxed"
              style={{ fontFamily: 'Aileron, sans-serif' }}
            >
              Mais do que uma conquista, o prêmio comprova nossa capacidade de
              transformar decisões criativas em valor para as marcas.
            </p>
          </div>
        </div>
      </section>

      {/* ─── PG 20: Troféu Ouro ─── */}
      <section className="relative w-full h-screen overflow-hidden bg-white" data-nav-light>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://res.cloudinary.com/dyezpmorm/image/upload/v1781110726/Site_Brinde_2026_1_jwnfgc.webp"
          alt="Ouro Mídia Festival 2025"
          className="absolute inset-0 w-full h-full object-contain"
        />
      </section>
    </>
  );
}
