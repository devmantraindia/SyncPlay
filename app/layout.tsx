import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'DevMantra SyncPlay - Watch Together',
  description: 'Synchronized video watching experience with real-time chat and controls',
  keywords: 'syncplay, watch together, synchronized video, devmantra',
  authors: [{ name: 'DevMantra' }],
  openGraph: {
    title: 'DevMantra SyncPlay',
    description: 'Synchronized video watching experience',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background">
        <Providers>
          <div className="relative min-h-screen">
            {/* Animated background */}
            <div className="fixed inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-background" />
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-float" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
            </div>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
