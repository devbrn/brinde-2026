'use server';

import { z } from 'zod';
import { db } from '@/lib/db';
import { contacts } from '@/lib/db/schema';

const contactSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, 'Selecione um serviço'),
  message: z.string().min(1, 'Mensagem é obrigatória'),
});

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
    });

    return { success: true, message: 'Orçamento solicitado com sucesso!' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.issues[0]?.message || 'Erro de validação',
      };
    }
    return {
      success: false,
      message: 'Erro ao enviar formulário. Tente novamente.',
    };
  }
}
