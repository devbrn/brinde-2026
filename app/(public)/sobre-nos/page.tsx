'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

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
  const b = a + perRow * 2.2; // long overlap = smooth

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
        className="absolute -translate-x-1/2 -translate-y-1/2 w-[110px] h-[110px] md:w-[140px] md:h-[140px] rounded-full bg-[#050a30] flex items-center justify-center text-center px-2 z-20"
      >
        <span
          className="text-[#fff8d6] text-xs md:text-sm font-bold whitespace-pre-line leading-tight"
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

const perfNodes: PerfNode[] = [
  { label: 'Mídia Off', angle: 0, description: 'Jingle\nOOH\nEvento Corporativo', descAlign: 'center' },
  { label: 'CRM', angle: 51, description: 'Implementação e\nestruturação', descAlign: 'right' },
  { label: 'Estratégia e\nPlanejamento', angle: 103, description: 'Analise de dados\nKPI e OKR definidos\nAprendizado contínuo\nFoco em eficiência e ROI', descAlign: 'right' },
  { label: 'Branding e\nIdentidade de\nMarca', angle: 154, description: 'Visão da marca\nValores da marca\nPosicionamento\nIdentidade da marca', descAlign: 'right' },
  { label: 'Conteúdo\ne Social', angle: 206, description: 'Storytelling\nSocial Ads\nEditorial\nInsights e métricas', descAlign: 'left' },
  { label: 'Criatividade\ne Design', angle: 257, description: 'Conceitos Criativos\nDesign Gráfico\nAudiovisual\nMotion Design', descAlign: 'left' },
  { label: 'Mídia On', angle: 309, description: 'Google ADS\nLinkedin ADS\nMeta ADS\nTiktok ADS\nGoogle Search\nMonitoramento', descAlign: 'left' },
];

