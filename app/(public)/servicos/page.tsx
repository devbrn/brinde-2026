'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

type ServiceData = {
  id: string;
  tag: string;
  tagColor: string;
  tagTextColor: string;
  category: string;
  title: string;
  titleTop: string;
  titleBottom: string;
  shortDesc: string;
  modalBg: string;
  modalTextColor: string;
  subtitle: string;
  body: string[];
  planning: string[];
  execution: string[];
  videoSrc: string;
  image: string;
};

const services: ServiceData[] = [
  {
    id: 'rotulo-branco',
    tag: 'ConstruLead Essencial',
    tagColor: '#c6f135',
    tagTextColor: '#111111',
    category: 'saudável',
    title: 'ConstruLead Essencial',
    titleTop: 'ConstruLead',
    titleBottom: 'Essencial',
    shortDesc:
      'Através de uma estratégia alinhada aos objetivos do negócio, ajudamos organizações a se diferenciarem dentro de seus objetivos. Moldamos marcas que conversam no novo contexto social.',
    modalBg: '#c6f135',
    modalTextColor: '#111111',
    subtitle: 'Alicerce',
    body: [
      'Tudo começa no posicionamento. De nada adianta campanhas bem executadas se a marca não engaja e não gera confiabilidade.',
      'Através de uma estratégia alinhada aos objetivos de negócios, ajudamos organizações a se diferenciarem dentro de seus propósitos. Moldamos marcas que conversam no novo contexto social.',
      'Antes de pensar no anúncio, pensamos se a marca é desejável, compartilhável, orientada ao consumo. Nosso branding é voltado para o digital e consumo no dia a dia.',
    ],
    planning: [
      'Definição de objetivo da campanha',
      'Análise inicial de público e segmentação',
      'Estruturação estratégica das campanhas',
      'Definição de mensagens para teste',
      'Planejamento focado em validação de canal e criativo',
    ],
    execution: [
      'Criação e gestão de campanhas',
      'Configuração e implementação dos anúncios',
      'Monitoramento e otimização contínua',
      'Relatórios de desempenho',
      'Análise de métricas essenciais',
    ],
    videoSrc: 'https://www.youtube.com/embed/BCk9qP7w1Ss?autoplay=1&mute=1&loop=1&playlist=BCk9qP7w1Ss&controls=0&showinfo=0&rel=0&modestbranding=1',
    image: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1785980787/brinde1_pftqvj.webp',
  },
  {
    id: 'reserva-especial',
    tag: 'ConstruLead Performance',
    tagColor: '#c51618',
    tagTextColor: '#ffffff',
    category: 'mal?',
    title: 'ConstruLead Performance',
    titleTop: 'ConstruLead',
    titleBottom: 'Performance',
    shortDesc:
      'Vendas, gestão de leads, alcance, reconhecimento. Não importa a finalidade, fazemos mensagens serem ouvidas e produtos serem vendidos. Sempre com um olhar para performance e dados.',
    modalBg: '#c51618',
    modalTextColor: '#ffffff',
    subtitle: 'Impacto',
    body: [
      'Estruturamos operações de marketing que conectam conteúdo, tráfego e dados para gerar crescimento consistente. Atuamos da presença digital à geração de demandas comerciais, organizando canais, mensagens e campanhas para que decisões sejam tomadas com clareza.',
      'Trabalhamos com análise de dados, tecnologia e inteligência aplicada para transformar ações isoladas em um sistema mensurável. O objetivo não é apenas comunicar, mas orientar o marketing para resultados reais e evolução contínua.',
    ],
    planning: [
      'Planejamento de marketing',
      'Estruturação de campanhas',
      'Definição de objetivos',
      'Direcionamento estratégico',
      'Organização de canais digitais',
      'Planejamento de mídia digital',
      'Análise de dados e performance',
    ],
    execution: [
      'Gestão de redes sociais',
      'Criação de conteúdo',
      'Design e edição de vídeos',
      'Roteiros e mensagens',
      'Ativos para campanhas',
      'Tráfego pago',
      'Implementação de CRM',
      'Configuração de funil inicial',
      'Integração de campanhas',
    ],
    videoSrc: 'https://www.youtube.com/embed/Ncpn5cD_oGg?autoplay=1&mute=1&loop=1&playlist=Ncpn5cD_oGg&controls=0&showinfo=0&rel=0&modestbranding=1',
    image: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1785980790/brinde2_wu4d0p.webp',
  },
  {
    id: 'edicao-limitada',
    tag: 'ConstruLead Expansão',
    tagColor: '#c9b8e8',
    tagTextColor: '#111111',
    category: 'vida',
    title: 'ConstruLead Expansão',
    titleTop: 'ConstruLead',
    titleBottom: 'Expansão',
    shortDesc:
      'Estratégia digital e comercial juntas para impulsionar vendas, nutrir leads e gerar resultados consistentes. Da captura ao relacionamento, unimos performance, dados e inteligência aplicada.',
    modalBg: '#c9b8e8',
    modalTextColor: '#111111',
    subtitle: 'Relacionamento',
    body: [
      'Gerar demanda é apenas o começo. O verdadeiro desafio está em transformar oportunidades em vendas com método e previsibilidade.',
      'No ConstruLead Expansão, estruturamos a conexão entre marketing e vendas, organizando processos, dados e abordagem comercial para que a demanda gerada se converta em resultado real. Atuamos com CRM, conteúdo e inteligência aplicada para criar clareza, ritmo e consistência na operação comercial.',
    ],
    planning: [
      'Estruturação de processo comercial',
      'Desenho de funil e pipeline de vendas',
      'Definição de critérios de lead qualificado',
      'Alinhamento entre marketing e vendas',
      'Estratégia de conversão e follow-up',
      'Análise de dados de fechamento',
      'Otimização de gargalos comerciais',
    ],
    execution: [
      'Estruturação avançada de CRM',
      'Automação básica de processos',
      'Documentação de playbook de vendas',
      'Definição de abordagens comerciais',
      'Padronização de argumentos e mensagens',
      'Integração entre campanhas e funil',
      'Relatórios estratégicos de conversão',
    ],
    videoSrc: 'https://www.youtube.com/embed/48Tg9kbDKyI?autoplay=1&mute=1&loop=1&playlist=48Tg9kbDKyI&controls=0&showinfo=0&rel=0&modestbranding=1',
    image: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1785980793/brinde3_c814td.webp',
  },
];

