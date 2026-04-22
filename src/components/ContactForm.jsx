import { useState, useRef } from 'react';
import { Send, User, Mail, Phone, ChevronDown, MessageSquare } from 'lucide-react';
import emailjs from 'emailjs-com';
import ReCAPTCHA from 'react-google-recaptcha';

const EMAILJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const RECAPTCHA_KEY    = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const content = {
  ES: {
    heading: 'Hablemos',
    subheading: 'Completá el formulario y nos ponemos en contacto a la brevedad.',
    name: 'Nombre Completo',
    email: 'Email',
    whatsapp: 'WhatsApp',
    reason: 'Motivo de Contacto',
    reasons: [
      { value: '', label: 'Seleccioná un motivo...' },
      { value: 'player', label: '⚽ Representación de Jugador' },
      { value: 'club',   label: '🏟️ Inversión / Compra de Club' },
      { value: 'scout',  label: '🔍 Servicios de Scouting y Reportes' },
    ],
    category: 'Categoría / Edad',
    categories: [
      { value: '', label: 'Seleccioná categoría...' },
      { value: 'sub17', label: 'Sub-17' },
      { value: '18-23', label: '18 – 23 años' },
      { value: '+24',   label: '+24 años' },
    ],
    position: 'Posición',
    positions: [
      { value: '', label: 'Seleccioná posición...' },
      { value: 'gk',  label: 'Arquero' },
      { value: 'def', label: 'Defensor' },
      { value: 'mid', label: 'Mediocampista' },
      { value: 'att', label: 'Delantero' },
    ],
    budget: 'Presupuesto Estimado',
    budgets: [
      { value: '', label: 'Seleccioná presupuesto...' },
      { value: '<500k', label: '< USD 500.000' },
      { value: '1m',    label: 'USD 500k – 1M' },
      { value: '5m',    label: 'USD 1M – 5M' },
      { value: '+5m',   label: '> USD 5M' },
    ],
    league: 'Liga de Interés',
    leagues: [
      { value: '', label: 'Seleccioná liga...' },
      { value: 'argentina', label: 'Argentina' },
      { value: 'latam',     label: 'Latinoamérica' },
      { value: 'europe',    label: 'Europa' },
      { value: 'other',     label: 'Otra' },
    ],
    scoutType: 'Tipo de Servicio',
    scoutTypes: [
      { value: '', label: 'Seleccioná servicio...' },
      { value: 'rival',  label: 'Análisis de Rival' },
      { value: 'talent', label: 'Búsqueda de Talento' },
      { value: 'report', label: 'Informes de Jugadores' },
      { value: 'market', label: 'Análisis de Mercado' },
    ],
    message: 'Mensaje adicional (opcional)',
    messagePH: 'Contanos más sobre tu consulta...',
    captchaError: 'Por favor, completá el reCAPTCHA.',
    submit: 'Enviar Mensaje',
    sending: 'Enviando...',
    success: '¡Mensaje enviado! Nos ponemos en contacto pronto.',
    error: 'Ocurrió un error. Por favor intentá de nuevo.',
  },
  EN: {
    heading: "Let's Talk",
    subheading: 'Fill out the form and we will get back to you shortly.',
    name: 'Full Name',
    email: 'Email',
    whatsapp: 'WhatsApp',
    reason: 'Contact Reason',
    reasons: [
      { value: '', label: 'Select a reason...' },
      { value: 'player', label: '⚽ Player Representation' },
      { value: 'club',   label: '🏟️ Club Investment / Acquisition' },
      { value: 'scout',  label: '🔍 Scouting & Report Services' },
    ],
    category: 'Category / Age',
    categories: [
      { value: '', label: 'Select category...' },
      { value: 'sub17', label: 'Under-17' },
      { value: '18-23', label: '18 – 23 years' },
      { value: '+24',   label: '+24 years' },
    ],
    position: 'Position',
    positions: [
      { value: '', label: 'Select position...' },
      { value: 'gk',  label: 'Goalkeeper' },
      { value: 'def', label: 'Defender' },
      { value: 'mid', label: 'Midfielder' },
      { value: 'att', label: 'Forward' },
    ],
    budget: 'Estimated Budget',
    budgets: [
      { value: '', label: 'Select budget...' },
      { value: '<500k', label: '< USD 500,000' },
      { value: '1m',    label: 'USD 500k – 1M' },
      { value: '5m',    label: 'USD 1M – 5M' },
      { value: '+5m',   label: '> USD 5M' },
    ],
    league: 'League of Interest',
    leagues: [
      { value: '', label: 'Select league...' },
      { value: 'argentina', label: 'Argentina' },
      { value: 'latam',     label: 'Latin America' },
      { value: 'europe',    label: 'Europe' },
      { value: 'other',     label: 'Other' },
    ],
    scoutType: 'Service Type',
    scoutTypes: [
      { value: '', label: 'Select service...' },
      { value: 'rival',  label: 'Rival Analysis' },
      { value: 'talent', label: 'Talent Search' },
      { value: 'report', label: 'Player Reports' },
      { value: 'market', label: 'Market Analysis' },
    ],
    message: 'Additional message (optional)',
    messagePH: 'Tell us more about your inquiry...',
    captchaError: 'Please complete the reCAPTCHA.',
    submit: 'Send Message',
    sending: 'Sending...',
    success: 'Message sent! We will get back to you soon.',
    error: 'An error occurred. Please try again.',
  },
};

const inputClass =
  'w-full bg-brand-900/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-accent/60 focus:bg-brand-900 transition-all duration-200';

const labelClass = 'block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2';

function FieldWithIcon({ icon: Icon, children }) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-500">
        <Icon size={16} />
      </div>
      <div className="[&>input]:pl-10 [&>select]:pl-10">{children}</div>
    </div>
  );
}

