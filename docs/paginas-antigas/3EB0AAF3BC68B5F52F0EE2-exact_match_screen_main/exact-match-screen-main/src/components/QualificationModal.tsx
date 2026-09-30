import { useEffect, useMemo, useRef, useState } from "react";
import brandLogo from "@/assets/brinde-logo.png.asset.json";
import {
  CAPACITY_OPTIONS,
  PROBLEM_OPTIONS,
  REVENUE_OPTIONS,
  SCHEDULING_URL,
  URGENCY_OPTIONS,
  evaluateQualification,
  formatWhatsapp,
  isValidWhatsapp,
  submitLead,
  type LeadData,
  type QualificationStatus,
} from "@/lib/qualification";

const STEPS = [
  {
    key: "problem",
    question:
      "Hoje, qual dessas situações mais incomoda você na geração de novas obras?",
    options: PROBLEM_OPTIONS,
  },
  {
    key: "urgency",
    question: "Quando você gostaria de resolver isso?",
    options: URGENCY_OPTIONS,
  },
  {
    key: "revenue",
    question:
      "Hoje, qual é aproximadamente o faturamento mensal da sua marmoraria?",
    options: REVENUE_OPTIONS,
  },
  {
    key: "capacity",
    question:
      "Se novas obras começarem a entrar, sua marmoraria consegue atender mais demanda hoje?",
    options: CAPACITY_OPTIONS,
  },
] as const;

type AnswerKey = (typeof STEPS)[number]["key"];

interface ContactForm {
  name: string;
  whatsapp: string;
  company: string;
}

