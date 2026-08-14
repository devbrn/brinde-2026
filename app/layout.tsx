import type { Metadata } from 'next';
import { Playfair_Display, Inter, Poppins } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/components/LenisProvider';
import { MetaPixel } from '@/components/MetaPixel';

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

export const metadata: Metadata = {
  title: 'Brinde — Marketing & Publicidade',
  description: 'Agência full-service de estratégia, criação e execução',
  icons: {
    icon: 'https://res.cloudinary.com/dyezpmorm/image/upload/v1786733556/brinde-favicon_doyhvi.webp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable} ${poppins.variable}`}>
      {/*
        Google Tag Manager — descomente e troque GTM-XXXXXXX pelo container ID.

        <head>:
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-XXXXXXX');`}
        </Script>

        Início do <body>:
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      */}
      <body className="font-sans bg-white text-[#050a30] antialiased">
        <MetaPixel />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
