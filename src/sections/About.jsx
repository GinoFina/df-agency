import { BadgeCheck, Globe2, Handshake, ShieldCheck } from 'lucide-react'

const values = [
  {
    icon: Handshake,
    title: 'Confianza y cercanía',
    description: 'Construimos relaciones sostenibles con jugadores, familias, clubes e inversores.',
  },
  {
    icon: ShieldCheck,
    title: 'Gestión profesional',
    description: 'Planificamos cada etapa con respaldo legal y enfoque estratégico.',
  },
  {
    icon: Globe2,
    title: 'Visión internacional',
    description: 'Conectamos oportunidades en mercados locales e internacionales.',
  },
  {
    icon: BadgeCheck,
    title: 'Resultados medibles',
    description: 'Convertimos objetivos deportivos y comerciales en planes concretos.',
  },
]

function About() {
  return (
    <section id="nosotros" className="bg-slate-50 px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold text-brand-950 md:text-4xl">Sobre DF Agency</h2>
        <p className="mt-4 max-w-3xl text-slate-600">
          Acompañamos a talentos y organizaciones deportivas con una estructura de soporte integral para impulsar su crecimiento.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const IconComponent = value.icon
            return (
              <article key={value.title} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <IconComponent className="h-7 w-7 text-brand-700" />
                <h3 className="mt-4 text-lg font-semibold text-brand-950">{value.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{value.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default About
