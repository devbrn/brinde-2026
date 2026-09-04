import type { Metadata } from 'next';
import MarmoristasLanding from '@/components/pages/marmoristas/MarmoristasLanding';

export const metadata: Metadata = {
  title: 'Mais pedidos de orçamento para sua marmoraria | Brinde',
  description:
    'Estratégia, mídia e estrutura comercial para marmorarias que querem gerar mais pedidos de orçamento com previsibilidade.',
};

export default function MarmoristasPage() {
  return <MarmoristasLanding />;
}
