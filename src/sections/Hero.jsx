import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import estadioImg from '../assets/images/fondo-estadio.jpg';

const content = {
  ES: {
    tagline: 'Precision in Talent,\nPower in Results',
    subtitle: 'Representamos jugadores, conectamos clubes y construimos carreras en el fútbol profesional.',
    scroll: 'Deslizá para explorar',
  },
  EN: {
    tagline: 'Precision in Talent,\nPower in Results',
    subtitle: 'We represent players, connect clubs and build careers in professional football.',
    scroll: 'Scroll to explore',
  },
};

export default function Hero({ lang }) {
  const t = content[lang];
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      // Fade out completely after 150px of scroll
      const opacity = Math.max(0, 1 - window.scrollY / 150);
      setScrollOpacity(opacity);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Background image */}
      <img
        src={estadioImg}
        alt="Football stadium"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-950/75 via-brand-950/55 to-brand-950" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,58,122,0.35)_0%,transparent_70%)]" />

      {/* Content — reduced title to half the former size */}
      <div className="relative z-10 px-4 md:px-8 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl leading-tight mb-6 text-white animate-fade-up whitespace-pre-line">
          {t.tagline}
        </h1>
        <p className="text-slate-300 text-base md:text-lg max-w-lg mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.15s' }}>
          {t.subtitle}
        </p>
      </div>

      {/* Scroll indicator — fades out as user scrolls down */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400 z-10 pointer-events-none"
        style={{ opacity: scrollOpacity, transition: 'opacity 0.1s linear' }}
      >
        <span className="text-xs uppercase tracking-widest">{t.scroll}</span>
        <ChevronDown size={20} className="animate-bounce" />
      </div>
    </section>
  );
}
