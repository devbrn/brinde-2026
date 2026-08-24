'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { href, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

type PerfNode = {
  label: string;
  angle: number; // degrees, 0 = top, clockwise
  description: string;
  descAlign: 'left' | 'right' | 'center';
};

function PerfNodeItem({
  node,
  rowIndex,
  totalRows,
  progress,
  startProgress,
  endProgress,
}: {
  node: PerfNode;
  rowIndex: number;
  totalRows: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  startProgress: number;
  endProgress: number;
}) {
  const span = endProgress - startProgress;
  const perRow = span / totalRows;
  const a = startProgress + rowIndex * perRow;
  // Overlap longo deixa a entrada suave, mas o fim é limitado a endProgress
  // para que todas as bolinhas cheguem a 100% dentro do range previsto.
  const b = Math.min(a + perRow * 2.2, endProgress);

  const opacity = useTransform(progress, [a, b], [0, 1]);
  const blur = useTransform(progress, [a, b], [10, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  const rad = ((node.angle - 90) * Math.PI) / 180;
  const radiusPct = 34;
  const x = 50 + radiusPct * Math.cos(rad);
  const y = 50 + radiusPct * Math.sin(rad);

  // Description: keep same Y, push horizontally just past the circle edge
  const circleHalfPct = 6; // ~half bolinha width relative to container
  const gapPct = 1;
  const dx =
    node.descAlign === 'right'
      ? x - circleHalfPct - gapPct
      : node.descAlign === 'left'
      ? x + circleHalfPct + gapPct
      : x;
  const dy = y;

  return (
    <>
      <motion.div
        style={{
          opacity,
          filter,
          left: `${x}%`,
          top: `${y}%`,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-[84px] h-[84px] md:w-[140px] md:h-[140px] rounded-full bg-[#050a30] flex items-center justify-center text-center px-2 z-20"
      >
        <span
          className="text-[#fff8d6] text-[10px] md:text-sm font-bold whitespace-pre-line leading-tight"
          style={{ fontFamily: 'Aileron, sans-serif' }}
        >
          {node.label}
        </span>
      </motion.div>

      <motion.div
        style={{
          opacity,
          filter,
          left: node.descAlign === 'center' ? `${x}%` : `${dx}%`,
          top: node.descAlign === 'center' ? `${y - 12}%` : `${dy}%`,
          textAlign: node.descAlign,
        }}
        className={`absolute w-[260px] md:w-[280px] hidden md:block z-10 ${
          node.descAlign === 'center'
            ? '-translate-x-1/2 -translate-y-full'
            : node.descAlign === 'right'
            ? '-translate-y-1/2'
            : '-translate-y-1/2 -translate-x-full'
        }`}
      >
        <p
          className="text-xs md:text-sm text-gray-800 whitespace-pre-line leading-snug"
          style={{ fontFamily: 'Aileron, sans-serif' }}
        >
          {node.description}
        </p>
      </motion.div>
    </>
  );
}

function SpecialMidiOffNodeItem({
  node,
  progress,
  logoTranslateY,
  logoScale,
  logoOpacity,
  textOpacity,
  descOpacity,
}: {
  node: PerfNode;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  logoTranslateY: any;
  logoScale: any;
  logoOpacity: any;
  textOpacity: any;
  descOpacity: any;
}) {
  const rad = ((node.angle - 90) * Math.PI) / 180;
  const radiusPct = 34;
  const x = 50 + radiusPct * Math.cos(rad);
  const y = 50 + radiusPct * Math.sin(rad);

  return (
    <>
      <motion.div
        style={{
          left: `${x}%`,
          top: `${y}%`,
          y: logoTranslateY,
          scale: logoScale,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-[84px] h-[84px] md:w-[140px] md:h-[140px] rounded-full bg-[#050a30] flex items-center justify-center text-center px-2 z-20 shadow-lg"
      >
        {/* Logo image (visible initially) */}
        <motion.div
          style={{ opacity: logoOpacity }}
          className="absolute inset-0 flex items-center justify-center px-4 md:px-5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://res.cloudinary.com/dyezpmorm/image/upload/v1780502461/Site-Brinde-LOGO-1024x316_xtnbj8.webp"
            alt="Brinde"
            className="h-4 md:h-7 w-auto max-w-full object-contain"
          />
        </motion.div>

        {/* Node text (visible at the end) */}
        <motion.span
          style={{ opacity: textOpacity, fontFamily: 'Aileron, sans-serif' }}
          className="text-[#fff8d6] text-[10px] md:text-sm font-bold whitespace-pre-line leading-tight absolute inset-0 flex items-center justify-center px-1 md:px-2"
        >
          {node.label}
        </motion.span>
      </motion.div>

      {/* Description text (visible at the end) */}
      <motion.div
        style={{
          opacity: descOpacity,
          left: `${x}%`,
          top: `${y - 12}%`,
          textAlign: 'center',
        }}
        className="absolute w-[260px] md:w-[280px] hidden md:block z-10 -translate-x-1/2 -translate-y-full"
      >
        <p
          className="text-xs md:text-sm text-gray-800 whitespace-pre-line leading-snug"
          style={{ fontFamily: 'Aileron, sans-serif' }}
        >
          {node.description}
        </p>
      </motion.div>
    </>
  );
}

const perfNodeLayouts: Omit<PerfNode, 'label' | 'description'>[] = [
  { angle: 0, descAlign: 'center' },
  { angle: 51, descAlign: 'right' },
  { angle: 103, descAlign: 'right' },
  { angle: 154, descAlign: 'right' },
  { angle: 206, descAlign: 'left' },
  { angle: 257, descAlign: 'left' },
  { angle: 309, descAlign: 'left' },
];



export function AboutPage({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.about;
  const perfNodes: PerfNode[] = perfNodeLayouts.map((layout, i) => ({
    ...layout,
    ...t.perfNodes[i],
  }));
  const heroRef = useRef<HTMLElement>(null);

  // Bloco "Um Brinde e Bons Negócios" + vídeo
  const brindeRef = useRef<HTMLElement>(null);
  const { scrollYProgress: brindeProgress } = useScroll({
    target: brindeRef,
    offset: ['start end', 'end start'],
  });
  const titleOpacity = useTransform(brindeProgress, [0.05, 0.3], [0, 1]);
  const titleScale = useTransform(brindeProgress, [0.05, 0.3], [0.85, 1]);
  const paraOpacity = useTransform(brindeProgress, [0.15, 0.4], [0, 1]);
  const paraY = useTransform(brindeProgress, [0.15, 0.4], [40, 0]);

  // Planejamos e Executamos (pg 11)
  const planRef = useRef<HTMLElement>(null);
  const { scrollYProgress: planProgress } = useScroll({
    target: planRef,
    offset: ['start end', 'end start'],
  });
  const leftImgOpacity = useTransform(planProgress, [0.05, 0.28, 0.7, 0.85], [0, 1, 1, 0]);
  const leftImgX = useTransform(planProgress, [0.05, 0.28], [-200, 0]);
  const rightImgOpacity = useTransform(planProgress, [0.05, 0.28, 0.7, 0.85], [0, 1, 1, 0]);
  const rightImgX = useTransform(planProgress, [0.05, 0.28], [200, 0]);
  const headlineOpacity = useTransform(planProgress, [0.15, 0.35], [0, 1]);
  const headlineY = useTransform(planProgress, [0.15, 0.35], [40, 0]);
  const onOpacity = useTransform(planProgress, [0.22, 0.40], [0, 1]);
  const onY = useTransform(planProgress, [0.22, 0.40], [40, 0]);
  const offOpacity = useTransform(planProgress, [0.28, 0.45], [0, 1]);
  const offY = useTransform(planProgress, [0.28, 0.45], [40, 0]);
  const logoMarkOpacity = useTransform(planProgress, [0.35, 0.50], [0, 1]);
  const logoMarkScale = useTransform(planProgress, [0.35, 0.50], [0.6, 1]);

  // Performance (pg 12)
  // Triggers when section fully visible (~0.4 = centered)
  const perfRef = useRef<HTMLElement>(null);
  const { scrollYProgress: perfProgress } = useScroll({
    target: perfRef,
    offset: ['start end', 'end start'],
  });
  // Sequence finishes by ~0.5 (section ~100% visible)
  const [hoveredFase, setHoveredFase] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const perfCenterOpacity = useTransform(perfProgress, isMobile ? [0.10, 0.20] : [0.05, 0.18], [0, 1]);
  const perfCenterScale = useTransform(perfProgress, isMobile ? [0.10, 0.20] : [0.05, 0.18], [0.92, 1]);
  const perfRingOpacity = useTransform(perfProgress, isMobile ? [0.10, 0.20] : [0.08, 0.20], [0, 1]);

  // No mobile a descida da primeira bolinha começa mais tarde e todo o
  // conjunto fecha mais cedo, para tudo estar 100% visível antes do meio da tela.
  const dropStart = isMobile ? 0.08 : 0.01;
  const dropEnd = isMobile ? 0.18 : 0.20;

  const logoTranslateY = useTransform(
    perfProgress,
    [dropStart, dropEnd],
    [isMobile ? -210 : -380, 0]
  );
  const logoScale = useTransform(perfProgress, [dropStart, dropEnd], [0.8, 1.0]);
  const logoOpacity = useTransform(
    perfProgress,
    [dropStart, dropStart + (dropEnd - dropStart) * 0.45],
    [1, 0]
  );
  const textOpacity = useTransform(perfProgress, isMobile ? [0.14, 0.20] : [0.08, 0.20], [0, 1]);
  const descOpacity = useTransform(perfProgress, isMobile ? [0.16, 0.22] : [0.18, 0.30], [0, 1]);

  // Método Brinde (pg 13)
  const metodoRef = useRef<HTMLElement>(null);
  const { scrollYProgress: metodoProgress } = useScroll({
    target: metodoRef,
    offset: ['start end', 'end start'],
  });
  const metodoBtnOpacity = useTransform(metodoProgress, [0.1, 0.3], [0, 1]);
  const metodoBtnY = useTransform(metodoProgress, [0.1, 0.3], [30, 0]);
  const metodoTitleOpacity = useTransform(metodoProgress, [0.2, 0.45], [0, 1]);
  const metodoTitleY = useTransform(metodoProgress, [0.2, 0.45], [40, 0]);
  const metodoTextOpacity = useTransform(metodoProgress, [0.35, 0.55], [0, 1]);
  const metodoTextY = useTransform(metodoProgress, [0.35, 0.55], [30, 0]);

  // Menos Ruído (pg 14)
  const ruidoRef = useRef<HTMLElement>(null);
  const { scrollYProgress: ruidoProgress } = useScroll({
    target: ruidoRef,
    offset: ['start end', 'end start'],
  });
  const ruidoTitleOpacity = useTransform(ruidoProgress, [0.15, 0.4], [0, 1]);
  const ruidoTitleY = useTransform(ruidoProgress, [0.15, 0.4], [40, 0]);
  const ruidoTextOpacity = useTransform(ruidoProgress, [0.3, 0.55], [0, 1]);
  const ruidoTextY = useTransform(ruidoProgress, [0.3, 0.55], [30, 0]);

  return (
    <div className="pt-20 bg-white text-[#050a30]" data-nav-light>
      {/* ─── HERO (pg 8) ─── */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } },
        }}
        className="bg-white pt-20 md:pt-28 pb-10 px-6 md:px-12"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-14 md:mb-20">
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="uppercase tracking-tight text-[#050a30] text-[1.8rem] sm:text-[2.4rem] md:text-[3rem] lg:text-[3.6rem] leading-[1.05]"
            >
              <span style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900 }}>
                {t.heroTitle[0]}{' '}
              </span>
              <span style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900 }}>
                {t.heroTitle[1]}{' '}
              </span>
              <span style={{ fontFamily: '"Tan Pearl", serif', fontWeight: 'normal' }}>
                {t.heroTitle[2]}{' '}
              </span>
              <span style={{ fontFamily: '"Tan Pearl", serif', fontWeight: 'normal' }}>
                {t.heroTitle[3]}
              </span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="text-xl md:text-2xl lg:text-3xl text-gray-800 leading-relaxed self-center"
              style={{ fontFamily: 'Aileron, sans-serif' }}
            >
              {t.heroTextBefore}
              <span className="font-bold text-[#050a30]">{t.heroTextBold}</span>.
            </motion.p>
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="w-full"
          >
            {/* ─── Mobile: cards empilhados ───
                A tabela de 3 colunas não cabe em 390px, e esconder "Desenvolvimento"
                (o conteúdo mais rico) deixava "Foco" solto num espaço vazio.
                Aqui o número vira marcador lateral e as 3 informações empilham. */}
            <div className="flex flex-col gap-3 md:hidden">
              {t.phases.map((fase) => (
                <div
                  key={fase.numero}
                  className="flex gap-4 rounded-xl border border-[#050a30]/10 bg-[#050a30]/[0.03] p-4"
                >
                  <span
                    className="shrink-0 text-2xl font-bold leading-none text-[#050a30]/25"
                    style={{ fontFamily: 'Aileron, sans-serif' }}
                  >
                    {fase.numero}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span
                      className="text-lg font-black uppercase leading-tight tracking-tight text-[#050a30]"
                      style={{ fontFamily: 'Aileron, sans-serif' }}
                    >
                      {fase.foco}
                    </span>
                    <span
                      className="text-sm leading-relaxed text-gray-600"
                      style={{ fontFamily: 'Aileron, sans-serif' }}
                    >
                      {fase.desenvolvimento}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* ─── Desktop: tabela original ─── */}
            <div className="hidden md:block">
              <div className="grid grid-cols-[4rem_1fr_2fr] gap-x-4 pb-2 border-b border-[#050a30]/20 text-sm uppercase tracking-wide text-gray-500" style={{ fontFamily: 'Aileron, sans-serif' }}>
                <span>{t.phasesHeader.phase}</span>
                <span className="text-left">{t.phasesHeader.focus}</span>
                <span className="text-right">{t.phasesHeader.development}</span>
              </div>

              {t.phases.map((fase, index) => {
                const isActive = hoveredFase === index;
                return (
                  <div
                    key={fase.numero}
                    onMouseEnter={() => setHoveredFase(index)}
                    onMouseLeave={() => setHoveredFase(null)}
                    className={`grid grid-cols-[4rem_1fr_2fr] gap-x-4 items-center px-2 py-5 cursor-pointer transition-colors duration-300 border-b border-[#050a30]/10 last:border-b-0 ${
                      isActive ? 'bg-[#050a30]' : 'bg-transparent'
                    }`}
                  >
                    <span
                      className={`font-bold text-lg ${isActive ? 'text-[#fff8d6]' : 'text-[#050a30]'}`}
                      style={{ fontFamily: 'Aileron, sans-serif' }}
                    >
                      {fase.numero}
                    </span>
                    <span
                      className={`font-black text-left text-2xl uppercase tracking-tight ${isActive ? 'text-white' : 'text-[#050a30]'}`}
                      style={{ fontFamily: 'Aileron, sans-serif' }}
                    >
                      {fase.foco}
                    </span>
                    <span
                      className={`text-right text-base ${isActive ? 'text-[#fff8d6] font-bold' : 'text-gray-600'}`}
                      style={{ fontFamily: 'Aileron, sans-serif' }}
                    >
                      {fase.desenvolvimento}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ─── UM BRINDE E BONS NEGÓCIOS (pg 9) ─── */}
      <section ref={brindeRef} className="bg-white pt-0 pb-16 md:pb-24 px-6 md:px-12 overflow-hidden">
        {/* Vídeo em banner largo (~3.6:1), full-bleed: as margens negativas
            anulam o px da section para ocupar 100% da largura da viewport.
            O player do YouTube é sempre 16:9, então dimensionamos o iframe pela
            largura e cortamos as faixas pretas de cima/baixo com overflow-hidden. */}
        <div
          className="relative overflow-hidden mb-12 -mx-6 md:-mx-12"
          style={{ aspectRatio: '1280 / 356' }}
        >
          <iframe
            src="https://www.youtube.com/embed/KqF21BljIVo?autoplay=1&mute=1&loop=1&playlist=KqF21BljIVo&controls=0&showinfo=0&rel=0&modestbranding=1&cc_load_policy=0&cc_lang_pref=pt&iv_load_policy=3&disablekb=1&fs=0&playsinline=1&vq=hd1080&hd=1"
            className="absolute left-1/2 top-1/2 pointer-events-none w-full h-[calc(100%*1280/356*9/16)] max-w-none -translate-x-1/2 -translate-y-1/2"
            style={{ border: 'none' }}
            allow="autoplay; mute"
            title={`${t.toastTitle[0]} ${t.toastTitle[1]}`}
          />
        </div>

        <div className="max-w-[1400px] mx-auto">
          <motion.h2
            style={{ opacity: titleOpacity, scale: titleScale }}
            className="text-center text-[1.8rem] sm:text-[2.6rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[1.4] uppercase text-[#050a30] mb-12"
          >
            <span style={{ fontFamily: '"Tan Pearl", serif' }}>
              {t.toastTitle[0]}<br />
              {t.toastTitle[1]}
            </span>
          </motion.h2>

          <motion.p
            style={{ opacity: paraOpacity, y: paraY }}
            className="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed max-w-[1200px] mx-auto mb-16 text-center"
          >
            <span style={{ fontFamily: 'Aileron, sans-serif' }}>
              {t.toastP1}
              <br />
              <br />
              {t.toastP2}
              <br />
              <br />
              {t.toastP3}
            </span>
          </motion.p>
        </div>

      </section>

      {/* ─── FOTOS FIXAS (overlay) ─── */}
      <div className="hidden md:block fixed inset-0 pointer-events-none z-30">
        {/* Imagem esquerda */}
        <motion.div
          style={{ opacity: leftImgOpacity, x: leftImgX }}
          className="absolute -left-[20%] md:left-0 top-[22%] md:top-1/2 -translate-y-1/2 w-[30%] md:w-[24%] lg:w-[22%] select-none opacity-90 md:opacity-100"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://res.cloudinary.com/dyezpmorm/image/upload/v1781110899/1_vdykwp.webp"
            alt="Online"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* Imagem direita */}
        <motion.div
          style={{ opacity: rightImgOpacity, x: rightImgX }}
          className="absolute -right-[20%] md:right-0 top-[22%] md:top-1/2 -translate-y-1/2 w-[30%] md:w-[24%] lg:w-[22%] select-none opacity-90 md:opacity-100"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://res.cloudinary.com/dyezpmorm/image/upload/v1781110899/2_gvnnte.webp"
            alt="Offline"
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </div>

      {/* ─── PLANEJAMOS E EXECUTAMOS (pg 11) ─── */}
      <section ref={planRef} className="relative bg-white pt-10 pb-16 md:py-32">
        <div className="relative z-10 w-full flex flex-col items-center text-center gap-8 md:gap-20">
          <motion.h2
            style={{ opacity: headlineOpacity, y: headlineY }}
            className="text-[1.8rem] sm:text-[2.4rem] md:text-[3rem] lg:text-[3.5rem] leading-tight uppercase text-[#050a30]"
            data-aileron
          >
            <span style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900 }}>
              {t.planTitle[0]}<br />{t.planTitle[1]}
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-[600px] mx-auto px-6 md:px-0">
            <motion.div
              style={{ opacity: onOpacity, y: onY }}
              className="flex flex-col items-center text-center md:items-end md:text-right gap-2"
            >
              <h3 className="text-[2.8rem] md:text-[3.9rem] lg:text-[4.6rem] leading-none">
                <span style={{ fontFamily: '"Tan Pearl", serif', color: '#050a30' }}>{t.onlinePrefix}</span>
                <span className="block text-[3.4rem] md:text-[4.6rem] lg:text-[5.4rem] uppercase -mt-2" style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900 }}>
                  {t.onlineSuffix}
                </span>
              </h3>
              <p className="text-sm md:text-base text-gray-700 max-w-[280px]" style={{ fontFamily: 'Aileron, sans-serif' }}>
                {t.onlineText}
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: offOpacity, y: offY }}
              className="flex flex-col items-center text-center md:items-start md:text-left gap-2"
            >
              <h3 className="text-[2.8rem] md:text-[3.9rem] lg:text-[4.6rem] leading-none">
                <span style={{ fontFamily: '"Tan Pearl", serif', color: '#050a30' }}>{t.offlinePrefix}</span>
                <span className="block text-[3.4rem] md:text-[4.6rem] lg:text-[5.4rem] uppercase -mt-2" style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900 }}>
                  {t.offlineSuffix}
                </span>
              </h3>
              <p className="text-sm md:text-base text-gray-700 max-w-[280px]" style={{ fontFamily: 'Aileron, sans-serif' }}>
                {t.offlineText}
              </p>
            </motion.div>
          </div>

          {/* Placeholder div to preserve spacing, since the transitioning circle from the next section occupies this space */}
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full opacity-0 pointer-events-none" />
        </div>
      </section>

      {/* ─── PERFORMANCE (pg 12) ─── */}
      <section ref={perfRef} className="bg-white pt-4 md:pt-32 pb-0 px-6 md:px-12 relative overflow-visible">
        <div className="relative max-w-[1200px] mx-auto aspect-[1/0.78] md:aspect-square max-h-[800px]">
          {/* dashed circle */}
          <motion.div
            style={{ opacity: perfRingOpacity }}
            className="absolute inset-[22%] md:inset-[15%] rounded-full border-2 border-dashed border-[#050a30]/30"
          />

          {/* texto central */}
          <motion.div
            style={{ opacity: perfCenterOpacity, scale: perfCenterScale }}
            className="absolute inset-0 hidden md:flex flex-col items-center justify-center text-center px-[20%] z-10"
          >
            <p
              className="text-base md:text-xl lg:text-2xl text-[#050a30] leading-snug mb-2"
              style={{ fontFamily: 'Aileron, sans-serif' }}
            >
              {t.perfTitle[0]}<br />
              {t.perfTitle[1]}
            </p>
            <p
              className="text-[1.4rem] md:text-[1.8rem] lg:text-[2.4rem] text-[#050a30] leading-none"
              style={{ fontFamily: '"Tan Pearl", serif' }}
            >
              {t.perfHighlight}
            </p>
          </motion.div>

          {/* Special transitioning 'Mídia Off' node */}
          <SpecialMidiOffNodeItem
            node={perfNodes[0]}
            progress={perfProgress}
            logoTranslateY={logoTranslateY}
            logoScale={logoScale}
            logoOpacity={logoOpacity}
            textOpacity={textOpacity}
            descOpacity={descOpacity}
          />

          {/* nodes — reveal row-by-row top→bottom */}
          {(() => {
            // Exclude first node (rendered manually with the logo transition)
            const nodesToMap = perfNodes.slice(1);

            // y-position per node
            const withY = nodesToMap.map((n) => {
              const rad = ((n.angle - 90) * Math.PI) / 180;
              return { node: n, y: 50 + 34 * Math.sin(rad) };
            });
            // dedupe rows by rounded y (4-row grid)
            const sortedY = [...withY].sort((a, b) => a.y - b.y).map((w) => w.y);
            const rows: number[] = [];
            sortedY.forEach((y) => {
              if (!rows.some((r) => Math.abs(r - y) < 6)) rows.push(y);
            });
            const totalRows = rows.length;
            return withY.map((w, i) => {
              const rowIndex = rows.findIndex((r) => Math.abs(r - w.y) < 6);
              return (
                <PerfNodeItem
                  key={i}
                  node={w.node}
                  rowIndex={rowIndex}
                  totalRows={totalRows}
                  progress={perfProgress}
                  // No mobile a seção é mais alta, então o mesmo range terminava
                  // depois do meio da tela: antecipa para tudo estar 100% visível
                  // quando a seção está centralizada.
                  startProgress={isMobile ? 0.10 : 0.15}
                  endProgress={isMobile ? 0.24 : 0.40}
                />
              );
            });
          })()}
        </div>

        {/* texto central no mobile: abaixo das bolinhas, onde sobra espaço */}
        <motion.div
          style={{ opacity: perfCenterOpacity }}
          className="md:hidden mt-8 flex flex-col items-center text-center"
        >
          <p
            className="text-base text-[#050a30] leading-snug mb-1"
            style={{ fontFamily: 'Aileron, sans-serif' }}
          >
            {t.perfTitle[0]} {t.perfTitle[1]}
          </p>
          <p
            className="text-[1.8rem] text-[#050a30] leading-none"
            style={{ fontFamily: '"Tan Pearl", serif' }}
          >
            {t.perfHighlight}
          </p>
        </motion.div>

        {/* lista textos no mobile — cards 2 por linha */}
        <div className="md:hidden mt-12 max-w-[500px] mx-auto grid grid-cols-2 gap-3">
          {perfNodes.map((node, i) => (
            <motion.div
              key={i}
              style={{ opacity: perfRingOpacity }}
              className="flex flex-col rounded-xl border border-[#050a30]/10 bg-[#050a30]/[0.03] p-3"
            >
              <span
                className="font-bold text-[#050a30] text-[13px] leading-tight mb-1.5"
                style={{ fontFamily: 'Aileron, sans-serif' }}
              >
                {node.label.replace(/\n/g, ' ')}
              </span>
              <p
                className="text-[11px] leading-relaxed text-gray-700 whitespace-pre-line"
                style={{ fontFamily: 'Aileron, sans-serif' }}
              >
                {node.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── MÉTODO BRINDE (pg 13) ─── */}
      <section ref={metodoRef} className="bg-white pt-0 pb-20 md:pb-28 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-16 md:gap-24">
          {/* CTA topo centralizado */}
          <motion.div
            style={{ opacity: metodoBtnOpacity, y: metodoBtnY }}
            className="flex justify-center mt-5"
          >
            <Link
              href={href('contato', locale)}
              className="inline-flex items-center gap-3 bg-[#050a30] text-[#fff8d6] px-8 py-4 md:px-10 md:py-5 rounded-full text-lg md:text-xl font-bold hover:bg-[#050a30] transition"
              style={{ fontFamily: 'Aileron, sans-serif' }}
            >
              {dict.nav.contact}
              <span aria-hidden>↗</span>
            </Link>
          </motion.div>

          <div className="flex flex-col gap-8">
            <motion.h2
              style={{ opacity: metodoTitleOpacity, y: metodoTitleY }}
              className="uppercase tracking-tight text-[#050a30] text-[2rem] sm:text-[2.8rem] md:text-[3.6rem] lg:text-[4.5rem] leading-[1.05]"
            >
              <span style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900 }}>
                {t.methodTitleTop}
              </span>
              <br />
              <span style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900 }}>{t.methodTitleEquals}</span>
              <span style={{ fontFamily: '"Tan Pearl", serif', color: '#050a30' }}>
                {t.methodTitleHighlight}
              </span>
            </motion.h2>

            <motion.p
              style={{ opacity: metodoTextOpacity, y: metodoTextY }}
              className="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed max-w-[1200px]"
            >
              <span style={{ fontFamily: 'Aileron, sans-serif' }}>
                {t.methodText}
              </span>
            </motion.p>
          </div>
        </div>
      </section>

      {/* ─── MENOS RUÍDO, MAIS RESULTADO (pg 14) ─── */}
      <section ref={ruidoRef} className="bg-white py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col items-end text-right gap-8">
          <motion.h2
            style={{ opacity: ruidoTitleOpacity, y: ruidoTitleY }}
            className="uppercase tracking-tight text-[#050a30] text-[2rem] sm:text-[2.8rem] md:text-[3.6rem] lg:text-[4.5rem] leading-[1.05]"
          >
            <span style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900 }}>
              {t.noiseTitleTop}
            </span>
            <br />
            <span style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900 }}>{t.noiseTitleMore}</span>
            <span style={{ fontFamily: '"Tan Pearl", serif', color: '#050a30' }}>
              {t.noiseTitleHighlight}
            </span>
          </motion.h2>

          <motion.p
            style={{ opacity: ruidoTextOpacity, y: ruidoTextY }}
            className="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed max-w-[1200px]"
          >
            <span style={{ fontFamily: 'Aileron, sans-serif' }}>
              {t.noiseText}
            </span>
          </motion.p>
        </div>
      </section>

    </div>
  );
}
