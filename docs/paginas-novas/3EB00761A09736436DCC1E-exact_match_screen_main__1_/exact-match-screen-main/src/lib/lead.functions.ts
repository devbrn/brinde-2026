import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const RECIPIENT = "comercial@agenciabrinde.com.br";

const leadSchema = z.object({
  revenue: z.string().min(1).max(200),
  capacity: z.string().min(1).max(200),
  situation: z.string().min(1).max(200),
  investment: z.string().min(1).max(200),
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().min(2).max(160),
  cityState: z.string().trim().min(2).max(120),
  whatsapp: z.string().regex(/^\(\d{2}\) \d{4,5}-\d{4}$/),
  email: z.string().trim().email().max(200),
  createdAt: z.string().max(60),
});

export const sendLead = createServerFn({ method: "POST" })
  .inputValidator((data) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];
    const from = process.env["LEADS_FROM_EMAIL"];
    if (!apiKey || !from) {
      throw new Error("Envio de e-mail não configurado.");
    }

    const text = [
      "NOVO LEAD — CONSTRULEAD",
      "",
      `Nome:\n${data.name}`,
      `Empresa:\n${data.company}`,
      `Cidade / UF:\n${data.cityState}`,
      `WhatsApp:\n${data.whatsapp}`,
      `E-mail:\n${data.email}`,
      `Faturamento médio mensal:\n${data.revenue}`,
      `Capacidade nos próximos 90 dias:\n${data.capacity}`,
      `Situação atual:\n${data.situation}`,
      `Investimento mensal disponível:\n${data.investment}`,
      `Data/hora:\n${data.createdAt}`,
      "Origem:\nLanding Page ConstruLead Blue Roma",
    ].join("\n\n");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [RECIPIENT],
        reply_to: data.email,
        subject: `Novo lead ConstruLead — ${data.company}`,
        text,
      }),
    });

    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      throw new Error("Falha no envio do e-mail.");
    }
    return { ok: true as const };
  });
