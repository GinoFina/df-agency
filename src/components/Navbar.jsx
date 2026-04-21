import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
]

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [language, setLanguage] = useState('ES')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navClassName = isScrolled
    ? 'bg-brand-900/95 shadow-lg backdrop-blur'
    : 'bg-transparent'

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navClassName}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-white md:px-8">
        <a href="#inicio" className="text-xl font-semibold tracking-wide">
          DF Agency
        </a>

        <button
          type="button"
          className="rounded-md border border-white/30 p-2 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Abrir menú"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-slate-100 transition hover:text-white">
              {link.label}
            </a>
          ))}
          <select
            aria-label="Seleccionar idioma"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="rounded-md border border-slate-300/40 bg-white/10 px-3 py-2 text-sm"
          >
            <option value="ES" className="text-brand-950">
              ES
            </option>
            <option value="EN" className="text-brand-950">
              EN
            </option>
          </select>
          <a
            href="#contacto"
            className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-brand-950 transition hover:bg-slate-200"
          >
            Contactar
          </a>
        </div>
      </nav>

      {menuOpen && (
        <div className="bg-brand-900/95 px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm text-slate-100">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <select
              aria-label="Seleccionar idioma móvil"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="rounded-md border border-slate-300/40 bg-white/10 px-3 py-2"
            >
              <option value="ES" className="text-brand-950">
                ES
              </option>
              <option value="EN" className="text-brand-950">
                EN
              </option>
            </select>
            <a
              href="#contacto"
              onClick={() => setMenuOpen(false)}
              className="rounded-md bg-white px-4 py-2 text-center font-semibold text-brand-950"
            >
              Contactar
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
