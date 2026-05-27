export default function Produtora() {
  const services = [
    {
      title: 'Pré-Produção',
      description: 'Roteiro, idealização de vídeo, criação de conceitos visuais, storyboards, visita técnica',
    },
    {
      title: 'Equipamentos Profissionais',
      description: 'Câmeras e lentes de cinema, iluminação, estabilizadores, teleprompter, captação profissional de áudio',
    },
    {
      title: 'Pós-Produção',
      description: 'Edição, colorimetria, efeitos especiais, motion graphics, ilustrações',
    },
    {
      title: 'Externas',
      description: 'Drones e equipamentos especiais de estúdio itinerante',
    },
    {
      title: 'Equipe Fixa',
      description: 'Produção, captação e pós produção',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-black text-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-playfair mb-8">Produtora Audiovisual</h1>
          <p className="text-xl text-gray-300">
            Tudo o que você precisa em vídeo
          </p>
        </div>
      </section>

      {/* Sobre */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-playfair mb-6">Produção Audiovisual Integrada</h2>
          <p className="text-lg text-gray-700">
            A Brinde é uma produtora audiovisual completa. Combinamos ideia, estratégia, canais de veiculação, mídia e muito mais — tudo integrado e alinhado com os objetivos do seu negócio.
          </p>
        </div>

        {/* Serviços */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-playfair mb-8">Serviços</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="border-2 border-gray-200 rounded p-8 hover:border-cyan-400 transition"
              >
                <h4 className="text-xl font-playfair mb-3">{service.title}</h4>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-playfair mb-12 text-center">Portfolio</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="aspect-video bg-gray-300 rounded flex items-center justify-center text-gray-600"
              >
                Vídeo {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
