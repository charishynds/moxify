import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
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

      <div className="relative w-full max-w-7xl mx-auto px-6 pt-40 pb-24 md:pt-52 md:pb-32">
        <div className="mb-4">
          <span className="inline-block text-sm font-medium text-primary tracking-widest uppercase">
            Delivery &amp; Programme Management
          </span>
        </div>

        <h1
          className="font-display font-extrabold text-[clamp(2rem,7.5vw,3rem)] md:text-6xl lg:text-7xl leading-[1.05] tracking-tight w-full max-w-[min(calc(100dvw-3rem),56rem)] break-words [text-wrap:balance]"
        >
          Cutting through noise to produce{' '}
          <span className="text-primary">product-driven results.</span>
        </h1>

        <p
          className="mt-6 text-lg md:text-xl text-muted-foreground w-full max-w-[min(calc(100dvw-3rem),42rem)] leading-relaxed"
        >
          Moxify brings senior delivery expertise to complex digital programmes,
          combining strategic thinking, human leadership, and AI-enabled practice
          to get the right things built, on time and with confidence.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild size="lg" className="group">
            <a href="#contact">
              Let's talk
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#services">See what we do</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
