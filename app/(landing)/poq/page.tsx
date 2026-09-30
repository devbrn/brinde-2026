import type { Metadata } from 'next';
import { HtmlLandingPage } from '@/components/pages/HtmlLandingPage';

export const metadata: Metadata = {
  title: 'ConstruLead para Marmorarias | Agência Brinde',
  description:
    'Aquisição e qualificação de oportunidades de orçamento para marmorarias.',
};

export default function PoqPage() {
  return (
    <HtmlLandingPage
      sourcePath="docs/paginas-antigas/poq.html"
      scriptId="poq-landing-script"
    />
  );
}