export default function SobreNos() {
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
  const videoOpacity = useTransform(brindeProgress, [0.25, 0.5], [0, 1]);
  const videoScale = useTransform(brindeProgress, [0.25, 0.5], [0.92, 1]);
  // parallax do vídeo
  const videoY = useTransform(brindeProgress, [0, 1], [80, -80]);

  // Planejamos e Executamos (pg 11)
  const planRef = useRef<HTMLElement>(null);
  const { scrollYProgress: planProgress } = useScroll({
    target: planRef,
    offset: ['start end', 'end start'],
  });
  const leftImgOpacity = useTransform(planProgress, [0.1, 0.45], [0, 1]);
  const leftImgX = useTransform(planProgress, [0.1, 0.45], [-200, 0]);
  const rightImgOpacity = useTransform(planProgress, [0.1, 0.45], [0, 1]);
  const rightImgX = useTransform(planProgress, [0.1, 0.45], [200, 0]);
  const headlineOpacity = useTransform(planProgress, [0.25, 0.5], [0, 1]);
  const headlineY = useTransform(planProgress, [0.25, 0.5], [40, 0]);
  const onOpacity = useTransform(planProgress, [0.35, 0.6], [0, 1]);
  const onY = useTransform(planProgress, [0.35, 0.6], [40, 0]);
  const offOpacity = useTransform(planProgress, [0.42, 0.65], [0, 1]);
  const offY = useTransform(planProgress, [0.42, 0.65], [40, 0]);
  const logoMarkOpacity = useTransform(planProgress, [0.55, 0.75], [0, 1]);
  const logoMarkScale = useTransform(planProgress, [0.55, 0.75], [0.6, 1]);

  // Performance (pg 12)
  // Triggers when section fully visible (~0.4 = centered)
  const perfRef = useRef<HTMLElement>(null);
  const { scrollYProgress: perfProgress } = useScroll({
    target: perfRef,
    offset: ['start end', 'end start'],
  });
  // Sequence finishes by ~0.5 (section ~100% visible)
  const perfCenterOpacity = useTransform(perfProgress, [0.10, 0.22], [0, 1]);
  const perfCenterScale = useTransform(perfProgress, [0.10, 0.22], [0.92, 1]);
  const perfRingOpacity = useTransform(perfProgress, [0.20, 0.30], [0, 1]);

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
    <div className="pt-20 bg-white text-[#050a30]">
      {/* ─── HERO (pg 8) ─── */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } },
        }}
        className="bg-white py-20 md:py-28 px-6 md:px-12"
      >
        <div className="max-w-[1400px] mx-auto">
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
            className="uppercase tracking-tight text-[#050a30] text-[1.6rem] sm:text-[2.2rem] md:text-[3rem] lg:text-[4rem] xl:text-[4.6rem] leading-[1.05] mb-12"
          >
            <span style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900 }}>
              Brinde, uma agência de publicidade{' '}
            </span>
            <span style={{ fontFamily: '"Tan Pearl", serif', fontWeight: 'normal' }}>
              FULL SERVICE
            </span>
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
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
              className="text-xl md:text-2xl lg:text-3xl text-[#050a30] leading-snug font-medium"
            >
              <span style={{ fontFamily: 'Aileron, sans-serif' }}>
                A empresa nasceu para unir estratégia, criação e performance em entregas que elevam marcas e revelam seu verdadeiro potencial.
              </span>
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="flex flex-col gap-6"
            >
              <p
                className="text-lg md:text-xl text-gray-800 leading-relaxed"
                style={{ fontFamily: 'Aileron, sans-serif' }}
              >
                A Brinde surgiu em 2023 com foco no digital e evoluiu rapidamente para atuar como uma agência completa, integrando estratégia, criação e execução em projetos on e off.
              </p>
              <p
                className="text-lg md:text-xl text-gray-800 leading-relaxed"
                style={{ fontFamily: 'Aileron, sans-serif' }}
              >
                Nosso trabalho combina análise, criatividade e rigor operacional para entregar comunicação que gera valor, fortalece marcas e acompanha o ritmo real dos negócios.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ─── UM BRINDE E BONS NEGÓCIOS (pg 9) ─── */}
      <section ref={brindeRef} className="bg-white py-16 md:py-24 px-6 md:px-12 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <motion.h2
            style={{ opacity: titleOpacity, scale: titleScale }}
            className="text-center text-[1.8rem] sm:text-[2.6rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[1.4] uppercase text-[#050a30] mb-12"
          >
            <span style={{ fontFamily: '"Tan Pearl", serif' }}>
              Um Brinde e<br />
              Bons Negócios
            </span>
          </motion.h2>

          <motion.p
            style={{ opacity: paraOpacity, y: paraY }}
            className="text-lg md:text-xl text-gray-800 leading-relaxed max-w-[1200px] mx-auto mb-16"
          >
            <span style={{ fontFamily: 'Aileron, sans-serif' }}>
              A Brinde nasceu para se tornar uma agência full-service que entrega comunicação de ponta a ponta. Atuamos com branding, campanhas on e off, conteúdo, social, mídia, experiência, audiovisual e tudo o que uma marca precisa para se posicionar, crescer e ganhar espaço.
            </span>
          </motion.p>
        </div>

        {/* Vídeo Institucional edge-to-edge w/ parallax */}
        <motion.div
          style={{
            opacity: videoOpacity,
            scale: videoScale,
            y: videoY,
            height: '50vh',
          }}
          className="relative w-screen left-1/2 right-1/2 -mx-[50vw] bg-[#050a30] overflow-hidden shadow-2xl"
        >
          <video
            controls
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          >
            <source src="https://agenciabrinde.com.br/wp-content/uploads/2024/07/Video-do-WhatsApp-de-2024-07-22-as-13.46.45_7689d559.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </section>

      {/* ─── PLANEJAMOS E EXECUTAMOS (pg 11) ─── */}
      <section ref={planRef} className="relative bg-white py-24 md:py-32 px-6 md:px-12 overflow-hidden">
        {/* Imagem esquerda */}
        <motion.div
          style={{ opacity: leftImgOpacity, x: leftImgX }}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[28%] md:w-[24%] lg:w-[22%] pointer-events-none select-none"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800"
            alt="Online"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* Imagem direita */}
        <motion.div
          style={{ opacity: rightImgOpacity, x: rightImgX }}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[28%] md:w-[24%] lg:w-[22%] pointer-events-none select-none"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800"
            alt="Offline"
            className="w-full h-auto object-contain scale-x-[-1]"
          />
        </motion.div>

        {/* Conteúdo central */}
        <div className="relative z-10 max-w-[900px] mx-auto flex flex-col items-center text-center gap-10">
          <motion.h2
            style={{ opacity: headlineOpacity, y: headlineY }}
            className="text-[1.8rem] sm:text-[2.4rem] md:text-[3rem] lg:text-[3.5rem] leading-tight uppercase text-[#050a30]"
            data-aileron
          >
            <span style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900 }}>
              PLANEJAMOS E<br />EXECUTAMOS
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 w-full">
            <motion.div
              style={{ opacity: onOpacity, y: onY }}
              className="flex flex-col items-end text-right gap-2"
            >
              <h3 className="text-[4rem] md:text-[5.5rem] lg:text-[6.5rem] leading-none">
                <span style={{ fontFamily: '"Tan Pearl", serif', color: '#050a30' }}>ON</span>
                <span className="block text-[2rem] md:text-[2.8rem] lg:text-[3.2rem] uppercase -mt-2" style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900 }}>
                  LINE
                </span>
              </h3>
              <p className="text-sm md:text-base text-gray-700 max-w-[280px]" style={{ fontFamily: 'Aileron, sans-serif' }}>
                Presença digital com intenção, precisão e impacto real
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: offOpacity, y: offY }}
              className="flex flex-col items-start text-left gap-2"
            >
              <h3 className="text-[4rem] md:text-[5.5rem] lg:text-[6.5rem] leading-none">
                <span style={{ fontFamily: '"Tan Pearl", serif', color: '#050a30' }}>OFF</span>
                <span className="block text-[2rem] md:text-[2.8rem] lg:text-[3.2rem] uppercase -mt-2" style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900 }}>
                  LINE
                </span>
              </h3>
              <p className="text-sm md:text-base text-gray-700 max-w-[280px]" style={{ fontFamily: 'Aileron, sans-serif' }}>
                Comunicação física com propósito claro e impacto direto no público
              </p>
            </motion.div>
          </div>

          <motion.div
            style={{ opacity: logoMarkOpacity, scale: logoMarkScale }}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#050a30] flex items-center justify-center mt-4"
          >
            <span className="text-white text-xs md:text-sm font-bold uppercase tracking-wider" style={{ fontFamily: 'Aileron, sans-serif' }}>
              Brinde
            </span>
          </motion.div>
        </div>
      </section>

      {/* ─── PERFORMANCE (pg 12) ─── */}
      <section ref={perfRef} className="bg-white pt-24 md:pt-32 pb-0 px-6 md:px-12 overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto aspect-square max-h-[800px]">
          {/* dashed circle */}
          <motion.div
            style={{ opacity: perfRingOpacity }}
            className="absolute inset-[15%] rounded-full border-2 border-dashed border-[#050a30]/30"
          />

          {/* texto central */}
          <motion.div
            style={{ opacity: perfCenterOpacity, scale: perfCenterScale }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-[20%] z-10"
          >
            <p
              className="text-base md:text-xl lg:text-2xl text-[#050a30] leading-snug mb-2"
              style={{ fontFamily: 'Aileron, sans-serif' }}
            >
              Integramos dados, mídia e<br />
              criatividade para gerar
            </p>
            <p
              className="text-[1.4rem] md:text-[1.8rem] lg:text-[2.4rem] text-[#050a30] leading-none"
              style={{ fontFamily: '"Tan Pearl", serif' }}
            >
              Performance
            </p>
          </motion.div>

          {/* nodes — reveal row-by-row top→bottom */}
          {(() => {
            // y-position per node
            const withY = perfNodes.map((n) => {
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
                  startProgress={0.28}
                  endProgress={0.48}
                />
              );
            });
          })()}
        </div>

        {/* lista textos no mobile */}
        <div className="md:hidden mt-12 max-w-[500px] mx-auto grid grid-cols-1 gap-4">
          {perfNodes.map((node, i) => (
            <motion.div
              key={i}
              style={{ opacity: perfRingOpacity }}
              className="flex flex-col"
            >
              <span className="font-bold text-[#050a30] text-sm" style={{ fontFamily: 'Aileron, sans-serif' }}>
                {node.label.replace(/\n/g, ' ')}
              </span>
              <p className="text-xs text-gray-700 whitespace-pre-line" style={{ fontFamily: 'Aileron, sans-serif' }}>
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
            className="flex justify-center"
          >
            <Link
              href="/contato"
              className="inline-flex items-center gap-3 bg-[#050a30] text-[#fff8d6] px-8 py-4 md:px-10 md:py-5 rounded-full text-lg md:text-xl font-bold hover:bg-[#050a30] transition"
              style={{ fontFamily: 'Aileron, sans-serif' }}
            >
              Solicite um orçamento
              <span aria-hidden>↗</span>
            </Link>
          </motion.div>

          <div className="flex flex-col gap-8">
            <motion.h2
              style={{ opacity: metodoTitleOpacity, y: metodoTitleY }}
              className="uppercase tracking-tight text-[#050a30] text-[2rem] sm:text-[2.8rem] md:text-[3.6rem] lg:text-[4.5rem] leading-[1.05]"
            >
              <span style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900 }}>
                CRIATIVIDADE + MÉTODO
              </span>
              <br />
              <span style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900 }}>= </span>
              <span style={{ fontFamily: '"Tan Pearl", serif', color: '#050a30' }}>
                Alto Desempenho
              </span>
            </motion.h2>

            <motion.p
              style={{ opacity: metodoTextOpacity, y: metodoTextY }}
              className="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed max-w-[1200px]"
            >
              <span style={{ fontFamily: 'Aileron, sans-serif' }}>
                O Método Brinde une estratégia, organização e criação para dar direção clara a cada etapa do processo. Ele garante consistência, ritmo e propósito, transformando intenção em entrega e criatividade em crescimento para marcas que precisam performar no on e no off.
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
              MENOS RUÍDO,
            </span>
            <br />
            <span style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900 }}>MAIS </span>
            <span style={{ fontFamily: '"Tan Pearl", serif', color: '#050a30' }}>
              Resultado
            </span>
          </motion.h2>

          <motion.p
            style={{ opacity: ruidoTextOpacity, y: ruidoTextY }}
            className="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed max-w-[1200px]"
          >
            <span style={{ fontFamily: 'Aileron, sans-serif' }}>
              Processos bem definidos reduzem ruídos, aceleram decisões e tornam o fluxo de criação mais leve. Quando cada etapa é clara, o trabalho ganha ritmo, as entregas chegam mais redondas e o cliente acompanha tudo com segurança. O resultado é simples: menos retrabalho, mais assertividade e uma relação muito mais fluida de ponta a ponta.
            </span>
          </motion.p>
        </div>
      </section>

    </div>
  );
}
