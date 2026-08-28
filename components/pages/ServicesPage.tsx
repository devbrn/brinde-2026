'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { href, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

type ServiceStyle = {
  id: string;
  analyticsName: string;
  tagColor: string;
  tagTextColor: string;
  modalBg: string;
  modalTextColor: string;
  videoSrc: string;
  image: string;
};

type ServiceData = ServiceStyle & Dictionary['services']['items'][number];

const serviceStyles: ServiceStyle[] = [
  {
    id: 'rotulo-branco',
    analyticsName: 'construlead_essencial',
    tagColor: '#c6f135',
    tagTextColor: '#111111',
    modalBg: '#c6f135',
    modalTextColor: '#111111',
    videoSrc: 'https://www.youtube.com/embed/BCk9qP7w1Ss?autoplay=1&mute=1&loop=1&playlist=BCk9qP7w1Ss&controls=0&showinfo=0&rel=0&modestbranding=1',
    image: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1785980787/brinde1_pftqvj.webp',
  },
  {
    id: 'reserva-especial',
    analyticsName: 'construlead_performance',
    tagColor: '#c51618',
    tagTextColor: '#ffffff',
    modalBg: '#c51618',
    modalTextColor: '#ffffff',
    videoSrc: 'https://www.youtube.com/embed/Ncpn5cD_oGg?autoplay=1&mute=1&loop=1&playlist=Ncpn5cD_oGg&controls=0&showinfo=0&rel=0&modestbranding=1',
    image: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1785980790/brinde2_wu4d0p.webp',
  },
  {
    id: 'edicao-limitada',
    analyticsName: 'construlead_expansao',
    tagColor: '#c9b8e8',
    tagTextColor: '#111111',
    modalBg: '#c9b8e8',
    modalTextColor: '#111111',
    videoSrc: 'https://www.youtube.com/embed/48Tg9kbDKyI?autoplay=1&mute=1&loop=1&playlist=48Tg9kbDKyI&controls=0&showinfo=0&rel=0&modestbranding=1',
    image: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1785980793/brinde3_c814td.webp',
  },
];

