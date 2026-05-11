import { Toaster } from 'sonner'
import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { Approach } from '@/components/Approach'
import { Sectors } from '@/components/Sectors'
import { Credentials } from '@/components/Credentials'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function App() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Approach />
        <Sectors />
        <Credentials />
        <Contact />
      </main>
      <Footer />
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
  )
}
