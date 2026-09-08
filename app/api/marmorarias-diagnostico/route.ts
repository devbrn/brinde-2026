import { NextResponse } from 'next/server';
import { submitContact } from '@/lib/actions/contact';

export async function POST(request: Request) {
  const result = await submitContact(await request.json(), 'Novo Diagnóstico');
  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}
