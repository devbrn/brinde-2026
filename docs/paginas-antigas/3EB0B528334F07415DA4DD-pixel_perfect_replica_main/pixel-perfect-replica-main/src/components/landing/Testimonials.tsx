import { useRef, useState } from "react";

const items = [
  { name: "Ana Dias", role: "Gerente Comercial", slug: "ana-dias", quote: "Graças a Deus teve fechamento de pedido, teve orçamento novo. Foi muito bom ver o resultado." },
  { name: "Ailton Souza", role: "Sócio Fundador", slug: "ailton-souza", quote: "Estamos muito satisfeitos pelo nível de profissionalismo. Temos certeza absoluta que escolhemos a empresa correta." },
  { name: "Fabio Uili", role: "Gerente Geral", slug: "fabio-uili", quote: "Eu não tenho dúvida do trabalho profissional que a Brinde vem oferecendo. Muito prático e objetivo." },
];

export function Testimonials() {
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const [playing, setPlaying] = useState<number | null>(null);

  const pauseOthers = (i: number) =>
    videos.current.forEach((o, j) => {
      if (j !== i && o && !o.paused) o.pause();
    });

  const playAt = (i: number) => {
    const v = videos.current[i];
    if (!v) return;
    pauseOthers(i);
    setPlaying((p) => (p === i ? p : null));
    v.controls = true;
    v.play()
      .then(() => setPlaying(i))
      .catch(() => {
        v.controls = true;
      });
  };

  return (
    <section className="section" id="depoimentos">
      <div className="container testimonials-wrap">
        <div className="aside-box">
          <h3>Resultados reais de quem confia na Brinde.</h3>
          <a className="cta-btn small" href="#formulario">
            Ver mais cases <span className="arrow">→</span>
          </a>
        </div>
        <div className="cards3">
          {items.map((t, i) => (
            <article className="t-card" key={t.slug}>
              <div className={`thumb video-thumb${playing === i ? " is-playing" : ""}`}>
                <video
                  ref={(el) => {
                    videos.current[i] = el;
                  }}
                  aria-label={`Depoimento em vídeo de ${t.name}`}
                  className="testimonial-video"
                  controls
                  src={`/videos/depoimento-${t.slug}.mp4`}
                  playsInline
                  poster={`/assets/landing/poster-${t.slug}.jpg`}
                  preload="metadata"
                  webkit-playsinline=""
                  onPlay={() => pauseOthers(i)}
                  onEnded={(e) => {
                    setPlaying((p) => (p === i ? null : p));
                    e.currentTarget.currentTime = 0;
                  }}
                >
                  Seu navegador não suporta reprodução de vídeo.
                </video>
                <button
                  aria-label={`Reproduzir depoimento de ${t.name}`}
                  className="video-play-btn"
                  type="button"
                  onClick={() => playAt(i)}
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M8.5 5.5v13l10-6.5-10-6.5Z" fill="currentColor" />
                  </svg>
                </button>
              </div>
              <div className="t-body">
                <div className="quote-mark">“</div>
                <p>{t.quote}</p>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