function ServiceModal({
  service,
  onClose,
  dict,
  locale,
}: {
  service: ServiceData;
  onClose: () => void;
  dict: Dictionary;
  locale: Locale;
}) {
  const t = dict.services;
  useEffect(() => {
    window.dataLayer?.push({
      event: 'service_detail_open',
      service_name: service.analyticsName,
    });

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, service.analyticsName]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ backgroundColor: '#ffffff', color: '#050a30' }}
      data-lenis-prevent
    >
      {/* Botão fechar */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[60] w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition-opacity hover:opacity-60"
        style={{ backgroundColor: '#050a30', color: '#ffffff' }}
        aria-label={dict.common.close}
      >
        ✕
      </button>

      <div className="min-h-screen px-6 md:px-16 lg:px-24 pt-20 pb-16 md:py-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24">

          {/* Coluna esquerda */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <p
              className="text-sm uppercase tracking-widest opacity-60"
              style={{ fontFamily: 'Aileron, sans-serif' }}
            >
              {service.subtitle}
            </p>
            <h2
              className="text-[2.1rem] sm:text-[3rem] md:text-[5rem] font-black leading-none uppercase flex flex-col"
              style={{ fontFamily: 'Aileron, sans-serif' }}
            >
              <span>{service.titleTop}</span>
              <span>{service.titleBottom}</span>
            </h2>
            <div className="flex flex-col gap-4">
              {service.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base md:text-lg leading-relaxed opacity-90"
                  style={{ fontFamily: 'Aileron, sans-serif' }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <Link
              href={href('contato', locale)}
              className="inline-flex items-center justify-center px-6 py-3 mt-4 rounded-full text-sm font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] w-fit shadow-md"
              style={{ backgroundColor: '#c51618', color: '#ffffff', fontFamily: 'Aileron, sans-serif' }}
            >
              {dict.common.contactCta}
            </Link>

            <p
              className="text-sm font-bold mt-2 opacity-70"
              style={{ fontFamily: 'Aileron, sans-serif' }}
            >
              {t.methodology}
            </p>
          </motion.div>

          {/* Coluna direita */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            {/* Planejamento */}
            <div className="flex flex-col gap-3">
              <h3
                className="text-base font-bold text-balance"
                style={{ fontFamily: 'Aileron, sans-serif' }}
              >
                {t.planningTitle}
              </h3>
              <ul className="flex flex-col gap-1">
                {service.planning.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm leading-relaxed opacity-80"
                    style={{ fontFamily: 'Aileron, sans-serif' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Execução */}
            <div className="flex flex-col gap-3">
              <h3
                className="text-base font-bold"
                style={{ fontFamily: 'Aileron, sans-serif' }}
              >
                {t.executionTitle}
              </h3>
              <ul className="flex flex-col gap-1">
                {service.execution.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm leading-relaxed opacity-80"
                    style={{ fontFamily: 'Aileron, sans-serif' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}

function ServiceCard({
  service,
  onClick,
  isDesktop,
  learnMore,
}: {
  service: ServiceData;
  onClick: () => void;
  isDesktop: boolean;
  learnMore: string;
}) {
  return (
    <motion.div
      data-service-card
      onClick={onClick}
      {...(isDesktop
        ? {}
        : {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.2 },
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
          })}
      className="relative overflow-hidden rounded-2xl cursor-pointer group aspect-[4/5] lg:aspect-[9/16] w-full lg:w-[85%] mx-auto bg-[#050a30]"
      style={isDesktop ? { opacity: 0, filter: 'blur(24px)' } : undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Overlay gradiente permanente */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050a30]/80 via-[#050a30]/20 to-transparent" />

      {/* Overlay colorido no hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        style={{ backgroundColor: service.tagColor }}
      />

      {/* Conteúdo inferior */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col items-center text-center gap-2">
        <h2
          className="text-white text-2xl md:text-3xl font-black leading-tight flex flex-col"
          style={{ fontFamily: 'Aileron, sans-serif' }}
        >
          <span>{service.titleTop}</span>
          <span>{service.titleBottom}</span>
        </h2>
        <p
          className="text-white/80 text-base leading-relaxed line-clamp-3"
          style={{ fontFamily: 'Aileron, sans-serif' }}
        >
          {service.shortDesc}
        </p>
        <span
          className="text-white text-base font-semibold mt-2 group-hover:underline"
          style={{ fontFamily: 'Aileron, sans-serif' }}
        >
          {learnMore} ↗
        </span>
      </div>
    </motion.div>
  );
}

export function ServicesPage({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.services;
  const services: ServiceData[] = serviceStyles.map((style, i) => ({
    ...style,
    ...t.items[i],
  }));
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (activeId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeId]);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const wrapper = cardsWrapperRef.current;
      if (!wrapper) return;
      const cards = wrapper.querySelectorAll('[data-service-card]');

      const totalScroll = window.innerHeight * 2;
      const setWrapperHeight = () => {
        wrapper.style.height = `${window.innerHeight + totalScroll}px`;
      };
      setWrapperHeight();

      gsap.set(cards, { opacity: 0, filter: 'blur(24px)' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: setWrapperHeight,
        },
      });

      // Âncora de duração: fixa o total da timeline em 1 para que as posições
      // dos cards abaixo sejam lidas como fração do trecho pinado.
      tl.to({}, { duration: 1 }, 0);

      // Cada card leva `reveal` da timeline e entra escalonado por `stagger`.
      // O último termina em 0.9, deixando uma folga de scroll com tudo 100%
      // focado antes do pin soltar a seção.
      const stagger = 0.12;
      const lastStart = stagger * Math.max(cards.length - 1, 0);
      const reveal = 0.9 - lastStart;

      cards.forEach((card, i) => {
        tl.fromTo(
          card,
          { opacity: 0, filter: 'blur(24px)' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'none',
            duration: reveal,
          },
          i * stagger
        );
      });

      return () => {
        wrapper.style.height = '';
        gsap.set(cards, { clearProps: 'all' });
      };
    });

    return () => mm.revert();
  }, [isDesktop]);

  const activeService = activeId ? (services.find((s) => s.id === activeId) ?? null) : null;

  return (
    <div className="bg-white min-h-screen" data-nav-light>
      {/* ─── HERO ─── */}
      <section className="pt-32 md:pt-48 lg:pt-64 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <h1
            className="text-[2.1rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[4.6rem] leading-none font-black uppercase tracking-tight text-[#050a30]"
            style={{ fontFamily: 'Aileron, sans-serif' }}
          >
            {t.heroTitle[0]}<br />
            {t.heroTitle[1]}<br />
            {t.heroTitle[2]}<br />
            {t.heroTitle[3]}
          </h1>
          <p
            className="text-[19px] sm:text-[26px] md:text-[30px] text-gray-700 leading-relaxed"
            style={{ fontFamily: 'Aileron, sans-serif' }}
          >
            {t.heroText}
          </p>
        </div>
      </section>

      {/* ─── CARDS ─── */}
      {/* Scroll-jack: cards revelam com fade+blur, pin libera quando todos estão 100% */}
      {/* Abaixo de lg o pin não roda (ver matchMedia no useLayoutEffect): os cards
          fluem na página em vez de ficarem presos sobre o hero. */}
      <div ref={cardsWrapperRef} className="relative">
        <div className="lg:sticky lg:top-0 lg:h-screen flex items-center py-16 lg:py-0 px-6 md:px-12 lg:px-24">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-[10px] w-full">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                isDesktop={isDesktop}
                learnMore={t.learnMore}
                onClick={() => setActiveId(service.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ─── MODAL ─── */}
      <AnimatePresence>
        {activeService && (
          <ServiceModal
            key={activeService.id}
            service={activeService}
            dict={dict}
            locale={locale}
            onClose={() => setActiveId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
