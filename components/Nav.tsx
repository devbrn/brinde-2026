'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  DEFAULT_LOCALE,
  LOCALES,
  ROUTES,
  href,
  routeKeyFromSlug,
  type Locale,
  type RouteKey,
} from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

const LOGO_CLARA = 'https://res.cloudinary.com/dyezpmorm/image/upload/v1786458875/logo-brinde-clara_qxcelo.svg';
const LOGO_ESCURA = 'https://res.cloudinary.com/dyezpmorm/image/upload/v1786458874/logo-brinde-escura_u6zis5.svg';

const MENU_KEYS = ['home', 'sobreNos', 'premio', 'servicos', 'produtora', 'contato'] as const;

/** Traduz a URL atual para o mesmo conteúdo em outro idioma. */
function translatePath(pathname: string, from: Locale, to: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  const slug = from === DEFAULT_LOCALE ? segments[0] : segments[1];

  if (!slug) return href('home', to);

  const key = routeKeyFromSlug(slug, from);
  return key ? href(key, to) : href('home', to);
}


const FLAGS: Record<Locale, React.ReactNode> = {
  pt: (
          <svg width="20" height="14" viewBox="0 0 27 18" className="rounded-[3px]">
            <rect width="27" height="18" fill="#009B3A" />
            <path d="M13.5 2.5 L25.5 9 L13.5 15.5 L1.5 9 Z" fill="#FEDF00" />
            <circle cx="13.5" cy="9" r="5.2" fill="#002776" />
            <path d="M8.2 8.5 Q13.5 11.3 18.8 8.5 L18.8 9.5 Q13.5 12.3 8.2 9.5 Z" fill="#FFFFFF" />
          </svg>
  ),
  en: (
          <svg width="20" height="14" viewBox="0 0 27 18" className="rounded-[3px]">
            <rect width="27" height="18" fill="#FFFFFF" />
            <g fill="#B22234">
              <rect y="0" width="27" height="1.385" />
              <rect y="2.769" width="27" height="1.385" />
              <rect y="5.538" width="27" height="1.385" />
              <rect y="8.308" width="27" height="1.385" />
              <rect y="11.077" width="27" height="1.385" />
              <rect y="13.846" width="27" height="1.385" />
              <rect y="16.615" width="27" height="1.385" />
            </g>
            <rect width="12" height="9.23" fill="#3C3B6E" />
            <g fill="#FFFFFF">
              <circle cx="1" cy="0.923" r="0.32" /><circle cx="3" cy="0.923" r="0.32" /><circle cx="5" cy="0.923" r="0.32" /><circle cx="7" cy="0.923" r="0.32" /><circle cx="9" cy="0.923" r="0.32" /><circle cx="11" cy="0.923" r="0.32" />
              <circle cx="2" cy="2.769" r="0.32" /><circle cx="4" cy="2.769" r="0.32" /><circle cx="6" cy="2.769" r="0.32" /><circle cx="8" cy="2.769" r="0.32" /><circle cx="10" cy="2.769" r="0.32" />
              <circle cx="1" cy="4.615" r="0.32" /><circle cx="3" cy="4.615" r="0.32" /><circle cx="5" cy="4.615" r="0.32" /><circle cx="7" cy="4.615" r="0.32" /><circle cx="9" cy="4.615" r="0.32" /><circle cx="11" cy="4.615" r="0.32" />
              <circle cx="2" cy="6.462" r="0.32" /><circle cx="4" cy="6.462" r="0.32" /><circle cx="6" cy="6.462" r="0.32" /><circle cx="8" cy="6.462" r="0.32" /><circle cx="10" cy="6.462" r="0.32" />
              <circle cx="1" cy="8.308" r="0.32" /><circle cx="3" cy="8.308" r="0.32" /><circle cx="5" cy="8.308" r="0.32" /><circle cx="7" cy="8.308" r="0.32" /><circle cx="9" cy="8.308" r="0.32" /><circle cx="11" cy="8.308" r="0.32" />
            </g>
          </svg>
  ),
  es: (
          <svg width="20" height="14" viewBox="0 0 27 18" className="rounded-[3px]">
            <rect width="27" height="18" fill="#AA151B" />
            <rect y="4.5" width="27" height="9" fill="#F1BF00" />
            <path d="M12 5.6 q2.7 0.8 2.7 3.5 v2.1 q0 1.9 -2.7 2.7 q-2.7 -0.8 -2.7 -2.7 V9.1 q0 -2.7 2.7 -3.5 z" fill="#AA151B" />
            <path d="M10.5 6.2 q2.9 0.8 2.9 2.9 q-2.9 0.1 -2.9 -2.9 z" fill="#F1BF00" />
          </svg>
  ),
};

