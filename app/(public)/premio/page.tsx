'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

type Card = {
  label?: string;
  quote?: string;
  image?: string;
  width: number; // px
  height: number; // px
  marginTop?: number;
  speed?: number; // velocity multiplier (1=base, >1 faster, <1 slower)
};

function CardItem({
  card,
  baseX,
  opacity,
}: {
  card: Card;
  baseX: ReturnType<typeof useTransform<number, number>>;
  opacity: ReturnType<typeof useTransform<number, number>>;
}) {
  const speed = card.speed ?? 1;
  const x = useTransform(baseX, (v) => v * speed);

  return (
    <motion.div
      style={{
        width: card.width,
        marginTop: card.marginTop ?? 0,
        x,
        opacity,
      }}
      className="shrink-0 flex flex-col gap-4"
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
          className="text-[#e8a8a8] text-2xl md:text-3xl leading-snug px-4"
          style={{ fontFamily: '"Tan Pearl", serif' }}
        >
          {card.quote}
        </p>
      ) : (
        <div
          style={{ height: card.height }}
          className="w-full rounded-2xl overflow-hidden border border-red-900/50 bg-black"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.image}
            alt={card.label ?? ''}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </motion.div>
  );
}

const cards: Card[] = [
  {
    label: 'Fundada 2021',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900',
    width: 480,
    height: 360,
    marginTop: 60,
    speed: 1.0,
  },
  {
    quote: 'Mais importante que o começo, é a forma como evoluímos.',
    width: 420,
    height: 260,
    marginTop: 360,
    speed: 1.0,
  },
  {
    label: 'Consolidação 2022',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=700',
    width: 380,
    height: 280,
    marginTop: 0,
    speed: 1.10,
  },
  {
    label: 'Identidade 2023',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900',
    width: 540,
    height: 380,
    marginTop: 580,
    speed: 1.25,
  },
  {
    label: 'Expansão 2024',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900',
    width: 460,
    height: 340,
    marginTop: -240,
    speed: 1.35,
  },
  {
    label: 'Validação 2025',
    image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=1000',
    width: 620,
    height: 440,
    marginTop: 440,
    speed: 1.4,
  },
];

