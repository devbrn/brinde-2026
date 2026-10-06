import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

const html = readFileSync(new URL('../docs/paginas-antigas/poq.html', import.meta.url), 'utf8');
const script = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
  .filter(([, attributes]) => !attributes.includes('application/ld+json'))
  .map((match) => match[2]).join('\n');

function setup(response = async () => ({ ok: true, json: async () => ({ success: true }) }), revenue = '199', capacity = 'sim') {
  const answers = { fat: revenue, cap: capacity, sit: 'indicacao', inv: '5999' };
  const values = { nome: 'Teste POQ', empresa: 'Marmoraria Teste', cidade: 'Campinas / SP', whats: '11999999999', email: 'teste@example.com' };
  const radios = [...html.matchAll(/<label class="choice"><input name="([^"]+)" type="radio" value="([^"]+)"\/>\s*([^<]+)<\/label>/g)]
    .map(([, name, value, label]) => ({ name, value, checked: answers[name] === value, closest: () => ({ textContent: label }) }));
  const fields = Object.entries(values).map(([name, value]) => ({ name, value, checkValidity: () => Boolean(value) }));
  function element() {
    const classes = new Set();
    return { style: {}, textContent: '', innerHTML: '', disabled: false, classList: {
      add: (name) => classes.add(name),
      contains: (name) => classes.has(name),
      toggle: (name, enabled) => enabled ? classes.add(name) : classes.delete(name),
    } };
  }
  const ids = Object.fromEntries(['prev', 'next', 'qform', 'ok', 'no', 'form-error'].map((id) => [id, element()]));
  const floating = element();
  ids.qform.querySelector = (selector) => {
    const name = selector.match(/name="([^"]+)"/)?.[1];
    return selector.includes(':checked') ? radios.find((input) => input.name === name && input.checked) : fields.find((input) => input.name === name);
  };
  ids.qform.reportValidity = () => false;
  const questions = Object.keys(answers).map((name) => ({ ...element(), querySelector: () => radios.find((input) => input.name === name && input.checked) }));
  questions.push({ ...element(), querySelectorAll: () => fields });
  const calls = [];
  runInNewContext(script, {
    document: {
      getElementById: (id) => ids[id],
      querySelector: (selector) => selector === '.floating' ? floating : null,
      querySelectorAll: (selector) => selector === '.question' ? questions : selector === '.steps i' ? questions.map(element) : [],
    },
    alert: () => {},
    fetch: async (url, options) => { calls.push({ url, ...options }); return response(); },
  });
  for (let i = 0; i < 4; i++) ids.next.onclick();
  return { ids, calls, fields, questions, floating };
}

const officialMessage = '<p>Obrigado por nos contar um pouco mais sobre sua marmoraria.</p><p>A proposta foi desenhada para marmorarias em uma fase específica de operação e crescimento, por isso preferimos ser criteriosos antes de recomendar qualquer próximo passo.</p><p>Neste momento, nossa avaliação é que o ConstruLead não seria a recomendação mais adequada para o estágio atual da sua operação.</p><p>Um Brinde e Bons Negócios 🥂</p><a class="btn" href="https://agenciabrinde.com.br/" target="_blank" rel="noopener noreferrer">Visite o nosso site</a>';

