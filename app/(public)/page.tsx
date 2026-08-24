import type { Metadata } from 'next';
import { HomePage } from '@/components/pages/HomePage';
import { getDictionary, DEFAULT_LOCALE, href } from '@/lib/i18n';
import { PREFIXED_LOCALES } from '@/lib/i18n/config';

const ROUTE_KEY = 'home' as const;

export const metadata: Metadata = {
  alternates: {
    canonical: href(ROUTE_KEY, DEFAULT_LOCALE),
    languages: Object.fromEntries([
      ['pt-BR', href(ROUTE_KEY, DEFAULT_LOCALE)],
      ...PREFIXED_LOCALES.map((locale) => [locale, href(ROUTE_KEY, locale)]),
    ]),
  },
};

export default function Page() {
  return <HomePage dict={getDictionary(DEFAULT_LOCALE)} locale={DEFAULT_LOCALE} />;
}
