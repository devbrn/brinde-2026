import type { Metadata } from 'next';
import { HtmlLandingPage } from '@/components/pages/HtmlLandingPage';

export const metadata: Metadata = {
  title: 'Brinde — Quem já trabalha com a gente, mostra a cara.',
};

export default function MobileLandingPage() {
  return (
    <HtmlLandingPage
      sourcePath="docs/paginas-novas/brinde-lp-mobile/index.html"
      scriptId="landing-mobile-script"
      assetBasePath="/landing-assets/mobile"
    />
  );
}