function ServiceModal({
  service,
  onClose,
}: {
  service: ServiceData;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

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
        aria-label="Fechar"
      >
        ✕
      </button>

      <div className="min-h-screen px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

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
              className="text-[3rem] md:text-[5rem] font-black leading-none uppercase flex flex-col"
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
              href="/contato"
              className="inline-flex items-center justify-center px-6 py-3 mt-4 rounded-full text-sm font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] w-fit shadow-md"
              style={{ backgroundColor: '#c51618', color: '#ffffff', fontFamily: 'Aileron, sans-serif' }}
            >
              Entrar em contato
            </Link>

            <p
              className="text-sm font-bold mt-2 opacity-70"
              style={{ fontFamily: 'Aileron, sans-serif' }}
            >
              Metodologia Brinde®
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
                className="text-base font-bold"
                style={{ fontFamily: 'Aileron, sans-serif' }}
              >
                Planejamento / Validação de Tráfego
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
                Execução / Mensuração
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
  progress,
  index,
}: {
  service: ServiceData;
  onClick: () => void;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  index: number;
}) {
  const [start, end] =
    index === 0 ? [0, 0.08] : [0.15 + (index - 1) * 0.35, 0.4 + (index - 1) * 0.35];
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const blur = useTransform(progress, [start, end], [16, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.div
      onClick={onClick}
      style={{ opacity, filter }}
      className="relative overflow-hidden rounded-2xl cursor-pointer group aspect-[9/16] w-[85%] mx-auto bg-[#050a30]"
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
          Saiba mais ↗
        </span>
      </div>
    </motion.div>
  );
}

export default function ServicosPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cardsProgress } = useScroll({
    target: cardsWrapperRef,
    offset: ['start start', 'end end'],
  });

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

  const activeService = activeId ? (services.find((s) => s.id === activeId) ?? null) : null;

  return (
    <div className="bg-white min-h-screen">
      {/* ─── HERO ─── */}
      <section className="pt-24 pb-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center min-h-[70vh]">
          <h1
            className="text-[2.8rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[4.6rem] leading-none font-black uppercase tracking-tight text-[#050a30]"
            style={{ fontFamily: 'Aileron, sans-serif' }}
          >
            Estratégia,<br />
            Criação e<br />
            Performance<br />
            em um só lugar.
          </h1>
          <p
            className="text-[26px] md:text-[30px] text-gray-700 leading-relaxed"
            style={{ fontFamily: 'Aileron, sans-serif' }}
          >
            Estratégia aponta o caminho, criação conquista atenção e performance
            transforma interesse em oportunidades comerciais. Quando as três atuam
            juntas, o investimento deixa de gerar ações isoladas e começa a
            construir presença, preferência e vendas.
          </p>
        </div>
      </section>

      {/* ─── CARDS ─── */}
      {/* Card 1: scroll normal. Cards 2-3: revelam com scroll travado (sticky pin) */}
      <div ref={cardsWrapperRef} className="relative" style={{ height: '250vh' }}>
        <div className="sticky top-0 h-screen flex items-center px-6 md:px-12 lg:px-24">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-[10px] w-full">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={() => setActiveId(service.id)}
                progress={cardsProgress}
                index={index}
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
            onClose={() => setActiveId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
