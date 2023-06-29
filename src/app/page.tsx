"use client"

import { FAQSection, Features, Footer, Hero } from '@/components'
import { useToast } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
