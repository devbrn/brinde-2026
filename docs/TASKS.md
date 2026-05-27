# Tarefas — Brinde 2026

## ✅ Concluído

- [x] Setup Next.js 14 + dependências (Drizzle, NeonDB, NextAuth, Framer Motion)
- [x] Configurar NeonDB schema (posts, cases, contacts)
- [x] Criar layout público (Nav + Footer)
- [x] Home page — hero + manifesto
- [x] Páginas estáticas (Sobre, Prêmio, Fizemos, Brindamos, Produtora)
- [x] Formulário contato + Server Action (validação Zod)
- [x] Páginas de serviço — 3 planos (Rótulo Branco, Reserva Especial, Edição Limitada)
  - [x] Seção serviços em Home (listagem + detalhes stacked)
  - [x] VideoModal com Framer Motion (vídeo mudo no hover, som ao clicar)

## 🔄 Em Progresso

## ⏳ Próximo

- [x] Consolidar outras seções em Home (Sobre, Prêmio, Fizemos, Brindamos, Produtora)
- [ ] Scroll lateral (quando tudo estiver em Home)
- [ ] Autenticação NextAuth + Admin layout
  - [ ] `/admin/login` — página login
  - [ ] `/admin` — dashboard
  - [ ] Sidebar com navegação admin

- [ ] CRUD admin (Posts + Cases)
  - [ ] `/admin/posts` — listar, criar, editar, excluir posts
  - [ ] `/admin/cases` — listar, criar, editar, excluir cases
  - [ ] `/admin/contatos` — visualizar leads do formulário

- [ ] Blog — listagem + detalhe
  - [ ] `/blog` — listagem de posts publicados
  - [ ] `/blog/[slug]` — detalhe post com conteúdo HTML

- [ ] Testes e responsividade
  - [ ] Rodar `pnpm dev` — checar todas as rotas
  - [ ] Testar formulário contato → verificar registro no DB
  - [ ] Login `/admin` → validar proteção de rota
  - [ ] CRUD — criar/editar/excluir posts
  - [ ] Mobile (breakpoints Tailwind)
  - [ ] Validar animações Framer Motion

- [ ] Deploy Vercel + env vars
  - [ ] Conectar repo ao Vercel
  - [ ] Configurar DATABASE_URL, NEXTAUTH_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD, RESEND_API_KEY
  - [ ] Deploy produção

## 📝 Notas

- Stack: Next.js 14 App Router, Drizzle ORM, NeonDB, NextAuth, Framer Motion, Zod, Tailwind v4
- Cores principais: preto, azul escuro (#0D1B3E), ciano (#00B8D9), vermelho (#E3000F), laranja (#FF6B00)
- Tipografia: Playfair Display (headings) + Inter (body)
- Hospedagem: Vercel
