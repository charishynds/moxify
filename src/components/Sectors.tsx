import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const sectors = [
  'Automotive',
  'Blockchain / Web3',
  'Consumer',
  'Entertainment',
  'Finance',
  'Health',
  'Hospitality',
  'Industrial',
  'Recruitment',
  'Retail & Ecommerce',
  'Services',
  'Technology',
]

export function Sectors() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="sectors" className="py-24 md:py-32 bg-surface/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase">
            Where we've worked
          </span>
          <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
            Sectors
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl text-lg">
            Over two decades of delivery across a broad range of industries,
            bringing cross-sector insight to every engagement.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap gap-3"
        >
          {sectors.map((sector) => (
            <span
              key={sector}
              className="px-4 py-2 rounded-full border border-border bg-surface text-sm text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
            >
              {sector}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
