import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Script from 'next/script';
import { Playfair_Display, Inter, Poppins } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/components/LenisProvider';
import { MetaPixel } from '@/components/MetaPixel';
import {
  getDictionary,
  DEFAULT_LOCALE,
  HTML_LANG,
  LOCALES,
  LOCALE_HEADER,
  type Locale,
} from '@/lib/i18n';

const GTM_ID = 'GTM-KZTNHGSZ';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.agenciabrinde.com.br';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-poppins',
});

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await currentLocale());
  return {
    // Torna canonical e hreflang absolutos, como o Google exige.
    metadataBase: new URL(SITE_URL),
    title: dict.metadata.title,
    description: dict.metadata.description,
    icons: {
      icon: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1786733556/brinde-favicon_doyhvi.webp',
    },
  };
}

/** Idioma da requisição, escrito pelo proxy a partir do prefixo da URL. */
async function currentLocale(): Promise<Locale> {
  const value = (await headers()).get(LOCALE_HEADER);
  return (LOCALES as readonly string[]).includes(value ?? '')
    ? (value as Locale)
    : DEFAULT_LOCALE;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await currentLocale();

  return (
    <html lang={HTML_LANG[locale]} className={`${playfair.variable} ${inter.variable} ${poppins.variable}`}>
      <head>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body className="font-sans bg-white text-[#050a30] antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <MetaPixel />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
