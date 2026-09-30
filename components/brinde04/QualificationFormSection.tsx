'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import {
  CAPACITY_OPTIONS,
  EMAIL_REGEX,
  INVESTMENT_OPTIONS,
  QUALIFICATION_FORM_ID,
  REVENUE_OPTIONS,
  SCHEDULING_URL,
  SITUATION_OPTIONS,
  formatWhatsapp,
  isValidWhatsapp,
} from './qualification';

const TEXTURE = '/marmoristas/brinde-04/assets/texture-blue-roma.jpg';

const STEPS = [
  {
    key: 'revenue',
    question: 'Qual foi o faturamento médio mensal da sua marmoraria nos últimos 3 meses?',
    options: REVENUE_OPTIONS,
  },
  {
    key: 'capacity',
    question: 'Se novas obras entrarem, sua empresa consegue absorver mais demanda nos próximos 90 dias?',
    options: CAPACITY_OPTIONS,
  },
  {
    key: 'situation',
    question: 'Qual situação mais descreve sua operação hoje?',
    options: SITUATION_OPTIONS,
  },
  {
    key: 'investment',
    question: 'Qual faixa de investimento mensal em gestão + mídia você consegue manter por pelo menos 90 dias?',
    options: INVESTMENT_OPTIONS,
  },
] as const;

type AnswerKey = (typeof STEPS)[number]['key'];
type ContactKey = 'name' | 'company' | 'cityState' | 'whatsapp' | 'email';

const FIELDS: { key: ContactKey; label: string; autoComplete: string; inputMode?: 'tel' | 'email' | 'text'; placeholder?: string; type?: string }[] = [
  { key: 'name', label: 'Nome', autoComplete: 'name' },
  { key: 'company', label: 'Nome da empresa', autoComplete: 'organization' },
  { key: 'cityState', label: 'Cidade / UF', autoComplete: 'address-level2', placeholder: 'Ex.: Campinas / SP' },
  { key: 'whatsapp', label: 'WhatsApp', autoComplete: 'tel', inputMode: 'tel', placeholder: '(11) 99999-9999', type: 'tel' },
  { key: 'email', label: 'E-mail', autoComplete: 'email', inputMode: 'email', placeholder: 'voce@empresa.com.br', type: 'email' },
];

const TOTAL = 5;

function validate(c: Record<ContactKey, string>): Record<ContactKey, string> {
  return {
    name: c.name.trim().length < 2 ? 'Informe seu nome.' : '',
    company: c.company.trim().length < 2 ? 'Informe o nome da empresa.' : '',
    cityState: c.cityState.trim().length < 2 ? 'Informe sua cidade e UF.' : '',
    whatsapp: isValidWhatsapp(c.whatsapp) ? '' : 'Informe um WhatsApp válido com DDD.',
    email: EMAIL_REGEX.test(c.email.trim()) ? '' : 'Informe um e-mail válido.',
  };
}

