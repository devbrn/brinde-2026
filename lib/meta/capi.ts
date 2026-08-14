import { createHash } from 'crypto';
import { cookies, headers } from 'next/headers';

const PIXEL_ID = '649696579344889';
const API_VERSION = 'v21.0';

type LeadInput = {
  eventId: string;
  eventSourceUrl: string;
  email: string;
  phone?: string;
  fbclid?: string;
};

/** O Meta exige os dados pessoais normalizados e em SHA-256. */
function hash(value: string) {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

/** Telefone vai só com dígitos; sem o DDI o Meta não casa o contato. */
function hashPhone(value: string) {
  const digits = value.replace(/\D/g, '');
  if (!digits) return undefined;
  const withCountry = digits.startsWith('55') ? digits : `55${digits}`;
  return createHash('sha256').update(withCountry).digest('hex');
}

/**
 * O cookie `_fbc` só existe se o pixel do navegador já tiver rodado com o
 * fbclid na URL. Quando ele falta, o formato `fb.1.<timestamp>.<fbclid>`
 * reconstrói o identificador a partir do parâmetro que guardamos.
 */
function resolveFbc(cookieFbc: string | undefined, fbclid: string | undefined) {
  if (cookieFbc) return cookieFbc;
  if (!fbclid) return undefined;
  return `fb.1.${Date.now()}.${fbclid}`;
}

export async function sendLeadEvent(input: LeadInput) {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) {
    console.error('[meta-capi] META_CAPI_TOKEN ausente: evento Lead não enviado');
    return;
  }

  const cookieStore = await cookies();
  const headerStore = await headers();

  const userData: Record<string, string | string[]> = {
    em: [hash(input.email)],
  };

  const phoneHash = input.phone ? hashPhone(input.phone) : undefined;
  if (phoneHash) userData.ph = [phoneHash];

  const fbp = cookieStore.get('_fbp')?.value;
  if (fbp) userData.fbp = fbp;

  const fbc = resolveFbc(cookieStore.get('_fbc')?.value, input.fbclid);
  if (fbc) userData.fbc = fbc;

  // O IP do visitante chega no header do proxy da Vercel, não na conexão.
  const ip = headerStore.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (ip) userData.client_ip_address = ip;

  const userAgent = headerStore.get('user-agent');
  if (userAgent) userData.client_user_agent = userAgent;

  const response = await fetch(
    `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token: token,
        data: [
          {
            event_name: 'Lead',
            event_time: Math.floor(Date.now() / 1000),
            // Mesmo id usado pelo fbq no navegador: o Meta descarta a duplicata.
            event_id: input.eventId,
            event_source_url: input.eventSourceUrl,
            action_source: 'website',
            user_data: userData,
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    console.error('[meta-capi] resposta de erro:', response.status, await response.text());
  }
}
