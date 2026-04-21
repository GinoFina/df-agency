import stadiumImage from '../assets/images/estadio.png'

function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[80vh] items-center px-4 pb-16 pt-28 text-white md:px-8 md:pt-36"
      style={{
        backgroundImage: `linear-gradient(rgba(3, 14, 35, 0.7), rgba(3, 14, 35, 0.85)), url(${stadiumImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-slate-200">DF Agency</p>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">Team Strength, Individual Success</h1>
          <p className="mt-6 max-w-2xl text-base text-slate-200 md:text-lg">
            Potenciamos carreras deportivas y proyectos de clubes con una gestión estratégica, legal y comercial integral.
          </p>
          <a
            href="#contacto"
            className="mt-8 inline-flex rounded-md bg-white px-6 py-3 font-semibold text-brand-950 transition hover:bg-slate-200"
          >
            Agendar asesoría
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
