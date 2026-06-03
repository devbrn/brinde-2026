# Página Serviços — Design Spec

**Data:** 2026-06-03
**Rota:** `/servicos`
**Arquivo:** `app/(public)/servicos/page.tsx`
**Referência:** `docs/refs/Site Brinde 2026/` pgs 22–26

---

## Decisões tomadas

- Hero: layout 50/50 fundo branco, fiel à pg 22
- Cards: 3 colunas iguais com vídeo mudo no fundo, fiel à pg 23
- Popup: modal fullscreen com fundo colorido por serviço, fiel às pgs 24–26
- Abordagem: single page com `useState` — sem sub-rotas
- Footer global: fora do escopo desta página

---

## Seção 1 — Hero

- Fundo branco
- `pt-24` para compensar nav fixa
- Layout grid 2 colunas (50/50):
  - **Esquerda:** título `ESTRATÉGIA, CRIAÇÃO E PERFORMANCE EM UM SÓ LUGAR.` — fonte black/extrabold, tamanho display (~5xl/6xl)
  - **Direita:** parágrafo descritivo — "A agência Brinde oferece serviços de branding, performance, conteúdo, relacionamento, dados e CRM para marcas que desejam crescer com estratégia, criatividade e tecnologia."

---

## Seção 2 — Cards dos 3 Serviços

- Grid de 3 colunas iguais, altura fixa (~70vh)
- Cada card é clicável inteiro (abre modal)
- **Estrutura interna do card:**
  - Vídeo HTML5 como fundo: `autoPlay loop muted playsInline`, `object-fit: cover`, `position: absolute inset-0`
  - Overlay gradiente escuro no bottom (legibilidade do texto)
  - Tag colorida no topo-esquerdo com nome do serviço
  - Subtítulo pequeno (categoria) acima do título
  - Título grande bold
  - Descrição curta
  - "Saiba mais ↗" no rodapé do card

### Dados dos serviços

```ts
const services = [
  {
    id: 'rotulo-branco',
    tag: 'Rótulo Branco',
    tagColor: '#c6f135',
    tagTextColor: '#111',
    category: 'saudável',
    title: 'Rótulo Branco',
    shortDesc: 'Através de uma estratégia alinhada aos objetivos do negócio, ajudamos organizações a se diferenciarem dentro de seus objetivos. Moldamos marcas que conversam no novo contexto social.',
    modalBg: '#c6f135',
    modalTextColor: '#111',
    // Modal content
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
  },
  {
    id: 'reserva-especial',
    tag: 'Reserva Especial',
    tagColor: '#ff6b35',
    tagTextColor: '#fff',
    category: 'mal?',
    title: 'Reserva Especial',
    shortDesc: 'Vendas, gestão de leads, alcance, reconhecimento. Não importa a finalidade, fazemos mensagens serem ouvidas e produtos serem vendidos. Sempre com um olhar para performance e dados.',
    modalBg: '#ff6b35',
    modalTextColor: '#fff',
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
  },
  {
    id: 'edicao-limitada',
    tag: 'Edição Limitada',
    tagColor: '#c9b8e8',
    tagTextColor: '#111',
    category: 'vida',
    title: 'Edição Limitada',
    shortDesc: 'Estratégia digital e comercial juntas para impulsionar vendas, nutrir leads e gerar resultados consistentes. Da captura ao relacionamento, unimos performance, dados e inteligência aplicada.',
    modalBg: '#c9b8e8',
    modalTextColor: '#111',
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
  },
]
```

---

## Modal por serviço

- Trigger: click no card
- Comportamento: `AnimatePresence` + `motion.div` (padrão do projeto)
- Backdrop: `fixed inset-0 z-50`
- Container: fullscreen, `overflow-y-auto`
- Fundo: `modalBg` do serviço clicado
- Fechar: botão X (top-right) + tecla ESC

### Layout interno do modal (2 colunas)

**Coluna esquerda:**
- Categoria (subtítulo pequeno)
- Título do serviço (display, font-black)
- 2–3 parágrafos de texto (`body`)
- "Metodologia Brinde®" no rodapé

**Coluna direita:**
- Círculo decorativo amarelo (`#f5d020`) no topo
- Seção "Planejamento / Validação de Tráfego" com lista (`planning`)
- Seção "Execução / Mensuração" com lista (`execution`)

---

## Componentes

| Componente | Onde | Responsabilidade |
|---|---|---|
| `ServicosPage` | `app/(public)/servicos/page.tsx` | Página inteira, `useState` para modal aberto |
| `ServiceCard` | inline ou `components/ServiceCard.tsx` | Card com vídeo fundo + overlay + texto |
| `ServiceModal` | inline ou `components/ServiceModal.tsx` | Modal fullscreen com `AnimatePresence` |

> Preferência: componentes inline no `page.tsx` se ficarem abaixo de ~300 linhas total. Extrair só se necessário.

---

## Stack / padrões

- `'use client'` — interatividade (useState, ESC handler)
- `framer-motion`: `AnimatePresence`, `motion.div` — padrão existente no projeto
- Tailwind v4 — sem CSS customizado
- Sem fetch/API — dados estáticos no topo do arquivo
- Vídeos: placeholder por enquanto (`/videos/rotulo-branco.mp4` etc.) — arquivos reais a adicionar depois
