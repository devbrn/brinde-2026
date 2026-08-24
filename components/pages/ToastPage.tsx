import type { Dictionary } from '@/lib/i18n';

export function ToastPage({ dict }: { dict: Dictionary }) {
  const t = dict.toast;
  const clients = ['Mega Frio', 'Saudável', 'Mal?', 'Vida', 'Saúde Total', 'Inovação'];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-[#050a30] text-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair mb-8">{t.title}</h1>
          <p className="text-xl text-gray-300">{t.subtitle}</p>
        </div>
      </section>

      {/* Clients */}
      <section className="bg-white py-16 px-6" data-nav-light>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-playfair mb-12 text-center">{t.clientsTitle}</h2>

          <div className="bg-[#c51618] py-16 px-8 rounded overflow-hidden">
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
            <h3 className="text-2xl font-playfair mb-8">{t.storiesTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {t.stories.map((story) => (
                <div key={story.name} className="border-l-4 border-[#c51618] pl-6">
                  <h4 className="text-xl font-playfair mb-3">{story.name}</h4>
                  <p className="text-gray-600">{story.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
