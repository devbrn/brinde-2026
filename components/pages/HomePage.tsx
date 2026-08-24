'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { href, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';


const clients = [
  { name: 'Meli', logo: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1781016237/meli_luehqu.png' },
  { name: 'DHL', logo: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1781016234/dhl_hkriql.png' },
  { name: 'MegaFrio', logo: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1781016725/megafrio_c5fiya.webp' },
  { name: 'Josana Monteiro', logo: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1781016235/josana-monteiro_wsxfbb.png' },
  { name: 'MeUp', logo: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1781016386/meup_q74vzq.png' },
  { name: 'Luiz Kind', logo: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1781016235/luiz-kind_yao5sy.png' },
  { name: 'D\'Boy', logo: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1781016235/dboy_cvlagf.png' },
  { name: 'CADI', logo: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1781016736/cadi_pcjqzk.webp' },
  { name: 'Armazém das Tintas', logo: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1781016234/armazem-das-tintas_flgesk.png' },
  { name: 'Adrielli Massaro', logo: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1781016234/adrielli-massaro_pnefzr.png' },
  { name: 'Sherali', logo: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1781016238/sherali_j6aazv.png' },
  { name: 'Isla', logo: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1781016235/isla_icfutv.png' },
  { name: 'Darin', logo: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1781016234/darin_ii1wm6.png' },
  { name: 'MBPS', logo: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1781016236/mbps_z32olt.webp' },
  { name: 'PedraShop', logo: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1781016237/pedrashop_qxp3fe.png' },
  { name: 'RMG', logo: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1781016238/rmg_ozpwr2.png' },
  { name: 'Status Líder', logo: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1786733556/status-lider-logo_g7hxvi.svg', scale: '45%' },
];



const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { y: -8, transition: { duration: 0.3 } },
};



function ClickableVideo({ videoId, title, closeLabel }: { videoId: string; title: string; closeLabel: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative w-full h-full group cursor-pointer"
      >
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <div className="w-14 h-14 md:w-18 md:h-18 bg-[#c51618] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
            >
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                className="absolute inset-0 w-full h-full"
                style={{ border: 'none' }}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={title}
              />
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 p-2 rounded-full text-white transition-colors text-xl z-10"
                aria-label={closeLabel}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function HomePage({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.home;
  const videoItems = t.videos;
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const arrivedFromBelow = useRef(false);
  const [hoveredSolucao, setHoveredSolucao] = useState<number | null>(null);

  const videosSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: videosProgress } = useScroll({
    target: videosSectionRef,
    offset: ['start end', 'end start'],
  });

  const v1Opacity = useTransform(videosProgress, [0.06, 0.18], [0, 1]);
  const v1X = useTransform(videosProgress, [0.06, 0.18], [-100, 0]);

  const v2Opacity = useTransform(videosProgress, [0.12, 0.24], [0, 1]);
  const v2X = useTransform(videosProgress, [0.12, 0.24], [-100, 0]);

  const v3Opacity = useTransform(videosProgress, [0.18, 0.30], [0, 1]);
  const v3X = useTransform(videosProgress, [0.18, 0.30], [-100, 0]);

  const logoOpacity = useTransform(videosProgress, [0.24, 0.36], [0, 1]);
  const logoX = useTransform(videosProgress, [0.24, 0.36], [-100, 0]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Mobile: seções empilham verticalmente, sem carrossel — não sequestra o scroll.
    const mq = window.matchMedia('(min-width: 768px)');

    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY > 5) {
        arrivedFromBelow.current = true;
        return;
      }

      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      let target = e.target as HTMLElement | null;
      let isVerticallyScrollable = false;
      let isAtTop = false;
      let isAtBottom = false;

      while (target && target !== el) {
        if (target.scrollHeight > target.clientHeight) {
          const style = window.getComputedStyle(target);
          if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
            isVerticallyScrollable = true;
            isAtTop = target.scrollTop <= 0;
            isAtBottom = Math.abs(target.scrollHeight - target.clientHeight - target.scrollTop) <= 1;
            break;
          }
        }
        target = target.parentElement;
      }

      if (isVerticallyScrollable) {
        if (e.deltaY > 0 && !isAtBottom) return;
        if (e.deltaY < 0 && !isAtTop) return;
      }

      const isAtRightEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 10;

      if (e.deltaY > 0 && isAtRightEnd) {
        arrivedFromBelow.current = false;
        return;
      }

      if (arrivedFromBelow.current && e.deltaY < 0 && isAtRightEnd) {
        arrivedFromBelow.current = false;
        e.preventDefault();
        return;
      }

      arrivedFromBelow.current = false;

      e.preventDefault();

      if (isScrolling.current) return;
      isScrolling.current = true;

      const direction = e.deltaY > 0 ? 1 : -1;
      el.scrollBy({
        left: direction * window.innerWidth,
        behavior: 'smooth'
      });

      setTimeout(() => {
        isScrolling.current = false;
      }, 700);
    };

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5 && el) {
        if (el.scrollLeft < el.scrollWidth - el.clientWidth - 10) {
          el.scrollLeft = el.scrollWidth;
        }
      }
    };

    const enable = () => {
      el.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    };

    const disable = () => {
      el.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      el.scrollLeft = 0;
    };

    if (mq.matches) enable();

    const onChange = (e: MediaQueryListEvent) => (e.matches ? enable() : disable());
    mq.addEventListener('change', onChange);

    return () => {
      disable();
      mq.removeEventListener('change', onChange);
    };
  }, []);

  return (
    <div className="bg-[#050a30] min-h-screen w-full">

      <div
        ref={scrollRef}
        data-lenis-prevent
        className="flex flex-col md:flex-row w-full h-auto md:h-[100dvh] overflow-visible md:overflow-x-auto md:overflow-y-hidden md:snap-x md:snap-mandatory hide-scrollbar"
      >
        {/* ─── 1. HERO ─── */}
        <section className="min-w-full h-[100dvh] md:h-full shrink-0 md:snap-start relative flex items-center justify-center overflow-hidden bg-[#050a30]">
          {/* Iframe não aceita object-cover: dimensionamos em 16:9 pelo lado maior
              da viewport, cobrindo a tela inteira sem faixas. As laterais do vídeo
              ficam para fora no mobile — o overflow-hidden da section corta. */}
          <iframe
            src="https://www.youtube.com/embed/CVQFKCuMq3E?autoplay=1&mute=1&loop=1&playlist=CVQFKCuMq3E&controls=0&showinfo=0&rel=0&modestbranding=1&cc_load_policy=0&cc_lang_pref=pt&iv_load_policy=3&disablekb=1&fs=0&playsinline=1"
            className="absolute left-1/2 top-1/2 pointer-events-none w-[max(138vw,245lvh)] h-[max(77.6vw,138lvh)] max-w-none -translate-x-1/2 -translate-y-1/2"
            style={{ border: 'none' }}
            allow="autoplay; mute"
            title="Hero"
          />

          <div className="absolute inset-0 bg-[#050a30]/70" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center justify-center text-center w-full px-4 gap-1 md:gap-4"
          >
            <p
              className="text-white drop-shadow-md"
              style={{ fontFamily: 'Aileron, sans-serif', fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}
            >
              {t.heroKicker}
            </p>
            <h1
              className="font-black text-white leading-none tracking-tighter drop-shadow-xl uppercase -mb-2 md:-mb-4"
              style={{ fontFamily: 'Aileron, sans-serif', fontSize: 'clamp(2.4rem, 8vw, 8.8rem)' }}
            >
              {t.heroTitle}
            </h1>
            <span
              className="text-white drop-shadow-xl"
              style={{ fontFamily: '"Tan Pearl", serif', fontSize: 'clamp(2.5rem, 8vw, 9rem)' }}
            >
              {t.heroScript}
            </span>
          </motion.div>
        </section>

        {/* ─── 2. SOBRE NÓS ─── */}
        <section data-nav-light className="min-w-full h-auto md:h-full shrink-0 md:snap-start md:overflow-y-auto bg-white px-4 md:px-8 lg:px-12" style={{ paddingTop: 'clamp(2rem, 5vh, 5rem)', paddingBottom: 'clamp(2rem, 5vh, 5rem)' }}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full max-w-[1200px] mx-auto h-auto md:h-full flex flex-col justify-center"
          >
            <h2 className="uppercase tracking-tight text-[#050a30] flex flex-col gap-1 md:gap-2" style={{ marginBottom: 'clamp(1.5rem, 4vh, 4rem)' }}>
              <div className="flex flex-wrap items-baseline gap-x-2 md:gap-x-4 gap-y-1 leading-snug" style={{ fontSize: 'clamp(1.35rem, 2.2vw, 3.5rem)' }}>
                <motion.span variants={fadeUp} className="text-[1.3em]" style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 800 }}>{t.aboutTitle[0]}</motion.span>
                <motion.span variants={fadeUp} style={{ fontFamily: '"Tan Pearl", serif', fontWeight: 'normal' }}>{t.aboutTitle[1]}</motion.span>
                <motion.span variants={fadeUp} className="text-[1.3em]" style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 800 }}>{t.aboutTitle[2]}</motion.span>
                <motion.span variants={fadeUp} style={{ fontFamily: '"Tan Pearl", serif', fontWeight: 'normal' }}>{t.aboutTitle[3]}</motion.span>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-2 md:gap-x-4 gap-y-1 leading-none" style={{ fontSize: 'clamp(1.35rem, 2.2vw, 3.5rem)' }}>
                <motion.span variants={fadeUp} className="text-[1.3em]" style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 800 }}>{t.aboutTitle[4]}</motion.span>
                <motion.span variants={fadeUp} style={{ fontFamily: '"Tan Pearl", serif', fontWeight: 'normal' }}>{t.aboutTitle[5]}</motion.span>
              </div>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 lg:gap-16">
              <motion.div variants={fadeUp} className="md:col-span-7">
                <p
                  className="text-[#050a30] leading-snug font-medium"
                  style={{ fontFamily: 'Aileron, sans-serif', fontSize: 'clamp(1.1rem, 2vw, 2.4rem)' }}
                >
                  {t.aboutLead}
                </p>
              </motion.div>
              <div className="md:col-span-5 flex flex-col gap-4 lg:gap-6 justify-start pt-2">
                <motion.p
                  variants={fadeUp}
                  className="text-gray-800 leading-relaxed"
                  style={{ fontFamily: 'Aileron, sans-serif', fontSize: 'clamp(0.9rem, 1.3vw, 1.25rem)' }}
                >
                  {t.aboutP1}
                </motion.p>
                <motion.p
                  variants={fadeUp}
                  className="text-gray-800 leading-relaxed"
                  style={{ fontFamily: 'Aileron, sans-serif', fontSize: 'clamp(0.9rem, 1.3vw, 1.25rem)' }}
                >
                  {t.aboutP2}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ─── 3. PRÊMIO ─── */}
        <section className="min-w-full h-[100dvh] md:h-full shrink-0 md:snap-start relative flex items-center justify-center overflow-hidden bg-[#050a30]">
          <iframe
            src="https://www.youtube.com/embed/vB5FYlsGybM?autoplay=1&mute=1&loop=1&playlist=vB5FYlsGybM&controls=0&showinfo=0&rel=0&modestbranding=1&cc_load_policy=0&cc_lang_pref=pt&iv_load_policy=3&disablekb=1&fs=0&playsinline=1"
            className="absolute left-1/2 top-1/2 pointer-events-none w-[max(138vw,245lvh)] h-[max(77.6vw,138lvh)] max-w-none -translate-x-1/2 -translate-y-1/2"
            style={{ border: 'none' }}
            allow="autoplay; mute"
            title="Prêmio"
          />
          
          <div className="absolute inset-0 bg-[#050a30]/70" />
        </section>
      </div>

      <div className="flex flex-col w-full">
        {/* ─── 4. SOLUÇÕES COMPLETAS ─── */}
        <section data-nav-light className="min-w-full min-h-screen shrink-0 bg-white px-4 md:px-8 lg:px-12 flex items-center" style={{ paddingTop: 'clamp(2rem, 5vh, 5rem)', paddingBottom: 'clamp(2rem, 5vh, 5rem)' }}>
          <div className="w-full max-w-[1150px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            <div className="lg:col-span-7 flex flex-col gap-y-[0.2rem] rounded-xl">
              {t.solutions.map((item, index) => (
                <div
                  key={index}
                  className="group cursor-pointer bg-[#050a30] text-white relative h-[90px] md:h-[110px] overflow-hidden first:rounded-t-xl last:rounded-b-xl"
                  style={{ perspective: 1000 }}
                  onMouseEnter={() => setHoveredSolucao(index)}
                  onMouseLeave={() => setHoveredSolucao(null)}
                >
                  <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Front Face: Title */}
                    <motion.div
                      className="absolute inset-0 flex items-center px-4 md:px-6"
                      initial={{ rotateX: 0, y: 0, opacity: 1 }}
                      animate={hoveredSolucao === index ? { rotateX: -90, y: -40, opacity: 0 } : { rotateX: 0, y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: 'center', backfaceVisibility: 'hidden' }}
                    >
                      <h3
                        className="font-bold uppercase tracking-tight text-balance"
                        style={{ fontFamily: 'Aileron, sans-serif', fontSize: 'clamp(1rem, 1.7vw, 1.8rem)' }}
                      >
                        {item.title}
                      </h3>
                    </motion.div>

                    {/* Bottom Face: Description */}
                    <motion.div
                      className="absolute inset-0 flex items-center px-4 md:px-6"
                      initial={{ rotateX: 90, y: 40, opacity: 0 }}
                      animate={hoveredSolucao === index ? { rotateX: 0, y: 0, opacity: 1 } : { rotateX: 90, y: 40, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: 'center', backfaceVisibility: 'hidden' }}
                    >
                      <p className="leading-relaxed opacity-90" style={{ fontFamily: 'Aileron, sans-serif', fontSize: 'clamp(0.85rem, 1.2vw, 1.1rem)' }}>
                        {item.text}
                      </p>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center pl-0 lg:pl-6 [container-type:inline-size]">
              <h2 className="leading-none tracking-tight text-[#050a30] flex flex-col gap-1 md:gap-2 uppercase" style={{ marginBottom: 'clamp(0.75rem, 2vh, 1.5rem)' }}>
                {/* nowrap + teto em cqi: cada linha é uma palavra só e a fonte
                    encolhe junto com a coluna, então nenhum idioma quebra em
                    duas linhas por mais estreita que fique a tela. Os tetos
                    diferem porque as duas fontes têm larguras por caractere
                    diferentes (Aileron 900 é bem mais larga que Tan Pearl). */}
                <span className="whitespace-nowrap" style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900, fontSize: 'min(clamp(2rem, 4vw, 4.5rem), 11cqi)' }}>{t.solutionsTitleTop}</span>
                <span className="whitespace-nowrap" style={{ fontFamily: '"Tan Pearl", serif', fontWeight: 'normal', fontSize: 'min(clamp(1.5rem, 3vw, 3.4rem), 9.5cqi)' }}>{t.solutionsTitleBottom}</span>
              </h2>
              <p className="text-gray-800 leading-snug font-medium max-w-[420px]" style={{ fontFamily: 'Aileron, sans-serif', fontSize: 'clamp(0.82rem, 1.22vw, 1.17rem)' }}>
                {t.solutionsText}
              </p>
              <Link
                href={href('contato', locale)}
                className="inline-flex items-center justify-center px-6 py-3 mt-4 rounded-full text-sm font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] w-fit shadow-md"
                style={{ backgroundColor: '#c51618', color: '#ffffff', fontFamily: 'Aileron, sans-serif' }}
              >
                {dict.common.contactCta}
              </Link>
            </div>

          </div>
        </section>

        {/* ─── 5. BRINDAMOS ─── */}
        <section className="min-w-full min-h-[50vh] shrink-0 bg-[#050a30] flex flex-col justify-center overflow-hidden" style={{ paddingBottom: 'clamp(2rem, 4vh, 6rem)' }}>
          <div className="w-full max-w-[1100px] mx-auto flex flex-col items-start px-4 md:px-8" style={{ paddingTop: 'clamp(4rem, 8vh, 6rem)', paddingBottom: 'clamp(2rem, 4vh, 4rem)' }}>
            <h2 
              className="text-white mb-4 tracking-tight uppercase"
              style={{ fontFamily: '"Tan Pearl", serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              {t.toastTitle}
            </h2>
            <div className="ml-0 md:ml-8 max-w-lg">
              <p className="text-white leading-relaxed font-medium" style={{ fontFamily: 'Aileron, sans-serif', fontSize: 'clamp(1rem, 1.6vw, 1.5rem)' }}>
                {t.toastText}
                <br />
                {t.toastText2}
              </p>
            </div>
          </div>

          <div data-nav-light className="w-full bg-[#F2EFE7] py-6 md:py-8 relative flex items-center">
            <div className="flex w-max animate-marquee items-center">
              <div className="flex gap-0 md:gap-0 pr-0 md:pr-0 items-center">
                {[...clients, ...clients].map((client, idx) => (
                  <div key={`set1-${idx}`} className="h-40 md:h-56 w-[250px] md:w-[350px] -mt-[20px] md:-mt-[40px] -mb-[20px] md:-mb-[40px] flex-shrink-0 flex items-center justify-center">
                    <div
                      role="img"
                      aria-label={client.name}
                      className="max-h-full max-w-full w-full h-full opacity-85 hover:opacity-100 transition-opacity duration-300"
                      style={{
                        backgroundColor: '#050a30',
                        WebkitMaskImage: `url(${client.logo})`,
                        maskImage: `url(${client.logo})`,
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskPosition: 'center',
                        WebkitMaskSize: client.scale ?? 'contain',
                        maskSize: client.scale ?? 'contain',
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-0 md:gap-0 pr-0 md:pr-0 items-center">
                {[...clients, ...clients].map((client, idx) => (
                  <div key={`set2-${idx}`} className="h-40 md:h-56 w-[250px] md:w-[350px] -mt-[20px] md:-mt-[40px] -mb-[20px] md:-mb-[40px] flex-shrink-0 flex items-center justify-center">
                    <div
                      role="img"
                      aria-label={client.name}
                      className="max-h-full max-w-full w-full h-full opacity-85 hover:opacity-100 transition-opacity duration-300"
                      style={{
                        backgroundColor: '#050a30',
                        WebkitMaskImage: `url(${client.logo})`,
                        maskImage: `url(${client.logo})`,
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskPosition: 'center',
                        WebkitMaskSize: client.scale ?? 'contain',
                        maskSize: client.scale ?? 'contain',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. UM BRINDE E BONS NEGÓCIOS ─── */}
        <section ref={videosSectionRef} className="min-w-full shrink-0 bg-[#050a30] px-4 md:px-8" style={{ paddingTop: 'clamp(4rem, 10vh, 10rem)', paddingBottom: 'clamp(4rem, 10vh, 10rem)' }}>
          <div className="relative w-full">
            <div className="flex flex-col md:flex-row justify-center items-end gap-2 md:gap-3">
              <motion.div
                style={{ opacity: v1Opacity, x: v1X }}
                className="w-full md:w-[260px] relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#050a30] shadow-2xl"
              >
                <ClickableVideo videoId={videoItems[0].id} title={videoItems[0].title} closeLabel={dict.common.close} />
              </motion.div>

              <motion.div
                style={{ opacity: v2Opacity, x: v2X }}
                className="w-full md:w-[260px] relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#050a30] shadow-2xl"
              >
                <ClickableVideo videoId={videoItems[1].id} title={videoItems[1].title} closeLabel={dict.common.close} />
              </motion.div>

              <motion.div
                style={{ opacity: v3Opacity, x: v3X }}
                className="w-full md:w-[260px] relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#050a30] shadow-2xl"
              >
                <ClickableVideo videoId={videoItems[2].id} title={videoItems[2].title} closeLabel={dict.common.close} />
              </motion.div>
            </div>

            <motion.div
              style={{ opacity: logoOpacity, x: logoX }}
              className="hidden md:block md:absolute md:left-[calc(50%+426px)] md:bottom-0 md:w-[260px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://res.cloudinary.com/dyezpmorm/image/upload/v1781110698/Logos_vf20x8.png"
                alt="Brinde"
                className="w-full max-w-[280px] object-contain"
              />
            </motion.div>

            <div className="md:hidden flex justify-center mt-3">
              <motion.div style={{ opacity: logoOpacity, x: logoX }} className="w-[180px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://res.cloudinary.com/dyezpmorm/image/upload/v1781110698/Logos_vf20x8.png"
                  alt="Brinde"
                  className="w-full object-contain"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
