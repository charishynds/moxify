import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Heart, Cpu, TrendingUp, Shield } from 'lucide-react'

const pillars = [
  {
    icon: Heart,
    title: 'Human + Strategic Leadership',
    body: 'Strong leadership paired with a genuinely human approach. We build high-trust relationships with stakeholders and teams that reduce friction and unlock performance — even in the most complex accounts.',
  },
  {
    icon: Cpu,
    title: 'AI-Forward Thinking',
    body: 'Genuinely curious about new technologies and early adopters of AI-enabled delivery. We apply AI as a project partner to improve planning accuracy, workflow efficiency, and creative production speed.',
  },
  {
    icon: TrendingUp,
    title: 'Commercial Acumen',
    body: 'Deep experience managing multi-million pound contracts with full commercial accountability. We apply business and technical acumen to create solutions that are strategically aligned with your product vision and budget reality.',
  },
  {
    icon: Shield,
    title: 'End-to-End Accountability',
    body: 'From discovery and requirements through to launch and BAU — we take full ownership. No handoffs, no finger-pointing. We stay the course and ensure delivery continuity at every stage.',
  },
]

export function Approach() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="approach" className="py-24 md:py-32 bg-surface/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase">
            How we work
          </span>
          <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
            Our approach
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl text-lg">
            Four principles that shape every engagement we take on.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="flex gap-5"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mt-1">
                <pillar.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {pillar.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
