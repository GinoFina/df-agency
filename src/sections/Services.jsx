import { useRef, useEffect } from 'react';
import { ArrowRight, Scale, Megaphone, RefreshCcw } from 'lucide-react';
import imgJugador from '../assets/images/card-renovacion-jugador.png';
import imgClub from '../assets/images/card-compra-club.png';
import imgScout from '../assets/images/card-scouting.png';
import videoFondo from '../assets/images/video-loop-fondo.mp4';

const content = {
  ES: {
    badge: 'Nuestros Servicios',
    heading: 'Todo lo que tu carrera necesita',
    subheading: 'Desde la negociación hasta la imagen personal, somos tu socio estratégico en cada etapa.',
    services: [
      {
        icon: RefreshCcw,
        image: imgJugador,
        tag: 'Transferencias & Contratos',
        title: 'Representación de Jugadores',
        desc: 'Negociamos contratos profesionales, renovaciones y traspasos maximizando el valor deportivo y económico de cada jugador.',
        cta: 'Ver más',
      },
      {
        icon: Scale,
        image: imgClub,
        tag: 'Asesoría Legal',
        title: 'Inversión & Compra de Clubes',
        desc: 'Asesoramos a inversores en la adquisición, evaluación jurídica y estructuración de operaciones de compraventa de clubes.',
        cta: 'Ver más',
      },
      {
        icon: Megaphone,
        image: imgScout,
        tag: 'Scouting & Marketing',
        title: 'Scouting y Reportes',
        desc: 'Proveemos informes detallados de jugadores, análisis de rivales y búsqueda de talento para clubes y cuerpos técnicos.',
        cta: 'Ver más',
      },
    ],
  },
  EN: {
    badge: 'Our Services',
    heading: 'Everything your career needs',
    subheading: 'From negotiation to personal branding, we are your strategic partner at every stage.',
    services: [
      {
        icon: RefreshCcw,
        image: imgJugador,
        tag: 'Transfers & Contracts',
        title: 'Player Representation',
        desc: 'We negotiate professional contracts, renewals, and transfers, maximizing the sporting and economic value of each player.',
        cta: 'Learn more',
      },
      {
        icon: Scale,
        image: imgClub,
        tag: 'Legal Advisory',
        title: 'Club Investment & Acquisition',
        desc: 'We advise investors on the acquisition, legal evaluation and deal structuring for club purchase transactions.',
        cta: 'Learn more',
      },
      {
        icon: Megaphone,
        image: imgScout,
        tag: 'Scouting & Marketing',
        title: 'Scouting & Reports',
        desc: 'We provide detailed player reports, rival analysis, and talent search services for clubs and coaching staffs.',
        cta: 'Learn more',
      },
    ],
  },
};

export default function Services({ lang }) {
  const t = content[lang];
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Boomerang / ping-pong: play forward → reverse → forward → …
    const handleEnded = () => {
      // Reverse playback (works in Chrome/Edge; Firefox falls back to loop)
      try {
        video.playbackRate = -1;
        video.play().catch(() => {
          // Fallback: just restart forward
          video.playbackRate = 1;
          video.currentTime = 0;
          video.play();
        });
      } catch {
        video.playbackRate = 1;
        video.currentTime = 0;
        video.play();
      }
    };

    const handleTimeUpdate = () => {
      // When playing in reverse and reaching the start, switch back to forward
      if (video.playbackRate < 0 && video.currentTime <= 0.05) {
        video.playbackRate = 1;
        video.play();
      }
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    // No top/bottom padding — let the fade divs handle the visual boundaries
    <section id="services" className="relative py-20 md:py-28 px-4 md:px-8 overflow-hidden">
      {/* Video — no loop attr, handled manually for boomerang */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src={videoFondo} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-brand-950/80" />

      {/* ── Top gradient fade (matches About's bottom color) ── */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #060e28 0%, transparent 100%)', zIndex: 2 }}
      />

      {/* ── Bottom gradient fade (matches FAQ's top color) ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #060e28 0%, transparent 100%)', zIndex: 2 }}
      />

      {/* Content above fades */}
      <div className="relative max-w-7xl mx-auto" style={{ zIndex: 3 }}>
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-accent text-xs font-bold uppercase tracking-widest mb-3">{t.badge}</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5">{t.heading}</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">{t.subheading}</p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {t.services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <div
                key={i}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 hover:border-accent/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-950/80"
              >
                {/* Card image — fixed height, no hover scale */}
                <div className="relative h-56 flex-shrink-0 overflow-hidden">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/30 to-transparent" />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent/90 text-brand-950">
                    <Icon size={12} />
                    {svc.tag}
                  </span>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 gap-4 p-6 bg-brand-900/90">
                  <h3 className="font-heading font-bold text-xl text-white leading-snug">{svc.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1">{svc.desc}</p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-accent text-sm font-semibold hover:gap-3 transition-all duration-300 group/btn"
                  >
                    {svc.cta}
                    <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
