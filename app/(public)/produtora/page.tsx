'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { VideoModal } from '@/components/VideoModal';
import { useRef, useEffect, useState } from 'react';

const plans = [
  {
    id: 'rotulo-branco',
    title: 'Rótulo Branco',
    tagline: 'Personalização Total',
    description:
      'Bebida exclusiva sob sua marca. Design completo, produção e distribuição.',
    price: 'Sob demanda',
    highlights: [
      'Design do rótulo customizado',
      'Produção mínima 500 unidades',
      'Suporte em branding e packaging',
      'Distribuição e logística inclusos',
    ],
    fullDescription:
      'Nosso serviço de Rótulo Branco oferece uma solução completa para empresas que desejam criar uma bebida premium com sua marca. Desde o design do rótulo até a distribuição, cuidamos de cada detalhe.',
    features: [
      {
        title: 'Design Customizado',
        description:
          'Equipe de designers experientes cria rótulos únicos alinhados com sua marca',
      },
      {
        title: 'Produção Dedicada',
        description: 'Mínimo de 500 unidades com controle de qualidade rigoroso',
      },
      {
        title: 'Suporte em Branding',
        description:
          'Consultoria completa em positioning, messaging e estratégia comercial',
      },
      {
        title: 'Logística Integrada',
        description: 'Distribuição, armazenagem e atendimento ao cliente inclusos',
      },
    ],
    videoUrl: '',
    videoThumbnail: '',
  },
  {
    id: 'reserva-especial',
    title: 'Reserva Especial',
    tagline: 'Edição Premium',
    description:
      'Bebida premium para momentos únicos. Seleção especial com toque artesanal.',
    price: 'A partir de R$ 250/garrafa',
    highlights: [
      'Seleção premium de ingredientes',
      'Envelhecimento em barris especiais',
      'Embalagem de luxo',
      'Disponibilidade limitada',
    ],
    fullDescription:
      'A Reserva Especial é nossa coleção de bebidas premium, resultado de seleção cuidadosa de ingredientes e envelhecimento em barris especiais. Perfeita para presentes executivos e eventos exclusivos.',
    features: [
      {
        title: 'Ingredientes Premium',
        description:
          'Seleção rigorosa dos melhores ingredientes disponíveis no mercado',
      },
      {
        title: 'Envelhecimento Especial',
        description:
          'Processo de envelhecimento em barris de carvalho por 8+ anos',
      },
      {
        title: 'Embalagem Luxuosa',
        description:
          'Apresentação em caixa artesanal com certificado de autenticidade',
      },
      {
        title: 'Disponibilidade Limitada',
        description:
          'Produção controlada para manter exclusividade e qualidade',
      },
    ],
    videoUrl: '',
    videoThumbnail: '',
  },
  {
    id: 'edicao-limitada',
    title: 'Edição Limitada',
    tagline: 'Raridade Exclusiva',
    description:
      'Coleção exclusiva de bebidas raras. Produção ultra-limitada para colecionadores.',
    price: 'A partir de R$ 500/garrafa',
    highlights: [
      'Numeração individual',
      'Produção restrita a 100 unidades',
      'Certificado de autenticidade',
      'Apresentação em caixa artesanal',
    ],
    fullDescription:
      'A Edição Limitada é nossa coleção mais exclusiva, destinada a colecionadores e entusiastas de bebidas premium. Cada garrafa é numerada e acompanhada de certificado de autenticidade.',
    features: [
      {
        title: 'Numeração Individual',
        description:
          'Cada garrafa numerada e registrada em banco de dados de autenticidade',
      },
      {
        title: 'Produção Ultra-Limitada',
        description: 'Máximo de 100 unidades por coleção de Edição Limitada',
      },
      {
        title: 'Certificado de Autenticidade',
        description: 'Documento exclusivo verificável online com QR code',
      },
      {
        title: 'Caixa Artesanal Premium',
        description:
          'Apresentação em caixa de madeira artesanal com acabamento premium',
      },
    ],
    videoUrl: '',
    videoThumbnail: '',
  },
];

