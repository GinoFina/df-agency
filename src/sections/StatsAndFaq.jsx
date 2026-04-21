import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const stats = [
  { value: '2+', label: 'Años de experiencia' },
  { value: '20+', label: 'Clientes asesorados' },
  { value: '40+', label: 'Operaciones deportivas' },
  { value: '8+', label: 'Mercados conectados' },
]

const questions = [
  {
    question: '¿Cómo inicia el proceso de representación?',
    answer: 'Realizamos una entrevista inicial para entender objetivos, etapa de carrera y necesidades contractuales.',
  },
  {
    question: '¿Trabajan con clubes e inversores?',
    answer: 'Sí, ofrecemos análisis de oportunidades, due diligence deportiva y soporte en negociación.',
  },
  {
    question: '¿Qué incluye el servicio de scouting?',
    answer: 'Incluye reportes técnicos, perfiles comparativos y seguimiento continuo según el requerimiento.',
  },
]

function StatsAndFaq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="bg-slate-50 px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200">
              <p className="text-3xl font-semibold text-brand-900">{stat.value}</p>
              <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
          <h2 className="text-3xl font-semibold text-brand-950">Preguntas frecuentes</h2>
          <div className="mt-6 divide-y divide-slate-200">
            {questions.map((item, index) => {
              const isOpen = index === openIndex
              return (
                <div key={item.question} className="py-4">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 text-left"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span className="font-medium text-brand-950">{item.question}</span>
                    <ChevronDown className={`h-5 w-5 text-brand-700 transition ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && <p className="mt-3 text-sm text-slate-600">{item.answer}</p>}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsAndFaq
