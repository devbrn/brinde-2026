import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const officialText = [
  'Obrigado por nos contar um pouco mais sobre sua marmoraria.',
  'A proposta foi desenhada para marmorarias em uma fase específica de operação e crescimento, por isso preferimos ser criteriosos antes de recomendar qualquer próximo passo.',
  'Neste momento, nossa avaliação é que o ConstruLead não seria a recomendação mais adequada para o estágio atual da sua operação.',
  'Um Brinde e Bons Negócios 🥂',
].join('\n\n');

function optionsFor(html, name) {
  return [...html.matchAll(new RegExp(`name="${name}" type="radio" value="([^"]+)"`, 'g'))]
    .map(([, value]) => value);
}

function policyFunction(source, name, context) {
  const match = source.match(new RegExp(`(?:export )?function ${name}\\([^}]+\\}`));
  assert.ok(match, `${name} must exist`);
  const body = match[0]
    .replace(/^export /, '')
    .replace(/(\w+)\?: string/g, '$1')
    .replace(/\): boolean/, ')');
  return runInNewContext(`${body}; ${name}`, context);
}

function assertScenarios(check, values, form) {
  const [low, middle, high] = values.revenue;
  const [yes, adjustments, no] = values.capacity;
  for (const [revenue, capacity, expected, label] of [
    [low, yes, true, 'até 59k bloqueia'],
    [middle, yes, false, '60–99k + Sim avança'],
    [middle, adjustments, false, '60–99k + Sim com ajustes avança'],
    [middle, no, true, '60–99k + Não bloqueia'],
    [middle, no, true, '60–99k + Não neste momento bloqueia'],
    [high, no, false, '100k+ mantém o fluxo normal'],
  ]) {
    assert.equal(check(revenue, capacity), expected, `${form}: ${label}`);
  }
}

test('analise-estrategica-gratuita aplica a matriz aos values data-value existentes', () => {
  const html = read('../docs/paginas-novas/3EB0B78792B3FC12253CE8-precise_import_main__2_/precise-import-main/public/construlead-canonical.html');
  const revenue = ['Até R$ 59 mil', 'R$ 60 mil a R$ 99 mil', 'R$ 100 mil a R$ 199 mil'];
  const capacity = ['Sim', 'Sim, com alguns ajustes', 'Não neste momento'];
  for (const value of [...revenue, ...capacity]) assert.ok(html.includes(`data-value="${value}"`));
  const source = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(([, body]) => body).join('\n');
  const data = {};
  const check = policyFunction(source, 'shouldDisqualify', { data });
  assertScenarios((revenueValue, capacityValue) => {
    data.faturamento = revenueValue;
    data.capacidade = capacityValue;
    return check();
  }, { revenue, capacity }, '/analise-estrategica-gratuita');
  assert.ok(officialText.split('\n\n').every((paragraph) => source.includes(paragraph)));
  assert.match(source, /href="https:\/\/agenciabrinde\.com\.br\/"[^>]*>Visite o nosso site<\/a>/);
  assert.match(source, /disqualified\|\|shouldDisqualify\(\)\|\|cur!==5/);
  assert.match(source, /if\(shouldDisqualify\(\)\)showDisqualified\(\)/);
});

test('/poq aplica a matriz aos values de radio fat e cap existentes', () => {
  const html = read('../docs/paginas-antigas/poq.html');
  const revenue = optionsFor(html, 'fat');
  const capacity = optionsFor(html, 'cap');
  assert.deepEqual(revenue, ['59', '99', '199', '499', '500']);
  assert.deepEqual(capacity, ['sim', 'ajustes', 'nao']);
  const script = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter(([, attributes]) => !attributes.includes('application/ld+json'))
    .map(([, , body]) => body).join('\n');
  const answers = {};
  const check = policyFunction(script, 'isDisqualified', {
    answers,
    v(name) { return answers[name]; },
  });
  assertScenarios((revenueValue, capacityValue) => {
    answers.fat = revenueValue;
    answers.cap = capacityValue;
    return check();
  }, { revenue: ['59', '99', '199'], capacity: ['sim', 'ajustes', 'nao'] }, '/poq');
  assert.ok(officialText.split('\n\n').every((paragraph) => script.includes(paragraph)));
  assert.match(script, /href="https:\/\/agenciabrinde\.com\.br\/"[^>]*>Visite o nosso site<\/a>/);
  assert.match(script, /if\(disqualified\|\|isDisqualified\(\)\)\{showDisqualified\(\);return\}/);
});

test('/diagnostico-gratuito-30min aplica a matriz aos values dos options reais', () => {
  const policy = read('../components/brinde04/qualification.ts');
  const component = read('../components/brinde04/QualificationFormSection.tsx');
  const revenueMatch = policy.match(/export const REVENUE_OPTIONS = \[([\s\S]*?)\] as const;/);
  const capacityMatch = policy.match(/export const CAPACITY_OPTIONS = \[([\s\S]*?)\] as const;/);
  assert.ok(revenueMatch && capacityMatch);
  const revenue = [...revenueMatch[1].matchAll(/'([^']+)'/g)].map(([, value]) => value);
  const capacity = [...capacityMatch[1].matchAll(/'([^']+)'/g)].map(([, value]) => value);
  assert.deepEqual(revenue.slice(0, 3), ['Até R$ 59 mil', 'R$ 60 mil a R$ 99 mil', 'R$ 100 mil a R$ 199 mil']);
  assert.deepEqual(capacity, ['Sim', 'Sim, com alguns ajustes', 'Não neste momento']);
  const check = policyFunction(policy, 'isLeadDisqualified', { REVENUE_OPTIONS: revenue, CAPACITY_OPTIONS: capacity });
  assertScenarios(check, { revenue, capacity }, '/diagnostico-gratuito-30min');
  assert.ok(officialText.split('\n\n').every((paragraph) => policy.includes(paragraph)));
  assert.match(policy, /SITE_URL = 'https:\/\/agenciabrinde\.com\.br\/'/);
  assert.match(component, /href=\{SITE_URL\}[^>]*>\s*Visite o nosso site/);
  assert.match(component, /if \(disqualified \|\| isLeadDisqualified\(answers\.revenue, answers\.capacity\)\)/);
  assert.match(component, /isLeadDisqualified\(nextAnswers\.revenue, nextAnswers\.capacity\)/);
  assert.match(component, /onClick=\{\(\) => \{[\s\S]*?isLeadDisqualified\(answers\.revenue, answers\.capacity\)[\s\S]*?setStep/);
  assert.match(component, /setDisqualified\(true\)/);
});
