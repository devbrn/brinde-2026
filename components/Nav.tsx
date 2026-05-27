'use client';

import Link from 'next/link';

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black text-white px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-2xl font-playfair font-bold">
          BRINDE
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link href="/sobre-nos" className="hover:text-cyan-400 transition">
          Sobre Nós
        </Link>
        <Link href="/premio" className="hover:text-cyan-400 transition">
          Prêmio
        </Link>
        <Link href="/fizemos" className="hover:text-cyan-400 transition">
          Fizemos
        </Link>
        <Link href="/servicos" className="hover:text-cyan-400 transition">
          Serviços
        </Link>
        <Link href="/brindamos" className="hover:text-cyan-400 transition">
          Brindamos
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/contato" className="bg-cyan-400 hover:bg-cyan-500 text-black px-4 py-2 rounded transition">
          Solicite um orçamento
        </Link>
        <div className="flex gap-2 ml-4">
          <span className="text-sm">🇧🇷</span>
          <span className="text-sm opacity-50">🇺🇸</span>
          <span className="text-sm opacity-50">🇪🇸</span>
        </div>
      </div>
    </nav>
  );
}
