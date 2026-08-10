export function Footer() {
  return (
    <footer className="bg-[#050a30] text-white">
      {/* CTA */}
      <div className="text-center py-20 px-6 border-b border-white/10">
        <h2 className="text-5xl md:text-7xl font-bold mb-6">
          Solicite um orçamento
        </h2>
        <p className="max-w-[900px] mx-auto text-base md:text-lg text-white/70 leading-relaxed mb-8">
          Nosso trabalho combina método, leitura de mercado e criatividade aplicada. Não criamos por criar. Criamos para mover, destravar caminhos e gerar retorno para empresas que exigem clareza, consistência e estratégia.
        </p>
        <a
          href="/contato"
          className="inline-flex items-center gap-2 text-lg hover:opacity-70 transition-opacity"
        >
          Entre em contato →
        </a>
      </div>

      {/* Links grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 px-8 py-16">
        {/* Col 1 — Nav */}
        <div className="space-y-3">
          {[
            { label: 'Sobre Nós', href: '/sobre-nos' },
            { label: 'Prêmio', href: '/premio' },
            { label: 'Fizemos', href: '/fizemos' },
            { label: 'Serviços', href: '/servicos' },
            { label: 'Brindamos', href: '/brindamos' },
          ].map(({ label, href }) => (
            <div key={href}>
              <a
                href={href}
                className="font-bold text-sm hover:opacity-70 transition-opacity"
              >
                {label}
              </a>
            </div>
          ))}
        </div>

        {/* Col 2 — Social + Contato */}
        <div className="space-y-3 text-sm">
          <a
            href="https://www.instagram.com/agenciabrinde/"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:opacity-70 transition-opacity"
          >
            @agenciabrinde ↗
          </a>
          <div className="pt-2 space-y-1 text-white/70">
            <p className="whitespace-nowrap">
              <span className="font-bold">Negócios:</span>{' '}
              <a
                href="mailto:comercial@agenciabrinde.com.br"
                className="hover:text-white transition-colors"
              >
                comercial@agenciabrinde.com.br
              </a>
            </p>
            <p className="whitespace-nowrap">
              <span className="font-bold">Vagas:</span>{' '}
              <a
                href="mailto:rh@agenciabrinde.com.br"
                className="hover:text-white transition-colors"
              >
                rh@agenciabrinde.com.br
              </a>
            </p>
          </div>
        </div>

        {/* Col 3 — empty (matches Twist layout spacing) */}
        <div />

        {/* Col 4 — About blurb */}
        <div className="text-sm text-white/70 leading-relaxed">
          A Brinde é uma agência de marketing e publicidade focada em fortalecer
          marcas, atrair clientes qualificados e ampliar oportunidades comerciais
          com estratégia, criatividade e execução orientadas ao crescimento.
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-white font-bold">
        <div className="flex gap-6">
          <span>Agência full-service</span>
          <span>|</span>
          <a href="/produtora" className="hover:opacity-70 transition-opacity">Produtora audiovisual</a>
        </div>
        <span className="md:mr-20">Todos os direitos reservados agência Brinde - CNPJ: 49.820.592/0001-87</span>
      </div>
    </footer>
  );
}
