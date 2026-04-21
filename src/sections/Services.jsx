import stadiumImage from '../assets/images/estadio.png'

const services = [
  {
    title: 'Transferencias y Contratos',
    description: 'Negociación y acompañamiento completo en cada etapa de la operación.',
    image: stadiumImage,
  },
  {
    title: 'Asesoría Legal',
    description: 'Soporte jurídico especializado en normativa deportiva y contractual.',
    image: stadiumImage,
  },
  {
    title: 'Marketing y Branding',
    description: 'Posicionamiento de marca personal e institucional para ampliar impacto.',
    image: stadiumImage,
  },
]

function Services() {
  return (
    <section id="servicios" className="bg-white px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold text-brand-950 md:text-4xl">Servicios</h2>
        <p className="mt-4 max-w-3xl text-slate-600">Soluciones adaptadas para jugadores, clubes y organizaciones del ecosistema deportivo.</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="overflow-hidden rounded-xl bg-brand-950 text-white shadow-md">
              <img src={service.image} alt={service.title} className="h-48 w-full object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
