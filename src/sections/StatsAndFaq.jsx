import { useState } from 'react';
import { Plus, Minus, Calendar, Users, Globe2, Trophy } from 'lucide-react';
import jugadorImg from '../assets/images/fondo-jugador.png';

const content = {
  ES: {
    stats: [
      { icon: Calendar, value: '2+',  label: 'Años de Experiencia' },
      { icon: Users,    value: '20+', label: 'Clientes Activos' },
      { icon: Globe2,   value: '5+',  label: 'Países Alcanzados' },
      { icon: Trophy,   value: '30+', label: 'Contratos Cerrados' },
    ],
    faqBadge: 'Preguntas Frecuentes',
    faqHeading: '¿Tenés dudas?',
    faqs: [
      {
        q: '¿Cómo funciona el proceso de representación?',
        a: 'Primero hacemos una evaluación inicial del jugador, analizamos su perfil deportivo y comercial, y diseñamos un plan de carrera personalizado. Luego iniciamos la búsqueda activa de oportunidades en línea con esos objetivos.',
      },
      {
        q: '¿Trabajan con jugadores de todas las edades?',
        a: 'Sí. Representamos desde jugadores de formación (Sub-17) hasta profesionales con trayectoria consolidada. Adaptamos nuestra estrategia según la etapa de la carrera.',
      },
      {
        q: '¿Qué mercados abarcan?',
        a: 'Tenemos presencia activa en Argentina, y conexiones con clubes en Europa (España, Portugal, Escocia) y Latinoamérica (Brasil, México, Colombia).',
      },
      {
        q: '¿Cómo financian sus honorarios?',
        a: 'Trabajamos bajo comisión sobre los contratos cerrados. No cobramos fees anticipados al jugador. Nuestros intereses están alineados con el tuyo.',
      },
      {
        q: '¿También asesoran a clubes?',
        a: 'Sí. Brindamos asesoría a dirigentes e inversores interesados en la compra o reestructuración de clubes, así como servicios de scouting y análisis de mercado.',
      },
    ],
  },
  EN: {
    stats: [
      { icon: Calendar, value: '2+',  label: 'Years of Experience' },
      { icon: Users,    value: '20+', label: 'Active Clients' },
      { icon: Globe2,   value: '5+',  label: 'Countries Reached' },
      { icon: Trophy,   value: '30+', label: 'Contracts Closed' },
    ],
    faqBadge: 'FAQ',
    faqHeading: 'Got questions?',
    faqs: [
      {
        q: 'How does the representation process work?',
        a: 'We start with an initial evaluation of the player, analyze their sporting and commercial profile, and design a personalized career plan. We then actively search for opportunities aligned with those goals.',
      },
      {
        q: 'Do you work with players of all ages?',
        a: 'Yes. We represent players from youth academies (Under-17) to professionals with consolidated careers. We adapt our strategy to each career stage.',
      },
      {
        q: 'Which markets do you cover?',
        a: 'We are actively present in Argentina and have connections with clubs in Europe (Spain, Portugal, Scotland) and Latin America (Brazil, Mexico, Colombia).',
      },
      {
        q: 'How do you charge for your services?',
        a: 'We work on a commission basis for closed contracts. We do not charge upfront fees to players. Our interests are fully aligned with yours.',
      },
      {
        q: 'Do you also advise clubs?',
        a: 'Yes. We advise executives and investors interested in buying or restructuring clubs, as well as providing scouting and market analysis services.',
      },
    ],
  },
};

function AccordionItem({ q, a, isOpen, toggle, index }) {
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/20">
      <button
        id={`faq-item-${index}`}
        onClick={toggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-white group-hover:text-accent transition-colors duration-200 text-sm md:text-base">
          {q}
        </span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-accent border-accent text-brand-950' : 'border-white/20 text-slate-400 group-hover:border-accent/40'
        }`}>
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="px-6 pb-5 text-slate-400 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function StatsAndFaq({ lang }) {
  const t = content[lang];
  const [openIndex, setOpenIndex] = useState(0);
  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section id="stats" className="bg-brand-950">

      {/* ── 1. FAQ first ── */}
      <div className="py-20 md:py-28 px-4 md:px-8 bg-gradient-to-b from-brand-950 to-brand-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-accent text-xs font-bold uppercase tracking-widest mb-3">{t.faqBadge}</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">{t.faqHeading}</h2>
          </div>
          <div className="flex flex-col gap-3">
            {t.faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                index={i}
                q={faq.q}
                a={faq.a}
                isOpen={openIndex === i}
                toggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. Stats band — parallax fixed background ── */}
      <div
        className="relative py-24 md:py-36 overflow-hidden"
        style={{
          backgroundImage: `url(${jugadorImg})`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-brand-950/65" />

        {/* Stats counters */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10 border border-white/10 rounded-2xl overflow-hidden">
            {t.stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center gap-3 text-center py-14 px-6"
                >
                  <Icon size={24} className="text-accent" />
                  <span className="font-heading font-black text-5xl md:text-6xl text-white">{stat.value}</span>
                  <span className="text-slate-300 text-sm font-medium tracking-wide">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
}
