'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, ArrowLeft, Play } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        {/* Animated 404 */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0] 
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="text-9xl font-bold gradient-text mb-8"
        >
          404
        </motion.div>

        <h1 className="text-3xl font-bold mb-4">
          Page Not Found
        </h1>
        
        <p className="text-lg text-white/60 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button leftIcon={<Home className="w-4 h-4" />}>
              Go Home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="secondary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="mt-12">
          <div className="w-24 h-24 rounded-2xl gradient-bg flex items-center justify-center mx-auto opacity-50 animate-float">
            <Play className="w-12 h-12 text-white" fill="currentColor" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
