export const LOCALES = ['pt', 'en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'pt';

/** Locales que ganham prefixo na URL. O padrão (pt) vive na raiz. */
export const PREFIXED_LOCALES = ['en', 'es'] as const;
export type PrefixedLocale = (typeof PREFIXED_LOCALES)[number];

/** Header escrito pelo proxy com o idioma da requisição; lido pelo root layout. */
export const LOCALE_HEADER = 'x-brinde-locale';

export const HTML_LANG: Record<Locale, string> = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es-ES',
};

/** Chave canônica de cada página → slug por idioma. */
export const ROUTES = {
  home: { pt: '', en: '', es: '' },
  sobreNos: { pt: 'sobre-nos', en: 'about-us', es: 'sobre-nosotros' },
  premio: { pt: 'premio', en: 'award', es: 'premio' },
  servicos: { pt: 'servicos', en: 'services', es: 'servicios' },
  produtora: { pt: 'produtora', en: 'production-company', es: 'productora' },
  contato: { pt: 'contato', en: 'contact', es: 'contacto' },
  brindamos: { pt: 'brindamos', en: 'we-toast', es: 'brindamos' },
  fizemos: { pt: 'fizemos', en: 'our-work', es: 'lo-que-hicimos' },
} as const;

export type RouteKey = keyof typeof ROUTES;

/** Monta o href de uma página no idioma pedido. */
export function href(key: RouteKey, locale: Locale): string {
  const slug = ROUTES[key][locale];
  if (locale === DEFAULT_LOCALE) return slug ? `/${slug}` : '/';
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

/** Dado um slug de URL e o idioma, devolve a chave canônica da página. */
export function routeKeyFromSlug(slug: string, locale: Locale): RouteKey | null {
  const entry = (Object.keys(ROUTES) as RouteKey[]).find(
    (key) => ROUTES[key][locale] === slug
  );
  return entry ?? null;
}