/*
  IMPORTANT: React state keys must EXACTLY match the HTML name="" attributes,
  because handleChange uses e.target.name as the state key.
  These keys also match the EmailJS template variables.
*/
const emptyForm = {
  user_name: '',
  user_email: '',
  user_whatsapp: '',
  motivo_contacto: '',
  seleccion_dinamica: '',  // shared by category / budget / scoutType (only one renders at a time)
  posicion_jugador: '',
  liga_interes: '',
  message: '',
};

export default function ContactForm({ lang }) {
  const t = content[lang];
  const formRef    = useRef(null);
  const captchaRef = useRef(null);

  const [form,   setForm]   = useState(emptyForm);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error | captcha

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const captchaToken = captchaRef.current?.getValue();
    if (!captchaToken) { setStatus('captcha'); return; }

    setStatus('sending');
    try {
      await emailjs.sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, formRef.current, EMAILJS_KEY);
      setStatus('success');
      setForm(emptyForm);
      captchaRef.current?.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-4 md:px-8 bg-gradient-to-b from-brand-950 to-brand-900">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-accent text-xs font-bold uppercase tracking-widest mb-3">
            {lang === 'ES' ? 'Contacto' : 'Contact'}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">{t.heading}</h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">{t.subheading}</p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-10 flex flex-col gap-6">

          {/* Name */}
          <div>
            <label className={labelClass}>{t.name}</label>
            <FieldWithIcon icon={User}>
              <input
                type="text"
                name="user_name"
                id="contact-name"
                required
                value={form.user_name}
                onChange={handleChange}
                placeholder={lang === 'ES' ? 'Tu nombre completo' : 'Your full name'}
                className={inputClass}
              />
            </FieldWithIcon>
          </div>

          {/* Email + WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{t.email}</label>
              <FieldWithIcon icon={Mail}>
                <input
                  type="email"
                  name="user_email"
                  id="contact-email"
                  required
                  value={form.user_email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className={inputClass}
                />
              </FieldWithIcon>
            </div>
            <div>
              <label className={labelClass}>{t.whatsapp}</label>
              <FieldWithIcon icon={Phone}>
                <input
                  type="tel"
                  name="user_whatsapp"
                  id="contact-whatsapp"
                  value={form.user_whatsapp}
                  onChange={handleChange}
                  placeholder="+54 9 11 XXXX XXXX"
                  className={inputClass}
                />
              </FieldWithIcon>
            </div>
          </div>

          {/* Main reason select */}
          <div>
            <label className={labelClass}>{t.reason}</label>
            <div className="relative">
              <select
                name="motivo_contacto"
                id="contact-reason"
                required
                value={form.motivo_contacto}
                onChange={handleChange}
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                {t.reasons.map((r) => (
                  <option key={r.value} value={r.value} disabled={r.value === ''}>{r.label}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* Conditional: Player */}
          {form.motivo_contacto === 'player' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-up">
              <div>
                <label className={labelClass}>{t.category}</label>
                <div className="relative">
                  <select name="seleccion_dinamica" id="contact-category" value={form.seleccion_dinamica} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
                    {t.categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className={labelClass}>{t.position}</label>
                <div className="relative">
                  <select name="posicion_jugador" id="contact-position" value={form.posicion_jugador} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
                    {t.positions.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
              </div>
            </div>
          )}

          {/* Conditional: Club */}
          {form.motivo_contacto === 'club' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-up">
              <div>
                <label className={labelClass}>{t.budget}</label>
                <div className="relative">
                  <select name="seleccion_dinamica" id="contact-budget" value={form.seleccion_dinamica} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
                    {t.budgets.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className={labelClass}>{t.league}</label>
                <div className="relative">
                  <select name="liga_interes" id="contact-league" value={form.liga_interes} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
                    {t.leagues.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
              </div>
            </div>
          )}

          {/* Conditional: Scout */}
          {form.motivo_contacto === 'scout' && (
            <div className="animate-fade-up">
              <label className={labelClass}>{t.scoutType}</label>
              <div className="relative">
                <select name="seleccion_dinamica" id="contact-scout-type" value={form.seleccion_dinamica} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
                  {t.scoutTypes.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
            </div>
          )}

          {/* Textarea */}
          <div>
            <label className={labelClass}>{t.message}</label>
            <div className="relative">
              <MessageSquare size={16} className="absolute top-3.5 left-3.5 text-slate-500 pointer-events-none" />
              <textarea
                name="message"
                id="contact-message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder={t.messagePH}
                className={`${inputClass} pl-10 resize-none`}
              />
            </div>
          </div>

          {/* reCAPTCHA */}
          <div className="flex justify-center">
            <ReCAPTCHA
              ref={captchaRef}
              sitekey={RECAPTCHA_KEY}
              theme="dark"
              onChange={() => status === 'captcha' && setStatus('idle')}
            />
          </div>
          {status === 'captcha' && (
            <p className="text-center text-yellow-400 text-sm font-medium -mt-2">{t.captchaError}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            id="contact-submit"
            disabled={status === 'sending' || status === 'success'}
            className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-light disabled:opacity-60 text-brand-950 font-bold py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 text-sm uppercase tracking-wider"
          >
            {status === 'sending' ? (
              <span className="animate-pulse">{t.sending}</span>
            ) : (
              <><Send size={16} />{t.submit}</>
            )}
          </button>

          {status === 'success' && (
            <p className="text-center text-emerald-400 text-sm font-medium animate-fade-in">{t.success}</p>
          )}
          {status === 'error' && (
            <p className="text-center text-red-400 text-sm font-medium animate-fade-in">{t.error}</p>
          )}
        </form>
      </div>
    </section>
  );
}
