import type { Metadata } from 'next';
import { HtmlLandingPage } from '@/components/pages/HtmlLandingPage';

export const metadata: Metadata = {
  title: 'Agência Brinde | Marketing de Performance para Marmorarias',
};

export default function MarmorariasLandingPage() {
  return (
    <HtmlLandingPage
      sourcePath="docs/paginas-novas/brinde-lp-marmorarias.html"
      scriptId="landing-marmorarias-script"
    />
  );
}
