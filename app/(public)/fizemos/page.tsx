export default function Fizemos() {
  const cases = [
    {
      id: 1,
      name: 'Infomídia',
      category: 'Branding',
      year: 2021,
    },
    {
      id: 2,
      name: 'Infomídia Soluções Digitais',
      category: 'Rebranding',
      year: 2022,
    },
    {
      id: 3,
      name: 'Brinde Marketing & Publicidade',
      category: 'Full Service',
      year: 2023,
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-[#050a30] text-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-playfair mb-8">Fizemos</h1>
          <p className="text-xl text-gray-300">
            Projetos que unem estratégia, criação e execução
          </p>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="border-2 border-gray-200 rounded p-8 hover:border-[#bb1c3c] transition"
              >
                <span className="text-sm text-[#bb1c3c] font-bold">{caseItem.category}</span>
                <h3 className="text-2xl font-playfair mt-3 mb-4">{caseItem.name}</h3>
                <p className="text-gray-500 text-sm">{caseItem.year}</p>
                <button className="mt-6 text-[#bb1c3c] font-bold hover:underline">
                  Saiba mais →
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-gray-50 rounded text-center">
            <p className="text-gray-600 text-lg">
              Cada projeto é uma história de transformação. Trazemos estratégia, criatividade e execução para criar soluções que movem o mercado.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
