'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { db } from '@/lib/db';
import { contacts } from '@/lib/db/schema';

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFICATION_TO = 'comercial@agenciabrinde.com.br';
// Exige o domínio agenciabrinde.com.br verificado no Resend (SPF/DKIM no DNS).
const NOTIFICATION_FROM = 'Site Brinde <site@agenciabrinde.com.br>';

const contactSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, 'Selecione um serviço'),
  message: z.string().min(1, 'Mensagem é obrigatória'),
  utm_source: z.string().max(255).optional(),
  utm_medium: z.string().max(255).optional(),
  utm_campaign: z.string().max(255).optional(),
  utm_term: z.string().max(255).optional(),
  utm_content: z.string().max(255).optional(),
  gclid: z.string().max(255).optional(),
  fbclid: z.string().max(255).optional(),
});

type ContactData = z.infer<typeof contactSchema>;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderNotification(data: ContactData) {
  const rows = [
    ['Nome', data.name],
    ['E-mail', data.email],
    ['Telefone', data.phone || '—'],
    ['Empresa', data.company || '—'],
    ['Serviço', data.service],
  ]
    .map(
      ([label, value]) =>
        `<tr>
           <td style="padding:6px 12px 6px 0;color:#666;">${label}</td>
           <td style="padding:6px 0;color:#050a30;font-weight:600;">${escapeHtml(value)}</td>
         </tr>`
    )
    .join('');

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;">
      <h2 style="color:#050a30;margin:0 0 16px;">Novo pedido de orçamento</h2>
      <table style="border-collapse:collapse;font-size:14px;">${rows}</table>
      <p style="margin:20px 0 6px;color:#666;font-size:14px;">Mensagem</p>
      <p style="margin:0;color:#050a30;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
      ${renderOrigin(data)}
    </div>
  `;
}

function renderOrigin(data: ContactData) {
  const origin = [
    ['Origem', data.utm_source],
    ['Mídia', data.utm_medium],
    ['Campanha', data.utm_campaign],
    ['Termo', data.utm_term],
    ['Conteúdo', data.utm_content],
    ['Google Ads (gclid)', data.gclid],
    ['Meta Ads (fbclid)', data.fbclid],
  ].filter(([, value]) => Boolean(value)) as [string, string][];

  // Acesso direto ou orgânico não traz parâmetros: sem bloco de origem.
  if (origin.length === 0) return '';

  const rows = origin
    .map(
      ([label, value]) =>
        `<tr>
           <td style="padding:4px 12px 4px 0;color:#666;">${label}</td>
           <td style="padding:4px 0;color:#050a30;word-break:break-all;">${escapeHtml(value)}</td>
         </tr>`
    )
    .join('');

  return `
    <p style="margin:24px 0 6px;color:#666;font-size:14px;">Origem do lead</p>
    <table style="border-collapse:collapse;font-size:13px;">${rows}</table>
  `;
}

export async function submitContact(formData: unknown) {
  try {
    const data = contactSchema.parse(formData);

    await db.insert(contacts).values({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      service: data.service,
      message: data.message,
      utmSource: data.utm_source,
      utmMedium: data.utm_medium,
      utmCampaign: data.utm_campaign,
      utmTerm: data.utm_term,
      utmContent: data.utm_content,
      gclid: data.gclid,
      fbclid: data.fbclid,
    });

    // O lead já está salvo. Uma falha no e-mail não deve devolver erro para
    // quem preencheu o formulário, então o envio é isolado do fluxo principal.
    try {
      const { error } = await resend.emails.send({
        from: NOTIFICATION_FROM,
        to: NOTIFICATION_TO,
        replyTo: data.email,
        subject: `Novo orçamento: ${data.name} — ${data.service}`,
        html: renderNotification(data),
      });

      if (error) {
        console.error('[contact] falha ao enviar e-mail:', error);
      }
    } catch (mailError) {
      console.error('[contact] falha ao enviar e-mail:', mailError);
    }

    return { success: true, message: 'Orçamento solicitado com sucesso!' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.issues[0]?.message || 'Erro de validação',
      };
    }
    console.error('[contact] falha ao registrar contato:', error);
    return {
      success: false,
      message: 'Erro ao enviar formulário. Tente novamente.',
    };
  }
}
