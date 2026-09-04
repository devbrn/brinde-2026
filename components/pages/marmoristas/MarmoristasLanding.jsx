'use client'

import { useEffect, useRef, useState } from 'react'

const WHATSAPP_URL =
  'https://wa.me/5511942424377?text=Ol%C3%A1%2C%20vim%20pela%20nova%20landing%20page%20para%20marmoristas%20e%20quero%20solicitar%20minha%20An%C3%A1lise%20Estrat%C3%A9gica%20Gratuita.'

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function WhatsAppButton({ children, position, dark = false, arrow = false }) {
  const trackClick = () => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'whatsapp_click',
      cta_position: position,
    })
  }

  return (
    <a
      className={`btn${dark ? ' btn-dark' : ''}`}
      data-cta={position}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackClick}
    >
      {children}
      {arrow && <ArrowIcon />}
    </a>
  )
}

function AwardVideo() {
  const videoRef = useRef(null)
  const [inlinePlayer, setInlinePlayer] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const mobileUA =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(
        navigator.userAgent,
      )
    const coarse = window.matchMedia('(pointer:coarse)').matches
    const touch = navigator.maxTouchPoints > 0 && window.innerWidth <= 1180
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInlinePlayer(mobileUA || coarse || touch)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !inlinePlayer) return undefined

    video.controls = false
    video.playsInline = true
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')
    video.setAttribute('x5-playsinline', '')
    video.setAttribute('x5-video-player-type', 'h5-page')
    video.setAttribute('x5-video-player-fullscreen', 'false')
    video.setAttribute('controlslist', 'nofullscreen noremoteplayback')
    video.setAttribute('disablepictureinpicture', '')

    const sync = () => setPlaying(!video.paused && !video.ended)
    const keepInline = () => {
      if (video.webkitDisplayingFullscreen && video.webkitExitFullscreen) {
        video.webkitExitFullscreen()
      }
      if (document.fullscreenElement === video && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {})
      }
      if (
        document.webkitFullscreenElement === video &&
        document.webkitExitFullscreen
      ) {
        document.webkitExitFullscreen()
      }
    }

    video.addEventListener('play', sync)
    video.addEventListener('pause', sync)
    video.addEventListener('ended', sync)
    video.addEventListener('webkitbeginfullscreen', keepInline)
    document.addEventListener('fullscreenchange', keepInline)
    document.addEventListener('webkitfullscreenchange', keepInline)
    sync()

    return () => {
      video.removeEventListener('play', sync)
      video.removeEventListener('pause', sync)
      video.removeEventListener('ended', sync)
      video.removeEventListener('webkitbeginfullscreen', keepInline)
      document.removeEventListener('fullscreenchange', keepInline)
      document.removeEventListener('webkitfullscreenchange', keepInline)
    }
  }, [inlinePlayer])

  const togglePlay = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const video = videoRef.current
    if (!video) return
    if (video.paused || video.ended) {
      video.play().catch(() => setPlaying(false))
    } else {
      video.pause()
    }
  }

  const toggleSound = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  return (
    <div className={`reel-frame reveal${inlinePlayer ? ' inline-player' : ''}`}>
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/dyezpmorm/video/upload/v1788538327/prova-social_yf9reo.mp4"
        poster="https://res.cloudinary.com/dyezpmorm/image/upload/v1788538325/prova-social-poster_llvoxa.jpg"
        preload="metadata"
        playsInline
        controls={!inlinePlayer}
        onClick={inlinePlayer ? togglePlay : undefined}
        aria-label="Vídeo do reconhecimento da Brinde no 35º Mídia Festival"
      />
      {inlinePlayer && (
        <>
          <button
            type="button"
            className={`mobile-play${playing ? ' is-playing' : ''}`}
            aria-label={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}
            onClick={togglePlay}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <button
            type="button"
            className="mobile-sound"
            aria-label={muted ? 'Ativar som' : 'Desativar som'}
            onClick={toggleSound}
          >
            {muted ? 'Ativar som' : 'Som'}
          </button>
        </>
      )}
    </div>
  )
}

