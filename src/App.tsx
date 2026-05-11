import { MotionConfig } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'sonner'
import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { Approach } from '@/components/Approach'
import { Sectors } from '@/components/Sectors'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:font-medium"
        >
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content">
          <Hero />
          <Approach />
          <Services />
          <Sectors />
          <Contact />
        </main>
        <Footer />
        <Analytics />
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'hsl(240 8% 8%)',
              border: '1px solid hsl(240 6% 12%)',
              color: 'hsl(240 5% 95%)',
            },
          }}
        />
      </>
    </MotionConfig>
  )
}
