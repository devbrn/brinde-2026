export const SCHEDULING_URL = 'https://calendar.app.google/c5ZZZmtLTyqbR9WM6';
export const SITE_URL = 'https://agenciabrinde.com.br/';
export const QUALIFICATION_FORM_ID = 'diagnostico-formulario';

export const REVENUE_OPTIONS = [
  'Até R$ 59 mil',
  'R$ 60 mil a R$ 99 mil',
  'R$ 100 mil a R$ 199 mil',
  'R$ 200 mil a R$ 499 mil',
  'R$ 500 mil ou mais',
] as const;

export const CAPACITY_OPTIONS = [
  'Sim',
  'Sim, com alguns ajustes',
  'Não neste momento',
] as const;

export const DISQUALIFICATION_MESSAGE = [
  'Obrigado por nos contar um pouco mais sobre sua marmoraria.',
  'A proposta foi desenhada para marmorarias em uma fase específica de operação e crescimento, por isso preferimos ser criteriosos antes de recomendar qualquer próximo passo.',
  'Neste momento, nossa avaliação é que o ConstruLead não seria a recomendação mais adequada para o estágio atual da sua operação.',
  'Um Brinde e Bons Negócios 🥂',
] as const;

export function isLeadDisqualified(revenue?: string, capacity?: string): boolean {
  return revenue === REVENUE_OPTIONS[0] ||
    (revenue === REVENUE_OPTIONS[1] && capacity === CAPACITY_OPTIONS[2]);
}

export const SITUATION_OPTIONS = [
  'Dependemos demais de indicações',
  'A entrada de novos orçamentos é irregular',
  'Fazemos muito orçamento e fechamos pouco',
  'Perdemos tempo com quem só pesquisa preço',
  'Não sabemos o que realmente está virando venda',
] as const;

export const INVESTMENT_OPTIONS = [
  'Até R$ 2.999',
  'R$ 3.000 a R$ 3.999',
  'R$ 4.000 a R$ 5.999',
  'R$ 6.000 a R$ 9.999',
  'R$ 10.000 ou mais',
  'Ainda não sei — preciso entender os números primeiro',
] as const;

export function scrollToQualificationForm() {
  document
    .getElementById(QUALIFICATION_FORM_ID)
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function formatWhatsapp(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function isValidWhatsapp(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 10 && digits.length !== 11) return false;
  const ddd = Number(digits.slice(0, 2));
  if (ddd < 11 || ddd > 99) return false;
  if (digits.length === 11 && digits[2] !== '9') return false;
  return true;
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const BRAND_LOGO = '/marmoristas/brinde-04/assets/brand-logo.png';
