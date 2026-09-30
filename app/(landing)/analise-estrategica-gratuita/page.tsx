import type { Metadata } from 'next';
import { HtmlLandingPage } from '@/components/pages/HtmlLandingPage';

export const metadata: Metadata = {
  title: 'Brinde | ConstruLead para Marmorarias',
  description:
    'Sistema de geração de novos orçamentos qualificados para marmorarias.',
};

export default function AnaliseEstrategicaGratuitaPage() {
  return (
    <HtmlLandingPage
      sourcePath="docs/paginas-novas/3EB0B528334F07415DA4DD-pixel_perfect_replica_main/pixel-perfect-replica-main/public/construlead-canonical.html"
      scriptId="analise-estrategica-gratuita-script"
      assetReplacements={{
        '/assets/hero-bg-1920.jpg': '/marmoristas/brinde-02/assets/hero-bg-1920.jpg',
        '/videos/video-principal-construlead.mp4':
          '/marmoristas/brinde-02/videos/video-principal-construlead.mp4',
        '/videos/depoimento-ana-dias.mp4':
          '/marmoristas/brinde-02/videos/depoimento-ana-dias.mp4',
        '/videos/depoimento-ailton-souza.mp4':
          '/marmoristas/brinde-02/videos/depoimento-ailton-souza.mp4',
        '/videos/depoimento-fabio-uili.mp4':
          '/marmoristas/brinde-02/videos/depoimento-fabio-uili.mp4',
      }}
    />
  );
}