const cases = [
  { id: 1, name: 'Infomídia', category: 'Branding', year: 2021 },
  { id: 2, name: 'Infomídia Soluções Digitais', category: 'Rebranding', year: 2022 },
  { id: 3, name: 'Brinde Marketing & Publicidade', category: 'Full Service', year: 2023 },
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

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const [hoveredSolucao, setHoveredSolucao] = useState<number | null>(null);

  const videosSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: videosProgress } = useScroll({
    target: videosSectionRef,
    offset: ['start end', 'end start'],
  });

  const v1Opacity = useTransform(videosProgress, [0.10, 0.25], [0, 1]);
  const v2Opacity = useTransform(videosProgress, [0.18, 0.33], [0, 1]);
  const v3Opacity = useTransform(videosProgress, [0.26, 0.41], [0, 1]);
  const v4Opacity = useTransform(videosProgress, [0.34, 0.50], [0, 1]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // If we are vertically scrolled down the page, don't intercept wheel events for horizontal scrolling!
      if (window.scrollY > 5) return;

      // Check if we're scrolling horizontally already (trackpad horizontal swipe)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      // Find closest scrollable parent
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
        if (e.deltaY > 0 && !isAtBottom) return; // Allow natural scroll down
        if (e.deltaY < 0 && !isAtTop) return;    // Allow natural scroll up
      }

      // Check if we are at the end of horizontal container
      const isAtRightEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 10;
      
      // If scrolling down and at the rightmost slide, let it scroll down the page natively!
      if (e.deltaY > 0 && isAtRightEnd) return;

      // Convert vertical scroll to horizontal scroll
      e.preventDefault();

      if (isScrolling.current) return;
      isScrolling.current = true;

      const direction = e.deltaY > 0 ? 1 : -1;
      el.scrollBy({
        left: direction * window.innerWidth,
        behavior: 'smooth'
      });

      // Release lock after smooth scroll animation completes
      setTimeout(() => {
        isScrolling.current = false;
      }, 700);
    };

    el.addEventListener('wheel', handleWheel, { passive: false });

    // Ensure horizontal container is at the end if we are scrolled down vertically
    // This fixes the bug where refreshing the page or jumping down leaves the container at Slide 1
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8 && el) {
        if (el.scrollLeft < el.scrollWidth - el.clientWidth - 10) {
          el.scrollLeft = el.scrollWidth;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount to handle page refreshes restoring the vertical scroll position
    handleScroll();

    return () => {
      el.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="pt-20 bg-[#050a30] min-h-screen w-full">

      <div
        ref={scrollRef}
        data-lenis-prevent
        className="flex w-full h-[calc(100vh-80px)] overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar"
      >
        {/* ─── 1. HERO ─── */}
        <section className="min-w-full h-full shrink-0 snap-start relative flex items-center justify-center overflow-hidden bg-[#050a30]">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://agenciabrinde.com.br/wp-content/uploads/2024/07/Video-do-WhatsApp-de-2024-07-22-as-13.46.45_7689d559.mp4" type="video/mp4" />
          </video>

          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-[#050a30]/40" />

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center justify-center text-center w-full px-4 gap-2 md:gap-6"
          >
            <p
              className="text-lg md:text-2xl text-white drop-shadow-md"
              style={{ fontFamily: 'Aileron, sans-serif' }}
            >
              publicidade e estratégia em
            </p>
            <h1
              className="text-[3.5rem] sm:text-[6rem] md:text-[9rem] lg:text-[11rem] font-black text-white leading-none tracking-tighter drop-shadow-xl uppercase"
              style={{ fontFamily: 'Aileron, sans-serif' }}
            >
              Estado de
            </h1>
            <span
              className="text-white text-4xl sm:text-6xl md:text-[7rem] lg:text-[9rem] drop-shadow-xl"
              style={{ fontFamily: '"Tan Pearl", serif' }}
            >
              Criatividade
            </span>
          </motion.div>
        </section>

        {/* ─── 2. SOBRE NÓS ─── */}
        <section className="min-w-full h-full shrink-0 snap-start overflow-y-auto bg-white py-20 px-6 md:px-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full max-w-[1500px] mx-auto h-full flex flex-col justify-center"
          >
            <h2 className="mb-16 uppercase tracking-tight text-[#050a30] flex flex-col gap-2 md:gap-3">
              <div className="flex flex-wrap items-baseline gap-x-2 md:gap-x-4 text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-[3.5rem] leading-none">
                <motion.span variants={fadeUp} className="text-[1.3em]" style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 800 }}>BRINDE É</motion.span>
                <motion.span variants={fadeUp} style={{ fontFamily: '"Tan Pearl", serif', fontWeight: 'normal' }}>PUBLICIDADE</motion.span>
                <motion.span variants={fadeUp} className="text-[1.3em]" style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 800 }}>E</motion.span>
                <motion.span variants={fadeUp} style={{ fontFamily: '"Tan Pearl", serif', fontWeight: 'normal' }}>ESTRATÉGIA</motion.span>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-2 md:gap-x-4 text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-[3.5rem] leading-none">
                <motion.span variants={fadeUp} className="text-[1.3em]" style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 800 }}>EM ESTADO DE</motion.span>
                <motion.span variants={fadeUp} style={{ fontFamily: '"Tan Pearl", serif', fontWeight: 'normal' }}>CRIATIVIDADE</motion.span>
              </div>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 lg:gap-24">
              <motion.div variants={fadeUp} className="md:col-span-7">
                <p
                  className="text-2xl md:text-3xl lg:text-4xl text-[#050a30] leading-snug font-medium"
                  style={{ fontFamily: 'Aileron, sans-serif' }}
                >
                  Mais que uma agência full-service, a Brinde transforma negócios por meio de ideias que unem lógica, estética e impacto. Criamos marcas conscientes, relevantes e prontas para competir.
                </p>
              </motion.div>
              <div className="md:col-span-5 flex flex-col gap-6 lg:gap-8 justify-start pt-2">
                <motion.p
                  variants={fadeUp}
                  className="text-lg md:text-xl text-gray-800 leading-relaxed"
                  style={{ fontFamily: 'Aileron, sans-serif' }}
                >
                  Na Brinde, cada projeto nasce de uma lógica clara: entender o negócio, traduzir a intenção da marca e criar soluções que movem o mercado com consistência.
                </motion.p>
                <motion.p
                  variants={fadeUp}
                  className="text-lg md:text-xl text-gray-800 leading-relaxed"
                  style={{ fontFamily: 'Aileron, sans-serif' }}
                >
                  Combinamos análise, criação e execução para que a comunicação seja resultado de método e sensibilidade. Aqui, estratégia ganha forma, criatividade ganha propósito e marcas ganham presença.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ─── 3. PRÊMIO ─── */}
        <section className="min-w-full h-full shrink-0 snap-start relative flex items-center justify-center overflow-hidden bg-[#050a30]">
          <iframe
            src="https://www.youtube.com/embed/vB5FYlsGybM?autoplay=1&mute=1&loop=1&playlist=vB5FYlsGybM&controls=0&showinfo=0&rel=0&modestbranding=1"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ border: 'none', transform: 'scale(1.4)', transformOrigin: 'center' }}
            allow="autoplay; mute"
            title="Prêmio"
          />
          
          <div className="absolute inset-0 bg-[#050a30]/50" />
        </section>
      </div> {/* END HORIZONTAL SCROLL WRAPPER */}

      <div className="flex flex-col w-full">
        {/* ─── 4. SOLUÇÕES COMPLETAS ─── */}
        <section className="min-w-full min-h-screen shrink-0 bg-white py-20 px-6 md:px-12 flex items-center">
          <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Side: Items */}
            <div className="lg:col-span-7 flex flex-col bg-[#050a30] rounded-xl overflow-hidden shadow-2xl">
              {produtoraServices.map((item, index) => (
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
            <div className="lg:col-span-5 flex flex-col justify-center pl-0 lg:pl-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] leading-none mb-6 tracking-tight text-[#050a30] flex flex-col gap-1 md:gap-2 uppercase">
                <span style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900 }}>CUIDAMOS DE</span>
                <span style={{ fontFamily: '"Tan Pearl", serif', fontWeight: 'normal' }}>cada detalhe</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-800 leading-snug font-medium" style={{ fontFamily: 'Aileron, sans-serif' }}>
                A Brinde cuida de toda a produção audiovisual, como ideia inicial, canais de veiculação, mídia e muito mais.
              </p>
            </div>

          </div>
        </section>

        {/* ─── 6. VÍDEOS ─── */}
        <section ref={videosSectionRef} className="min-w-full shrink-0 bg-[#050a30] py-32 md:py-40 px-6 md:px-12">
          <div className="w-full max-w-[1300px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-end justify-items-center">
              {([v1Opacity, v2Opacity, v3Opacity, v4Opacity] as const).map((opacity, i) => (
                <motion.div
                  key={i}
                  style={{ opacity }}
                  className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-[#050a30] shadow-2xl"
                >
                  <video controls loop playsInline preload="metadata" className="w-full h-full object-cover">
                    <source src="https://agenciabrinde.com.br/wp-content/uploads/2024/07/Video-do-WhatsApp-de-2024-07-22-as-13.46.45_7689d559.mp4" type="video/mp4" />
                  </video>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