test('POQ envia os dados ao endpoint de e-mail antes de liberar o resultado', async () => {
  let resolve;
  const pending = new Promise((done) => { resolve = done; });
  const { ids, calls } = setup(() => pending);
  const sending = ids.next.onclick();
  assert.equal(calls.length, 1, 'O formulário precisa chamar a API que salva o contato e envia o e-mail');
  assert.equal(ids.qform.style.display, undefined);
  assert.equal(ids.ok.classList.contains('show'), false);
  assert.equal(ids.next.disabled, true);
  await ids.next.onclick();
  assert.equal(calls.length, 1, 'Cliques repetidos não devem duplicar o envio');
  assert.equal(calls[0].url, '/api/marmorarias-diagnostico');
  assert.equal(calls[0].method, 'POST');
  assert.equal(calls[0].headers['Content-Type'], 'application/json');
  const data = JSON.parse(calls[0].body);
  assert.equal(data.name, 'Teste POQ');
  assert.equal(data.email, 'teste@example.com');
  assert.equal(data.phone, '11999999999');
  assert.equal(data.company, 'Marmoraria Teste');
  assert.match(data.challenge, /Dependemos demais de indicações/);
  for (const text of ['R$ 100 mil a R$ 199 mil', 'Sim', 'Dependemos demais de indicações', 'R$ 4.000 a R$ 5.999', 'Campinas / SP', '/poq']) assert.ok(data.message.includes(text), text);
  resolve({ ok: true, json: async () => ({ success: true }) });
  await sending;
  assert.equal(ids.qform.style.display, 'none');
  assert.equal(ids.ok.classList.contains('show'), true);
});

test('POQ mantém os dados e permite repetir quando o envio falha', async () => {
  for (const response of [
    async () => { throw new Error('offline'); },
    async () => ({ ok: false, json: async () => ({ success: false }) }),
    async () => ({ ok: true, json: async () => ({ success: false }) }),
  ]) {
    let failing = true;
    const { ids, calls } = setup(() => failing ? response() : { ok: true, json: async () => ({ success: true }) });
    await ids.next.onclick();
    assert.equal(ids.qform.style.display, undefined);
    assert.equal(ids.ok.classList.contains('show'), false);
    assert.equal(ids.next.disabled, false);
    assert.ok(ids['form-error'].textContent);
    failing = false;
    await ids.next.onclick();
    assert.equal(calls.length, 2);
    assert.equal(ids.ok.classList.contains('show'), true);
  }
});

test('POQ aplica os seis cenários de faturamento e capacidade antes do envio', () => {
  const scenarios = [
    { revenue: '59', capacity: 'sim', blocked: true, label: 'até 59k bloqueia' },
    { revenue: '99', capacity: 'sim', blocked: false, label: '60–99k + sim avança' },
    { revenue: '99', capacity: 'ajustes', blocked: false, label: '60–99k + ajustes avança' },
    { revenue: '99', capacity: 'nao', blocked: true, label: '60–99k + não bloqueia' },
    { revenue: '99', capacity: 'nao', blocked: true, label: '60–99k + não neste momento bloqueia' },
    { revenue: '199', capacity: 'nao', blocked: false, label: '100k+ mantém o fluxo normal' },
  ];
  for (const scenario of scenarios) {
    const { ids, calls, questions, floating } = setup(undefined, scenario.revenue, scenario.capacity);
    assert.equal(ids.no.classList.contains('show'), scenario.blocked, scenario.label);
    assert.equal(calls.length, 0, `${scenario.label}: nenhuma chamada antes dos dados de contato`);
    assert.equal(ids.no.innerHTML, scenario.blocked ? officialMessage : '', scenario.label);
    if (scenario.blocked) {
      ids.prev.onclick();
      ids.next.onclick();
      ids.qform.onsubmit({ preventDefault() {} });
      assert.equal(questions[4].classList.contains('active'), false, `${scenario.label}: não alcança a etapa de contato`);
      assert.equal(calls.length, 0, `${scenario.label}: submit não envia o lead`);
      assert.equal(ids.no.innerHTML, officialMessage, `${scenario.label}: callbacks não removem o bloqueio`);
      assert.equal(floating.style.display, 'none', `${scenario.label}: CTA fixo não cobre a mensagem`);
    } else {
      assert.equal(questions[4].classList.contains('active'), true, `${scenario.label}: alcança a etapa de contato`);
    }
  }
});

test('POQ não envia contatos com campos obrigatórios vazios', async () => {
  const { ids, calls, fields } = setup();
  fields[0].value = '';
  await ids.next.onclick();
  assert.equal(calls.length, 0);
});
