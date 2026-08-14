export const CAMPAIGN_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
] as const;

export type CampaignParams = Partial<Record<(typeof CAMPAIGN_KEYS)[number], string>>;

const STORAGE_KEY = 'brinde:campaign';

/**
 * Lê os parâmetros de campanha da URL e guarda na sessão.
 *
 * O visitante costuma cair pelo anúncio numa página e só depois navegar até o
 * formulário, quando a query string já se perdeu. Por isso a primeira captura
 * é preservada em sessionStorage e uma URL sem parâmetros não a sobrescreve.
 */
export function captureCampaignParams(): CampaignParams {
  if (typeof window === 'undefined') return {};

  const search = new URLSearchParams(window.location.search);
  const fromUrl: CampaignParams = {};

  CAMPAIGN_KEYS.forEach((key) => {
    const value = search.get(key)?.trim();
    if (value) fromUrl[key] = value.slice(0, 255);
  });

  try {
    if (Object.keys(fromUrl).length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }

    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CampaignParams) : {};
  } catch {
    // sessionStorage indisponível (modo privado, cookies bloqueados): o que
    // veio na URL da página atual ainda é melhor que nada.
    return fromUrl;
  }
}
