import type { Metadata } from 'next';
import { HtmlLandingPage } from '@/components/pages/HtmlLandingPage';

export const metadata: Metadata = {
  title: 'Brinde: Sua chapa é premium. Sua demanda comercial precisa ser também.',
};

export default function ConversaoLandingPage() {
  return (
    <HtmlLandingPage
      sourcePath="docs/paginas-novas/brinde-lp-conversao.html"
      scriptId="landing-conversao-script"
    />
  );
}
