import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  LayoutDashboard,
  Zap,
  RefreshCw,
  BrainCircuit,
  Users,
  GitBranch,
  FileSearch,
} from 'lucide-react'

const services = [
  {
    icon: LayoutDashboard,
    title: 'Programme & Portfolio Management',
    description:
      'End-to-end leadership of complex, multi-stream digital programmes with full accountability for delivery, risk, and budget.',
  },
  {
    icon: Zap,
    title: 'Agile Delivery Management',
    description:
      'Hands-on Agile and Lean delivery — Sprint facilitation, backlog governance, and continuous improvement embedded in your teams.',
  },
  {
    icon: RefreshCw,
    title: 'Digital Transformation',
    description:
      'Strategy to execution: modernising legacy platforms, consolidating digital estates, and driving measurable business change.',
  },
  {
    icon: BrainCircuit,
    title: 'AI-Enabled Delivery',
    description:
      'Leveraging AI tools to accelerate planning, optimise workflows, and sharpen decision-making across your delivery operation.',
  },
  {
    icon: Users,
    title: 'Stakeholder & Executive Engagement',
    description:
      'Building trusted relationships at C-suite level — translating complexity into clarity and managing expectations at pace.',
  },
  {
    icon: GitBranch,
    title: 'Delivery Framework Definition',
    description:
      'Designing and embedding delivery operating models, governance structures, and Agile practices that scale with your organisation.',
  },
  {
    icon: FileSearch,
    title: 'Business Analysis & Requirements',
    description:
      'Scoping technical and business requirements, authoring user stories, and aligning product vision with delivery reality.',
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
            From strategic programme oversight to hands-on delivery management —
            we bring the experience to make complex work simple.
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
                <service.icon className="w-5 h-5 text-primary" />
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
      </div>
    </section>
  )
}
