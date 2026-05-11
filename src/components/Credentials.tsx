import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award, GraduationCap } from 'lucide-react'

const certifications = [
  {
    title: 'Certified ScrumMaster® (CSM)',
    issuer: 'Scrum Alliance',
  },
  {
    title: 'Certified Lean Kanban Foundation [KMP1]',
    issuer: 'Accredited Kanban Practitioner',
  },
  {
    title: 'Certified Generative AI Overview for Project Managers',
    issuer: 'Project Management Institute',
  },
  {
    title: 'Certified Leveraging Generative AI for Project Managers',
    issuer: 'Project Management Institute',
  },
]

const methodologies = [
  'Agile',
  'Lean',
  'Kanban',
  'Scrum',
  'Waterfall',
  'Hybrid',
  'SAFe',
]

export function Credentials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="credentials" className="py-24 md:py-32 bg-surface/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase">
            Qualifications
          </span>
          <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
            Credentials
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-primary" />
              <h3 className="font-display font-bold text-lg text-foreground">
                Certifications
              </h3>
            </div>
            <ul className="space-y-4">
              {certifications.map((cert) => (
                <li
                  key={cert.title}
                  className="pl-4 border-l-2 border-primary/30"
                >
                  <div className="font-medium text-foreground text-sm">
                    {cert.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {cert.issuer}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Education & methodologies */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h3 className="font-display font-bold text-lg text-foreground">
                Education
              </h3>
            </div>
            <div className="pl-4 border-l-2 border-primary/30 mb-10">
              <div className="font-medium text-foreground text-sm">
                Maths with Computer Science — BSc (Hons)
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                University of Leeds
              </div>
            </div>

            <h3 className="font-display font-bold text-lg text-foreground mb-4">
              Methodologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {methodologies.map((m) => (
                <span
                  key={m}
                  className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium"
                >
                  {m}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
