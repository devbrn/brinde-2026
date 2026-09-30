import type { Metadata } from 'next';
import { Brinde04Landing } from '@/components/brinde04/Brinde04Landing';
import './brinde04.css';

export const metadata: Metadata = {
  title: 'ConstruLead para Marmorarias | Agência Brinde',
  description:
    'Estrutura de geração de novos pedidos de orçamento para marmorarias que já faturam e têm capacidade para crescer. Agende seu diagnóstico gratuito.',
};

export default function Brinde04Page() {
  return <Brinde04Landing />;
}
