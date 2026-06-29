'use client'

import { AnimatePresence } from 'framer-motion'
import { ToastProvider } from '@/components/ui/Toast'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
    </ToastProvider>
  )
}
