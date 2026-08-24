import type { Dictionary } from '@/lib/i18n';

export function WorkPage({ dict }: { dict: Dictionary }) {
  const t = dict.work;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-[#050a30] text-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair mb-8">{t.title}</h1>
          <p className="text-xl text-gray-300">{t.subtitle}</p>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="bg-white py-16 px-6" data-nav-light>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.cases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="border-2 border-gray-200 rounded p-8 hover:border-[#c51618] transition"
              >
                <span className="text-sm text-[#c51618] font-bold">{caseItem.category}</span>
                <h3 className="text-2xl font-playfair mt-3 mb-4">{caseItem.name}</h3>
                <p className="text-gray-500 text-sm">{caseItem.year}</p>
                <button className="mt-6 text-[#c51618] font-bold hover:underline">
                  {t.learnMore} →
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-gray-50 rounded text-center">
            <p className="text-gray-600 text-lg">{t.outro}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
