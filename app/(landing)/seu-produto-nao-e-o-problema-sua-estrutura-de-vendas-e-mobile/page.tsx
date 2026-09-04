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
      assetReplacements={{
        'assets/videos/ana-dias.mp4':
          'https://res.cloudinary.com/dyezpmorm/video/upload/v1788555060/ana-dias_j81jsz.mp4',
        'assets/videos/fabio-uili.mp4':
          'https://res.cloudinary.com/dyezpmorm/video/upload/v1788555060/fabio-uili_y1axgj.mp4',
        'assets/videos/ailton-souza.mp4':
          'https://res.cloudinary.com/dyezpmorm/video/upload/v1788555060/ailton-souza_yuhwaz.mp4',
      }}
    />
  );
}