function useRevealOnScroll() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('in'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -5%' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}

function Header() {
  return (
    <header className="top">
      <div className="wrap top-inner">
        <a className="logo" href="#top" aria-label="Brinde Marketing e Publicidade">
          <img
            src="https://res.cloudinary.com/dyezpmorm/image/upload/v1788538325/brinde-branca_rptiag.png"
            alt="Brinde Marketing e Publicidade"
          />
        </a>
        <WhatsAppButton position="topo">Solicitar análise</WhatsAppButton>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="reveal">
          <p className="eyebrow">Para marmorarias com estrutura para produzir mais</p>
          <h1>
            Sua marmoraria não precisa de mais seguidores. Precisa de{' '}
            <em>mais pedidos de orçamento.</em>
          </h1>
          <p className="hero-copy">
            A Brinde constrói a operação que coloca sua empresa diante das pessoas
            certas, dá motivos para escolherem você e transforma interesse em
            conversa comercial.
          </p>
          <div className="hero-actions">
            <div>
              <WhatsAppButton position="hero" arrow>
                Solicitar Análise Estratégica Gratuita
              </WhatsAppButton>
              <p className="micro">
                Sem formulário. A conversa começa diretamente no WhatsApp.
              </p>
            </div>
          </div>
        </div>
        <aside
          className="note-card reveal"
          aria-label="Sinais de falta de previsibilidade comercial"
        >
          <h2>Se três frases forem verdade, o problema já está custando obras.</h2>
          <ul className="check-list">
            <li>A maior parte dos novos clientes ainda chega por indicação.</li>
            <li>Há semanas cheias e semanas sem pedidos suficientes.</li>
            <li>Você não sabe quais canais realmente geram orçamento.</li>
            <li>O concorrente aparece antes quando o cliente começa a procurar.</li>
          </ul>
          <p className="note-end">
            Não é falta de capacidade. É falta de um sistema que te gere novos
            orçamentos diariamente.
          </p>
        </aside>
      </div>
    </section>
  )
}

function Truth() {
  const losses = [
    [
      'Você perde a procura que já existe',
      'Enquanto sua marca espera ser indicada, outra marmoraria ocupa a busca, apresenta o portfólio e recebe o primeiro contato.',
    ],
    [
      'Você negocia tarde demais',
      'Quando o cliente chega somente para comparar preço, boa parte da decisão já aconteceu sem a sua participação.',
    ],
    [
      'Você administra produção sem previsão',
      'Sem uma fonte acompanhável de oportunidades, capacidade ociosa e sobrecarga passam a alternar sem aviso.',
    ],
  ]

  return (
    <section className="truth">
      <div className="wrap truth-grid">
        <h2 className="reveal">
          Indicação é uma ótima consequência. Uma péssima{' '}
          <em>estratégia de crescimento.</em>
        </h2>
        <div className="reveal">
          <p className="truth-intro">
            Sua equipe, suas máquinas e sua reputação custam todos os meses. A
            entrada de oportunidades não pode depender apenas de alguém lembrar do
            seu nome.
          </p>
          <div className="loss-list">
            {losses.map(([title, text]) => (
              <article className="loss" key={title}>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="truth-cta">
            <WhatsAppButton position="problema">
              Quero identificar onde estou perdendo demanda
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  )
}

function System() {
  const steps = [
    ['01', 'Mensagem', 'Traduzimos estrutura, acabamento, prazo e confiança em argumentos que o comprador entende.'],
    ['02', 'Demanda', 'Colocamos sua oferta diante de pessoas procurando ou planejando o serviço que você executa.'],
    ['03', 'Conversão', 'Organizamos a página e o contato para reduzir dúvida e facilitar o pedido de orçamento.'],
    ['04', 'Leitura comercial', 'Acompanhamos origem, qualidade e avanço das oportunidades para melhorar o investimento.'],
  ]

  return (
    <section className="system">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">O método</p>
            <h2 className="section-title">
              Uma campanha chama atenção. Um sistema transforma atenção em venda.
            </h2>
          </div>
          <p>
            Não começamos escolhendo anúncio. Começamos entendendo o que sua empresa
            vende melhor, para quem, em qual região e por que alguém deveria
            escolher sua marmoraria.
          </p>
        </div>
        <div className="system-grid reveal">
          {steps.map(([number, title, text]) => (
            <article className="system-step" key={number}>
              <span className="step-no">{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="statement reveal">
          <strong>
            O objetivo não é “fazer marketing”. É colocar mais negociações
            qualificadas na mesa.
          </strong>
          <WhatsAppButton position="metodo" dark>
            Conversar com a Brinde
          </WhatsAppButton>
        </div>
      </div>
    </section>
  )
}

function Proof() {
  return (
    <section className="proof">
      <div className="wrap proof-grid">
        <AwardVideo />
        <div className="proof-copy reveal">
          <p className="eyebrow">A prova está no vídeo</p>
          <h2>
            Antes de defender sua marca, <span>colocamos a nossa à prova.</span>
          </h2>
          <p className="lead">
            Este vídeo registra a Brinde recebendo Ouro no 35º Mídia Festival.
            Reconhecimento público não substitui resultado comercial. Mas revela o
            padrão de pensamento, mensagem e execução que levamos para cada
            operação.
          </p>
          <div className="award-line">
            <b>Ouro</b>
            <span>
              35º Mídia Festival
              <br />
              entre mais de 300 agências
            </span>
          </div>
          <WhatsAppButton position="premio">
            Quero esse nível de estratégia na minha empresa
          </WhatsAppButton>
        </div>
      </div>
    </section>
  )
}

function CaseStudy() {
  const metrics = [
    ['103', 'oportunidades'],
    ['R$ 14,56', 'custo por lead'],
    ['28', 'orçamentos enviados'],
    ['11', 'negócios ganhos'],
  ]

  return (
    <section className="case">
      <div className="wrap">
        <div className="case-kicker reveal">
          <h2>R$ 1,5 mil em mídia. R$ 691 mil em orçamentos.</h2>
          <p>Resultado comercial registrado em um período de 30 dias.</p>
        </div>
        <div className="case-main reveal">
          <div className="big-number">
            <span>R$ 691.955</span>
            <strong>em orçamentos gerados</strong>
          </div>
          <div className="case-side">
            {metrics.map(([number, label]) => (
              <div className="metric" key={label}>
                <b>{number}</b>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="case-foot reveal">
          <p>
            Os valores representam orçamentos emitidos, não faturamento garantido.
            Resultados variam conforme mercado, oferta, investimento e capacidade
            comercial. O dado importante é a existência de um processo mensurável
            entre mídia, contato, orçamento e fechamento.
          </p>
          <WhatsAppButton position="case" dark>
            Analisar meu potencial
          </WhatsAppButton>
        </div>
      </div>
    </section>
  )
}

function Offer() {
  const deliverables = [
    ['01', 'Leitura da operação atual', 'Como os contatos chegam, o que acontece até o orçamento e onde as oportunidades se perdem.'],
    ['02', 'Posicionamento e concorrência', 'O que sua presença comunica hoje e por que o cliente escolheria você em vez da alternativa mais próxima.'],
    ['03', 'Potencial de aquisição', 'Quais canais e mensagens merecem ser testados conforme região, ticket e capacidade produtiva.'],
    ['04', 'Próximo passo recomendado', 'Uma direção clara, mesmo que a conclusão seja não contratar a Brinde agora.'],
  ]

  return (
    <section className="offer">
      <div className="wrap offer-grid">
        <div className="offer-copy reveal">
          <p className="eyebrow">Análise Estratégica Gratuita</p>
          <h2>
            Antes de oferecer uma solução, queremos encontrar o problema certo.
          </h2>
          <p>
            Uma conversa objetiva para entender sua operação, identificar os
            vazamentos de demanda e avaliar se a Brinde faz sentido para o momento
            da empresa.
          </p>
          <WhatsAppButton position="oferta">
            Solicitar minha análise
          </WhatsAppButton>
        </div>
        <div className="reveal">
          <div className="deliverables">
            {deliverables.map(([number, title, text]) => (
              <article className="deliverable" key={number}>
                <b>{number}</b>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="fit">
            <strong>
              Esta análise é indicada para marmorarias que já possuem operação e
              capacidade para atender mais projetos.
            </strong>
            <p>
              Se o desafio ainda é estruturar produção, equipe ou atendimento
              básico, marketing provavelmente não será o primeiro investimento.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const questions = [
    ['Vocês garantem número de vendas?', 'Não. Venda depende também de preço, atendimento, prazo, proposta e capacidade comercial. Nosso compromisso é construir, medir e melhorar o processo que gera oportunidades qualificadas.'],
    ['A Brinde trabalha apenas com anúncios?', 'Não. Mídia sem mensagem, página e acompanhamento comercial apenas acelera desperdício. A atuação conecta posicionamento, aquisição, conversão e leitura dos resultados.'],
    ['Preciso abandonar as indicações?', 'De forma alguma. Indicação continua valiosa. A diferença é deixar de tratá-la como a única fonte de novos negócios.'],
    ['O que acontece depois do primeiro contato?', 'Fazemos uma conversa de diagnóstico. Se houver aderência, apresentamos a direção recomendada, escopo, investimento e critérios para acompanhar o trabalho.'],
  ]

  return (
    <section className="faq">
      <div className="wrap faq-grid">
        <h2 className="reveal">Perguntas que um empresário cuidadoso deve fazer.</h2>
        <div className="reveal">
          {questions.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Closing() {
  return (
    <section className="close">
      <div className="wrap close-inner reveal">
        <p className="eyebrow">O próximo orçamento precisa começar em algum lugar</p>
        <h2>
          Se sua marmoraria pode produzir mais, não espere a próxima indicação{' '}
          <em>decidir quando.</em>
        </h2>
        <p>
          Solicite a Análise Estratégica Gratuita e descubra o que precisa mudar
          para transformar capacidade instalada em mais oportunidades comerciais.
        </p>
        <WhatsAppButton position="final">
          Solicitar Análise Estratégica Gratuita
        </WhatsAppButton>
        <p className="micro">Você será direcionado ao WhatsApp da Agência Brinde.</p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <img src="https://res.cloudinary.com/dyezpmorm/image/upload/v1788538325/brinde-azul_e7htpm.png" alt="Brinde Marketing e Publicidade" />
        <span>Agência Brinde · CNPJ 49.820.592/0001-87</span>
      </div>
    </footer>
  )
}

export default function App() {
  useRevealOnScroll()

  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Truth />
        <System />
        <Proof />
        <CaseStudy />
        <Offer />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <div className="mobile-bar">
        <WhatsAppButton position="fixo-mobile">
          Solicitar análise gratuita
        </WhatsAppButton>
      </div>
    </>
  )
}
