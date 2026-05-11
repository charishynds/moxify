import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const stats = [
  { value: '20+', label: 'Years delivering' },
  { value: '£20M+', label: 'Contracts managed' },
  { value: '12+', label: 'Sectors served' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' as const, delay },
})

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-40">
        <motion.div {...fadeUp(0.1)} className="mb-4">
          <span className="inline-block text-sm font-medium text-primary tracking-widest uppercase">
            Delivery &amp; Programme Management
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.2)}
          className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl"
        >
          Cutting through noise to produce{' '}
          <span className="text-primary">product-driven results.</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.35)}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          Moxify brings senior delivery expertise to complex digital programmes —
          combining strategic thinking, human leadership, and AI-enabled practice
          to get the right things built, on time, at pace.
        </motion.p>

        <motion.div {...fadeUp(0.5)} className="mt-10 flex flex-wrap gap-4">
          <Button asChild size="lg" className="group">
            <a href="#contact">
              Let's talk
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#services">See what we do</a>
          </Button>
        </motion.div>

        <motion.div
          {...fadeUp(0.65)}
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg"
        >
          {stats.map((stat) => (
            <div key={stat.value}>
              <div className="font-display font-bold text-3xl md:text-4xl text-foreground">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
