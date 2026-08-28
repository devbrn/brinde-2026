import { Resend } from 'resend';
import { db } from '@/lib/db';
import { emailEvents } from '@/lib/db/schema';

const resend = new Resend(process.env.RESEND_API_KEY);
const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;

type ResendWebhookEvent = {
  type: string;
  created_at: string;
  data?: {
    email_id?: string;
    to?: string[];
    [key: string]: unknown;
  };
};

export async function POST(request: Request) {
  if (!webhookSecret) {
    console.error('[resend webhook] RESEND_WEBHOOK_SECRET não configurado');
    return Response.json({ error: 'Webhook não configurado' }, { status: 500 });
  }

  const payload = await request.text();
  const signatureHeaders = {
    id: request.headers.get('svix-id') ?? '',
    timestamp: request.headers.get('svix-timestamp') ?? '',
    signature: request.headers.get('svix-signature') ?? '',
  };

  try {
    const event = resend.webhooks.verify({
      payload,
      headers: signatureHeaders,
      webhookSecret,
    }) as unknown as ResendWebhookEvent;

    const eventId = signatureHeaders.id;
    if (!eventId || !event.type) {
      return Response.json({ error: 'Evento inválido' }, { status: 400 });
    }

    await db.insert(emailEvents).values({
      eventId,
      eventType: event.type,
      emailId: event.data?.email_id,
      recipient: event.data?.to?.join(', '),
      payload: event,
    }).onConflictDoNothing({ target: emailEvents.eventId });

    console.info('[resend webhook] evento registrado', {
      eventId,
      type: event.type,
      emailId: event.data?.email_id,
      to: event.data?.to,
    });

    return Response.json({ received: true });
  } catch (error) {
    console.error('[resend webhook] assinatura inválida ou payload malformado', error);
    return Response.json({ error: 'Assinatura inválida' }, { status: 400 });
  }
}
