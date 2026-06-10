'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const cases = [
  { id: 1, name: 'Infomídia', category: 'Branding', year: 2021 },
  { id: 2, name: 'Infomídia Soluções Digitais', category: 'Rebranding', year: 2022 },
  { id: 3, name: 'Brinde Marketing & Publicidade', category: 'Full Service', year: 2023 },
];

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
];

const clientStories = [
  { name: 'Mega Frio', text: 'Estratégia de posicionamento em mercado competitivo. Rebranding, campanhas e conteúdo integrado.' },
  { name: 'Saudável', text: 'Criação de identidade visual e campanha de lançamento. Design, vídeo e mídia integrados.' },
  { name: 'Vida', text: 'Estratégia digital e conteúdo social. Gestão de redes, criação audiovisual e performance.' },
  { name: 'Saúde Total', text: 'Campanha integrada on e off. Branding, digital, eventos e experiência.' },
];

const produtoraServices = [
  { title: 'Pré-Produção', description: 'Roteiro, idealização de vídeo, criação de conceitos visuais, storyboards, visita técnica' },
  { title: 'Equipamentos Profissionais', description: 'Câmeras e lentes de cinema, iluminação, estabilizadores, teleprompter, captação profissional de áudio' },
  { title: 'Pós-Produção', description: 'Edição, colorimetria, efeitos especiais, motion graphics, ilustrações' },
  { title: 'Externas', description: 'Drones e equipamentos especiais de estúdio itinerante' },
  { title: 'Equipe Fixa', description: 'Produção, captação e pós produção' },
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

const solucoes = [
  {
    title: 'Rótulo Branco',
    text: 'Através de uma estratégia alinhada aos objetivos do negócio, ajudamos organizações a se diferenciarem dentro de seus objetivos. Moldamos marcas que conversam no novo contexto social.'
  },
  {
    title: 'Reserva Especial',
    text: 'Vendas, gestão de leads, alcance, reconhecimento. Não importa a finalidade, fazemos mensagens serem ouvidas e produtos serem vendidos. Sempre com um olhar para performance e dados.'
  },
  {
    title: 'Edição Limitada',
    text: 'Estratégia digital e comercial juntas para impulsionar vendas, nutrir leads e gerar resultados consistentes. Da captura ao relacionamento, unimos performance, dados e inteligência aplicada.'
  }
];

const videoItems = [
  { id: 't6z1j6IY0sU', title: 'Edição Limitada' },
  { id: 'pa_L30Q43Ac', title: 'Rótulo Branco' },
  { id: 'A0HrPWRULx0', title: 'Reserva Especial' },
];

function ClickableVideo({ videoId, title }: { videoId: string; title: string }) {
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
          <div className="w-14 h-14 md:w-18 md:h-18 bg-[#bb1c3c] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
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
                aria-label="Fechar"
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

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const arrivedFromBelow = useRef(false);
  const [hoveredSolucao, setHoveredSolucao] = useState<number | null>(null);

  const videosSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: videosProgress } = useScroll({
    target: videosSectionRef,
    offset: ['start end', 'end start'],
  });

  const v1Opacity = useTransform(videosProgress, [0.12, 0.30], [0, 1]);
  const v1X = useTransform(videosProgress, [0.12, 0.30], [-100, 0]);

  const v2Opacity = useTransform(videosProgress, [0.22, 0.40], [0, 1]);
  const v2X = useTransform(videosProgress, [0.22, 0.40], [-100, 0]);

  const v3Opacity = useTransform(videosProgress, [0.32, 0.50], [0, 1]);
  const v3X = useTransform(videosProgress, [0.32, 0.50], [-100, 0]);

  const logoOpacity = useTransform(videosProgress, [0.42, 0.58], [0, 1]);
  const logoX = useTransform(videosProgress, [0.42, 0.58], [-100, 0]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

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

    el.addEventListener('wheel', handleWheel, { passive: false });

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5 && el) {
        if (el.scrollLeft < el.scrollWidth - el.clientWidth - 10) {
          el.scrollLeft = el.scrollWidth;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      el.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-[#050a30] min-h-screen w-full">

      <div
        ref={scrollRef}
        data-lenis-prevent
        className="flex w-full h-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar"
      >
        {/* ─── 1. HERO ─── */}
        <section className="min-w-full h-full shrink-0 snap-start relative flex items-center justify-center overflow-hidden bg-[#050a30]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://agenciabrinde.com.br/wp-content/uploads/2024/07/Video-do-WhatsApp-de-2024-07-22-as-13.46.45_7689d559.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-[#050a30]/40" />

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
              publicidade e estratégia em
            </p>
            <h1
              className="font-black text-white leading-none tracking-tighter drop-shadow-xl uppercase"
              style={{ fontFamily: 'Aileron, sans-serif', fontSize: 'clamp(3rem, 10vw, 11rem)' }}
            >
              Estado de
            </h1>
            <span
              className="text-white drop-shadow-xl"
              style={{ fontFamily: '"Tan Pearl", serif', fontSize: 'clamp(2.5rem, 8vw, 9rem)' }}
            >
              Criatividade
            </span>
          </motion.div>
        </section>

        {/* ─── 2. SOBRE NÓS ─── */}
        <section className="min-w-full h-full shrink-0 snap-start overflow-y-auto bg-white px-4 md:px-8 lg:px-12" style={{ paddingTop: 'clamp(2rem, 5vh, 5rem)', paddingBottom: 'clamp(2rem, 5vh, 5rem)' }}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full max-w-[1200px] mx-auto h-full flex flex-col justify-center"
          >
            <h2 className="uppercase tracking-tight text-[#050a30] flex flex-col gap-1 md:gap-2" style={{ marginBottom: 'clamp(1.5rem, 4vh, 4rem)' }}>
              <div className="flex flex-wrap items-baseline gap-x-2 md:gap-x-4 gap-y-1 leading-snug" style={{ fontSize: 'clamp(1.3rem, 3vw, 3.5rem)' }}>
                <motion.span variants={fadeUp} className="text-[1.3em]" style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 800 }}>BRINDE É</motion.span>
                <motion.span variants={fadeUp} style={{ fontFamily: '"Tan Pearl", serif', fontWeight: 'normal' }}>PUBLICIDADE</motion.span>
                <motion.span variants={fadeUp} className="text-[1.3em]" style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 800 }}>E</motion.span>
                <motion.span variants={fadeUp} style={{ fontFamily: '"Tan Pearl", serif', fontWeight: 'normal' }}>ESTRATÉGIA</motion.span>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-2 md:gap-x-4 leading-none" style={{ fontSize: 'clamp(1.3rem, 3vw, 3.5rem)' }}>
                <motion.span variants={fadeUp} className="text-[1.3em]" style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 800 }}>EM ESTADO DE</motion.span>
                <motion.span variants={fadeUp} style={{ fontFamily: '"Tan Pearl", serif', fontWeight: 'normal' }}>CRIATIVIDADE</motion.span>
              </div>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 lg:gap-16">
              <motion.div variants={fadeUp} className="md:col-span-7">
                <p
                  className="text-[#050a30] leading-snug font-medium"
                  style={{ fontFamily: 'Aileron, sans-serif', fontSize: 'clamp(1.1rem, 2vw, 2.4rem)' }}
                >
                  Mais que uma agência full-service, a Brinde transforma negócios por meio de ideias que unem lógica, estética e impacto. Criamos marcas conscientes, relevantes e prontas para competir.
                </p>
              </motion.div>
              <div className="md:col-span-5 flex flex-col gap-4 lg:gap-6 justify-start pt-2">
                <motion.p
                  variants={fadeUp}
                  className="text-gray-800 leading-relaxed"
                  style={{ fontFamily: 'Aileron, sans-serif', fontSize: 'clamp(0.9rem, 1.3vw, 1.25rem)' }}
                >
                  Na Brinde, cada projeto nasce de uma lógica clara: entender o negócio, traduzir a intenção da marca e criar soluções que movem o mercado com consistência.
                </motion.p>
                <motion.p
                  variants={fadeUp}
                  className="text-gray-800 leading-relaxed"
                  style={{ fontFamily: 'Aileron, sans-serif', fontSize: 'clamp(0.9rem, 1.3vw, 1.25rem)' }}
                >
                  Combinamos análise, criação e execução para que a comunicação seja resultado de método e sensibilidade. Aqui, estratégia ganha forma, criatividade ganha propósito e marcas ganham presença.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ─── 3. PRÊMIO ─── */}
        <section className="min-w-full h-full shrink-0 snap-start relative flex items-center justify-center overflow-hidden bg-[#050a30]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
          >
            <source src="https://agenciabrinde.com.br/wp-content/uploads/2024/07/Video-do-WhatsApp-de-2024-07-22-as-13.46.45_7689d559.mp4" type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-[#050a30]/50" />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative z-10 flex flex-col items-center justify-center w-full px-6 text-center"
          >
            <h2
              className="text-white leading-none uppercase tracking-tighter drop-shadow-2xl"
              style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900, fontSize: 'clamp(2.5rem, 8vw, 9rem)' }}
            >
              Vídeo do Prêmio
            </h2>
          </motion.div>
        </section>
      </div>

      <div className="flex flex-col w-full">
        {/* ─── 4. SOLUÇÕES COMPLETAS ─── */}
        <section className="min-w-full min-h-screen shrink-0 bg-white px-4 md:px-8 lg:px-12 flex items-center" style={{ paddingTop: 'clamp(2rem, 5vh, 5rem)', paddingBottom: 'clamp(2rem, 5vh, 5rem)' }}>
          <div className="w-full max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 flex flex-col bg-[#050a30] rounded-xl overflow-hidden shadow-2xl">
              {solucoes.map((item, index) => (
                <div
                  key={index}
                  className="group border-b border-white/20 last:border-b-0 cursor-pointer bg-[#050a30] text-white relative h-[90px] md:h-[110px] overflow-hidden"
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
                        className="font-bold uppercase tracking-tight text-2xl sm:text-3xl md:text-4xl" 
                        style={{ fontFamily: 'Aileron, sans-serif', fontSize: 'clamp(1.2rem, 2.5vw, 2.4rem)' }}
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

            <div className="lg:col-span-5 flex flex-col justify-center pl-0 lg:pl-6">
              <h2 className="leading-none tracking-tight text-[#050a30] flex flex-col gap-1 md:gap-2 uppercase" style={{ marginBottom: 'clamp(0.75rem, 2vh, 1.5rem)' }}>
                <span style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 4.5rem)' }}>SOLUÇÕES</span>
                <span style={{ fontFamily: '"Tan Pearl", serif', fontWeight: 'normal', fontSize: 'clamp(2rem, 4vw, 4.5rem)' }}>COMPLETAS</span>
              </h2>
              <p className="text-gray-800 leading-snug font-medium" style={{ fontFamily: 'Aileron, sans-serif', fontSize: 'clamp(0.9rem, 1.3vw, 1.25rem)' }}>
                Uma estrutura completa para transformar objetivos de marca em comunicação sólida, coerente e eficaz.
              </p>
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
              BRINDAMOS
            </h2>
            <div className="ml-0 md:ml-8 max-w-lg">
              <p className="text-white leading-relaxed font-medium" style={{ fontFamily: 'Aileron, sans-serif', fontSize: 'clamp(1rem, 1.6vw, 1.5rem)' }}>
                Desde 2023, caminhamos com marcas que escolhem estratégia e criatividade. Cada entrega vira história e mais um motivo para brindar.
              </p>
            </div>
          </div>

          <div className="w-full bg-[#bb1c3c] py-6 md:py-8 relative flex items-center">
            <div className="flex w-max animate-marquee items-center">
              <div className="flex gap-8 md:gap-12 pr-8 md:pr-12 items-center">
                {[...clients, ...clients].map((client, idx) => (
                  <div key={`set1-${idx}`} className="h-40 md:h-56 w-[250px] md:w-[350px] -mt-[20px] md:-mt-[40px] -mb-[20px] md:-mb-[40px] flex-shrink-0 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-full max-w-full object-contain brightness-0 invert opacity-85 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-8 md:gap-12 pr-8 md:pr-12 items-center">
                {[...clients, ...clients].map((client, idx) => (
                  <div key={`set2-${idx}`} className="h-40 md:h-56 w-[250px] md:w-[350px] -mt-[20px] md:-mt-[40px] -mb-[20px] md:-mb-[40px] flex-shrink-0 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-full max-w-full object-contain brightness-0 invert opacity-85 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. UM BRINDE E BONS NEGÓCIOS ─── */}
        <section ref={videosSectionRef} className="min-w-full shrink-0 bg-[#050a30] px-4 md:px-8" style={{ paddingTop: 'clamp(4rem, 10vh, 10rem)', paddingBottom: 'clamp(4rem, 10vh, 10rem)' }}>
          <div className="w-full max-w-[1100px] mx-auto">
            <div className="grid grid-cols-12 gap-2 md:gap-3 items-end justify-items-center">
              <motion.div
                style={{ opacity: v1Opacity, x: v1X }}
                className="col-span-12 md:col-span-3 relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-[#050a30] shadow-2xl"
              >
                <ClickableVideo videoId={videoItems[0].id} title={videoItems[0].title} />
              </motion.div>

              <motion.div
                style={{ opacity: v2Opacity, x: v2X }}
                className="col-span-12 md:col-span-3 relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-[#050a30] shadow-2xl"
              >
                <ClickableVideo videoId={videoItems[1].id} title={videoItems[1].title} />
              </motion.div>

              <motion.div
                style={{ opacity: v3Opacity, x: v3X }}
                className="col-span-12 md:col-span-3 relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-[#050a30] shadow-2xl"
              >
                <ClickableVideo videoId={videoItems[2].id} title={videoItems[2].title} />
              </motion.div>

              <motion.div
                style={{ opacity: logoOpacity, x: logoX }}
                className="col-span-12 md:col-span-3 flex items-end justify-center md:justify-end"
              >
                <h3
                  className="text-white leading-tight tracking-tight uppercase text-right"
                  style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900, fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}
                >
                  UM<br />
                  <span className="border-b-2 border-red-600">Brinde</span><br />
                  E BONS<br />
                  NEGÓ<br />CIOS
                </h3>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
