'use client';

import { motion } from 'framer-motion';
import { VideoModal } from '@/components/VideoModal';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  { title: 'Conceito e Roteiro', description: 'Encontramos no negócio algo que mereça atenção. Ideação, conceito visual e roteiro que dão origem ao filme.' },
  { title: 'Direção Criativa', description: 'Construção de uma linguagem própria — direção de arte, fotografia e narrativa que despertam desejo pela marca.' },
  { title: 'Produção e Captação', description: 'Câmeras de cinema, iluminação, áudio e equipe dedicada. Visitas técnicas e captação profissional no set.' },
  { title: 'Pós-Produção', description: 'Edição, colorimetria, efeitos especiais, motion graphics e finalização que elevam o valor percebido.' },
  { title: 'Desdobramentos de Campanha', description: 'Cortes, formatos e adaptações para canais e mídia, ampliando o alcance e a admiração pela marca.' },
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
          className="sticky top-0 h-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar lg:overflow-hidden lg:snap-none"
        >
          <div ref={trackRef} className="flex h-full w-max">
        {/* ─── 1. HERO ─── */}
        <section className="w-screen h-full shrink-0 snap-start relative flex items-center justify-center overflow-hidden bg-[#050a30]">
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
        <section className="w-screen h-full shrink-0 snap-start overflow-hidden bg-white py-16 px-6 md:px-12">
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
        <section className="w-screen h-full shrink-0 snap-start relative flex items-center justify-center overflow-hidden bg-[#050a30]">
          <iframe
            src="https://www.youtube.com/embed/h4bOPkceXR0?autoplay=1&mute=1&loop=1&playlist=h4bOPkceXR0&controls=0&showinfo=0&rel=0&modestbranding=1"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ border: 'none', transform: 'scale(1.4)', transformOrigin: 'center' }}
            allow="autoplay; mute"
            title="Prêmio"
          />
          
          <div className="absolute inset-0 bg-[#050a30]/50" />
        </section>
          </div>
        </div>
      </div>

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
                <span className="text-[1.4em]" style={{ fontFamily: 'Aileron, sans-serif', fontWeight: 900 }}>CRIAMOS</span>
                <span className="text-[1.4em]" style={{ fontFamily: '"Tan Pearl", serif', fontWeight: 'normal' }}>desejo</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-800 leading-snug font-medium" style={{ fontFamily: 'Aileron, sans-serif' }}>
                Um filme começa quando encontramos, no negócio, algo que mereça a atenção das pessoas. A partir daí, conceito, direção e execução constroem uma linguagem própria, capaz de despertar desejo, conquistar admiração e ampliar o valor percebido da marca.
              </p>
            </div>

          </div>
        </section>

        {/* ─── 6. VÍDEOS ─── */}
        <div ref={videosWrapperRef} className="relative">
          <section ref={videosSectionRef} className="sticky top-0 h-screen min-w-full shrink-0 bg-[#050a30] flex items-center px-6 md:px-12 overflow-hidden">
            <div className="w-full max-w-[1300px] mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-end justify-items-center">
                {(['48Tg9kbDKyI', 'b5ljyLD58Z0', 'kx9ldjEWszQ', 'BCk9qP7w1Ss'] as const).map((videoId, i) => (
                  <div
                    key={i}
                    data-video-card
                    onClick={() => activeVideo !== i && setActiveVideo(i)}
                    className="relative aspect-[9/16] w-full max-w-[280px] rounded-2xl overflow-hidden bg-[#050a30] shadow-2xl cursor-pointer group"
                  >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                    alt={`Vídeo ${i + 1}`}
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
                      title={`Vídeo ${i + 1}`}
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
