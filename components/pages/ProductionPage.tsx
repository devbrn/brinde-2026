'use client';

import { motion } from 'framer-motion';
import { VideoModal } from '@/components/VideoModal';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Dictionary } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);





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


export function ProductionPage({ dict }: { dict: Dictionary }) {
  const t = dict.production;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [hoveredSolucao, setHoveredSolucao] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [loadedVideo, setLoadedVideo] = useState<number | null>(null);

  const videosWrapperRef = useRef<HTMLDivElement>(null);
  const videosSectionRef = useRef<HTMLElement>(null);

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

      tl.to(track, {
        x: getScrollAmount,
        ease: 'none',
        duration: 10,
      });

      return () => {
        wrapper.style.height = '';
      };
    });

    mm.add('(min-width: 1024px)', () => {
      const wrapper = videosWrapperRef.current;
      const section = videosSectionRef.current;
      if (!wrapper || !section) return;
      const cards = section.querySelectorAll('[data-video-card]');

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

      cards.forEach((card, i) => {
        tl.fromTo(
          card,
          { opacity: 0, filter: 'blur(24px)' },
          { opacity: 1, filter: 'blur(0px)', ease: 'none', duration: 1 },
          i * 0.4
        );
      });

      return () => {
        wrapper.style.height = '';
        gsap.set(cards, { clearProps: 'all' });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="bg-[#050a30] min-h-screen w-full">

      <div ref={wrapperRef} className="relative">
        <div
          ref={sectionRef}
          className="sticky top-0 h-[100dvh] overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar lg:overflow-hidden lg:snap-none"
        >
          <div ref={trackRef} className="flex h-full w-max">
        {/* ─── 1. HERO ─── */}
        <section className="w-screen h-full shrink-0 snap-start relative flex items-center justify-center overflow-hidden bg-[#050a30]">
          {/* Iframe não aceita object-cover: dimensionamos em 16:9 pelo lado maior
              da viewport, cobrindo a tela inteira sem faixas. O scale empurra a
              moldura preta do player para fora — overflow-hidden corta o excedente. */}
          <iframe
            src="https://www.youtube.com/embed/gasN44w-zHg?autoplay=1&mute=1&loop=1&playlist=gasN44w-zHg&controls=0&showinfo=0&rel=0&modestbranding=1&cc_load_policy=0&cc_lang_pref=pt&iv_load_policy=3&disablekb=1&fs=0&playsinline=1"
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
              style={{ fontFamily: 'Aileron, sans-serif', fontSize: 'clamp(2rem, 6.6vw, 7.2rem)' }}
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
        <section className="w-screen h-full shrink-0 snap-start overflow-hidden bg-white py-16 px-6 md:px-12" data-nav-light>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full max-w-[1500px] mx-auto h-full flex flex-col justify-center"
          >
            <h2 className="mb-16 uppercase tracking-tight text-[#050a30] flex flex-col gap-2 md:gap-3">
              <div className="flex flex-wrap items-baseline gap-x-2 md:gap-x-4 text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-[3.5rem] leading-none">
                <motion.span variants={fadeUp} className="text-[1.3em]" style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 800 }}>{t.aboutTitle[0]}</motion.span>
                <motion.span variants={fadeUp} style={{ fontFamily: '"Tan Pearl", serif', fontWeight: 'normal' }}>{t.aboutTitle[1]}</motion.span>
                <motion.span variants={fadeUp} className="text-[1.3em]" style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 800 }}>{t.aboutTitle[2]}</motion.span>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-2 md:gap-x-4 text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-[3.5rem] leading-none">
                <motion.span variants={fadeUp} style={{ fontFamily: '"Tan Pearl", serif', fontWeight: 'normal' }}>{t.aboutTitle[3]}</motion.span>
                <motion.span variants={fadeUp} className="text-[1.3em]" style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 800 }}>{t.aboutTitle[4]}</motion.span>
              </div>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 lg:gap-24">
              <motion.div variants={fadeUp} className="md:col-span-7">
                <p
                  className="text-2xl md:text-3xl lg:text-4xl text-[#050a30] leading-snug font-medium"
                  style={{ fontFamily: 'Aileron, sans-serif' }}
                >
                  {t.aboutLead}
                </p>
              </motion.div>
              <div className="md:col-span-5 flex flex-col gap-6 lg:gap-8 justify-start pt-2">
                <motion.p
                  variants={fadeUp}
                  className="text-lg md:text-xl text-gray-800 leading-relaxed"
                  style={{ fontFamily: 'Aileron, sans-serif' }}
                >
                  {t.aboutP1}
                </motion.p>
                <motion.p
                  variants={fadeUp}
                  className="text-lg md:text-xl text-gray-800 leading-relaxed"
                  style={{ fontFamily: 'Aileron, sans-serif' }}
                >
                  {t.aboutP2}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ─── 3. PRÊMIO ─── */}
        <section className="w-screen h-full shrink-0 snap-start relative flex items-center justify-center overflow-hidden bg-[#050a30]">
          <iframe
            src="https://www.youtube.com/embed/h4bOPkceXR0?autoplay=1&mute=1&loop=1&playlist=h4bOPkceXR0&controls=0&showinfo=0&rel=0&modestbranding=1&cc_load_policy=0&cc_lang_pref=pt&iv_load_policy=3&disablekb=1&fs=0&playsinline=1"
            className="absolute left-1/2 top-1/2 pointer-events-none w-[max(138vw,245lvh)] h-[max(77.6vw,138lvh)] max-w-none -translate-x-1/2 -translate-y-1/2"
            style={{ border: 'none' }}
            allow="autoplay; mute"
            title={dict.award.videoTitle}
          />
          
          <div className="absolute inset-0 bg-[#050a30]/70" />
        </section>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full">
        {/* ─── 4. SOLUÇÕES COMPLETAS ─── */}
        <section className="min-w-full min-h-screen shrink-0 bg-white py-20 px-6 md:px-12 flex items-center" data-nav-light>
          <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Side: Items */}
            <div className="lg:col-span-7 flex flex-col gap-y-[0.2rem] rounded-xl">
              {t.services.map((item, index) => (
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
                      className="absolute inset-0 flex items-center px-6 md:px-8"
                      initial={{ rotateX: 0, y: 0, opacity: 1 }}
                      animate={hoveredSolucao === index ? { rotateX: -90, y: -40, opacity: 0 } : { rotateX: 0, y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: 'center', backfaceVisibility: 'hidden' }}
                    >
                      <h3
                        className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight"
                        style={{ fontFamily: 'Aileron, sans-serif' }}
                      >
                        {item.title}
                      </h3>
                    </motion.div>

                    {/* Bottom Face: Description */}
                    <motion.div
                      className="absolute inset-0 flex items-center px-6 md:px-8"
                      initial={{ rotateX: 90, y: 40, opacity: 0 }}
                      animate={hoveredSolucao === index ? { rotateX: 0, y: 0, opacity: 1 } : { rotateX: 90, y: 40, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: 'center', backfaceVisibility: 'hidden' }}
                    >
                      <p className="text-sm md:text-base leading-relaxed opacity-90" style={{ fontFamily: 'Aileron, sans-serif' }}>
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side: Static Text */}
            <div className="lg:col-span-5 flex flex-col justify-center pl-0 lg:pl-8 [container-type:inline-size]">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] leading-none mb-6 tracking-tight text-[#050a30] flex flex-col gap-1 md:gap-2 uppercase">
                {/* nowrap + teto em cqi: a fonte encolhe com a coluna em vez de
                    partir a palavra ("CREAMO\nS" em espanhol). Tetos distintos
                    porque Aileron 900 é bem mais larga que Tan Pearl. */}
                <span className="text-[1.4em] whitespace-nowrap" style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900, fontSize: 'min(1.4em, 13cqi)' }}>{t.desireTitleTop}</span>
                <span className="text-[1.4em] whitespace-nowrap" style={{ fontFamily: '"Tan Pearl", serif', fontWeight: 'normal', fontSize: 'min(1.4em, 15cqi)' }}>{t.desireTitleBottom}</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-800 leading-snug font-medium" style={{ fontFamily: 'Aileron, sans-serif' }}>
                {t.desireText}
              </p>
            </div>

          </div>
        </section>

        {/* ─── 6. VÍDEOS ─── */}
        <div ref={videosWrapperRef} className="relative">
          <section ref={videosSectionRef} className="sticky top-0 h-screen min-w-full shrink-0 bg-[#050a30] flex items-center px-6 md:px-12 overflow-hidden">
            <div className="w-full max-w-[1300px] mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-center justify-items-center">
                {(['48Tg9kbDKyI', 'b5ljyLD58Z0', 'kx9ldjEWszQ', '7xYsQq9V0Cc'] as const).map((videoId, i) => (
                  <div
                    key={i}
                    data-video-card
                    onClick={() => activeVideo !== i && setActiveVideo(i)}
                    className="relative aspect-[9/16] w-full max-w-[45vw] md:max-w-[280px] rounded-2xl overflow-hidden bg-[#050a30] shadow-2xl cursor-pointer group"
                  >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                    alt={`${t.videoLabel} ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {loadedVideo !== i && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="white" className="drop-shadow-lg">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                  {activeVideo === i && (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                      className="absolute inset-0 w-full h-full transition-opacity duration-300"
                      style={{ border: 'none', opacity: loadedVideo === i ? 1 : 0 }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={`${t.videoLabel} ${i + 1}`}
                      onLoad={() => setLoadedVideo(i)}
                    />
                  )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
