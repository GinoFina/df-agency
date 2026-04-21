import emailjs from '@emailjs/browser'
import { useMemo, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

const reasonOptions = [
  { value: 'representacion', label: 'Representación de jugador' },
  { value: 'club', label: 'Inversión / Compra de Club' },
  { value: 'scouting', label: 'Servicios de Scouting y Reportes' },
]

const detailOptions = {
  representacion: {
    first: {
      name: 'categoriaEdad',
      label: 'Categoría/Edad',
      options: ['Sub-17', '18-23', '+24'],
    },
    second: {
      name: 'posicion',
      label: 'Posición',
      options: ['Arquero', 'Defensor', 'Mediocampista', 'Delantero'],
    },
  },
  club: {
    first: {
      name: 'presupuestoEstimado',
      label: 'Presupuesto Estimado',
      options: ['Hasta USD 1M', 'USD 1M - 5M', 'Más de USD 5M'],
    },
    second: {
      name: 'ligaInteres',
      label: 'Liga de Interés',
      options: ['Sudamérica', 'Europa', 'Norteamérica', 'Otro mercado'],
    },
  },
  scouting: {
    first: {
      name: 'tipoServicio',
      label: 'Tipo de Servicio',
      options: ['Análisis de rival', 'Búsqueda de talento', 'Reporte de rendimiento'],
    },
    second: null,
  },
}

function SelectField({ label, name, options, value, onChange }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-brand-950">
      {label}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-brand-700 focus:outline-none"
        required
      >
        <option value="">Seleccionar</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function ContactForm() {
  const formRef = useRef(null)
  const captchaRef = useRef(null)

  const [reason, setReason] = useState('')
  const [firstDetailValue, setFirstDetailValue] = useState('')
  const [secondDetailValue, setSecondDetailValue] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')
  const [status, setStatus] = useState('')

  const currentDetails = useMemo(() => detailOptions[reason] ?? null, [reason])

  const resetDetailFields = () => {
    setFirstDetailValue('')
    setSecondDetailValue('')
  }

  const handleReasonChange = (event) => {
    setReason(event.target.value)
    resetDetailFields()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!captchaToken) {
      setStatus('Valida el captcha antes de enviar el formulario.')
      return
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setStatus('Falta configurar EmailJS en variables de entorno.')
      return
    }

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      setStatus('Mensaje enviado. Te contactaremos a la brevedad.')
      formRef.current?.reset()
      setReason('')
      resetDetailFields()
      setCaptchaToken('')
      captchaRef.current?.reset()
    } catch (error) {
      console.error('Error al enviar formulario con EmailJS:', error)
      setStatus('No se pudo enviar el mensaje. Intentá nuevamente.')
    }
  }

  return (
    <section id="contacto" className="bg-slate-50 px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
        <h2 className="text-3xl font-semibold text-brand-950">Contáctanos</h2>
        <p className="mt-3 text-sm text-slate-600">Completá el formulario y recibí una propuesta según tu objetivo.</p>

        <form ref={formRef} className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 text-sm font-medium text-brand-950">
            Nombre Completo
            <input
              type="text"
              name="nombre"
              required
              className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-brand-700 focus:outline-none"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-brand-950">
              Email
              <input
                type="email"
                name="email"
                required
                className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-brand-700 focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-brand-950">
              WhatsApp
              <input
                type="tel"
                name="whatsapp"
                required
                className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-brand-700 focus:outline-none"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm font-medium text-brand-950">
            Motivo de Contacto
            <select
              name="motivo"
              value={reason}
              onChange={handleReasonChange}
              required
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-brand-700 focus:outline-none"
            >
              <option value="">Seleccionar</option>
              {reasonOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          {currentDetails?.first && (
            <div className="grid gap-4 md:grid-cols-2">
              <SelectField
                label={currentDetails.first.label}
                name={currentDetails.first.name}
                options={currentDetails.first.options}
                value={firstDetailValue}
                onChange={(event) => setFirstDetailValue(event.target.value)}
              />

              {currentDetails.second ? (
                <SelectField
                  label={currentDetails.second.label}
                  name={currentDetails.second.name}
                  options={currentDetails.second.options}
                  value={secondDetailValue}
                  onChange={(event) => setSecondDetailValue(event.target.value)}
                />
              ) : (
                <div className="hidden md:block" />
              )}
            </div>
          )}

          <label className="flex flex-col gap-2 text-sm font-medium text-brand-950">
            Mensaje adicional (opcional)
            <textarea
              name="mensaje"
              rows={4}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-brand-700 focus:outline-none"
              placeholder="Contanos más detalles..."
            />
          </label>

          <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-4">
            <p className="mb-3 text-xs text-slate-600">Placeholder para Google reCAPTCHA v2</p>
            <ReCAPTCHA
              ref={captchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || 'recaptcha-site-key-placeholder'}
              onChange={(token) => setCaptchaToken(token || '')}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-brand-900 px-5 py-3 font-semibold text-white transition hover:bg-brand-800"
          >
            Enviar consulta
          </button>

          {status && <p className="text-sm text-slate-700">{status}</p>}
        </form>
      </div>
    </section>
  )
}

export default ContactForm
