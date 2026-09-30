const faqs: [string, string][] = [
  ["A Brinde entra em contato com o meu lead?", "Não. Atendimento, orçamento, negociação, follow-up, fechamento e execução continuam com a marmoraria. A Brinde estrutura o sistema de aquisição e qualificação."],
  ["O que é o POQ?", "POQ significa Pedido de Orçamento Qualificado. É uma oportunidade com contexto suficiente para sua equipe entender se faz sentido avançar para orçamento."],
  ["Em quanto tempo começo a ver resultado?", "O tempo varia conforme operação, oferta, investimento, atendimento e capacidade comercial. O papel da LP é organizar a aquisição com mais método e previsibilidade."],
  ["Esse processo serve para qualquer marmoraria?", "Nem sempre. Primeiro avaliamos maturidade comercial, capacidade de absorver mais demanda e condições de investimento para entender se faz sentido acelerar agora."],
];

export function FAQ() {
  return (
    <section className="section" id="faq">
      <div className="container faq">
        <div>
          <div className="section-kicker">Dúvidas frequentes</div>
          <h3>O que você precisa saber antes de avançar.</h3>
          <p className="text">
            A Brinde não vende em nome da sua marmoraria. Nós estruturamos a geração e a qualificação das oportunidades para que seu time comercial opere com mais clareza e previsibilidade.
          </p>
        </div>
        <div className="accordion">
          {faqs.map(([q, a], i) => (
            <details className="acc-item" open={i === 0} key={q}>
              <summary className="acc-btn">
                {q} <span aria-hidden="true" className="acc-plus">+</span>
              </summary>
              <div className="acc-panel">{a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container final-inner">
        <div>
          <h3>Dê o próximo passo da sua marmoraria.</h3>
          <p className="text">
            Receba uma análise gratuita do seu mercado, concorrentes e oportunidades de crescimento. Se fizer sentido, mostramos o melhor caminho para construir uma entrada previsível de novos orçamentos.
          </p>
        </div>
        <div>
          <a className="cta-btn" href="#formulario" style={{ width: "100%" }}>
            Solicite sua análise estratégica gratuita <span className="arrow">→</span>
          </a>
          <div className="pill-note">
            <span>Sem compromisso</span>
            <span>Resposta em até 24 horas</span>
            <span>100% gratuito</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-row">
        <div>Agência Brinde • Um Brinde e bons negócios</div>
        <div>Estratégia, tecnologia e dados para aquisição</div>
      </div>
    </footer>
  );
}
