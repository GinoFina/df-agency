import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
import logo from '../assets/images/DF-Agency-logo.jpg';

const content = {
  ES: {
    tagline: 'Conectando el talento con el éxito.',
    nav: 'Navegación',
    links: [
      { href: '#',         label: 'Home' },
      { href: '#about',    label: 'Nosotros' },
      { href: '#services', label: 'Servicios' },
      { href: '#contact',  label: 'Contacto' },
    ],
    contact: 'Contacto',
    rights: 'Todos los derechos reservados.',
    back: 'Volver al inicio',
  },
  EN: {
    tagline: 'Connecting talent with success.',
    nav: 'Navigation',
    links: [
      { href: '#',         label: 'Home' },
      { href: '#about',    label: 'About' },
      { href: '#services', label: 'Services' },
      { href: '#contact',  label: 'Contact' },
    ],
    contact: 'Contact',
    rights: 'All rights reserved.',
    back: 'Back to top',
  },
};

export default function Footer({ lang }) {
  const t = content[lang];

  return (
    <footer className="bg-brand-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="DF Agency" className="h-12 w-12 rounded-full object-cover ring-2 ring-accent/40" />
              <span className="font-heading font-800 text-xl text-white">DF Agency</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">{t.tagline}</p>
            <div className="flex gap-3 mt-1">
              <a
                href="https://www.instagram.com/df_agency_scouting/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full glass-light flex items-center justify-center text-slate-400 hover:text-accent hover:border-accent/40 transition-all duration-300 hover:scale-110"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.linkedin.com/company/df-agency-ltd"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full glass-light flex items-center justify-center text-slate-400 hover:text-accent hover:border-accent/40 transition-all duration-300 hover:scale-110"
              >
                <LinkedinIcon />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-5 text-sm uppercase tracking-widest">{t.nav}</h3>
            <ul className="flex flex-col gap-2.5">
              {t.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 text-sm hover:text-accent transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-slate-600 group-hover:bg-accent group-hover:w-6 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-5 text-sm uppercase tracking-widest">{t.contact}</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Mail size={15} className="text-accent flex-shrink-0" />
                <a href="mailto:info@dfagency.com" className="hover:text-white transition-colors">info@dfagency.com</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Phone size={15} className="text-accent flex-shrink-0" />
                <a href="tel:+54" className="hover:text-white transition-colors">+54 9 XXX XXX XXXX</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin size={15} className="text-accent flex-shrink-0 mt-0.5" />
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} DF Agency. {t.rights}
          </p>
          <a
            href="#"
            aria-label={t.back}
            className="w-9 h-9 rounded-full glass-light flex items-center justify-center text-slate-400 hover:text-accent transition-all duration-300 hover:scale-110"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
