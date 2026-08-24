import { href, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

const FOOTER_KEYS = ['home', 'sobreNos', 'premio', 'servicos', 'produtora', 'contato'] as const;

export function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.footer;
  const labels: Record<(typeof FOOTER_KEYS)[number], string> = {
    home: dict.nav.home,
    sobreNos: dict.nav.about,
    premio: dict.nav.award,
    servicos: dict.nav.services,
    produtora: dict.nav.production,
    contato: dict.nav.contact,
  };
  return (
    <footer className="bg-[#050a30] text-white">
      {/* CTA */}
      <div className="text-center py-20 px-6 border-b border-white/10">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-balance">
          {t.ctaTitle}
        </h2>
        <p className="max-w-[900px] mx-auto text-base md:text-lg text-white/70 leading-relaxed mb-8">
          {t.ctaText}
        </p>
        <a
          href={href('contato', locale)}
          className="inline-flex items-center gap-2 text-lg hover:opacity-70 transition-opacity"
        >
          {t.ctaLink} →
        </a>
      </div>

      {/* Links grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 px-6 md:px-8 py-12 md:py-16">
        {/* Col 1 — Nav */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 md:block md:space-y-3">
          {FOOTER_KEYS.map((key) => (
            <div key={key}>
              <a
                href={href(key, locale)}
                className="font-bold text-sm hover:opacity-70 transition-opacity"
              >
                {labels[key]}
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
            <p>
              <span className="font-bold">{t.business}</span>{' '}
              <a
                href="mailto:comercial@agenciabrinde.com.br"
                className="hover:text-white transition-colors"
              >
                comercial@agenciabrinde.com.br
              </a>
            </p>
            <p>
              <span className="font-bold">{t.jobs}</span>{' '}
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
        <div className="hidden md:block" />

        {/* Col 4 — About blurb */}
        <div className="text-sm text-white/70 leading-relaxed">
          {t.about}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-6 md:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-white font-bold text-center md:text-left">
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1">
          <span>{t.fullService}</span>
          <span className="hidden md:inline">|</span>
          <a href={href('produtora', locale)} className="hover:opacity-70 transition-opacity">{t.production}</a>
        </div>
        <span className="md:mr-20 text-balance">{t.rights}</span>
      </div>
    </footer>
  );
}
