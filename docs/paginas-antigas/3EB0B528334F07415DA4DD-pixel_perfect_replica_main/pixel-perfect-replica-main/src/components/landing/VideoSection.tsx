import { useEffect, useRef } from "react";

export function VideoSection() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.loop = true;
    v.autoplay = true;
    v.playsInline = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    v.setAttribute("autoplay", "");
    v.setAttribute("loop", "");
    v.removeAttribute("controls");
    v.preload = "auto";
    const play = () => {
      v.muted = true;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    const onVis = () => {
      if (!document.hidden) play();
    };
    play();
    const evs = ["loadedmetadata", "loadeddata", "canplay"];
    evs.forEach((e) => v.addEventListener(e, play));
    window.addEventListener("pageshow", play);
    document.addEventListener("visibilitychange", onVis);
    document.addEventListener("touchstart", play, { passive: true });
    document.addEventListener("pointerdown", play, { passive: true });
    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (es) => es.forEach((x) => x.isIntersecting && play()),
        { threshold: 0.05 },
      );
      io.observe(v);
    }
    return () => {
      evs.forEach((e) => v.removeEventListener(e, play));
      window.removeEventListener("pageshow", play);
      document.removeEventListener("visibilitychange", onVis);
      document.removeEventListener("touchstart", play);
      document.removeEventListener("pointerdown", play);
      io?.disconnect();
    };
  }, []);

  return (
    <section className="section" id="como-funciona">
      <div className="container two-col">
        <div className="media-card">
          <div className="fold-video-shell" data-autoplay-media="">
            <video
              ref={ref}
              aria-label="Vídeo da Agência Brinde para marmorarias"
              autoPlay
              className="fold-video"
              src="/videos/video-principal-construlead.mp4"
              loop
              muted
              playsInline
              preload="auto"
              webkit-playsinline=""
              disablePictureInPicture
            >
              Seu navegador não suporta reprodução de vídeo.
            </video>
            <img alt="" aria-hidden="true" className="fold-video-fallback" src="/assets/landing/fold-video-fallback.webp" />
          </div>
        </div>
        <div>
          <div className="section-kicker">ConstruLead</div>
          <h3>A agência especialista em gerar orçamentos para marmorarias.</h3>
          <p className="text">
            Unimos estratégia, mídia, conteúdo e tecnologia para colocar sua marmoraria no radar de quem realmente compra: proprietários de obras, arquitetos e construtoras.
          </p>
          <a className="cta-btn" href="#formulario">
            Solicite sua análise estratégica gratuita <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Metrics() {
  const items: [string, string][] = [
    ["R$ 691.955", "em orçamentos gerados em 30 dias"],
    ["103", "leads captados no período analisado"],
    ["28", "orçamentos enviados a partir das oportunidades geradas"],
    ["R$ 1.500", "investidos em mídia durante os 30 dias"],
  ];
  return (
    <section className="metrics" id="resultados">
      <div className="container metric-grid">
        {items.map(([v, t]) => (
          <div className="metric" key={v}>
            <div className="value">{v}</div>
            <p>{t}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
