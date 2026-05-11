import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  LayoutDashboard,
  Zap,
  RefreshCw,
  BrainCircuit,
  Users,
  GitBranch,
} from 'lucide-react'

const services = [
  {
    icon: LayoutDashboard,
    title: 'Programme & Portfolio Management',
    description:
      'End-to-end leadership of complex, multi-stream digital programmes with full accountability for delivery, risk, and budget.',
  },
  {
    icon: RefreshCw,
    title: 'Digital Transformation',
    description:
      'From modernising legacy platforms to consolidating digital estates, we manage transformation programmes that stay grounded in your vision and business objectives. The result is delivery that makes sense for your organisation, not just delivery that gets shipped.',
  },
  {
    icon: Users,
    title: 'Stakeholder & Executive Engagement',
    description:
      'Building trusted relationships at C-suite level, translating complexity into clarity and managing expectations at pace.',
  },
  {
    icon: Zap,
    title: 'Agile Delivery Management',
    description:
      'Hands-on Agile delivery: sprint facilitation, backlog governance, and continuous improvement embedded in your teams. We coach teams to build confidence and capability, not just process compliance.',
  },
  {
    icon: BrainCircuit,
    title: 'AI-Enabled Delivery',
    description:
      'We integrate AI tooling directly into your delivery operation, from intelligent planning and workflow optimisation to smarter reporting and faster decision-making.',
  },
  {
    icon: GitBranch,
    title: 'Delivery Framework Definition',
    description:
      'Designing and embedding delivery operating models, governance structures, and Agile practices. Includes team coaching, training, and template setup to build lasting capability within your organisation.',
  },
]

export function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase">
            What we do
          </span>
          <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
            Services
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl text-lg">
            From strategic programme oversight to hands-on delivery management,
            across a broad range of industries. We bring the experience to make
            complex work simple.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className="group bg-surface border border-border rounded-xl p-6 hover:border-primary/40 transition-colors"
            >
              <div className="mb-4 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <service.icon className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-display font-bold text-base text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest mr-2">Methodologies</span>
          {['Agile', 'Kanban', 'Scrum', 'Waterfall', 'Hybrid'].map((m) => (
            <span
              key={m}
              className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium"
            >
              {m}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
