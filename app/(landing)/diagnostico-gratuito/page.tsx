import type { Metadata } from 'next';
import './diagnostico-gratuito.css';

export const metadata: Metadata = {
  title: 'Mais pedidos de orçamento para sua marmoraria | Brinde',
  description:
    'Diagnóstico gratuito para marmorarias que querem gerar novos pedidos de orçamento com mais previsibilidade.',
};

const process = [
  ['Atrair na sua região', 'Sua marmoraria aparece para pessoas buscando o tipo de obra que você executa.'],
  ['Filtrar os curiosos', 'Separar quem está apenas pesquisando de quem realmente tem um projeto.'],
  ['Entender o projeto', 'Coletar informações importantes antes do primeiro contato comercial.'],
  ['Entregar a oportunidade', 'Sua equipe recebe o contato sabendo o que a pessoa procura.'],
];

const faqs = [
  ['O diagnóstico é realmente gratuito?', 'Sim. É uma conversa de cerca de 30 minutos para entender seu cenário. Não existe obrigação de contratar.'],
  ['Já tentei tráfego pago e só veio curioso. O que muda?', 'O ConstruLead combina campanha, página e qualificação para priorizar contatos com projeto e contexto.'],
  ['Isso funciona para marmoraria de alto padrão?', 'A comunicação e a jornada consideram o tipo de obra, a região e o perfil de cliente que sua marmoraria quer atrair.'],
  ['Quanto preciso investir?', 'Depende da região, do ticket e da capacidade da operação. Primeiro entendemos seu cenário.'],
];

export default function DiagnosticoGratuitoPage() {
  return (
    <main className="b01">
      <header className="b01-nav">
        <a href="#topo" aria-label="Brinde — início">
          <img src="/marmoristas/brinde-branca.png" alt="Agência Brinde" />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#como-funciona">Como funciona</a>
          <a href="#resultado">Resultado</a>
          <a href="#faq">Dúvidas</a>
        </nav>
        <a className="b01-button b01-nav-cta" href="/poq#qualificacao">Quero meu diagnóstico gratuito <span aria-hidden="true">→</span></a>
      </header>

      <section className="b01-hero" id="topo">
        <div className="b01-hero-image" role="img" aria-label="Cozinha contemporânea com ilha em pedra Blue Roma" />
        <div className="b01-wrap b01-hero-copy">
          <p className="b01-kicker">Para marmorarias com estrutura para crescer</p>
          <h1>Sua marmoraria já tem estrutura para crescer. <span>Agora precisa gerar mais pedidos de orçamento.</span></h1>
          <p className="b01-lead">A Brinde coloca sua marmoraria na frente de pessoas com projetos compatíveis com o tipo de obra que você quer executar.</p>
          <ul className="b01-benefits">
            <li>Mais pedidos de orçamento</li><li>Mais previsibilidade</li><li>Menos dependência de indicação</li>
          </ul>
          <a className="b01-button" href="/poq#qualificacao">Quero avaliar minha marmoraria <span aria-hidden="true">→</span></a>
          <p className="b01-note">Diagnóstico gratuito de 30 minutos, sem compromisso de contratação.</p>
        </div>
      </section>

      <section className="b01-problem">
        <div className="b01-problem-image" aria-hidden="true" />
        <div className="b01-wrap b01-problem-copy">
          <h2>Até quando você vai esperar a próxima indicação chegar?</h2>
          <p>Sua marmoraria já sabe executar. <strong>O problema é depender da indicação para trazer a próxima obra.</strong></p>
          <p>Tem mês com vários pedidos de orçamento. No outro, o movimento cai. A indicação funciona, mas você não controla quando ela chega.</p>
        </div>
      </section>

      <section className="b01-process" id="como-funciona">
        <div className="b01-wrap">
          <h2>O ConstruLead foi feito para quem já tem estrutura e quer vender mais.</h2>
          <p className="b01-subtitle">Nós cuidamos da estrutura para:</p>
          <ol>{process.map(([title, text], i) => <li key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
        </div>
      </section>

      <section className="b01-case" id="resultado">
        <div className="b01-wrap">
          <h2>Resultado real de uma marmoraria que confiou na Brinde</h2>
          <p className="b01-number">R$ 691 mil</p>
          <p className="b01-case-caption">em orçamentos originados em 30 dias.</p>
          <dl><div><dt>R$ 1.500</dt><dd>investidos em mídia</dd></div><div><dt>R$ 691.955</dt><dd>em orçamentos registrados</dd></div><div><dt>R$ 14,56</dt><dd>custo por lead</dd></div><div><dt>30 dias</dt><dd>de campanha</dd></div></dl>
          <p className="b01-disclaimer">Dados extraídos do CRM do cliente. Valor orçado não representa faturamento realizado. O fechamento também depende do atendimento, da proposta, do preço e da negociação da própria empresa.</p>
        </div>
      </section>

      <section className="b01-fit" style={{ backgroundImage: "linear-gradient(rgba(236,229,216,.9),rgba(236,229,216,.9)),url('/marmoristas/brinde-01/assets/texture-light-stone.jpg')" }}>
        <div className="b01-wrap b01-fit-grid">
          <h2>O ConstruLead faz mais sentido para marmorarias que:</h2>
          <ul><li>Já possuem operação ativa e portfólio</li><li>Conseguem atender novas obras</li><li>Querem reduzir a dependência de indicação</li><li>Estão dispostas a investir em crescimento</li></ul>
        </div>
      </section>

      <section className="b01-faq" id="faq">
        <div className="b01-wrap b01-faq-grid">
          <div><h2>O que vamos analisar no diagnóstico</h2><p>Em 30 minutos, olhamos de onde vêm seus pedidos, como os contatos chegam e onde você pode estar perdendo oportunidades.</p><a className="b01-button" href="/poq#qualificacao">Quero agendar meu diagnóstico <span aria-hidden="true">→</span></a></div>
          <div><h2>Dúvidas frequentes</h2>{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
        </div>
      </section>

      <footer className="b01-footer"><img src="/marmoristas/brinde-branca.png" alt="Agência Brinde" /><span>ConstruLead — aquisição de pedidos de orçamento para marmorarias.</span></footer>
    </main>
  );
}
