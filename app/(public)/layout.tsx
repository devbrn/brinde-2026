import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { getDictionary, DEFAULT_LOCALE } from '@/lib/i18n';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dict = getDictionary(DEFAULT_LOCALE);

  return (
    <>
      <Nav dict={dict} locale={DEFAULT_LOCALE} />
      <main>{children}</main>
      <Footer dict={dict} locale={DEFAULT_LOCALE} />
      <WhatsAppButton dict={dict} />
    </>
  );
}