export function QualificationFormSection() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<AnswerKey, string>>>({});
  const [contact, setContact] = useState<Record<ContactKey, string>>({
    name: '', company: '', cityState: '', whatsapp: '', email: '',
  });
  const [touched, setTouched] = useState<Partial<Record<ContactKey, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);
  const lock = useRef(false);

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    titleRef.current?.focus({ preventScroll: true });
    const top = sectionRef.current?.getBoundingClientRect().top ?? 0;
    if (top < -40) sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step, done]);

  const errors = validate(contact);
  const contactValid = Object.values(errors).every((e) => !e);
  const current = step < STEPS.length ? STEPS[step] : undefined;
  const filled = done ? TOTAL : step + 1;

  const handleSubmit = async () => {
    setTouched({ name: true, company: true, cityState: true, whatsapp: true, email: true });
    if (!contactValid || lock.current) return;
    lock.current = true;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/marmorarias-diagnostico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contact.name.trim(),
          email: contact.email.trim(),
          phone: contact.whatsapp,
          company: contact.company.trim(),
          challenge: `ConstruLead — ${answers.situation ?? 'diagnóstico'}`,
          message: [
            `Faturamento médio mensal: ${answers.revenue ?? '—'}`,
            `Capacidade nos próximos 90 dias: ${answers.capacity ?? '—'}`,
            `Situação atual: ${answers.situation ?? '—'}`,
            `Investimento mensal disponível: ${answers.investment ?? '—'}`,
            `Cidade / UF: ${contact.cityState.trim()}`,
            'Origem: Landing Page ConstruLead Blue Roma (/diagnostico-gratuito-30min)',
          ].join('\n'),
        }),
      });
      const result = (await res.json()) as { success?: boolean };
      if (!res.ok || !result.success) throw new Error('falha no envio');
      setDone(true);
    } catch {
      setError('Não foi possível enviar seus dados agora. Tente novamente em alguns instantes.');
    } finally {
      lock.current = false;
      setSubmitting(false);
    }
  };

  const primaryBtn =
    'inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-all duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-40';
  const backBtn =
    'inline-flex items-center justify-center rounded-sm border border-border bg-surface-2 px-6 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-copper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold';

  return (
    <section
      ref={sectionRef}
      id={QUALIFICATION_FORM_ID}
      className="relative isolate scroll-mt-20 overflow-hidden border-t border-border lg:scroll-mt-24"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={TEXTURE} alt="" loading="lazy" width={1920} height={1088} className="h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--background)_0%,transparent_25%,transparent_75%,var(--background)_100%)]" />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <div className="b4-shell b4-section-x py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[880px] rounded-lg border border-copper/40 bg-surface/95 shadow-[var(--shadow-elevate)] backdrop-blur-sm">
          <ol className="flex gap-1.5 px-5 pt-6 sm:gap-2 sm:px-10 sm:pt-8" aria-label={`Etapa ${Math.min(filled, TOTAL)} de ${TOTAL}`}>
            {Array.from({ length: TOTAL }).map((_, i) => (
              <li
                key={i}
                aria-current={!done && i === step ? 'step' : undefined}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i < filled ? 'bg-primary' : 'bg-mineral/60'}`}
              >
                <span className="sr-only">Etapa {i + 1}{i < filled ? ' (concluída ou atual)' : ''}</span>
              </li>
            ))}
          </ol>

          <div key={done ? 'done' : step} className="animate-[formStep_220ms_ease-out] px-5 py-8 sm:px-10 sm:py-10">
            {done ? (
              <div className="space-y-6 text-center sm:text-left">
                <h2 ref={titleRef} tabIndex={-1} className="text-2xl leading-tight outline-none sm:text-3xl">
                  Faz sentido avançarmos.
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Pelas informações fornecidas, existe compatibilidade inicial entre o momento da sua marmoraria e a proposta do ConstruLead.
                </p>
                <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer" className={`${primaryBtn} w-full sm:w-auto`}>
                  Escolher meu horário <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            ) : current ? (
              <fieldset>
                <legend className="w-full">
                  <span className="b4-kicker block">Etapa {step + 1} de {TOTAL}</span>
                  <h2 ref={titleRef} tabIndex={-1} className="mt-3 text-xl leading-snug outline-none sm:text-2xl">
                    {current.question}
                  </h2>
                </legend>
                <div className="mt-6 flex flex-col gap-2.5">
                  {current.options.map((option) => {
                    const active = answers[current.key] === option;
                    return (
                      <label
                        key={option}
                        className={`group flex cursor-pointer items-center gap-4 rounded-sm border px-4 py-3.5 text-sm transition-all duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold sm:text-[0.95rem] ${
                          active ? 'border-gold bg-surface-2 text-gold-soft' : 'border-border bg-surface text-foreground hover:border-copper hover:bg-surface-2'
                        }`}
                      >
                        <input
                          type="radio"
                          name={current.key}
                          value={option}
                          checked={active}
                          onChange={() => setAnswers((p) => ({ ...p, [current.key]: option }))}
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${active ? 'border-gold bg-gold text-background' : 'border-border-strong'}`}
                        >
                          {active && <Check className="h-3 w-3" strokeWidth={3} />}
                        </span>
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>
                <div className="mt-8 flex flex-col-reverse gap-3 min-[400px]:flex-row min-[400px]:justify-between">
                  {step > 0 ? (
                    <button type="button" onClick={() => setStep((s) => s - 1)} className={backBtn}>Voltar</button>
                  ) : <span />}
                  <button
                    type="button"
                    disabled={!answers[current.key]}
                    onClick={() => setStep((s) => s + 1)}
                    className={primaryBtn}
                  >
                    Próxima etapa <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </fieldset>
            ) : (
              <form
                noValidate
                onSubmit={(e) => { e.preventDefault(); void handleSubmit(); }}
              >
                <span className="b4-kicker block">Etapa {TOTAL} de {TOTAL}</span>
                <h2 ref={titleRef} tabIndex={-1} className="mt-3 text-xl leading-snug outline-none sm:text-2xl">
                  Agora queremos conhecer sua marmoraria.
                </h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {FIELDS.map((f) => {
                    const err = touched[f.key] ? errors[f.key] : '';
                    return (
                      <div key={f.key} className={`space-y-1.5 ${f.key === 'email' ? 'sm:col-span-2' : ''}`}>
                        <label htmlFor={`lead-${f.key}`} className="block text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                          {f.label}
                        </label>
                        <input
                          id={`lead-${f.key}`}
                          type={f.type ?? 'text'}
                          required
                          value={contact[f.key]}
                          onChange={(e) => {
                            const v = f.key === 'whatsapp' ? formatWhatsapp(e.target.value) : e.target.value;
                            setContact((c) => ({ ...c, [f.key]: v }));
                          }}
                          onBlur={() => setTouched((t) => ({ ...t, [f.key]: true }))}
                          aria-invalid={Boolean(err)}
                          aria-describedby={err ? `lead-${f.key}-err` : undefined}
                          autoComplete={f.autoComplete}
                          inputMode={f.inputMode}
                          placeholder={f.placeholder}
                          className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold aria-[invalid=true]:border-destructive"
                        />
                        {err && <p id={`lead-${f.key}-err`} className="text-xs text-destructive">{err}</p>}
                      </div>
                    );
                  })}
                </div>
                <p aria-live="polite" className="mt-5 min-h-0 text-sm text-destructive empty:hidden">{error}</p>
                <div className="mt-8 flex flex-col-reverse gap-3 min-[400px]:flex-row min-[400px]:justify-between">
                  <button type="button" onClick={() => setStep((s) => s - 1)} className={backBtn}>Voltar</button>
                  <button type="submit" disabled={submitting} className={primaryBtn}>
                    {submitting ? 'Enviando...' : <>Ver resultado <ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
