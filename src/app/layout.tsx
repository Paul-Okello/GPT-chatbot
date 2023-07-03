"use client"

import './globals.css'
import { Montserrat } from 'next/font/google'
import { Providers } from './providers'
import { Navbar } from '@/components'
import { SessionProvider } from "next-auth/react"
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <SessionProvider>
            <Provider store={store}>
              <Navbar />
              {children}
            </Provider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  )
}
