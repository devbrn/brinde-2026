import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HomePage } from '@/components/pages/HomePage';
import { AboutPage } from '@/components/pages/AboutPage';
import { AwardPage } from '@/components/pages/AwardPage';
import { ServicesPage } from '@/components/pages/ServicesPage';
import { ProductionPage } from '@/components/pages/ProductionPage';
import { ContactPage } from '@/components/pages/ContactPage';
import { ToastPage } from '@/components/pages/ToastPage';
import { WorkPage } from '@/components/pages/WorkPage';
import { getDictionary } from '@/lib/i18n';
import {
  DEFAULT_LOCALE,
  PREFIXED_LOCALES,
  ROUTES,
  href,
  routeKeyFromSlug,
  type PrefixedLocale,
  type RouteKey,
} from '@/lib/i18n/config';

type Params = { locale: string; slug?: string[] };

function isPrefixedLocale(value: string): value is PrefixedLocale {
  return (PREFIXED_LOCALES as readonly string[]).includes(value);
}

/** Uma rota por (locale, página). O slug vazio é a home do idioma. */
export function generateStaticParams() {
  return PREFIXED_LOCALES.flatMap((locale) =>
    (Object.keys(ROUTES) as RouteKey[]).map((key) => {
      const slug = ROUTES[key][locale];
      return { locale, slug: slug ? [slug] : [] };
    })
  );
}

/** Resolve (locale, slug) para a chave canônica da página, ou null se não existir. */
async function resolve(params: Promise<Params>) {
  const { locale, slug } = await params;
  if (!isPrefixedLocale(locale)) return null;

  // Só aceitamos um nível de slug — o site é plano.
  if (slug && slug.length > 1) return null;

  const key = slug?.length ? routeKeyFromSlug(slug[0], locale) : 'home';
  return key ? { locale, key } : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const resolved = await resolve(params);
  if (!resolved) return {};

  const { locale, key } = resolved;
  const dict = getDictionary(locale);

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    alternates: {
      canonical: href(key, locale),
      languages: Object.fromEntries([
        ['pt-BR', href(key, DEFAULT_LOCALE)],
        ...PREFIXED_LOCALES.map((target) => [target, href(key, target)]),
      ]),
    },
  };
}

export default async function LocalePage({ params }: { params: Promise<Params> }) {
  const resolved = await resolve(params);
  if (!resolved) notFound();

  const { locale, key } = resolved;
  const dict = getDictionary(locale);

  switch (key) {
    case 'home':
      return <HomePage dict={dict} locale={locale} />;
    case 'sobreNos':
      return <AboutPage dict={dict} locale={locale} />;
    case 'premio':
      return <AwardPage dict={dict} />;
    case 'servicos':
      return <ServicesPage dict={dict} locale={locale} />;
    case 'produtora':
      return <ProductionPage dict={dict} />;
    case 'contato':
      return <ContactPage dict={dict} />;
    case 'brindamos':
      return <ToastPage dict={dict} />;
    case 'fizemos':
      return <WorkPage dict={dict} />;
  }
}