export default function Premio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Scroll horizontal: 0→0.6 do progress = translate cards
  const totalCardsWidth = cards.reduce((s, c) => s + c.width + 80, 0); // gap 80
  const x = useTransform(
    scrollYProgress,
    [0, 0.6],
    [0, -(totalCardsWidth - 1200)] // ajustável depois
  );

  // Fade dark → white
  const bgColor = useTransform(
    scrollYProgress,
    [0.55, 0.65],
    ['#000000', '#ffffff']
  );
  const titleColor = useTransform(
    scrollYProgress,
    [0.55, 0.65],
    ['#ffffff', '#050a30']
  );

  // Cards fade-out na transição (stays 0 after)
  const cardsOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 0.65, 1],
    [1, 1, 0, 0]
  );
  const cardsVisibility = useTransform(cardsOpacity, (v) =>
    v <= 0.01 ? 'hidden' : 'visible'
  );

  // Light content slides in from right → left (acompanha cards), fade junto com bg
  const lightOpacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);
  const lightX = useTransform(scrollYProgress, [0.55, 0.75], [600, 0]);

  // Troféu fade
  const trofOpacity = useTransform(scrollYProgress, [0.82, 0.95], [0, 1]);
  const trofX = useTransform(scrollYProgress, [0.82, 0.95], [-80, 0]);
  const trofTextOpacity = useTransform(scrollYProgress, [0.86, 1], [0, 1]);

  return (
    <>
      {/* ─── PG 16: VÍDEO DO PRÊMIO ─── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1.2, ease: 'easeOut' } }}
        className="pt-20 relative min-h-screen bg-black flex items-center justify-center overflow-hidden"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source
            src="https://agenciabrinde.com.br/wp-content/uploads/2024/07/Video-do-WhatsApp-de-2024-07-22-as-13.46.45_7689d559.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
          animate={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
          }}
          className="relative z-10 text-white uppercase tracking-tight text-center text-[2.5rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] leading-none drop-shadow-2xl px-6"
          style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900 }}
        >
          VÍDEO DO PRÊMIO
        </motion.h1>
      </motion.section>

      {/* ─── PG 17-20: Scroll horizontal + transição p/ light ─── */}
      <div ref={containerRef} className="relative" style={{ height: '500vh' }}>
        <motion.div
          style={{ backgroundColor: bgColor }}
          className="sticky top-0 h-screen w-full overflow-hidden"
        >
          {/* Título PRÊMIO fixo */}
          <motion.h2
            style={{ color: titleColor }}
            className="absolute top-28 md:top-36 left-8 md:left-16 z-30 text-[2rem] md:text-[3rem] lg:text-[4rem] leading-none"
          >
            <span style={{ fontFamily: '"Tan Pearl", serif' }}>Prêmio</span>
          </motion.h2>

          {/* ─── Cards horizontais (pg 17-18) ─── */}
          <motion.div
            style={{ opacity: cardsOpacity, visibility: cardsVisibility }}
            className="absolute inset-0 flex items-center gap-20 pl-[15vw] pr-[15vw]"
          >
            {cards.map((card, i) => (
              <CardItem key={i} card={card} baseX={x} opacity={cardsOpacity} />
            ))}
          </motion.div>

          {/* ─── PG 19: Texto Prêmio (aparece após cards) ─── */}
          <motion.div
            style={{ opacity: lightOpacity, x: lightX }}
            className="absolute inset-0 flex items-center px-6 md:px-16 lg:px-24 pointer-events-none"
          >
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 w-full pt-32">
              <p
                className="text-2xl md:text-3xl lg:text-4xl text-black leading-snug"
                style={{ fontFamily: 'Aileron, sans-serif' }}
              >
                O 35º Mídia Festival reconheceu o que acreditamos desde o primeiro dia: estratégia, criação e consistência constroem marcas fortes.
              </p>
              <div className="flex flex-col gap-6">
                <p
                  className="text-base md:text-lg text-gray-800 leading-relaxed"
                  style={{ fontFamily: 'Aileron, sans-serif' }}
                >
                  Receber o troféu de ouro é a prova de que a Brinde caminha na direção certa. Entre mais de 300 agências, nosso trabalho se destacou pela forma como unimos estratégia, estética e propósito para construir marcas relevantes.
                </p>
                <p
                  className="text-base md:text-lg text-gray-800 leading-relaxed"
                  style={{ fontFamily: 'Aileron, sans-serif' }}
                >
                  É reconhecimento do mercado e um marco que reforça nossa capacidade de entregar valor real.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ─── PG 20: Troféu Ouro ─── */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            style={{ opacity: trofOpacity, x: trofX }}
            className="flex flex-col items-start gap-6"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://via.placeholder.com/500x500/000000/FFFFFF?text=Troféu"
              alt="Troféu Ouro"
              className="w-full max-w-[400px] h-auto"
            />
            <div className="flex flex-col">
              <span
                className="text-2xl md:text-3xl text-black italic"
                style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900 }}
              >
                OURO
              </span>
              <span
                className="text-sm md:text-base text-gray-700 italic"
                style={{ fontFamily: 'Aileron, sans-serif' }}
              >
                MÍDIA FESTIVAL
                <br />
                2025
              </span>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: trofTextOpacity }}
            className="flex flex-col items-center text-center gap-6"
          >
            <p
              className="text-sm md:text-base tracking-[0.2em] uppercase text-black"
              style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 700 }}
            >
              Branding Identidade Visual Marca
            </p>
            <div className="bg-black text-white rounded-full px-10 py-8 inline-flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Aileron, sans-serif' }}>
                a Mídia FESTIVAL
              </span>
              <span className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Aileron, sans-serif' }}>
                2025
              </span>
            </div>
            <p
              className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-600"
              style={{ fontFamily: 'Aileron, sans-serif' }}
            >
              35ª Edição Mídia Festival 2025
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
