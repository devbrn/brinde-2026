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
      sourcePath="docs/paginas-novas/3EB0B78792B3FC12253CE8-precise_import_main__2_/precise-import-main/public/construlead-canonical.html"
      scriptId="analise-estrategica-gratuita-script"
      assetReplacements={{
        '/images/nero-texture.jpg': '/marmoristas/brinde-02/assets/nero-texture.jpg',
        '/images/nero-hero.jpg': '/marmoristas/brinde-02/assets/nero-hero.jpg',
        '/images/nero-hero-mobile.jpg': '/marmoristas/brinde-02/assets/nero-hero-mobile.jpg',
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
