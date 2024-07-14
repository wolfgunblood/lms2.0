import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ClerkProvider } from '@clerk/nextjs'
import ToasterProvider from '@/components/providers/ToasterProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Learning management system',
  description: 'Created a learning management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
