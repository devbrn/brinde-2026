const steps: [string, string, string][] = [
  ["01", "Diagnóstico e estratégia", "Mapeamos operação, mercado e capacidade comercial."],
  ["02", "Mídia e conteúdo", "Criamos presença e atração com foco em demanda real."],
  ["03", "Captação e qualificação", "Transformamos interesse em oportunidades com contexto."],
  ["04", "Acompanhamento e resultados", "Leitura dos dados para ajustar e crescer com método."],
];

export function ProcessSection() {
  return (
    <section aria-label="Como funciona o ConstruLead" className="process-reference-fold" id="cases">
      <img
        alt="Como funciona o ConstruLead — croqui técnico aprovado"
        className="process-reference-image"
        src="/assets/landing/process-reference.png"
      />
      <div aria-label="Como funciona o ConstruLead — versão mobile" className="process-mobile">
        <div className="process-mobile-sketch process-mobile-sketch-top">
          <img alt="Croqui técnico da bancada em pedra natural" src="/assets/landing/process-mobile-top.png" />
        </div>
        <div className="process-mobile-copy">
          <h3>Como funciona o ConstruLead.</h3>
          <p>Um processo completo para atrair, qualificar e gerar mais orçamentos para sua marmoraria.</p>
        </div>
        <div className="process-mobile-cards">
          {steps.map(([n, title, text]) => (
            <article className="process-mobile-card" key={n}>
              <span className="num">{n}</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="process-mobile-sketch process-mobile-sketch-views">
          <img alt="Vistas técnicas do croqui" src="/assets/landing/process-mobile-views.png" />
        </div>
        <div className="process-mobile-sketch process-mobile-sketch-deadlines">
          <img alt="Prazos e detalhe construtivo do croqui" src="/assets/landing/process-mobile-deadlines.png" />
        </div>
      </div>
    </section>
  );
}
