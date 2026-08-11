import type { Metadata } from 'next';
import { Playfair_Display, Inter, Poppins } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/components/LenisProvider';

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable} ${poppins.variable}`}>
      <body className="font-sans bg-white text-[#050a30] antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
