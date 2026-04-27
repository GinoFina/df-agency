import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import logo from '../assets/images/logo-sin-fondo.png';

const navLinks = [
  { href: '#about', label: { ES: 'Nosotros', EN: 'About' } },
  { href: '#services', label: { ES: 'Servicios', EN: 'Services' } },
  { href: '#social', label: { ES: 'Social', EN: 'Social' } },
  { href: '#footer', label: { ES: 'Contacto', EN: 'Contact' } },
];

export default function Navbar({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-brand-950/95 shadow-2xl shadow-brand-950/60 backdrop-blur-md' : 'bg-transparent'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group" aria-label="DF Agency Home">
          <img
            src={logo}
            alt="DF Agency Logo"
            className="h-10 w-auto object-contain transition-all duration-300 group-hover:opacity-90"
          />
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-accent transition-colors duration-200 relative group"
              >
                {link.label[lang]}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 rounded-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: Lang + CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language selector */}
          <div className="relative">
            <button
              id="lang-toggle"
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg glass-light"
            >
              <Globe size={14} />
              {lang}
              <ChevronDown size={12} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-10 glass rounded-xl overflow-hidden min-w-[80px] shadow-xl">
                {['ES', 'EN'].map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${lang === l ? 'text-accent bg-accent/10' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="text-sm font-semibold bg-accent hover:bg-accent-light text-brand-950 px-5 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-accent/30 hover:scale-105"
          >
            {lang === 'ES' ? 'Hablemos' : 'Let\'s Talk'}
          </a>
        </div>

        {/* Hamburger */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden text-white p-2 rounded-lg glass-light transition-colors"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } bg-brand-950/98 backdrop-blur-md`}
      >
        <ul className="flex flex-col px-6 py-4 gap-2 border-t border-white/5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleLinkClick}
                className="block py-3 text-base font-medium text-slate-300 hover:text-accent transition-colors border-b border-white/5"
              >
                {link.label[lang]}
              </a>
            </li>
          ))}
          <li className="flex items-center gap-3 pt-3">
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="flex-1 text-center text-sm font-semibold bg-accent hover:bg-accent-light text-brand-950 px-5 py-2.5 rounded-full transition-all"
            >
              {lang === 'ES' ? 'Hablemos' : 'Let\'s Talk'}
            </a>
            <div className="flex gap-2">
              {['ES', 'EN'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${lang === l ? 'bg-accent text-brand-950 font-semibold' : 'glass-light text-slate-300'
                    }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
}