export function QualificationModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<AnswerKey, string>>>({});
  const [contact, setContact] = useState<ContactForm>({
    name: "",
    whatsapp: "",
    company: "",
  });
  const [touched, setTouched] = useState<{
    name: boolean;
    whatsapp: boolean;
    company: boolean;
  }>({ name: false, whatsapp: false, company: false });
  const [result, setResult] = useState<QualificationStatus | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>(
          "button, input, a[href], [tabindex]:not([tabindex='-1'])",
        )
        ?.focus();
    }, 40);
    return () => {
      document.body.style.overflow = overflow;
      previousFocus.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        "button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])",
      );
      if (!focusables || focusables.length === 0) return;
      const list = Array.from(focusables);
      const first = list[0];
      const last = list[list.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Reset quando o modal é reaberto após um resultado
  useEffect(() => {
    if (open && result) {
      setStep(0);
      setAnswers({});
      setContact({ name: "", whatsapp: "", company: "" });
      setTouched({ name: false, whatsapp: false, company: false });
      setResult(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const nameError = contact.name.trim().length < 2 ? "Informe seu nome." : "";
  const whatsappError = !isValidWhatsapp(contact.whatsapp)
    ? "Informe um WhatsApp válido com DDD."
    : "";
  const companyError =
    contact.company.trim().length < 2 ? "Informe o nome da marmoraria." : "";
  const contactValid = !nameError && !whatsappError && !companyError;

  const totalSteps = STEPS.length + 1;
  const progress = useMemo(
    () => Math.round(((step + 1) / totalSteps) * 100),
    [step, totalSteps],
  );

  const current = step < STEPS.length ? STEPS[step] : undefined;

  if (!open) return null;

  const select = (key: AnswerKey, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    window.setTimeout(() => setStep((s) => Math.min(s + 1, STEPS.length)), 180);
  };

  const handleSubmit = async () => {
    setTouched({ name: true, whatsapp: true, company: true });
    if (!contactValid || submitting) return;
    setSubmitting(true);
    const status = evaluateQualification({
      problem: answers.problem ?? "",
      urgency: answers.urgency ?? "",
      revenue: answers.revenue ?? "",
      capacity: answers.capacity ?? "",
    });
    const lead = {
      problem: answers.problem,
      urgency: answers.urgency,
      revenue: answers.revenue,
      capacity: answers.capacity,
      name: contact.name.trim(),
      whatsapp: contact.whatsapp,
      company: contact.company.trim(),
      qualificationStatus: status,
      createdAt: new Date().toISOString(),
    } as LeadData;
    await submitLead(lead);
    setSubmitting(false);
    setResult(status);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-end justify-center overflow-y-auto bg-background/85 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Fechar"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Diagnóstico gratuito — qualificação"
        className="relative w-full max-w-xl rounded-t-xl border border-copper/40 bg-surface shadow-[var(--shadow-elevate)] sm:rounded-lg"
      >
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-7">
          {result ? (
            <img src={brandLogo.url} alt="Brinde Marketing & Publicidade" className="h-8 w-auto" />
          ) : (
            <span className="kicker">
              Etapa {step + 1} de {totalSteps}
            </span>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar formulário"
            className="text-2xl leading-none text-muted-foreground transition-colors hover:text-foreground"
          >
            ×
          </button>
        </div>

        {!result && (
          <div
            className="h-px w-full bg-border"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-px rule-gold transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <div className="px-5 py-6 sm:px-7 sm:py-8">
          {result === "qualified" && (
            <div className="space-y-5">
              <h2 className="text-2xl leading-tight sm:text-3xl">
                Sua marmoraria tem o perfil que buscamos.
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Pelas suas respostas, faz sentido entender melhor sua operação e
                avaliar se o ConstruLead pode funcionar no seu cenário.
              </p>
              <a
                href={SCHEDULING_URL}
                className="inline-flex items-center justify-center rounded-sm bg-primary px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-all duration-300 hover:brightness-110"
              >
                Escolher meu horário
              </a>
            </div>
          )}

          {result === "not_qualified" && (
            <div className="space-y-5">
              <h2 className="text-2xl leading-tight sm:text-3xl">
                Talvez ainda não seja o momento certo.
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                O ConstruLead foi desenvolvido para marmorarias já estruturadas e
                prontas para investir na geração de novas oportunidades.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Obrigado pelo interesse na Brinde.
              </p>
            </div>
          )}

          {!result && current && (
            <div className="space-y-6">
              <h2 className="text-xl leading-snug sm:text-2xl">
                {current.question}
              </h2>
              <div className="flex flex-col gap-2.5">
                {current.options.map((option) => {
                  const active = answers[current.key] === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={active}
                      onClick={() => select(current.key, option)}
                      className={`rounded-sm border px-4 py-3.5 text-left text-sm transition-all duration-200 sm:text-[0.95rem] ${
                        active
                          ? "border-gold bg-surface-2 text-gold"
                          : "border-border text-foreground hover:border-border-strong hover:bg-surface-2"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {!result && step === STEPS.length && (
            <form
              className="space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                void handleSubmit();
              }}
            >
              <h2 className="text-xl leading-snug sm:text-2xl">
                Perfeito. Agora só precisamos de algumas informações para
                continuar.
              </h2>

              <Field
                id="lead-name"
                label="Nome"
                value={contact.name}
                error={touched.name ? nameError : ""}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                onChange={(value) =>
                  setContact((c) => ({ ...c, name: value }))
                }
                autoComplete="name"
              />
              <Field
                id="lead-whatsapp"
                label="WhatsApp"
                value={contact.whatsapp}
                error={touched.whatsapp ? whatsappError : ""}
                onBlur={() => setTouched((t) => ({ ...t, whatsapp: true }))}
                onChange={(value) =>
                  setContact((c) => ({ ...c, whatsapp: formatWhatsapp(value) }))
                }
                inputMode="tel"
                placeholder="(11) 99999-9999"
                autoComplete="tel"
              />
              <Field
                id="lead-company"
                label="Nome da marmoraria"
                value={contact.company}
                error={touched.company ? companyError : ""}
                onBlur={() => setTouched((t) => ({ ...t, company: true }))}
                onChange={(value) =>
                  setContact((c) => ({ ...c, company: value }))
                }
                autoComplete="organization"
              />

              <button
                type="submit"
                disabled={!contactValid || submitting}
                className="w-full rounded-sm bg-primary px-6 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting ? "Enviando..." : "Continuar"}
              </button>
            </form>
          )}

          {!result && step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-gold"
            >
              ← Voltar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  onBlur,
  ...rest
}: {
  id: string;
  label: string;
  value: string;
  error: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  inputMode?: "tel" | "text";
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
        className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold"
        {...rest}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
