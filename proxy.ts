import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { DEFAULT_LOCALE, LOCALE_HEADER, PREFIXED_LOCALES } from '@/lib/i18n/config';

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // /admin exige sessão válida — o JWT é verificado pelo próprio auth().
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!req.auth) {
      return NextResponse.redirect(new URL('/admin/login', req.nextUrl.origin));
    }
  }

  const segment = pathname.split('/')[1];
  const locale = (PREFIXED_LOCALES as readonly string[]).includes(segment)
    ? segment
    : DEFAULT_LOCALE;

  const headers = new Headers(req.headers);
  headers.set(LOCALE_HEADER, locale);
  return NextResponse.next({ request: { headers } });
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
