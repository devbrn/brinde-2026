import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { getDictionary } from '@/lib/i18n';
import { PREFIXED_LOCALES, type PrefixedLocale } from '@/lib/i18n/config';

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }));
}

function isPrefixedLocale(value: string): value is PrefixedLocale {
  return (PREFIXED_LOCALES as readonly string[]).includes(value);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isPrefixedLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <Nav dict={dict} locale={locale} />
      <main>{children}</main>
      <Footer dict={dict} locale={locale} />
      <WhatsAppButton dict={dict} />
    </>
  );
}
