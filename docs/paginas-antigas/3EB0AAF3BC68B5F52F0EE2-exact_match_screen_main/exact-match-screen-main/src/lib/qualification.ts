/**
 * Lógica de qualificação centralizada — ConstruLead / Agência Brinde.
 * Edite as opções e as regras somente aqui.
 */

export const SCHEDULING_URL = "#agenda"; // substituir pela URL da ferramenta de agenda

export const PROBLEM_OPTIONS = [
  "Dependemos muito de indicação",
  "A entrada de novos orçamentos é irregular",
  "Até chegam contatos, mas muitos não têm perfil",
  "Queremos aumentar o volume de novas obras",
  "Hoje isso não é uma prioridade",
] as const;

export const URGENCY_OPTIONS = [
  "Quero começar o quanto antes",
  "Ainda este mês",
  "Nos próximos 2 a 3 meses",
  "Estou apenas pesquisando por enquanto",
] as const;

export const REVENUE_OPTIONS = [
  "Até R$ 79 mil",
  "R$ 80 mil a R$ 149 mil",
  "R$ 150 mil a R$ 299 mil",
  "R$ 300 mil a R$ 499 mil",
  "R$ 500 mil ou mais",
] as const;

export const CAPACITY_OPTIONS = [
  "Sim",
  "Sim, mas precisaríamos ajustar a operação",
  "Não neste momento",
] as const;

export type ProblemAnswer = (typeof PROBLEM_OPTIONS)[number];
export type UrgencyAnswer = (typeof URGENCY_OPTIONS)[number];
export type RevenueAnswer = (typeof REVENUE_OPTIONS)[number];
export type CapacityAnswer = (typeof CAPACITY_OPTIONS)[number];

export type QualificationStatus = "qualified" | "not_qualified";

export interface LeadData {
  problem: ProblemAnswer;
  urgency: UrgencyAnswer;
  revenue: RevenueAnswer;
  capacity: CapacityAnswer;
  name: string;
  whatsapp: string;
  company: string;
  qualificationStatus: QualificationStatus;
  createdAt: string;
}

const QUALIFYING_REVENUE: readonly string[] = [
  "R$ 80 mil a R$ 149 mil",
  "R$ 150 mil a R$ 299 mil",
  "R$ 300 mil a R$ 499 mil",
  "R$ 500 mil ou mais",
];

const QUALIFYING_CAPACITY: readonly string[] = [
  "Sim",
  "Sim, mas precisaríamos ajustar a operação",
];

const DISQUALIFYING_PROBLEM = "Hoje isso não é uma prioridade";

export function evaluateQualification(answers: {
  problem: string;
  revenue: string;
  capacity: string;
  /** Armazenada para lead scoring; não impede a qualificação nesta versão. */
  urgency: string;
}): QualificationStatus {
  const revenueOk = QUALIFYING_REVENUE.includes(answers.revenue);
  const capacityOk = QUALIFYING_CAPACITY.includes(answers.capacity);
  const problemOk = answers.problem !== DISQUALIFYING_PROBLEM;

  return revenueOk && capacityOk && problemOk ? "qualified" : "not_qualified";
}

/**
 * Ponto único de saída do lead. Hoje apenas registra localmente.
 * Substituir por chamada a CRM / webhook / Kommo / Google Sheets quando disponível.
 */
export async function submitLead(lead: LeadData): Promise<void> {
  console.info("[lead]", lead);
}

export function formatWhatsapp(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function isValidWhatsapp(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 || digits.length === 11;
}
