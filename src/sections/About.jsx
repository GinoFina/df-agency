import { Shield, TrendingUp, Handshake, Globe2, Star, Users } from 'lucide-react';

const content = {
  ES: {
    badge: 'Quiénes Somos',
    heading: 'Nuestra misión es tu carrera',
    subheading: 'En DF Agency combinamos experiencia deportiva, visión estratégica y red global para impulsar cada paso de tu trayectoria.',
    values: [
      {
        icon: Shield,
        title: 'Confianza y Ética',
        desc: 'Actuamos con total transparencia en cada negociación, poniendo el interés de nuestros representados primero.',
      },
      {
        icon: TrendingUp,
        title: 'Visión Estratégica',
        desc: 'Diseñamos un plan de carrera personalizado que maximiza el potencial deportivo y comercial de cada jugador.',
      },
      {
        icon: Handshake,
        title: 'Relaciones Sólidas',
        desc: 'Nuestra red de contactos incluye clubes, dirigentes y socios en Argentina, Europa y Latinoamérica.',
      },
      {
        icon: Globe2,
        title: 'Alcance Global',
        desc: 'Abrimos puertas en mercados internacionales para que el talento local trascienda fronteras.',
      },
      {
        icon: Star,
        title: 'Excelencia',
        desc: 'Cada contrato, cada negociación y cada decisión busca el máximo resultado para el jugador y su club.',
      },
      {
        icon: Users,
        title: 'Equipo Multidisciplinario',
        desc: 'Contamos con especialistas en derecho deportivo, marketing y análisis de rendimiento.',
      },
    ],
  },
  EN: {
    badge: 'About Us',
    heading: 'Our mission is your career',
    subheading: 'At DF Agency we combine sports expertise, strategic vision and a global network to drive every step of your journey.',
    values: [
      {
        icon: Shield,
        title: 'Trust & Ethics',
        desc: "We act with full transparency in every negotiation, always putting our clients' interests first.",
      },
      {
        icon: TrendingUp,
        title: 'Strategic Vision',
        desc: 'We design personalized career plans that maximize both the sporting and commercial potential of each player.',
      },
      {
        icon: Handshake,
        title: 'Solid Relationships',
        desc: 'Our network includes clubs, executives and partners across Argentina, Europe and Latin America.',
      },
      {
        icon: Globe2,
        title: 'Global Reach',
        desc: 'We open doors in international markets so local talent can transcend borders.',
      },
      {
        icon: Star,
        title: 'Excellence',
        desc: 'Every contract, negotiation and decision aims for the best possible outcome for player and club.',
      },
      {
        icon: Users,
        title: 'Multidisciplinary Team',
        desc: 'Our experts cover sports law, marketing, and performance analysis.',
      },
    ],
  },
};

export default function About({ lang }) {
  const t = content[lang];

  return (
    <section id="about" className="relative py-20 md:py-28 px-4 md:px-8 bg-gradient-to-b from-brand-950 to-brand-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-accent text-xs font-bold uppercase tracking-widest mb-3">{t.badge}</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5">{t.heading}</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">{t.subheading}</p>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.values.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="glass-light rounded-2xl p-7 flex flex-col gap-4 group hover:border-accent/30 hover:bg-white/[0.07] transition-all duration-500 cursor-default"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                  <Icon size={22} className="text-accent" />
                </div>
                <h3 className="font-heading font-bold text-lg text-white">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
      {/* Bottom fade to blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #060e28)' }} />
    </section>
  );
}
