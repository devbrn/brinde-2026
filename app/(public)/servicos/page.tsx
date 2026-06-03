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
    videoSrc: '/videos/rotulo-branco.mp4',
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
    videoSrc: '/videos/reserva-especial.mp4',
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
    videoSrc: '/videos/edicao-limitada.mp4',
  },
];

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
      {/* Vídeo de fundo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      >
        <source src={service.videoSrc} type="video/mp4" />
      </video>

      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Tag colorida */}
      <div className="absolute top-5 left-5 z-10">
        <span
          className="px-3 py-1 rounded text-xs font-black uppercase tracking-wide"
          style={{ backgroundColor: service.tagColor, color: service.tagTextColor }}
        >
          {service.tag}
        </span>
      </div>

      {/* Conteúdo inferior */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col gap-2">
        <span
          className="text-white/60 text-xs uppercase tracking-widest"
          style={{ fontFamily: 'Aileron, sans-serif' }}
        >
          {service.category}
        </span>
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

  return (
    <div className="bg-white min-h-screen">
      {/* ─── HERO ─── */}
      <section className="pt-24 pb-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center min-h-[70vh]">
          <h1
            className="text-[2.8rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] leading-none font-black uppercase tracking-tight text-black"
            style={{ fontFamily: 'Aileron, sans-serif' }}
          >
            Estratégia,<br />
            Criação e<br />
            Performance<br />
            em um só lugar.
          </h1>
          <p
            className="text-base md:text-lg text-gray-700 leading-relaxed"
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

      {/* modal vem na próxima task */}
    </div>
  );
}
