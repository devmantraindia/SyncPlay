'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Play, Users, Clock, TrendingUp, 
  Plus, Copy, ExternalLink, Star 
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const recentRooms = [
  {
    id: 'ABC123',
    name: 'Movie Night',
    participants: 5,
    date: '2 hours ago',
    duration: '2h 15m',
  },
  {
    id: 'DEF456',
    name: 'Study Session',
    participants: 3,
    date: 'Yesterday',
    duration: '1h 30m',
  },
  {
    id: 'GHI789',
    name: 'Anime Marathon',
    participants: 8,
    date: '2 days ago',
    duration: '4h 00m',
  },
]

const stats = [
  { label: 'Total Rooms', value: '12', icon: Play, trend: '+3' },
  { label: 'Watch Time', value: '24h', icon: Clock, trend: '+5h' },
  { label: 'Friends', value: '28', icon: Users, trend: '+2' },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-white/60 mt-1">Welcome back! Ready to watch together?</p>
            </div>
            <div className="flex gap-3">
              <Link href="/room/create">
                <Button leftIcon={<Plus className="w-4 h-4" />}>
                  Create Room
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover={false}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                      {stat.trend}
                    </span>
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Rooms */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Recent Rooms</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <div className="space-y-3">
              {recentRooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/room/${room.id}`}>
                    <Card className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                          <Play className="w-6 h-6 text-white" fill="currentColor" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{room.name}</h3>
                          <div className="flex items-center gap-3 text-sm text-white/40">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {room.participants}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {room.duration}
                            </span>
                            <span>{room.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white/60 font-mono">
                          {room.id}
                        </span>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <Link href="/room/create">
              <Card className="text-center p-8">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Create New Room</h3>
                <p className="text-sm text-white/60">
                  Start a new watch party and invite friends
                </p>
              </Card>
            </Link>
            
            <Card className="text-center p-8">
              <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                <Copy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Join with Code</h3>
              <p className="text-sm text-white/60">
                Enter a room code to join existing watch party
              </p>
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Enter room code"
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  maxLength={6}
                />
                <Button size="sm">Join</Button>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
