import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { enquirySchema, type EnquiryFormValues } from '@/lib/schemas'

export function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const honeypotRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
  })

  const onSubmit = async (values: EnquiryFormValues) => {
    if (honeypotRef.current?.value) return

    if (!supabase) {
      toast.error('Contact form not yet configured. Please email info@moxify.co.uk directly.')
      return
    }
    const { error } = await supabase.from('enquiries').insert([values])
    if (error) {
      console.error('Enquiry submission failed:', error)
      toast.error('Something went wrong. Please try again or email us directly.')
      return
    }
    toast.success("Thanks! We'll be in touch shortly.")
    reset()
  }

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium text-primary tracking-widest uppercase">
              Let's talk
            </span>
            <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
              Start a conversation
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed max-w-md">
              Whether you have a complex programme to tame or you're not sure
              where to start. We're happy to have a no-obligation conversation
              about what you're trying to achieve.
            </p>
            <div className="mt-8 space-y-4">
              <div className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">Email</span>
                <br />
                <a
                  href="mailto:info@moxify.co.uk"
                  className="hover:text-primary transition-colors"
                >
                  info@moxify.co.uk
                </a>
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">LinkedIn</span>
                <br />
                <a
                  href="https://www.linkedin.com/in/charishynds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors inline-flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  linkedin.com/in/charishynds
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-surface border border-border rounded-2xl p-8 space-y-5"
            >
              {/* Honeypot — hidden from real users, filled by bots */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
                <label htmlFor="website">Website</label>
                <input
                  ref={honeypotRef}
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={!!errors.name}
                    {...register('name')}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-xs text-destructive">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Your company"
                    {...register('company')}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  aria-invalid={!!errors.email}
                  {...register('email')}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project or challenge…"
                  rows={5}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  aria-invalid={!!errors.message}
                  {...register('message')}
                  className={errors.message ? 'border-destructive' : ''}
                />
                {errors.message && (
                  <p id="message-error" className="text-xs text-destructive">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full group"
              >
                {isSubmitting ? 'Sending…' : 'Send message'}
                <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
