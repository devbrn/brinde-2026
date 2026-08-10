'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Nav() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const THRESHOLD = 80;
    let footerVisible = false;

    const update = () => {
      const el = document.querySelector('[data-lenis-prevent]') as HTMLElement | null;
      const hScrolled = (el?.scrollLeft ?? 0) > THRESHOLD;
      const vScrolled = window.scrollY > THRESHOLD;
      setVisible(!(hScrolled || vScrolled) || footerVisible);
    };

    const onScroll = () => update();

    const footer = document.querySelector('footer');
    let observer: IntersectionObserver | null = null;

    if (footer) {
      observer = new IntersectionObserver(
        ([entry]) => {
          footerVisible = entry.isIntersecting;
          update();
        },
        { threshold: 0.05 }
      );
      observer.observe(footer);
    }

    window.addEventListener('scroll', onScroll, { passive: true });

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
    const interval = window.setInterval(attachHorizontal, 500);

    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      hEl?.removeEventListener('scroll', onScroll);
      window.clearInterval(interval);
      observer?.disconnect();
    };
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 text-white px-6 py-4 flex items-center justify-between transition-all duration-500"
      style={{
        background: 'linear-gradient(to bottom, #050a30 0%, #050a3080 40%, transparent 100%)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <Link href="/" className="flex items-center shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://res.cloudinary.com/dyezpmorm/image/upload/e_sharpen:80,q_auto:best,w_600/v1786384628/copy_of_brinde_4_kcpcyy.webp"
          alt="Brinde"
          className="h-12 md:h-14 w-auto"
        />
      </Link>

      <div className="hidden md:flex items-center gap-8 ml-auto" style={{ fontFamily: 'var(--font-poppins), sans-serif', fontWeight: 700 }}>
        <Link href="/sobre-nos" className="hover:text-white/70 transition text-sm">
          Sobre Nós
        </Link>
        <Link href="/premio" className="hover:text-white/70 transition text-sm">
          Prêmio
        </Link>
        <Link href="/servicos" className="hover:text-white/70 transition text-sm">
          Serviços
        </Link>
        <Link href="/produtora" className="hover:text-white/70 transition text-sm">
          Produtora Audiovisual
        </Link>

        <span className="text-white/40">|</span>

        <div className="flex items-center gap-4">
          <a href="https://www.instagram.com/agenciabrinde/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/brinde-marketing-e-publicidade/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>

        <Link href="/contato" className="hover:text-white/70 transition text-sm">
          Solicite um orçamento
        </Link>

        <div className="flex gap-2 items-center">
          <span title="Português (BR)" aria-label="Português (BR)">
            <svg width="20" height="14" viewBox="0 0 27 18" className="rounded-[3px]">
              <rect width="27" height="18" fill="#009B3A" />
              <path d="M13.5 2.5 L25.5 9 L13.5 15.5 L1.5 9 Z" fill="#FEDF00" />
              <circle cx="13.5" cy="9" r="5.2" fill="#002776" />
              <path d="M8.2 8.5 Q13.5 11.3 18.8 8.5 L18.8 9.5 Q13.5 12.3 8.2 9.5 Z" fill="#FFFFFF" />
            </svg>
          </span>
          <span title="English (US)" aria-label="English (US)" className="opacity-40">
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
          </span>
          <span title="Español (ES)" aria-label="Español (ES)" className="opacity-40">
            <svg width="20" height="14" viewBox="0 0 27 18" className="rounded-[3px]">
              <rect width="27" height="18" fill="#AA151B" />
              <rect y="4.5" width="27" height="9" fill="#F1BF00" />
              <path d="M12 5.6 q2.7 0.8 2.7 3.5 v2.1 q0 1.9 -2.7 2.7 q-2.7 -0.8 -2.7 -2.7 V9.1 q0 -2.7 2.7 -3.5 z" fill="#AA151B" />
              <path d="M10.5 6.2 q2.9 0.8 2.9 2.9 q-2.9 0.1 -2.9 -2.9 z" fill="#F1BF00" />
            </svg>
          </span>
        </div>
      </div>
    </nav>
  );
}
