'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Play, Users, Zap, Shield, MessageSquare, 
  MonitorPlay, ChevronRight, Star, Clock 
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const features = [
  {
    icon: MonitorPlay,
    title: 'Synchronized Playback',
    description: 'Watch videos in perfect sync with friends. Play, pause, and seek together in real-time.',
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Chat with friends while watching. Share reactions and discuss moments as they happen.',
  },
  {
    icon: Users,
    title: 'Private Rooms',
    description: 'Create private rooms for you and your friends. Invite with a simple room code.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'End-to-end encrypted rooms ensure your watch parties stay private and secure.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Ultra-low latency synchronization keeps everyone on the same frame.',
  },
  {
    icon: Clock,
    title: 'Watch History',
    description: 'Keep track of your watch history and easily resume where you left off.',
  },
]

const steps = [
  {
    step: '01',
    title: 'Create a Room',
    description: 'Set up your watch party room with custom settings and privacy controls.',
  },
  {
    step: '02',
    title: 'Invite Friends',
    description: 'Share the room code or link with friends to join your watch party.',
  },
  {
    step: '03',
    title: 'Choose Video',
    description: 'Upload a local video file and start watching together in perfect sync.',
  },
  {
    step: '04',
    title: 'Enjoy Together',
    description: 'Chat, react, and enjoy synchronized playback with your friends.',
  },
]

const faqs = [
  {
    question: 'How does synchronization work?',
    answer: 'DevMantra SyncPlay uses WebSocket technology to keep all participants in perfect sync. When the host plays, pauses, or seeks, all viewers are updated in real-time.',
  },
  {
    question: 'What video formats are supported?',
    answer: 'We support most common video formats including MP4, WebM, and MKV. The video is played locally on each participant\'s device.',
  },
  {
    question: 'How many people can join a room?',
    answer: 'Rooms can support up to 50 participants simultaneously, ensuring smooth performance for everyone.',
  },
  {
    question: 'Is it free to use?',
    answer: 'Yes! DevMantra SyncPlay is completely free to use. We believe in making shared viewing experiences accessible to everyone.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span className="text-sm text-white/70">Now available for everyone</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Watch Together,{' '}
              <span className="gradient-text">Anywhere</span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
              Create watch parties with friends and enjoy synchronized video playback 
              with real-time chat. Perfect for movie nights, study groups, and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/room/create">
                <Button size="lg" leftIcon={<Play className="w-5 h-5" />}>
                  Create a Room
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" leftIcon={<Users className="w-5 h-5" />}>
                  Join Room
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Everything you need for{' '}
              <span className="gradient-text">watch parties</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Powerful features designed to make shared viewing experiences seamless and fun.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover={false} className="h-full">
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/60">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              How it <span className="gradient-text">Works</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Get started in minutes with our simple 4-step process.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <Card className="text-center h-full">
                  <div className="text-4xl font-bold gradient-text mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-white/60">{step.description}</p>
                </Card>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 text-white/20">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Frequently Asked{' '}
              <span className="gradient-text">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover={false}>
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-white/60">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass p-12 rounded-2xl glow"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to start watching together?
            </h2>
            <p className="text-lg text-white/60 mb-8">
              Create your first room and invite friends to join the fun.
            </p>
            <Link href="/room/create">
              <Button size="lg" leftIcon={<Play className="w-5 h-5" />}>
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                  <Play className="w-4 h-4 text-white" fill="currentColor" />
                </div>
                <span className="font-bold gradient-text">DevMantra SyncPlay</span>
              </div>
              <p className="text-white/60 text-sm">
                Synchronized video watching for everyone.
              </p>
            </div>
            
            {[
              {
                title: 'Product',
                links: ['Features', 'Pricing', 'Changelog', 'Documentation'],
              },
              {
                title: 'Company',
                links: ['About', 'Blog', 'Careers', 'Contact'],
              },
              {
                title: 'Legal',
                links: ['Privacy', 'Terms', 'Security', 'Cookies'],
              },
            ].map(section => (
              <div key={section.title}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-white/5 pt-8 text-center text-sm text-white/40">
            <p>&copy; 2024 DevMantra SyncPlay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
