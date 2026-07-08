# Menu mobile + fix de overflow horizontal em mobile

## Contexto

`components/Nav.tsx` só renderiza a logo em telas `< md` — não existe hambúrguer, drawer nem qualquer forma de navegação em mobile. Além disso, o rodapé (`components/Footer.tsx`) força um grid de 2 colunas já em telas pequenas e usa `whitespace-nowrap` em linhas "Label: email@dominio.com", o que estoura a largura da coluna e gera scroll horizontal na página inteira em viewports de 375–430px.

Investigação cobriu todas as páginas públicas (`home`, `sobre-nos`, `premio`, `servicos`, `produtora`, `contato`, `brindamos`, `fizemos`) e os componentes globais (`Footer`, `WhatsAppButton`). Único ponto de overflow real confirmado: o rodapé. Os demais `w-[Npx]`/`vw`/`flex-shrink-0` encontrados via grep pertencem a carrosséis GSAP intencionais (scroll horizontal com snap), já contidos por `overflow-x-auto`/`overflow-hidden` no próprio elemento pai — não vazam para o body.

## Escopo

1. Menu mobile funcional no `Nav.tsx`.
2. Fix do overflow horizontal no `Footer.tsx` (grid + `whitespace-nowrap`).
3. Safety net global: `overflow-x-hidden` no `<body>` (`app/layout.tsx`), para conter qualquer vazamento pontual futuro sem afetar os carrosséis (que rolam dentro de seus próprios containers, não do body).

Fora de escopo: qualquer redesign visual das páginas, mudança nos carrosséis GSAP, mudança de conteúdo/copy.

## 1. Menu mobile (`components/Nav.tsx`)

- Novo estado `mobileOpen: boolean` (`useState(false)`).
- Botão hambúrguer, visível só `md:hidden`, ao lado da logo (`justify-between` já existente cobre isso). Ícone SVG simples de 3 linhas; vira X quando `mobileOpen === true`.
- Overlay fullscreen: `fixed inset-0 z-[60] bg-[#050a30]`, entra/sai com transição de opacidade (mesmo padrão de transição já usado no nav, `duration-500`).
- Conteúdo do overlay, empilhado verticalmente e centralizado:
  - Links: Sobre Nós, Prêmio, Serviços, Produtora Audiovisual, Solicite um orçamento — mesmo destino/texto da versão desktop.
  - Ícones sociais (Instagram, LinkedIn) — reaproveita os SVGs já existentes no componente.
  - Bandeiras (🇧🇷 🇺🇸 🇪🇸) — mesmo trecho da versão desktop.
- Fecha o overlay quando: usuário clica em qualquer link, clica no X, ou pressiona Esc (`keydown` listener enquanto aberto).
- Enquanto `mobileOpen === true`, trava scroll do body (`document.body.style.overflow = 'hidden'`), restaura ao fechar/desmontar.
- A lógica existente de auto-hide do nav por scroll (`visible`) permanece intacta e não se aplica ao overlay — uma vez aberto, o overlay fica visível até ser fechado explicitamente, independente de scroll.
- Nenhuma mudança na versão desktop (`hidden md:flex` continua como está).

## 2. Fix do rodapé (`components/Footer.tsx`)

- Linha 21: `grid grid-cols-2 md:grid-cols-4` → `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4`. Em telas `< sm` (≤ 640px) cai pra 1 coluna full-width; a partir de `sm` mantém 2; a partir de `md` mantém 4 como hoje.
- Linhas 53, 62, 71: remover `whitespace-nowrap` das tags `<p>` que envolvem "Label: email". Sem essa classe, o texto quebra naturalmente quando não couber — não há truncamento nem outra mudança visual necessária, já que em 1 coluna full-width há espaço de sobra pro texto quebrar em 2 linhas se precisar.
- Nenhuma outra mudança no arquivo (bottom bar, colunas 1/3/4 já usam `flex-col`/`grid-cols-1` como padrão mobile e não têm risco).

## 3. Safety net global (`app/layout.tsx`)

- Adicionar `overflow-x-hidden` na classe do `<body>` (linha 34), junto das classes já existentes (`font-sans bg-white text-[#050a30] antialiased`).
- Justificativa: nenhuma página depende de scroll horizontal do `<body>` — todo scroll horizontal intencional (carrosséis GSAP/snap) acontece dentro de containers próprios com `overflow-x-auto` explícito. Essa classe não interfere nesses carrosséis; apenas impede que um vazamento pontual futuro (ex: elemento novo mal dimensionado) gere barra de scroll horizontal ou desloque a página inteira.

## Testes / verificação

Sem tool de browser automation nesta sessão — verificação será:
- Leitura do diff final confirmando que os 3 pontos acima foram aplicados exatamente como especificado.
- Checklist manual junto ao usuário: abrir cada página em viewport mobile real (ou emulado no DevTools do navegador) e confirmar ausência de scroll horizontal, e testar abrir/fechar o menu mobile (tap no hambúrguer, tap em link, tap no X, tecla Esc).

## Fora de escopo / não tocar

- Carrosséis GSAP (`page.tsx`, `premio/page.tsx`, `produtora/page.tsx`) — comportamento intencional, não mexer.
- `WhatsAppButton.tsx` — badge de ping levemente fora do círculo de 64px é cosmético e não gera overflow de página; não mexer.
- Conteúdo/copy de qualquer página.
