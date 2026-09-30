export function IconSprite() {
  return (
    <svg aria-hidden="true" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
      <symbol id="i-users" viewBox="0 0 24 24"><path d="M16 11c1.66 0 3-1.57 3-3.5S17.66 4 16 4s-3 1.57-3 3.5 1.34 3.5 3 3.5Zm-8 0c1.66 0 3-1.57 3-3.5S9.66 4 8 4 5 5.57 5 7.5 6.34 11 8 11Zm0 2c-2.67 0-8 1.34-8 4v3h10v-3c0-1.12.42-2.07 1.14-2.86C10.1 13.42 8.76 13 8 13Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.96 1.97 3.45v3H24v-3c0-2.66-5.33-4-8-4Z" fill="currentColor" /></symbol>
      <symbol id="i-target" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8V2Zm7 0v2.59l-4.29 4.29 1.41 1.41L20.41 6H23V2h-4ZM12 8a4 4 0 1 0 4 4h-2a2 2 0 1 1-2-2V8Z" fill="currentColor" /></symbol>
      <symbol id="i-trend" viewBox="0 0 24 24"><path d="M4 17 10.5 10.5l4 4L20 9v4h2V5h-8v2h4l-3.5 3.5-4-4L2 15.1 4 17Z" fill="currentColor" /></symbol>
      <symbol id="i-gear" viewBox="0 0 24 24"><path d="m19.14 12.94.04-.94-.04-.94 2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.23 7.23 0 0 0-1.63-.94l-.36-2.54A.5.5 0 0 0 13.9 2h-3.8a.5.5 0 0 0-.49.42l-.36 2.54c-.57.22-1.11.53-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.71 8.48a.5.5 0 0 0 .12.64l2.03 1.58-.04.94.04.94-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32c.13.22.39.31.6.22l2.39-.96c.5.4 1.05.72 1.63.94l.36 2.54c.04.24.24.42.49.42h3.8c.25 0 .45-.18.49-.42l.36-2.54c.58-.22 1.13-.54 1.63-.94l2.39.96c.22.09.47 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z" fill="currentColor" /></symbol>
      <symbol id="i-chart" viewBox="0 0 24 24"><path d="M3 3h2v18H3V3Zm16 8h2v10h-2V11ZM11 13h2v8h-2v-8ZM7 7h2v14H7V7Zm8-4h2v18h-2V3Z" fill="currentColor" /></symbol>
    </svg>
  );
}

export function Header() {
  return (
    <header className="topbar">
      <div className="container nav">
        <a className="brand" href="#top">
          <img alt="Agência Brinde" src="/assets/landing/brand-logo.png" />
        </a>
        <nav className="menu">
          <a href="#como-funciona">Como funciona</a>
          <a href="#resultados">Resultados</a>
          <a href="#cases">Cases</a>
          <a href="#depoimentos">Depoimentos</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="cta-btn small" href="#formulario">
          Solicite sua análise estratégica gratuita <span className="arrow">→</span>
        </a>
      </div>
    </header>
  );
}
