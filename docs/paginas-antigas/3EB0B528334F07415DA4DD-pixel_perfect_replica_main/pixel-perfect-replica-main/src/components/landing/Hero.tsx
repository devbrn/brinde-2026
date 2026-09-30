const icons: [string, string][] = [
  ["i-users", "Mais orçamentos todos os dias"],
  ["i-target", "Projetos de maior valor"],
  ["i-trend", "Menos dependência de indicação"],
  ["i-gear", "Marketing focado no seu setor"],
  ["i-chart", "Estratégia, mídia e acompanhamento"],
];

export function Hero() {
  return (
    <section className="hero">
      <img
        className="hero-bg-photo"
        src="/assets/hero-bg-1920.jpg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        loading="eager"
        decoding="async"
      />
      <div className="container hero-inner">
        <div>
          <div className="eyebrow">ConstruLead para marmorarias</div>
          <h1>
            Não é falta de capacidade.
            <br />
            <span className="gold">É falta de um sistema que te gere novos orçamentos diariamente.</span>
          </h1>
          <p className="lead">
            Atraia proprietários de obras, arquitetos e construtoras, tenha previsibilidade e preencha sua produção com projetos de alto valor.
          </p>
          <a className="cta-btn" href="#formulario">
            Solicite sua análise estratégica gratuita <span className="arrow">→</span>
          </a>
          <div className="hero-notes">
            <span>Sem compromisso</span>
            <span>Resposta em até 24 horas</span>
            <span>100% gratuito</span>
          </div>
        </div>
        <div className="form-card" id="formulario">
          <h2>
            Solicite sua Análise <span className="gold">Estratégica Gratuita</span>
          </h2>
          <p>Preencha os dados e descubra como gerar novos orçamentos diariamente para a sua marmoraria.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Recebido. Esta é uma versão demonstrativa da LP.");
            }}
          >
            <div className="field"><input placeholder="Nome completo" type="text" /></div>
            <div className="field"><input placeholder="WhatsApp" type="tel" /></div>
            <div className="field"><input placeholder="E-mail" type="email" /></div>
            <div className="field"><input placeholder="Nome da empresa" type="text" /></div>
            <div className="field"><input placeholder="Cidade/UF" type="text" /></div>
            <button className="cta-btn" style={{ width: "100%", marginTop: 6 }} type="submit">
              Quero minha análise gratuita <span className="arrow">→</span>
            </button>
          </form>
          <div className="form-meta">Seus dados estão seguros. Não enviamos spam.</div>
        </div>
      </div>
    </section>
  );
}

export function IconStrip() {
  return (
    <section className="icon-strip">
      <div className="container icon-grid">
        {icons.map(([id, label]) => (
          <div className="icon-item" key={id}>
            <div className="icon-circle">
              <svg className="ico" viewBox="0 0 24 24"><use href={`#${id}`} /></svg>
            </div>
            <strong>{label}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
