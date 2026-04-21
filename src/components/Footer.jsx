function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-brand-950 px-4 py-8 text-slate-200 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm md:flex-row">
        <p>© {new Date().getFullYear()} DF Agency. Todos los derechos reservados.</p>
        <div className="flex gap-4">
          <a href="#nosotros" className="hover:text-white">
            Nosotros
          </a>
          <a href="#servicios" className="hover:text-white">
            Servicios
          </a>
          <a href="#contacto" className="hover:text-white">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
