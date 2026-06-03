'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ServiceData = {
  id: string;
  tag: string;
  tagColor: string;
  tagTextColor: string;
  category: string;
  title: string;
  shortDesc: string;
  modalBg: string;
  modalTextColor: string;
  subtitle: string;
  body: string[];
  planning: string[];
  execution: string[];
  videoSrc: string;
};

const services: ServiceData[] = [
  {
    id: 'rotulo-branco',
    tag: 'Rótulo Branco',
    tagColor: '#c6f135',
    tagTextColor: '#111111',
    category: 'saudável',
    title: 'Rótulo Branco',
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
    videoSrc: 'https://www.youtube.com/embed/pa_L30Q43Ac?autoplay=1&mute=1&loop=1&playlist=pa_L30Q43Ac&controls=0&showinfo=0&rel=0&modestbranding=1',
  },
  {
    id: 'reserva-especial',
    tag: 'Reserva Especial',
    tagColor: '#ff6b35',
    tagTextColor: '#ffffff',
    category: 'mal?',
    title: 'Reserva Especial',
    shortDesc:
      'Vendas, gestão de leads, alcance, reconhecimento. Não importa a finalidade, fazemos mensagens serem ouvidas e produtos serem vendidos. Sempre com um olhar para performance e dados.',
    modalBg: '#ff6b35',
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
    videoSrc: 'https://www.youtube.com/embed/A0HrPWRULx0?autoplay=1&mute=1&loop=1&playlist=A0HrPWRULx0&controls=0&showinfo=0&rel=0&modestbranding=1',
  },
  {
    id: 'edicao-limitada',
    tag: 'Edição Limitada',
    tagColor: '#c9b8e8',
    tagTextColor: '#111111',
    category: 'vida',
    title: 'Edição Limitada',
    shortDesc:
      'Estratégia digital e comercial juntas para impulsionar vendas, nutrir leads e gerar resultados consistentes. Da captura ao relacionamento, unimos performance, dados e inteligência aplicada.',
    modalBg: '#c9b8e8',
    modalTextColor: '#111111',
    subtitle: 'Relacionamento',
    body: [
      'Gerar demanda é apenas o começo. O verdadeiro desafio está em transformar oportunidades em vendas com método e previsibilidade.',
      'No Edição Limitada, estruturamos a conexão entre marketing e vendas, organizando processos, dados e abordagem comercial para que a demanda gerada se converta em resultado real. Atuamos com CRM, conteúdo e inteligência aplicada para criar clareza, ritmo e consistência na operação comercial.',
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
    videoSrc: 'https://www.youtube.com/embed/t6z1j6IY0sU?autoplay=1&mute=1&loop=1&playlist=t6z1j6IY0sU&controls=0&showinfo=0&rel=0&modestbranding=1',
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
      style={{ backgroundColor: service.modalBg, color: service.modalTextColor }}
    >
      {/* Botão fechar */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[60] w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition-opacity hover:opacity-60"
        style={{ backgroundColor: service.modalTextColor, color: service.modalBg }}
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
              className="text-[3rem] md:text-[5rem] font-black leading-none uppercase"
              style={{ fontFamily: 'Aileron, sans-serif' }}
            >
              {service.title}
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
            <p
              className="text-sm font-bold mt-4 opacity-70"
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
            {/* Círculo decorativo */}
            <div
              className="w-20 h-20 rounded-full self-end"
              style={{ backgroundColor: '#f5d020' }}
            />

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
}: {
  service: ServiceData;
  onClick: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl cursor-pointer group"
      style={{ height: '70vh' }}
    >
      {/* Vídeo de fundo via iframe YouTube */}
      <iframe
        src={service.videoSrc}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ border: 'none', transform: 'scale(1.15)', transformOrigin: 'center' }}
        allow="autoplay; mute"
        title={service.title}
      />

      {/* Overlay gradiente permanente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Overlay colorido no hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        style={{ backgroundColor: service.tagColor }}
      />

      {/* Conteúdo inferior */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col gap-2">
        <h2
          className="text-white text-2xl md:text-3xl font-black leading-tight"
          style={{ fontFamily: 'Aileron, sans-serif' }}
        >
          {service.title}
        </h2>
        <p
          className="text-white/80 text-sm leading-relaxed line-clamp-3"
          style={{ fontFamily: 'Aileron, sans-serif' }}
        >
          {service.shortDesc}
        </p>
        <span
          className="text-white text-sm font-semibold mt-2 group-hover:underline"
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
            className="text-[2.8rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[4.6rem] leading-none font-black uppercase tracking-tight text-black"
            style={{ fontFamily: 'Aileron, sans-serif' }}
          >
            Estratégia,<br />
            Criação e<br />
            Performance<br />
            em um só lugar.
          </h1>
          <p
            className="text-[20px] text-gray-700 leading-relaxed"
            style={{ fontFamily: 'Aileron, sans-serif' }}
          >
            A agência Brinde oferece serviços de branding, performance, conteúdo,
            relacionamento, dados e CRM para marcas que desejam crescer com
            estratégia, criatividade e tecnologia.
          </p>
        </div>
      </section>

      {/* ─── CARDS ─── */}
      <section className="px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => setActiveId(service.id)}
            />
          ))}
        </div>
      </section>

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
