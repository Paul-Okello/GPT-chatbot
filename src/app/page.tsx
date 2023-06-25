"use client"

import { FAQSection, Features, Footer, Hero } from '@/components'

export default function Home() {
  return (
    <main className="bg-slate-50">
      <Hero />
      <Features />
      <FAQSection />
      <Footer />
    </main>
  )
}
