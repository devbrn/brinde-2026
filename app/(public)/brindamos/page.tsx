export default function Brindamos() {
  const clients = [
    'Mega Frio',
    'Saudável',
    'Mal?',
    'Vida',
    'Saúde Total',
    'Inovação',
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-[#050a30] text-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-playfair mb-8">Brindamos</h1>
          <p className="text-xl text-gray-300">
            Desde 2023, caminamos com marcas que escolhem estratégia e criatividade
          </p>
        </div>
      </section>

      {/* Clients */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-playfair mb-12 text-center">Nossos Clientes</h2>

          <div className="bg-[#bb1c3c] py-16 px-8 rounded overflow-hidden">
            <div className="flex gap-8 animate-marquee whitespace-nowrap">
              {clients.concat(clients).map((client, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 text-2xl font-playfair text-[#050a30]"
                >
                  {client}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-playfair mb-8">Histórias de Sucesso</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-l-4 border-[#bb1c3c] pl-6">
                <h4 className="text-xl font-playfair mb-3">Mega Frio</h4>
                <p className="text-gray-600">
                  Estratégia de posicionamento em mercado competitivo. Rebranding, campanhas e conteúdo integrado.
                </p>
              </div>
              <div className="border-l-4 border-[#bb1c3c] pl-6">
                <h4 className="text-xl font-playfair mb-3">Saudável</h4>
                <p className="text-gray-600">
                  Criação de identidade visual e campanha de lançamento. Design, vídeo e mídia integrados.
                </p>
              </div>
              <div className="border-l-4 border-[#bb1c3c] pl-6">
                <h4 className="text-xl font-playfair mb-3">Vida</h4>
                <p className="text-gray-600">
                  Estratégia digital e conteúdo social. Gestão de redes, criação audiovisual e performance.
                </p>
              </div>
              <div className="border-l-4 border-[#bb1c3c] pl-6">
                <h4 className="text-xl font-playfair mb-3">Saúde Total</h4>
                <p className="text-gray-600">
                  Campanha integrada on e off. Branding, digital, eventos e experiência.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