function LocaleSwitcher({
  current,
  pathname,
  labels,
  className = '',
}: {
  current: Locale;
  pathname: string;
  labels: Record<Locale, string>;
  className?: string;
}) {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      {LOCALES.map((target) => (
        <Link
          key={target}
          href={translatePath(pathname, current, target)}
          hrefLang={target}
          title={labels[target]}
          aria-label={labels[target]}
          aria-current={target === current ? 'true' : undefined}
          className={`transition-opacity hover:opacity-100 ${
            target === current ? 'opacity-100' : 'opacity-40'
          }`}
        >
          {FLAGS[target]}
        </Link>
      ))}
    </div>
  );
}

export function Nav({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.nav;
  const menuLabels: Record<(typeof MENU_KEYS)[number], string> = {
    home: t.home,
    sobreNos: t.about,
    premio: t.award,
    servicos: t.services,
    produtora: t.production,
    contato: t.contact,
  };
  const localeLabels: Record<Locale, string> = {
    pt: t.languagePt,
    en: t.languageEn,
    es: t.languageEs,
  };
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const pathname = usePathname();

  // Fecha o painel em qualquer troca de rota (inclusive voltar/avançar do browser),
  // sem setState em effect: renderiza já fechado quando o pathname muda.
  const [openPath, setOpenPath] = useState(pathname);
  if (openPath !== pathname) {
    setOpenPath(pathname);
    if (open) setOpen(false);
  }

  // Trava o scroll do body enquanto o painel está aberto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    const NAV_H = 96;

    const update = () => {
      let overLight = false;
      const vw = window.innerWidth;
      document.querySelectorAll<HTMLElement>('[data-nav-light]').forEach((el) => {
        const r = el.getBoundingClientRect();
        const visibleW = Math.min(r.right, vw) - Math.max(r.left, 0);
        if (visibleW > 32 && r.top < NAV_H && r.bottom > 0) overLight = true;
      });
      setDark(overLight);
    };

    const onScroll = () => update();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    let hEl: HTMLElement | null = null;
    const attachHorizontal = () => {
      const el = document.querySelector('[data-lenis-prevent]') as HTMLElement | null;
      if (el && el !== hEl) {
        hEl?.removeEventListener('scroll', onScroll);
        hEl = el;
        el.addEventListener('scroll', onScroll, { passive: true });
      }
    };
    attachHorizontal();
    const interval = window.setInterval(() => {
      attachHorizontal();
      update();
    }, 500);

    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      hEl?.removeEventListener('scroll', onScroll);
      window.clearInterval(interval);
    };
  }, [pathname]);

  // Painel aberto: fundo azul cobre a tela, logo/ícones voltam à versão clara.
  const darkUI = dark && !open;
  const textCls = darkUI ? 'text-[#050a30]' : 'text-white';
  const hoverCls = darkUI ? 'hover:text-[#050a30]/70' : 'hover:text-white/70';

  // Glass no hover: fundo translúcido + blur melhora a leitura sobre vídeo/foto.
  // Não aplica com o painel mobile aberto (ele já tem fundo sólido).
  const glass = hovered && !open;

  return (
    <nav
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-300 ${
        glass
          ? darkUI
            ? 'bg-white/70 backdrop-blur-md shadow-sm'
            : 'bg-[#050a30]/50 backdrop-blur-md shadow-sm'
          : 'bg-transparent backdrop-blur-0'
      }`}
    >
      <Link href={href('home', locale)} className="relative z-[70] grid shrink-0" aria-label="Brinde">
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src={LOGO_ESCURA}
          alt=""
          aria-hidden
          className={`h-12 md:h-14 w-auto col-start-1 row-start-1 transition-opacity duration-500 ${darkUI ? 'opacity-100' : 'opacity-0'}`}
        />
        <img
          src={LOGO_CLARA}
          alt=""
          aria-hidden
          className={`h-12 md:h-14 w-auto col-start-1 row-start-1 transition-opacity duration-500 ${darkUI ? 'opacity-0' : 'opacity-100'}`}
        />
        {/* eslint-enable @next/next/no-img-element */}
      </Link>

      <div className="hidden md:flex items-center gap-8 ml-auto" style={{ fontFamily: 'var(--font-poppins), sans-serif', fontWeight: 700 }}>
        <Link href={href('home', locale)} className={`transition ${textCls} ${hoverCls} text-sm`}>
          {t.home}
        </Link>
        <Link href={href('sobreNos', locale)} className={`transition ${textCls} ${hoverCls} text-sm`}>
          {t.about}
        </Link>
        <Link href={href('premio', locale)} className={`transition ${textCls} ${hoverCls} text-sm`}>
          {t.award}
        </Link>
        <Link href={href('servicos', locale)} className={`transition ${textCls} ${hoverCls} text-sm`}>
          {t.services}
        </Link>
        <Link href={href('produtora', locale)} className={`transition ${textCls} ${hoverCls} text-sm`}>
          {t.production}
        </Link>

        <span className={textCls}>|</span>

        <div className="flex items-center gap-4">
          <a href="https://www.instagram.com/agenciabrinde/" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${textCls} ${hoverCls}`} aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/brinde-marketing-e-publicidade/" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${textCls} ${hoverCls}`} aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>

        <Link href={href('contato', locale)} className={`transition ${textCls} ${hoverCls} text-sm`}>
          {t.contact}
        </Link>

        <LocaleSwitcher current={locale} pathname={pathname} labels={localeLabels} />
      </div>

      {/* ─── Hambúrguer (mobile) ─── */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t.closeMenu : t.openMenu}
        aria-expanded={open}
        className="md:hidden relative z-[70] ml-auto flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[5px]"
      >
        <span
          className={`block h-[2px] w-6 ${darkUI ? 'bg-[#050a30]' : 'bg-white'} transition-transform duration-300 ${
            open ? 'translate-y-[7px] rotate-45' : ''
          }`}
        />
        <span
          className={`block h-[2px] w-6 ${darkUI ? 'bg-[#050a30]' : 'bg-white'} transition-opacity duration-300 ${
            open ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <span
          className={`block h-[2px] w-6 ${darkUI ? 'bg-[#050a30]' : 'bg-white'} transition-transform duration-300 ${
            open ? '-translate-y-[7px] -rotate-45' : ''
          }`}
        />
      </button>

      {/* ─── Painel full-screen (mobile) ─── */}
      <div
        className={`md:hidden fixed inset-0 z-[60] bg-[#050a30] transition-[opacity,visibility] duration-300 ${
          open ? 'opacity-100 visible' : 'pointer-events-none invisible opacity-0'
        }`}
      >
        <div className="flex h-full flex-col justify-center px-8 pb-16 pt-28">
          <div className="flex flex-col gap-6">
            {MENU_KEYS.map((key) => (
              <Link
                key={key}
                href={href(key, locale)}
                onClick={() => setOpen(false)}
                className="text-2xl font-bold text-white transition-opacity hover:opacity-70"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                {menuLabels[key]}
              </Link>
            ))}
          </div>

          <LocaleSwitcher
            current={locale}
            pathname={pathname}
            labels={localeLabels}
            className="mt-12 gap-4"
          />

          <div className="mt-8 flex items-center gap-6 border-t border-white/15 pt-8">
            <a
              href="https://www.instagram.com/agenciabrinde/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-opacity hover:opacity-70"
              aria-label="Instagram"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/brinde-marketing-e-publicidade/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-opacity hover:opacity-70"
              aria-label="LinkedIn"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
